/**
 * Observer Pattern is an important Pattern backed by an important idea in software engineering. And it is usually a key part of MVC
 * architecture and its variants as well.
 *
 * Participants:
 * - Subject/Observable: the subject to be observed defines methods to attach or notify the observers.
 * - Concrete Subject: contains the state related to the subject.
 * - Observer: Defines the interface of an object that reacts when an observation notifies.
 * - Concrete Observer: defines the action that reacts to the notifications of subjects being observed..
 *
 * - State manager: manages a complex, possibly multi-level state object containing multiple states.
 */

namespace ObserverPattern {
export class Subject {
    private observers: Observer[] = [];

    public register(observer: Observer): void {
        console.log(observer, "is pushed!");
        this.observers.push(observer);
    }

    public unregister(observer: Observer): void {
        var n: number = this.observers.indexOf(observer);
        console.log(observer, "is removed");
        this.observers.splice(n, 1);
    }

    public notify(): void {
        console.log("notify all the observers", this.observers);
        this.observers.forEach(observer => observer.notify());
    }
}

export class Observer {
    constructor(private name: string) { }

    notify() {
        console.log(`${this.name} has been notified.`);
    }
}
}
export function show(): void {
    const subject: ObserverPattern.Subject = new ObserverPattern.Subject();
    subject.register(new ObserverPattern.Observer("idOfTheObserver"));
    subject.unregister(new ObserverPattern.Observer("idOfTheUnregisteredObserver"));
    subject.notify();
}
