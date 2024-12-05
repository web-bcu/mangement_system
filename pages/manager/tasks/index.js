import { useEffect } from "react"
import { useUserContext } from "../../../context/UserContext"
import Layout from "../../../components/Layout";
import { Eye, CircleX  } from "lucide-react";
import { data } from "./data_demo";
export default function EmployeeTasksManagement() {
    // const {user} = useUserContext();

    // if (user.role !== "manager") {
    //     return (
    //         <Layout>
    //             <div className="flex justify-center items-center text-3xl">You are not allowed to access this page</div>
    //         </Layout>
    //     )
    // }
    return (
        <Layout>
            <div className="p-6 w-full bg-white shadow-md rounded-md h-full">
                <div className="flex justify-center items-center text-3xl">Manage your employee task here</div>
                <Table/>
            </div>
        </Layout>
    )
    
}

const Table = ()=> {
  

    return (
  <div className="overflow-x-auto mt-8">
    <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Task ID</th>
          <th className="border px-4 py-2">Task Name</th>
          <th className="border px-4 py-2">Employee</th>
          <th className="border px-4 py-2">Deadline</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{row.TaskID}</td>
            <td className="border px-4 py-2">{row.TaskName}</td>
            <td className="border px-4 py-2">{row.Employee}</td>
            <td className="border px-4 py-2">{row.Deadline}</td>
            <td className="border px-4 py-2">
                {row.Status === "Done" ? (
                <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(148,239,105)] py-1 px-4 shadow-md">
                    Done
                </div>
                ) : row.Status === "In Progress" ? (
                <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(232,239,105)] py-1 px-4 shadow-md">
                    In Progress
                </div>
                ) : (
                <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(239,105,105)] py-1 px-4 shadow-md">
                    Due
                </div>
                )}
            </td>
            <td className="border">
                {row.Status === "Done" ? (
                <div className=" flex items-center justify-center rounded-full gap-7">
                    <button className=""><Eye className="w-8 h-8" /></button>
                    <button><CircleX className="text-[#de0d0d] w-8 h-8"/></button>
                </div>
                ) : (
                    <div></div>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-600">1-10 of 76 Items</span>
      <div className="flex space-x-1">
        <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">1</button>
        <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300">2</button>
        <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300">3</button>
        <span>...</span>
        <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300">10</button>
      </div>
    </div>
  </div>
  
    );
  }