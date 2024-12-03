import { useUserContext } from "../../../context/UserContext";
import Layout from "../../../components/Layout";

export default function EmployeeScreen() {
    const {user} = useUserContext();

    if (user.role !== "user") {
        return (
            <Layout>
                <div className="flex justify-center items-center text-3xl">You are not allowed to access this page</div>
            </Layout>
        )
    }
    return (
        <Layout>
            <div className="flex justify-center items-center text-3xl">Manage your employee here</div>
        </Layout>
    )
}