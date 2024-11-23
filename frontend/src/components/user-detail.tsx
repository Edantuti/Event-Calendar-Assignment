import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user-hook";
import { ArrowRightFromLine } from "lucide-react";

export function UserDetail() {
  const { setUser } = useUser();
  const user = JSON.parse(sessionStorage.getItem("userData")!);
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("token");
    setUser({});
    navigate("/login");
  }
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-xl">
        Welcome, {user?.first} {user?.last}
      </h1>
      <button
        className="px-4 py-2 text-red-500 rounded"
        onClick={() => handleLogout()}
        title="logout"
      >
        <ArrowRightFromLine />
      </button>
    </div>
  );
}
