import React, { Fragment, useState, useEffect } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
  HiOutlineUserCircle,
  HiOutlineChatAlt2,
  HiOutlineMenu,
} from "react-icons/hi";
import { Popover, Transition, Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../Firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
  const [userProfileImage, setUserProfileImage] = useState("");
  const dummyMessages = [
    { text: "Hello!", isUser: false },
    { text: "How are you?", isUser: false },
    { text: "I'm good, thanks!", isUser: true },
    { text: "What about you?", isUser: true },
    { text: "I'm doing great!I'm doing great!", isUser: false },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data and extract profile image URL
    const fetchUserProfileImage = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userProfileData = docSnap.data();
          setUserProfileImage(userProfileData.profileImage);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfileImage();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b-2  ">
      <div className="relative"></div>
      <div className="flex items-center gap-2 mr-3">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none inline-flex items-center">
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 p-4 mt-2 w-80 origin-top-right rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="">
                    <Fragment>
                      <strong className="text-gray-700 font-medium">
                        Messages
                      </strong>
                      <hr className="my-2 mb-2  " />
                      {dummyMessages.map((message, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3  mt-3 "
                        >
                          {message.isUser ? (
                            <HiOutlineUserCircle fontSize={24} />
                          ) : (
                            <HiOutlineChatAlt2 fontSize={24} />
                          )}
                          <p>{message.text}</p>
                        </div>
                      ))}
                    </Fragment>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none inline-flex items-center">
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 p-4 mt-2 w-80 origin-top-right rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="">
                    <Fragment>
                      <strong className="text-gray-700 font-medium">
                        Notifications
                      </strong>
                      <hr className="my-2 mb-2  " />
                      <div className="text-gray-600">No Notifications yet</div>
                    </Fragment>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="ml-2 inline-flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-nutral-200">
              <span className="sr-only">Open user menu</span>
              <div
                // Use user profile image URL as background image
                style={{ backgroundImage: `url(${userProfileImage})` }}
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
              >
                <span className="sr-only">Abdul Rafay</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/profile")}
                    className=" cursor-pointer focus:bg-gray-100 hover:bg-gray-100 px-4 py-2 text-md flex items-center gap-3"
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className=" cursor-pointer focus:bg-gray-100 hover:bg-gray-100 px-4 py-2 text-md flex items-center gap-3"
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link onClick={handleLogout}>
                    <div className=" cursor-pointer focus:bg-gray-100 hover:bg-gray-100 px-4 py-2 text-md flex items-center gap-3">
                      Logout
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
