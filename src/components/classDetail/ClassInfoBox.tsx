//태그 div
export const ClassInfoBox = ({ classInfos }: { classInfos: number | string | undefined }) => {
  return (
    <div className="rounded-2xl border-[#6C5FF7] border-solid border-[1px] p-1 flex justify-center items-center">
      {classInfos}
    </div>
  );
};
