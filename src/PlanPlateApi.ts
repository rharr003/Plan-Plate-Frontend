import axios from "axios";
import { signupFormData } from "./pages/signup/Signup.constants";
import { LoginFormData } from "./pages/login/Login.constants";
import { fetchMealPlansReturn } from "./types/meal-plans/apiReturnTypes";

const BASE_URL = process.env.NODE_ENV === "test" ? "" : "http://127.0.0.1:8000";

class Api {
  public static token: string;
  constructor() {}

  static async request(
    endpoint: string,
    data: {} = {},
    method: string = "GET"
  ) {
    console.log(`Api call: ${method} ${endpoint} data: ${data}`);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Token ${this.token}`,
    };
    try {
      return await axios({
        url,
        method,
        data,
        headers,
      });
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
    return await this.request("auth/user");
  }

  static async fetchMealPlans(): Promise<fetchMealPlansReturn> {
    const result = await this.request("mealplans/", {}, "GET");
    return result.data;
  }

  static async createMealPlan(data: { name: string; active: boolean }) {
    const result = await this.request("mealplans/", data, "POST");
    return result;
  }

  static async fetchMealPlanDetail(mealPlanId: number) {
    const result = await this.request(`mealplans/detail/${mealPlanId}`);
    console.log(result);
  }
}

export default Api;
