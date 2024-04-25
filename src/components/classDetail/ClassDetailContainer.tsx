import React from 'react';
import * as DOMPurify from 'dompurify';

const ClassDetailContainer = ({
  classTitle,
  classDescription
}: {
  classTitle: string | undefined;
  classDescription: string | undefined;
}) => {
  const safeDescription =
    typeof window !== 'undefined' ? DOMPurify.sanitize(classDescription || '') : classDescription || '';

  return (
    <div className="mb-16 w-full py-4 lg:w-[80%] lg:min-w-[850px]">
      <p className="text-2xl ">{classTitle}</p>
      <div className="divider my-2"></div>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
    </div>
  );
};

export default ClassDetailContainer;
