import React from 'react';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { ConceptKind, ConceptVisibility } from "conceptDocs/conceptConfigTypes";
import { IconX } from 'components/presentational/IconX/IconX';
import { Octocat } from 'assets/icons/Octocat';
import cx from 'classnames';

import './ConceptOverlay.scss'
import { StringLiteral } from 'typescript';

export interface ConceptOverlayDataProps {
  name?: string;
  kind?: ConceptKind;
  hostname?: string;
  resourceVersion?: string;
  resourceDescription?: string;
  visibility: ConceptVisibility;
  conceptNumber: number;
  repositoryLocation?: string;
}

export interface ConceptOverlayProps extends ConceptOverlayDataProps {
  active: boolean;
  closeOverlay: () => void;
}

export const ExtractConceptOverlayProps = (input: Record<string, any>): ConceptOverlayDataProps => {
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

export const ConceptOverlay = ({
  active,
  closeOverlay,
  name,
  kind,
  hostname,
  resourceVersion,
  resourceDescription,
  visibility,
  conceptNumber,
  repositoryLocation,
}: ConceptOverlayProps) => (
  <div className={cx('ConceptOverlay', {
      active,
  })}>
    <FlexBox
      direction='column'
    >
      <IconX onClick={closeOverlay}/>
      <FlexBox justify='center'>
        <div className='ConceptOverlayInner'>
          <FlexBox direction='column'>
            <a href={`http://${hostname}`}>
              <h1>{name}</h1>
            </a>
            <ConceptProperty propertyKey="concept type" value={kind}/>
            <ConceptProperty propertyKey="description" value={resourceDescription}/>
            <hr/>
            <Octocat color='white' href={repositoryLocation}/>
          </FlexBox>
        </div>
      </FlexBox>
    </FlexBox>
  </div>
)

interface ConceptPropertyProps {
  propertyKey?: string;
  value?: string;
}

const ConceptProperty = ({
  propertyKey = "",
  value = "",
}: ConceptPropertyProps) => (
  <div className='ConceptProperty'>
    <FlexBox direction='column'>
      <p className='ConceptPropertyKey'>{propertyKey}:</p>
      <p className='ConceptPropertyValue'>{value}</p>
    </FlexBox>
  </div>
);
