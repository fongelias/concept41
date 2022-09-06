import yaml from 'js-yaml';

export const yamlAsObject = (input: string): Record<string, any> => {
  return yaml.load(input) as Record<string, any>;
};
