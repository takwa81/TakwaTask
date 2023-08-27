import React from 'react';
import { ButtonProps } from '@/types'; 

const Button: React.FC<ButtonProps> = ({
  label,
 classButton ,
  btnType,
  onClick,
}) => {
  return (
    <button
      type={btnType}
      className={classButton}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
