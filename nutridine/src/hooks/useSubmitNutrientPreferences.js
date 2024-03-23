import { useState } from "react";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import nutrientWatchListIDs from "../constants/nutrientWatchList";

const useSubmitNutrientPreferences = (userUid) => {
  const [isSaving, setIsSaving] = useState(false);

  function validateMicronutrientInput(value) {
    // uninitialized values are okay
    if (value === null || value === "" || value === undefined) {
      return true;
    }
    // decimals + integers okay
    if (/^\d+(\.\d+)?$/.test(value)) {
      return true;
    }
    return false;
  }

  function validNumericalInput(value) {
    // uninitialized values are okay
    if (value === null || value === "") {
      return true;
    }
    if (value > 0 && /^[0-9]+$/.test(value)) {
      return true;
    }
    return false;
  }

  function validateNutrients(nutrientPreferences) {
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
    const errors = [];

    // Check if all nutrient values are positive integers
    if (!validNumericalInput(calories)) {
      errors.push("Calories must be a positive integer");
    }
    if (!validNumericalInput(totalFat)) {
      errors.push("Total Fat must be a positive integer");
    }
    if (!validNumericalInput(cholesterol)) {
      errors.push("Cholesterol must be a positive integer");
    }
    if (!validNumericalInput(sodium)) {
      errors.push("Sodium must be a positive integer");
    }
    if (!validNumericalInput(carbs)) {
      errors.push("Carbs must be a positive integer");
    }
    if (!validNumericalInput(protein)) {
      errors.push("Protein must be a positive integer");
    }

    for (const selectedNutrientMax in selectedNutrientMaximums) {
      const selectedNutrientMaxValue =
        nutrientPreferences.selectedNutrientMaximums[selectedNutrientMax];
      if (!validNumericalInput(selectedNutrientMaxValue)) {
        errors.push(
          "Selected Nutrient Maximum must be a positive number containing only digits and decimals"
        );
      }
    }

    // Check if selectedNutrients contain valid keys from nutrientWatchListIDs
    if (
      !selectedNutrients.every((nutrient) => nutrient in nutrientWatchListIDs)
    ) {
      errors.push("Selected Nutrients must be valid nutrient IDs");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(". "));
    }
  }

  const submitNutrientPreferences = async (nutrientPreferences) => {
    setIsSaving(true);
    try {
      // Throws an error if the nutrientPreferences are invalid
      validateNutrients(nutrientPreferences);

      // Save the nutritionix nutrient IDs to firebase, not the frontend names
      const selectedNutrientIDs = nutrientPreferences.selectedNutrients
        .filter((nutrient) => nutrient in nutrientWatchListIDs)
        .map((nutrient) => nutrientWatchListIDs[nutrient]);

      // A list of {nutrientID, amount} objects to be sent to the backend.
      const transformedNutrientMaximums = [];
      for (const nutrientName in nutrientPreferences.selectedNutrientMaximums) {
        if (
          nutrientPreferences.selectedNutrientMaximums.hasOwnProperty(
            nutrientName
          )
        ) {
          const nutrientId = nutrientWatchListIDs[nutrientName];
          const amount =
            nutrientPreferences.selectedNutrientMaximums[nutrientName];
          const transformedNutrient = { [nutrientId]: Number(amount) };
          transformedNutrientMaximums.push(transformedNutrient);
        }
      }

      const backendFormat = {
        userUid: userUid,
        calories: Number(nutrientPreferences.calories),
        totalFat: Number(nutrientPreferences.totalFat),
        cholesterol: Number(nutrientPreferences.cholesterol),
        sodium: Number(nutrientPreferences.sodium),
        carbs: Number(nutrientPreferences.carbs),
        protein: Number(nutrientPreferences.protein),
        selectedNutrients: selectedNutrientIDs,
        selectedNutrientMaximums: transformedNutrientMaximums,
      };

      const db = getFirestore();
      const nutrientPreferencesRef = collection(db, "NutrientPreferences");
      const queryByUser = query(
        nutrientPreferencesRef,
        where("userUid", "==", userUid)
      );
      const querySnapshot = await getDocs(queryByUser);

      // update the doc if the user already has nutrient preferences
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, "NutrientPreferences", docId), backendFormat);
        // Otherwise, create a new document
      } else {
        await addDoc(nutrientPreferencesRef, backendFormat);
      }
    } catch (error) {
      setIsSaving(false);
      throw error;
    }
    setIsSaving(false);
  };

  return {
    isSaving,
    validNumericalInput,
    validateMicronutrientInput,
    submitNutrientPreferences,
  };
};

export default useSubmitNutrientPreferences;
