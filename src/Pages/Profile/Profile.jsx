import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import {
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  GraduationCap,
  Camera,
  LayoutDashboard,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import UploadBox from "../../Component/UploadBox/UploadBox";
import UploadingPreview from "../../Component/UploadingPreview/UploadingPreview";
import ImagePreview from "../../Component/ImagePreview/ImagePreview";
import axiosInstance from "../../utils/axiosInstance";
import AccountCreateGuidens from "../../Component/AccountCreateGuidens/AccountCreateGuidens";

const Profile = () => {
  const { user, userInfo, loading, setUserData, sendVerificationEmail } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [nidUploading, setNidUploading] = useState(false);
  const [idCardUploading, setIdCardUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    gender: "",
    city: "",
    location: "",
    fbLink: "",
    institute: "",
    // idNo: "",
    department: "",
    degree: "",
    passingYear: "",
    experience: "",
    agreement: "",
    image: "",
    nid: "",
    idCard: "",
    adminNote: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        whatsapp: userInfo.whatsapp || "",
        gender: userInfo.gender || "",
        city: userInfo.city || "",
        location: userInfo.location || "",
        fbLink: userInfo.fbLink || "",
        institute: userInfo.institute || "",
        // idNo: userInfo.idNo || "",
        department: userInfo.department || "",
        degree: userInfo.degree || "",
        passingYear: userInfo.passingYear || "",
        experience: userInfo.experience || "",
        agreement: userInfo.agreement || "",
        image: userInfo.image || "",
        nid: userInfo.nid || "",
        idCard: userInfo.idCard || "",
        isVerified: userInfo.isVerified || "",
        adminNote: userInfo.adminNote || "",
      });
    }
  }, [userInfo]);

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    const result = await sendVerificationEmail();
    setIsVerifying(false);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Verification Email Sent",
        text: "Please check your inbox and verify your email.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      closeModal();
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to Send Verification",
        text: result.error?.message || "Something went wrong.",
      });
    }
  };

  if (loading || !userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Upload image to Cloudinary, update formData with the URL
  const uploadImage = async (file, fieldName) => {
    if (!file) return;

    // Uploading স্টেট সেট করা
    if (fieldName === "nid") setNidUploading(true);
    else if (fieldName === "idCard") setIdCardUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "user_profile_img");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvrn8ytwm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const fileData = await res.json();
      if (fileData.secure_url) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: fileData.secure_url,
        }));
        // Swal.fire({
        //   icon: "success",
        //   title: `${fieldName === "image" ? "Profile" : "NID"} image uploaded!`,
        //   timer: 1500,
        //   showConfirmButton: false,
        // });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: "Please try again.",
      });
    } finally {
      if (fieldName === "nid") setNidUploading(false);
      else if (fieldName === "idCard") setIdCardUploading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file, "image");
  };

  const handleNidImageChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file, "nid");
  };

  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file, "idCard");
  };

  // Save all changes to backend
  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch(
        `/users/${userInfo.uid}`,
        formData
      );

      const updatedUser = response.data;

      // Update global userInfo in context
      setUserData(updatedUser);

      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.message || "Failed to update profile",
      });
    }
  };

  if (loading || !userInfo) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
      <div className="flex items-start flex-col md:flex-row lg:flex-row gap-4 w-full">
        {/* Sidebar */}
        <div className="flex flex-col gap-4 w-full lg:w-[40%]">
          <div className="rounded-xl bg-white border border-indigo-100 shadow-md p-4 pb-8 text-center mb-4 ">
            <div className="flex justify-center">
              <div className=" relative size-fit min-w-[100px]">
                <img
                  alt={formData?.name}
                  className="w-36 h-36 object-cover shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full"
                  src={
                    formData?.image ||
                    "https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Profile-Picture.png"
                  }
                />

                {isEditing && (
                  <>
                    {/* Hidden File Input */}
                    <input
                      id="profileImageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />

                    {/* Edit Icon */}
                    <label
                      htmlFor="profileImageUpload"
                      className="absolute bottom-0 right-0 cursor-pointer"
                      title="Change Profile Picture">
                      <div className="flex size-[2.1rem] items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-white shadow-md hover:bg-indigo-600 transition">
                        <Camera size={18} />
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <div className="mt-2 text-center">
              <h2 className="flex gap-2 text-xl font-bold items-center justify-center lg:text-2xl">
                <span className="w-full md:w-fit flex items-center justify-center gap-2">
                  {formData?.name || (
                    <span className="text-red-600">Not Given</span>
                  )}{" "}
                  {formData.isVerified && !formData.isRedVerified && (
                    <div className=" ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/15050/15050690.png"
                        alt="verified"
                        className="w-7 h-7 object-cover"
                      />
                    </div>
                  )}
                  {formData.isRedVerified && !formData.isVerified && (
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
              <button onClick={handleEditToggle} className="btn w-full my-4">
                {isEditing ? "Cancel" : "Edit Information"}
              </button>
              {isEditing && (
                <button onClick={handleSave} className="btn w-full ">
                  Save Changes
                </button>
              )}
            </div>
            <div className="mb-2 mt-4 text-left block">
              <p className="flex items-center gap-2 font-bold">
                <Mail size={16} />
                Email
              </p>
              <p className="ms-6 mt-1 text-sm font-semibold text-[rgba(34,34,34,0.5)] flex items-center gap-2">
                {formData.email || "No data found"}
                {user.emailVerified ? (
                  <span className="badge  badge-success badge-outline badge-sm cursor-default select-none flex items-center gap-1">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                ) : (
                  <button
                    onClick={openModal}
                    className="badge badge-error badge-outline badge-sm cursor-pointer hover:bg-error-focus transition text-[8px] md:text-[12px] lg:text-[12px]"
                    title="Click to verify email"
                    disabled={isVerifying}>
                    {isVerifying ? "Sending..." : "Not Verified"}
                  </button>
                )}
              </p>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-md p-6 max-w-sm w-full shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Verify Your Email
                  </h3>
                  <p className="mb-6">
                    Do you want to send a verification link to <br />
                    <strong>{formData.email}</strong>?
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                      disabled={isVerifying}>
                      Cancel
                    </button>
                    <button
                      onClick={handleVerifyEmail}
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                      disabled={isVerifying}>
                      {isVerifying ? "Sending..." : "Send Verification"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <Mail size={16} />
              Email
            </p>
            <p className="ms-6 mt-1 text-sm font-semibold text-[rgba(34,34,34,0.5)] flex items-center gap-2">
              {formData.email || "No data found"}
              {formData.emailVerified ? (
                <span className="badge badge-neutral badge-outline badge-sm cursor-default select-none">
                  Verified
                </span>
              ) : (
                <button
                  className="badge badge-error badge-outline badge-sm cursor-pointer hover:bg-error-focus transition"
                  title="Click to verify email">
                  Not Verified
                </button>
              )}
            </p>
          </div> */}

            <div className="mb-2 mt-4 text-left block">
              <p className="flex items-center gap-2 font-bold">
                <Phone size={16} />
                Phone Number
              </p>

              <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
                {formData.phone || "No data found"}
              </p>
            </div>
            <div className="mb-2 mt-4 text-left block">
              <p className="flex items-center gap-2 font-bold">
                <MapPin size={16} />
                Address
              </p>
              <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
                {formData.location || "No data found"},{" "}
                {formData.city || "No data found"}
              </p>
            </div>
          </div>
          <div>
            <AccountCreateGuidens></AccountCreateGuidens>
          </div>
        </div>
        {/* Sidebar end */}
        <div className="rounded-2xl bg-white border border-indigo-100 shadow-md p-4 pb-8 md:p-6 w-full lg:w-[60%]">
          <div className="md:px-3">
            {/* profile persentage */}
            <div className="">
              <h1 className="font-bold">Profile Complete %</h1>
              <div className="flex items-center gap-2">
                <progress class="progress progress-info w-full" value="20" max="100"></progress>
                <h1>20%</h1>
                <button onClick={handleEditToggle} className="btn w-fit my-4">
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && (
                  <button onClick={handleSave} className="btn w-fit ">
                    Save
                  </button>
                )}
              </div>
            </div>
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

                    {formData.name || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Contact Number
                    </strong>

                    {formData.phone || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>

                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Whatsapp Number
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full border-b border-black/50 focus:border-b-2 focus:outline-none"
                        type="tel"
                        name="whatsapp"
                        placeholder="Enter whatsapp number"
                      />
                    ) : (
                      <>
                        {formData.whatsapp || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  {/* <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Email
                    </strong>

                    <span className="break-words text-[12px]">
                      {formData.email || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p> */}
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Gender
                    </strong>

                    <span className="capitalize">
                      {formData.gender || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Facebook Profile Link
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.fbLink}
                        onChange={handleChange}
                        className="w-full border-b border-black/50 focus:border-b-2 focus:outline-none"
                        type="text"
                        name="fbLink"
                        placeholder="Enter Facebook URL"
                      />
                    ) : (
                      <>
                        {formData.fbLink ? (
                          <a
                            href={formData.fbLink}
                            className="text-blue-500 font-medium"
                            target="_blank"
                            rel="noopener noreferrer">
                            Link
                          </a>
                        ) : (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      City
                    </strong>

                    {formData.city || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>

                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Address
                    </strong>

                    {formData.location || (
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

                    {isEditing ? (
                      <input
                        value={formData.institute}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="institute"
                        placeholder="Enter your current institute"
                      />
                    ) : (
                      <>
                        {formData.institute || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  {/* <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      ID Card No
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.idNo}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="idNo"
                        placeholder="Enter your ID card number"
                      />
                    ) : (
                      <>
                        {formData?.idNo || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p> */}
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Department
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="department"
                        placeholder="Enter your department or class"
                      />
                    ) : (
                      <>
                        {formData?.department || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Session
                    </strong>
                    {isEditing ? (
                      <input
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="degree"
                        placeholder="Enter your session"
                      />
                    ) : (
                      <>
                        {formData.degree || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Year
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.passingYear}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="passingYear"
                        placeholder="Enter your current year of study"
                      />
                    ) : (
                      <>
                        {formData.passingYear || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Experience
                    </strong>
                    {isEditing ? (
                      <input
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full border-b border-black/50 focus:border-b-2 focus:outline-none"
                        type="text"
                        name="experience"
                        placeholder="e.g. 2 years home tutoring"
                      />
                    ) : (
                      <>
                        {formData.experience || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
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
                    {isEditing ? (
                      <div className="flex gap-6">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="agreement"
                            value="রাজি"
                            checked={formData.agreement === "রাজি"}
                            onChange={handleChange}
                          />
                          রাজি
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="agreement"
                            value="রাজি না"
                            checked={formData.agreement === "রাজি না"}
                            onChange={handleChange}
                          />
                          রাজি না
                        </label>
                      </div>
                    ) : (
                      <span>
                        {formData.agreement || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </span>
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

            <div className="mt-4 flex flex-col md:flex-row lg:flex-row gap-4  items-center ">
              {/* NID Upload */}
              {isEditing && !formData.nid && !nidUploading && (
                <UploadBox
                  id="nidImageUpload"
                  label="NID"
                  onChange={handleNidImageChange}
                />
              )}
              {nidUploading ? (
                <UploadingPreview label="NID" />
              ) : formData.nid ? (
                <ImagePreview src={formData.nid} label="NID" />
              ) : null}

              {/* ID Card Upload */}
              {isEditing && !formData.idCard && !idCardUploading && (
                <UploadBox
                  id="studentIdImageUpload"
                  label="Student ID CARD"
                  onChange={handleIdCardChange}
                />
              )}
              {idCardUploading ? (
                <UploadingPreview label="Student ID CARD" />
              ) : formData.idCard ? (
                <ImagePreview src={formData.idCard} label="Student ID CARD" />
              ) : null}
            </div>

            {!formData.nid &&
              !formData.idCard &&
              !nidUploading &&
              !idCardUploading && (
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

export default Profile;
