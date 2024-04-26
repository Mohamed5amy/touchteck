// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination , Autoplay } from 'swiper/modules';
import { Stack } from "@mui/material";

const Slider = ({slides}) => {
  return (
    <Stack position={"relative"} width={"100%"} height={{xs : "200px" , md : "525px"}}>
      <Swiper
        pagination={{clickable : true}} 
        modules={[Pagination ,Autoplay]} 
        className="mySwiper" 
        style={{width : "100%",height : "100%"}}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop
      >
        {slides.map((slide , i) => {
          if (i !== 0) {
            return (
              <SwiperSlide key={i}>
                <a href={slide.title} target='_blank' rel="noreferrer">
                  <Stack width={"100%"} height={{xs : "200px" , md : "525px"}}>
                    <img src={import.meta.env.VITE_LINK + slide.image} alt="slider image" width={"100%"} height={"100%"} style={{objectFit : "fill"}} />
                  </Stack>
                </a>
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </Stack>
  )
}

export default Slider
