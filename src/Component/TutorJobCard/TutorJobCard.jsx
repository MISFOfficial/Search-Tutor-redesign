// components/TutorJobCard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Clock, Trash2, Share2, Pencil } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import JobPostTime from "../JobPostTime/JobPostTime";

const TutorJobCard = ({ job, onDelete, isAdmin, refetch }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasApplied, setHasApplied] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedJob, setUpdatedJob] = useState();

  // Fetch if user has applied
  useEffect(() => {
    // If either is missing, ensure we don’t show “true” from a prior job
    if (!user || !job._id) {
      setHasApplied(false);
      return;
    }

    axiosInstance
      .get("/applications/check", {
        params: { jobId: job._id, userId: user.uid },
      })
      .then((res) => {
        setHasApplied(res.data.hasApplied);
      })
      .catch((err) => {
        console.error("Error checking application:", err);
        setHasApplied(false);
      })
      .finally(() => {
        // setCheckingApplication(false);
      });
  }, [user, job._id]);

  const handleApply = async () => {
    if (!user) {
      return navigate("/signin");
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, apply now!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.post("/applications", {
          jobId: job._id,
          userId: user.uid,
          userEmail: user.email,
        });

        if (res.data.success) {
          await Swal.fire({
            icon: "success",
            title: "Application submitted!",
            showConfirmButton: false,
            timer: 1500,
          });
          setHasApplied(true);
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.error || "Error submitting application",
        });
      }
    }
  };

  const handleShare = (job) => {
    const shareUrl = `${window.location.origin}/job/${job._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: job.title,
          text: "Check out this tutor job!",
          url: shareUrl,
        })
        .catch((err) => console.error("Error sharing", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleUpdate = (job) => {
    if (!user) {
      return navigate("/signin");
    }
    // console.log(job)
    setUpdatedJob(job); // preload current job
    setIsUpdateModalOpen(true);
  }

  console.log(updatedJob?.status)
  console.log(updatedJob)

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    const form = e.target;

    const { _id } = updatedJob

    const reason = form.reason.value;
    const comments = form.comments.value; // ✅ match the "name"

    if (!comments) {
      return Swal.fire({
        icon: 'error',
        title: 'Please Put the notes',
        showConfirmButton: false,
        timer: 1000
      })
    }

    const updateData = {
      reason,
      comments,
    };

    try {
      const res = await axiosInstance.put(
        `/applications/${_id}`, // <-- application._id from your fetched data
        updateData
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Application status updated successfully.",
        });
        setIsUpdateModalOpen(false);
        refetch()
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <>
      {/* ================= MODAL ================= */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Update Job</h2>

            <div className="space-y-3 mb-5">
              <h1>{updatedJob?.title}</h1>
            </div>

            {updatedJob?.status ? <div className="flex flex-col gap-3">
              <h1 className="border border-blue-600 p-2 rounded-lg
              ">{updatedJob?.status}</h1>
              <h1 className="border border-blue-600 p-2 rounded-lg 
              ">{updatedJob?.feedback}</h1>
              <button type="button"
                onClick={() => setIsUpdateModalOpen(false)}
                className="btn w-fit border-2 border-blue-600"
              >
                Close
              </button>
            </div> : <form onSubmit={handleUpdateJob}>
              <select
                value={updatedJob.status || ''}
                name="reason"
                className="w-full border-2 border-blue-600 p-2 rounded bg-transparent mb-3"
              >
                <option value="Appointed">Appointed</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
              </select>
              <textarea
                placeholder="set the feedback or the reason"
                className="border-2 border-blue-600 rounded-lg w-full h-40 p-2" name="comments">
              </textarea>

              <div className="flex items-center gap-2">
                <button type="submit" className="btn bg-blue-600 text-white">Submit</button>
                <button type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="btn border-2 border-blue-600"
                >
                  Close
                </button>
              </div>
            </form>}

          </div>
        </div>
      )}

      <div className="relative  rounded-xl border border-[rgba(6,53,85,0.16)] bg-white p-4 lg:p-6 shadow transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg  max-w-xl">
        <div className="text-[#8c8484]">
          <h3 className="mb-3 text-xl font-semibold text-[#2b2b2c] ">
            {job.title}{" "}
            <span className="badge">
              <p className="text-[12px] flex items-center justify-end gap-1 text-gray-500">
                <Clock size={14} className="text-gray-400" />
                <JobPostTime date={job.dateObj} />
              </p>
            </span>
          </h3>

          <div className="flex items-center gap-4 mb-3">
            <p className="text-[12px] ">
              Job Id : <span className="font-semibold">{job.jobId}</span>
            </p>
            ||
            <p className="text-[12px]">
              Posted Date : <span className="font-semibold">{job.date}</span>
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-sm">
            {/* Tuition Type */}
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="text-[#0675c1]"
                height="15"
                width="15"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path>
              </svg>
              <div>
                <p>Tuition Type</p>
                <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                  {job.type}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M564 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7C422.5 72.1 396.2 64 368 64c-33.7 0-64.6 11.6-89.2 30.9 14 16.7 25 36 32.1 57.1 14.5-14.8 34.7-24 57.1-24 44.1 0 80 35.9 80 80s-35.9 80-80 80c-22.3 0-42.6-9.2-57.1-24-7.1 21.1-18 40.4-32.1 57.1 24.5 19.4 55.5 30.9 89.2 30.9 79.5 0 144-64.5 144-144 0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.4 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12V12c0-6.6-5.4-12-12-12zM144 64C64.5 64 0 128.5 0 208c0 68.5 47.9 125.9 112 140.4V400H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.6 112-71.9 112-140.4 0-79.5-64.5-144-144-144zm0 224c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
              </svg>
              <div>
                <p>Student Gender</p>
                <p className="text-nowrap font-medium text-[#5c5c5c]">
                  {job.studentGender}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="text-[#0675c1]"
                height="15"
                width="15"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path>
              </svg>
              <div>
                <p>Category</p>
                <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                  {job.category}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M564 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7C422.5 72.1 396.2 64 368 64c-33.7 0-64.6 11.6-89.2 30.9 14 16.7 25 36 32.1 57.1 14.5-14.8 34.7-24 57.1-24 44.1 0 80 35.9 80 80s-35.9 80-80 80c-22.3 0-42.6-9.2-57.1-24-7.1 21.1-18 40.4-32.1 57.1 24.5 19.4 55.5 30.9 89.2 30.9 79.5 0 144-64.5 144-144 0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.4 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12V12c0-6.6-5.4-12-12-12zM144 64C64.5 64 0 128.5 0 208c0 68.5 47.9 125.9 112 140.4V400H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.6 112-71.9 112-140.4 0-79.5-64.5-144-144-144zm0 224c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
              </svg>
              <div>
                <p>Class</p>
                <p className="text-nowrap font-medium text-[#5c5c5c]">
                  {job.classLevel}
                </p>
              </div>
            </div>
            <div className="flex gap-2 align-baseline">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M156.8 126.8c37.6 60.6 64.2 113.1 84.3 162.5-8.3 33.8-18.8 66.5-31.3 98.3-13.2-52.3-26.5-101.3-56-148.5 6.5-36.4 2.3-73.6 3-112.3zM109.3 200H16.1c-6.5 0-10.5 7.5-6.5 12.7C51.8 267 81.3 330.5 101.3 400h103.5c-16.2-69.7-38.7-133.7-82.5-193.5-3-4-8-6.5-13-6.5zm47.8-88c68.5 108 130 234.5 138.2 368H409c-12-138-68.4-265-143.2-368H157.1zm251.8-68.5c-1.8-6.8-8.2-11.5-15.2-11.5h-88.3c-5.3 0-9 5-7.8 10.3 13.2 46.5 22.3 95.5 26.5 146 48.2 86.2 79.7 178.3 90.6 270.8 15.8-60.5 25.3-133.5 25.3-203 0-73.6-12.1-145.1-31.1-212.6z"></path>
              </svg>
              <div>
                <p>Salary</p>
                <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                  {!job.salary || isNaN(Number(job.salary))
                    ? "আলোচনা সাপেক্ষে"
                    : `${job.salary} BDT`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M564 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7C422.5 72.1 396.2 64 368 64c-33.7 0-64.6 11.6-89.2 30.9 14 16.7 25 36 32.1 57.1 14.5-14.8 34.7-24 57.1-24 44.1 0 80 35.9 80 80s-35.9 80-80 80c-22.3 0-42.6-9.2-57.1-24-7.1 21.1-18 40.4-32.1 57.1 24.5 19.4 55.5 30.9 89.2 30.9 79.5 0 144-64.5 144-144 0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.4 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12V12c0-6.6-5.4-12-12-12zM144 64C64.5 64 0 128.5 0 208c0 68.5 47.9 125.9 112 140.4V400H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.6 112-71.9 112-140.4 0-79.5-64.5-144-144-144zm0 224c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
              </svg>
              <div>
                <p>Preferred Tutor</p>
                <p className="text-nowrap font-medium text-[#5c5c5c]">
                  {job.tutorGenderPreference}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16.5 12"></polyline>
              </svg>
              <div>
                <p>Tutoring Time</p>
                <p className="text-nowrap font-medium text-[#5c5c5c]">
                  {job.tutoringTime}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
              </svg>
              <div>
                <p>Tutoring Days</p>
                <p className="text-nowrap font-medium text-[#5c5c5c]">
                  {job.daysPerWeek}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64z"></path>
              </svg>
              <div>
                <p>Location</p>
                <p className="font-medium text-[#5c5c5c]">{job.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
              </svg>
              <div>
                <p>No. of Students</p>
                <p className="text-nowrap font-medium text-[#5c5c5c]">1</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="mt-1 text-[#0675c1]"
                height="14"
                width="14"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path>
              </svg>
              <div>
                <p>Subjects</p>
                <p className="font-medium text-[#5c5c5c]">
                  {job.subjects.join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 flex  items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Link>
                <button
                  disabled={hasApplied}
                  onClick={handleApply}
                  className="  rounded-md text-sm font-medium  transition-all duration-300  border border-transparent bg-indigo-500 text-white hover:border-indigo-500 hover:bg-white hover:text-indigo-500 h-10 px-4 py-2 relative overflow-hidden"
                  type="button">
                  {hasApplied ? "Already Applied" : "Apply"}
                </button>
              </Link>
              {/* Update Button */}
              {isAdmin && (
                <button
                  onClick={() => handleUpdate(job)}
                  className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
                  <Pencil size={14} />
                  Update
                </button>
              )}

            </div>
            <div className="">
              <button
                onClick={() => handleShare(job)}
                className="mr-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium hover:bg-gray-100 py-2 h-8 px-3 text-sm text-gray-600 gap-1">
                <Share2 size={15} className="me-1.5" />
                Share
              </button>
              {isAdmin && (
                <button
                  onClick={() => onDelete(job._id)}
                  className=" text-red-500 hover:text-red-700 p-2 "
                  title="Delete Job">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorJobCard;
