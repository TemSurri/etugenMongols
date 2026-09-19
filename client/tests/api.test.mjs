import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { AxiosError } from "axios";
import { api } from "../src/api/client.ts";
import * as auth from "../src/sections/auth/api/authApi.ts";
import * as account from "../src/sections/account/api/accountApi.ts";
import * as donation from "../src/sections/payments/donation/api/donationApi.ts";
import * as registration from "../src/sections/payments/event-registration/api/eventRegistrationApi.ts";
import * as admin from "../src/sections/admin/api/adminApi.ts";
import { getPublicEvents } from "../src/sections/events/api/eventsApi.ts";
import { getUserRegistrations } from "../src/sections/account/registrations/api/registrationsApi.ts";

const event={id:"e",slug:"s",titleEn:"Title",titleMn:"Гарчиг",descriptionEn:"Description",descriptionMn:"Тайлбар",startsAt:"2026-01-01",endsAt:null,location:"Calgary",published:true,registerable:true,registrationCost:2500,coverImage:null,coverImageAltEn:null,coverImageAltMn:null,contactEmail:null,contactPhone:null,createdAt:"2026-01-01"};
const checkout={jobId:"p",result:"CREATED",clientSecret:"masked-secret",amount:2500,currency:"cad",email:"test@example.com"};
const resumed={jobId:"p",client_secret:"resume-secret",amount:2500,currency:"cad",email:"test@example.com",action:"DONATION",actionPayload:{}};

async function capture(invoke, {data={},status=200}={}) {
  const original=api.defaults.adapter;let config;
  api.defaults.adapter=async request=>{
    config=request;
    return {data,status,statusText:"test",headers:{},config:request};
  };
  try { const result=await invoke();return {config,result}; }
  finally {api.defaults.adapter=original;}
}
const payloadOf=config=>typeof config.data==="string"?JSON.parse(config.data):config.data;

test("all auth mutations retain exact endpoint, method and JSON payload",async()=>{
  for(const [fn,url,payload] of [
    [auth.login,"/auth/login",{email:"t@example.com",password:"unchanged"}],
    [auth.signup,"/auth/signup",{firstName:"A",lastName:"B",email:"t@example.com",password:"unchanged"}],
    [auth.requestPasswordReset,"/auth/forgot-password",{email:"t@example.com"}],
    [auth.requestAccountVerification,"/auth/verify-account",{email:"t@example.com"}],
    [auth.resetPassword,"/verify-token",{token:"t",password:"unchanged"}],
  ]) {
    const {config}=await capture(()=>fn(payload));
    assert.equal(config.method,"post");assert.equal(config.url,url);assert.deepEqual(payloadOf(config),payload);
    assert.equal(config.withCredentials,true);
  }
  const verified=await capture(()=>auth.verifyToken("/verify-token","token"));
  assert.equal(verified.config.url,"/verify-token");assert.deepEqual(payloadOf(verified.config),{token:"token"});
  const me=await capture(auth.getCurrentUser);assert.equal(me.config.url,"/auth/me");assert.equal(me.config.method,"get");
  const logout=await capture(auth.logoutSession);assert.equal(logout.config.url,"/auth/logout");assert.equal(logout.config.method,"post");
});

test("explicit masked CSRF defaults survive the shared client request configuration",async()=>{
  const masked="bE4E7GRey4nX8Ix3TnMIz78nzST2iWJyuu7d4Fepggj_18y-Dygx3Fw_8r36k71Gel489oYS4EaS6FZf3orv1W-d5Dyd5vSK";
  const previous=api.defaults.headers.common["X-XSRF-TOKEN"];
  try {
    const csrf=await capture(()=>api.get("/csrf"),{data:{token:masked}});
    api.defaults.headers.common["X-XSRF-TOKEN"]=csrf.result.data.token;
    const login=await capture(()=>auth.login({email:"test@example.com",password:"test"}));
    assert.equal(csrf.config.method,"get");assert.equal(login.config.headers.get("X-XSRF-TOKEN"),masked);
    assert.notEqual(api.defaults.withXSRFToken,true);
    for(const source of ["../src/sections/auth/context/AuthProvider.tsx","../src/sections/auth/verification/VerificationSection.tsx"]) {
      const text=readFileSync(new URL(source,import.meta.url),"utf8");
      assert.match(text,/api\.get\("\/csrf"\)/);
      assert.match(text,/api\.defaults\.headers\.common\["X-XSRF-TOKEN"\]/);
    }
  } finally {if(previous===undefined)delete api.defaults.headers.common["X-XSRF-TOKEN"];else api.defaults.headers.common["X-XSRF-TOKEN"]=previous;}
});

test("donation checkout and registration checkout keep their distinct payloads and paths",async()=>{
  for(const [fn,url,payload] of [
    [donation.checkoutDonation,"/payment/checkout-donate",{amount:25,email:"t@example.com",firstName:"A",lastName:"B",anonymous:false}],
    [registration.checkoutEventRegistration,"/payment/checkout-event",{eventId:"e",attendeeCount:1,price:2500,payer:{firstName:"A",lastName:"B",email:"t@example.com"},additionalPeople:[]}],
  ]) {
    const {config,result}=await capture(()=>fn(payload),{data:checkout});
    assert.equal(config.method,"post");assert.equal(config.url,url);assert.deepEqual(payloadOf(config),payload);assert.deepEqual(result,checkout);
    await assert.rejects(capture(()=>fn(payload),{data:"<html/>"}),/Invalid checkout/);
  }
});

test("donation resume accepts 200, 204 and 205; empty statuses remain null",async()=>{
  for(const status of [200,204,205]){
    const {config,result}=await capture(donation.continueDonationPayment,{status,data:resumed});
    assert.equal(config.url,"/payment/resume-donation");assert.equal(config.method,"post");
    assert.deepEqual(result,status===200?resumed:null);
    for(const allowed of [200,204,205])assert.equal(config.validateStatus(allowed),true);
    assert.equal(config.validateStatus(401),false);
  }
});
test("registration resume retains its response and cancellation uses its own endpoint",async()=>{
  const response={...resumed,action:"EVENT_REGISTRATION"};
  const {config,result}=await capture(registration.resumeEventRegistrationPayment,{data:response});
  assert.equal(config.url,"/payment/resume-event-registration");assert.deepEqual(result,response);
  for(const [fn,url] of [[donation.cancelDonationPayment,"/payment/cancel-donation"],[registration.cancelEventRegistrationPayment,"/payment/cancel-event-registration"]]){
    const output=await capture(fn);assert.equal(output.config.url,url);assert.equal(output.config.method,"post");assert.equal(output.result,undefined);
  }
});
test("session verification returns false only for 401/403 and propagates infrastructure errors",async()=>{
  const original=api.defaults.adapter;
  try{
    for(const status of [401,403,500]){
      api.defaults.adapter=async config=>{throw new AxiosError("test","ERR_BAD_RESPONSE",config,undefined,{status,data:{},headers:{},statusText:"test",config});};
      if(status===500)await assert.rejects(donation.verifyDonationSession());else assert.equal(await donation.verifyDonationSession(),false);
    }
  }finally{api.defaults.adapter=original;}
});
test("account mutation helpers retain their exact payloads",async()=>{
  for(const [fn,url,payload] of [
    [account.changeName,"/auth/user/update-name",{firstName:"A",lastName:"B"}],
    [account.changePassword,"/auth/user/update-password",{currentPassword:"old",newPassword:"new"}],
    [account.changeEmail,"/auth/user/update-email",{newEmail:"new@example.com"}],
  ]){const {config,result}=await capture(()=>fn(payload));assert.equal(config.url,url);assert.equal(config.method,"post");assert.deepEqual(payloadOf(config),payload);assert.equal(result,undefined);}
});
test("public events, registrations and history keep reads and pagination parameters",async()=>{
  const events=await capture(getPublicEvents,{data:[event]});assert.equal(events.config.url,"/events");assert.equal(events.config.method,"get");
  const registrations=await capture(getUserRegistrations,{data:[]});assert.equal(registrations.config.url,"/event-registrations/user");assert.deepEqual(registrations.result,[]);
  const page={content:[],totalElements:0,totalPages:0,size:6,number:2,first:false,last:true,numberOfElements:0,empty:true};
  const history=await capture(()=>account.getUserHistory(2,6),{data:page});assert.equal(history.config.url,"/auth/user/history");assert.deepEqual(history.config.params,{page:2,size:6});assert.deepEqual(history.result,page);
});
test("admin requests keep PATCH shapes, event response wrappers and registration read route",async()=>{
  const list=await capture(admin.getAdminEvents,{data:[event]});assert.equal(list.config.url,"/events/admin");assert.deepEqual(list.result.data,[event]);
  const create=await capture(()=>admin.createAdminEvent({slug:"new"}),{data:event});assert.equal(create.config.url,"/events");assert.equal(create.config.method,"post");assert.deepEqual(payloadOf(create.config),{slug:"new"});
  const edit=await capture(()=>admin.updateAdminEvent("e","TITLE_EN","New"),{data:event});assert.equal(edit.config.url,"/events/e");assert.equal(edit.config.method,"patch");assert.deepEqual(payloadOf(edit.config),{type:"TITLE_EN",value:"New"});
  const reg=await capture(()=>admin.updateAdminRegistration("e",false,null),{data:event});assert.equal(reg.config.url,"/events/e/registration");assert.equal(reg.config.method,"patch");assert.deepEqual(payloadOf(reg.config),{registerable:false,registrationCost:null});
  const attendees=await capture(()=>admin.getAdminRegistrations("e"),{data:[]});assert.equal(attendees.config.url,"/event-registrations/admin/events/e");assert.deepEqual(attendees.result.data,[]);
});
