import { useUserContext } from "../../../context/UserContext";
import Layout from "../../../components/Layout";
import { CircleX, CircleCheck } from "lucide-react";
import { deleteFetcher, getFetcher, updateFetcher } from "../../../fetcher";
import useSWR from "swr";

import {TASK_API_URL } from "../../../env";
import { useState } from "react";
import { Pagination } from "antd";

export default function EmployeeTasks() {
    const {user} = useUserContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState("");
    const { data, error, isLoading } = useSWR(
      `${TASK_API_URL}/${user.id}?page=${currentPage}&${searchParams}`,
      getFetcher,
      {
        refreshInterval: 0,
        revalidateOnFocus: true,
      }
    );
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (user.role !== "user") {
        return (
        <Layout>
            <div className="flex justify-center items-center text-3xl">You are not allowed to access this page</div>
        </Layout>
        )
    }
    return (
        <Layout>
            <div className="p-6 w-full bg-white shadow-md rounded-md h-full">
                <div className="flex justify-center items-center text-3xl">Your tasks are here</div>
                <Table data={data.data} currentPage={data.currentPage} totalPages={data.totalPages} handlePageChange={handlePageChange}/>
            </div>
        </Layout>
    )
}
const Table = ({data,currentPage, totalPages, handlePageChange})=> {
    const handleUpdate = async (id) => {
      try {
        
        const newData = await updateFetcher(`${TASK_API_URL}/${id}/status`);
        
        window.location.reload();
  
        
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    };
      const handleDelete = async (id) => {
        try {
          const url = `${TASK_API_URL}/${id}`; 
          
          await deleteFetcher(url);
          window.location.reload();
    
        } catch (error) {
          console.error("Error deleting task:", error);
          alert("Failed to delete task.");
        }
      };
    return (
  <div className="overflow-x-auto mt-8">
    <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Task ID</th>
          <th className="border px-4 py-2">Task Name</th>
          <th className="border px-4 py-2">Assignee</th>
          <th className="border px-4 py-2">Deadline</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{row.id}</td>
            <td className="border px-4 py-2">{row.taskName}</td>
            <td className="border px-4 py-2">{row.managerId}</td>
            <td className="border px-4 py-2">{row.deadline}</td>
            <td className="border px-4 py-2">
                {row.status === true ? (
                <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(148,239,105)] py-1 px-4 shadow-md">
                    Done
                </div>
                ) : row.status === false && new Date() <= new Date(row.deadline)  ? (
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
                {row.status === false && new Date() <= new Date(row.deadline) ? (
                <div className=" flex items-center justify-center rounded-full gap-7">
                    <button onClick={()=>handleUpdate(row.id)}><CircleCheck className="text-[#33cc45] w-8 h-8"/></button>
                </div>
                ) : row.status === false && new Date() > new Date(row.deadline) ?(
                <div className=" flex items-center justify-center rounded-full gap-7">
                    <button onClick={()=>handleDelete(row.id)}> <CircleX className="text-[#de0d0d] w-8 h-8"/></button>
                </div>
                ):(
                    <div>

                    </div>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-end items-center mt-4">
    <Pagination
        current={currentPage}
        total={totalPages * 10} 
        onChange={handlePageChange}
        showSizeChanger={false} 
        pageSize={10}
        className="my-pagination" 
      />
    </div>
  </div>
  
    );
  }