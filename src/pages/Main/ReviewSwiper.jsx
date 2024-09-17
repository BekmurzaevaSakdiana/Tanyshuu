import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function ReviewSwiper() {
  return (
    <div className="max-w-[1016px] w-full mx-auto mt-12">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="review max-w-[1016px] pb-16 w-full mx-auto max-lg:px-12 ">
            <div className="img__text flex items-center justify-around gap-5 ">
              <div className="img-person max-w-96 w-full ">
                <img
                  className="aspect-[2/1] object-cover w-full max-lg:text-center rounded-md"
                  src="/myBoy.avif"
                  alt=""
                />
              </div>

              <div className="text">
                <h4 className="font-mont text-white font-bold text-2xl mb-3">
                  Асанбек уулу ASAP
                </h4>

                <p className="max-w-[1200px] w-full font-mont text-white ">
                  Хей йоо всем привет! Спасибо большое разрабам этого сайта!
                  Благодаря вам я нашел свою любовь на Lexus, которая старше
                  меня на 20 лет. Никогда бы не подумал, что судьба сведет нас
                  именно здесь. Желаю всем найти свою половинку и быть такими же
                  счастливыми, как мы!
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="max-w-[1016px] pb-16 w-full mx-auto max-lg:px-12  ">
            <div className="img__text flex items-center justify-around gap-5 ">
              <div className="img-person max-w-96 w-full ">
                <img
                  className="aspect-[2/1] object-cover w-full rounded-md"
                  src="/gaga.jpg"
                  alt=""
                />
              </div>

              <div className="text">
                <h4 className="font-mont text-white font-bold text-2xl mb-3">
                  Тойчубекова Gaga
                </h4>

                <p className="max-w-[1200px] w-full font-mon text-white">
                  Всем привет! Я всегда интересовалась кыргызами, и благодаря
                  этому сайту я нашла своего кыргызского джигита. Сейчас у нас
                  все хорошо. Мы поженились, и я взяла фамилию мужа. Каждый день
                  мы узнаем что-то новое друг о друге и наслаждаемся жизнью
                  вместе. Спасибо этому сайту за возможность встретить свою
                  любовь и обрести семейное счастье!
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="max-w-[1016px] pb-16 w-full mx-auto max-lg:px-12 ">
            <div className="img__text flex items-center justify-around gap-5 ">
              <div className="img-person max-w-96 w-full ">
                <img
                  className="aspect-[2/1] object-cover w-full rounded-md"
                  src="/carti.webp"
                  alt=""
                />
              </div>
              <div className="text">
                <h4 className="font-mont text-white font-bold text-2xl mb-3">
                  Акбаралиев Cartibek
                </h4>

                <p className="max-w-[1200px] w-full font-mont text-white">
                  Привет! Я интроверт, у которого не было друзей. Но после того,
                  как я начал использовать этот сайт, у меня появились друзья.
                  Теперь я могу делиться своими интересами и находить людей,
                  которые понимают и поддерживают меня. Этот сайт помог мне
                  открыть новые горизонты и выйти из зоны комфорта. Теперь у
                  меня есть друзья, с которыми я могу общаться и проводить
                  время, и это делает мою жизнь намного ярче и радостнее.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
