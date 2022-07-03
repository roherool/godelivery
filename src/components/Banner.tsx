import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

export function Banner() {
  return (
    <div className="m-6">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full h-full rounded-lg shadow-md"
      >
        <SwiperSlide className="flex items-center justify-center text-lg text-center bg-gray-300">
          <img
            src="/vercel.svg"
            alt="Slide de imagem"
            className="block object-cover w-full h-40"
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center text-lg text-center bg-red-300">
          <img
            src="/vercel.svg"
            alt="Slide de imagem"
            className="block object-cover w-full h-40"
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center text-lg text-center bg-orange-400">
          <img
            src="/vercel.svg"
            alt="Slide de imagem"
            className="block object-cover w-full h-40"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
