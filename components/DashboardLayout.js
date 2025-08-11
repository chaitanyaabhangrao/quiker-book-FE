import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = [
    { name: "Services", path: "/dashboard/services" },
    { name: "Timeslots", path: "/dashboard/timeslots" },
    { name: "Bookings", path: "/dashboard/bookings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between bg-purple-600 text-white px-4 py-3 shadow-md">
        <div className="flex items-center">
          <button
            className="md:hidden mr-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {/* Hamburger */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-lg font-semibold">Owner Dashboard</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            bg-purple-600 text-white w-60 p-4 md:block 
            ${sidebarOpen ? "block" : "hidden"} 
            md:min-h-screen
          `}
        >
          <nav className="space-y-2">
            {menu.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`block px-3 py-2 rounded-md cursor-pointer ${
                    router.pathname === item.path
                      ? "bg-purple-800"
                      : "hover:bg-purple-700"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
