"use client";

import Image from "next/image";
import React from "react";
import { BiMenu } from "react-icons/bi";
import UserImg from "../../../public/images/user.jpg";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface ModalProps {
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpnRentModal: React.Dispatch<React.SetStateAction<boolean>>;
  openRegisterModal: boolean;
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<ModalProps> = ({
  openRegisterModal,
  setOpenRegisterModal,
  setOpenLoginModal,
  currentUser,
  setOpnRentModal,
}) => {
  //User menu items
  const MenuBar = () => {
    const router = useRouter();
    return (
      <Menu>
        <MenuHandler>
          <div className="flex flex-row items-center gap-2 p-2 border rounded-full cursor-pointer shadow-sm hover:shadow-md transition">
            <BiMenu size="30" />
            <Image
              className="h-6 w-6 object-cover rounded-full"
              width={"20"}
              height={"20"}
              src={currentUser?.image ? currentUser?.image : UserImg}
              alt="user-img"
            />
          </div>
        </MenuHandler>
        <MenuList className="!flex !flex-col !shadow-md !p-0 !min-w-[150px] !max-w-[210px] !bg-white focus:!outline-none !font-semibold !rounded-md !z-20">
          {currentUser ? (
            <>
              <MenuItem
                onClick={() => {
                  router.push("/trips");
                }}
                className="!p-2 hover:!bg-gray-100 focus:!outline-none"
              >
                My trips
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/favourites");
                }}
                className="!p-2 hover:!bg-gray-100 focus:!outline-none"
              >
                My favourites
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/properties");
                }}
                className="!p-2 hover:!bg-gray-100 focus:!outline-none"
              >
                My properties
              </MenuItem>
              <MenuItem
                onClick={_rentModalHandler}
                className="!border-b !p-2 hover:!bg-gray-100 focus:!outline-none"
              >
                Airbnb my home
              </MenuItem>
              <MenuItem
                onClick={() => signOut()}
                className="!p-2 hover:!bg-gray-100 focus:!outline-none"
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => setOpenLoginModal(true)}
                className="!border-b !p-2 hover:!bg-gray-100 focus:!outline-none"
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={() => setOpenRegisterModal(true)}
                className="!p-2 hover:!bg-gray-100 focus:!outline-none"
              >
                Signin
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    );
  };

  const _rentModalHandler = () => {
    if (currentUser) {
      setOpnRentModal(true);
    } else {
      setOpenLoginModal(true);
    }
  };

  return (
    <div className="flex flex-row items-center gap-5">
      <div
        onClick={_rentModalHandler}
        className="text-sm p-3 rounded-full font-semibold cursor-pointer hover:bg-gray-100 hidden lg:flex"
      >
        <p>Airbnb your home</p>
      </div>
      <MenuBar />
    </div>
  );
};

export default UserMenu;
