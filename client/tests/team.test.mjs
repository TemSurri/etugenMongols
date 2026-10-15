import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { FOUNDERS, EXECUTIVE_TEAM } from "../src/sections/about/team/data/teamMembers.ts";

test("team has thirteen unique slots with localized fields and portrait directories", () => {
  assert.equal(EXECUTIVE_TEAM.length, 8);
  assert.equal(FOUNDERS.length, 5);
  const members = [...EXECUTIVE_TEAM, ...FOUNDERS];
  assert.equal(new Set(members.map(({ id }) => id)).size, 13);
  for (const member of members) {
    for (const lang of ["en", "mn"]) {
      assert.equal(typeof member.name.givenName, "string");
      assert.ok(member.name.mn.length > 0);
      assert.ok(/^[\x20-\x7E]+$/.test(member.name.givenName));
      assert.ok(member.roleDescription[lang].length > 0);
      assert.ok(member.biography[lang].length > 0);
      assert.equal(typeof member.role[lang], "string");
      assert.ok(member.role[lang].length > 0);
      assert.equal(typeof member.biography[lang], "string");
    }
    assert.equal(member.images.default, `/images/site/team/${member.id}/1.webp`);
    assert.equal(member.images.hover, `/images/site/team/${member.id}/2.webp`);
    assert.ok(existsSync(new URL(`../public/images/site/team/${member.id}/`, import.meta.url)));
  }
});

