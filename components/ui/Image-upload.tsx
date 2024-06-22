"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

export default function ImageUpload({
  disabled,
  onChange,
  value,
  onRemove,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[60%] h-[350px] rounded-md overflow-hidden"
          >
            <Image
              src={url}
              alt="Uploaded Image"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="destructive"
                onClick={() => onRemove(url)}
                size="icon"
              >
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="m9nn0voz">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlusIcon className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
