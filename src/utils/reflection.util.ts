/**
 * Description placeholder
 * @date 2/5/2023 - 7:21:18 PM
 */
/**
 * Description placeholder
 * @date 2/5/2023 - 7:21:18 PM
 *
 * @export
 * @class ReflectionUtil
 */

export class ReflectionUtil {
  static uuid(): string {
    return crypto.randomUUID();
  }
  /**
   * Description placeholder
   * @date 2/5/2023 - 7:21:18 PM
   *
   * @static
   * @template T
   * @param {new() => T} clazz
   * @returns {((new() => T) & { instance: () => T })}
   */
  //@ts-ignore
  static singleton(clazz) {
    return Object.assign(clazz, {
      _instance: new clazz(),
      instance() {
        return this._instance;
      }
    });
  }

  /**
   * Description placeholder
   * @date 2/5/2023 - 7:21:18 PM
   *
   * @static
   * @param {*} num
   * @param {?*} [defaultVal]
   * @returns {number}
   */
  //@ts-ignore
  static parseInt(num, defaultVal) {
    const parsed = parseInt(num, 10);
    if (!Number.isFinite(parsed)) {
      return defaultVal;
    }
    return parsed;
  }

  /**
   * Description placeholder
   * @date 2/5/2023 - 7:21:18 PM
   *
   * @static
   * @param {*} object
   * @returns {*}
   */
  //@ts-ignore
  static clone(object) {
    return JSON.parse(JSON.stringify(object));
  }

  /**
   * Description placeholder
   * @date 2/5/2023 - 7:21:18 PM
   *
   * @static
   * @param {*} obj
   * @returns {string}
   */
  //@ts-ignore
  static safeStringify(obj) {
    try {
      return JSON.stringify(obj);
    } catch (e) {
      console.warn(`error while stringifying object ${e.message}`);
    }
    return `${obj}`;
  }

  /**
   * Description placeholder
   * @date 2/5/2023 - 7:21:18 PM
   *
   * @static
   * @param {*} obj
   * @returns {boolean}
   */
  //@ts-ignore
  static isClass(obj) {
    if (!obj) return false;
    const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';
    if (obj.prototype === undefined) {
      return isCtorClass;
    }
    const isPrototypeCtorClass =
      obj.prototype.constructor &&
      obj.prototype.constructor.toString &&
      obj.prototype.constructor.toString().substring(0, 5) === 'class';
    return isCtorClass || isPrototypeCtorClass;
  }

  /**
   * Description placeholder
   * @date 2/5/2023 - 7:21:18 PM
   *
   * @static
   * @param {string} strinigified
   * @param {*} defaultVal
   * @returns {*}
   */
  //@ts-ignore
  static safeParse(strinigified, defaultVal) {
    if (typeof strinigified !== 'string') {
      return defaultVal;
    }
    try {
      return JSON.parse(strinigified);
    } catch (e) {
      console.warn(`error while parsing object ${e.message}`, strinigified);
      return defaultVal;
    }
  }
  /**
   * Description placeholder
   * @date 2/5/2023 - 7:21:18 PM
   *
   * @static
   * @template T
   * @param {T} instance
   * @param {string[]|string} functions
   * @param {()=>any} interceptor
   * @returns {T}
   */
  //@ts-ignore
  static interceptCallback(instance, functions, interceptor) {
    if (!Array.isArray(functions)) {
      functions = [functions];
    }
    for (const func of functions) {
      if (!instance[func]) {
        instance[func] = function () {};
      }
      const originalCallback = instance[func];
      instance[func] = function () {
        interceptor.call(this, { args: [...arguments], func });
        return originalCallback.apply(this, arguments);
      };
    }
    return instance;
  }

  static parseJWT(token: string) {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
