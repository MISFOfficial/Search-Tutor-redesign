import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";

const Tutors = () => {
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/applications")
      .then(({ data }) => {
        const selected = data.filter((app) => app.status === "selected");
        setSelectedTutors(selected);
      })
      .catch((error) => {
        console.error("Error fetching selected tutors:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = selectedTutors.filter((app) => {
      const nameMatch = app.userDetails?.name?.toLowerCase().includes(term);
      const emailMatch = app.userDetails?.email?.toLowerCase().includes(term);
      const jobIdMatch = app.jobDetails?.jobId
        ?.toString()
        .toLowerCase()
        .includes(term);

      return nameMatch || emailMatch || jobIdMatch;
    });

    setFilteredTutors(filtered);
  }, [searchTerm, selectedTutors]);

  const markAsPaid = async (applicationId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark payment as paid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as paid!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axiosInstance.patch(
        `/applications/${applicationId}/payment`,
        { paymentStatus: "paid" }
      );

      if (data.success) {
        setSelectedTutors((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, paymentStatus: "paid" } : app
          )
        );

        Swal.fire("Paid!", "Payment marked as paid.", "success");
      } else {
        Swal.fire("Oops!", "Failed to update payment status.", "error");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <input
        type="text"
        placeholder="Search by tutor name or job ID..."
        className="mb-6 w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredTutors.length === 0 ? (
        <p>No tutors selected yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {filteredTutors.map((app) => {
            const user = app.userDetails;
            const job = app.jobDetails;

            return (
              <div
                key={app._id}
                className="bg-white shadow border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user?.image ||
                      "	https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Profile-Picture.png"
                    }
                    alt={user?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-bold">{user?.name}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <p className="text-sm text-gray-500">{user?.phone}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-4 mb-1">
                    <p className="text-sm text-gray-600">
                      <strong>Job ID:</strong> {job?.jobId}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Applied On:</strong> Applied:{" "}
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p>
                    <strong>Job Title:</strong> {job?.title}
                  </p>
                  <p>
                    <strong>Location:</strong> {job?.location}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600">{app.status}</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <p>
                      <strong>Payment:</strong>{" "}
                      <span
                        className={
                          app.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-red-600"
                        }>
                        {app.paymentStatus || "unpaid"}
                      </span>
                    </p>
                    {app.paymentStatus !== "paid" && (
                      <button
                        onClick={() => markAsPaid(app._id)}
                        className="mt-2 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                        Mark as Paid
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tutors;
