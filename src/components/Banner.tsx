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
        <SwiperSlide className="flex items-center justify-center text-lg text-center">
          <img
            src="/assets/banner01_promocao.png"
            alt="Slide de imagem"
            className="block object-cover max-w-full max-h-full"
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center text-lg text-center">
          <img
            src="/assets/banner02_promocao.png"
            alt="Slide de imagem"
            className="block object-cover max-w-full max-h-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
