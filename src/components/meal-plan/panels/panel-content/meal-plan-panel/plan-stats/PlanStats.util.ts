import { Meal } from "../../../../../../types/meal";

export function calcTotals(meals: Meal[]) {
  let planStats = {
    calories: 0,
    fat: 0,
    saturatedFat: 0,
    carbs: 0,
    fiber: 0,
    sugar: 0,
    protein: 0,
    sodium: 0,
    potassium: 0,
  };

  meals.forEach((meal) => {
    meal.food_servings.forEach((foodServing) => {
      planStats.calories += Math.round(
        foodServing.food_item.calories * foodServing.serving_multiple
      );
      planStats.fat += Math.round(
        foodServing.food_item.fat * foodServing.serving_multiple
      );
      planStats.saturatedFat += Math.round(
        foodServing.food_item.saturated_fat * foodServing.serving_multiple
      );
      planStats.carbs += Math.round(
        foodServing.food_item.carbohydrates * foodServing.serving_multiple
      );
      planStats.fiber += Math.round(
        foodServing.food_item.fiber * foodServing.serving_multiple
      );
      planStats.sugar += Math.round(
        foodServing.food_item.sugar * foodServing.serving_multiple
      );
      planStats.protein += Math.round(
        foodServing.food_item.protein * foodServing.serving_multiple
      );
      planStats.sodium += Math.round(
        foodServing.food_item.sodium * foodServing.serving_multiple
      );
      planStats.potassium += Math.round(
        foodServing.food_item.potassium * foodServing.serving_multiple
      );
    });
  });

  return planStats;
}

export function createMacroChartData(
  fat: number,
  saturatedFat: number,
  carbs: number,
  sugar: number,
  fiber: number,
  protein: number
) {
  return {
    labels: [
      `Fat: ${fat}g`,
      `Saturated Fat: ${saturatedFat}g`,
      `Carbs: ${carbs}g`,
      `Sugar: ${sugar}g`,
      `Fiber: ${fiber}g`,
      `Protein: ${protein}g`,
    ],
    datasets: [
      {
        data: [fat, saturatedFat, carbs, sugar, fiber, protein],
        backgroundColor: [
          "#ffde89",
          "#dfa000",
          "#63b4ff",
          "#bb56ff",
          "#36eb72",
          "#FF6384",
        ],
      },
    ],
  };
}

export function createElectrolyteChartData(sodium: number, potassium: number) {
  return {
    labels: [`Sodium: ${sodium}mg`, `Potassium: ${potassium}mg`],
    datasets: [
      {
        data: [sodium, potassium],
        backgroundColor: ["#ff56e3", "#36eb91"],
      },
    ],
  };
}
