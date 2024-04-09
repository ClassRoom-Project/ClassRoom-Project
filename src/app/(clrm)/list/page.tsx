import ClassList from '@/components/listpage/ClassList';
import Categories from '@/components/listpage/Categories';
import CategoryBtns from '@/components/listpage/CategoryBtns';
export default function ListPage() {
  return (
    <div className="flex flex-col">
      <CategoryBtns />
      <Categories />
      <ClassList />
    </div>
  );
}
