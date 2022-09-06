import { ConceptKind, ConceptVisibility } from "conceptDocs/conceptConfigTypes";

export interface ConceptPageProps {
  name?: string;
  kind?: ConceptKind;
  hostname?: string;
  resourceVersion?: string;
  resourceDescription?: string;
  visibility: ConceptVisibility;
  conceptNumber: number;
  repositoryLocation?: string;
}

export const ExtractConceptPageProps = (input: Record<string, any>): ConceptPageProps => {
  // TODO: catch errors from extracting values
  const props = {
    name: input.name,
    kind: input.kind,
    hostname: input.hostname,
    resourceVersion: input.metadata.resource.version,
    resourceDescription: input.metadata.resource.description,
    visibility: input.metadata.visibility,
    conceptNumber: input.metadata.concept.number,
    repositoryLocation: input.spec.repository.httpGet,
  }

  const isAPropUndefined = Object.values(props).filter(props => props === undefined).length;

  if (isAPropUndefined) {
    throw new Error (`a prop for concept, ${input.name}, is undefined`);
  }

  return props;
}


