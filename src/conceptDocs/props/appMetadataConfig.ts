import { PropertyDefinition } from "../conceptConfigTypes";

// property defs for type: appMetadata
export const appMetadata: Record<string, PropertyDefinition> = {
  version: {
    type: "string",
    description: "version of the application"
  },
  description: {
    type: "string",
    description: "describes the application",
  },
}
