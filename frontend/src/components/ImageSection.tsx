// components/ui/social-card.tsx
"use client";

import { cn } from "@/lib/utils";
import { DownloadIcon, X } from "lucide-react";
import { useState } from "react";
import { useImage } from "@/lib/ImageContext";
import SparkleOverlay from "./ui/sparkle-overlay";

export function ImageSection() {
    const [isSelectedOriginal, setIsSelectedOriginal] = useState(false);
    const { image, outputImage, transparentBg, imageBg, changeBackgroundColor, handleSampleClick, clearImages, downloadImage, loading } = useImage()

    return (
        <div className="px-3 md:px-5 lg:px-10">
            {image && (<div
                className={cn(
                    "w-full max-w-2xl mx-auto mb-8",
                    "bg-white dark:bg-zinc-900",
                    "border border-zinc-200 dark:border-zinc-800",
                    "rounded-3xl shadow-xl",
                )}
            >
                <div
                    className={cn(
                        "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                        "rounded-3xl shadow-xl",
                        loading ? "opacity-80 pointer-events-none cursor-wait" : "" // Disable interactions when loading
                    )}
                >
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-4">
                                    <button
                                        type="button"
                                        className={`px-4 py-2 cursor-pointer hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full ${isSelectedOriginal
                                            ? "bg-gray-100 text-black dark:bg-zinc-800 dark:text-white font-normal"
                                            : "text-gray-400"
                                            }`}
                                        onClick={() => setIsSelectedOriginal(true)}
                                    >
                                        Before
                                    </button>
                                    <button
                                        className={`px-4 py-2 cursor-pointer hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full ${isSelectedOriginal
                                            ? "text-gray-400"
                                            : "bg-gray-100 text-black dark:bg-zinc-800 dark:text-white font-normal"
                                            }`}
                                        onClick={() => setIsSelectedOriginal(false)}
                                    >
                                        After
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={clearImages}
                                    className="p-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="mb-2 flex">
                                <div className="checkered-bg cursor-pointer rounded-full border border-gray-200 dark:border-neutral-700 h-10 w-10 mr-2" onClick={() => changeBackgroundColor('checkered-bg')}></div>
                                <div className="cursor-pointer rounded-full border border-gray-200 dark:border-neutral-700 h-10 w-10 mr-2" style={{ backgroundColor: '#fff' }} onClick={() => changeBackgroundColor('#fff')}></div>
                                <div className="cursor-pointer rounded-full border border-gray-200 dark:border-neutral-700 h-10 w-10 mr-2" style={{ backgroundColor: '#9170e0' }} onClick={() => changeBackgroundColor('#9170e0')}></div>
                                <div className="cursor-pointer rounded-full border border-gray-200 dark:border-neutral-700 h-10 w-10 mr-2" style={{ backgroundColor: '#e28c5a' }} onClick={() => changeBackgroundColor('#e28c5a')}></div>
                                {/* Color picker */}
                                <input
                                    type="color"
                                    className="bg-white cursor-pointer rounded-full h-10 w-10 border border-gray-200 block dark:bg-neutral-900 dark:border-neutral-700"
                                    id="hs-color-input"
                                    onChange={(e) => changeBackgroundColor(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 flex h-full w-full justify-center max-h-[500px] rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                                <div className="relative flex justify-center w-fit">
                                    <SparkleOverlay isVisible={loading} />
                                    {loading ? (
                                        <img src={URL.createObjectURL(image)} alt="Original Image" className="checkered-bg brightness-[0.7] dark:brightness-[0.3]" />
                                    ) : (
                                        isSelectedOriginal ? (
                                            <img src={URL.createObjectURL(image)} alt="Original Image" className="checkered-bg" />
                                        ) : (
                                            <img
                                                src={outputImage ? outputImage : URL.createObjectURL(image)}
                                                alt="Transparent PNG"
                                                className={transparentBg ? "checkered-bg" : ""}
                                                style={imageBg ? { backgroundColor: imageBg } : {}}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className="cursor-pointer flex size-fit items-center justify-center rounded-md px-4 md:px-6 py-2 md:py-3 bg-blue-400 text-white" onClick={downloadImage}>
                                    <div className="mr-2 text-base md:text-lg font-semibold">Download</div> <DownloadIcon size={22} />
                                </button>
                            </div>
                        </div>
                    </div >
                </div>
            </div >)}
            <div className="text-center mt-4">
                <p>
                    <span className="font-bold">No image?</span> Try one of ours!
                </p>
                <div className="mt-1 flex justify-center gap-2 sm:gap-3 md:gap-4">
                    {["sample1.jpg", "sample2.jpg", "sample3.jpg", "sample4.jpg"].map((name, index) => (
                        <div
                            key={index}
                            className="w-[40px] sm:w-[50px] md:w-[60px] h-[40px] sm:h-[50px] md:h-[60px] overflow-hidden rounded-lg border border-input cursor-pointer"
                            onClick={() => handleSampleClick(`/samples/${name}`)}
                        >
                            <img
                                src={`/samples/${name}`}
                                alt={`Sample ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}