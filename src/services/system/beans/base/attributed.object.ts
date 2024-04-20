import EventEmitter from 'events';
import {ReflectionUtil} from '../../utils/reflection.util';
export class Pojo<T> {
  constructor(props: {[K in keyof T]?: T[K]}) {
    Object.assign(this, props || {});
  }
}

export class AttributedObject {
  constructor(protected attributes = {}) {}
  getAttributes(): any {
    return this.attributes;
  }
  setAttributes(attributes: any): this {
    this.attributes = attributes;
    return this;
  }
  hasAttribute(name: string): boolean {
    return typeof this.attributes[name] !== 'undefined';
  }

  getAttribute(name: string): any {
    return this.attributes[name];
  }

  setAttribute(name: string, attr: any): this {
    this.attributes[name] = attr;
    return this;
  }

  removeAttribute(name: string): boolean {
    const containsAttr = this.hasAttribute(name);
    delete this.attributes[name];
    return containsAttr;
  }

  updateAttributes(attribues: any): this {
    Object.assign(this.attributes, attribues);
    return this;
  }

  clearAttributes(): this {
    for (const key in this.attributes) {
      delete this.attributes[key];
    }
    return this;
  }

  public toPojo(): any {
    return ReflectionUtil.clone(this.attributes);
  }
  public toJSON(): any {
    return this.attributes;
  }
}

export class EmitableAttribute extends EventEmitter {
  protected attributes = {};

  hasAttribute(name: string): boolean {
    return typeof this.attributes[name] !== 'undefined';
  }

  getAttribute(name: string): any {
    return this.attributes[name];
  }

  setAttribute(name: string, attr: any): this {
    this.attributes[name] = attr;
    return this;
  }
}
