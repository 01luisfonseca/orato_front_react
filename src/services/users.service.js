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
    const response = await fetch(this.server + this.path, {
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
