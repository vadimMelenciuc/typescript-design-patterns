/**
 * The façade pattern organizes subsystems and provides a unified hight-level interface. It is common that one project gets referenced by
 * others, but obviously the project that references other projects doesn't and shouldn't care much about the inner structures of its
 * dependencies. Thus a façade can be introduced foa a dependency project to provide a higher-level API abd expose what really matters to
 * its dependents.
 *
 * Participants:
 * - Façade (Robot): Defines a set of hight-level interface, and makes subsystems cooperate.
 * - Subsystem (MotionController, FeedbackController, Thigh, Shank): Implements their own functionalities and communicates internally with
 *   other subsystems if necessary. Subsystems are dependencies of a façade, and they do not dependent on the façade.
 */

import { EventEmitter } from 'events';

class Robot {
    leftLegMotion: MotionController;
    rightLegMotion: MotionController;

    leftFootFeedback: FeedbackController;
    rightFootFeedback: FeedbackController;

    walk(steps: number): void { }
    jump(strength: number): void { }
}

class Leg {
    thigh = new Thigh();
    shank = new Shank();
    foot = new Foot();

    motionController: MotionController;
    feedbackController: FeedbackController;

    constructor() {
        this.motionController = new MotionController(this);
        this.feedbackController = new FeedbackController(this.foot);

        this.feedbackController.on('touch', () => {
            // ...
        });
    }
}

class MotionController {
    constructor(
        public leg: Leg
    ) { }

    setAngle(angle: number): void {
        let {
            thigh,
            shank,
            foot
        } = this.leg;

        // ...
    }
}

class FeedbackController extends EventEmitter {
    constructor(
        public foot: Foot
    ) {
        super();
    }
}

class Thigh {

}

class Shank {

}

class Foot {

}

// Other example

namespace FacadePattern {

    export class Part1 {
        public method1(): void {
            console.log("`method1` of Part1");
        }
    }

    export class Part2 {
        public method2(): void {
            console.log("`method2` of Part2");
        }
    }

    export class Part3 {
        public method3(): void {
            console.log("`method3` of Part3");
        }
    }

    export class Facade {
        private part1: Part1 = new Part1();
        private part2: Part2 = new Part2();
        private part3: Part3 = new Part3();

        public operation1(): void {
            console.log("`operation1` is called ===");
            this.part1.method1();
            this.part2.method2();
            console.log("==========================");
        }

        public operation2(): void {
            console.log("`operation2` is called ===");
            this.part1.method1();
            this.part3.method3();
            console.log("==========================");
        }
    }
}
