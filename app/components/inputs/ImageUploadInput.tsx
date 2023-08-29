"use client";

import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadInputProps {
  onChange: (value: string) => void;
  value?: string;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  onChange,
  value,
}) => {
  const onUploadHandle = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        onUpload={onUploadHandle}
        uploadPreset="jqko6lv5"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="relative cursor-pointer p-10 border border-dashed border-neutral-500 flex flex-col gap-2 justify-center items-center h-[30vh] rounded-md"
            >
              <TbPhotoPlus size="50" />
              <p className="font-bold">Click to upload image</p>
              {value ? (
                <div
                  className="
                absolute inset-0 w-full h-full"
                >
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                    alt="House"
                  />
                </div>
              ) : null}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploadInput;
