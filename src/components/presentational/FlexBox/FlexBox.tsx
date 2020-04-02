import React from 'react';
import cx from 'classnames';

import './FlexBox.scss';


type FlexDirection = 
    'row-reverse' |
    'column' |
    'column-reverse';

type FlexWrap =
    'wrap' |
    'wrap-reverse';

type FlexJustify =
    'end' |
    'center' |
    'space-between' |
    'space-around'

type FlexAlignItems =
    'start' |
    'end' |
    'center' |
    'baseline';

type FlexAlignContent =
    'start' |
    'end' |
    'center' |
    'baseline';

function classNameFromFlexType(
    direction?: FlexDirection,
    wrap?: FlexWrap,
    justify?: FlexJustify,
    alignItems?: FlexAlignItems,
    alignContent?: FlexAlignContent,
): ObjectOf<string, boolean> {
    const stringifyType = (classPrefix: string, propertyValue?: string) => propertyValue ? `${classPrefix}-${propertyValue}` : '';

    return {
        [stringifyType('direction', direction)]: true,
        [stringifyType('', wrap)]: true,
        [stringifyType('justify', justify)]: true,
        [stringifyType('align-items', alignItems)]: true,
        [stringifyType('align-content', alignContent)]: true,
    }
}

export interface IFlexBoxProps {
    children?: React.ReactNode,
    className?: string,
    direction?: FlexDirection,
    wrap?: FlexWrap,
    justify?: FlexJustify,
    alignItems?: FlexAlignItems,
    alignContent?: FlexAlignContent,
}

export const FlexBox = ({
    children,
    className,
    direction,
    wrap,
    justify,
    alignItems,
    alignContent,
}: IFlexBoxProps) => (
    <div className={cx(
        className,
        classNameFromFlexType(
            direction,
            wrap,
            justify,
            alignItems,
            alignContent,
        )
    )}>
        {children}
    </div>
);