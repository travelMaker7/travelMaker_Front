import React, { useEffect, useState, ReactNode } from 'react';

interface DropdownProps {
  visibility: boolean;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  const [repeat, setRepeat] = useState<NodeJS.Timeout | null>(null);
  
  useEffect (() => {
    if (props.visibility) {
      if (repeat) {
        clearTimeout(repeat);
        setRepeat(null);
      }
      setVisibilityAnimation(true);
    } else {
      const timeout = setTimeout(() => {
        setVisibilityAnimation(false);
      }, 400);
      setRepeat(timeout);
    }
  })

  return (
    <div className={ `components-dropdown ${props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}` }>
      {visibilityAnimation && props.children}
    </div>
  );
};

export default Dropdown;