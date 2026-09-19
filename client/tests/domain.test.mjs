import test from "node:test";
import assert from "node:assert/strict";
import { isAuthUser } from "../src/sections/auth/contracts/authGuards.ts";
import { isApiEventList, isApiEvent } from "../src/sections/events/contracts/eventGuards.ts";
import { isPaymentIntentResult, isResumePaymentResponse } from "../src/sections/payments/contracts/paymentGuards.ts";
import { paymentFromCheckout, paymentFromResume } from "../src/sections/payments/paymentMapping.ts";
import { buildRegistrationRequest } from "../src/sections/payments/event-registration/utils/buildRegistrationRequest.ts";
import { buildEventChanges } from "../src/sections/admin/model/buildEventChanges.ts";
import { isValidPassword } from "../src/sections/account/utils/isValidPassword.ts";
import { isUserHistoryPage } from "../src/sections/account/contracts/accountGuards.ts";

export const event = {
  id: "event-1", slug: "naadam", titleEn: "Naadam", titleMn: "Наадам",
  descriptionEn: "Community", descriptionMn: "Хамт олон", startsAt: "2026-07-01T12:00:00.000Z",
  endsAt: null, location: "Calgary", published: true, registerable: true,
  registrationCost: 2500, coverImage: null, coverImageAltEn: null, coverImageAltMn: null,
  contactEmail: null, contactPhone: null, createdAt: "2026-01-01T00:00:00Z",
};
const payment = { jobId: "job-1", result: "CREATED", clientSecret: "secret", amount: 5000, currency: "cad", email: "payer@example.com" };

test("auth guard retains nullable verification timestamp and rejects incomplete/HTML responses", () => {
  const user={id:1,email:"a@example.com",firstName:"A",lastName:"B",role:"USER",verified:false,verifiedAt:null,createdAt:"2026-01-01"};
  assert.equal(isAuthUser(user),true);
  assert.equal(isAuthUser({...user,id:"1"}),false);
  assert.equal(isAuthUser("<!doctype html>"),false);
  assert.equal(isAuthUser(null),false);
});

test("event boundary accepts nullable optional fields and checks each array item", () => {
  assert.equal(isApiEvent(event),true);
  assert.equal(isApiEvent({...event,registrationCost:0}),true);
  assert.equal(isApiEventList([]),true);
  assert.equal(isApiEventList([event,{}]),false);
  assert.equal(isApiEventList("<html/>"),false);
  assert.equal(isApiEvent({...event,published:"true"}),false);
});

test("checkout mapping preserves amount units, secret, action and result", () => {
  for(const result of ["CREATED","EXISTING_DUPLICATE","CONFIRM_EXISTING"]){
    const input={...payment,result,clientSecret:result==="CONFIRM_EXISTING"?null:"secret"};
    assert.equal(isPaymentIntentResult(input),true);
    assert.deepEqual(paymentFromCheckout(input,"DONATION"),{...input,action:"DONATION",actionPayload:null});
  }
  assert.equal(isPaymentIntentResult({...payment,amount:"5000"}),false);
  assert.equal(isPaymentIntentResult({...payment,result:"unknown"}),false);
});

test("resume mapping preserves snake-case secret and the provider's actual payment action", () => {
  const input={jobId:payment.jobId,client_secret:"resumed",action:"EVENT_REGISTRATION",amount:5000,currency:"cad",email:payment.email,actionPayload:{eventId:"event-1",attendeeCount:2}};
  assert.equal(isResumePaymentResponse(input),true);
  assert.deepEqual(paymentFromResume(input,"EXISTING_DUPLICATE"),{...payment,result:"EXISTING_DUPLICATE",clientSecret:"resumed",action:input.action,actionPayload:input.actionPayload});
  assert.equal(isResumePaymentResponse({...input,client_secret:null}),true);
  assert.equal(isResumePaymentResponse({...input,actionPayload:[]}),false);
  assert.equal(isResumePaymentResponse({...input,actionPayload:null}),false);
});

test("registration serialization trims names, preserves cents, excludes UI person IDs", () => {
  const input={eventId:event.id,attendeeCount:2,totalAmount:5000,firstName:" Payer ",lastName:" One ",normalizedEmail:"payer@example.com",additionalPeople:[{id:"ui-only",firstName:" Guest ",lastName:" Two "}]};
  assert.deepEqual(buildRegistrationRequest(input),{eventId:"event-1",attendeeCount:2,price:5000,payer:{firstName:"Payer",lastName:"One",email:"payer@example.com"},additionalPeople:[{firstName:"Guest",lastName:"Two"}]});
  assert.equal(input.additionalPeople[0].firstName," Guest ");
  assert.deepEqual(buildRegistrationRequest({...input,attendeeCount:1,totalAmount:2500,additionalPeople:[]}).additionalPeople,[]);
});

const editValues = {titleEn:event.titleEn,titleMn:event.titleMn,descriptionEn:event.descriptionEn,descriptionMn:event.descriptionMn,location:event.location,startsAt:event.startsAt,endsAt:"",coverImage:"",coverImageAltEn:"",coverImageAltMn:"",contactEmail:"",contactPhone:""};
test("admin no-op edits emit no PATCH fields after normalization", () => {
  assert.deepEqual(buildEventChanges(event,{...editValues,titleEn:" Naadam ",contactEmail:"  "}),[]);
});
test("admin edits retain ordered field names, nullable clearing and ISO timestamps", () => {
  assert.deepEqual(buildEventChanges({...event,coverImage:"old.jpg"},{...editValues,titleEn:" New ",endsAt:"2026-07-01T18:00:00Z",contactPhone:" 123 "}),[
    {type:"TITLE_EN",value:"New"},{type:"ENDS_AT",value:"2026-07-01T18:00:00.000Z"},
    {type:"COVER_IMAGE",value:null},{type:"CONTACT_PHONE",value:"123"},
  ]);
});
test("account password policy remains distinct from reset policy", () => {
  assert.equal(isValidPassword("ABCDEFG!"),true); // Lowercase was never required here.
  assert.equal(isValidPassword("Abcdefg1"),true);
  assert.equal(isValidPassword("abcdefg1"),false);
  assert.equal(isValidPassword("Abcdefgh"),false);
  assert.equal(isValidPassword("Abcd1!"),false);
});
test("account history guards preserve empty Spring page responses", () => {
  const page={content:[],totalElements:0,totalPages:0,size:6,number:0,first:true,last:true,numberOfElements:0,empty:true};
  assert.equal(isUserHistoryPage(page),true);
  assert.equal(isUserHistoryPage({...page,content:[{}]}),false);
  assert.equal(isUserHistoryPage({...page,number:"0"}),false);
});
