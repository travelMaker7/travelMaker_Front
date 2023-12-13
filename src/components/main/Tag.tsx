import React from 'react';

interface TagProps {
  location: string;
}

const Tag: React.FC<TagProps> = ({ location }) => {
  return (
    <div className="tag">
      {location}
    </div>
  );
};

export default Tag;