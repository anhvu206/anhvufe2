import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Lab2 from "./labs/Lab2";
import Lab1 from "./labs/Lab1";

function App() {
  return (
    <>
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">MENU</h2>

          <nav className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-gray-300">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-300">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-300">
              Thêm mới
            </Link>
            <Link to="#" className="hover:text-gray-300">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-300">
              Đăng ký
            </Link>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <nav className="bg-blue-600 text-white shadow p-4 mb-6 rounded">
            <div className="text-xl font-semibold">WEB2091 App</div>
          </nav>

          <h1 className="text-4xl font-bold mb-4 text-center">
            Chào mừng đến với WEB2091
          </h1>

          <Lab1 />
        </main>
      </div>

      <Toaster />
    </>
  );
}

export default App;
