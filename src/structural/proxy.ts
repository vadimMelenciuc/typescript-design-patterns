/**
 * Proxy Pattern applies when the program needs to know about or to intervene the behavior of accessing objects. There are several detailed
 * scenarios in Proxy Pattern, and we can distinguish those scenarios by their different purposes:
 * - Remote proxy: a proxy with interface to manipulate remote objects, such as data items on a remote server.
 * - Virtual proxy: a proxy that manages expensive objects which need to be loaded on demand.
 * - Protection proxy: a proxy that controls access to target objects, typically it verifies permissions and validates values.
 * - Smart proxy: a proxy that does additional operations when accessing target objects.
 *
 * Participants:
 * - Proxy (IndexedDBStorage): Defines interface and implements operations to mange access to the subject.
 * - Subject (IndexedDB): The subject to be accessed by proxy.
 * - Client: Accessing subject via proxy.
 */
namespace ProxyPattern {
    interface Storage {
        get<T>(key: string): Promise<T>;
        set<T>(key: string, value: T): Promise<void>;
    }

    interface Permission {
        write: boolean;
        read: boolean;
    }

    class IndexedDBStorage implements Storage {
        private dbPromise: Promise<IDBDatabase>;

        constructor(
            public name: string,
            public permission: Permission,
            public storeName = 'default'
        ) { }

        private get dbReady(): Promise<IDBDatabase> {
            if (!this.dbPromise) {
                this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
                    let request = indexedDB.open(name);

                    request.onsuccess = event => {
                        resolve(request.result);
                    };

                    request.onerror = event => {
                        reject(request.error);
                    };
                });
            }

            return this.dbPromise;
        }

        get<T>(key: string): Promise<T> {
            if (!this.permission.read) {
                return Promise.reject<T>(new Error('Permission denied'));
            }

            return this
                .dbReady
                .then(db => new Promise<T>((resolve, reject) => {
                    let transaction = db.transaction(this.storeName);
                    let store = transaction.objectStore(this.storeName);

                    let request = store.get(key);

                    request.onsuccess = event => {
                        resolve(request.result);
                    };

                    request.onerror = event => {
                        reject(request.error);
                    };
                }));
        }

        set<T>(key: string, value: T): Promise<void> {
            if (!this.permission.write) {
                return Promise.reject(new Error('Permission denied'));
            }

            return this
                .dbReady
                .then(db => new Promise<void>((resolve, reject) => {
                    let transaction = db.transaction(this.storeName, 'readwrite');
                    let store = transaction.objectStore(this.storeName);

                    let request = store.put(value, key);

                    request.onsuccess = event => {
                        resolve();
                    };

                    request.onerror = event => {
                        reject(request.error);
                    };
                }));
        }
    }

    let storage = new IndexedDBStorage('foo', {
        read: true,
        write: true
    });
}

// Other example 

namespace ProxyPattern {
    export interface Subject {
        doAction(): void;
    }

    export class Proxy implements Subject {
        private realSubject: RealSubject;
        private s: string;

        constructor(s: string) {
            this.s = s;
        }

        public doAction(): void {
            console.log("`doAction` of Proxy(", this.s, ")");
            if (this.realSubject === null || this.realSubject === undefined) {
                console.log("creating a new RealSubject.");
                this.realSubject = new RealSubject(this.s);
            }
            this.realSubject.doAction();
        }
    }

    export class RealSubject implements Subject {
        private s: string;

        constructor(s: string) {
            this.s = s;
        }
        public doAction(): void {
            console.log("`doAction` of RealSubject", this.s, "is being called!");
        }
    }
}

// Other example

interface Payment {
    amount(money: number): number;
}

export class Money implements Payment {
    amount(money: number) {
        console.log(`Getting ${money} of money`);
        return money;
    }
}

export class Check {
    cost = 0.02;
    amount(money: number) {
        console.log(`Converting ${money} of funds into money`);
        return new Money().amount(money - this.cost * money);
    }
}
