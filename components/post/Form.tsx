"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import ShowPost from "./ShowPost";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import MyContext from "@/utils/context/createContext";
import Link from "next/link";
interface ImagePath {
  name: string;
}
export default function Form() {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState<any>("");
  const [showPostUrl, setShowPostUrl] = useState<any>("");
  const [showViewPostButton, setShowViewPostButton] = useState<boolean>(false);
  const { userLogId, setPostData, postData, user }: any = useContext(MyContext);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setImagePath(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setShowPostUrl(reader?.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const createPost = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCollectionRef = collection(db, "allPosts");
      // Create a reference to the Firebase Storage bucket
      const storageRef = ref(storage, "images/" + imagePath?.name);
      // Upload the image to Firebase Storage
      const imageSnapshot = await uploadBytes(storageRef, imagePath);
      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageSnapshot.ref);

      const currentDateTime = new Date();
      const res = await addDoc(newCollectionRef, {
        timestamp: currentDateTime,
        status: "public",
        imgage: imageUrl,
        userId: userLogId,
        description: description,
        userName: user.fullName,
        userImg: user.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      // Get the added document using getDoc
      const postDocSnap = await getDoc(res);
      // Access the data from the document snapshot
      const postData = postDocSnap.data();
      setPostData(postData);
      setLoading(false);
      playAudio();
      setShowViewPostButton(true);
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  };
  const playAudio = () => {
    const audioElement = new Audio("mixkit-alert-quick-chime-766.wav"); // replace with the path to your audio file
    audioElement.play();
  };
  return (
    <>
      <>
        <div className="max-w-lg mx-auto bg-[#16181c] rounded px-2">
          <h2 className="text-3xl mt-4 text-white">Post Descrition</h2>
          <form className="my-6 shadow-lg p-3 rounded" onSubmit={createPost}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-sky-500"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-sky-500"
                >
                  Photo
                </label>
                <div className="mt-2 flex justify-center items-center rounded-lg h-80 border border-dashed p-2">
                  {imagePath === "" ? (
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-sky-500 outline-none"
                        >
                          <span className="mr-3">Upload a file</span>
                          <input
                            id="file-upload"
                            name="image"
                            onChange={handleFileChange}
                            type="file"
                            required
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-white mt-2">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  ) : (
                    <img src={showPostUrl} className="w-full h-full" alt="" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-sky-500 px-6 py-2 text-sm tracking-wider font-medium text-white shadow-sm"
              >
                {loading ? "Loading..." : "Post"}
              </button>
            </div>
          </form>
        </div>
        {showViewPostButton && (
          <div
            id="toast-default"
            className="flex flex-col gap-y-4 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow absolute top-1/2 right-[2%]"
            role="alert"
          >
            <div className="flex items-center justify-between w-full">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                  />
                </svg>
                <span className="sr-only">Fire icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">Post Successfully</div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={() => setShowViewPostButton(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <Link
              href={`/viewpost/${postData?.userId}`}
              className="py-1 px-3 text-blue-500 bg-blue-100 w-fit rounded"
            >
              view post
            </Link>
          </div>
        )}
      </>
      {/* <ShowPost description={description} imagePath={imagePath} /> */}
    </>
  );
}
