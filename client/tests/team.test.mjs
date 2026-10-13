import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { BOARD_MEMBERS, CREATIVE_TEAM } from "../src/sections/about/team/data/teamMembers.ts";

test("team has thirteen unique slots with localized fields and portrait directories", () => {
  assert.equal(CREATIVE_TEAM.length, 8);
  assert.equal(BOARD_MEMBERS.length, 5);
  const members = [...CREATIVE_TEAM, ...BOARD_MEMBERS];
  assert.equal(new Set(members.map(({ id }) => id)).size, 13);
  for (const member of members) {
    for (const lang of ["en", "mn"]) {
      assert.equal(typeof member.name[lang], "string");
      assert.equal(typeof member.role[lang], "string");
      assert.ok(member.role[lang].length > 0);
      assert.equal(typeof member.biography[lang], "string");
    }
    assert.equal(member.images.default, `/images/site/team/${member.id}/1.webp`);
    assert.equal(member.images.hover, `/images/site/team/${member.id}/2.webp`);
    assert.ok(existsSync(new URL(`../public/images/site/team/${member.id}/`, import.meta.url)));
  }
});

