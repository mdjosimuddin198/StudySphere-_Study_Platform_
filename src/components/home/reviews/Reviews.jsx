import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxois from "../../../useAxois/useAxois";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const axoisInstece = useAxois();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axoisInstece.get("/reviews");
      return res.data;
    },
  });
  console.log(reviews);
  return (
    <div>
      <h2 className="text-[#00acc1] text-4xl font-bold text-center">
        What Students Say
      </h2>
      <div className="w-full bg-base-100 py-6">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            deley: 3000,
            disableOnInteraction: false,
          }}
          //   loop={true}
        >
          <div className="items-stretch">
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="hero bg-base-200 h-full ">
                  <div className="hero-content h-full  text-center">
                    <div className="max-w-md space-y-3 flex items-center h-full justify-center flex-col">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={review.studentImg}
                        alt=""
                      />
                      <h2 className=" text-2xl font-bold">
                        {review.studentName}
                      </h2>
                      <p className="text-[#00acc1] h-8 overflow-clip font-semibold">
                        Reviewed : {review.sessionTitle}
                      </p>
                      <p className="flex items-center gap-2">
                        {[...Array(review.rating)].map((_, index) => (
                          <FaStar key={index} className="text-yellow-500" />
                        ))}
                      </p>
                      <p className="py-2 h-32 w-full overflow-hidden">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
