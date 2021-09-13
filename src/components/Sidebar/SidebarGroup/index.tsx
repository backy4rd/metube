import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './SidebarGroup.css';

interface SidebarGroupProps {
  children?: React.ReactNode;
  limit?: number;
  className?: string;
  showMoreNavigateTo?: string;
}

function SidebarGroup({
  children = [],
  limit = 5,
  className,
  showMoreNavigateTo,
}: SidebarGroupProps) {
  const [isExpand, setIsExpand] = useState(false);
  const history = useHistory();

  function handleToggle() {
    if (showMoreNavigateTo) {
      history.push(showMoreNavigateTo);
    } else {
      setIsExpand(!isExpand);
    }
  }

  const child = Array.isArray(children) ? children : [children];

  return (
    <div className={'SidebarGroup ' + (className || '')}>
      {child.slice(0, !isExpand && child.length > limit ? limit : undefined)}

      {(child.length > limit || showMoreNavigateTo) && (
        <div className="SidebarGroup-Toggle" onClick={handleToggle}>
          {isExpand ? 'show less «' : 'show more »'}
        </div>
      )}
    </div>
  );
}

export default SidebarGroup;
