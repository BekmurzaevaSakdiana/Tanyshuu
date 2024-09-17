import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function MySwiper() {
  return (
    <div className="all-bg max-w-[1016px] w-full mx-auto mt-0">
      <Swiper
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bgSwiipe h-[80vh] max-w-[1016px] w-full mx-auto pb-10">
            <img className="h-full w-full object-cover" src="/sliderThing.jpg" alt="" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" bgSwiipe h-[80vh] max-w-[1016px] w-full mx-auto pb-10">
            <img className="h-full w-full object-cover" src="/tinder.avif" alt="" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" bgSwiipe h-[80vh] max-w-[1016px] w-full mx-auto pb-10">
            <img className="h-full w-full object-cover" src="/slider.jpg" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
