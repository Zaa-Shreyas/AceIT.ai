import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { motion } from "framer-motion";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) setPreview(preview);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => inputRef.current.click();

  return (
    <div className="flex justify-center mb-6">
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="hidden" />

      {!image ? (
        <motion.div whileHover={{ scale: 1.05 }} className="w-20 h-20 flex items-center justify-center bg-[#f4d35e]/20 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-[#f95738]" />
          <button type="button" className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#f95738] to-[#ee964b] text-white rounded-full absolute bottom-1 right-1 cursor-pointer" onClick={onChooseFile}>
            <LuUpload />
          </button>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative">
          <img src={preview || previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover" />
          <button type="button" className="w-8 h-8 flex items-center justify-center bg-[#f95738] text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer" onClick={handleRemoveImage}>
            <LuTrash />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;