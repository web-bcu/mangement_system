import { House , Search, X , Eye, CircleCheck, CircleX } from "lucide-react";
import Layout from "../../../components/Layout"
import Head from "next/head";
import { useState } from "react";
import { data } from "./data_demo";
export default function Transaction() {
  return (
    <div className="">
      <Head>
        <title>CSBU management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pro.ico" />
      </Head>
      <Layout>
        <div className="p-6 w-full bg-white shadow-md rounded-md">
          <div className="flex items-center text-gray-600 space-x-2 mb-4">
            <span className="text-gray-500 group" onClick={()=> backToHome()}>
              <House className="text-gray-500 group-hover:text-black transition-colors duration-300" size={20}/>
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-l font-semibold">Transaction</span>
          </div>
          <hr></hr>
          <h1 className="text-2xl font-semibold mb-4 mt-4">Transaction Management</h1>
          <SearchBar />
          <Table />

        </div>
      </Layout>
    </div>
  );
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  return (
    <div>
      <div className="flex flex-wrap sm:flex-nowrap sm:space-x-4 mb-4 p-4">
        <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            placeholder="Search by BA Ref, Description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
          <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">Date range</label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
            />
            <span className="text-xl">→</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
          <select
            id="budget"
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
          >
            <option>Choose</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
          >
            <option>Choose</option>
            <option>Pending</option>
            <option>Paid</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-2 ml-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-2 sm:mb-0">
          <span className="font-semibold">Search</span>
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition mb-2 sm:mb-0">
          <span className="font-semibold">Reset</span>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-2 sm:mb-0">
          <span className="font-semibold">Add</span>
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
          <span className="font-semibold">Close multiple BAs</span>
        </button>
      </div>
    </div>
  );
};

const Table = ()=> {
  

  return (
<div className="overflow-x-auto mt-8">
  <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-4 py-2">BA Number</th>
        <th className="border px-4 py-2">Creation Date</th>
        <th className="border px-4 py-2">Created By</th>
        <th className="border px-4 py-2">Approved By</th>
        <th className="border px-4 py-2">Control Department</th>
        <th className="border px-4 py-2">Total Amount</th>
        <th className="border px-4 py-2">Remaining Amount</th>
        <th className="border px-4 py-2">Currency Type</th>
        <th className="border px-4 py-2">Status</th>
        <th className="border px-4 py-2">Description</th>
        <th className="border px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="border px-4 py-2">{row.poNumber}</td>
          <td className="border px-4 py-2">{row.creationDate}</td>
          <td className="border px-4 py-2">{row.createdBy}</td>
          <td className="border px-4 py-2">{row.approvedBy}</td>
          <td className="border px-4 py-2">{row.controlDepartment}</td>
          <td className="border px-4 py-2">{row.totalAmount}</td>
          <td className="border px-4 py-2">{row.remainingAmount}</td>
          <td className="border px-4 py-2">{row.currencyType}</td>
          <td className="border px-4 py-2">
          {row.status === true ? (
            <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(148,239,105)] py-1 px-4 shadow-md">
              Paid
            </div>
          ) : (
            <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(232,239,105)] py-1 px-4 shadow-md">
              Pending
            </div>
          )}
          </td>
          <td className="border px-4 py-2">{row.description}</td>
          <td className="border px-4 py-2">
            {row.status === true ? (
              <div className=" flex items-center justify-center rounded-full">
                <button className=""><Eye/></button>
              </div>
            ) : (
              <div className=" flex items-center justify-center rounded-full gap-3">
                <button><CircleCheck className="text-[#33cc45]"/></button>
                <button><CircleX className="text-[#de0d0d]"/></button>
              </div>
              
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
