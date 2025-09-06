import { getServer } from "@/config/service";

export class UsersService {
  constructor(token) {
    this.path = "/users";
    this.token = token;
    this.server = getServer();
    if (!token) throw new Error("Llave inválida");
    this.abortController = new AbortController();
  }

  async read(filter) {
    const url = new URL(this.server + this.path);
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (
          typeof filter[key] === "object" &&
          filter[key] !== null &&
          (Array.isArray(filter[key]) || Object.keys(filter[key]).length)
        ) {
          url.searchParams.append(key, JSON.stringify(filter[key]));
        } else if (
          filter[key] !== undefined &&
          filter[key] !== null &&
          typeof filter[key] !== "object"
        ) {
          url.searchParams.append(key, filter[key]);
        }
      });
    }
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      query: filter,
      signal: this.abortController.signal,
    });
    return await response.json();
  }
}
