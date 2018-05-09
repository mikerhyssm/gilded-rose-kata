import { Item } from "./gilded-rose";
import { ItemTypes } from "./ItemTypes";

export class ItemDeltas {
  constructor(public upperDelta, public lowerDelta, public defaultDelta ) {}
}

export function getItemDeltas(item: Item) {
  if(item.name===ItemTypes.AGED_BRIE) {
    return new ItemDeltas(1, 2, -1);
  }

  if(item.name === ItemTypes.CONJURED) {
    return new ItemDeltas(-2, -4, -2);
  }

  return new ItemDeltas(-1, -2, -1);
}
