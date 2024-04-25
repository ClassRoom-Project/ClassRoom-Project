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
    <div className="mb-12 w-full md:mb-16 lg:w-[80%] lg:min-w-[850px] lg:py-4">
      <p className="hidden text-2xl md:flex">{classTitle}</p>
      <div className="divider my-2"></div>
      <div className=" leading-7" dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
    </div>
  );
};

export default ClassDetailContainer;
