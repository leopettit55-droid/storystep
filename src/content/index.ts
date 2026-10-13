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
import { parisLouvre } from "./areas/paris-louvre";
import { parisMontmartre } from "./areas/paris-montmartre";
import { parisIleDeLaCite } from "./areas/paris-ile-de-la-cite";
import { parisEiffel } from "./areas/paris-eiffel";
import { oxfordHarryPotter } from "./areas/oxford-harry-potter";
import { oxfordBodleian } from "./areas/oxford-bodleian";
import { oxfordCastleMarket } from "./areas/oxford-castle-market";
import { oxfordInklings } from "./areas/oxford-inklings";
import { oxfordMagdalen } from "./areas/oxford-magdalen";
import { edinburghHarryPotter } from "./areas/edinburgh-harry-potter";
import { edinburghBurns } from "./areas/edinburgh-burns";
import { edinburghScott } from "./areas/edinburgh-scott";
import { edinburghConanDoyle } from "./areas/edinburgh-conan-doyle";
import { edinburghSomerville } from "./areas/edinburgh-somerville";
import { londonDickens } from "./areas/london-dickens";
import { londonSherlock } from "./areas/london-sherlock";
import { dublinJoyce } from "./areas/dublin-joyce";
import { glasgowMackintosh } from "./areas/glasgow-mackintosh";
import { glasgowTobaccoLords } from "./areas/glasgow-tobacco-lords";
import { glasgowClydeShipbuilding } from "./areas/glasgow-clyde-shipbuilding";
import type { Area } from "./schema";

// Oxford first (Magdalen College leading), then London, Paris and Edinburgh.
export const areas: Area[] = [
  oxfordMagdalen,
  oxfordHarryPotter,
  oxfordBodleian,
  oxfordCastleMarket,
  oxfordInklings,
  mayfair,
  soho,
  coventGarden,
  westminster,
  marylebone,
  fitzrovia,
  bloomsbury,
  belgravia,
  knightsbridge,
  cityOfLondon,
  parisLouvre,
  parisMontmartre,
  parisIleDeLaCite,
  parisEiffel,
  edinburghHarryPotter,
  edinburghBurns,
  edinburghScott,
  edinburghConanDoyle,
  edinburghSomerville,
  londonDickens,
  londonSherlock,
  dublinJoyce,
  glasgowMackintosh,
  glasgowTobaccoLords,
  glasgowClydeShipbuilding,
];

export function getAreaById(id: string): Area | undefined {
  return areas.find((area) => area.id === id);
}

export * from "./schema";
