'use client'
import React, { Children, ReactNode } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  children: ReactNode;
  spaceBetween?: number;
  swipeClassName?: string;
  swipeSlideClassName?: string;
  hasPagination?: boolean;
};

const Slider = ({
  children,
  spaceBetween = 10,
  swipeClassName = "",
  swipeSlideClassName = "",
  hasPagination = false,
}: Props) => {
  const modules = [Navigation, A11y];
  if (hasPagination) modules.push(Pagination);

  return (
    <Swiper
      loop={Children.count(children) > 1}
      slidesPerView="auto"
      spaceBetween={spaceBetween}
      modules={modules}
      className={swipeClassName}
      pagination={hasPagination ? { clickable: true } : undefined}
    >
      {Children.toArray(children).map((slide, index) => (
        <SwiperSlide
          key={React.isValidElement(slide) ? slide.key ?? index : index}
          className={swipeSlideClassName}
        >
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
