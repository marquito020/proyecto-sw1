import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#131517] text-[#d1d5db]">
      <Sidebar />

      <main className="xl:pl-[270px] xl:pr-[35px] py-5  px-4 min-h-screen flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
