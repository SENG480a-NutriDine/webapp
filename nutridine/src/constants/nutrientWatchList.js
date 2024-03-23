// Most relevant subset of NutritionIX nutrient names & ID.

const nutrientWatchListIDs = {
  Calcium: 301,
  Iron: 303,
  Potassium: 306,
  Sodium: 307,
  "Sugars, added": 539,
  "Vitamin D": 324,
  "Sugar Alcohol": 299,
  Erythritol: 1001,
  Allulose: 1006,
  Glycerin: 1002,
  Xylitol: 290,
  Sorbitol: 261,
  Mannitol: 260,
  Maltitol: 1003,
  Isomalt: 1004,
  Lactitol: 1005,
  Alanine: 513,
  Arginine: 511,
  "Aspartic acid": 514,
  Betaine: 454,
  Caffeine: 262,
  Campesterol: 639,
  "Vitamin D3 (cholecalciferol)": 326,
  "Choline, total": 421,
  "Cryptoxanthin, beta": 334,
  Copper: 312,
  Cystine: 507,
  "Vitamin D2 (ergocalciferol)": 325,
  "Fatty acids, total monounsaturated": 645,
  "Fatty acids, total polyunsaturated": 646,
  "Fatty acids, total trans-monoenoic": 693,
  "Fatty acids, total trans-polyenoic": 695,
  Fluoride: 313,
  "Folate, total (Vitamin B9)": 417,
  "Folic acid": 431,
  "Folate, DFE": 435,
  "Folate, food": 432,
  Fructose: 212,
  Galactose: 287,
  "Glutamic acid": 515,
  "Glucose (dextrose)": 211,
  Glycine: 516,
  Histidine: 512,
  Hydroxyproline: 521,
  Isoleucine: 503,
  Lactose: 213,
  Leucine: 504,
  Lycopene: 337,
  Lysine: 505,
  Maltose: 214,
  Methionine: 506,
  Magnesium: 304,
  Manganese: 315,
  "Niacin (Vitamin B3)": 406,
  "Vitamin E, added": 573,
  "Vitamin B-12, added": 578,
  Phosphorus: 305,
  "Pantothenic acid (Vitamin B5)": 410,
  Phenylalanine: 508,
  Phytosterols: 636,
  Proline: 517,
  "Riboflavin (Vitamin B2)": 405,
  Selenium: 317,
  Serine: 518,
  Starch: 209,
  Stigmasterol: 638,
  Sucrose: 210,
  Theobromine: 263,
  Thiamin: 404,
  Threonine: 502,
  "Vitamin E (alpha-tocopherol)": 323,
  Tryptophan: 501,
  Tyrosine: 509,
  Valine: 510,
  "Vitamin A, IU": 318,
  "Vitamin B-12": 418,
  "Vitamin B-6": 415,
  "Vitamin C, total ascorbic acid": 401,
  "Vitamin K (phylloquinone)": 430,
  Water: 255,
  Zinc: 309,
};

export const nutrientUnits = {
  301: "mg", //Calcium:
  303: "mg", //Iron
  306: "mg", //Potassium
  307: "mg", //Sodium
  539: "g", //Sugars, added
  324: "IU", //Vitamin D
  299: "g", //Sugar Alcohol"
  1001: "g", //Erythritol
  1006: "g", //Allulose
  1002: "g", //Glycerin
  290: "g", //Xylitol
  261: "g", //Sorbitol
  260: "g", //Mannitol
  1003: "g", //Maltitol
  1004: "g", //Isomalt
  1005: "g", //Lactitol
  513: "g", //Alanine
  511: "g", //Arginine
  514: "g", //Aspartic acid
  454: "mg", //Betaine
  262: "mg", //Caffeine
  639: "mg", //Campesterol
  326: "Âµg", //Vitamin D3 (cholecalciferol)
  421: "mg", //Choline, total
  334: "Âµg", //Cryptoxanthin, beta
  312: "mg", //Copper
  507: "g", //Cystine
  325: "Âµg", //Vitamin D2 (ergocalciferol)f
  645: "g", //Fatty acids, total monounsaturated
  646: "g", //Fatty acids, total polyunsaturated
  693: "g", //Fatty acids, total trans-monoenoic
  695: "g", //Fatty acids, total trans-polyenoic,
  313: "Âµg", //Fluoride
  417: "Âµg", //Folate, total (Vitamin B9)
  431: "Âµg", //Folic acid
  435: "Âµg", //Folate, DFE
  432: "Âµg", //Folate, food
  212: "g", //Fructose
  287: "g", //Galactose
  515: "g", //Glutamic acid
  211: "g", //Glucose (dextrose)
  516: "g", //Glycine
  512: "g", //Histidine
  521: "g", //Hydroxyproline
  503: "g", //Isoleucine
  213: "g", //Lactose
  504: "g", //Leucine
  337: "Âµg", //Lycopene
  505: "g", //Lysine
  214: "g", //Maltose
  506: "g", //Methionine
  304: "mg", //Magnesium
  315: "mg", //Manganese
  406: "mg", //Niacin (Vitamin B3)
  573: "mg", //Vitamin E, added
  578: "Âµg", //Vitamin B-12, added
  305: "mg", //Phosphorus
  410: "mg", //Pantothenic acid (Vitamin B5)
  508: "g", //Phenylalanine
  636: "mg", //Phytosterols
  517: "g", //Proline
  405: "mg", //Riboflavin (Vitamin B2)
  317: "Âµg", //Selenium
  518: "g", //Serine
  209: "g", //Starch
  638: "mg", //Stigmasterol
  210: "g", //Sucrose
  263: "mg", //Theobromine
  404: "mg", //Thiamin
  502: "g", //Threonine
  323: "mg", //Vitamin E (alpha-tocopherol)
  501: "g", //Tryptophan
  509: "g", //Tyrosine
  510: "g", //Valine
  318: "IU", //Vitamin A, IU
  418: "Âµg", //Vitamin B-12
  415: "mg", //Vitamin B-6
  401: "mg", //Vitamin C, total ascorbic acid
  430: "Âµg", //Vitamin K (phylloquinone)
  255: "g", //Water
  309: "mg", //Zinc
};
export default nutrientWatchListIDs;
