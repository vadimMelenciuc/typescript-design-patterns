/**
 * The Bridge Pattern decouples the abstraction manipulated by clients from functional implementations and makes it possible to add or
 * replace these abstractions and implementations easily.
 *
 * Participants:
 * - Abstraction (UIElement): Defines the interface of objects to be manipulated by the client and stores the references to its implementer.
 * - Refined abstraction (TextElement, ImageElement): Extends abstraction with specialized behaviors.
 * - Implementer (UIToolkit): Defines the interface of a general implementer that will eventually carry out the operations defined in
 *   abstractions. The implementer usually cares only about basic operations while the abstraction will handle hight-level operations.
 * - Concrete implementer (SVGToolkit, CanvasToolkit): Implements the implementer interface and manipulates low-level APIs.
 */
namespace Bridge {
    interface UIToolkit {
        drawBorder(): void;
        drawImage(src: string): void;
        drawText(text: string): void;
    }

    abstract class UIElement {
        constructor( public toolkit: UIToolkit) { }

        abstract render(): void;
    }

    class TextElement extends UIElement {
        constructor( public text: string, toolkit: UIToolkit) {
            super(toolkit);
        }

        render(): void {
            this.toolkit.drawText(this.text);
        }
    }

    class ImageElement extends UIElement {
        constructor( public src: string, toolkit: UIToolkit) {
            super(toolkit);
        }

        render(): void {
            this.toolkit.drawImage(this.src);
        }
    }

    let toolkit: UIToolkit;

    let imageElement = new ImageElement('foo.jpg', toolkit);
    let textElement = new TextElement('bar', toolkit);

    imageElement.render();
    textElement.render();
}
