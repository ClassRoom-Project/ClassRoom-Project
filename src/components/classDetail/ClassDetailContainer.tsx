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
    <div className="w-full px-8 py-4 mb-16">
      <p className="text-2xl mb-4">{classTitle}</p>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
    </div>
  );
};

export default ClassDetailContainer;
