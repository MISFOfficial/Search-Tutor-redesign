import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  BookOpen,
  Briefcase,
  ClipboardList,
  FileCheck2,
  Home,
  LogIn,
  LogOut,
  Mail,
  PlusCircle,
  Send,
  User,
  UserPlus,
  UserSquare,
} from "lucide-react";

const Header = () => {
  const { user, userInfo, logOut, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const navOption = (
    <>
      {/* <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }>
          <Home size={18} className="block md:hidden lg:hidden" />
          Home
        </NavLink>
      </li> */}
      {!user && (
        <>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <UserPlus size={18} className="block md:hidden lg:hidden" />
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/job-list"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <ClipboardList size={18} className="block md:hidden lg:hidden" />
              Job Board
            </NavLink>
          </li>
        </>
      )}

      {user && (
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }>
            <User size={18} className="block md:hidden lg:hidden" />
            Profile
          </NavLink>
        </li>
      )}

      {userInfo?.accountType === "tutor" && (
        <>
          <li>
            <NavLink
              to="/job-list"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <ClipboardList size={18} className="block md:hidden lg:hidden" />
              Job Board
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/applied-jobs"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <FileCheck2 size={18} className="block md:hidden lg:hidden" />
              Applied jobs
            </NavLink>
          </li>
        </>
      )}

      {userInfo?.accountType === "guardian" && (
        <li>
          <NavLink
            to="/post-tuition"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }>
            <PlusCircle size={18} className="block md:hidden lg:hidden" />
            Post a tuition
          </NavLink>
        </li>
      )}
      {userInfo?.accountType === "admin" && (
        <>
          <li>
            <NavLink
              to="/manage-users"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <PlusCircle
                size={18}
                className="block md:hidden lg:hidden mr-2"
              />
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tuition-requests"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <BookOpen size={18} className="block md:hidden lg:hidden mr-2" />
              Tuition Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/job-list"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <ClipboardList size={18} className="block md:hidden lg:hidden" />
              Job Board
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/post-job"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <Send size={18} className="block md:hidden lg:hidden mr-2" />
              Post Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/applications"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <PlusCircle
                size={18}
                className="block md:hidden lg:hidden mr-2"
              />
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutors"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <UserSquare
                size={18}
                className="block md:hidden lg:hidden mr-2"
              />
              Payment
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div
          className="bg-[#F2F5FC] sticky top-0 z-50 shadow"
          style={{ boxShadow: "0 8px 6px -6px #0675c140" }}>
          <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] z-50">
            <div className="navbar ">
              <div className="flex-1">
                <Link to={"/"} name="home">
                  <img
                    className="w-36 md:w-[11.1rem]"
                    src="/images/logo.webp"
                    alt=""
                  />
                </Link>
                {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium text-[17px]">
                  {navOption}
                </ul>
              </div>
              <div className="">
                {user ? (
                  <Link
                    onClick={handleLogout}
                    className="btn bg-indigo-500 py-2 px-8 text-white hidden md:block">
                    Logout
                  </Link>
                ) : (
                  <Link
                    to={"/signup"}
                    className="btn bg-indigo-500 py-2 px-8 text-white hidden md:block">
                    Become a Tutor
                  </Link>
                )}
                <div className="drawer lg:hidden">
                  <input
                    id="mobile-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    <label htmlFor="mobile-drawer" className="btn btn-ghost">
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h8m-8 6h16"
                        />
                      </svg>
                    </label>
                  </div>

                  <div className="drawer-side z-40">
                    <label
                      htmlFor="mobile-drawer"
                      className="drawer-overlay"></label>
                    <ul className="menu p-0 w-60 min-h-full bg-base-100 text-base-content">
                      {user ? (
                        <div className="px-5 pb-6 pt-8 bg-indigo-500">
                          <img
                            alt="profile image"
                            width="90"
                            height="90"
                            className="mx-auto size-[90px] rounded-full border border-white object-cover p-1 bg-transparent"
                            src={userInfo?.image}
                          />
                          <div className="mt-4 text-center text-sm text-white">
                            <h2 className="mb-1 flex items-center justify-center gap-2 text-base font-semibold">
                              {userInfo?.name || "No data found"}
                            </h2>
                            <p>{userInfo?.email || "No data found"}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="px-5 pt-8">
                          <Link to={"/"}>
                            <img
                              className="w-36 md:w-[11.1rem] pb-2 mb-4 border-b-[1px] border-black"
                              src="https://searchtutorbd.com/imges/logo.png"
                              alt=""
                            />
                          </Link>
                        </div>
                      )}

                      <div className="p-4 ">
                        {navOption}

                        {user ? (
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 py-2 mt-2 px-4 w-full border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-200">
                            <LogOut size={18} />
                            Logout
                          </button>
                        ) : (
                          <Link
                            to={"/signup"}
                            className="btn bg-indigo-500 py-2 px-8 text-white block md:hidden">
                            Become a Tutor
                          </Link>
                        )}
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
