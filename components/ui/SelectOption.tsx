import { SelectOptionProps } from '@/types';
import React, { ChangeEvent } from 'react';


const SelectOption: React.FC<SelectOptionProps> = ({ options, onChange }) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select
      className="bg-amber-50 border border-amber-300
      text-gray-500 text-sm rounded-lg focus:ring-amber-500
      focus:border-amber-500 block w-full p-2.5"
      onChange={handleSelectChange}
    >
      <option value="">How Hear About us ?</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
