import { baseConfig } from "./conceptConfig";
import { appConfig } from "./kinds/appConfig";
import { appMetadata } from "./props/appMetadataConfig";


// manifest for generated docs
const kindConfigs = {
  appConfig,
};

const propConfigs = {
  appMetadata,
};

export const docManifest = {
   baseConfig,
   kindConfigs,
   propConfigs,
}
