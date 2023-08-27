import React, { useState, useEffect } from "react";
import ImageUpload from './ImageUpload';
import InputField from '../ui/InputField';
import { AiOutlineUser, AiOutlineMail, AiOutlineLoading } from 'react-icons/ai';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Button from '../ui/Button';
import SelectOption from '../ui/SelectOption';
import { useQuery } from "@apollo/client";
import client from "../../grapql/client";
import { GET_SYSTEM_PARAMETERS } from "../../grapql/queries";
import { useUser } from '../contexts/UserContext';
import { updateProfile } from '../../apiServices/api'
import { User } from "@/types";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface FormErrors {
    [key: string]: string;
}

const UpdateProfileForm = () => {
    const router = useRouter();
    const { user, updateUser } = useUser();
    const [error, setError] = useState(false)
    const [phone, setPhone] = useState('');
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const [selectedSk, setSelectedSk] = useState<string>("");
    const [skOptions, setSkOptions] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);


    const [formData, setFormData] = useState<Partial<User>>({
        firstName: user.firstName,
        lastName: user.lastName,
        howDidYouHearAboutUs: user.howDidYouHearAboutUs,
        phoneNumber: user.phoneNumber,
    });

    const validateForm = () => {
        const errors: FormErrors = {};

        if (!formData.firstName) {
            errors.firstName = "First Name is required";
        }

        if (!formData.lastName) {
            errors.lastName = "Last Name is required";
        }
        if (!formData.howDidYouHearAboutUs) {
            errors.howDidYouHearAboutUs = "how Did You Hear About Us is required";
        }
        if (!formData.phoneNumber) {
            errors.phoneNumber = "phone Number is required";
        }


        return errors;
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    };
    const handlePhoneChange = (value: string) => {
        setPhone(value); // Update the phone state here
        setFormData((prevData) => ({ ...prevData, phoneNumber: value }));

    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setSelectedSk(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setIsLoading(true);
        try {
            const updatedFormData = {
                ...formData,
                initGroup: "learner"
            };
            await updateProfile(updatedFormData);
            updateUser(formData);
            alert('Profile updated successfully!');

            setIsLoading(false);
            router.push('/profile')
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await client.query({
                    query: GET_SYSTEM_PARAMETERS,
                });

                const parsedItems = data.getSystemParameters.Items.map((item: string) => {
                    const parsedItem = JSON.parse(item);
                    return parsedItem.sk;
                });
                setSkOptions(parsedItems);
            } catch (error) {
                console.error("GraphQL error:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <>
            <ImageUpload />
            <form className="grid grid-cols-2 gap-4 mt-10" >
                <div className="relative">
                    <div className={`absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500`}>
                        <AiOutlineUser className={`w-4 h-4 text-amber-500 `} />
                    </div>
                    <input
                        type='text'
                        className={`bg-amber-50 border border-amber-300 text-amber-500 text-sm rounded-lg
                        focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5`}
                        placeholder='First Name'
                        name="firstName"
                        value={formData.firstName} onChange={handleInputChange}
                    />
                    {formErrors.firstName && <p className="text-red-500">{formErrors.firstName}</p>}

                </div>

                <div className="relative">
                    <div className={`absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500`}>
                        <AiOutlineUser className={`w-4 h-4 text-amber-500 `} />
                    </div>
                    <input
                        type='text'
                        className={`bg-amber-50 border border-amber-300 text-amber-500 text-sm rounded-lg
                        focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5`}
                        placeholder='Last Name'
                        name="lastName"
                        value={formData.lastName} onChange={handleInputChange}
                    />
                    {formErrors.lastName && <p className="text-red-500">{formErrors.lastName}</p>}

                </div>
                <div className="relative">
                    <div className={`absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500`}>
                        <AiOutlineMail className={`w-4 h-4 text-amber-500 `} />
                    </div>
                    <input
                        type='email'
                        className={`bg-amber-50 border border-amber-300 text-amber-500 text-sm rounded-lg
                        focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5`}
                        placeholder='example@test.com' value="takwasyr81@gmail.com"
                    />

                </div>

                <div className="relative">

                    <PhoneInput
                        className="bg-amber-50 border border-amber-300
                    text-gray-500 text-sm rounded-lg focus:ring-amber-500
                    focus:border-amber-500 block w-full p-2.5"
                        defaultCountry={phone}
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                    />
                </div>

                <div className="relative">
                    <select
                        value={selectedSk}
                        onChange={handleSelectChange}
                        name="howDidYouHearAboutUs"
                        className="bg-amber-50 border border-amber-300
                        text-gray-500 text-sm rounded-lg focus:ring-amber-500
                        focus:border-amber-500 block w-full p-2.5"
                    >
                        <option value="">How Hear About us ?</option>
                        {skOptions.map((sk: string, index: number) => (
                            <option className="" key={index} value={sk}>
                                {sk}
                            </option>
                        ))}
                    </select>
                    {formErrors.howDidYouHearAboutUs && <p className="text-red-500">{formErrors.howDidYouHearAboutUs}</p>}

                </div>

                <div className="flex justify-center col-span-2">
                    {/* <button
                        type="submit"
                        disabled={isLoading} // Disable button while loading
                        className={`bg-amber-300 text-white py-2 rounded-lg px-4 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                        {isLoading ? (
                            <>
                                <AiOutlineLoading className="animate-spin" />
                            </>
                        ) : (
                            "Continue"
                        )}
                    </button> */}
                    <Link
                        href={{
                            pathname: '/profile',
                            query: user,
                        }}
                        className={`bg-amber-300 text-white py-2 rounded-lg px-4 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={handleSubmit}
                    >
                        
                            {isLoading ? (
                                <>
                                    <AiOutlineLoading className="animate-spin" />
                                </>
                            ) : (
                                "Continue"
                            )}
                    </Link>

                    {/* <Button label='Continue' classButton={`bg-amber-300 text-white py-2 rounded-lg px-4`} /> */}
                </div>
            </form>
        </>


    );
}

export default UpdateProfileForm;
