import React, { ChangeEvent } from 'react';

interface SelectOptionProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | (() => Promise<void>);
  disabled: boolean;
  options: string[];
}

const SelectOption = ({ id, label, value, onChange, disabled, options }: SelectOptionProps) => {
  return (
    <form className="p-4 flex gap-4 justify-center flex-col">
      <label htmlFor={id} className="text-text-dark-gray font-bold">
        {label}
      </label>
      <select
        name="job"
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="select select-bordered lg:w-[250px] md:w-[200px] w-full  border-point-purple shadow-md"
      >
        <option value="" disabled>
          선택해주세요.
        </option>
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default SelectOption;
