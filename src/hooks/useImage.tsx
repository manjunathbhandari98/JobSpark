import { useState, useEffect } from "react";

const useImage = (
  pictureData: string | null | undefined
) => {
  const [imageSource, setImageSource] =
    useState<string>("/avatar.png");

  useEffect(() => {
    if (pictureData) {
      try {
        const base64String = `data:image/jpeg;base64,${pictureData}`;
        setImageSource(base64String);
      } catch (error) {
        console.error(
          "Error generating image source:",
          error
        );
        setImageSource("/avatar.png");
      }
    } else {
      setImageSource("/avatar.png");
    }
  }, [pictureData]);

  return imageSource;
};

export default useImage;
