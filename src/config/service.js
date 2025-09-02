import { getEnvironment } from "./environment";

export function getServer() {
  return getEnvironment("REST_SERVER");
}
