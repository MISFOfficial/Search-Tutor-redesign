import React, { useContext, useEffect, useState } from "react";
import TutorJobCard from "../../Component/TutorJobCard/TutorJobCard";
import axiosInstance from "../../utils/axiosInstance";
import Select from "react-dropdown-select";
import cityOptions from "../../assets/cityOptions.json";
import { AuthContext } from "../../providers/AuthProvider";
import Pagination from "../../Component/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const JobBoard = () => {
  const { userInfo } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const cityFromUrl = searchParams.get("city") || "";
  const searchFromUrl = searchParams.get("search") || "";

  const [selectedCity, setSelectedCity] = useState(
    cityFromUrl ? [{ value: cityFromUrl, label: cityFromUrl }] : []
  );
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);

  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance
      .get("/jobs", {
        params: {
          page: pageFromUrl,
          limit: itemsPerPage,
          city: cityFromUrl || undefined,
          search: searchFromUrl || undefined,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setJobs(res.data.data);
          setTotalPages(res.data.totalPages);
          setTotalJobs(res.data.totalJobs);
        } else {
          setError("Failed to load jobs");
          setJobs([]);
          setTotalPages(1);
          setTotalJobs(0);
        }
      })
      .catch(() => {
        setError("Error fetching jobs");
        setJobs([]);
        setTotalPages(1);
        setTotalJobs(0);
      })
      .finally(() => setLoading(false));
  }, [pageFromUrl, cityFromUrl, searchFromUrl]);

  const handleCityChange = (values) => {
    setSelectedCity(values);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (values.length > 0) {
        params.set("city", values[0].value);
      } else {
        params.delete("city");
      }
      params.set("page", "1");
      if (searchTerm) {
        params.set("search", searchTerm);
      }
      return params;
    });
  };

  const handleSearchSubmit = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      if (selectedCity.length > 0) {
        params.set("city", selectedCity[0].value);
      } else {
        params.delete("city");
      }
      return params;
    });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCity([]);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("search");
      params.delete("city");
      params.set("page", "1");
      return params;
    });
  };

  const handleDeleteJob = async (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/jobs/${jobId}`);
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
          setTotalJobs((prev) => prev - 1);

          Swal.fire({
            title: "Deleted!",
            text: "The job has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Failed to delete job", error);
          Swal.fire(
            "Error!",
            "Failed to delete job. Please try again.",
            "error"
          );
        }
      }
    });
  };

  // const handleSearchChange = (e) => {
  //   const val = e.target.value;
  //   setSearchTerm(val);

  //   setSearchParams((prev) => {
  //     const params = new URLSearchParams(prev);
  //     if (val) {
  //       params.set("search", val);
  //     } else {
  //       params.delete("search");
  //     }
  //     params.set("page", "1");
  //     if (selectedCity.length > 0) {
  //       params.set("city", selectedCity[0].value);
  //     }
  //     return params;
  //   });
  // };

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page);
      if (selectedCity.length > 0) {
        params.set("city", selectedCity[0].value);
      } else {
        params.delete("city");
      }
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      return params;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="bg-[#F2F5FC]">
      <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem]">
        <div
          className="px-4 lg:px-8 py-4"
          style={{ boxShadow: "0 8px 6px -6px #0675c140" }}>
          <div className="flex items-center justify-between py-1 md:py-0">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-indigo-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"></path>
              </svg>
              <p className="text-[#888]">
                <span className="font-semibold">{totalJobs}</span> jobs
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Filter by City:
              </label>
              <Select
                options={cityOptions}
                placeholder="Select city"
                values={selectedCity}
                onChange={handleCityChange}
                clearable
                style={{ width: "200px" }}
              />
            </div>
          </div>
        </div>

        <br />

        {/* {userInfo?.accountType === "admin" && (
          <div className="pl-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Search by Job ID:
            </label>
            <input
              type="text"
              placeholder="Enter Job ID"
              value={searchTerm}
              onClick={handleSearchChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm w-[200px]"
            />
          </div>
        )} */}
        {userInfo?.accountType === "admin" && (
          <div className="p-4">
            <div className="flex items-center gap-2">
              <input
                name="jobId"
                type="text"
                placeholder="Enter Job ID"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm w-[200px]"
              />
              <button
                onClick={handleSearchSubmit}
                className="btn btn-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
                Search
              </button>
              <button
                onClick={handleClearFilters}
                className="btn btn-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Job Cards */}
        {jobs.length === 0 ? (
          <p className="text-center p-4">No jobs found.</p>
        ) : (
          <div className="px-4 py-4 lg:py-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
              {jobs.map((job) => (
                <TutorJobCard
                  key={job._id}
                  job={job}
                  onDelete={handleDeleteJob}
                  isAdmin={userInfo?.accountType === "admin"}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={pageFromUrl}
          setCurrentPage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default JobBoard;
