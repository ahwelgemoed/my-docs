import React, { FC } from "react";

const DocsLayout: FC<any> = ({ children }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="max-w-3xl w-full block p-6 rounded-lg shadow-lg bg-white m-20">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
