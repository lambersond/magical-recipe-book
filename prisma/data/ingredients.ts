import { DAMAGE_TYPES } from '../../src/constants/dish-changes'
import { Rarity } from '../enums'
import { biomes } from './biomes'
import type { IngredientChange } from '../../src/schemas/dish-changes'

type SeedIngredient = {
  name: string
  rarity: Rarity
  description: string
  /** What the dish's boon does, as players read it. */
  boon: string
  /** What the dish's bane does, as players read it. */
  bane: string
  /**
   * What the boon changes on a character in Foundry: every part of `boon` that
   * a sheet can hold. What it can't, such as Water Breathing, is told in `boon`.
   */
  boonChanges: IngredientChange[]
  /** What the bane changes on a character in Foundry, as `boonChanges`. */
  baneChanges: IngredientChange[]
  biomes: (typeof biomes)[keyof typeof biomes][]
}

const everyDamageType = (
  type: 'damageResistance' | 'damageVulnerability',
): IngredientChange[] => DAMAGE_TYPES.map(damageType => ({ type, damageType }))

export const ingredients: SeedIngredient[] = [
  {
    name: 'Common Flour',
    rarity: Rarity.Common,
    description: 'Basic flour ground from widely available grains.',
    boon: '+1 Maximum Hit Points.',
    bane: '-1 Maximum Hit Points.',
    boonChanges: [{ type: 'maxHitPoints', value: 1 }],
    baneChanges: [{ type: 'maxHitPoints', value: -1 }],
    biomes: [biomes.biomeAny],
  },
  {
    name: 'Cave Moss',
    rarity: Rarity.Common,
    description: 'Simple green moss that grows in damp cave entrances.',
    boon: '+1 Maximum Hit Points.',
    bane: '-1 Maximum Hit Points.',
    boonChanges: [{ type: 'maxHitPoints', value: 1 }],
    baneChanges: [{ type: 'maxHitPoints', value: -1 }],
    biomes: [
      biomes.biomeUnderdark,
      biomes.biomeSubterranean,
      biomes.biomeLakes,
    ],
  },
  {
    name: 'Ashland Butter',
    rarity: Rarity.Uncommon,
    description: 'Rich butter from animals raised in volcanic regions.',
    boon: 'Advantage on Constitution Saving Throws.',
    bane: 'Disadvantage on Constitution Saving Throws.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ashland Mushrooms',
    rarity: Rarity.Uncommon,
    description:
      'Earthy and resilient fungi, known for their restorative properties.',
    boon: 'Advantage on Strength Checks.',
    bane: 'Disadvantage on Strength Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'check', ability: 'str', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'check', ability: 'str', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Meadow Salt',
    rarity: Rarity.Uncommon,
    description:
      'Crystalline salt harvested from dried meadow pools with subtle magical properties.',
    boon: 'Advantage on Constitution Saving Throws.',
    bane: 'Disadvantage on Constitution Saving Throws.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Tidepool Kelp',
    rarity: Rarity.Uncommon,
    description: 'Resilient seaweed that enhances physical endurance.',
    boon: 'Advantage on Strength Checks.',
    bane: 'Disadvantage on Strength Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'check', ability: 'str', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'check', ability: 'str', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeCoastal, biomes.biomeOcean, biomes.biomeLakes],
  },
  {
    name: 'Frost Lichen',
    rarity: Rarity.Uncommon,
    description:
      'Hardy lichen that survives in cold environments, sharpening reflexes.',
    boon: 'Advantage on Dexterity Saving Throws.',
    bane: 'Disadvantage on Dexterity Saving Throws.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Ember Moss',
    rarity: Rarity.Uncommon,
    description: 'Heat-resistant moss that enhances mental fortitude.',
    boon: 'Advantage on Wisdom Saving Throws.',
    bane: 'Disadvantage on Wisdom Saving Throws.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Pine Needles',
    rarity: Rarity.Uncommon,
    description: 'Aromatic needles that enhance natural awareness.',
    boon: 'Advantage on Survival Checks.',
    bane: 'Disadvantage on Survival Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'sur', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'sur', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Bog Berries',
    rarity: Rarity.Uncommon,
    description: 'Tart berries that improve resistance to toxins.',
    boon: 'Advantage on Constitution Checks.',
    bane: 'Disadvantage on Constitution Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'check', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'check', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeSwamps],
  },
  {
    name: 'Mountain Herbs',
    rarity: Rarity.Uncommon,
    description: 'Hardy herbs that enhance physical prowess.',
    boon: 'Advantage on Athletics Checks.',
    bane: 'Disadvantage on Athletics Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'ath', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'ath', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeMountains, biomes.biomeHighlands],
  },
  {
    name: 'Starlight Petals',
    rarity: Rarity.Uncommon,
    description: 'Delicate petals that enhance divine connection.',
    boon: 'Advantage on Religion Checks.',
    bane: 'Disadvantage on Religion Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'rel', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'rel', mode: 'disadvantage' },
    ],
    biomes: [
      biomes.biomeExtraplanar,
      biomes.biomeCelestial,
      biomes.biomeDesert,
    ],
  },
  {
    name: 'Shadowleaf',
    rarity: Rarity.Uncommon,
    description: 'Dark leaves that enhance stealth and cunning.',
    boon: 'Advantage on Stealth Checks.',
    bane: 'Disadvantage on Stealth Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'ste', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'ste', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeForests, biomes.biomeSwamps],
  },
  {
    name: 'Windgrass',
    rarity: Rarity.Uncommon,
    description:
      'Flexible grass that sways with every breeze, enhancing agility.',
    boon: 'Advantage on Acrobatics Checks.',
    bane: 'Disadvantage on Acrobatics Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'acr', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'acr', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Ironbark Essence',
    rarity: Rarity.VeryRare,
    description: 'Concentrated essence from metal-hard ironwood trees.',
    boon: '+2 to Strength and resistance to slashing damage.',
    bane: '-2 to Strength and vulnerability to slashing damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'str', value: 2 },
      { type: 'damageResistance', damageType: 'slashing' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'str', value: -2 },
      { type: 'damageVulnerability', damageType: 'slashing' },
    ],
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Glacier Heart Crystal',
    rarity: Rarity.VeryRare,
    description:
      'A crystal formed in the heart of ancient glaciers, radiating cold wisdom.',
    boon: '+2 to Wisdom and resistance to cold damage.',
    bane: '-2 to Wisdom and vulnerability to cold damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'wis', value: 2 },
      { type: 'damageResistance', damageType: 'cold' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'wis', value: -2 },
      { type: 'damageVulnerability', damageType: 'cold' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Stormcaller Powder',
    rarity: Rarity.VeryRare,
    description: 'Electrified powder that crackles with captured lightning.',
    boon: '+2 to Dexterity and resistance to lightning damage.',
    bane: '-2 to Dexterity and vulnerability to lightning damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'dex', value: 2 },
      { type: 'damageResistance', damageType: 'lightning' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'dex', value: -2 },
      { type: 'damageVulnerability', damageType: 'lightning' },
    ],
    biomes: [biomes.biomeMountains, biomes.biomeHighlands],
  },
  {
    name: 'Voidtouched Nectar',
    rarity: Rarity.VeryRare,
    description:
      'Sweet nectar that has been touched by the void between planes.',
    boon: '+2 to Intelligence and resistance to psychic damage.',
    bane: '-2 to Intelligence and vulnerability to psychic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 2 },
      { type: 'damageResistance', damageType: 'psychic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -2 },
      { type: 'damageVulnerability', damageType: 'psychic' },
    ],
    biomes: [biomes.biomeExtraplanar],
  },
  {
    name: 'Deepcoral Extract',
    rarity: Rarity.VeryRare,
    description: 'Mystical extract from coral that grows in oceanic trenches.',
    boon: '+2 on all attack rolls and resistance to necrotic damage.',
    bane: '-2 on all attack rolls and vulnerability to necrotic damage.',
    boonChanges: [
      { type: 'rollBonus', roll: 'attack', value: 2 },
      { type: 'damageResistance', damageType: 'necrotic' },
    ],
    baneChanges: [
      { type: 'rollBonus', roll: 'attack', value: -2 },
      { type: 'damageVulnerability', damageType: 'necrotic' },
    ],
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Golden Prairie Tubers',
    rarity: Rarity.Uncommon,
    description: 'Nutty, sweet root vegetable from grasslands.',
    boon: 'Advantage on Constitution Checks.',
    bane: 'Disadvantage on Constitution Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'check', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'check', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Hill Garlic',
    rarity: Rarity.Uncommon,
    description: 'Sharp, aromatic garlic growing in rocky soils.',
    boon: 'Advantage on Constitution Saving Throws.',
    bane: 'Disadvantage on Constitution Saving Throws.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Skywheat',
    rarity: Rarity.Uncommon,
    description: 'Grain swaying on wind-battered cliffs and peaks.',
    boon: 'Advantage on Dexterity Saving Throws.',
    bane: 'Disadvantage on Dexterity Saving Throws.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeMountains, biomes.biomeHighlands],
  },
  {
    name: 'Rustroot',
    rarity: Rarity.Uncommon,
    description: 'Spicy, reddish root used sparingly.',
    boon: 'Advantage on Constitution Checks.',
    bane: 'Disadvantage on Constitution Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'check', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'check', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeUnderdark, biomes.biomeSubterranean],
  },
  {
    name: 'Starpetal Dust',
    rarity: Rarity.Uncommon,
    description: 'Ground pollen of nocturnal star-shaped flowers.',
    boon: 'Advantage on Arcana Checks.',
    bane: 'Disadvantage on Arcana Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'arc', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'arc', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeForests, biomes.biomeLakes],
  },
  {
    name: 'Mirefruit',
    rarity: Rarity.Uncommon,
    description: 'Sour fruit with a pungent aroma, common in marshy thickets.',
    boon: 'Advantage on Wisdom Checks.',
    bane: 'Disadvantage on Wisdom Checks.',
    boonChanges: [
      { type: 'rollMode', roll: 'check', ability: 'wis', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'check', ability: 'wis', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeSwamps],
  },
  {
    name: 'Hearthmoss',
    rarity: Rarity.Rare,
    description:
      'A warm, spongy moss that grows in abandoned hearths and magical ruins.',
    boon: '+1 to Dexterity.',
    bane: '-1 to Dexterity.',
    boonChanges: [{ type: 'abilityScore', ability: 'dex', value: 1 }],
    baneChanges: [{ type: 'abilityScore', ability: 'dex', value: -1 }],
    biomes: [biomes.biomeAny],
  },
  {
    name: 'Ash Sugar',
    rarity: Rarity.Rare,
    description: 'Smoky-sweet sugar refined from volcanic cane.',
    boon: '+1 to Charisma and resistance to psychic damage.',
    bane: '-1 to Charisma and vulnerability to psychic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'cha', value: 1 },
      { type: 'damageResistance', damageType: 'psychic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'cha', value: -1 },
      { type: 'damageVulnerability', damageType: 'psychic' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ember Sage',
    rarity: Rarity.Rare,
    description: 'Aromatic herb with fiery potency used to impart smokiness.',
    boon: '+1 to Dexterity and +1 on all Damage Rolls.',
    bane: '-1 to Dexterity and -1 on all Damage Rolls.',
    boonChanges: [
      { type: 'abilityScore', ability: 'dex', value: 1 },
      { type: 'rollBonus', roll: 'damage', value: 1 },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'dex', value: -1 },
      { type: 'rollBonus', roll: 'damage', value: -1 },
    ],
    biomes: [biomes.biomeVolcanic, biomes.biomeDesert],
  },
  {
    name: 'Ashcap Fungus',
    rarity: Rarity.Rare,
    description:
      'Spicy, volcanic fungus with a smoky aroma and energizing burn.',
    boon: '+1 to Constitution and resistance to fire damage.',
    bane: '-1 to Constitution and vulnerability to fire damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'con', value: 1 },
      { type: 'damageResistance', damageType: 'fire' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'con', value: -1 },
      { type: 'damageVulnerability', damageType: 'fire' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Fireberries',
    rarity: Rarity.Rare,
    description: 'Tart, spicy berries harvested near lava vents.',
    boon: 'Gain 3+1d6 Maximum Hit Points and resistance to fire damage.',
    bane: 'Lose 3+1d6 Maximum Hit Points and vulnerability to fire damage.',
    boonChanges: [
      { type: 'maxHitPoints', roll: '3+1d6', sign: 1 },
      { type: 'damageResistance', damageType: 'fire' },
    ],
    baneChanges: [
      { type: 'maxHitPoints', roll: '3+1d6', sign: -1 },
      { type: 'damageVulnerability', damageType: 'fire' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Smoldercap Mushrooms',
    rarity: Rarity.Rare,
    description:
      'Dense, meaty mushrooms with smoky flavor found near volcanic vents.',
    boon: 'Advantage on Perception checks and resistance to poison damage.',
    bane: 'Disadvantage on Perception checks and vulnerability to poison damage.',
    boonChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'prc', mode: 'advantage' },
      { type: 'damageResistance', damageType: 'poison' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'prc', mode: 'disadvantage' },
      { type: 'damageVulnerability', damageType: 'poison' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Emberleaf Extract',
    rarity: Rarity.Rare,
    description:
      'Syrup from flameleaf trees, used for intense heat and sweetness.',
    boon: 'Resistance to fire damage and advantage on Dexterity saves.',
    bane: 'Vulnerability to fire damage and disadvantage on Dexterity saves.',
    boonChanges: [
      { type: 'damageResistance', damageType: 'fire' },
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'damageVulnerability', damageType: 'fire' },
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Volcanic Yeast',
    rarity: Rarity.Rare,
    description: 'Yeast strain harvested from deep-heated chambers or vents.',
    boon: 'Resistance to fire damage and advantage on Constitution saving throws.',
    bane: 'Vulnerability to fire damage and disadvantage on Constitution saving throws.',
    boonChanges: [
      { type: 'damageResistance', damageType: 'fire' },
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'damageVulnerability', damageType: 'fire' },
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ashen Root',
    rarity: Rarity.Rare,
    description:
      'A dense, bitter tuber that absorbs smoky flavor and thickens stews.',
    boon: '+1 to all ability checks and saving throws.',
    bane: '-1 to all ability checks and saving throws.',
    boonChanges: [
      { type: 'rollBonus', roll: 'check', value: 1 },
      { type: 'rollBonus', roll: 'save', value: 1 },
    ],
    baneChanges: [
      { type: 'rollBonus', roll: 'check', value: -1 },
      { type: 'rollBonus', roll: 'save', value: -1 },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Snowmilk',
    rarity: Rarity.Rare,
    description: 'Naturally chilled dairy from frost cows.',
    boon: 'Resistance to cold damage.',
    bane: 'Vulnerability to cold damage.',
    boonChanges: [{ type: 'damageResistance', damageType: 'cold' }],
    baneChanges: [{ type: 'damageVulnerability', damageType: 'cold' }],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Midnight Lotus',
    rarity: Rarity.Rare,
    description: 'Aquatic flower, blooming only at night with calming magic.',
    boon: 'Advantage on Wisdom saving throws and resistance to cold damage.',
    bane: 'Disadvantage on Wisdom saving throws and vulnerability to cold damage.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'advantage' },
      { type: 'damageResistance', damageType: 'cold' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'disadvantage' },
      { type: 'damageVulnerability', damageType: 'cold' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Frostbloom',
    rarity: Rarity.Rare,
    description: 'Pale blue flower found in the tundra, harvested before dawn.',
    boon: 'Resistance to cold damage and advantage on Wisdom saving throws.',
    bane: 'Vulnerability to cold damage and disadvantage on Wisdom saving throws.',
    boonChanges: [
      { type: 'damageResistance', damageType: 'cold' },
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'damageVulnerability', damageType: 'cold' },
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Whisper Thyme',
    rarity: Rarity.Rare,
    description: 'Subtle herb believed to enhance mental clarity.',
    boon: '+1 to Intelligence and resistance to psychic damage.',
    bane: '-1 to Intelligence and vulnerability to psychic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 1 },
      { type: 'damageResistance', damageType: 'psychic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -1 },
      { type: 'damageVulnerability', damageType: 'psychic' },
    ],
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Tempest Yolk',
    rarity: Rarity.Rare,
    description: 'Electrified egg from storm rocs or sky nests.',
    boon: 'Resistance to lightning damage and advantage on Dexterity saving throws.',
    bane: 'Vulnerability to lightning damage and disadvantage on Dexterity saving throws.',
    boonChanges: [
      { type: 'damageResistance', damageType: 'lightning' },
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'damageVulnerability', damageType: 'lightning' },
      { type: 'rollMode', roll: 'save', ability: 'dex', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeMountains, biomes.biomeHighlands],
  },
  {
    name: 'Blightbark Leaf',
    rarity: Rarity.Rare,
    description: 'Bitter leaf with toxin-resistant properties.',
    boon: 'Resistance to poison damage and advantage on Constitution saving throws.',
    bane: 'Vulnerability to poison damage and disadvantage on Constitution saving throws.',
    boonChanges: [
      { type: 'damageResistance', damageType: 'poison' },
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'damageVulnerability', damageType: 'poison' },
      { type: 'rollMode', roll: 'save', ability: 'con', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeUnderdark, biomes.biomeSubterranean],
  },
  {
    name: 'Fenroot',
    rarity: Rarity.Rare,
    description: 'Black-veined root that seeps a numbing sap.',
    boon: '+1 to Strength and resistance to necrotic damage.',
    bane: '-1 to Strength and vulnerability to necrotic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'str', value: 1 },
      { type: 'damageResistance', damageType: 'necrotic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'str', value: -1 },
      { type: 'damageVulnerability', damageType: 'necrotic' },
    ],
    biomes: [biomes.biomeSwamps],
  },
  {
    name: 'Citrus Thistle',
    rarity: Rarity.Rare,
    description: 'Spiny magical plant used in custards.',
    boon: '+1 to Intelligence and resistance to radiant damage.',
    bane: '-1 to Intelligence and vulnerability to radiant damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 1 },
      { type: 'damageResistance', damageType: 'radiant' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -1 },
      { type: 'damageVulnerability', damageType: 'radiant' },
    ],
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Sunrise Berries',
    rarity: Rarity.Rare,
    description: 'Cheerfully tart berries said to bloom with the dawn.',
    boon: 'Advantage on Wisdom saving throws.',
    bane: 'Disadvantage on Wisdom saving throws.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Whisperdew Resin',
    rarity: Rarity.Rare,
    description:
      'A sticky, translucent sap that collects in silent groves touched by moonlight.',
    boon: 'Advantage on Wisdom saving throws and resistance to bludgeoning damage.',
    bane: 'Disadvantage on Wisdom saving throws and vulnerability to bludgeoning damage.',
    boonChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'advantage' },
      { type: 'damageResistance', damageType: 'bludgeoning' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'save', ability: 'wis', mode: 'disadvantage' },
      { type: 'damageVulnerability', damageType: 'bludgeoning' },
    ],
    biomes: [biomes.biomeAny],
  },
  {
    name: 'Salt Pearl',
    rarity: Rarity.VeryRare,
    description: 'Crystallized salt cluster from deep tidepools.',
    boon: '+2 to Intelligence and resistance to necrotic damage.',
    bane: '-2 to Intelligence and vulnerability to necrotic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 2 },
      { type: 'damageResistance', damageType: 'necrotic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -2 },
      { type: 'damageVulnerability', damageType: 'necrotic' },
    ],
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Yellowroot Cheese',
    rarity: Rarity.VeryRare,
    description: 'Aged cheese with tangy flavor and slight arcane resonance.',
    boon: '+2 to Constitution and resistance to thunder damage.',
    bane: '-2 to Constitution and vulnerability to thunder damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'con', value: 2 },
      { type: 'damageResistance', damageType: 'thunder' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'con', value: -2 },
      { type: 'damageVulnerability', damageType: 'thunder' },
    ],
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Amberberry',
    rarity: Rarity.VeryRare,
    description: 'Bright berries from hill shrubs with energizing sweetness.',
    boon: '+2 to Dexterity and resistance to fire damage.',
    bane: '-2 to Dexterity and vulnerability to fire damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'dex', value: 2 },
      { type: 'damageResistance', damageType: 'fire' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'dex', value: -2 },
      { type: 'damageVulnerability', damageType: 'fire' },
    ],
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Whisper Thyme',
    rarity: Rarity.VeryRare,
    description: 'Subtle herb believed to enhance mental clarity.',
    boon: '+2 to Intelligence and resistance to psychic damage.',
    bane: '-2 to Intelligence and vulnerability to psychic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 2 },
      { type: 'damageResistance', damageType: 'psychic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -2 },
      { type: 'damageVulnerability', damageType: 'psychic' },
    ],
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Flash Salt',
    rarity: Rarity.VeryRare,
    description:
      'Bright, crackling salt harvested from evaporated lightning pools.',
    boon: '+2 to Dexterity and resistance to lightning damage.',
    bane: '-2 to Dexterity and vulnerability to lightning damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'dex', value: 2 },
      { type: 'damageResistance', damageType: 'lightning' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'dex', value: -2 },
      { type: 'damageVulnerability', damageType: 'lightning' },
    ],
    biomes: [biomes.biomeMountains, biomes.biomeHighlands, biomes.biomeDesert],
  },
  {
    name: 'Kelpheart Vine',
    rarity: Rarity.VeryRare,
    description: 'Bioluminescent seaweed pulsing with magical nutrients.',
    boon: '+2 to Intelligence and resistance to necrotic damage.',
    bane: '-2 to Intelligence and vulnerability to necrotic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 2 },
      { type: 'damageResistance', damageType: 'necrotic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -2 },
      { type: 'damageVulnerability', damageType: 'necrotic' },
    ],
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Glimmergold Fruit',
    rarity: Rarity.VeryRare,
    description: 'Glowing citrus found during solar flares or in planar folds.',
    boon: '+2 on all attack rolls and resistance to radiant damage.',
    bane: '-2 on all attack rolls and vulnerability to radiant damage.',
    boonChanges: [
      { type: 'rollBonus', roll: 'attack', value: 2 },
      { type: 'damageResistance', damageType: 'radiant' },
    ],
    baneChanges: [
      { type: 'rollBonus', roll: 'attack', value: -2 },
      { type: 'damageVulnerability', damageType: 'radiant' },
    ],
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Infernal Pepper',
    rarity: Rarity.Epic,
    description: 'Blisteringly hot pepper that radiates heat.',
    boon: '+3 to Charisma and resistance to fire damage.',
    bane: '-3 to Charisma and vulnerability to fire damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'cha', value: 3 },
      { type: 'damageResistance', damageType: 'fire' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'cha', value: -3 },
      { type: 'damageVulnerability', damageType: 'fire' },
    ],
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Molten Sugar Crystals',
    rarity: Rarity.Epic,
    description: 'Slow-melting sugar that crackles when heated.',
    boon: '+3 to Charisma and resistance to fire damage.',
    bane: '-3 to Charisma and vulnerability to fire damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'cha', value: 3 },
      { type: 'damageResistance', damageType: 'fire' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'cha', value: -3 },
      { type: 'damageVulnerability', damageType: 'fire' },
    ],
    biomes: [biomes.biomeVolcanic, biomes.biomeDesert],
  },
  {
    name: 'Abyssal Reed',
    rarity: Rarity.Epic,
    description: 'Shadowy reed that grows only in cursed, still waters.',
    boon: '+3 to Dexterity and advantage on Stealth checks.',
    bane: '-3 to Dexterity and disadvantage on Stealth checks.',
    boonChanges: [
      { type: 'abilityScore', ability: 'dex', value: 3 },
      { type: 'rollMode', roll: 'skill', skill: 'ste', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'dex', value: -3 },
      { type: 'rollMode', roll: 'skill', skill: 'ste', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands, biomes.biomesRiver],
  },
  {
    name: 'Glowlure Algae',
    rarity: Rarity.Epic,
    description:
      'Bioluminescent aquatic algae that glow faintly even when dried.',
    boon: 'Darkvision (60 ft), Water Breathing, and advantage on Perception checks.',
    bane: 'Scared of the Dark (must make DC 10 WIS save to enter dark areas). Weak Lungs. 1d4 chance of drowning each round when submerged in water for more than 1 minute, and disadvantage on Perception checks.',
    boonChanges: [
      { type: 'sense', sense: 'darkvision', range: 60 },
      { type: 'rollMode', roll: 'skill', skill: 'prc', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'prc', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Nightberries',
    rarity: Rarity.Epic,
    description: 'Deep violet fruit glowing faintly in moonlight.',
    boon: 'Extended Darkvision (120 ft), advantage on Insight checks, and advantage on Arcana checks.',
    bane: 'Scared of the Dark. You must make a DC 18 WIS Saving Throw to enter a dark or dimly-lit area, disadvantage on Insight checks, and disadvantage on Arcana checks.',
    boonChanges: [
      { type: 'sense', sense: 'darkvision', range: 120 },
      { type: 'rollMode', roll: 'skill', skill: 'ins', mode: 'advantage' },
      { type: 'rollMode', roll: 'skill', skill: 'arc', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'rollMode', roll: 'skill', skill: 'ins', mode: 'disadvantage' },
      { type: 'rollMode', roll: 'skill', skill: 'arc', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeForests, biomes.biomesRiver],
  },
  {
    name: 'Faelight Bark',
    rarity: Rarity.Epic,
    description: 'Luminescent bark from fey-touched trees.',
    boon: '+3 to Intelligence and advantage on Arcana checks.',
    bane: '-3 to Intelligence and disadvantage on Arcana checks.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 3 },
      { type: 'rollMode', roll: 'skill', skill: 'arc', mode: 'advantage' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -3 },
      { type: 'rollMode', roll: 'skill', skill: 'arc', mode: 'disadvantage' },
    ],
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Crimson Figs',
    rarity: Rarity.Epic,
    description: 'Dense, sweet fruit that turns velvety and bold when cooked.',
    boon: '+3 to Charisma and immunity to being frightened.',
    bane: '-3 to Charisma and you are Spooked. You have a 1d4 chance of becoming Frightened at the start of each turn, until the start of your next turn.',
    boonChanges: [
      { type: 'abilityScore', ability: 'cha', value: 3 },
      { type: 'conditionImmunity', condition: 'frightened' },
    ],
    baneChanges: [{ type: 'abilityScore', ability: 'cha', value: -3 }],
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Thunderroot',
    rarity: Rarity.Epic,
    description: 'Pulsing root that crackles faintly when touched.',
    boon: '+3 to Strength and resistance to thunder and lightning damage.',
    bane: '-3 to Strength and vulnerability to thunder and lightning damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'str', value: 3 },
      { type: 'damageResistance', damageType: 'thunder' },
      { type: 'damageResistance', damageType: 'lightning' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'str', value: -3 },
      { type: 'damageVulnerability', damageType: 'thunder' },
      { type: 'damageVulnerability', damageType: 'lightning' },
    ],
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Leviathan Ink',
    rarity: Rarity.Epic,
    description:
      'Distilled ink from a sea leviathan, pulsing with arcane energy.',
    boon: '+3 to Intelligence and resistance to force damage.',
    bane: '-3 to Intelligence and vulnerability to force damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 3 },
      { type: 'damageResistance', damageType: 'force' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -3 },
      { type: 'damageVulnerability', damageType: 'force' },
    ],
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Bogshade Fungus',
    rarity: Rarity.Epic,
    description: 'Rare, spongy fungus found under rotting logs in cursed bogs.',
    boon: '+3 to Dexterity and resistance to psychic damage.',
    bane: '-3 to Dexterity and vulnerability to psychic damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'dex', value: 3 },
      { type: 'damageResistance', damageType: 'psychic' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'dex', value: -3 },
      { type: 'damageVulnerability', damageType: 'psychic' },
    ],
    biomes: [biomes.biomeSwamps],
  },
  {
    name: 'Crushed Crystallized Dragon Marrow',
    rarity: Rarity.Legendary,
    description:
      'Extracted bone marrow from a dragon, crystallized under extreme pressure, then crushed into a powder.',
    boon: '+4 to Constitution, immunity to being frightened, and resistance to all damage types.',
    bane: '-4 to Constitution, vulnerability to all damage types, and you are Spooked. You have a 1d4 chance of becoming Frightened at the start of each turn, until the start of your next turn.',
    boonChanges: [
      { type: 'abilityScore', ability: 'con', value: 4 },
      { type: 'conditionImmunity', condition: 'frightened' },
      ...everyDamageType('damageResistance'),
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'con', value: -4 },
      ...everyDamageType('damageVulnerability'),
    ],
    biomes: [biomes.biomeAny],
  },
  {
    name: 'Phoenix Feather Dust',
    rarity: Rarity.Legendary,
    description:
      'Powdered remnants of a phoenix feather, radiating eternal flame.',
    boon: '+4 to Constitution and immunity to being petrified.',
    bane: '-4 to Constitution and Rock On. You have a 1d4 chance of becoming Petrified at the start of each turn, until the start of your next turn.',
    boonChanges: [
      { type: 'abilityScore', ability: 'con', value: 4 },
      { type: 'conditionImmunity', condition: 'petrified' },
    ],
    baneChanges: [{ type: 'abilityScore', ability: 'con', value: -4 }],
    biomes: [biomes.biomeVolcanic, biomes.biomeExtraplanar],
  },
  {
    name: 'Kraken Ink Concentrate',
    rarity: Rarity.Legendary,
    description:
      'Concentrated essence from an ancient kraken, pulsing with deep ocean magic.',
    boon: '+4 to Intelligence and immunity to exhaustion.',
    bane: '-4 to Intelligence and Tired. Gain one level of Exhaustion.',
    boonChanges: [
      { type: 'abilityScore', ability: 'int', value: 4 },
      { type: 'conditionImmunity', condition: 'exhaustion' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'int', value: -4 },
      { type: 'exhaustion', levels: 1 },
    ],
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Void Crystal Fragments',
    rarity: Rarity.Legendary,
    description:
      'Crystallized fragments from the space between planes, defying comprehension.',
    boon: '+4 to Wisdom and immunity to being stunned.',
    bane: '-4 to Wisdom and Star Struck. You have a 1d4 chance of becoming Stunned at the start of each turn, until the start of your next turn.',
    boonChanges: [
      { type: 'abilityScore', ability: 'wis', value: 4 },
      { type: 'conditionImmunity', condition: 'stunned' },
    ],
    baneChanges: [{ type: 'abilityScore', ability: 'wis', value: -4 }],
    biomes: [biomes.biomeExtraplanar],
  },
  {
    name: 'Ancient Treant Heartwood',
    rarity: Rarity.Legendary,
    description:
      'Core wood from a millennia-old treant, containing the wisdom of ages.',
    boon: '+4 to Charisma and immunity to being stunned.',
    bane: '-4 to Charisma and Star Struck. You have a 1d4 chance of becoming Stunned at the start of each turn, until the start of your next turn.',
    boonChanges: [
      { type: 'abilityScore', ability: 'cha', value: 4 },
      { type: 'conditionImmunity', condition: 'stunned' },
    ],
    baneChanges: [{ type: 'abilityScore', ability: 'cha', value: -4 }],
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Frostmark Petals',
    rarity: Rarity.Rare,
    description:
      'A striking flower with brilliant blue petals marked by dark, tattoo-like splotches that seem to shift in the cold. Found only in the harshest winter environments.',
    boon: '+1 to Strength and resistance to cold damage.',
    bane: '-1 to Strength and vulnerability to cold damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'str', value: 1 },
      { type: 'damageResistance', damageType: 'cold' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'str', value: -1 },
      { type: 'damageVulnerability', damageType: 'cold' },
    ],
    biomes: [biomes.biomeLakes, biomes.biomeWetlands, biomes.biomeMountains],
  },
  {
    name: 'Flapjack Maple Sap',
    rarity: Rarity.VeryRare,
    description:
      'A thick, golden syrup that oozes from ancient enchanted maple trees. Sweet and sticky with potent magical properties that enhance vitality and warmth.',
    boon: '+2 to Constitution and resistance to cold damage.',
    bane: '-2 to Constitution and vulnerability to cold damage.',
    boonChanges: [
      { type: 'abilityScore', ability: 'con', value: 2 },
      { type: 'damageResistance', damageType: 'cold' },
    ],
    baneChanges: [
      { type: 'abilityScore', ability: 'con', value: -2 },
      { type: 'damageVulnerability', damageType: 'cold' },
    ],
    biomes: [biomes.biomeForests],
  },
]
