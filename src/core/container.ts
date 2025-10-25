type Constructor<T> = new (...args: any[]) => T;
type Factory<T> = (...args: any[]) => T;

export interface ServiceDefinition<T = any> {
  factory?: Factory<T>;
  instance?: T;
  singleton?: boolean;
}

export class Container {
  private services = new Map<string, ServiceDefinition>();
  private instances = new Map<string, any>();

  register<T>(
    token: string,
    constructor: Constructor<T>,
    options: { singleton?: boolean } = {}
  ): this {
    this.services.set(token, {
      factory: (...args: any[]) => new constructor(...args),
      singleton: options.singleton ?? true,
    });
    return this;
  }

  registerFactory<T>(
    token: string,
    factory: Factory<T>,
    options: { singleton?: boolean } = {}
  ): this {
    this.services.set(token, {
      factory,
      singleton: options.singleton ?? true,
    });
    return this;
  }

  registerInstance<T>(token: string, instance: T): this {
    this.services.set(token, { instance });
    return this;
  }

  resolve<T>(token: string): T {
    const service = this.services.get(token);

    if (!service) {
      throw new Error(`Service '${token}' not found`);
    }

    if (service.singleton && this.instances.has(token)) {
      return this.instances.get(token);
    }

    let instance: T;
    if (service.instance) {
      instance = service.instance;
    } else if (service.factory) {
      instance = service.factory();
    } else {
      throw new Error(`Invalid service definition for '${token}'`);
    }

    if (service.singleton) {
      this.instances.set(token, instance);
    }

    return instance;
  }

  clear(): void {
    this.instances.clear();
  }
}

export const container = new Container();
