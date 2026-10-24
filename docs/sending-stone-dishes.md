# Sending dishes to Foundry

A player who eats a dish they cooked can send it to their game in Foundry
through [Sending Stone](https://github.com/lambersond/sending-stone-player). The
Gamemaster then chooses which characters ate it, and its boon or bane is applied
to them as an effect.

The cookbook's side is complete. Sending Stone and its Foundry module don't take
dishes yet, so this is off everywhere until `SENDING_STONE_ENABLED` is set.

## Turning it on

| Variable | Meaning |
| --- | --- |
| `SENDING_STONE_ENABLED` | `true` to send dishes; anything else, or unset, sends nothing. Production leaves it unset until Sending Stone and its module are ready. |
| `SENDING_STONE_URL` | Sending Stone's address, such as `https://sending-stone.vercel.app`. Needed once sending is on. |

While it's off, the app shows no way to link or send, and its routes answer
`404`.

## Linking a character

Each character is linked to its seat in Sending Stone with a **link code** that
Sending Stone gives its player, pasted under the character's menu, **Link
Sending Stone**. The code says which campaign and Foundry character a dish is
for, so the cookbook needs nothing else. It's kept on the server
(`CharacterSettings.sendingStoneToken`) and never sent back to the browser; the
browser sees only when it was linked (`sendingStoneLinkedAt`).

A code is 1 to 256 of `A-Z a-z 0-9 _ . ~ -`.

## Sending a dish

A dish that has been eaten (boon, bane, success or failure, not prepared or
spoiled) has **Send** on its card in the backpack. It's sent once: the dish is
marked `sentAt` before it goes, and unmarked if Sending Stone doesn't take it, so
the player can try again.

```
POST <SENDING_STONE_URL>/api/cookbook/dishes
Content-Type: application/json
Authorization: Bearer <the character's link code>

<dish>
```

Any `2xx` answer means Sending Stone has the dish. Anything else is shown to the
player: Sending Stone's own words where its JSON has a `message`, otherwise
these.

| Answer | The player is told |
| --- | --- |
| `401`, `403` | Sending Stone didn't accept this character's link. Link it again. |
| `404` | Sending Stone doesn't take dishes yet. |
| `409` | The game isn't taking dishes right now. |
| No answer within 10 s, or none at all | Couldn't reach Sending Stone. Try again in a moment. |
| Anything else | Sending Stone couldn't take this dish just now. |

### The dish

A boon, with a die rolled:

```json
{
  "version": 1,
  "dish": {
    "id": "cm2dish0001",
    "recipe": "Fireberry Glazed Skewers",
    "status": "boon",
    "outcome": "boon",
    "cookedOnDay": 4,
    "consumedOnDay": 4
  },
  "cook": { "name": "Thorin" },
  "message": "Perfectly charred with a bite of heat, leaving you feeling invincible.",
  "effect": {
    "name": "Fireberry Glazed Skewers (Boon)",
    "ingredients": [
      {
        "name": "Fireberries",
        "text": "Gain 3+1d6 Maximum Hit Points and resistance to fire damage."
      }
    ],
    "duration": { "seconds": 86400 },
    "stacks": false,
    "changes": [
      { "type": "maxHitPoints", "value": 7, "formula": "3+1d6" },
      { "type": "damageResistance", "damageType": "fire" }
    ]
  }
}
```

A standard dish (`success` or `failure`) has its message and no effect:

```json
{
  "version": 1,
  "dish": {
    "id": "cm2dish0001",
    "recipe": "Fireberry Glazed Skewers",
    "status": "success",
    "outcome": "standard",
    "cookedOnDay": 4,
    "consumedOnDay": 4
  },
  "cook": { "name": "Thorin" },
  "message": "Grilled meat or mushroom skewers lacquered with a sweet and spicy fireberry glaze. The scent alone makes mouths water.",
  "effect": null
}
```

| Field | Meaning |
| --- | --- |
| `version` | `1`. It changes only for changes a receiver must adapt to. |
| `dish.id` | The cooked dish's id. One id is sent once; treat a repeat as the same dish. |
| `dish.status` | How it was cooked: `boon` (critical success), `bane` (critical failure), `success` or `failure`. |
| `dish.outcome` | `boon` or `bane`, which carry an `effect`, or `standard`, which doesn't. |
| `cook.name` | The cookbook character who cooked it. |
| `message` | The recipe's boon, bane or standard text, as the cookbook shows it: the chat card's words. |
| `effect.name` | The effect's name, such as "Fireberry Glazed Skewers (Boon)". |
| `effect.ingredients` | Each magical ingredient's boon or bane as players read it, including what no change can hold, such as Water Breathing or Scared of the Dark. The effect's description. |
| `effect.duration` | 24 in-game hours. |
| `effect.stacks` | Always `false`: a character has one dish's effect at a time, and a new one replaces it. |
| `effect.changes` | What the effect changes on each character it's applied to; see below. Dice are rolled once, in the cookbook, so every character gets the same. |

### Changes

Every ingredient's changes are in `prisma/data/ingredients.ts`, next to the
boon and bane text, and `prisma/data/ingredients.test.ts` checks the two against
each other. Abilities and skills are dnd5e's keys (`str`, `prc`); damage types
and conditions are dnd5e's too (`fire`, `frightened`).

The dnd5e keys are where these would go in an Active Effect under dnd5e 5.3, a
suggestion for the module to check against its dnd5e, not something the
cookbook relies on.

| Change | Example | Suggested dnd5e change |
| --- | --- | --- |
| `abilityScore` | `{ "type": "abilityScore", "ability": "str", "value": 2 }` | `system.abilities.str.value`, Add `2` |
| `rollMode`, ability check | `{ "type": "rollMode", "roll": "check", "ability": "con", "mode": "advantage" }` | `system.abilities.con.check.roll.mode`, Add `1` (`-1` for disadvantage) |
| `rollMode`, saving throw | `{ "type": "rollMode", "roll": "save", "ability": "wis", "mode": "disadvantage" }` | `system.abilities.wis.save.roll.mode`, Add `-1` |
| `rollMode`, skill | `{ "type": "rollMode", "roll": "skill", "skill": "prc", "mode": "advantage" }` | `system.skills.prc.roll.mode`, Add `1` |
| `rollBonus` | `{ "type": "rollBonus", "roll": "attack", "value": 2 }`; `roll` is `attack`, `damage`, `check` or `save`, for every one | `system.bonuses.{mwak,rwak,msak,rsak}.attack` or `.damage`, or `system.bonuses.abilities.check` or `.save`, Add `+2` |
| `maxHitPoints` | `{ "type": "maxHitPoints", "value": -7, "formula": "3+1d6" }`; `formula` only where it was rolled | `system.attributes.hp.bonuses.overall`, Add `-7` |
| `damageResistance` | `{ "type": "damageResistance", "damageType": "fire" }`; "all damage types" is sent as all 13 | `system.traits.dr.value`, Add `fire` |
| `damageVulnerability` | `{ "type": "damageVulnerability", "damageType": "cold" }` | `system.traits.dv.value`, Add `cold` |
| `conditionImmunity` | `{ "type": "conditionImmunity", "condition": "stunned" }` | `system.traits.ci.value`, Add `stunned` |
| `sense` | `{ "type": "sense", "sense": "darkvision", "range": 120 }` | `system.attributes.senses.darkvision`, Upgrade `120` (check the path under dnd5e 5.3) |
| `exhaustion` | `{ "type": "exhaustion", "levels": 1 }` | `system.attributes.exhaustion`, Add `1`, or raised on the actor directly |
