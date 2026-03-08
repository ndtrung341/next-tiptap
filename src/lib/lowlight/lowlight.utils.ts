import { supportedLanguages } from "./lowlight.config";

export function getSupportedLanguages() {
  return Object.entries(supportedLanguages).map(([key, value]) => ({
    label: value.name,
    value: key,
    alias: value.aliases.join(", "),
  }));
}
