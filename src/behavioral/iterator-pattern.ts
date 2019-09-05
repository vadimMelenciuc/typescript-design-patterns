/**
 * Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
 * The abstraction provided by the iterator pattern allows you to modify the collection implementation without making any changes outside
 * of collection. It enables you to create a general purpose GUI component that will be able to iterate through any collection of
 * the application.
 *
 * Components:
 * - Iterator (AbstractListenerIterator): Defines the universal iterator interface that is going to transverse different aggregates.
 * - Concrete iterator (ListIterator, SkipListIterator and ReverseListIterator): Implements specific iterator that transverse and keeps
 *   track of a specific aggregate.
 * - Aggregate (AbstractList): Defines a basic interface
 */

namespace IteratorPattern {
  export interface Iterator {
    next(): any;
    hasNext(): boolean;
  }
  export interface Aggregator {
    createIterator(): Iterator;
  }
  export class ConcreteIterator implements Iterator {
    private collection: any[] = [];
    private position: number = 0;
    constructor(collection: any[]) {
      this.collection = collection;
    }
    public next(): any {
      this.position += 1;
      return this.collection[this.position];
    }
    public hasNext(): boolean {
      return this.position < this.collection.length;
    }
  }
  export class Numbers implements Aggregator {
    private collection: number[] = [];
    constructor(collection: number[]) {
      this.collection = collection;
    }
    public createIterator(): Iterator {
      return new ConcreteIterator(this.collection);
    }
  }
}
