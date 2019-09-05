/**
 * Consider Strategy Pattern which defines the outline of a process and has interchangeable algorithms as strategies. If we apply this
 * structure under the hierarchy of classes, we will have Template Method Pattern.
 *
 * Participants:
 * - Abstract class (Beverage): Defines the signatures of template methods, as well as the outline of algorithms that weave
 *   everything together.
 * - Concrete class (Coffee, Tea): Implements template methods defined in abstract classes.
 *
*/

namespace TemplateMethodPattern {
    abstract class Beverage {
        boilWater() {
            console.log("把水煮沸");
        }

        abstract brew(): void;
        abstract pourInCup(): void;
        abstract addCondiments(): void;

        makeBeverage() {
            this.boilWater();
            this.brew();
            this.pourInCup();
            this.addCondiments();
        }
    }

    export class Coffee extends Beverage {
        brew(): void {
            console.log("用沸水冲泡咖啡");
        }
        pourInCup(): void {
            console.log("把咖啡倒进杯子");
        }
        addCondiments(): void {
            console.log("加糖和牛奶");
        }
    }

    export class Tea extends Beverage {
        brew(): void {
            console.log("用沸水浸泡茶叶");
        }
        pourInCup(): void {
            console.log("把茶倒进杯子");
        }
        addCondiments(): void {
            console.log("加柠檬");
        }
    }
}

// demo
export function show(): void {
    const coffee: TemplateMethodPattern.Coffee = new TemplateMethodPattern.Coffee();
    const tea: TemplateMethodPattern.Tea = new TemplateMethodPattern.Tea();
    coffee.makeBeverage();
    tea.makeBeverage();
}
