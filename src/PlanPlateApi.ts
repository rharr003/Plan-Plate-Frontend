import axios from "axios";
import { signupFormData } from "./pages/signup/Signup.constants";
import { LoginFormData } from "./pages/login/Login.constants";
import { fetchMealPlansReturn } from "./types/general/apiReturnTypes";
import { deleteMealPlan } from "./redux/mealPlanReducer";
import { CreateFoodItemFormData } from "./components/app-modals/modal-content/food-items/CreateFoodItem.contants";

const BASE_URL = process.env.NODE_ENV === "test" ? "" : "http://127.0.0.1:8000";

class Api {
  public static token: string;
  constructor() {}

  static async request(
    endpoint: string,
    data: {} = {},
    method: string = "GET"
  ) {
    // console.log(`Api call: ${method} ${endpoint} data: ${data}`);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Token ${this.token}`,
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
      body: method === "GET" ? undefined : JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      const status = response.status;
      let data;
      if (status !== 204) {
        data = await response.json();
      } else {
        data = {};
      }
      return { data, status };
    } catch (err: any) {
      console.error("Api error:", err.message);
      return err.response;
    }
  }

  static async login(data: LoginFormData) {
    const result = await this.request("auth/login", data, "POST");
    //if login succeeds save token to class property for future use
    if (result.status === 200) {
      this.token = result.data.token;
      localStorage.setItem("plan-plate-token", this.token);
      // get user data with newly aquired token
      return this.fetchUser();
    }
    return result;
  }

  static async signUp(data: signupFormData) {
    const result = await this.request("auth/signup", data, "POST");
    if (result.status === 200) {
      this.token = result.data.token;
      localStorage.setItem("plan-plate-token", this.token);
      // get user data with newly aquired token
      return this.fetchUser();
    }
    return result;
  }

  static async fetchUser() {
    const result = await this.request("auth/user");
    return result;
  }

  static async fetchMealPlans(): Promise<fetchMealPlansReturn> {
    const result = await this.request("mealplans/", {}, "GET");
    //added the below due to some issues getting the mock server to actually return anything

    return result.data || { plans: [] };
  }

  static async fetchMeals() {
    const result = await this.request("meals/");
    return result;
  }

  static async fetchFoodItems() {
    const result = await this.request("fooditems/");
    return result;
  }

  static async createFoodItem(data: CreateFoodItemFormData) {
    const result = await this.request("fooditems/", data, "POST");
    return result;
  }

  static async deleteFoodItem(foodItemId: number) {
    const result = await this.request(
      "fooditems/",
      { food_item_id: foodItemId },
      "DELETE"
    );
    return result;
  }

  static async createMealPlan(data: { name: string; active: boolean }) {
    console.log(data);
    const result = await this.request("mealplans/", data, "POST");
    return result;
  }

  static async fetchMealPlanDetail(mealPlanId: number) {
    const result = await this.request(`mealplans/detail/${mealPlanId}`);
    return result;
  }

  static async deleteMealPlan(mealPlanId: number) {
    const result = await this.request(
      "mealplans/",
      { meal_plan_id: mealPlanId },
      "DELETE"
    );
    return result;
  }

  static async updateMealPlan(data: {
    name?: string;
    active?: boolean;
    meal_plan_id: number;
  }) {
    const result = await this.request("mealplans/", data, "PUT");
    return result;
  }
}

export default Api;
