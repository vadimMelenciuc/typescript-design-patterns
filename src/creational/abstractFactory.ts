/**
 * The Abstract Factory Pattern usually defines the interfaces of a collection of factory methods, without specifying
 * concrete products. This allows an entire factory to be replaceable, in order to produce different products following
 * the same production outline.
 *
 * Different from the Factory Method Pattern, the Abstract Factory Pattern extracts another part called client that take
 * cares of shaping the outline of the building process. This makes the factory part focused more on producing
 * each component.
 *
 * Participants:
 *  - Abstract Factory (RocketFactory) : provides the interface for manufacturing components.
 *  - Concrete Factory (ExperimentalRocketFactory, FreightRocketFactory): implements the interface defined by
 *     the Abstract Factory.
 *  - Abstract Products (Rocket, Payload, Stage[]): interface of the products the factory is going to build.
 *  - Concrete Products (ExperimentalRocket/FreightRocket, ExperimentalPayload/Satellite ...): products that are
 *     manufactured by the Concrete Factory.
 *  - Client: Arranges the production process across all factories.
 */

export namespace AbstractFactory {
    class Engine {
        constructor(
            public thrust: number
        ) { }
    }

    interface Payload {
        weight: number;
    }

    interface Stage {
        engines: Engine[];
    }

    interface Rocket {
        payload: Payload;
        stages: Stage[];
    }

    interface RocketFactory<T extends Rocket> {
        createRocket(): T;
        createPayload(): Payload;
        createStages(): Stage[];
    }

    class Client {
        buildRocket<T extends Rocket>(factory: RocketFactory<T>): T {
            let rocket = factory.createRocket();

            rocket.payload = factory.createPayload();
            rocket.stages = factory.createStages();

            return rocket;
        }
    }

    // EXPERIMENTAL ROCKET FAMILY

    class ExperimentalPayload implements Payload {
        weight: number;
    }

    class ExperimentalRocketStage implements Stage {
        engines: Engine[];
    }

    class ExperimentalRocket implements Rocket {
        payload: ExperimentalPayload;
        stages: [ExperimentalRocketStage];
    }

    class ExperimentalRocketFactory implements RocketFactory<ExperimentalRocket> {
        createRocket(): ExperimentalRocket {
            return new ExperimentalRocket();
        }

        createPayload(): ExperimentalPayload {
            return new ExperimentalPayload();
        }

        createStages(): [ExperimentalRocketStage] {
            return [new ExperimentalRocketStage()];
        }
    }

    // FREIGHT ROCKET FAMILY

    class Satellite implements Payload {
        constructor(
            public id: number,
            public weight: number
        ) { }
    }

    class FreightRocketFirstStage implements Stage {
        engines: Engine[];
    }

    class FreightRocketSecondStage implements Stage {
        engines: Engine[];
    }

    type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];

    class FreightRocket implements Rocket {
        payload: Satellite;
        stages: FreightRocketStages;
    }

    class FreightRocketFactory implements RocketFactory<FreightRocket> {
        nextSatelliteId = 0;

        createRocket(): FreightRocket {
            return new FreightRocket();
        }

        createPayload(): Satellite {
            return new Satellite(this.nextSatelliteId++, 100);
        }

        createStages(): FreightRocketStages {
            return [
                new FreightRocketFirstStage(),
                new FreightRocketSecondStage()
            ];
        }
    }
}
