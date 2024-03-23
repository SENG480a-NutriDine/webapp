import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const useNutrientPreferences = (userUid) => {
  const [isLoading, setIsLoading] = useState(true);
  const [nutrientPreferences, setNutrientPreferences] = useState(null);

  useEffect(() => {
    console.log("useNutrientPreferences firing..");
    const fetchNutrientPreferences = async () => {
      try {
        const db = getFirestore();
        const nutrientPreferencesRef = collection(db, "NutrientPreferences");
        const queryByUser = query(
          nutrientPreferencesRef,
          where("userUid", "==", userUid)
        );
        const querySnapshot = await getDocs(queryByUser);

        if (!querySnapshot.empty) {
          // If document found, set the nutrientPreferences state
          querySnapshot.forEach((doc) => {
            setNutrientPreferences(doc.data());
          });
        } else {
          // If no document found, set nutrientPreferences state to null
          setNutrientPreferences(null);
        }
      } catch (error) {
        console.error("Error fetching nutrient preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNutrientPreferences();
  }, [userUid]);

  return { isLoading, nutrientPreferences };
};

export default useNutrientPreferences;
