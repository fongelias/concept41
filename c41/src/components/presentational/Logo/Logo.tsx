import React from 'react';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';

import './Logo.scss';

export const Logo = () => (
    <FlexBox
        className='concept-logo'
        justify='center'
    >
        <span className='concept-text'>CONCEPT</span><span>-41</span>
    </FlexBox>
)