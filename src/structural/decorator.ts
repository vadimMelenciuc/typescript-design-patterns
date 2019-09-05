/**
 * The Decorator pattern:
 *  How it works:
 *   Dynamically adding responsibilities to an Object.
 *   This design pattern is to be applied on the instantiation on objects.
 * Participants: 
 * - Component (UIComponent): Defines the interface of the objects that can be decorated.
 * - ConcreteComponent (TextComponent): Defines additional functionalities of the concrete component.
 * - Decorator (Decorator): Defines a reference to the component to be decorated, and manages the context. Conforms the interface of a
 *   component with proper behaviors.
 * - ConcreteDecorator (ColorDecorator)
 */
interface Coffee {
    getCost(): number;
}

export class Espresso implements Coffee {
    getCost() {
        return 1.0;
    }
}

export class MilkDecorator implements Coffee {
    coffee: Coffee;
    cost: number = 0.25;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getCost() {
        return this.coffee.getCost() + this.cost;
    }
}

export class ChocolateDecorator implements Coffee {
    coffee: Coffee;
    cost: number = 0.5;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getCost() {
        return this.coffee.getCost() + this.cost;
    }
}

// Usage
const espresso = new ChocolateDecorator(new MilkDecorator(new Espresso()));

console.log(`your coffee cost: ${espresso.getCost()}`);
