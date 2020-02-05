import { join } from "path";
import {
  Project,
  SourceFile,
  ExportedDeclarations,
  FunctionDeclaration,
  VariableDeclaration,
  ts,
  Type
} from "ts-morph";

export function extractDocsAndTypesFromEntrypoint() {
  const entryPoint =
    "/Users/flavian/projects/prisma/graphql-santa/src/index.ts";
  const project = new Project({ addFilesFromTsConfig: true });

  project.addSourceFileAtPathIfExists(entryPoint);

  const file = project.getSourceFile(entryPoint);

  
  return extractExportDeclarations(file)
}

function extractExportDeclarations(file: SourceFile) {
  const exportedDeclarations = file.getExportedDeclarations();
  const output = [];

  for (const [name, declarations] of exportedDeclarations) {
    output.push(extractDeclarations(name, declarations[0]));
  }

  return output;
}

function extractDeclarations(
  name: string,
  declaration: ExportedDeclarations
) {
  const sourceFile = declaration.getSourceFile();
  const filePath = sourceFile.getFilePath();
  const line = declaration.getStartLineNumber();

  if (declaration instanceof FunctionDeclaration) {
    return {
      kind: "function",
      name,
      filePath,
      line,
      parameters: declaration
        .getParameters()
        .map(
          p =>
            `name: ${p.getName()} - type: ${extractTypeMetadata(p.getType())}`
        ),
      jsDoc: declaration.getJsDocs().map(doc => doc.getFullText()),
      type: declaration.getReturnType().getText()
    };
  }

  if (declaration instanceof VariableDeclaration) {
    return {
      kind: "variable",
      name,
      filePath,
      line,
      type: extractTypeMetadata(declaration.getInitializer().getType()),
      jsDoc: undefined // TODO: Extract jsdoc from variable statement
    };
  }

  return null
}

function extractTypeMetadata(type: Type<ts.Type>) {
  const properties = type.getApparentProperties()

  return {
    text: type.getText(),
    properties: properties.map(p => ({
      name: p.getName(),
      type: extractTypeMetadata(p.getDeclaredType())
    }))
  };
}

const out = extractDocsAndTypesFromEntrypoint();

out[0] //?
 out[0].type.properties //?



// const project = new Project()
// const file = project.createSourceFile("test.ts", `const result = import("typescript");`);
// const varDec = file.getVariableDeclarationOrThrow("result");
// const callExpr = varDec.getInitializerIfKindOrThrow(ts.SyntaxKind.CallExpression);
// const moduleSymbol = callExpr.getArguments()[0].getSymbolOrThrow();
// const valueDeclaration = moduleSymbol.getValueDeclarationOrThrow();

// console.log(moduleSymbol.getName());
// console.log(valueDeclaration.getSourceFile().getFilePath());

// const type = moduleSymbol.getTypeAtLocation(valueDeclaration);
// for (const prop of type.getProperties()) {
//     console.log(prop.getName());
// }
