import ClassList from '@/components/listpage/ClassList';
import SearchFilter from '@/components/listpage/SearchFilter';
import CategoryBtns from '@/components/listpage/CategoryBtns';
export default function ListPage() {
  return (
    <div className="flex flex-col px-36  justify-center">
      <CategoryBtns />
      <SearchFilter />
      <ClassList />
    </div>
  );
}
