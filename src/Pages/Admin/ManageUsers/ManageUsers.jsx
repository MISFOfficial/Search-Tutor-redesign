import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import { BadgeCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../../Component/Pagination/Pagination";

const ManageUsers = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse initial URL params
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialRole = queryParams.get("role") || "all";
  const initialSearch = queryParams.get("search") || "";

  // State for the filter role and current page
  const [filterRole, setFilterRole] = useState(initialRole);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // inputValue controls the input box value
  const [inputValue, setInputValue] = useState(initialSearch);
  // searchQuery triggers the actual API fetch
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [users, setUsers] = useState([]);
  const usersPerPage = 12;

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [userCounts, setUserCounts] = useState({
    all: 0,
    admin: 0,
    tutor: 0,
    guardian: 0,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users", {
        params: {
          page: currentPage,
          limit: usersPerPage,
          role: filterRole === "all" ? "" : filterRole,
          search: searchQuery,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
        setUserCounts({
          all: res.data.counts.totalAllUsers,
          admin: res.data.counts.totalAdmins || 0,
          tutor: res.data.counts.totalTutors || 0,
          guardian: res.data.counts.totalGuardians || 0,
        });
      }
    } catch (err) {
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when currentPage, filterRole or searchQuery changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage, filterRole, searchQuery]);

  // Sync URL params when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage);
    if (filterRole && filterRole !== "all") params.set("role", filterRole);
    if (searchQuery) params.set("search", searchQuery);

    navigate({ search: params.toString() }, { replace: true });
  }, [currentPage, filterRole, searchQuery, navigate]);

  // Handle role update
  const updateRole = async (uid, newRole) => {
    try {
      await axiosInstance.patch(`/users/${uid}/accountType`, {
        accountType: newRole,
      });
      Swal.fire("Success", `Role updated to ${newRole}`, "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  // Handle verification toggle
  const handleVerifyToggle = async (uid, isVerified) => {
    try {
      await axiosInstance.patch(`/users/${uid}/verify`, { isVerified });
      Swal.fire("Success", "Verification status updated", "success");
      fetchUsers();
    } catch (error) {
      Swal.fire("Error", "Failed to update verification", "error");
    }
  };

  // Handle red verification toggle
  const handleRedVerifyToggle = async (uid, isRedVerified) => {
    try {
      await axiosInstance.patch(`/users/${uid}/redVerify`, { isRedVerified });
      Swal.fire("Success", "Red verification status updated", "success");
      fetchUsers();
    } catch (error) {
      Swal.fire("Error", "Failed to update red verification", "error");
    }
  };

  if (loading || !userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (userInfo.accountType !== "admin") {
    return (
      <p className="text-center text-red-500 mt-10">
        Access denied. Only admins can manage users.
      </p>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10">
      {/* Filter Buttons & Counts */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["all", "admin", "tutor", "guardian"].map((role) => (
          <button
            key={role}
            onClick={() => {
              setFilterRole(role);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-md font-medium border ${
              filterRole === role
                ? "bg-indigo-500 text-white"
                : "bg-white text-indigo-500 border-indigo-500"
            } hover:bg-indigo-600 hover:text-white transition-colors duration-200`}>
            {role === "all"
              ? `All (${userCounts.all})`
              : `${role.charAt(0).toUpperCase() + role.slice(1)}s (${
                  userCounts[role]
                })`}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6 p-4">
        <div className="flex items-center gap-2 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by name or email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input input-bordered w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchQuery(inputValue);
                setCurrentPage(1);
              }
            }}
          />
          <button
            onClick={() => {
              setSearchQuery(inputValue);
              setCurrentPage(1);
            }}
            className="btn btn-primary px-4">
            Search
          </button>
          <button
            onClick={() => {
              setInputValue("");
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className="btn btn-outline">
            Clear
          </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 gap-6">
        {users.map((user) => (
          <div key={user.uid} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={
                  user?.image ||
                  "https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Profile-Picture.png"
                }
                alt="user"
                className="h-80 w-full object-cover object-top"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user.name}
                <div className="badge badge-primary text-white ml-2">
                  {user.accountType}
                </div>
                {user.isVerified && !user.isRedVerified && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/15050/15050690.png"
                    alt="verified"
                    className="w-7 h-7 object-cover inline-block ml-2"
                  />
                )}
                {user.isRedVerified && !user.isVerified && (
                  <img
                    src="https://img.icons8.com/?size=30&id=99285&format=png"
                    alt="Red Verified Badge"
                    className="w-7 h-7 object-cover inline-block ml-2"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(19%) sepia(89%) saturate(6975%) hue-rotate(1deg) brightness(95%) contrast(122%)",
                    }}
                  />
                )}
              </h2>
              <p>{user.email}</p>

              <div className="card-actions justify-start flex-wrap gap-2">
                {user.uid !== userInfo.uid && (
                  <>
                    {["admin", "tutor", "guardian"].map((role) => (
                      <button
                        key={role}
                        onClick={() => updateRole(user.uid, role)}
                        disabled={user.accountType === role}
                        className={`badge badge-outline bg-indigo-500 text-white mr-2 px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
                          user.accountType === role
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-indigo-600"
                        }`}>
                        Make {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                    <button
                      onClick={() => navigate(`/tutor/${user.uid}`)}
                      className="badge badge-outline bg-green-500 text-white px-3 py-1 rounded-md font-medium transition-colors duration-200 hover:bg-green-600">
                      Show Tutor Profile
                    </button>
                    {user?.accountType === "tutor" &&
                      !user?.isRedVerified &&
                      (user?.isVerified ? (
                        <button
                          onClick={() => handleVerifyToggle(user.uid, false)}
                          className="badge badge-outline bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1">
                          <BadgeCheck size={16} />
                          Unverify
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerifyToggle(user.uid, true)}
                          className="badge badge-outline bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 flex items-center gap-1">
                          <BadgeCheck size={16} />
                          Make Verified
                        </button>
                      ))}
                    {user?.accountType === "tutor" &&
                      !user?.isVerified &&
                      (user?.isRedVerified ? (
                        <button
                          onClick={() => handleRedVerifyToggle(user.uid, false)}
                          className="badge badge-outline bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1">
                          <BadgeCheck size={16} />
                          Unverify (Red)
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRedVerifyToggle(user.uid, true)}
                          className="badge badge-outline bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1">
                          <BadgeCheck size={16} />
                          Give Red Badge
                        </button>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
};

export default ManageUsers;
