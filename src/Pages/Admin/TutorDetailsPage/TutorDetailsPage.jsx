import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import ImagePreview from "../../../Component/ImagePreview/ImagePreview";
import AdminNoteCard from "../../../Component/AdminNoteCard/AdminNoteCard";

const TutorDetailsPage = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axiosInstance.get(`/users/${uid}`);
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch tutor data");
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUser();
    }
  }, [uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-red-500">Tutor not found</div>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
      <div className="flex items-start flex-col md:flex-row lg:flex-row gap-4 w-full">
        {/* Sidebar 1*/}
        <div className="flex flex-col gap-4 w-full lg:w-[40%]">
          <div className="rounded-xl bg-white border border-indigo-100 shadow-md p-4 pb-8 text-center mb-4 ">
            <div className="flex justify-center">
              <div className=" relative size-fit min-w-[100px]">
                <img
                  alt={
                    user?.name || (
                      <span className="text-red-600">Not Given</span>
                    )
                  }
                  className="w-36 h-36 object-cover shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full"
                  src={
                    user?.image ||
                    "	https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Profile-Picture.png"
                  }
                />
              </div>
            </div>
            <div className="mt-2 text-center">
              <h2 className="flex gap-2 text-xl font-bold items-center justify-center lg:text-2xl">
                <span className="w-full md:w-fit flex items-center justify-center gap-2">
                  {user?.name || (
                    <span className="text-red-600">Not Given</span>
                  )}{" "}
                  {user.isVerified && !user.isRedVerified && (
                    <div className=" ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/15050/15050690.png"
                        alt="verified"
                        className="w-7 h-7 object-cover"
                      />
                    </div>
                  )}
                  {user.isRedVerified && !user.isVerified && (
                    <div>
                      <img
                        src="https://img.icons8.com/?size=30&id=99285&format=png"
                        srcSet="https://img.icons8.com/?size=30&id=99285&format=png 1x,https://img.icons8.com/?size=60&id=99285 format=png 2x"
                        alt="Red Verified Badge"
                        className="w-7 h-7 object-cover"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(19%) sepia(89%) saturate(6975%) hue-rotate(1deg) brightness(95%) contrast(122%)",
                        }}
                      />
                    </div>
                  )}
                </span>
              </h2>
              {/* <p className="my-1 font-bold text-[rgba(34,34,34,0.5)] text-xs lg:my-2">
              Guardian / Student ID: 405284
            </p> */}
            </div>
            <div className="mb-2 mt-4 text-left block">
              <p className="flex items-center gap-2 font-bold">
                <Mail size={16} />
                Email
              </p>
              <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
                {user?.email || <span className="text-red-600">Not Given</span>}
              </p>
            </div>
            <div className="mb-2 mt-4 text-left block">
              <p className="flex items-center gap-2 font-bold">
                <Phone size={16} />
                Phone Number
              </p>

              <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
                {user?.phone || <span className="text-red-600">Not Given</span>}
              </p>
            </div>
            <div className="mb-2 mt-4 text-left block">
              <p className="flex items-center gap-2 font-bold">
                <MapPin size={16} />
                Address
              </p>
              <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
                {user?.location || (
                  <span className="text-red-600">Not Given</span>
                )}
                ,{" "}
                {user?.city || <span className="text-red-600">Not Given</span>}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-indigo-100 shadow-md p-4 pb-8 text-center mb-4 ">
            <AdminNoteCard user={user} />
          </div>
        </div>

        {/* Sidebar 2*/}
        <div className="rounded-2xl bg-white border border-indigo-100 shadow-md p-4 pb-8 md:p-6 w-full lg:w-[60%]">
          <div className="md:px-3">
            {/* Personal Information */}
            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="mt-3 space-y-1 text-sm text-[rgba(34,34,34,0.5)] md:ms-9">
                <div className="space-y-1">
                  <p className="flex border-y border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Name
                    </strong>

                    {user?.name || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Contact Number
                    </strong>

                    {user?.phone || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Whatsapp Number
                    </strong>

                    {user?.whatsapp || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  {/* <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Email
                    </strong>

                    <span className="break-words text-[12px]">
                      {user?.email || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p> */}
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Gender
                    </strong>

                    <span className="capitalize">
                      {user?.gender || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Facebook Profile Link
                    </strong>
                    {user?.fbLink ? (
                      <a
                        href={user?.fbLink}
                        target="blank"
                        className="text-blue-500 font-medium">
                        Link
                      </a>
                    ) : (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      City
                    </strong>
                    {user?.city || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Address
                    </strong>
                    {user?.location || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Eduction */}
            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <GraduationCap className="w-6 h-6" />
                Educational Information
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm text-[rgba(34,34,34,0.5)] md:ms-9 ">
                <div className="space-y-1 ">
                  <p className="flex border-y border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Current Institute
                    </strong>

                    {user?.institute || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  {/* <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      ID Card No
                    </strong>

                    {user?.idNo || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p> */}
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Department
                    </strong>

                    {user?.department || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Session
                    </strong>

                    {user?.degree || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Year
                    </strong>

                    {user?.passingYear || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Experience
                    </strong>

                    {user?.experience || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <LayoutDashboard className="w-6 h-6" />
                Platform charge
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm text-[rgba(34,34,34,0.5)] md:ms-9 ">
                <div className="space-y-1 ">
                  <p className="text-sm text-gray-500 italic mb-1 mt-[-0.5rem]">
                    আমাদের রুলস হচ্ছে টিউশন কনফার্ম হওয়ার ৫-৭ দিনের মধ্যে বেতনের
                    ৬০% টাকা পেমেন্ট করতে হবে। ( শুধুই প্রথম মাস )
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      সম্মতি
                    </strong>

                    {user?.agreement || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <ShieldCheck className="w-5 h-5" />
                Verification & Security
              </h2>
            </div>

            <div className="mt-4 flex flex-col md:flex-row lg:flex-row gap-4 items-center ">
              {user?.nid && <ImagePreview src={user?.nid} label="NID" />}
              {user?.idCard && (
                <ImagePreview src={user?.idCard} label="Student ID CARD" />
              )}
            </div>
            {!(user.nid || user.idCard) && (
              <p className="text-red-600 text-sm mt-4 md:ms-8">
                You have not uploaded any credentials yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
