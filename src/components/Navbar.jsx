import { Outlet, Link } from "react-router-dom";

export default function Navbar({ userId, setUserId }) {
  return (
    <>
      <nav className="w-full bg-sky-100 opacity-90 p-4 flex justify-between">
        <h1 className="font-Gloria text-3xl text-black opacity-100">BonStay</h1>
        {userId && (
          <div className="flex gap-3 font-bold text-xl justify-center items-center">
            <div>Home</div>
            <Link to="/hotels">
                <div className="hover:cursor-pointer">Hotels</div>
            </Link>
            <div>Bookings</div>
            <div className="hover:cursor-pointer" onClick={() => setUserId("")}>
              Logout
            </div>
          </div>
        )}
      </nav>
      <div className="flex justify-center items-center h-screen">
        <Outlet />
      </div>
    </>
  );
}
