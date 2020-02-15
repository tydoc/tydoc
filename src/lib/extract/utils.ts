import * as tsm from 'ts-morph'

export function isCallable(t: tsm.Type): boolean {
  return t.getCallSignatures().length > 0
}

export function hasAlias(t: tsm.Type): boolean {
  return t.getAliasSymbol() !== undefined
}

/**
 * Tell if the given type is primitive or not.
 */
export function isPrimitive(t: tsm.Type): boolean {
  return (
    t.getText() === 'never' ||
    t.getText() === 'void' ||
    t.isNull() ||
    t.isNumber() ||
    t.isString() ||
    t.isBoolean() ||
    t.isUndefined() ||
    t.isUnknown() ||
    t.isAny()
  )
}

function isNode(x: unknown): x is tsm.Node {
  return x instanceof tsm.Node
}

function isString(x: unknown): x is string {
  return typeof x === 'string'
}

function isUndefined(x: unknown): x is undefined {
  return x === undefined
}

export function isNodeAtTypeLevel(node: tsm.Node): boolean {
  return (
    tsm.Node.isTypeAliasDeclaration(node) ||
    tsm.Node.isInterfaceDeclaration(node) ||
    tsm.Node.isPropertySignature(node)
  )
}
