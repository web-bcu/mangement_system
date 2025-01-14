import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import Layout from "../../../components/Layout";
import { Eye, CircleX, CheckCircle } from "lucide-react";
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd'
import { data } from "./data_demo";
import "../../../styles/Home.module.css"
import { toast } from "sonner";
import dayjs from "dayjs";


export default function EmployeeTasksManagement() {
  // const {user} = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserContext();
  const [tasks, setTasks] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const dataToPass = {
        id: values.id,
        taskName: values.taskName,
        departmentId: user?.department,
        employeeId: values.employeeId,
        deadline: dayjs(values.deadline).format("YYYY-MM-DD"),
        status: false
      }

      const response = await fetch("http://localhost:8080/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToPass)
      })

      if (!response.ok) throw new Error("Failed to create task");

      // toast.success("Project updated successfully!");
      fetchTasksByDepartment();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project!");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (!response.ok) throw new Error("Failed to delete task");
      fetchTasksByDepartment();
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project!");
    }
  }

  const updateTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/v1/tasks/${taskId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (!response.ok) throw new Error("Failed to update tasks");
      fetchTasksByDepartment();
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project!");
    }
  }

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

  const fetchTasksByDepartment = async () => {
    const token = localStorage.getItem("token");
    // const dataToPass = { departmentId: user?.department }
    try {
      const response = await fetch(`http://localhost:8080/api/v1/tasks/department/${user?.department}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks!");
    }
  }

  useEffect(() => {
    fetchTasksByDepartment();
  }, [user?.department]);

  if (user && user.role !== "MANAGER") {
    return (
      <Layout>
        <div className="flex justify-center items-center text-3xl">You are not allowed to access this page</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-6 w-full bg-white shadow-md rounded-md h-full">
        <div className="flex justify-center items-center text-3xl">Manage your employee task here</div>
        <Table showModal={showModal} tasks={tasks} deleteTask={deleteTask} updateTask={updateTask}/>
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
  const [employees, setEmployees] = useState(null);
  const { user } = useUserContext();

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    const dataToPass = { department: user?.department }
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/department", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPass)
      });

      if (!response.ok) throw new Error("Failed to fetch employees");

      const employeeData = await response.json();
      setEmployees(employeeData);
    } catch (error) {
      console.error("Error occured:", error);
      toast.error("Something went wrong!!!");
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, []);


  // const employeeOptions = [
  //   { label: "John Doe", value: "john_doe" },
  //   { label: "Jane Smith", value: "jane_smith" },
  //   { label: "Sam Wilson", value: "sam_wilson" },
  // ];
  const modal_footer = [
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
        <Form.Item name="id" label="Task Id" rules={[{ required: true, message: 'Please input the task name!' }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="taskName" label="Task Name" rules={[{ required: true, message: 'Please input the task name!' }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="employeeId"
          label="Employee"
          rules={[{ required: true, message: 'Please select the assignee!' }]}
        >
          <Select placeholder="Select an employee" size="large">
            {employees?.map((employee) => (
              <Select.Option key={employee.id} value={employee.id}>
                {employee.fullname}
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


const Table = ({ showModal, tasks, deleteTask, updateTask }) => {

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
          {tasks?.map((task, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{task.id}</td>
              <td className="border px-4 py-2">{task.taskName}</td>
              <td className="border px-4 py-2">{task.employeeId}</td>
              <td className="border px-4 py-2">{task.deadline}</td>
              <td className="border px-4 py-2">
                {task.status ? (
                  <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(148,239,105)] py-1 px-4 shadow-md">
                    Done
                  </div>
                ) :
                  // row.Status === "In Progress" ? 
                  (
                    <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(232,239,105)] py-1 px-4 shadow-md">
                      In Progress
                    </div>
                    // ) : (
                    //   <div className="text-gray-600 flex items-center justify-center rounded-full bg-[rgb(239,105,105)] py-1 px-4 shadow-md">
                    //     Due
                    //   </div>
                  )
                }
              </td>
              <td className="border">
                {task.status ? (
                  <div className=" flex items-center justify-center rounded-full gap-7">
                    {/* <button className=""><Eye className="w-8 h-8" /></button> */}
                    <button><CircleX className="text-[#de0d0d] w-8 h-8" onClick={() => deleteTask(task.id)} /></button>
                  </div>
                ) : (
                  <div className=" flex items-center justify-center rounded-full gap-7">
                    <button><CheckCircle className="text-green-400 w-8 h-8" onClick={() => updateTask(task.id)}/></button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-600">1-10 of 76 Items</span>
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