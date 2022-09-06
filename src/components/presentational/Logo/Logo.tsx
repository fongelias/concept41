import React from 'react';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';

import './Logo.scss';

export interface LogoProperties {
    onClick: () => void;
}

export const Logo = ({
    onClick,
}: LogoProperties) => (
    <div className='concept-logo' onClick={onClick}>
        <FlexBox justify='center'>
            <span className='concept-text'>CONCEPT</span><span>-41</span>
        </FlexBox>
    </div>
);