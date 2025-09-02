import { getServer } from "@/config/service";

export class UsersService {
  constructor(token) {
    this.path = "/users";
    this.token = token;
    this.server = getServer();
    if (!token) throw new Error("Llave inválida");
  }

  async read() {
    const response = await fetch(this.server + this.path, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return await response.json();
  }
}
