import axios, { AxiosError, AxiosResponse } from "axios";
class Api {
  private static token: string;
  private static baseUrl: string = "http://127.0.0.1:8000";
  constructor() {}

  static async request(endpoint: string, data: {}, method: string = "GET") {
    console.log(`Api call: ${method} ${endpoint} data: ${data}`);
    const url = `${this.baseUrl}/${endpoint}`;
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

  static async login(username: string, password: string) {
    const result = await this.request(
      "auth/login",
      { username, password },
      "POST"
    );

    //if login succeeds save token to class property for future use
    if (result.status === 200) {
      this.token = result.data.token;
    }
    return result;
  }

  static async signUp(
    username: string,
    password: string,
    dateOfBirth: string
  ) {}
}

export default Api;
