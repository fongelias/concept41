import React from "react";

import './IconX.scss';

interface IconXProps {
  onClick?: () => void;
}

export const IconX = ({
  onClick,
}: IconXProps) => (
  <div className="icon-x" onClick={onClick}>
    <span>x</span>
  </div>
);
