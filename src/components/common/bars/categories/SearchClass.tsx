import { useSearchStore } from '@/store/classFilterStore';
import { useRouter } from 'next/navigation';

export const SearchClass = () => {
  const router = useRouter();
  const { selectedTitle, setSelectedTitle } = useSearchStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };
  const handleSearchBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/list');
  };
  return (
    <form className="h-[120px] flex items-center justify-center" onSubmit={handleSearchBtn}>
      <input
        onChange={handleSearchChange}
        value={selectedTitle}
        type="text"
        placeholder="클래스 검색"
        className="input input-bordered border-[#5373FF] input-info w-full max-w-xs"
      />
      <button type="submit" className="btn text-white bg-[#5373FF] ml-2">
        Button
      </button>
    </form>
  );
};
