import React from 'react';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';

import './ErrorPage.scss';

export const ErrorPagePath = "/error";

export const ErrorPage = () => (
  <div className='ErrorPage'>
    <FlexBox
      className='ErrorPageInner'
      justify='center'
      alignItems='center'
      direction='column'
    >
      <h1 className="ErrorPageHeader">ERROR</h1>
      <FlexBox justify='center'>
        <p className="ErrorPageBody">what do u think ur doing buddy snooping around where u dont belong gtfo before i call the cops</p>
      </FlexBox>
    </FlexBox>
  </div>
);
