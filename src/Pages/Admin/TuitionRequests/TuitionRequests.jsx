import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";

const TuitionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchTuitionRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/tuition-requests");
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuitionRequests();
  }, []);

  const handleMarkAsCalled = async (id) => {
    try {
      const { data } = await axiosInstance.patch(
        `/tuition-requests/${id}/call-status`,
        { isCalled: true }
      );

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Marked as called successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchTuitionRequests();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update called status.",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please try again later.",
      });
    }
  };

  // Filtering
  const filteredRequests = requests.filter((req) => {
    if (filter === "called") return req.isCalled === true;
    if (filter === "not_called") return !req.isCalled;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}>
          All
        </button>
        <button
          onClick={() => handleFilterChange("called")}
          className={`px-4 py-2 rounded ${
            filter === "called" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}>
          Called
        </button>
        <button
          onClick={() => handleFilterChange("not_called")}
          className={`px-4 py-2 rounded ${
            filter === "not_called" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}>
          Not Called
        </button>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-600">No tuition requests found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRequests.map((req, index) => (
              <div
                key={index}
                className="rounded-2xl border border-indigo-100 p-5 shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-center justify-between">
                  <p>
                    <strong>Class:</strong> {req.class}
                  </p>
                  <p>
                    {req.isCalled ? (
                      <span className="text-green-600 font-semibold">
                        Called
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Not Called
                      </span>
                    )}
                  </p>
                </div>

                <p>
                  <strong>Subject:</strong> {req.subjects}
                </p>
                <p>
                  <strong>Phone:</strong> {req.phoneNumber}
                </p>
                <p>
                  <strong>City:</strong> {req.city}
                </p>
                <p>
                  <strong>Location:</strong> {req.location}
                </p>
                <p>
                  <strong>Category:</strong> {req.category}
                </p>
                <p>
                  <strong>Type:</strong> {req.tuitionType}
                </p>
                <p>
                  <strong>Student Gender:</strong> {req.studentGender}
                </p>
                <p>
                  <strong>Tutor Gender Preference:</strong>{" "}
                  {req.tutorGenderPreference}
                </p>
                <p>
                  <strong>Salary:</strong> {req.salary} BDT
                </p>
                <p>
                  <strong>Days/Week:</strong> {req.daysPerWeek}
                </p>
                {req.additionalRequirements && (
                  <p className="text-gray-600 mt-2">
                    <strong>Requirements:</strong> {req.additionalRequirements}
                  </p>
                )}

                {!req.isCalled && (
                  <button
                    onClick={() => handleMarkAsCalled(req._id)}
                    className="mt-2 rounded bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600">
                    Mark as Called
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50">
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-indigo-500 text-white" : ""
                }`}>
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TuitionRequests;
