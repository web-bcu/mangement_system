import { useEffect , useState} from "react"
import { useUserContext } from "../../../context/UserContext"
import Layout from "../../../components/Layout";
import { Eye, CircleX  } from "lucide-react";
import {Button, Modal, Form, Input, DatePicker, Select} from 'antd'
import { data } from "./data_demo";
import "../../../styles/Home.module.css"
export default function EmployeeTasksManagement() {
    // const {user} = useUserContext();
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
              <Table showModal={showModal}/>
              <CreateModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            </div>
        </Layout>
    )
    
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
        <Form.Item name="taskName" label="Task Name" rules={[{ required: true, message: 'Please input the task name!' }]}>
          <Input size="large"/>
        </Form.Item>
        <Form.Item
          name="Employee"
          label="Employee"
          rules={[{ required: true, message: 'Please select the assignee!' }]}
        >
          <Select placeholder="Select an employee" size="large">
            {employeeOptions.map((employee) => (
              <Select.Option key={employee.value} value={employee.value}>
                {employee.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: 'Please select the deadline!' }]}>
          <DatePicker style={{ width: '100%' }} size="large"></DatePicker>
        </Form.Item>
      </Form>
    </Modal>
  )
}
const Table = ({showModal})=> {
  

    return (
  <div className="overflow-x-auto mt-8">
    <Button 
    size="large"
    className="mb-2"
    onClick={showModal}>
      Create Task
    </Button>
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