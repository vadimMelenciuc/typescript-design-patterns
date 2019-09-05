/**
 * All the preceding objects are instances of Node, they implement the interface of a component in Composite Pattern
 *
 * Participants:
 * - Component (Node): defines the interface and the default behavior for objects of the composite. it should also include an interface to
 *  access and manage the child component on an instance, and optionally a reference to its parent.
 * - Composite (HtmlBodyElement): stores child components and implements related operations, and of course its own behavior.
 * - Leaf (HtmlImageElement): defines behaviors of a primitive component.
 * - Client: manipulates the composite and its components.
 */

import * as Path from 'path';
import * as FS from 'fs';

abstract class FileSystemObject {
    constructor(
        public path: string,
        public parent?: FileSystemObject
    ) { }

    get basename(): string {
        return Path.basename(this.path);
    }
}

class FolderObject extends FileSystemObject {
    items: FileSystemObject[];

    constructor(path: string, parent?: FileSystemObject) {
        super(path, parent);

        this.items = FS
            .readdirSync(this.path)
            .map(path => {
                let stats = FS.statSync(path);

                if (stats.isFile()) {
                    return new FileObject(path, this);
                } else {
                    return new FolderObject(path, this);
                }
            });
    }
}

class FileObject extends FileSystemObject {
    readAll(): Buffer {
        return FS.readFileSync(this.path);
    }
}

// Another example
namespace CompositePattern {
    export interface Component {
        operation(): void;
    }

    export class Composite implements Component {

        private list: Component[];
        private s: String;

        constructor(s: String) {
            this.list = [];
            this.s = s;
        }

        public operation(): void {
            console.log("`operation of `", this.s)
            for (var i = 0; i < this.list.length; i += 1) {
                this.list[i].operation();
            }
        }

        public add(c: Component): void {
            this.list.push(c);
        }

        public remove(i: number): void {
            if (this.list.length <= i) {
                throw new Error("index out of bound!");
            }
            this.list.splice(i, 1);
        }
    }

    export class Leaf implements Component {
        private s: String;
        constructor(s: String) {
            this.s = s;
        }
        public operation(): void {
            console.log("`operation` of Leaf", this.s, " is called.");
        }
    }
}
