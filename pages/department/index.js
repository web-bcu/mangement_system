import React, { useState } from 'react'

import Layout from "../../components/Layout"
import Head from "next/head";
import {Button, Modal, Form, Input, DatePicker, Select} from 'antd'
import { useRouter } from 'next/router';
import { House , Search, X} from 'lucide-react';
export default function Department() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
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
                <span className="text-l font-semibold">Department</span>
            </div>
            <hr></hr>
            <h1 className="text-2xl font-semibold mb-4 mt-4">Department Management</h1>
            <CreateModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            <SearchBar />
            <Table showModal={showModal}/>
        </div>
    </Layout>

  </div>
  )
}
const SearchBar = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
        <input
          type="text"
          placeholder="Search by Department Code/Name"
          className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <select className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500">
          <option>Select year</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center space-x-2 mb-2 md:mb-0">
            <Search size={15} />
            <span className="ml-2">Search</span>
          </button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition flex items-center space-x-2">
            <X size={15} />
            <span className="ml-2">Reset</span>
          </button>
        </div>
      </div>
    );
  }
  
  const Table = ({showModal})=> {
    const data = [
        {
          id: "D001",
          department_name: "Human Resources",
          head_department: "John Doe",
          description: "Handles recruitment and employee welfare.",
          create_at: "2024-01-15"
        },
        {
          id: "D002",
          department_name: "Engineering",
          head_department: "Jane Smith",
          description: "Responsible for product development and maintenance.",
          create_at: "2023-05-22"
        },
        {
          id: "D003",
          department_name: "Marketing",
          head_department: "Mike Johnson",
          description: "Handles all marketing and advertising efforts.",
          create_at: "2024-03-11"
        }
      ];
  
    return (
      <div className="overflow-x-auto">
        <Button 
            size="large"
            className="mb-2"
            onClick={showModal}>
            Create Department
        </Button>
        <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Department Code</th>
              <th className="border px-4 py-2">Department Name</th>
              <th className="border px-4 py-2">Head of Department</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Create At</th>  
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{row.id}</td>
                <td className="border px-4 py-2">{row.department_name}</td>
                <td className="border px-4 py-2">{row.head_department}</td>
                <td className="border px-4 py-2">{row.description}</td>
                <td className="border px-4 py-2">{row.create_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">1-10 của 76 Mục</span>
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
  
  const CreateModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [form] = Form.useForm();
    const employeeOptions = [
      { label: "John Doe", value: "john_doe" },
      { label: "Jane Smith", value: "jane_smith" },
      { label: "Sam Wilson", value: "sam_wilson" },
    ];
    const modal_footer=[
      <Button size="large" key="cancel" onClick={handleCancel}
        className="bg-[rgb(239,105,105)] text-white no-transition">
        Cancel
      </Button>,
      <Button size="large"
        className="bg-[rgb(115,222,65)] text-white no-transition"
        key="submit"
        onClick={() => {
          form.validateFields()
            .then(values => {
              handleOk(values);
              form.resetFields();
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        Create
      </Button>,
    ]
  
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
          <Form.Item name="taskName" label="Department Name" rules={[{ required: true, message: 'Please input the task name!' }]}>
            <Input size="large"/>
          </Form.Item>
          <Form.Item
            name="Employee"
            label="Head Of Department"
            rules={[{ required: true, message: 'Please select the assignee!' }]}
          >
            <Select placeholder="Select a head of department" size="large">
              {employeeOptions.map((employee) => (
                <Select.Option key={employee.value} value={employee.value}>
                  {employee.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="Description" label="Description">
            <Input.TextArea size="large"/>
          </Form.Item>
        </Form>
      </Modal>
    )
  }