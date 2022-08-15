import React from 'react';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';

import './Logo.scss';

export const Logo = () => {
    console.log('testing');
    return (
    <FlexBox
        alignItems='center'
        justify='center'
    >
        <div className='concept-logo'>
            <span className='concept-text'>CONCEPT</span><span>-41</span>
        </div>
    </FlexBox>
)}