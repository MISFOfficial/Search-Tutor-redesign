import { Blend, Boxes, EthernetPort, House, Package2, SmilePlus, SquareLibrary, Star, UserRound } from "lucide-react";
import React from "react";

const TuitionType = () => {
  const tuitions = [
    {
      icon: <UserRound size={60} />,
      count: "100k",
      label: "Active Tutors",
    },
    {
      icon: <Package2 size={60} />,
      count: "1k",
      label: "Live Tuition Jobs",
    },
    {
      icon: <SmilePlus size={60} />,
      count: "100k",
      label: "Happy Students",
    },
    {
      icon: <Star size={60} />,
      count: "4.8/5",
      label: "Average Tutor Rating",
    },
  ];

  const tuitionsDesc = [
    {
      title: "Home Tutoring",
      desc: "Home tutoring allows students to learn various subjects in their own home.",
      icon: <House size={80}/>,
    },
    {
      title: "Group Tutoring",
      desc: "Group tutoring allows students to learn together and solve problems at an affordable cost.",
      icon: <Boxes size={80}/>,
    },
    {
      title: "Online Tutoring",
      desc: "Find the best tutors from anywhere and take online classes by using tools such as Google Meet, Zoom, Skype, and more.",
      icon: <EthernetPort size={80} />,
    },
    {
      title: "Package Tutoring",
      desc: "Package tutoring helps a student to complete their studies within a specific time frame.",
      icon: <SquareLibrary size={80}/>,
    },
    {
      title: "Shadow Tutoring",
      desc: "The tutor will help the student manage school, routine, and simple daily needs.",
      icon: <Blend size={80}/>,
    },
  ];

  return (
    <div className="relative pb-10 md:pb-20">
      <div className="absolute left-0 top-12 w-full h-[95%] bg-[#F2F5FC]"></div>

      <div className="relative z-20 mx-auto w-full  px-4 lg:max-w-[60rem] xl:max-w-[71.25rem]">
        {/* Counter Section */}
        <div className="counter-shadow w-full rounded-3xl bg-indigo-500 mt-5">
          <div className="px-6 pb-8 pt-10 md:px-12 xl:px-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {tuitions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-center gap-9 lg:justify-between lg:gap-6 xl:gap-8">
                  {/* <img
                    src={`https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/landing_page/${item.icon}`}
                    alt={item.label}
                    loading="lazy"
                    className="w-[80px] h-auto"
                  /> */}
                  <h1 className="text-white  h-auto">{item.icon}</h1>
                  <div className="w-1/2">
                    <p className="text-[2.125rem] font-semibold text-white">
                      {item.count}
                    </p>
                    <p className="text-sm text-white">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tuition Types */}
        <div className="mt-14">
          <h1 className="text-center text-3xl font-bold text-black md:text-4xl lg:text-3xl">
            Tuition Types
          </h1>

          <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7 w-full">
            {tuitionsDesc.map((item, index) => (
              <div
                key={index}
                className={`flex h-fit gap-6 rounded-2xl border border-primary p-4 transition-all duration-200 ease-in-out hover:border-2 hover:bg-white ${index === 4
                    ? "justify-center mx-auto"
                    : "md:h-[9.5rem] lg:gap-9"
                  }`}>
                {/* <img
                  src={`https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/${item.icon}`}
                  alt={item.title}
                  className="w-[97px] h-auto"
                  loading="lazy"
                /> */}
                <h1 className="text-[#0675c1]  h-auto">{item.icon}</h1>
                <div>
                  <h2 className="mb-3 text-xl font-bold text-[#0675c1]">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[#888] text-justify">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionType;
