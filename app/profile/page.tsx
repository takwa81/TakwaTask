"use client"
import React from "react";
import { GetServerSideProps } from 'next';
import { useUser } from '../../components/contexts/UserContext';

interface ProfilePageProps {
    query: {
        firstName?: string;
        lastName?: string;
        howDidYouHearAboutUs: string;
        phoneNumber: string;
    };
}
const Profile:React.FC<ProfilePageProps> = ({ query }) =>  {
    const { user } = useUser();
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <p>
                    <strong>First Name:</strong> {query?.firstName || user.firstName}
                </p>
                <p>
                    <strong>Last Name:</strong> {query?.lastName || user.lastName}
                </p>

                <p>
                    <strong>Phone Number:</strong> {query?.phoneNumber || user.phoneNumber}
                </p>
                <p>
                    <strong>How Did You Hear About Us:</strong>{" "}
                    {query?.howDidYouHearAboutUs || user.howDidYouHearAboutUs}
                </p>
            </div>
        </div>


    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: {
            query,
        },
    };
};

export default Profile;
