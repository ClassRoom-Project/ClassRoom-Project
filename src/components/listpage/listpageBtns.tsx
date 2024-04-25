import React, { PropsWithChildren } from 'react';
import { ClassFiltersType } from '@/types/classFilter';
interface PriceBtnProps {
  classFilters: ClassFiltersType; // ClassFiltersType는 해당 타입이 정의되어 있어야 함
  minPrice: number;
  maxPrice: number;
  filterText: string;
  handlePriceFilter: () => void;
}
export const PriceBtn: React.FC<PriceBtnProps> = ({
  classFilters,
  minPrice,
  maxPrice,
  filterText,
  handlePriceFilter
}) => {
  const isPriceSelected = (min: number, max: number) => {
    return classFilters.selectedPrice?.min === min && classFilters.selectedPrice?.max === max;
  };

  return (
    <button
      onClick={handlePriceFilter}
      className={`rounded-2xl border-[1px] border-solid border-point-purple p-2 text-sm md:px-0 md:py-1 md:text-base  ${
        isPriceSelected(minPrice, maxPrice)
          ? 'bg-point-purple text-white'
          : 'bg-pale-purple transition-all hover:bg-button-disable-color'
      }`}
    >
      {filterText}
    </button>
  );
};

export const DifficultyBtn = ({ handleClassDifficultyBtn, difficulty }) => {
  return (
    <button
      onClick={handleClassDifficultyBtn}
      className={`rounded-2xl border-[1px] border-solid border-point-purple py-1  ${
        ClassFilters.selectedDifficulty === { difficulty }
          ? 'bg-point-purple text-white'
          : 'bg-pale-purple transition-all hover:bg-button-disable-color'
      }`}
    >
      고급
    </button>
  );
};
