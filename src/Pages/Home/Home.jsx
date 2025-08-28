import React, { useContext } from "react";
import TuitionType from "../../Component/TuitionType/TuitionType";
import ReviewGuardian from "../../Component/ReviewGuardian/ReviewGuardian";
import ReviewTeacher from "../../Component/ReviewTeacher/ReviewTeacher";
import HowToWork from "../../Component/HowToWork/HowToWork";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import AccountCreateGuidens from "../../Component/AccountCreateGuidens/AccountCreateGuidens";

const Home = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="mx-auto px-4 lg:max-w-[60rem] xl:max-w-[71.25rem]">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-2 my-4">
              <div className="my-4 text-black">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold lg:text-4xl">
                    Hire the Right Tutor Today
                  </h1>
                </div>
                <div className="mb-7">
                  <h2 className=" text-xl font-bold text-left text-[rgb(0, 0, 0)]">
                    Book one-on-one lessons with verified tutors in your area
                  </h2>
                </div>
                <Link
                  to={"/hire-tutor"}
                  className="hero_button rounded-xl border border-indigo-500 bg-indigo-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-indigo-500">
                  Hire a Tutor (It’s Free!)
                </Link>
                <div className="m-0 mt-4 flex gap-1 text-gray-500">
                  <p className="text-justify text-[rgb(136, 136, 136)]">
                    Want to become a Tutor?
                  </p>
                  <Link className="font-bold text-indigo-500" to={"/signup"}>
                    Sign Up
                  </Link>
                  <p className="text-justify text-[rgb(136, 136, 136)]">now</p>
                </div>
              </div>

              <div className="hero-images  p-2 lg:p-9 ">
                <div className="flex items-end gap-3">
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="201"
                    height="208"
                    decoding="async"
                    className="img-shadow floating max-w-[9.5rem]  sm:max-w-full"
                    src="/images/img1.webp"
                  />
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="160"
                    height="160"
                    decoding="async"
                    className=" img-shadow max-w-[8.6rem] floating2 sm:max-w-full"
                    src="/images/img2.webp"
                  />
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="160"
                    height="160"
                    decoding="async"
                    className=" img-shadow max-w-[8.6rem] floating2 sm:max-w-full"
                    src="/images/img3.webp"
                  />
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="201"
                    height="208"
                    decoding="async"
                    className=" img-shadow max-w-[9.5rem] floating sm:max-w-full"
                    src="/images/img1.webp"
                  />
                </div>
              </div>
            </div>
          </div>
          <TuitionType></TuitionType>
          <AccountCreateGuidens></AccountCreateGuidens>
          <ReviewTeacher></ReviewTeacher>
          <HowToWork></HowToWork>
          <ReviewGuardian></ReviewGuardian>
        </>
      )}
    </>
  );
};

export default Home;
