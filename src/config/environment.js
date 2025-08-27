export function getEnvironment(name) {
  return import.meta.env[`VITE_${name}`];
}
