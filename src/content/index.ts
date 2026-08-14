import { mayfair } from "./areas/mayfair";
import { soho } from "./areas/soho";
import { coventGarden } from "./areas/covent-garden";
import { marylebone } from "./areas/marylebone";
import { fitzrovia } from "./areas/fitzrovia";
import { bloomsbury } from "./areas/bloomsbury";
import { westminster } from "./areas/westminster";
import { belgravia } from "./areas/belgravia";
import { knightsbridge } from "./areas/knightsbridge";
import { cityOfLondon } from "./areas/city-of-london";
import type { Area } from "./schema";

export const areas: Area[] = [
  mayfair,
  soho,
  coventGarden,
  marylebone,
  fitzrovia,
  bloomsbury,
  westminster,
  belgravia,
  knightsbridge,
  cityOfLondon,
];

export function getAreaById(id: string): Area | undefined {
  return areas.find((area) => area.id === id);
}

export * from "./schema";
