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
    <div className="w-full  py-4 mb-16">
      <p className="text-2xl ">{classTitle}</p>
      <div className="divider my-2"></div>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
    </div>
  );
};

export default ClassDetailContainer;
