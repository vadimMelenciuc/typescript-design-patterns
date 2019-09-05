/**
 * It's possible for some objects to behave completely differently when they are in different state
 *
 * Participants:
 * - State: Defines the interface of state objects that are being switched to internally.
 * - Concrete State (StateEnabled, StateDisabled): Implements the State interface with behavior corresponding to a specific state of the
 *   context. May have an optional reference back to its context.
 * - Context: Manages references to different states, and makes operations defined on the active one.
 *
 */

namespace StatePattern {
    export interface State {
        handle(context: Context): void;
    }

    export class ConcreteStateA implements State {
        public handle(context: Context): void {
            console.log("`handle` method of ConcreteStateA is being called!");
            context.State = new ConcreteStateB();
        }
    }

    export class ConcreteStateB implements State {
        public handle(context: Context): void {
            console.log("`handle` method of ConcreteStateB is being called!");
            context.State = new ConcreteStateA();
        }
    }

    export class Context {
        private state: State;

        constructor(state: State) {
            this.state = state;
        }

        get State(): State {
            return this.state;
        }

        set State(state: State) {
            this.state = state;
        }

        public request(): void {
            console.log("request is being called!");
            this.state.handle(this);
        }
    }
}

// demo
export function show(): void {
    const context: StatePattern.Context = new StatePattern.Context(
      new StatePattern.ConcreteStateA()
    );
    context.request();
    context.request();
    context.request();
    context.request();
    context.request();
    context.request();
    context.request();
    context.request();
  }
