import React, { useCallback } from 'react';
import { Logo } from 'components/presentational/Logo/Logo';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';
import { useHistory } from 'react-router-dom';
import { ConceptsPagePath } from 'components/containers/ConceptsPage/ConceptsPage';

import './LandingPage.scss';


export const LandingPagePath = "/";

export const LandingPage = () => {
    let history = useHistory();

    const navigateToConceptsPage = useCallback(() => {
        history.push(ConceptsPagePath);
    }, [history])

    return (
        <div className='LandingPage'>
            <FlexBox
                className='LandingPageInner'
                justify='center'
                alignItems='center'
                direction='column'
            >
                <Logo onClick={navigateToConceptsPage}/>
            </FlexBox>
        </div>
    );
}
