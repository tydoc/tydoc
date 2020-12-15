// todo:
// Restore this once we're able to extract graphql request
// docs again with extractor (current hitting infinite loop)
//
// import { Doc } from '@tydoc/extractor/types'
// export const graphQLRequestTypes: Doc.Package = {

export const graphQLRequestTypes: any = {
  modules: [
    {
      kind: 'module',
      mainExport: null,
      namedExports: [
        {
          kind: 'export',
          name: 'Variables',
          type: { kind: 'typeIndexRef', link: '(types).Variables' },
          isType: true,
          isTerm: false,
        },
        {
          kind: 'export',
          name: 'GraphQLError',
          type: { kind: 'typeIndexRef', link: '(types).GraphQLError' },
          isType: true,
          isTerm: false,
        },
        {
          kind: 'export',
          name: 'GraphQLResponse',
          type: { kind: 'typeIndexRef', link: '(types).GraphQLResponse<T>' },
          isType: true,
          isTerm: false,
        },
        {
          kind: 'export',
          name: 'GraphQLRequestContext',
          type: {
            kind: 'typeIndexRef',
            link: '(types).GraphQLRequestContext<V>',
          },
          isType: true,
          isTerm: false,
        },
        {
          kind: 'export',
          name: 'ClientError',
          type: {
            kind: 'object',
            props: [
              {
                kind: 'prop',
                name: 'response',
                type: {
                  kind: 'object',
                  props: [
                    {
                      kind: 'prop',
                      name: 'data',
                      type: {
                        kind: 'union',
                        raw: {
                          typeText: 'T | undefined',
                          nodeFullText: '',
                          nodeText: '',
                        },
                        discriminantProperties: null,
                        types: [
                          { kind: 'primitive', type: 'undefined' },
                          {
                            kind: 'unsupported',
                            raw: {
                              typeText: 'T',
                              nodeText: 'T = any',
                              nodeFullText: 'T = any',
                            },
                          },
                        ],
                        isDiscriminated: false,
                      },
                    },
                    {
                      kind: 'prop',
                      name: 'errors',
                      type: {
                        kind: 'union',
                        raw: {
                          typeText: 'GraphQLError[] | undefined',
                          nodeFullText: '',
                          nodeText: '',
                        },
                        discriminantProperties: null,
                        types: [
                          { kind: 'primitive', type: 'undefined' },
                          {
                            kind: 'array',
                            innerType: {
                              kind: 'typeIndexRef',
                              link: '(types).GraphQLError',
                            },
                          },
                        ],
                        isDiscriminated: false,
                      },
                    },
                    {
                      kind: 'prop',
                      name: 'extensions',
                      type: { kind: 'primitive', type: 'any' },
                    },
                    {
                      kind: 'prop',
                      name: 'status',
                      type: { kind: 'primitive', type: 'number' },
                    },
                  ],
                  raw: {
                    typeText: 'GraphQLResponse<any>',
                    nodeText:
                      'export interface GraphQLResponse<T = any> {\n  data?: T\n  errors?: GraphQLError[]\n  extensions?: any\n  status: number\n  [key: string]: any\n}',
                    nodeFullText:
                      'export interface GraphQLResponse<T = any> {\n  data?: T\n  errors?: GraphQLError[]\n  extensions?: any\n  status: number\n  [key: string]: any\n}',
                  },
                },
              },
              {
                kind: 'prop',
                name: 'request',
                type: {
                  kind: 'object',
                  props: [
                    {
                      kind: 'prop',
                      name: 'query',
                      type: { kind: 'primitive', type: 'string' },
                    },
                    {
                      kind: 'prop',
                      name: 'variables',
                      type: {
                        kind: 'union',
                        raw: {
                          typeText: 'V | undefined',
                          nodeFullText: '',
                          nodeText: '',
                        },
                        discriminantProperties: null,
                        types: [
                          { kind: 'primitive', type: 'undefined' },
                          {
                            kind: 'unsupported',
                            raw: {
                              typeText: 'V',
                              nodeText: 'V = Variables',
                              nodeFullText: 'V = Variables',
                            },
                          },
                        ],
                        isDiscriminated: false,
                      },
                    },
                  ],
                  raw: {
                    typeText: 'GraphQLRequestContext<Variables>',
                    nodeText:
                      'export interface GraphQLRequestContext<V = Variables> {\n  query: string\n  variables?: V\n}',
                    nodeFullText:
                      'export interface GraphQLRequestContext<V = Variables> {\n  query: string\n  variables?: V\n}',
                  },
                },
              },
              {
                kind: 'prop',
                name: 'name',
                type: { kind: 'primitive', type: 'string' },
              },
              {
                kind: 'prop',
                name: 'message',
                type: { kind: 'primitive', type: 'string' },
              },
              {
                kind: 'prop',
                name: 'stack',
                type: {
                  kind: 'union',
                  raw: {
                    typeText: 'string | undefined',
                    nodeFullText: '',
                    nodeText: '',
                  },
                  discriminantProperties: null,
                  types: [
                    { kind: 'primitive', type: 'undefined' },
                    { kind: 'primitive', type: 'string' },
                  ],
                  isDiscriminated: false,
                },
              },
            ],
            raw: {
              typeText: 'ClientError',
              nodeText:
                "export class ClientError extends Error {\n  response: GraphQLResponse\n  request: GraphQLRequestContext\n\n  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {\n    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({\n      response,\n      request,\n    })}`\n\n    super(message)\n\n    Object.setPrototypeOf(this, ClientError.prototype)\n\n    this.response = response\n    this.request = request\n\n    // this is needed as Safari doesn't support .captureStackTrace\n    if (typeof Error.captureStackTrace === 'function') {\n      Error.captureStackTrace(this, ClientError)\n    }\n  }\n\n  private static extractMessage(response: GraphQLResponse): string {\n    try {\n      return response.errors![0].message\n    } catch (e) {\n      return `GraphQL Error (Code: ${response.status})`\n    }\n  }\n}",
              nodeFullText:
                "export class ClientError extends Error {\n  response: GraphQLResponse\n  request: GraphQLRequestContext\n\n  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {\n    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({\n      response,\n      request,\n    })}`\n\n    super(message)\n\n    Object.setPrototypeOf(this, ClientError.prototype)\n\n    this.response = response\n    this.request = request\n\n    // this is needed as Safari doesn't support .captureStackTrace\n    if (typeof Error.captureStackTrace === 'function') {\n      Error.captureStackTrace(this, ClientError)\n    }\n  }\n\n  private static extractMessage(response: GraphQLResponse): string {\n    try {\n      return response.errors![0].message\n    } catch (e) {\n      return `GraphQL Error (Code: ${response.status})`\n    }\n  }\n}",
            },
          },
          isType: false,
          isTerm: true,
        },
        {
          kind: 'export',
          name: 'RequestDocument',
          type: { kind: 'typeIndexRef', link: '(types).RequestDocument' },
          isType: true,
          isTerm: false,
        },
      ],
      name: 'types',
      tsdoc: null,
      path: '/src/types',
      isMain: false,
      location: {
        filePath: 'src/types.ts',
      },
    },
  ],
  typeIndex: {
    '(types).Variables': {
      kind: 'alias',
      name: 'Variables',
      type: {
        kind: 'object',
        props: [],
        raw: {
          typeText: 'Variables',
          nodeText: 'export type Variables = { [key: string]: any }',
          nodeFullText: 'export type Variables = { [key: string]: any }',
        },
      },
      raw: {
        typeText: 'Variables',
        nodeText: 'export type Variables = { [key: string]: any }',
        nodeFullText: 'export type Variables = { [key: string]: any }',
      },
      tsdoc: null,
    },
    '(types).GraphQLError': {
      kind: 'interface',
      name: 'GraphQLError',
      props: [
        {
          kind: 'prop',
          name: 'message',
          type: { kind: 'primitive', type: 'string' },
        },
        {
          kind: 'prop',
          name: 'locations',
          type: {
            kind: 'array',
            innerType: {
              kind: 'object',
              props: [
                {
                  kind: 'prop',
                  name: 'line',
                  type: { kind: 'primitive', type: 'number' },
                },
                {
                  kind: 'prop',
                  name: 'column',
                  type: { kind: 'primitive', type: 'number' },
                },
              ],
              raw: {
                typeText: '{ line: number; column: number; }',
                nodeText: '{ line: number; column: number }',
                nodeFullText: '{ line: number; column: number }',
              },
            },
          },
        },
        {
          kind: 'prop',
          name: 'path',
          type: {
            kind: 'array',
            innerType: { kind: 'primitive', type: 'string' },
          },
        },
      ],
      tsdoc: null,
      raw: {
        typeText: 'GraphQLError',
        nodeText:
          'export interface GraphQLError {\n  message: string\n  locations: { line: number; column: number }[]\n  path: string[]\n}',
        nodeFullText:
          'export interface GraphQLError {\n  message: string\n  locations: { line: number; column: number }[]\n  path: string[]\n}',
      },
    },
    '(types).GraphQLResponse<T>': {
      kind: 'interface',
      name: 'GraphQLResponse',
      props: [
        {
          kind: 'prop',
          name: 'data',
          type: {
            kind: 'union',
            raw: { typeText: 'T | undefined', nodeFullText: '', nodeText: '' },
            discriminantProperties: null,
            types: [
              { kind: 'primitive', type: 'undefined' },
              {
                kind: 'unsupported',
                raw: {
                  typeText: 'T',
                  nodeText: 'T = any',
                  nodeFullText: 'T = any',
                },
              },
            ],
            isDiscriminated: false,
          },
        },
        {
          kind: 'prop',
          name: 'errors',
          type: {
            kind: 'union',
            raw: {
              typeText: 'GraphQLError[] | undefined',
              nodeFullText: '',
              nodeText: '',
            },
            discriminantProperties: null,
            types: [
              { kind: 'primitive', type: 'undefined' },
              {
                kind: 'array',
                innerType: {
                  kind: 'typeIndexRef',
                  link: '(types).GraphQLError',
                },
              },
            ],
            isDiscriminated: false,
          },
        },
        {
          kind: 'prop',
          name: 'extensions',
          type: { kind: 'primitive', type: 'any' },
        },
        {
          kind: 'prop',
          name: 'status',
          type: { kind: 'primitive', type: 'number' },
        },
      ],
      tsdoc: null,
      raw: {
        typeText: 'GraphQLResponse<T>',
        nodeText:
          'export interface GraphQLResponse<T = any> {\n  data?: T\n  errors?: GraphQLError[]\n  extensions?: any\n  status: number\n  [key: string]: any\n}',
        nodeFullText:
          'export interface GraphQLResponse<T = any> {\n  data?: T\n  errors?: GraphQLError[]\n  extensions?: any\n  status: number\n  [key: string]: any\n}',
      },
    },
    '(types).GraphQLRequestContext<V>': {
      kind: 'interface',
      name: 'GraphQLRequestContext',
      props: [
        {
          kind: 'prop',
          name: 'query',
          type: { kind: 'primitive', type: 'string' },
        },
        {
          kind: 'prop',
          name: 'variables',
          type: {
            kind: 'union',
            raw: { typeText: 'V | undefined', nodeFullText: '', nodeText: '' },
            discriminantProperties: null,
            types: [
              { kind: 'primitive', type: 'undefined' },
              {
                kind: 'unsupported',
                raw: {
                  typeText: 'V',
                  nodeText: 'V = Variables',
                  nodeFullText: 'V = Variables',
                },
              },
            ],
            isDiscriminated: false,
          },
        },
      ],
      tsdoc: null,
      raw: {
        typeText: 'GraphQLRequestContext<V>',
        nodeText:
          'export interface GraphQLRequestContext<V = Variables> {\n  query: string\n  variables?: V\n}',
        nodeFullText:
          'export interface GraphQLRequestContext<V = Variables> {\n  query: string\n  variables?: V\n}',
      },
    },
    '(types).RequestDocument': {
      kind: 'alias',
      name: 'RequestDocument',
      raw: {
        nodeFullText: '\n\nexport type RequestDocument = string | DocumentNode',
        nodeText: 'export type RequestDocument = string | DocumentNode',
        typeText: 'any',
      },
      tsdoc: null,
      type: { kind: 'primitive', type: 'any' },
    },
  },
}
