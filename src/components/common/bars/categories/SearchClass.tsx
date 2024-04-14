import { useSearchStore } from '@/store/classFilterStore';
import { useRouter } from 'next/navigation';
import { IoIosSearch } from 'react-icons/io';
import _ from 'lodash';
//yarn add --dev @types/lodash
//yarn add lodash

export const SearchClass = () => {
  const router = useRouter();
  const { selectedTitle, setSelectedTitle } = useSearchStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
    console.log(e.target.value);
  };

  //Todo: 쓰로틀링 잘 적용안되는 에러 해결
  const throttling = _.throttle(handleSearchChange, 300);
  const handleSearchBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/list');
  };
  return (
    <form className="h-[120px] w-[300px] flex items-center justify-center" onSubmit={handleSearchBtn}>
      <div className="border-[1px] rounded-xl w-64 items-end justify-end border-main-color">
        <input
          onChange={throttling}
          value={selectedTitle}
          className="h-12 rounded-xl"
          type="text"
          placeholder="  클래스명"
        />
        <button type="submit" className="btn w-[72px] rounded-xl text-white bg-main-color hover:bg-button-hover-color">
          <IoIosSearch />
        </button>
      </div>
    </form>
  );
};
