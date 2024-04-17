import ClassList from '@/components/listpage/ClassList';
import SearchFilter from '@/components/listpage/SearchFilter';
import CategoryBtns from '@/components/listpage/CategoryBtns';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';
export default function ListPage() {
  return (
    <div className="flex flex-col px-36 items-center  justify-center">
      <CategoryBtns />
      <SearchFilter />
      <ClassList />
      <MoveToTopBtn />
    </div>
  );
}
