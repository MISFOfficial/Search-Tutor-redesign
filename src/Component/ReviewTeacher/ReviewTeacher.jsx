import React from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const ReviewTeacher = () => {
  return (
    <div>
      <div className="mb-4 px-4 mt-8">
        <h1 className=" text-3xl font-bold md:text-4xl lg:text-3xl text-center text-black">
          What Some Awesome Tutor Says about Us
        </h1>
      </div>
      <p className="text-center text-[#888888]">
        Hire a tutor today and start learning!
      </p>
      <Link
        to={"/hire-tutor"}
        className="group mx-auto my-4 flex w-fit items-center justify-center gap-5 rounded-xl border border-indigo-500 bg-indigo-500 px-8 py-3 text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-indigo-500">
        Hire a Tutor
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          className="ml-1 transition-all duration-500 ease-out group-hover:translate-x-2"
          height="1em"
          width="1em"
          xmlns="https://www.w3.org/2000/svg">
          <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
        </svg>
      </Link>

      <div className="mx-auto px-4 lg:max-w-[60rem] xl:max-w-[71.25rem] mb-8 mt-4">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1.5, // On mobile (0px and up)
            },
            768: {
              slidesPerView: 2.5, // On tablets
            },
            1024: {
              slidesPerView: 3, // On desktops
            },
          }}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          speed={3000}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper">
          <SwiperSlide>
            <img src="/images/review1.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/review2.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/review3.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/review1.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/review2.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/review3.webp" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewTeacher;
