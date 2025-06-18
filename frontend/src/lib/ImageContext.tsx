import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";

// Define the type for the context value
interface ImageContextType {
    image: File | null;
    outputImage: string | null;
    transparentBg: boolean;
    imageBg: string | null;
    loading: boolean;

    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleSampleClick: (url: string) => void;
    downloadImage: () => void;
    changeBackgroundColor: (value: string) => void;
    clearImages: () => void;
}

// Use `createContext<ImageContextType | undefined>`
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Create provider component
export const ImageProvider = ({ children }: { children: ReactNode }) => {
    const [image, setImage] = useState<File | null>(null);
    const [outputImage, setOutputImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [transparentBg, setTransparentBg] = useState<boolean>(true)
    const [imageBg, setImageBg] = useState<string | null>(null)

    useEffect(() => {
        if (image) handleUpload();
    }, [image]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && ["image/jpeg", "image/png"].includes(file.type)) {
            setImage(file);
        } else {
            alert("Only JPG, JPEG, and PNG files are allowed.");
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && ["image/jpeg", "image/png"].includes(file.type)) {
            setImage(file);
        } else {
            alert("Only JPG, JPEG, and PNG files are allowed.");
        }
    };

    const handleUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:5000/remove-bg", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob",
            });

            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            setOutputImage(imageUrl);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to process the image.");
        } finally {
            setLoading(false);
        }
    };

    const handleSampleClick = async (url: string) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const file = new File([blob], "sample.jpg", { type: blob.type });
          setImage(file);
        } catch (err) {
          alert(`Failed to load sample image: ${err}`);
        }
      };

    const downloadImage = async () => {
        if (!outputImage) {
            alert("No image to download.");
            return;
        }

        if (transparentBg === true && imageBg === null) {
            createDownloadLink(outputImage, "processed-image")
        } else if (transparentBg === false) {
            const newImageUrl = await applyBackgroundColor();
            if (newImageUrl) {
                createDownloadLink(newImageUrl, "image-with-bg")
            }
        } else {
            alert('something went wrong')
        }
    };

    const createDownloadLink = (url: string, name: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const applyBackgroundColor = async (): Promise<string | null> => {
        if (!outputImage || !imageBg) {
            alert("No image or color provided.");
            return null;
        }

        try {
            setLoading(true);

            // Fetch the blob from outputImage URL
            const response = await fetch(outputImage);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append("image", blob, "image.png");
            formData.append("color", imageBg);

            const apiResponse = await axios.post("http://127.0.0.1:5000/add-bg-color", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob",
            });

            const imageUrl = URL.createObjectURL(new Blob([apiResponse.data]));
            return imageUrl;

        } catch (error) {
            console.error("Error applying background color:", error);
            alert("Failed to apply background color.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const changeBackgroundColor = (value: string) => {
        if (value.startsWith('#')) {
            setTransparentBg(false); // Reset Tailwind class
            setImageBg(value); // Apply inline background color
        } else {
            setImageBg(null)
            setTransparentBg(true)
        }
    }

    const clearImages = () => {
        setImage(null)
        setOutputImage(null)
        setTransparentBg(true)
        setImageBg(null)
    };

    return (
        <ImageContext.Provider value={{ image, outputImage, transparentBg, imageBg, loading, handleFileChange, handleDrop, handleSampleClick, downloadImage, changeBackgroundColor, clearImages }}>
            {children}
        </ImageContext.Provider>
    );
};

// Custom hook to use the context
export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImage must be used within an ImageProvider");
    }
    return context;
};
