import { IconType } from "react-icons";
export interface ButtonProps{
    label: string ,
    classButton:string ,
    btnType?: "button" | "submit" ,
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type User = {
    firstName: string;
    lastName: string;
    howDidYouHearAboutUs: string;
    phoneNumber: string;
    initGroup: string;
  };
  
  export type UserContextType = {
    user: User;
    updateUser: (data: Partial<User>) => void;
  };


export interface InputFieldWithIcon{
    placeholder : string ,
    type: string ,
    color: string ,
    Icon : IconType ,
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface SelectOptionProps {
    options: string[];
    onChange: (selectedValue: string) => void;
  }
  

