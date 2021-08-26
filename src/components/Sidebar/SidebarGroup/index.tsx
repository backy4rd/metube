import React, { useState } from 'react';

import './SidebarGroup.css';

interface SidebarGroupProps {
  children?: React.ReactNode;
}

const soluong = 5;

function SidebarGroup(props: SidebarGroupProps) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className="SidebarGroup">
      {Array.isArray(props.children)
        ? props.children.slice(
            0,
            !isExpand && props.children.length > soluong ? soluong : undefined
          )
        : props.children}

      {Array.isArray(props.children) && props.children.length > soluong && (
        <div className="SidebarGroup-Toggle" onClick={() => setIsExpand(!isExpand)}>
          {isExpand ? 'show less «' : 'show more »'}
        </div>
      )}
    </div>
  );
}

export default SidebarGroup;
