import { Toaster } from "react-hot-toast";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import Lab1 from "./labs/Lab1";
import Lab2 from "./labs/Lab2";

function Home() {
  return (
    <div className="text-center text-2xl font-bold">
      Chào mừng đến với WEB2091 🚀
    </div>
  );
}

function App() {
  const location = useLocation();

  const menuClass = (path: string) =>
    `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-700 text-yellow-300" : ""
    }`;

  return (
    <>
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">MENU</h2>

          <nav className="flex flex-col space-y-2">
            <Link to="/" className={menuClass("/")}>
              <HomeOutlined />
              Trang chủ
            </Link>

            <Link to="/lab1" className={menuClass("/lab1")}>
              <UserOutlined />
              Lab 1
            </Link>

            <Link to="/lab2" className={menuClass("/lab2")}>
              <AppstoreOutlined />
              Lab 2
            </Link>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 bg-gray-100">
          {/* HEADER */}
          <div className="bg-blue-600 text-white p-4 rounded mb-6 shadow">
            <h1 className="text-xl font-semibold">WEB2091 Admin</h1>
          </div>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lab1" element={<Lab1 />} />
            <Route path="/lab2" element={<Lab2 />} />
          </Routes>
        </main>
      </div>

      <Toaster />
    </>
  );
}

export default App;
