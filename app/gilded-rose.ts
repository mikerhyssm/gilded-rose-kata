import { ItemDeltas, getItemDeltas } from './ItemDeltas';
import { ItemTypes, isBasicItem } from './ItemTypes';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  maximumItemQuality = 50;
  minimumItemQuality = 0;

  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(item => this.updateItem(item));
  }

  updateItem(item: Item): Item {
    if(isBasicItem(item)) {
      return this.updateBasicItem(item, getItemDeltas(item));
    } else if (item.name === ItemTypes.BACKSTAGE) {
      return this.updateBackstagePass(item);
    }
    return item;
  }

  updateBasicItem(item: Item, deltas: ItemDeltas) {
    if(item.sellIn > 0){
      item = this.updateItemQuality(item, deltas.upperDelta);
    } else if (item.sellIn <= 0) {
      item = this.updateItemQuality(item, deltas.lowerDelta);
    }
    return this.updateItemSellIn(item, deltas.defaultDelta);

  }

  updateBackstagePass(item: Item): Item {
    if(item.sellIn > 10) {
      item = this.updateItemQuality(item, 1);
    } else if(item.sellIn > 5) {
      item = this.updateItemQuality(item, 2);
    } else if (item.sellIn >= 0) {
      item = this.updateItemQuality(item, 3);
    } else if (item.sellIn < 0) {
      item = this.updateItemQuality(item, -(item.quality));
    }

    return this.updateItemSellIn(item, -1);
  }


  private updateItemQuality(item: Item, qualityDelta: number): Item {
    const newQuality = item.quality + qualityDelta;
    if(newQuality <= this.maximumItemQuality && newQuality >= this.minimumItemQuality) {
      item.quality = newQuality;
    } else if(item.quality + qualityDelta <= this.minimumItemQuality){
      item.quality = this.minimumItemQuality;
    } else {
      item.quality = this.maximumItemQuality;
    }
    return item;
  }

  private updateItemSellIn(item: Item, sellInDelta: number): Item {
    item.sellIn -= 1;
    return item;
  }
}
