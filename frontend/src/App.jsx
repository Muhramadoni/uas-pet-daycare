import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PemilikList from "./pages/PemilikList";
import HewanList from "./pages/HewanList";
import UserList from "./pages/UserList";
import Sidebar from "./components/Sidebar";

function App() {
  const token = localStorage.getItem("token");

  const LayoutWithSidebar = ({ children }) => (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );

  return (
    <Routes>
      {token ? (
        <>
          <Route
            path="/"
            element={
              <LayoutWithSidebar>
                <Dashboard />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/dashboard"
            element={
              <LayoutWithSidebar>
                <Dashboard />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/pemilik"
            element={
              <LayoutWithSidebar>
                <PemilikList />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/hewan"
            element={
              <LayoutWithSidebar>
                <HewanList />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/users"
            element={
              <LayoutWithSidebar>
                <UserList />
              </LayoutWithSidebar>
            }
          />
        </>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
