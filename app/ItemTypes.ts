import { Item } from "./gilded-rose";

export enum ItemTypes {
  AGED_BRIE = "Aged Brie",
  BACKSTAGE = "Backstage",
  SULFURAS = "Sulfuras",
  CONJURED = "Conjured"
}

export function isBasicItem(item: Item) {
  return !(item.name === ItemTypes.SULFURAS) &&
   !(item.name === ItemTypes.BACKSTAGE);
}
