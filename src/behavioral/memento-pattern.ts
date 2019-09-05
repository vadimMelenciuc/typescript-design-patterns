/**
 * The intent of this pattern is to capture the internal state of an object without violating encapsulation and thus providing a mean for
 * restoring the object into initial state when needed.
 *
 * Participants:
 * - Memento: stores the state of an object and defines method restore or other APIs for restoring the state to specific object.
 * - Originator: deals with objects that need to have their internal state stored.
 * - Caretaker: manages mementos without intervening with what's inside.
 */
namespace Memento {
    interface State { }

    class Memento {
        private state: State;

        constructor(state: State) {
            this.state = Object.assign({} as State, state);
        }

        restore(state: State): void {
            Object.assign(state, this.state);
        }
    }

    class Originator {
        state: State;

        get memento(): Memento {
            return new Memento(this.state);
        }

        set memento(memento: Memento) {
            memento.restore(this.state);
        }
    }

    class Caretaker {
        originator: Originator;
        history: Memento[] = [];

        save(): void {
            this.history.push(this.originator.memento);
        }

        restore(): void {
            this.originator.memento = this.history.shift();
        }
    }
}
