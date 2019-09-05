# SOLID

S: Single Responsibility Principal.
O: Open Close Principle.
L: Liskov Substitution Principle: Also known as substitutability, you should be able to use a subclass in place of its parent class.
I: Interface Segregation.
D: Dependency inversion.

## Factory Pattern

* Single Responsibility principle.
* Open/Close principle.

## Factory Abstract Pattern

## Abstraction Principle

Through the process of abstraction, a programmer hides all but the relevant data about an object in order to reduce complexity and increase efficiency

## Encapsulation Principle

Is the inclusion within a program object of all the resources need for the object to function

## Inheritance Principle

Inheritance is the concept that when a class of objects is defined, any subclass that is defined can inherit the definitions of one or more general classes

## Polymorphism Principle

## Singleton Pattern

You can have only a single instance of a specific class throughout the entire application.

## Loose Coupling principle

Software parts that communicates with each other have little to no knowledge of each other's actual implementation.
Components that are loosely coupled ara often called Black Boxes, because as long as the interfaces match we don't care about the components which is the essence of Loosely coupling.

* Single Responsibility principle.
* Separation of concerns principle.
* Factory pattern/object pool pattern.
* Dependency Injection pattern.

## Object Pool principle

A pool of pre-initialized objects whose initialization is heavyweight. Every time we need such an object we take one from the pool. Once we are done with it we return it back to the pool.

## Dependency Injection

* The use of new of Dependencies is Not Allowed.
* DI Container = IoC Container (Inversion of Control)

## Reflection

The ability to make use of code metadata to provide runtime information and inspection data about classes, interfaces and types.

* Ability to get the name of a method.
* Know the types of a method's arguments list.
* Retrieve assembly information.
* Allow Dependency injection to work.

DIFFICULTY: Javascript  lacks of reflection, so we have to take extra steps in order to achieve Dependency injection.
SOLUTION: Use string keys instead of Interfaces.

## Principle of least interest (Law of Demeter)

Every component should have little knowledge of how other components work and only communicate with a few specific close friends.
