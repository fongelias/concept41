import { PropertyDefinition } from '../conceptConfigTypes';

// property defs for kind: app
export const appConfig: Record<string, PropertyDefinition> = {
  hostname: {
    type: "string",
    description: "hostname for application",
  },
  metadata: {
    type: "map",
    description: "metadata about the application",
    allowedProperties: {
      app: {
        type: "appMetadata",
        description: "metadata describing the app"
      },
    }
  },
  spec: {
    type: "string",
    description: "specification for the application",
    allowedProperties: {
      visibility: {
        type: "string",
        description: "determines visibility on concept41 website. either 'visible' or 'private'"
      },
      livenessProbe: {
        type: "string",
        description: "url for health check"
      },
      documentation: {
        type: "string",
        description: "url for app documentation"
      },
      repository: {
        type: "string",
        description: "url for app repository"
      },
    }
  }
}
