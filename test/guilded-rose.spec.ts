import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    describe('updateAgedBrie', function() {
      it('should increase in quality', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Aged Brie', 1, 0);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(0);
        expect(output.quality).to.equal(1);
      });

      it('should double increase in quality if is Aged Brie and sellIn is less than 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Aged Brie', -1, 0);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-2);
        expect(output.quality).to.equal(2);
      });

      it('should not increase quality of aged brie if quality is 50', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Aged Brie', -1, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-2);
        expect(output.quality).to.equal(50);
      });
    });

    describe('updateSulfuras', function() {
      it('should not change quality if is Sulfuras', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Sulfuras', 1, 10);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(1);
        expect(output.quality).to.equal(10);
      });
    });


    describe('updateBackstagePass', function() {
      it('should increase quality by 1 when there are greater than 10 days', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Backstage', 12, 10);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(11);
        expect(output.quality).to.equal(11);
      });

      it('shouldnt increase quality above 50 when should increase by 2', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Backstage', 9, 49);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(8);
        expect(output.quality).to.equal(50);
      });

      it('should increase quality by 2 when there are less than 10 but greater than 5 days', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Backstage', 8, 10);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(7);
        expect(output.quality).to.equal(12);
      });

      it('should increase quality by 3 when there are less than 5 but greater than 0 days', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Backstage', 4, 4);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(3);
        expect(output.quality).to.equal(7);
      });

      it('shouldnt increase quality above 50 when should increase by 3', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Backstage', 2, 49);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(1);
        expect(output.quality).to.equal(50);
      });

      it('should set quality to 0 once concert is over', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Backstage', -1, 4);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-2);
        expect(output.quality).to.equal(0);
      });
    });

    describe('updateGenericItem', function() {
      it('should return modified item with reduced quality and sellIn if quality and sellIn is greater than 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', 1, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(0);
        expect(output.quality).to.equal(49);
      });

      it('should return modified item with double reduced quality and reduced sellIn if sellIn is less than 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', -1, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-2);
        expect(output.quality).to.equal(48);
      });

      it('should return modified item with double reduced quality and reduced sellIn if sellIn is 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', 0, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-1);
        expect(output.quality).to.equal(48);
      });

      it('should not reduce quality if quality is 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', 0, 0);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-1);
        expect(output.quality).to.equal(0);
      });

    });

    describe('update conjured item', function() {
      it('should return modified item with double reduced quality and sellIn if quality and sellIn is greater than 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Conjured', 1, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(0);
        expect(output.quality).to.equal(48);
      });

      it('should return modified item with double reduced quality and reduced sellIn if sellIn is less than 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Conjured', -1, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-2);
        expect(output.quality).to.equal(46);
      });

      it('should return modified item with double reduced quality and reduced sellIn if sellIn is 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Conjured', 0, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-1);
        expect(output.quality).to.equal(46);
      });

      it('should not reduce quality if quality is 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('Conjured', 0, 0);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-1);
        expect(output.quality).to.equal(0);
      });
    });

    describe('updateItem', function() {

      it('should return modified item with reduced quality and sellIn if quality and sellIn is greater than 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', 1, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(0);
        expect(output.quality).to.equal(49);
      });

      it('should return modified item with double reduced quality and reduced sellIn if sellIn is less than 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', -1, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-2);
        expect(output.quality).to.equal(48);
      });

      it('should return modified item with double reduced quality and reduced sellIn if sellIn is 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', 0, 50);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-1);
        expect(output.quality).to.equal(48);
      });

      it('should not reduce quality if quality is 0', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', 0, 0);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-1);
        expect(output.quality).to.equal(0);
      });


      it('should reduce quality if less than 0 sellIn days', function() {
        const gildedRose = new GildedRose();
        const item = new Item('foo', -1, 0);

        const output = gildedRose.updateItem(item);

        expect(output.sellIn).to.equal(-2);
        expect(output.quality).to.equal(0);
      });
    });
});
