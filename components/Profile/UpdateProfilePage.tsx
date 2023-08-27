import React from 'react';
import dynamic from 'next/dynamic';
import Layout from './Layout';
import { RiLoader5Line } from 'react-icons/ri';


const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-4xl text-amber-600">
        <RiLoader5Line className="animate-spin" />
      </div>
    </div>
  );
};
const DynamicUpdateProfileForm = dynamic(() => import('./UpdateProfileForm'), {
  loading: () => <Loading />,
  ssr: false, // Disable server-side rendering for this component
});


const UpdateProfilePage = () => {
  return (
    <Layout>
      <div className="bg-white rounded-lg p-6 shadow-md relative">
        <DynamicUpdateProfileForm />
      </div>
    </Layout>
  );
};

export default UpdateProfilePage;
