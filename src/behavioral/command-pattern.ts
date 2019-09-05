/**
 * Command Pattern involves encapsulating operations as executable commands and could either in form of objects or functions
 * in Javascript. It is common that we want to make operations rely on certain context and states that are not accessible for the invokers.
 * By storing those pieces of information with a command and passing it out, this situation could be properly handled.
 *
 * Participants:
 * - Command: Defines the general interface of commands passing around, it could be a function signature if the commands are in the form
 *   of functions.
 * - Concrete command: Defines the specific behaviors and related data structure. It could also be a function that matches the signature
 *   declared as Command. The cancel handler in the very first example is a concrete command.
 * - Context/Receiver: The context or receiver that the command is associated with. In the first example, it is the $layer.
 * - Client: Creates concrete command and their contexts.
 * - Invoker: Executes concrete commands.
 */

namespace CommandPattern {
    export class Command {
        public execute(): void {
            throw new Error("Abstract method!");
        }
    }

    export class ConcreteCommand1 extends Command {
        private receiver: Receiver;

        constructor(receiver: Receiver) {
            super();
            this.receiver = receiver;
        }

        public execute(): void {
            console.log("`execute` method of ConcreteCommand1 is being called!");
            this.receiver.action();
        }
    }

    export class ConcreteCommand2 extends Command {
        private receiver: Receiver;

        constructor(receiver: Receiver) {
            super();
            this.receiver = receiver;
        }

        public execute(): void {
            console.log("`execute` method of ConcreteCommand2 is being called!");
            this.receiver.action();
        }
    }

    export class Invoker {
        private commands: Command[];

        constructor() {
            this.commands = [];
        }

        public storeAndExecute(cmd: Command) {
            this.commands.push(cmd);
            cmd.execute();
        }
    }

    export class Receiver {
        public action(): void {
            console.log("action is being called!");
        }
    }
}

(function main() {
    var receiver: CommandPattern.Receiver = new CommandPattern.Receiver(),
        command1: CommandPattern.Command = new CommandPattern.ConcreteCommand1(receiver),
        command2: CommandPattern.Command = new CommandPattern.ConcreteCommand2(receiver),
        invoker: CommandPattern.Invoker = new CommandPattern.Invoker();

    invoker.storeAndExecute(command1);
    invoker.storeAndExecute(command2);

}());
