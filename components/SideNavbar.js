// import React from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Disclosure } from "@headlessui/react";
// import {
//   MdOutlineSpaceDashboard,
//   MdOutlineAnalytics,
//   MdOutlineIntegrationInstructions,
//   MdOutlineMoreHoriz,
//   MdOutlineSettings,
//   MdOutlineLogout,
// } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
// import { FaRegComments } from "react-icons/fa";
// import { BiMessageSquareDots } from "react-icons/bi";
// import Link from "next/link";

// function SideNavbar() {
//   return (
//     <div>
//       {/* z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0*/}
//         <div className="p-6 w-1/2 h-screen overflow-auto bg-white md:w-60  peer:transition ease-out delay-150 duration-200">
//           <div className="flex flex-col justify-start item-center md:w-60 w-1/2">
            
//             {/* <div className=" my-4 border-b border-gray-100 pb-4"> */}
//             {/* pl-5 */}
//               <div className="flex mb-2 justify-start items-center gap-4 p-2 hover:bg-gray-900  rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white text-center" />
//                 <Link href="/dashboard" className=" ">
//                   <span className="md:block w-0 hidden text-base text-gray-800 group-hover:text-white font-semibold">Dashboard</span>
//                 </Link>
//               </div>
//               <div className="flex mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 {/* <CgProfile className="text-2xl text-gray-600 group-hover:text-white " /> */}
//                 <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center text-gray-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                   <path stroke-linecap="round" stroke-linejoin="round" d="M4 17l8 5 8-5m-16-5l8 5 8-5M4 7l8-5 8 5-8 5-8-5z" />
//                 </svg>
//                 <Link href="/profile" className="text-base text-gray-800 group-hover:text-white font-semibold ">
//                   <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Quản lý ngân sách</span>
//                 </Link>
//               </div>
//               <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 {/* <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " /> */}
//                 <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                   <path stroke-linecap="round" stroke-linejoin="round" d="M4 17l8 5 8-5m-16-5l8 5 8-5M4 7l8-5 8 5-8 5-8-5z" />
//                 </svg>
//                 <Link href="/comments" className="text-base text-gray-800 group-hover:text-white font-semibold ">
//                   <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Quản lý chi tiết</span>
//                 </Link>
//               </div>
//               <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                   <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <Link href="/analytics" className="text-base text-gray-800 group-hover:text-white font-semibold ">
//                   <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Lịch sử hoạt động</span>
//                 </Link>
//               </div>
//               {/* <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
//                 <Link href="/messages" className="text-base text-gray-800 group-hover:text-white font-semibold ">
//                   <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Messages</span>
//                 </Link>
//               </div>
//               <div className="flex  mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
//                 <Link href="/integration" className="text-base text-gray-800 group-hover:text-white font-semibold ">
//                   <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Integration</span>
//                 </Link>
//               </div> */}
//             </div>
//             {/* setting  */}
//             {/* <div className=" my-4 border-b border-gray-100 pb-4"> */}
//               <div className="flex mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
//                 <Link href="/settings" className="text-base text-gray-800 group-hover:text-white font-semibold ">
//                   <span className="md:block hidden text-base text-gray-800 group-hover:text-white font-semibold">Cấu hình hệ thống</span>
//                 </Link>
//               </div>
//               {/* <div className="flex mb-2 justify-start items-center gap-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
//                 <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
//                 <Link href="/more" className="text-base text-gray-800 group-hover:text-white font-semibold ">
//                   More
//                 </Link>
//               </div>
//             </div> */}
//             {/* logout */}
//             <div className=" my-4">
//               <button className="flex mb-2 justify-start items-center gap-4 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto lg:w-40">
//                 <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                
//                 <span className=" text-base text-gray-800 group-hover:text-white font-semibold md:block hidden">Logout</span>
                
//               </button>
//             </div>
//           </div>
//         </div>
//     // </div>
//   );
// }

// export default SideNavbar;

import React from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

function SideNavbar() {
  return (
    <div className="h-screen bg-white shadow-lg md:w-60 w-2/7 overflow-auto">
      <h1 className="flex gap-4 justify-center item-center mt-4">
        <span className="text-2xl md:pl-4 pl-0"><MdOutlineSpaceDashboard /></span>
        <span className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full md:block hidden">Virtual Dashboard</span>
      </h1>
      <div className="flex flex-col justify-between">
        {/* Top Section: Navigation Links */}
        <div className="p-3">
          <div className="space-y-4">
            <NavItem
              href="/dashboard"
              icon={<MdOutlineSpaceDashboard />}
              label="Bảng báo cáo"
            />
            {/* <NavItem
              href="/profile"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 17l8 5 8-5m-16-5l8 5 8-5M4 7l8-5 8 5-8 5-8-5z"
                  />
                </svg>
              }
              label="Quản lý ngân sách"
            /> */}
            <div className="flex items-center gap-4 text-gray-600 hover:text-white hover:bg-gray-900 p-3 rounded-lg cursor-pointer transition duration-200">
              {/* <div className="text-2xl"> */}
                <CgProfile className="text-2xl"/>
              {/* </div> */}
              <span className="font-semibold hidden md:block">Quản lý nhân sự</span>
            </div>
            {/* <NavItem
              href="/comments"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 17l8 5 8-5m-16-5l8 5 8-5M4 7l8-5 8 5-8 5-8-5z"
                  />
                </svg>
              }
              label="Quản lý chi tiết"
            /> */}
            <div className="flex items-center gap-4 text-gray-600 hover:text-white hover:bg-gray-900 p-3 rounded-lg cursor-pointer transition duration-200">
              <div className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 17l8 5 8-5m-16-5l8 5 8-5M4 7l8-5 8 5-8 5-8-5z"
                  />
                </svg>
              </div>
              <span className="font-semibold hidden md:block">Quản lý ngân sách</span>
            </div>
            <NavItem
              href="/analytics"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              label="Lịch sử hoạt động"
            />
            {/* Settings */}
            <NavItem
              href="/settings"
              icon={<MdOutlineSettings />}
              label="Cấu hình hệ thống"
            />
          </div>
        </div>

        {/* Bottom Section: Logout */}
        <div className="p-3">
          <button className="w-full flex items-center gap-4 text-gray-600 hover:text-white hover:bg-gray-900 p-3 rounded-lg transition duration-200">
            <MdOutlineLogout className="text-2xl" />
            <span className="font-semibold hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-4 text-gray-600 hover:text-white hover:bg-gray-900 p-3 rounded-lg cursor-pointer transition duration-200">
        <div className="text-2xl">{icon}</div>
        <span className="font-semibold hidden md:block">{label}</span>
      </div>
    </Link>
  );
}

export default SideNavbar;
