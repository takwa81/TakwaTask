import React from 'react';
import { InputFieldWithIcon } from '@/types';

const InputField: React.FC<InputFieldWithIcon> = ({
    placeholder,
    Icon,
    type ,
    color
}) => {
    return (
        <>
            <div className={`absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500`}>
                <Icon className={`w-4 h-4 text-amber-500 `}/>
            </div>
            <input
                type={type}
                className={`bg-${color}-50 border border-${color}-300 text-${color}-500 text-sm rounded-lg
               focus:ring-${color}-500 focus:border-${color}-500 block w-full pl-10 p-2.5`}
                placeholder={placeholder}
            />
            </>

    );
};

export default InputField;
