'use client';
import dynamic from 'next/dynamic';
import React, {useEffect} from 'react';
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
  loading: () => <p>Loading...</p>,
});

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

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [
        { 'color': [] }, 
        { 'background': [] }
      ],
      ['link'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'color',
    'background',
    'link',
  ]

  return (
    <div className="mt-4 h-[400px] mb-2">
      <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-4 space-y-4 md:space-y-0 w-full">
        <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
          <span className='text-[#d63232] font-bold'>*</span> 
          클래스 설명
        </p>
        <ReactQuill
          theme="snow"
          value={classContent}
          onChange={handleClassContentChange}
          modules={modules}
          formats={formats}
          placeholder="클래스의 상세 설명을 입력해주세요"
          className="form-input rounded flex-grow w-full text-lg"
          style={{ height: '350px'}}
        />
      </div>
    </div>
  );
};

export default ClassContent;
