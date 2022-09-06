import React, { useEffect, useState } from 'react';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';
import { GithubClient } from 'clients/GithubClient/GithubClient';
import { yamlAsObject } from 'util/yamlAsObject';
import { ConceptVisibility } from "conceptDocs/conceptConfigTypes";

import cx from 'classnames';

import './ConceptsPage.scss';
import { ConceptPageProps, ExtractConceptPageProps } from '../ConceptPage/ConceptPage';


export const CONCEPT_FILE_NAME = '.concept.yml';

export const ConceptsPagePath = "/concepts";

const defaultConceptPageProps: ConceptPageProps[] = new Array(41).fill(null).map((_val, idx) => {
  return {
    visibility: ConceptVisibility.Private,
    conceptNumber: 41 - idx,
  }
});

export const ConceptsPage = () => {
    // State
    const [conceptPagePropsState, setConceptPagePropsState] = useState<ConceptPageProps[]>(defaultConceptPageProps);

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
        const conceptPageProps = fileContents.map(yamlAsObject).map(ExtractConceptPageProps);
        
        console.log(conceptPageProps);
        return conceptPageProps;
      }

      const buildConceptPagePropsState = (conceptPageProps: ConceptPageProps[]): ConceptPageProps[] => {
        const propsByConceptNumber = conceptPageProps.reduce((acc, c) => {
          return {
            ...acc,
            [c.conceptNumber]: c,
          }
        }, {} as Record<string, ConceptPageProps>);

        const newProps = defaultConceptPageProps.map((emptyConcept, idx) => {
          const currConceptNumber = `${41 - idx}`;

          return propsByConceptNumber[currConceptNumber] ? propsByConceptNumber[currConceptNumber] : emptyConcept;
        });

        console.log(newProps);

        return newProps;
      }

      fetchData()
        .then(buildConceptPagePropsState)
        .then(newConceptPagePropsState => setConceptPagePropsState(newConceptPagePropsState))
        .catch(console.error);
    }, []);


    return (
        <div className='ConceptsPage'>
          <FlexBox
            className='ConceptsPageInner'
          >
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
                    conceptPagePropsState.map((conceptPageProps, idx) => {
                      const num = conceptPageProps.conceptNumber;
                      const numStr = num < 10 ? `0${num}` : `${num}`;
                      const isDisabled = conceptPageProps.visibility === ConceptVisibility.Private;
                      console.log(isDisabled);

                      return (
                        <ConceptLink value={numStr} key={idx} disabled={isDisabled}/>
                      )
                    })
                  }
                </FlexBox>
              </div>
            </FlexBox>
          </FlexBox>
        </div>
    );
}

interface ConceptLinkProps {
  value: string;
  disabled?: boolean;
}

const ConceptLink = ({
  value,
  disabled,
}: ConceptLinkProps) => (
    <div className={cx('ConceptLink', {
      disabled,
    })}>
      <FlexBox
        className='ConceptLinkInner'
        justify='center'
        alignItems='center'
      >
        <span>{value}</span>
      </FlexBox>
    </div>
)
