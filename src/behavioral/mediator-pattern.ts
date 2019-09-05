/**
 * Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects
 * from referring to each other explicitly, and it lets you vary their interaction independently.
 *
 * Participants:
 * - Mediator: defines an interface for communicating with Colleague objects.
 * - ConcreteMediator: knows the colleague classes and keep a reference to the colleague objects.
 * - Colleague classes: keep a reference to its Mediator object.
 */

namespace MediatorPattern {
    export interface Mediator {
        send(msg: string, colleague: Colleague): void;
    }

    export abstract class Colleague {
        public mediator: Mediator;

        constructor(mediator: Mediator) {
            this.mediator = mediator;
        }

        abstract send(msg: string): void;

        abstract receive(msg: string): void;
    }

    export class ConcreteColleagueA extends Colleague {
        constructor(mediator: Mediator) {
            super(mediator);
        }

        public send(msg: string): void {
            this.mediator.send(msg, this);
        }

        public receive(msg: string): void {
            console.log(msg, '`receive` of ConcreteColleagueA is being called!');
        }
    }

    export class ConcreteColleagueB extends Colleague {
        constructor(mediator: Mediator) {
            super(mediator);
        }

        public send(msg: string): void {
            this.mediator.send(msg, this);
        }

        public receive(msg: string): void {
            console.log(msg, '`receive` of ConcreteColleagueB is being called!');
        }
    }

    export class ConcreteMediator implements Mediator {
        public concreteColleagueA: ConcreteColleagueA;
        public concreteColleagueB: ConcreteColleagueB;

        public send(msg: string, colleague: Colleague): void {
            if (this.concreteColleagueA === colleague) {
                this.concreteColleagueB.receive(msg);
            } else {
                this.concreteColleagueA.receive(msg);
            }
        }
    }
}

// Demo

namespace MediatorPattern {
    export namespace Demo {
        export function show(): void {
            let cm: MediatorPattern.ConcreteMediator = new MediatorPattern.ConcreteMediator(),
                c1: MediatorPattern.ConcreteColleagueA = new MediatorPattern.ConcreteColleagueA(
                    cm
                ),
                c2: MediatorPattern.ConcreteColleagueB = new MediatorPattern.ConcreteColleagueB(
                    cm
                );

            cm.concreteColleagueA = c1;
            cm.concreteColleagueB = c2;

            c1.send('Hello ConcreteColleagueB');
            c2.send('Hello ConcreteColleagueA');
        }
    }
}
