import React from "react";
import "./Popup.css";
import { useState } from "react";
import { list } from "postcss";
import { useEffect } from "react";


interface EmoteData {
    url: string;
    type: string;
    base64: Boolean | null;
    name: string
  }
interface PopupProps {
    isOpen: boolean;
    toggleModal: () => void;
    onChange: (emoteName: string, emoteId?: string, deleteEmote?: boolean) => void;
    emoteList: { [key: string]: EmoteData };
    mode: "add" | "edit";
    selectedEmoteId?: string;
    preset: string;
}

export default function Modal({ isOpen, toggleModal, onChange, emoteList, mode, selectedEmoteId, preset }: PopupProps) {
    const [emoteName, setEmoteName] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        if (mode === "edit" && selectedEmoteId) {
            setEmoteName(selectedEmoteId);
        } else {
            setEmoteName(preset.length > 0 ? preset : "");
        }
    }, [toggleModal]);


    const handleCloseClick = () => {
        setError("")
        console.log(emoteList)
        toggleModal();
    };

    const handleDelete = () => {
        onChange(emoteName, undefined, true);
    }

    const handleSave = () => {
        if (!emoteName.trim()) {
            setError("Emote Name is Empty!");
            return;
        } else if (mode === "add" && emoteName in emoteList) {
            setError("Enter a Unique Name!");
            return;
        } else if (mode === "edit" && emoteName in emoteList) {
            setError("Enter a Unique Name!");
            return;
        }

        setError(""); // Clear any previous error
        if (mode === "edit" && selectedEmoteId) {
            // Update existing emote - assuming onAdd can handle updates as well
            onChange(emoteName, selectedEmoteId);
        } else {
            // Add new emote - no emoteData or emoteId needed
            onChange(emoteName);
        }

        toggleModal(); // Close modal after add or edit
    };
    if (!isOpen) return null;
    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div onClick={handleCloseClick} className="overlay "></div>
                    <div className="modal-content">
                        {error.length > 0 && (<div className="flex justify-content flex-start" >

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                            <h1 className="mx-2 text-red-500 mb-2 text-sm font-bold tracking-tight">{error}</h1>
                        </div>
                        )}
                        <input
                            placeholder="Enter Emote Name"
                            type="text"
                            value={emoteName}
                            onChange={(e) => setEmoteName(e.target.value)}
                            className="block w-full p- text-gray-900 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                        />

                        <div className="grid grid-flow-col-dense justify-items-center items-center">
                            <button onClick={handleSave} className="my-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-950 rounded-lg hover:bg-violet-900 ">
                                <span className="hidden sm:inline">Confirm Emote Name</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-1">
                                    <path strokeLinecap="round" className="w-6 h-6" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                </svg>

                            </button>
                        
                        {mode === "edit" && <div>
                            <button onClick={handleDelete} className="my-2 mx-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-950 rounded-lg hover:bg-red-900">
                                <span className="hidden sm:inline">Delete Emote</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-1">
                                    <path strokeLinecap="round" className="w-6 h-6" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>}



                        <div className="inline-flex flex items-center ">
                            <button
                                onClick={handleCloseClick}
                                className="text-black "
                                style={{ transition: 'opacity 0.2s' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:scale-125 transition duration-300 ease-in-out ">
                                    <path className="w-6 h-6" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" />
                                </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
