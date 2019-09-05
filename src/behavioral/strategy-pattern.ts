/**
 * There are common situations when classes differ only in their behavior. For this cases is a good idea to isolate the
 * algorithms in separate classes in order to have the ability to select different algorithms at runtime.
 *
 * Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary
 * independently from clients that use it.
 *
 * Participants:
 * - Strategy: defines the interface of strategy objects or classes.
 * - Concrete Strategy: Implements concrete strategy operations defined by the Strategy interface.
 * - Target: The target to apply algorithms defined in strategy objects.
 * - Client: Makes targets and strategies cooperate.
 */

namespace StrategyPattern {
    export interface Strategy {
        execute(): void;
    }

    export class ConcreteStrategyA implements Strategy {
        public execute(): void {
            console.log("`execute` method of ConcreteStrategy1 is being called");
        }
    }

    export class ConcreteStrategyB implements Strategy {
        public execute(): void {
            console.log("`execute` method of ConcreteStrategy2 is being called");
        }
    }

    export class Context {
        private strategy: Strategy;

        constructor(strategy: Strategy) {
            this.strategy = strategy;
        }

        public executeStrategy(): void {
            this.strategy.execute();
        }
    }
}

// demo
export function show(): void {
    let context: StrategyPattern.Context = new StrategyPattern.Context(
        new StrategyPattern.ConcreteStrategyA()
    );
    context.executeStrategy();

    context = new StrategyPattern.Context(
        new StrategyPattern.ConcreteStrategyB()
    );
    context.executeStrategy();
}
