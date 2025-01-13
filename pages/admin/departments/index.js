import { House , Search, X} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout';
import Head from "next/head";
import {Button, Modal, Form, Input, InputNumber,DatePicker, Select} from 'antd'
import { useUserContext } from '../../../context/UserContext';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

export default function Departments() {
    const {user} = useUserContext();
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

    if (user && user.role !== "ADMIN") {
        return (
            <Layout>
                <div className="flex justify-center items-center text-3xl">You are not allowed to access this page</div>
            </Layout>
        )
    }
    return (
        <div className="">
            <Head>
                <title>CSBU management</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/pro.ico" />
            </Head>
            <Layout>
            <div className="p-6 w-full bg-white shadow-md rounded-md h-full">
                {/* <div className="flex items-center text-gray-600 space-x-2 mb-4"> */}
                        {/* <span className="text-gray-500 group" onClick={()=> backToHome()}>
                        <House className="text-gray-500 group-hover:text-black transition-colors duration-300" size={20}/>
                        </span>
                        <span className="text-gray-400">/</span>
                        <span className="text-l font-semibold">Projects</span>
                    </div>
                    <hr></hr> */}
                    <h1 className="text-2xl font-semibold mb-4 mt-4">Departments Management</h1>
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
                placeholder="Search by Project Code/Name"
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
    const [departments, setDepartments] = useState(null);
    // const data = [
    //     {
    //         code: "DP001",
    //         name: "HR",
    //         managers: ["An", "Viet"]
    //     },
    //     {
    //         code: "DP002",
    //         name: "Developer",
    //         managers: ["An", "Viet"]
    //     },
    //     {
    //         code: "DP003",
    //         name: "Finance",
    //         managers: ["An", "Viet"]
    //     },
    //     {
    //         code: "P004",
    //         name: "Analysis",
    //         managers: ["An", "Viet"]
    //     },
    // ];
    const fetchDepartments = async() => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8080/api/v1/departments", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch departments");

            const departmentData = await response.json();
            setDepartments(departmentData);
        } catch(error) {
            console.error("Error occured:", error);
            toast.error("Something went wrong!!!");
        }
    }
    
    useEffect(() => {
        fetchDepartments();
    }, []);

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
                <th className="border px-4 py-2">Department ID</th>
                <th className="border px-4 py-2">Department Name</th>
                <th className="border px-4 py-2">Managers</th>
            </tr>
            </thead>
            <tbody>
            {departments && departments.map((department, index) => (
                <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{department.departmentId}</td>
                <td className="border px-4 py-2">{department.departmentName}</td>
                <td className="border px-4 py-2">managers</td>
                </tr>
            ))}
            </tbody>
        </table>
        {/* <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">1-10 của 76 Mục</span>
            <div className="flex space-x-1">
            <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">1</button>
            <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300">2</button>
            <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300">3</button>
            <span>...</span>
            <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300">10</button>
            </div>
        </div> */}
        </div>
    );
}

const CreateModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    // Function to save the department data
    const saveDepartment = async (values) => {
        setLoading(true);
        try {
            // Send the department data to the backend or API
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:8080/api/v1/departments", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
    
            const data = await response.json();
            if (response.ok) {
            // Successfully saved the department
                console.log("Department created successfully", data);
                handleOk(data);  // Pass the saved department data to parent
                form.resetFields();  // Reset the form fields
                toast.success("Department Created Successfully");
            } else {
                // Handle any errors from the server
                console.error("Error creating department:", data.message);
                // You can show a toast or notification for error
            }
        } catch (error) {
            console.error("Error during department creation:", error);
        } finally {
            setLoading(false);
            router.reload();
        }
    };
  
    const modal_footer = [
        <Button
            size="large"
            key="cancel"
            onClick={handleCancel}
            className="bg-[rgb(239,105,105)] text-white no-transition"
        >
            Cancel
        </Button>,
        <Button
            size="large"
            className="bg-[rgb(115,222,65)] text-white no-transition"
            key="submit"
            onClick={() => {
            form
                .validateFields()
                .then((values) => {
                    saveDepartment(values);  // Call saveDepartment instead of handleOk
                })
                .then(() => handleCancel())
                .catch((info) => {
                console.log("Validate Failed:", info);
                });
            }}
            loading={loading}
        >
            {loading ? "Creating..." : "Create"}
        </Button>,
    ];
  
    return (
        <Modal
            title="Create New Department"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={modal_footer}
            width={850}
        >
            <Form form={form} layout="vertical">
                {/* Department ID Field */}
                <Form.Item
                    name="departmentId"
                    label="Department ID"
                    rules={[
                    { required: true, message: "Please input the department ID!" },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
        
                {/* Department Name Field */}
                <Form.Item
                    name="departmentName"
                    label="Department Name"
                    rules={[
                    { required: true, message: "Please input the department name!" },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
            </Form>
        </Modal>
    );
};