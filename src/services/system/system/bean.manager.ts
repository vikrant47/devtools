import _ from 'lodash';

export class BeanManager {
  static _registry = {};

  protected static getClassId(classIdOrType?: string | (new () => any)): string {
    let id = classIdOrType;
    if (typeof id !== 'string') {
      //@ts-ignore
      id = classIdOrType['name'];
    }
    if (!id || id.toString().trim().length === 0) {
      return _.uniqueId('$$bean_');
    }
    return id + '';
  }

  static getInstance<T>(classIdOrType?: string | (new () => T)): T {
    return this._registry[this.getClassId(classIdOrType)];
  }

  static override<T>(
    classIdOrType: string | (new () => any),
    clazz?: new () => T
  ): (new () => T) & { instance: () => T } {
    return this.register(classIdOrType, clazz);
  }

  static register<T>(
    beanId: (new () => T) | string,
    clazz?: new () => T
  ): (new () => T) & { instance: () => T } {
    if (typeof beanId === 'function') {
      clazz = beanId;
      beanId = this.getClassId(clazz.name || _.uniqueId('$$bean_'));
    }
    //@ts-ignore
    const instance = (this._registry[beanId] = new clazz());
    //@ts-ignore
    return Object.assign(clazz, {
      _instance: instance,
      instance(): T {
        return BeanManager.getInstance(beanId);
      }
    });
  }
}
