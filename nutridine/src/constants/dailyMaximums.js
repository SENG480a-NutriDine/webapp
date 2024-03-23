// Based on Health Candada's Dietary Reference Intakes
const dailyMax = {
  calories: 2000, // calories
  totalFat: 65, // g
  saturatedFat: 20, // g
  cholesterol: 300, // mg
  sodium: 2300, // mg
  totalCarbohydrate: 300, // g
  dietaryFiber: 28, // g
  sugars: 50, // g
  protein: 50, // g
};

export const micronutrientDailyMax = {
  301: 2250, //Calcium
  303: 14, //Iron
  306: 4700, //Potassium
  307: 2300, //Sodium
  539: 50, //Sugars, added
  324: 700, //Vitamin D
  299: 12.5, //Sugar Alcohol"
  1001: 31.5, //Erythritol
  1006: 54, //Allulose
  1002: 130, //Glycerin
  290: 70, //Xylitol
  261: 50, //Sorbitol
  260: 100, //Mannitol
  1003: 40, //Maltitol
  1004: 50, //Isomalt
  1005: 20, //Lactitol
  513: 5.5, //Alanine
  511: 20, //Arginine
  514: 4, //Aspartic acid
  454: 6, //Betaine
  262: 200, //Caffeine
  639: 300, //Campesterol
  326: 15, //Vitamin D3 (cholecalciferol)
  421: 500, //Choline, total
  334: 600, //Cryptoxanthin, beta
  312: 0.9, //Copper
  507: 0.5, //Cystine
  325: 10, //Vitamin D2 (ergocalciferol)
  645: 38, //Fatty acids, total monounsaturated
  646: 7, //Fatty acids, total polyunsaturated
  693: 2.22, //Fatty acids, total trans-monoenoic
  695: 31, //Fatty acids, total trans-polyenoic,
  313: 3500, //Fluoride
  417: 30, //Folate, total
  431: 400, //Folic acid
  435: 400, //Folate, DFE
  432: 400, //Folate, food
  212: 50, //Fructose
  287: 1.5, //Galactose
  515: 8, //Glutamic acid
  211: 60, //Glucose (dextrose)
  516: 2, //Glycine
  512: 0.7, //Histidine
  521: 1, //Hydroxyproline
  503: 1.3, //Isoleucine
  213: 24, //Lactose
  504: 0.95, //Leucine
  337: 1000, //Lycopene
  505: 2, //Lysine
  214: null, //Maltose
  506: 1.235, //Methionine
  304: 365, //Magnesium
  315: 2, //Manganese
  406: 15, //Niacin (Vitamin B3)
  573: 15, //Vitamin E, added
  578: 2.4, //Vitamin B-12, added
  305: 700, //Phosphorus
  410: 5, //Pantothenic acid (Vitamin B5)
  508: 2.9, //Phenylalanine
  636: 2, //Phytosterols
  517: 1, //Proline
  405: 1.2, //Riboflavin (Vitamin B2)
  317: 55, //Selenium
  518: 5, //Serine
  209: 275, //Starch
  638: 250, //Stigmasterol
  210: 24, //Sucrose
  263: 475, //Theobromine
  404: 1.15, //Thiamine
  502: 0.75, //Threonine
  323: 15, //Vitamin E (alpha-tocopherol)
  501: 0.3, //Tryptophan
  509: 6.5, //Tyrosine
  510: 1.43, //Valine
  318: 32000, //Vitamin A, IU
  418: 2.4, //Vitamin B-12
  415: 1.3, //Vitamin B-6
  401: 85, //Vitamin C, total ascorbic acid
  430: 110000, //Vitamin K (phylloquinone)
  255: 3700, //Water
  309: 10, //Zinc
};
export default dailyMax;
