/**
 * Adapter Pattern connects existing classes or objects with another existing client. It makes classes that are not designed to work
 * together possible to cooperate with each other.
 * An adapter could be either a class adapter or an object adapter. A class adapter extends the adaptee class and exposes extra APIs that
 * would work with the client. An object adapter, on the other hand, does not extend the adaptee class. Instead, it stores the adaptee as a
 * dependency.
 * Participants:
 * - Target (Storage): Defines an interface of an existing targets that works with client.
 * - Adaptee (IndexedDb): The implementation that is not designed to work with the client.
 * - Adapter (IndexedDbStorage): Conforms the interface of the target and interacts with adaptee.
 * - Client: Manipulates the target.
 */

namespace Adapter {
    interface Storage {
        get<T>(key: string): Promise<T>;
        set<T>(key: string, value: T): Promise<void>;
    }

    class IndexedDBStorage implements Storage {
        constructor(
            public db: IDBDatabase,
            public storeName = 'default'
        ) { }

        open(name: string): Promise<IndexedDBStorage> {
            return new Promise<IndexedDBStorage>((resolve, reject) => {
                let request = indexedDB.open(name);

                request.onsuccess = event => {
                    let db = request.result as IDBDatabase;
                    let storage = new IndexedDBStorage(db);
                    resolve(storage);
                };

                request.onerror = event => {
                    reject(request.error);
                };
            });
        }

        get<T>(key: string): Promise<T> {
            return new Promise<T>((resolve, reject) => {
                let transaction = this.db.transaction(this.storeName);
                let store = transaction.objectStore(this.storeName);

                let request = store.get(key);

                request.onsuccess = event => {
                    resolve(request.result);
                };

                request.onerror = event => {
                    reject(request.error);
                };
            });
        }

        set<T>(key: string, value: T): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                let transaction = this.db.transaction(this.storeName, 'readwrite');
                let store = transaction.objectStore(this.storeName);

                let request = store.put(value, key);

                request.onsuccess = event => {
                    resolve();
                };

                request.onerror = event => {
                    reject(request.error);
                };
            });
        }
    }
}
