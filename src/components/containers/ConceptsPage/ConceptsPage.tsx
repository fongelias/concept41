import React, { useCallback, useEffect, useState } from 'react';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';
import { GithubClient } from 'clients/GithubClient/GithubClient';
import { yamlAsObject } from 'util/yamlAsObject';
import { ConceptVisibility } from "conceptDocs/conceptConfigTypes";

import cx from 'classnames';

import './ConceptsPage.scss';
import { ConceptOverlay, ConceptOverlayDataProps, ExtractConceptOverlayProps } from './ConceptOverlay/ConceptOverlay';


export const CONCEPT_FILE_NAME = '.concept.yml';

export const ConceptsPagePath = "/concepts";

const defaultConceptOverlayProps: ConceptOverlayDataProps[] = new Array(41).fill(null).map((_val, idx) => {
  return {
    visibility: ConceptVisibility.Private,
    conceptNumber: 41 - idx,
  }
});

const NO_SELECTED_CONCEPT = -1;

export const ConceptsPage = () => {
    // State
    const [conceptOverlayPropsState, setConceptOverlayPropsState] = useState<ConceptOverlayDataProps[]>(defaultConceptOverlayProps);
    const [selectedConceptState, setSelectedConceptState] = useState<number>(NO_SELECTED_CONCEPT);

    // Fetch Initial State
    useEffect(() => {
      const fetchData = async () => {
        const client = new GithubClient();
        const repoNames: string[] = (await client.listRepos()).map((repo) => repo.name);
        const files = (await Promise.all(
          repoNames.map((repo: string) => {
            return client.listFiles(repo);
          })
        )).reduce((acc, c) => [...acc, ...c], [])
        .filter((file) => file.getName() === CONCEPT_FILE_NAME);

        const fileContents = await Promise.all(files.map(file => file.getContents()));
        const conceptOverlayProps = fileContents.map(yamlAsObject).map(ExtractConceptOverlayProps);
        
        console.log(conceptOverlayProps);
        return conceptOverlayProps;
      }

      const buildConceptOverlayPropsState = (conceptOverlayProps: ConceptOverlayDataProps[]): ConceptOverlayDataProps[] => {
        const propsByConceptNumber = conceptOverlayProps.reduce((acc, c) => {
          return {
            ...acc,
            [c.conceptNumber]: c,
          }
        }, {} as Record<string, ConceptOverlayDataProps>);

        return defaultConceptOverlayProps.map((emptyConcept, idx) => {
          const currConceptNumber = `${41 - idx}`;

          return propsByConceptNumber[currConceptNumber] ? propsByConceptNumber[currConceptNumber] : emptyConcept;
        });
      }

      fetchData()
        .then(buildConceptOverlayPropsState)
        .then(newConceptOverlayPropsState => setConceptOverlayPropsState(newConceptOverlayPropsState))
        .catch(console.error);
    }, []);

    const ConceptLinkOnClick = useCallback((isDisabled, idx) => {
      return () => {
        setSelectedConceptState(isDisabled ? NO_SELECTED_CONCEPT : idx);
      };
    }, [selectedConceptState, setSelectedConceptState]);

    const CloseOverlay = useCallback(() => {
      setSelectedConceptState(NO_SELECTED_CONCEPT);
    }, [setSelectedConceptState]);


    return (
        <div className='ConceptsPage'>
          <FlexBox className='ConceptsPageInner'>
            <FlexBox
              justify='center'
              alignItems='center'
            >
              <div className="ConceptLinksContainer">
                <FlexBox
                  justify='start'
                  alignItems='start'
                  wrap='wrap'
                >
                  {
                    conceptOverlayPropsState.map((conceptPageProps, idx) => {
                      const num = conceptPageProps.conceptNumber;
                      const numStr = num < 10 ? `0${num}` : `${num}`;
                      const isDisabled = conceptPageProps.visibility === ConceptVisibility.Private;
                      const isActive = selectedConceptState === idx;
                      const onClick = ConceptLinkOnClick(isDisabled, idx);

                      return (
                        <ConceptLink value={numStr} key={idx} disabled={isDisabled} onClick={onClick} active={isActive}/>
                      )
                    })
                  }
                </FlexBox>
              </div>
            </FlexBox>
          </FlexBox>
          <ConceptOverlay
            closeOverlay={CloseOverlay}
            active={selectedConceptState !== NO_SELECTED_CONCEPT}
            {...conceptOverlayPropsState[selectedConceptState]}/>
        </div>
    );
}

interface ConceptLinkProps {
  value: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ConceptLink = ({
  value,
  active,
  disabled,
  onClick,
}: ConceptLinkProps) => {  
  return (
    <div
      className={cx('ConceptLink', {
        disabled,
        active,
      })}
      onClick={onClick}
    >
      <div className="ConceptLinkOverlayContainer">
        <div className="ConceptLinkOverlay"></div>
      </div>
      <FlexBox
        className='ConceptLinkInner'
        justify='center'
        alignItems='center'
      >
        <span>{value}</span>
      </FlexBox>
    </div>
  );
}
