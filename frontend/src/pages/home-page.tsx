import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-1 flex-col items-center justify-center gap-2">
      <div className="w-96 space-y-2">
        <Link
          to="/login"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
