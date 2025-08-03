import React from "react";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import useSecureAxios from "../../useAxois/useSecureAxios/useSecureAxios";
import Loading from "../../components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const StudyListHome = () => {
  const axiosSecure = useSecureAxios();
  const {
    data: sessions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        "/study_session?status=approved&limit=6"
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-4xl text-center font-bold text-[#00E1FF] mb-6">
        Explore Featured Courses
      </h1>
      <div className="w-full">
        <Swiper
          centeredSlides={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {sessions.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className=" bg-white rounded-lg">
                <img
                  src={slide.imageURL}
                  alt={slide.sessionTitle}
                  className="w-full h-48 transition-all duration-300 ease-in-out  hover:scale-110 hover:shadow-lg object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl w-full h-14 text-black font-bold  leading-snug line-clamp-2 mb-2">
                    {slide.sessionTitle}
                  </h2>
                  {/* <p className="text-gray-700 mb-3 line-clamp-3">{sessionDescription}</p> */}
                  <div className="flex items-center mb-3">
                    <img
                      src={slide.tutorImag}
                      alt={slide.tutorName}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#00E1FF]">
                        {slide.tutorName}
                      </p>
                      <p className="text-[#00E1FF] flex items-center gap-1">
                        <FaStar /> {slide.averageRating}
                      </p>
                    </div>
                  </div>
                  <hr className="border opacity-5 mb-4 border-black" />
                  <div className="mb-3 flex items-center justify-between text-sm text-gray-600 space-y-1">
                    <button className="text-2xl">
                      {slide.registrationFee === 0
                        ? "Free"
                        : `$${slide.registrationFee}`}
                    </button>
                    {/* <button className="text-2xl">
                      {slide.isUpcoming
                        ? "Upcoming"
                        : slide.isClosed
                        ? "Recorded Session"
                        : "Ongoing"}
                    </button> */}
                  </div>
                  <Link
                    to={`/study_session/${slide._id}`}
                    className="btn btn-outline hover:border-[#07A698] hover:bg-white text-black font-semibold  transition w-full"
                  >
                    Enroll Now
                  </Link>

                  {/* Book Now Button */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StudyListHome;
