import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import FAQ_Section from "../../pages/FAQ/FAQ_Section";
import Newsletter from "../../pages/newsletter/Newsletter";
import StudyListHome from "../../pages/studyLIst/StudyListHome";

const slidesData = [
  {
    title: "Start learning from",
    highlight: "best institutions",
    subtitle: "Welcome to Online Education",
    enrolment: "10k Enrolment",
    courseCount: "256+",
    courseType: "CRASH COURSES",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
  {
    title: "Master skills with",
    highlight: "top mentors",
    subtitle: "Learn Anywhere Anytime",
    enrolment: "18k Enrolment",
    courseCount: "320+",
    courseType: "LIVE SESSIONS",
    image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg",
  },
  {
    title: "Upgrade your career ",
    highlight: " with industry experts",
    subtitle: "Career Boost Platform",
    enrolment: "25k Enrolment",
    courseCount: "500+",
    courseType: "PROJECT COURSES",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
  },
];

const HeroSlider = () => {
  return (
    <>
      <div className="w-full bg-base-100 py-10 ">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {slidesData.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left Content */}
                <div className="flex-1 space-y-5">
                  <div className="badge badge-info badge-outline px-4 py-2 text-sm">
                    {slide.subtitle}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    {slide.title} <br />
                    the world’s{" "}
                    <span className="text-cyan-600">{slide.highlight}</span>
                  </h1>
                  <div className="flex items-center gap-5 mt-4">
                    <button className="btn btn-primary btn-lg">
                      Get Started
                    </button>
                    <button className="flex items-center gap-2 text-lg">
                      <FaPlay className="text-green-500" />
                      Watch the video
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="User"
                          />
                        </div>
                      </div>
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="User"
                          />
                        </div>
                      </div>
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src="https://randomuser.me/api/portraits/men/36.jpg"
                            alt="User"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-medium">{slide.enrolment}</p>
                  </div>
                  <p className="text-xl mt-4 font-semibold">
                    Explore <span className="text-teal-600">1350+ Courses</span>{" "}
                    within Subject
                  </p>
                </div>

                {/* Right Content */}
                <div className="flex-1 relative">
                  <img
                    src={slide.image}
                    alt="Slide"
                    className="rounded-xl shadow-lg w-full h-[300px] border-3 object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-3xl font-bold text-teal-600">
                      {slide.courseCount}
                    </h2>
                    <p className="text-sm text-black font-medium">
                      {slide.courseType}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <StudyListHome></StudyListHome>
      {/* <Courses></Courses> */}
      <FAQ_Section></FAQ_Section>
      <Newsletter></Newsletter>
    </>
  );
};

export default HeroSlider;
