import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import Link from "next/link";

function SideNavbar() {
  return (
    <div>
      {/* z-20 fixed top-0 -left-96 lg:left-0 lg:w-60*/}
        <div className="p-6 w-1/2 h-screen overflow-auto bg-white md:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Virtual Dashboard
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
            {/* pl-5 */}
              <div className="flex mb-2 justify-start items-center gap-4 p-2 hover:bg-gray-900  rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
                <Link href="/dashboard" className=" ">
                  <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Dashboard</span>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href="/profile" className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Profile</span>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href="/comments" className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Comments</span>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href="/analytics" className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Analytics</span>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href="/messages" className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Messages</span>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href="/integration" className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Integration</span>
                </Link>
              </div>
            </div>
            {/* setting  */}
            {/* <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href="/settings" className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Settings
                </Link>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href="/more" className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  More
                </Link>
              </div>
            </div> */}
            {/* logout */}
            <div className=" my-4">
              <button className="flex mb-2 justify-start items-center gap-4 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto lg:w-40">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                
                <span className=" text-base text-gray-800 group-hover:text-white font-semibold md:block hidden">Logout</span>
                
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default SideNavbar;
