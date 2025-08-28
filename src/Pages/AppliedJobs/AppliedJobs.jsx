import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axiosInstance from "../../utils/axiosInstance";
import { BadgeCheck, CheckCircle2, FileClock, XCircle } from "lucide-react";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/applications/user/${user.uid}`);
        setJobs(res.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user]);

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const filteredJobs =
    selectedStatus === "all"
      ? jobs
      : jobs.filter((job) => job.status === selectedStatus);

  const countByStatus = (status) =>
    jobs.filter((job) => job.status === status).length;

  if (!user) return <p>Please log in to see your applied jobs.</p>;
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error)
    return (
      <p className="text-red-500">
        {error.response?.data?.message ||
          error.message ||
          "Something went wrong."}
      </p>
    );

  if (jobs.length === 0) return <p>You have not applied for any jobs yet.</p>;

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem]">
      {/* Filter Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 my-4 p-4">
        {/* Applied Jobs */}
        <div
          onClick={() => handleStatusClick("all")}
          className={`cursor-pointer group rounded-xl px-4 py-4 transition-all duration-500 ease-out hover:bg-gradient-to-b hover:shadow-lg ${
            selectedStatus === "all"
              ? "bg-gradient-to-b from-[#5ca9dd] to-[#0675c1] text-white"
              : "bg-[#F2F5FC]"
          }`}>
          <div className="flex gap-2 items-center">
            <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-[rgba(6,117,193,0.1)]">
              <FileClock className="w-5 h-5 text-[#0675c1]" />
            </div>
            <h2 className="text-2xl font-bold">{jobs.length}</h2>
          </div>
          <p className="mt-1 text-sm">All Applied Jobs</p>
        </div>
        {/* Pending */}
        <div
          onClick={() => handleStatusClick("pending")}
          className={`cursor-pointer group rounded-xl px-4 py-4 transition-all duration-500 ease-out hover:bg-gradient-to-b hover:shadow-lg ${
            selectedStatus === "pending"
              ? "bg-gradient-to-b from-[#5ca9dd] to-[#0675c1] text-white"
              : "bg-[#F2F5FC]"
          }`}>
          <div className="flex gap-2 items-center">
            <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-[rgba(6,117,193,0.1)]">
              <FileClock className="w-5 h-5 text-[#0675c1]" />
            </div>
            <h2 className="text-2xl font-bold">{countByStatus("pending")}</h2>
          </div>
          <p className="mt-1 text-sm">Pending</p>
        </div>

        {/* Shortlisted */}
        <div
          onClick={() => handleStatusClick("reviewed")}
          className={`cursor-pointer group rounded-xl px-4 py-4 transition-all duration-500 ease-out hover:bg-gradient-to-b hover:shadow-lg ${
            selectedStatus === "reviewed"
              ? "bg-gradient-to-b from-[#5ca9dd] to-[#0675c1] text-white"
              : "bg-[#F2F5FC]"
          }`}>
          <div className="flex gap-2 items-center">
            <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-[rgba(6,117,193,0.1)]">
              <BadgeCheck className="w-5 h-5 text-[#0675c1]" />
            </div>
            <h2 className="text-2xl font-bold">{countByStatus("reviewed")}</h2>
          </div>
          <p className="mt-1 text-sm">Shortlisted Jobs</p>
        </div>

        {/* Confirmed */}
        <div
          onClick={() => handleStatusClick("selected")}
          className={`cursor-pointer group rounded-xl px-4 py-4 transition-all duration-500 ease-out hover:bg-gradient-to-b hover:shadow-lg ${
            selectedStatus === "selected"
              ? "bg-gradient-to-b from-[#5ca9dd] to-[#0675c1] text-white"
              : "bg-[#F2F5FC]"
          }`}>
          <div className="flex gap-2 items-center">
            <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-[rgba(6,117,193,0.1)]">
              <CheckCircle2 className="w-5 h-5 text-[#0675c1]" />
            </div>
            <h2 className="text-2xl font-bold">{countByStatus("selected")}</h2>
          </div>
          <p className="mt-1 text-sm">Confirmed Jobs</p>
        </div>

        {/* Rejected */}
        <div
          onClick={() => handleStatusClick("rejected")}
          className={`cursor-pointer group rounded-xl px-4 py-4 transition-all duration-500 ease-out hover:bg-gradient-to-b hover:shadow-lg ${
            selectedStatus === "rejected"
              ? "bg-gradient-to-b from-[#5ca9dd] to-[#0675c1] text-white"
              : "bg-[#F2F5FC]"
          }`}>
          <div className="flex gap-2 items-center">
            <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-[rgba(6,117,193,0.1)]">
              <XCircle className="w-5 h-5 text-[#0675c1]" />
            </div>
            <h2 className="text-2xl font-bold">{countByStatus("rejected")}</h2>
          </div>
          <p className="mt-1 text-sm">Rejected Jobs</p>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 gap-3 px-4 py-4 lg:py-8">
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg col-span-full py-8">
            {selectedStatus === "all"
              ? "You have not applied for any jobs yet."
              : `No ${
                  selectedStatus === "reviewed" ? "shortlisted" : selectedStatus
                } jobs found.`}
          </p>
        ) : (
          filteredJobs.map((data) => (
            <div
              key={data.job._id}
              className="relative rounded-xl border border-[rgba(6,53,85,0.16)] bg-white p-4 lg:p-6 shadow transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg max-w-xl mb-6">
              <h3 className="mb-3 text-xl font-semibold text-[#2b2b2c]">
                {data.job.title}{" "}
                <span
                  className={`badge text-white ${
                    data.status === "pending"
                      ? "bg-yellow-500"
                      : data.status === "reviewed"
                      ? "bg-blue-500"
                      : data.status === "selected"
                      ? "bg-green-600"
                      : data.status === "rejected"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}>
                  {data.status === "reviewed" ? "Shortlisted" : data.status}
                </span>
              </h3>
              <div className="flex items-center gap-4 mb-3 text-[12px] text-[#5c5c5c]">
                <p>
                  Job Id : <strong>{data.job.jobId || "N/A"}</strong>
                </p>
                <p>
                  Posted Date : <strong>{data.job.date || "N/A"}</strong>
                </p>
              </div>
              <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-[#5c5c5c]">
                <div>
                  <p>Tuition Type</p>
                  <p className="font-medium">{data.job.type}</p>
                </div>
                <div>
                  <p>Student Gender</p>
                  <p className="font-medium">{data.job.studentGender}</p>
                </div>
                <div>
                  <p>Category</p>
                  <p className="font-medium">{data.job.category}</p>
                </div>
                <div>
                  <p>Class</p>
                  <p className="font-medium">{data.job.classLevel}</p>
                </div>
                <div>
                  <p>Salary</p>
                  <p className="font-medium">{data.job.salary} BDT</p>
                </div>
                <div>
                  <p>Preferred Tutor</p>
                  <p className="font-medium">
                    {data.job.tutorGenderPreference}
                  </p>
                </div>
                <div>
                  <p>Tutoring Time</p>
                  <p className="font-medium">{data.job.tutoringTime}</p>
                </div>
                <div>
                  <p>Tutoring Days</p>
                  <p className="font-medium">{data.job.daysPerWeek}</p>
                </div>
                <div>
                  <p>Location</p>
                  <p className="font-medium">{data.job.location}</p>
                </div>
                <div>
                  <p>No. of Students</p>
                  <p className="font-medium">{data.job.studentsNumber || 1}</p>
                </div>
                <div>
                  <p>Subjects</p>
                  <p className="font-medium">
                    {Array.isArray(data.job.subjects)
                      ? data.job.subjects.join(", ")
                      : data.job.subjects}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
