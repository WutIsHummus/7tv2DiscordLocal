"use client";
import React, { useState } from "react";
import Image from "next/image";
import invalidImage from '@src/images/404.gif';
import unlistedImage from '@src/images/unlisted.gif';
import Popup from "../../components/Popup";
import postData from "@src/utils/helpers/postData";
import Head from "next/head";

interface EmoteData {
  url: string;
  type: string;
  base64: Boolean | null;
  name: string
}

export default function Emote() {
  const [searchQuery, setSearchQuery] = useState('');
  const [presetName, setPresetName] = useState('');
  const [errorImage, setErrorImage] = useState(invalidImage);
  const [emote, setEmote] = useState<EmoteData | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emoteList, setEmoteList] = useState<{ [key: string]: EmoteData }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmoteForEdit, setSelectedEmoteForEdit] = useState("");
  const [lastSuccessfulQuery, setLastSuccessfulQuery] = useState('');

  const handleAddEmote = (emoteName: string, emoteId?: string, deleteEmote?: boolean) => {
    console.log(deleteEmote)
    setPresetName('')
    const updatedEmoteList = { ...emoteList };

    if (deleteEmote) {
      if (emoteName in updatedEmoteList) {
        delete updatedEmoteList[emoteName];
      }
    } else {

      if (emoteId && emoteId in updatedEmoteList) {
        const emoteData = updatedEmoteList[emoteId];

        if (emoteId !== emoteName) {
          updatedEmoteList[emoteName] = emoteData;
          delete updatedEmoteList[emoteId];
        }
      } else if (emote) {
        emote.name = emoteName
        updatedEmoteList[emoteName] = emote;
      }
    }
    setIsModalOpen(false)
    setSelectedEmoteForEdit("")
    console.log(updatedEmoteList)
    setEmoteList(updatedEmoteList);
  };

  const handleAddToDiscord = async () => {
    for (const emoteI in emoteList) {
      if (emoteList[emoteI].base64 === null) {
        console.log(emoteI)
        const res = await postData(`/api/engagement/add-to-discord`, { emote: emoteList[emoteI], name: emoteI})
        /*
        setEmoteList(prevEmoteList => ({
          ...prevEmoteList,
          [emoteI]: res.emote,
        }));*/
      }
    }
    console.log(emoteList)
  }
  const addToList = () => {

    if (emote?.name) {
      setSelectedEmoteForEdit("");
      setPresetName(emote.name)
      toggleModal()
    }
  }

  const handleLoad = () => {
    setIsLoading(false);
  };
  const toggleModal = (name?: string) => {
    if (emote) {
      const emoteExists = Object.values(emoteList).some(emoteData => emoteData.url === emote.url);

      if (!emoteExists) {
        setIsModalOpen(!isModalOpen);
      } else {
        console.log("This emote already exists in the list.");
      }
      if (isModalOpen && selectedEmoteForEdit.length > 0) {
        setIsModalOpen(false);
      }
    }
  };
  const handleEditClick = (emoteId: string) => {
    setSelectedEmoteForEdit(emoteId);
    setIsModalOpen(true);
  };


  const handleSearch = async () => {
    if (!searchQuery) {
      console.log('No query provided');
      setErrorImage(invalidImage);
      setIsError(true);
      return;
    }
    else if (lastSuccessfulQuery == searchQuery) {
      return;
    }
    setIsLoading(true)
    setLastSuccessfulQuery(searchQuery)


    try {
      const response = await fetch(`https://7tv.io/v3/emotes/${encodeURIComponent(searchQuery)}`);

      if (!response.ok) throw new Error('Emote not found or network response was not ok');
      const data = await response.json();
      console.log(data);
      if (data.id == "000000000000000000000000") {
        setErrorImage(invalidImage);
        throw new Error('Invalid emote ID');
      }
      const emoteUrl = data.animated ? data.host.url + '/4x.gif' : data.host.url + '/4x.png';
      setPresetName(data.name)
      console.log(emoteUrl)
      setEmote({ url: "https:" + emoteUrl, type: data.animated ? 'gif' : 'png', base64: null, name: data.name });
      setIsError(false);

    } catch (error: any) {
      console.error("Fetch error:", error.message);
      setIsError(true);
      setEmote(null);
    }
  };


  return (
    <div>

      <main className="flex min-h-screen flex-col items-start justify-left p-5">
        <div className="max-w-md mx-auto bg-white sm:w-2/3 md:w-1/2 lg:w-1/3 h-1/3 border bg-violet-950 rounded-t-lg shadow overflow-hidden drop-shadow-md  ">
          <div className="flex justify-center items-center w-full h-full">

            {isLoading && !isError && emote && <div role="status">
              <svg aria-hidden="true" className="inline w-8 mt-10 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>}
            {isError ? (
              <Image src={errorImage} onLoad={handleLoad} alt="Error" className="mt-4 rounded-md z-0" />
            ) : (
              emote && <img src={emote.url} onLoad={handleLoad} alt="Emote" className="mt-4 rounded-md" />
            )}
          </div>

          <div className="p-5">

            <input
              type="text"
              value={searchQuery}
              placeholder="7tv Emote ID"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-900 focus:border-purple-900 focus:z-10 sm:text-sm"
            />
            <div className="flex flex-col items-center justify-center">
              <button onClick={handleSearch} className="my-2 mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-950 rounded-lg hover:bg-violet-900 ">
                <span className="hidden sm:inline">Find Emote</span>
                <svg className="mx-2 w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </button>
              {(!isError && emote?.url != "" && emote) && (
                <button onClick={addToList} className="my-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-950 rounded-lg hover:bg-violet-900">
                  <span className="hidden sm:inline">Add To List</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
              )}

            </div>
          </div>

        </div>
        <div className="max-w-md mx-auto bg-white w-1/3 h-1/3 border bg-violet-950 rounded-b-lg shadow overflow-hidden drop-shadow-md  p-5 pb-10 sm:w-2/3 md:w-1/2 lg:w-1/3">
          <h5 className="mb-2 text-2xl tracking-tight text-black">My Emotes</h5>
          <div className="flex flex-wrap justify-start items-center gap-4 relative lg:w-[430px] md:w-[250px] sm:w-[200px]">
            {Object.entries(emoteList).map(([emoteId, emote], index) => (
              <div key={emoteId} className="group relative flex items-center justify-center flex-col image-size z-0">
                <img
                  src={emote.url}
                  alt={`Emote ${index}`}
                  className="object-cover group-hover:scale-125 transition duration-300 ease-in-out rounded-md z-0"
                />
                <div>
                  <button
                    onClick={() => handleEditClick(emoteId)}
                    className="absolute  left-9 -top-3 flex items-center justify-center w-3/5 h-3/5 group-hover:scale-125 group-hover:visible invisible transition duration-300 ease-in-out"
                    style={{ transition: 'opacity 0.2s' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="violet-950" className="w-6 h-6 shadow bg-violet-50 bg-opacity-50">
                      <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                    </svg>
                  </button>
                </div>
                <div className=" relative max-w-5xl mx-auto px-2 grid grid-cols-3">
                </div>
              </div>

            ))}
          </div>
          <div className="grid items-center justify-center">
            {Object.keys(emoteList).length > 0 && <button onClick={handleAddToDiscord} className="my-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-950 rounded-lg hover:bg-violet-900 ">
              <span className="hidden sm:inline">Upload To Discord</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
</svg>

            </button>}
          </div>
        </div>
        <Popup
          key={selectedEmoteForEdit || 'add-mode'}
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          onChange={handleAddEmote}
          emoteList={emoteList}
          mode={selectedEmoteForEdit ? "edit" : "add"}
          selectedEmoteId={selectedEmoteForEdit}
          preset={presetName}
        />
      </main>
    </div>
  );
}
