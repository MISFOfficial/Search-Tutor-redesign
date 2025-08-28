import HowToWorkCard from "../HowToWorkCard/HowToWorkCard";

const HowToWork = () => {
  return (
    <div className="bg-[#F2F5FC] py-10">
      <div className="mx-auto px-4 lg:max-w-[60rem] xl:max-w-[71.25rem]">
        <div className="">
          <div className="mb-8 mt-4 px-4 text-center">
            <h1 className="text-3xl font-bold text-black md:text-4xl lg:text-3xl">
              How does it work for tutors?
            </h1>
          </div>
          <div className="w-full flex relative">
            <HowToWorkCard
              title="Complete Your Profile"
              image="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/illustration/forTutorSVG/png/tutor02.png"
              description="Complete your profile by including your personal, educational, tuition related and supporting documentation details."
            />
            <div className="w-7/12 rounded-[80px] hidden md:block absolute right-60 -bottom-36 border-t-4 border-r-4 h-60 border-[#117BC3]"></div>
          </div>
          <div className="w-full flex md:justify-end my-16 relative">
            <HowToWorkCard
              title="Apply to Your Desired Tuition Job"
              image="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/illustration/forTutorSVG/png/tutor03.png"
              description="Check the job board everyday and apply on desirable tuition jobs which match with you the most."
            />
            <div className="w-7/12 rounded-[80px] hidden md:block absolute right-60 -bottom-36 border-t-4 border-l-4 h-60 border-[#117BC3]"></div>
          </div>

          <div className="w-full flex">
            <HowToWorkCard
              title="Get Selected"
              image="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/illustration/forTutorSVG/png/tutor04.png"
              description="Get shortlisted from system and selected by the guardian/student based on your provided information in profile."
            />
          </div>
          <div className="w-full flex relative">
            <div className="w-7/12 rounded-[80px] hidden md:block absolute right-60 -bottom-36 border-t-4 border-r-4 h-60 border-[#117BC3]"></div>
          </div>
          <div className="w-full flex md:justify-end my-16 relative">
            <HowToWorkCard
              title="Start Tutoring"
              image="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/illustration/forTutorSVG/png/tutor05.png"
              description="Take the trial classes and confirm your expected tuition job. Happy tutoring!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToWork;
