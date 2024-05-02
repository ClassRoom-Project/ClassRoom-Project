'use client';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import useRegisterStore from '@/store/registerStore';
import 'react-quill/dist/quill.snow.css';

interface InitialDataType {
  classContent: string;
}

interface ClassContentProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <></>
});

const CustomToolbar = () => (
  <div id="toolbar" className="quill-toolbar">
    <span className="ql-formats">
      <select className="ql-header" aria-label="Header Size">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
      <button className="ql-list" value="bullet" aria-label="Unordered List"></button>
      <button className="ql-indent" value="-1" aria-label="Decrease Indent"></button>
      <button className="ql-indent" value="+1" aria-label="Increase Indent"></button>
    </span>
    <span className="ql-formats">
      <select className="ql-color" aria-label="Text Color"></select>
      <select className="ql-background" aria-label="Background Color"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-link" aria-label="Insert Link"></button>
      <button className="ql-clean" aria-label="Clear Formatting"></button>
    </span>
  </div>
);

const ClassContent: React.FC<ClassContentProps> = ({ isEditMode, initialData }) => {
  const { classContent, setClassContent } = useRegisterStore();

  useEffect(() => {
    if (isEditMode && initialData) {
      setClassContent(initialData.classContent);
    }
  }, [isEditMode, initialData, setClassContent]);

  const handleClassContentChange = (value: string) => {
    setClassContent(value);
  };

  return (
    <div className="mb-2 mt-4 h-96 md:mb-1 lg:mb-1">
      <div className="flex w-full flex-col items-start space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <p className="flex-shrink-0 text-sm font-bold text-[#3F3F3F] md:text-base lg:text-base">
          <span className="font-bold text-[#d63232]">*</span>클래스 설명
        </p>
        <div className="w-full flex-grow">
          <CustomToolbar />
          <ReactQuill
            theme="snow"
            value={classContent}
            onChange={handleClassContentChange}
            modules={{
              toolbar: { container: '#toolbar' },
              clipboard: { matchVisual: false }
            }}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'list',
              'bullet',
              'indent',
              'link',
              'color',
              'background',
              'clean'
            ]}
            placeholder="클래스의 상세 설명을 입력해주세요"
            className="form-input lg:h-92 h-60 rounded text-lg md:h-72"
          />
        </div>
      </div>
    </div>
  );
};

export default ClassContent;
