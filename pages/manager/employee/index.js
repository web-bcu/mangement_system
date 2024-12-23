import { useUserContext } from "../../../context/UserContext";
import Layout from "../../../components/Layout";
import { data } from "./data_demo";
export default function EmployeeScreen() {
    const {user} = useUserContext();

    if (user.role == "user") {
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
          <th className="border px-4 py-2">Employee ID</th>
          <th className="border px-4 py-2">Employee Name</th>
          <th className="border px-4 py-2">Date of Birth</th>
          <th className="border px-4 py-2">Years of Experience</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{row.EmployeeID}</td>
            <td className="border px-4 py-2">{row.EmployeeName}</td>
            <td className="border px-4 py-2">{row.DateOfBirth}</td>
            <td className="border px-4 py-2">{row.YearsOfExperience}</td>
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
  