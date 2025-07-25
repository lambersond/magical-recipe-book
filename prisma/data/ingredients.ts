import { Rarity } from '../enums'
import { biomes } from './biomes'

export const ingredients = [
  {
    name: 'Ash Sugar',
    rarity: Rarity.Uncommon,
    description: 'Smoky-sweet sugar refined from volcanic cane.',
    boon: '+1 to Charisma and resistance to psychic damage.',
    bane: '-1 to Charisma based checks and vulnerability to psychic damage.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ember Sage',
    rarity: Rarity.Uncommon,
    description: 'Aromatic herb with fiery potency used to impart smokiness.',
    boon: '+1 to Dexterity and fire damage spells deal +1 damage.',
    bane: '-1 to Dexterity and fire damage spells deal -1 damage.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ashland Butter',
    rarity: Rarity.Uncommon,
    description: 'Rich butter from animals raised in volcanic regions.',
    boon: '+1 to Constitution saving throws.',
    bane: '-1 to Constitution saving throws.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ashcap Fungus',
    rarity: Rarity.Rare,
    description:
      'Spicy, volcanic fungus with a smoky aroma and energizing burn.',
    boon: 'Resistance to fire damage and +1 to Constitution saving throws.',
    bane: 'Vulnerability to fire damage and -1 to Constitution saving throws.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Fireberries',
    rarity: Rarity.Rare,
    description: 'Tart, spicy berries harvested near lava vents.',
    boon: '16 temporary HP and resistance to fire damage.',
    bane: '-16 temporary HP and vulnerability to fire damage.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Smoldercap Mushrooms',
    rarity: Rarity.Rare,
    description:
      'Dense, meaty mushrooms with smoky flavor found near volcanic vents.',
    boon: 'Advantage on Perception checks and resistance to poison damage.',
    bane: 'Disadvantage on Perception checks and vulnerability to poison damage.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Emberleaf Extract',
    rarity: Rarity.Rare,
    description:
      'Syrup from flameleaf trees, used for intense heat and sweetness.',
    boon: 'Resistance to fire damage and advantage on Dexterity saves.',
    bane: 'Vulnerability to fire damage and disadvantage on Dexterity saves.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Volcanic Yeast',
    rarity: Rarity.Rare,
    description: 'Yeast strain harvested from deep-heated chambers or vents.',
    boon: '+2 AC and resistance to exhaustion boons.',
    bane: '-2 AC and vulnerability to exhaustion boons.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ashen Root',
    rarity: Rarity.Rare,
    description:
      'A dense, bitter tuber that absorbs smoky flavor and thickens stews.',
    boon: '+1 to all ability checks and saving throws.',
    bane: '-1 to all ability checks and saving throws.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Infernal Pepper',
    rarity: Rarity.Epic,
    description: 'Blisteringly hot pepper that radiates heat.',
    boon: 'Resistance to fire damage and +3 to Charisma checks.',
    bane: 'Vulnerability to fire damage and -3 to Charisma checks.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Molten Sugar Crystals',
    rarity: Rarity.Epic,
    description: 'Slow-melting sugar that crackles when heated.',
    boon: '+3 to Charisma and resistance to fire damage.',
    bane: '-3 to Charisma and vulnerability to fire damage.',
    biomes: [biomes.biomeVolcanic],
  },
  {
    name: 'Ashland Mushrooms',
    rarity: Rarity.Uncommon,
    description:
      'Earthy and resilient fungi, known for their restorative properties.',
    boon: 'Removes one level of exhaustion and +1 to Strength checks for 8 hours.',
    bane: 'Applies one level of exhaustion and -1 to Strength checks.',
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Snowmilk',
    rarity: Rarity.Uncommon,
    description: 'Naturally chilled dairy from frost cows.',
    boon: 'Resistance to cold damage.',
    bane: 'Vulnerability to cold damage.',
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Midnight Lotus',
    rarity: Rarity.Rare,
    description: 'Aquatic flower, blooming only at night with calming magic.',
    boon: 'Advantage on Wisdom saving throws and resistance to cold damage.',
    bane: 'Disadvantage on Wisdom saving throws and vulnerability to cold damage.',
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Frostbloom',
    rarity: Rarity.Rare,
    description: 'Pale blue flower found in the tundra, harvested before dawn.',
    boon: 'Resistance to cold, +1 Wisdom saving throws, and restores 1d8 HP.',
    bane: 'Vulnerability to cold, -1 Wisdom saving throws, and deals 1d8 HP damage.',
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Glowlure Algae',
    rarity: Rarity.Rare,
    description:
      'Bioluminescent aquatic algae that glow faintly even when dried.',
    boon: 'Grants Darkvision 60ft, waterbreathing, and advantage on Perception checks.',
    bane: 'Grants Blindsight 10ft, suffocation in water, and disadvantage on Perception checks.',
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Abyssal Reed',
    rarity: Rarity.Epic,
    description: 'Shadowy reed that grows only in cursed, still waters.',
    boon: '+3 to Stealth and advantage on Wisdom (Survival) checks.',
    bane: '-3 to Stealth and disadvantage on Wisdom (Survival) checks.',
    biomes: [biomes.biomeLakes, biomes.biomeWetlands],
  },
  {
    name: 'Starpetal Dust',
    rarity: Rarity.Uncommon,
    description: 'Ground pollen of nocturnal star-shaped flowers.',
    boon: '+1 to Arcana checks and resistance to radiant damage.',
    bane: '-1 to Arcana checks and vulnerability to radiant damage.',
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Nightberries',
    rarity: Rarity.Rare,
    description: 'Deep violet fruit glowing faintly in moonlight.',
    boon: 'Darkvision up to 120 ft., advantage on Insight and Arcana checks, and you require no sleep.',
    bane: 'Blindsight up to 10 ft., disadvantage on Insight and Arcana checks, and you require a long rest to sleep.',
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Whisper Thyme',
    rarity: Rarity.Rare,
    description: 'Subtle herb believed to enhance mental clarity.',
    boon: '+1 to Intelligence and resistance to psychic damage.',
    bane: '-1 to Intelligence and vulnerability to psychic damage.',
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Faelight Bark',
    rarity: Rarity.Epic,
    description: 'Luminescent bark from fey-touched trees.',
    boon: '+2 to Intelligence and advantage on Intelligence and Arcana checks.',
    bane: '-2 to Intelligence and disadvantage on Intelligence and Arcana checks.',
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Crimson Figs',
    rarity: Rarity.Rare,
    description: 'Dense, sweet fruit that turns velvety and bold when cooked.',
    boon: '+1 to Charisma checks and immunity to being frightened.',
    bane: '-1 to Charisma checks and susceptibility to being frightened.',
    biomes: [biomes.biomeForests],
  },
  {
    name: 'Golden Prairie Tubers',
    rarity: Rarity.Uncommon,
    description: 'Nutty, sweet root vegetable from grasslands.',
    boon: '+1 to Constitution and Strength checks.',
    bane: '-1 to Constitution and Strength checks.',
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Hill Garlic',
    rarity: Rarity.Uncommon,
    description: 'Sharp, aromatic garlic growing in rocky soils.',
    boon: '+1 to saving throws against poison and necrotic damage.',
    bane: '-1 to saving throws against poison and necrotic damage.',
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Amberberry',
    rarity: Rarity.Rare,
    description: 'Bright berries from hill shrubs with energizing sweetness.',
    boon: '+2 to Dexterity saving throws and resistance to fire damage.',
    bane: '-2 to Dexterity saving throws and vulnerability to fire damage.',
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Whisper Thyme',
    rarity: Rarity.Rare,
    description: 'Subtle herb believed to enhance mental clarity.',
    boon: '+2 to Intelligence and resistance to psychic damage.',
    bane: '-2 to Intelligence and vulnerability to psychic damage.',
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Thunderroot',
    rarity: Rarity.Epic,
    description: 'Pulsing root that crackles faintly when touched.',
    boon: '+3 to Strength checks and resistance to thunder and lightning damage.',
    bane: '-3 to Strength checks and vulnerability to thunder and lightning damage.',
    biomes: [biomes.biomeGrasslands, biomes.biomePlains],
  },
  {
    name: 'Skywheat',
    rarity: Rarity.Uncommon,
    description: 'Grain swaying on wind-battered cliffs and peaks.',
    boon: '+1 to initiative and resistance to lightning damage.',
    bane: '-1 to initiative and vulnerability to lightning damage.',
    biomes: [biomes.biomeMountains, biomes.biomeHighlands],
  },
  {
    name: 'Tempest Yolk',
    rarity: Rarity.Rare,
    description: 'Electrified egg from storm rocs or sky nests.',
    boon: 'Resistance to lightning damage, +2 to initiative rolls.',
    bane: 'Vulnerability to lightning damage, -2 to initiative rolls.',
    biomes: [biomes.biomeMountains, biomes.biomeHighlands],
  },
  {
    name: 'Flash Salt',
    rarity: Rarity.Epic,
    description:
      'Bright, crackling salt harvested from evaporated lightning pools.',
    boon: '+2 to Dexterity checks and resistance to lightning damage.',
    bane: '-2 to Dexterity checks and vulnerability to lightning damage.',
    biomes: [biomes.biomeMountains, biomes.biomeHighlands],
  },
  {
    name: 'Rustroot',
    rarity: Rarity.Uncommon,
    description: 'Spicy, reddish root used sparingly.',
    boon: 'Advantage on Constitution checks and acid resistance.',
    bane: 'Disadvantage on Constitution checks and vulnerability to acid damage.',
    biomes: [biomes.biomeUnderdark, biomes.biomeSubterranean],
  },
  {
    name: 'Blightbark Leaf',
    rarity: Rarity.Rare,
    description: 'Bitter leaf with toxin-resistant properties.',
    boon: 'Immunity to poison condition and +2 AC against the first hit per combat.',
    bane: 'Vulnerability to poison condition and -2 AC against the first hit per combat.',
    biomes: [biomes.biomeUnderdark, biomes.biomeSubterranean],
  },
  {
    name: 'Salt Pearl',
    rarity: Rarity.Uncommon,
    description: 'Crystallized salt cluster from deep tidepools.',
    boon: '+2 to Intelligence checks and resistance to necrotic damage.',
    bane: '-2 to Intelligence checks and vulnerability to necrotic damage.',
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Kelpheart Vine',
    rarity: Rarity.Rare,
    description: 'Bioluminescent seaweed pulsing with magical nutrients.',
    boon: '+2 to Intelligence and resistance to necrotic damage.',
    bane: '-2 to Intelligence and vulnerability to necrotic damage.',
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Leviathan Ink',
    rarity: Rarity.Epic,
    description:
      'Distilled ink from a sea leviathan, pulsing with arcane energy.',
    boon: '+2 to Intelligence and resistance to force damage.',
    bane: '-2 to Intelligence and vulnerability to force damage.',
    biomes: [biomes.biomeCoastal, biomes.biomeOcean],
  },
  {
    name: 'Mirefruit',
    rarity: Rarity.Uncommon,
    description: 'Sour fruit with a pungent aroma, common in marshy thickets.',
    boon: '+1 to Wisdom checks and resistance to poison damage.',
    bane: '-1 to Wisdom checks and vulnerability to poison damage.',
    biomes: [biomes.biomeSwamps],
  },
  {
    name: 'Fenroot',
    rarity: Rarity.Rare,
    description: 'Black-veined root that seeps a numbing sap.',
    boon: '+1 to Strength and resistance to necrotic damage.',
    bane: '-1 to Strength and vulnerability to necrotic damage.',
    biomes: [biomes.biomeSwamps],
  },
  {
    name: 'Bogshade Fungus',
    rarity: Rarity.Epic,
    description: 'Rare, spongy fungus found under rotting logs in cursed bogs.',
    boon: '+2 to Stealth and resistance to psychic damage.',
    bane: '-2 to Stealth and vulnerability to psychic damage.',
    biomes: [biomes.biomeSwamps],
  },
  {
    name: 'Citrus Thistle',
    rarity: Rarity.Uncommon,
    description: 'Spiny magical plant used in custards.',
    boon: '+1 to Intelligence checks and resistance to radiant damage.',
    bane: '-1 to Intelligence checks and vulnerability to radiant damage.',
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Yellowroot Cheese',
    rarity: Rarity.Uncommon,
    description: 'Aged cheese with tangy flavor and slight arcane resonance.',
    boon: '+2 to Constitution saves and resistance to thunder damage.',
    bane: '-2 to Constitution saves and vulnerability to thunder damage.',
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Glimmergold Fruit',
    rarity: Rarity.Rare,
    description: 'Glowing citrus found during solar flares or in planar folds.',
    boon: '+2 to spell attack rolls and resistance to radiant damage.',
    bane: '-2 to spell attack rolls and vulnerability to radiant damage.',
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Sunrise Berries',
    rarity: Rarity.Rare,
    description: 'Cheerfully tart berries said to bloom with the dawn.',
    boon: '+1 to Wisdom saving throws.',
    bane: '-1 to Wisdom saving throws.',
    biomes: [biomes.biomeExtraplanar, biomes.biomeCelestial],
  },
  {
    name: 'Hearthmoss',
    rarity: Rarity.Uncommon,
    description:
      'A warm, spongy moss that grows in abandoned hearths and magical ruins.',
    boon: '+1 to Dexterity checks.',
    bane: '-1 to Dexterity checks.',
    biomes: [biomes.biomeAny],
  },
  {
    name: 'Whisperdew Resin',
    rarity: Rarity.Rare,
    description:
      'A sticky, translucent sap that collects in silent groves touched by moonlight.',
    boon: '+2 to Wisdom saving throws and resistance to physical damage.',
    bane: '-2 to Wisdom saving throws and vulnerability to physical damage.',
    biomes: [biomes.biomeAny],
  },
  {
    name: 'Crushed Crystallized Dragon Marrow',
    rarity: Rarity.Epic,
    description:
      'Extracted bone marrow from a dragon, crystallized under extreme pressure, then crushed into a powder.',
    boon: '+3 to Constitution, immunity to fear, and resistance to all damage types.',
    bane: '-3 to Constitution, and vulnerability to all damage types.',
    biomes: [biomes.biomeAny],
  },
]
