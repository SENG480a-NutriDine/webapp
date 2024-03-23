import React from "react";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import dailyMax, { micronutrientDailyMax } from "../constants/dailyMaximums";
import nutrientWatchListIDs, {
  nutrientUnits,
} from "../constants/nutrientWatchList";

function NutritionFacts({ detailedMeal, nutrientPreferences }) {
  const {
    nf_calories,
    nf_total_fat,
    nf_saturated_fat,
    nf_cholesterol,
    nf_total_carbohydrate,
    nf_dietary_fiber,
    nf_sugars,
    nf_protein,
    nf_sodium,
    full_nutrients,
    serving_qty,
    serving_unit,
    serving_weight_grams,
  } = detailedMeal;
  const {
    calories,
    totalFat,
    cholesterol,
    sodium,
    carbs,
    protein,
    selectedNutrients,
    selectedNutrientMaximums,
  } = nutrientPreferences;

  const selectedNutrientKeys = Object.keys(nutrientWatchListIDs).filter((key) =>
    selectedNutrients.includes(nutrientWatchListIDs[key])
  );
  const trans_fat =
    full_nutrients.find((nutrient) => nutrient.attr_id === 605)?.value ?? 0;

  const borderColors = useColorModeValue("black", "white");

  // formats numbers to least decimal points possible, but allows up to 2 decimal points
  function formatNumber(number) {
    if (Number.isInteger(number)) {
      return number.toString();
    } else {
      let formattedNumber = number.toFixed(2);
      formattedNumber = formattedNumber.replace(/\.?0*$/, "");
      return formattedNumber;
    }
  }

  let userDailyMaximums = dailyMax;

  if (nutrientPreferences !== null) {
    userDailyMaximums.calories = calories !== 0 ? calories : dailyMax.calories;
    userDailyMaximums.totalFat = totalFat !== 0 ? totalFat : dailyMax.totalFat;
    userDailyMaximums.saturatedFat =
      totalFat !== 0 ? Math.round(totalFat * 0.3077) : dailyMax.saturatedFat;
    userDailyMaximums.cholesterol =
      cholesterol !== 0 ? cholesterol : dailyMax.cholesterol;
    userDailyMaximums.sodium = sodium !== 0 ? sodium : dailyMax.sodium;
    userDailyMaximums.totalCarbohydrate =
      carbs !== 0 ? carbs : dailyMax.totalCarbohydrate;
    userDailyMaximums.dietaryFiber =
      carbs !== 0 ? Math.round(carbs * 0.09333) : dailyMax.dietaryFiber;
    userDailyMaximums.protein = protein !== 0 ? protein : dailyMax.protein;
    // Sugars are not currently collected/stored in the DB, but would be a great addition
    userDailyMaximums.sugars = dailyMax.sugars;
  }

  let userDailyMicronutrientMaximums = micronutrientDailyMax;
  for (const pair of selectedNutrientMaximums) {
    userDailyMicronutrientMaximums[Object.keys(pair)[0]] =
      Object.values(pair)[0];
  }

  return (
    <Box
      borderWidth="5px"
      fontFamily={"navbar"}
      borderColor={borderColors}
      borderRadius="lg"
      p="5"
      my="5"
      maxW="md"
    >
      {/* NUTRITION FACTS */}
      <Heading as="h2" size="2xl" fontFamily={"navbar"}>
        Nutrition Facts
      </Heading>
      {/* TOTAL SERVINGS */}
      {serving_unit !== null &&
        serving_qty !== null &&
        serving_weight_grams !== null && (
          <>
            <Divider
              borderBottomWidth="1px"
              borderColor={borderColors}
              my="1"
            />
            <VStack alignItems={"flex-start"}>
              {serving_qty === 1 || serving_qty / serving_weight_grams === 1 ? (
                <Text mb="-10px">Per Serving</Text>
              ) : (
                <Text mb="-10px">{`${formatNumber(
                  serving_qty
                )} servings per ${serving_unit}`}</Text>
              )}
              <HStack justifyContent={"space-between"} w="100%">
                <Text>
                  <b>Serving Size</b>
                </Text>
                <Text>
                  <b>{`${serving_weight_grams}g`}</b>
                </Text>
              </HStack>
            </VStack>
          </>
        )}
      {/* AMOUNT PER SERVING */}
      <Divider borderBottomWidth="10px" borderColor={borderColors} my="2px" />
      <HStack justify={"space-between"} alignItems={"flex-end"} mb="0.5rem">
        <Heading size="sm" fontFamily={"navbar"}>
          Amount Per Serving
        </Heading>
        <Text>
          <b>% Daily Value*</b>
        </Text>
      </HStack>

      {/* CALORIES */}
      <HStack justify={"space-between"} alignItems={"flex-end"}>
        <HStack alignContent={"flex-end"}>
          <Heading as="h3" fontFamily={"navbar"}>
            <b>Calories </b>
          </Heading>
          <Text fontSize="3xl" ml="0.75rem" mb="-5px">
            {nf_calories ?? 0}
          </Text>
        </HStack>
        <Text as="h3" fontSize={"3xl"}>
          <b>
            {Math.round((nf_calories / userDailyMaximums.calories) * 100) || 0}%
          </b>
        </Text>
      </HStack>
      <Divider
        borderBottomWidth="8px"
        borderColor={borderColors}
        my="2px"
        mb="5px"
      />

      {/* FAT */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Total Fat</b>
          </Text>
          <Text>{nf_total_fat ?? 0}g</Text>
        </HStack>
        <Text>
          <b>
            {Math.round((nf_total_fat / userDailyMaximums.totalFat) * 100) || 0}
            %
          </b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      <HStack justifyContent={"space-between"}>
        <HStack ml={"2rem"}>
          <Text>Saturated Fat</Text>
          <Text>{nf_saturated_fat ?? 0}g</Text>
        </HStack>
        <Text>
          <b>
            {Math.round(
              ((nf_saturated_fat ?? 0) / userDailyMaximums.saturatedFat) * 100
            ) || 0}
            %
          </b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      <HStack ml={"2rem"}>
        <Text>Trans Fat</Text>
        <Text>{trans_fat ?? 0}g</Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      {/* CHOLESTREROL */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Cholesterol</b>
          </Text>
          <Text>{nf_cholesterol ?? 0}mg</Text>
        </HStack>
        <Text>
          <b>
            {Math.round(
              ((nf_cholesterol ?? 0) / userDailyMaximums.cholesterol) * 100
            ) || 0}
            %
          </b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      {/* SODIUM */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Sodium</b>
          </Text>
          <Text>{nf_sodium ?? 0}mg</Text>
        </HStack>
        <Text>
          <b>
            {Math.round(((nf_sodium ?? 0) / userDailyMaximums.sodium) * 100) ||
              0}
            %
          </b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      {/* TOTAL CARBOHYDRATES */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Total Carbohydrates</b>
          </Text>
          <Text>{nf_total_carbohydrate ?? 0}g</Text>
        </HStack>
        <Text>
          <b>
            {Math.round(
              ((nf_total_carbohydrate ?? 0) /
                userDailyMaximums.totalCarbohydrate) *
                100
            ) || 0}
            %
          </b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      <HStack justifyContent={"space-between"}>
        <HStack ml={"2rem"}>
          <Text>Dietary Fiber</Text>
          <Text>{nf_dietary_fiber ?? 0}g</Text>
        </HStack>
        <Text>
          <b>
            {Math.round(
              ((nf_dietary_fiber ?? 0) / userDailyMaximums.dietaryFiber) * 100
            ) || 0}
            %
          </b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      <HStack ml={"2rem"}>
        <Text>Total Sugars</Text>
        <Text>{nf_sugars ?? 0}g</Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor={borderColors} my="1" />
      {/* PROTEIN */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Protein</b>
          </Text>
          <Text>{nf_protein ?? 0}g</Text>
        </HStack>
        <Text>
          <b>
            {Math.round(
              ((nf_protein ?? 0) / userDailyMaximums.protein) * 100
            ) || 0}
            %
          </b>
        </Text>
      </HStack>
      <Divider
        borderBottomWidth="8px"
        borderColor={borderColors}
        my="2px"
        mb="4px"
      />

      {/* WATCH LIST NUTRIENTS */}
      {selectedNutrients.map((nutrient) => {
        const nutrientName = selectedNutrientKeys.find(
          (key) => nutrientWatchListIDs[key] === nutrient
        );

        const nutrientValue =
          full_nutrients.find((nut) => nut.attr_id === nutrient)?.value ?? 0;

        if (nutrientName === undefined) {
          return <></>;
        }

        return (
          <Box key={nutrient}>
            <HStack justifyContent={"space-between"}>
              <HStack>
                <Text>{nutrientName}</Text>
                <Text>
                  {nutrientValue} {nutrientUnits[nutrient]}
                </Text>
              </HStack>
              <Text>
                {Math.round(
                  (nutrientValue /
                    userDailyMicronutrientMaximums[
                      nutrientWatchListIDs[nutrientName]
                    ]) *
                    100
                ) || 0}
                %
              </Text>
            </HStack>
            <Divider
              borderBottomWidth="1px"
              borderColor={borderColors}
              my="1"
            />
          </Box>
        );
      })}

      <HStack alignItems={"flex-start"}>
        <Text>*</Text>
        {nutrientPreferences ? (
          <Text fontSize="xs">
            The % Daily Value (DV) tells you how much a nutrient in a serving of
            food contributes to a daily diet. These values are being determined
            based on your Nutrient Preferences, which you can update through
            your profile at any time.
          </Text>
        ) : (
          <Text fontSize="xs">
            The % Daily Value (DV) tells you how much a nutrient in a serving of
            food contributes to a daily diet. 2,000 calories a day is used for
            general nutrition advice.
          </Text>
        )}
      </HStack>
    </Box>
  );
}

export default NutritionFacts;
