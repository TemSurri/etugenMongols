import test from "node:test";
import assert from "node:assert/strict";
import { createHistoryCache } from "../src/sections/account/model/historyCache.ts";

const time = "2026-10-12T19:24:56.596090Z";
const activity = id => ({ id, type: "LOGIN", description: id, status: "SUCCESS", createdAt: time });
const page = (ids, next = null) => ({ activities: ids.map(activity), nextCursorTime: next ? time : null, nextCursorId: next });
const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b; }); return {promise,resolve,reject}; };

test("inclusive cursor pages retain every activity and reuse independent category caches", async () => {
  const calls=[];
  const cache=createHistoryCache(async (category,cursor) => {
    calls.push({category,cursor});
    if (category==="participation") return page(["donation","free-registration"]);
    return cursor ? page(["J","K"]) : page(["A","B","C","D","E","F","G","H","I"],"J");
  }, assert.fail);
  await cache.load("account",0);
  await cache.load("account",1);
  assert.deepEqual(calls[1].cursor,{cursorTime:time,cursorId:"J"});
  assert.equal(cache.getSnapshot().account.pages[1].activities[0].id,"J");
  assert.equal(new Set(cache.getSnapshot().account.pages.flatMap(p=>p.activities.map(a=>a.id))).size,11);
  await cache.load("account",0);
  await cache.load("participation",0);
  await cache.load("account",1);
  await cache.load("participation",0);
  assert.equal(calls.length,3);
  assert.equal(cache.getSnapshot().account.currentPageIndex,1);
  assert.equal(cache.getSnapshot().participation.currentPageIndex,0);
  await cache.load("account",2);
  await cache.load("account",5);
  assert.equal(calls.length,3);
});

test("empty and short pages stop; requests cannot overlap; failed next page retries safely", async () => {
  const pending=deferred();
  let calls=0;
  const errors=[];
  const cache=createHistoryCache(async () => {
    calls++;
    if(calls===1) return pending.promise;
    if(calls===2) throw new Error("network");
    return page(["J"]);
  },error=>errors.push(error));
  const first=cache.load("account",0);
  await cache.load("account",0);
  assert.equal(calls,1);
  pending.resolve(page(["A"],"J")); await first;
  await cache.load("account",1);
  assert.equal(cache.getSnapshot().account.pages.length,1);
  assert.equal(cache.getSnapshot().account.failedPage,1);
  assert.equal(errors.length,1);
  await cache.load("account",1);
  assert.equal(cache.getSnapshot().account.error,false);
  await cache.load("account",2);
  assert.equal(calls,3);
  const empty=createHistoryCache(async()=>page([]),assert.fail);
  await empty.load("account",0);
  await empty.load("account",1);
  assert.equal(empty.getSnapshot().account.pages.length,1);
});

test("refresh aborts and ignores stale success or failure; reset clears both private caches", async () => {
  for (const fail of [false,true]) {
    const pending=deferred();
    let calls=0, oldSignal;
    const cache=createHistoryCache(async (_category,_cursor,signal)=>{
      calls++;
      if(calls===1) { oldSignal=signal; return pending.promise; }
      return page(["new"]);
    },assert.fail);
    const old=cache.load("account",0);
    cache.reset();
    assert.equal(oldSignal.aborted,true);
    await cache.load("account",0);
    if(fail) pending.reject(new Error("stale")); else pending.resolve(page(["old"],"next"));
    await old;
    assert.equal(cache.getSnapshot().account.pages[0].activities[0].id,"new");
    await cache.load("participation",0);
    cache.reset();
    assert.equal(cache.getSnapshot().account.pages.length,0);
    assert.equal(cache.getSnapshot().participation.pages.length,0);
  }
});

test("authentication errors reach the session handler",async()=>{
  const error={response:{status:401}};
  let seen;
  const cache=createHistoryCache(async()=>{throw error;},e=>{seen=e;cache.reset();});
  await cache.load("account",0);
  assert.equal(seen,error);
  assert.equal(cache.getSnapshot().account.pages.length,0);
});
