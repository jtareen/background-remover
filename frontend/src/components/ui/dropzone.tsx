import { UploadIcon } from "lucide-react";
import { useImage } from "@/lib/ImageContext";
import { useRef } from "react";

function Dropzone() {
    const { handleFileChange, handleDrop, loading } = useImage()
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex h-auto w-full max-w-[500px] items-center justify-center p-2 sm:p-14">
        <div
            className="w-full h-auto border border-input rounded-md flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-blue-400 shadow-xl"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >

            <div className="flex size-10 md:size-12 items-center justify-center rounded-md bg-blue-400 text-white">
                <UploadIcon size={22} />
            </div>
            <p className="my-2 w-full truncate font-medium text-base sm:text-lg">Upload now</p>
            <p className="w-full truncate  text-xs sm:text-base">Or drop your image here</p>
            <p className="text-xs text-gray-400">Accepts JPG, JPEG, and PNG files only, less than 5.00MB.</p>

            <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {loading && <p className="text-blue-500 mt-2">Uploading...</p>}
        </div>
        </div>
    );
}

export default Dropzone;