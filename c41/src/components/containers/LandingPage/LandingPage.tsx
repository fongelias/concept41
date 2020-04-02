import React from 'react';
import { Logo } from 'components/presentational/Logo/Logo';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';

import './LandingPage.scss';

export const LandingPage = () => (
    <div className='LandingPage'>
        <FlexBox
            justify='center'
            alignItems='center'
        >
            <Logo/>
        </FlexBox>
    </div>
);