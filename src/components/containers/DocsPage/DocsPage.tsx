import React from 'react';
import { FlexBox } from 'components/presentational/FlexBox/FlexBox';

import './DocsPage.scss';

// test copying over yaml and reading on runtime

export const DocsPagePath = "/docs";

export const DocsPage = () => (
  <div className="DocsPage">
    <FlexBox>
      <FlexBox flex-direction="row">
        {/* <div className="SideNav">
          <div className="SideNavContainer">
            nav
          </div>
        </div> */}
        <div className="DocsContents">
          <h1>.concept.yml config reference</h1>
        </div>
      </FlexBox>
    </FlexBox>
  </div>
);
