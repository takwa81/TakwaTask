import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineEdit } from 'react-icons/ai';
import Avatar from '../../public/avatar.jpg' ;


const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="flex justify-center relative ">
      <Image
        src={selectedImage || Avatar}
        width={50}
        height={50}
        alt="Circle"
        className="w-20 h-20 rounded-full bg-gray-200 border-4 border-white shadow-md absolute -top-[50px]"
      />

      <div className="absolute right-[42%] p-2">
        <label htmlFor="imageInput">
          <AiOutlineEdit
            className="w-5 h-5 text-white bg-amber-500 rounded-lg cursor-pointer"
          />
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
