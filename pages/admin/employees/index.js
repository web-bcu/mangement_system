import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useUserContext } from "../../../context/UserContext";
import { data } from "../../manager/employees/data_demo";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

export default function AdminScreen() {
  const { user } = useUserContext();
  const [userData, setUserData] = useState([]);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //     setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //     setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //     setIsModalOpen(false);
  // };
  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users data");

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error occured:", error);
      toast.error("Something went wrong!!!");
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (user && user.role !== "ADMIN") {
    return (
      <Layout>
        <div className="flex justify-center items-center text-3xl">You are not allowed to access this page</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-6 w-full bg-white shadow-md rounded-md h-full">
        <div className="flex justify-center items-center text-3xl">Manage your employee here</div>
        {/* <UpdateModal
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                /> */}
        <Table userData={userData} />
      </div>
    </Layout>
  )
}

const Table = ({ userData }) => {
  const router = useRouter();

  const updateUser = async (userUpdate) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:8080/api/v1/users/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });

      const data = await response.json();
      if (response.ok) {
        // Successfully saved the department
        console.log("User updated successfully", data);
        toast.success("User updated successfully");
      } else {
        // Handle any errors from the server
        console.error("Error updating user:", data);
        // You can show a toast or notification for error
      }
    } catch (error) {
      console.error("Error during user update:", error);
    } finally {
      router.reload();
    }
  }

  return (
    <div className="overflow-x-auto mt-8">
      <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (

            <UserForm userData={user} onSave={updateUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const UserForm = ({ userData, onSave }) => {
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(userData);
  const [departments, setDepartments] = useState(null);

  const handleInputChange = (field, value) => {
    setEditUser((prev) => ({ ...prev, [field]: value }));
  };

  const saveUser = async () => {
    try {
      await onSave(editUser); // Call the save handler passed via props
      setEdit(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const fetchDepartments = async () => {
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
    } catch (error) {
      console.error("Error occured:", error);
      toast.error("Something went wrong!!!");
    }
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <tr key={userData.id} className="hover:bg-gray-100">
      {/* ID Field */}
      <td className="border px-4 py-2">
        {edit ? (
          <Input
            value={editUser.id}
            onChange={(e) => handleInputChange("id", e.target.value)}
            disabled // Disable ID editing if it's not allowed
          />
        ) : (
          userData.id
        )}
      </td>

      {/* Full Name Field */}
      <td className="border px-4 py-2">
        {edit ? (
          <Input
            value={editUser.fullname}
            onChange={(e) => handleInputChange("fullname", e.target.value)}
          />
        ) : (
          userData.fullname
        )}
      </td>

      {/* Department Field */}
      <td className="border px-4 py-2">
        {edit ? (
          <Select
            value={editUser.department}
            onChange={(value) => handleInputChange("department", value)}
            style={{ width: "100%" }}
          >
            {/* Add the options for departments */}
            {departments && departments.map((department) =>
              <Option value={department.departmentId}>{department.departmentName}</Option>
            )}
          </Select>
        ) : (
          userData.department
        )}
      </td>

      {/* Role Field */}
      <td className="border px-4 py-2">
        {edit ? (
          <Select
            value={editUser.role}
            onChange={(value) => handleInputChange("role", value)}
            style={{ width: "100%" }}
          >
            {/* Add the options for departments */}
            <Option value="USER">User</Option>
            <Option value="MANAGER">Manager</Option>
            <Option value="ADMIN">Admin</Option>
            {/* Add more options as needed */}
          </Select>
        ) : (
          userData.role
        )}
      </td>

      {/* Action Buttons */}
      <td className="border px-4 py-2">
        {edit ? (
          <div className="flex gap-2">
            {/* Save Button */}
            <Button size="small" className="mb-2" onClick={saveUser}>
              Save
            </Button>
            {/* Cancel Button */}
            <Button size="small" className="mb-2" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button size="small" className="mb-2" onClick={() => setEdit(true)}>
            Edit
          </Button>
        )}
      </td>
    </tr>
  );
};