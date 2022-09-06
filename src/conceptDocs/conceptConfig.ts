import { PropertyDefinition } from "./conceptConfigTypes";

export const baseConfig: Record<string, PropertyDefinition> = {
  name: {
    type: "string",
    description: "name of concept",
  },
  kind: {
    type: "string",
    description: "type of concept defined in this config",
  },
  apiVersion: {
    type: "string",
    description: "version of concept41 api used in this config",
  },
}
