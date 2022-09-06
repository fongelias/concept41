export enum YamlType {
  string = "string",
  number = "number",
  array = "array",
  map = "map",
}

export interface PropertyDefinition {
  type: YamlType | string;
  description: string;
  allowedProperties?: Record<string, PropertyDefinition>;
}

export enum ConceptVisibility {
  Private = 'private',
  Public = 'public',
}

export enum ConceptKind {
  App = 'app',
}

export const conceptVersions = new Set([
  'v0.0',
]);
