import { getServer } from "@/config/service";

export class ProfileService {
  constructor(token) {
    this.path = "/profile";
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
