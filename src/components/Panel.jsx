import React from 'react';

const Panel = ({ children, className }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

export default Panel;
