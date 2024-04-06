import { ClassAllType } from '@/types/class';

const ClassDetailRight = ({ classData }: { classData: ClassAllType | null }) => {
  return (
    <div className="flex flex-col div-5 ml-4 justify-center items-center w-[500px] rounded-lg min-h-full border-[#5373FF] border-solid border-[1px]">
      <div className="flex items-center mt-2 justify-center w-[350px]">
        <p className=" text-[#5373FF]">{classData?.title}</p>
      </div>
      <div className="w-[350px] h-[350px] border-gray-400 border-solid border-b mt-2">
        <p>{classData?.description}</p>
      </div>
      <div className="w-[350px] mt-2">class infos</div>
      <div className="w-[350px] mt-2">button</div>
    </div>
  );
};

export default ClassDetailRight;
