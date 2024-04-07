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
    <form className="m-4 p-4 flex gap-4 items-center">
      <label htmlFor={id}>{label}</label>
      <select
        name="job"
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="select select-bordered w-[200px]"
      >
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
