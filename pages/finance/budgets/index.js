import Layout from "../../../components/Layout"
import Head from "next/head";
import { useRouter } from 'next/router';
import { House , Search, X} from 'lucide-react';
import { useState } from "react";

import {Button, Modal, Form, Input, DatePicker, Select, InputNumber, Pagination} from 'antd'
import { getFetcher ,postFetcher} from "../../../fetcher";
import useSWR from "swr";

export default function Budget() {
  const router = useRouter();
  const backToHome = ()=>{
    router.push(`/`)
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSearch = ({ searchQuery, year }) => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.append('searchQuery', searchQuery);
    if (year) searchParams.append('year', year);
    setCurrentPage(1);  
    setSearchParams(searchParams.toString())
  };
  
  const { data, error, isLoading } = useSWR(
    `/api/budget?page=${currentPage}&${searchParams}`,
    getFetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: true,
    }
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="">
      <Head>
        <title>CSBU management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pro.ico" />
      </Head>
      <Layout>
        <div className="p-6 w-full bg-white shadow-md rounded-md h-full">
          <div className="flex items-center text-gray-600 space-x-2 mb-4">
            <span className="text-gray-500 group" onClick={()=> backToHome()}>
              <House className="text-gray-500 group-hover:text-black transition-colors duration-300" size={20}/>
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-l font-semibold">Budget</span>
          </div>
          <hr></hr>
          <h1 className="text-2xl font-semibold mb-4 mt-4">Budget Management</h1>
          <SearchBar showModal={showModal} onSearch={onSearch} setSearchParams={setSearchParams} setCurrentPage={setCurrentPage}/>
          <Table currentPage={data.currentPage} totalPages={data.totalPages} data={data.data} handlePageChange={handlePageChange} />
          <CreateModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
        </div>
      </Layout>

    </div>
  );
}

const CreateModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const modal_footer=[
    <Button size="large" key="cancel" onClick={handleCancel}
      className="bg-[rgb(239,105,105)] text-white no-transition">
      Cancel
    </Button>,
    <Button size="large"
      className="bg-[rgb(115,222,65)] text-white no-transition"
      key="submit"
      onClick={() => handleCreate()}
    >
      Create
    </Button>,
  ]
  const [err, setErr] = useState('')
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      
      const newData = await postFetcher('/api/budget', {
        id: values.budgetId,
        budgetAmount: values.initialBudget,
        currency: values.Currency,
        periodStart: values.StartDate,
        periodEnd: values.EndDate,
        description: values.Description
      });
      console.log(newData);
      
      window.location.reload();

      
      handleOk(values); 
      form.resetFields();
    } catch (error) {
      setErr(error)
      console.error('Failed to create Budget:', error);
    }
  };



  return (
    <Modal
      title="Create New Task"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={modal_footer}
      width={850} 
    >
      <Form form={form} layout="vertical">
        <Form.Item name="budgetId" label="Budget Id" rules={[{ required: true, message: 'Please input the budget Id!' }]}>
          <Input size="large"/>
        </Form.Item>
        <Form.Item
          name="initialBudget"
          label="Initial Budget"
          rules={[{ required: true, message: 'Please input the initial budget amount!' }]}
        >
        <InputNumber
          min={0}
          step={1000}
          placeholder="Enter initial budget"
          style={{ width: '100%' }}
          size="large"

        />
        </Form.Item>
        <Form.Item name="Currency" label="Currency" rules={[{ required: true, message: 'Please input the Currency!' }]}>
          <Input size="large"/>
        </Form.Item>
        
        <Form.Item name="StartDate" label="Start Date" rules={[{ required: true, message: 'Please select the Start Date!' }]}>
          <DatePicker style={{ width: '100%' }} size="large"></DatePicker>
        </Form.Item>
        <Form.Item name="EndDate" label="End Date" rules={[{ required: true, message: 'Please select the end date!' }]}>
          <DatePicker style={{ width: '100%' }} size="large"></DatePicker>
        </Form.Item>
        <Form.Item name="Description" label="Description">
            <Input.TextArea size="large"/>
        </Form.Item>
      </Form>
      <div>
        {err && err.errorFields && err.errorFields[0] && err.errorFields[0].errors && err.errorFields[0].errors[0] && (
          <div style={{ color: 'red' }}>
            {err.errorFields[0].errors[0]}
          </div>
        )}
      </div>
    </Modal>
  )
}
const SearchBar = ({showModal, onSearch, setSearchParams, setCurrentPage}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [year, setYear] = useState('');
  const handleReset = () => {
    setSearchQuery('');
    setYear('');
    setSearchParams('');  
    setCurrentPage(1); 
  };
  const handleSearch = () => {
    onSearch({
      searchQuery,
      year
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
      <input
        type="text"
        placeholder="Search by Budget Code/Description"
        className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select 
        onChange={(e) => setYear(e.target.value)}
        className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500">
        <option>Select year</option>
        <option>2025</option>
        <option>2024</option>
      </select>
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
        <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center space-x-2 mb-2 md:mb-0">
          <Search size={15} />
          <span className="ml-2">Search</span>
        </button>
        <button onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition flex items-center space-x-2">
          <X size={15} />
          <span className="ml-2">Reset</span>
        </button>
        <button onClick={showModal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-2 sm:mb-0">
          <span className="font-semibold">Add</span>
        </button>
      </div>
    </div>
  );
}

const Table = ( {currentPage, totalPages, data, handlePageChange})=> {
  

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Budget Code</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Approved Amount</th>
            <th className="border px-4 py-2">Remaining Amount</th>
            <th className="border px-4 py-2">Currency</th>
            <th className="border px-4 py-2">Create Date</th>

          </tr>
        </thead>
        <tbody>
          {data && data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">{row.description}</td>
              <td className="border px-4 py-2">{row.periodStart}</td>
              <td className="border px-4 py-2">{row.periodEnd}</td>
              <td className="border px-4 py-2">{row.approvedAmount}</td>
              <td className="border px-4 py-2">{row.remainingAmount}</td>
              <td className="border px-4 py-2">{row.currency}</td>
              <td className="border px-4 py-2">{row.createdAt}</td>

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
