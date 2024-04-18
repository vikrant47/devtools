const regex = /\${([^}]+)}/g;
export class TemplateEngine {
  static evalFunctionBody(body: string, context: Record<string, any>) {
    return new Function('context', body)(context);
  }
  static evalString(expression: string, context: Record<string, any>) {
    // const parsed = expEval.parse(expression); // abstract syntax tree (AST)
    // return expEval.eval(parsed, context); // 2.4
    return this.evalFunctionBody(`return ${expression}`, context);
  }

  /** Evaluate expression inside ${exp}*/
  static evalExpression(expression: string, context: Record<string, any>) {
    expression = expression.trim();
    if (expression.startsWith('${') && expression.endsWith('}')) {
      return this.evalString(expression.substring(2, expression.length - 1), context);
    }
    let curMatch = null;
    const found = [];
    while ((curMatch = regex.exec(expression))) {
      found.push(curMatch);
    }
    if (found.length > 0) {
      found.forEach((match) => {
        const value = this.evalString(match[1], context);
        expression = expression.replace(match[0], value);
      });
    }
    return expression;
  }

  /**
   * this will walk on the path and will return the underlying object
   * e.g.
   * 1 - TemplateEngine.walk('x.y',{x:{y:10}}) will return {value:10}
   * 2 - TemplateEngine.walk('x.y',{x:{y:10}},-1) will return {value:{y:10},prop:'y'}
   * */
  static walk(path: string, context: Record<string, any>, depth = 0) {
    if (depth !== 0) {
      const edges = path.split('.');
      const spliced = edges.splice(depth * -1);
      path = edges.join('.');
      return { value: this.evalString(path, context), prop: spliced.join('.') };
    }
    return { value: this.evalString(path, context) };
  }
}
