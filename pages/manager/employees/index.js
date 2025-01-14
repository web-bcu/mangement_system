import { useUserContext } from "../../../context/UserContext";
import Layout from "../../../components/Layout";
import { data } from "./data_demo";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ManagerScreen() {
  const { user } = useUserContext();
  console.log(user?.department);
  const [employees, setEmployees] = useState(null);

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
    fetchEmployees();
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
        <div className="flex justify-center items-center text-3xl">Your Department</div>
        <Table employees={employees}/>
      </div>
    </Layout>
  )
}


const Table = ({employees}) => {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{employee.id}</td>
              <td className="border px-4 py-2">{employee.fullname}</td>
              <td className="border px-4 py-2">{employee.department}</td>
              <td className="border px-4 py-2">{employee.role}</td>
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
