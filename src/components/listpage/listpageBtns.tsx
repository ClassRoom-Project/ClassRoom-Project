import React, { PropsWithChildren } from 'react';
import { ClassFiltersType } from '@/types/classFilter';
interface PriceBtnProps {
  classFilters: ClassFiltersType; // ClassFiltersType는 해당 타입이 정의되어 있어야 함
  minPrice: number;
  maxPrice: number;
  filterText: string;
  handlePriceFilter: () => void;
}
interface DifficultyBtnProps {
  classFilters: ClassFiltersType; // ClassFiltersType는 해당 타입이 정의되어 있어야 함
  handleClassDifficultyBtn: () => void;
  difficulty: string | null | undefined;
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
      className={`rounded-2xl border-[1px] border-solid border-point-purple p-2 text-xs md:px-0 md:py-1 md:text-base  ${
        isPriceSelected(minPrice, maxPrice)
          ? 'bg-point-purple text-white'
          : 'bg-pale-purple transition-all hover:bg-button-disable-color'
      }`}
    >
      {filterText}
    </button>
  );
};

export const DifficultyBtn: React.FC<DifficultyBtnProps> = ({ handleClassDifficultyBtn, difficulty, classFilters }) => {
  return (
    <button
      onClick={handleClassDifficultyBtn}
      className={`w-12 rounded-2xl border-[1px] border-solid border-point-purple py-1 text-xs md:w-24 md:text-base  ${
        classFilters.selectedDifficulty == difficulty
          ? 'bg-point-purple text-white'
          : 'bg-pale-purple transition-all hover:bg-button-disable-color'
      }`}
    >
      {difficulty}
    </button>
  );
};
