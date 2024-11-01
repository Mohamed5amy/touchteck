import { Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Pro from "../../components/Pro/Pro";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavigateBeforeRounded } from "@mui/icons-material";
import logo from "../../images/logo.svg"
import Slider from "../../components/Slider/Slider";
import 'swiper/css/pagination';
// import required modules
import { Pagination , Autoplay } from 'swiper/modules';

import ReactPlayer from 'react-player/youtube'
import useLang from "../../hooks/useLang";








const Home = () => {

  const [slides, setSlides] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Products
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "filterProducts", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setProducts(res.data.data.Product.data);
            console.log(res.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  // Slides
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "getSlideByType/1", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setSlides(res.data.data.Slide);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setLoading(false));
  }, []);

  const isEn = useLang()

  return (
    !loading ?
    <Stack>
      {/* image */}
      <Slider slides={slides} />
      {/* Categories */}
      <Cats />
      {/* Partners */}
      <Partners />
      {/* Video Slider */}
      <VideoSlider />
      {/* Thick Slider */}
      <ThickSlider />
      {/* Products */}
      <Products products={products} />
      {/* Second Image */}
      <Counter />
      {/* Best Selling */}
      <Best products={products} />
      {/* Features */}
      <Features />
    </Stack> : 
    <Stack position={"fixed"} top={0} left={0} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} bgcolor={"white"} zIndex={1000}>
      <img src={logo} alt="logo" width={300} />
      <Typography fontWeight={600} fontSize={18} mt={4} color={"primary"}>
      {isEn ? "Loading, Please Wait..." : " من فضلك انتظر قليلا يتم التحميل..."}
      </Typography>
    </Stack>
  )
}

const Cats = () => {

  const [cats, setCats] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "category", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setCats(res.data.data.Category);
            console.log(res.data.data.Category);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);

  const swiperRef = useRef();
  const isEn = useLang()
  
  return (
    <Stack pt={40} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }}>
      <Header title={isEn ? "Categories" : "التصنيفات"} />
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={16} >
        <Typography color={"#02111D"} fontSize={{xs : 20 , sm : 32}} fontWeight={600} >{isEn ? "Browse By Category" : "تصفح عن طريق التصنيف "}</Typography>
        <Stack direction={isEn ? "row-reverse" : "row"} spacing={2}>
          <IconButton color="primary" onClick={() => isEn ? swiperRef.current.slideNext() : swiperRef.current.slidePrev()}> <ArrowForwardIcon /> </IconButton>
          <IconButton color="primary" onClick={() => !isEn ? swiperRef.current.slideNext() : swiperRef.current.slidePrev()} className="next" > <ArrowBackIcon /> </IconButton>
        </Stack>
      </Stack>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        className="mySwiper"
        style={{width : "100%"}}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          0 : {
            slidesPerView : 2,
          } ,
          450 : {
            slidesPerView : 3,
          } ,
          600 : {
            slidesPerView : 4,
          },
          900 : {
            slidesPerView : 4.5,
          }
        }}
      >
        {cats?.map(cat => {
          return (
            <SwiperSlide key={cat.id} >
              <Link to={"/category/" + cat.id}>
                <Stack height={120} border={"1px solid"} borderColor={"primary.border"} borderRadius={"12px"} alignItems={"center"} justifyContent={"center"} fontSize={20} p={12} fontWeight={800} textAlign={"center"}
                sx={{transition : ".5s" , "&:hover" : {color : "primary.main" , borderColor : "primary.main"}}}> 
                {isEn ? cat.name : cat.name_ar} </Stack>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Stack>
  )
}

const VideoSlider = () => {

  const [slides, setSlides] = useState([])

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "getSlideByType/3", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setSlides(res.data.data.Slide);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  return (
    <Stack pt={40} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }}>
      <Stack position={"relative"} width={"100%"} height={{xs : "200px" , md : "600px"}}>
        <Swiper
          pagination={{clickable : true}} 
          modules={[Pagination ,Autoplay]} 
          className="mySwiper" 
          style={{width : "100%",height : "100%"}}
          speed={1500}
        >
          {slides.map((slide , i) => {
            return (
              <SwiperSlide key={i}>
                <ReactPlayer url={slide.title} width={"100%"} height={"100%"} controls muted playing loop />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Stack>
    </Stack>
  )
}

const ThickSlider = () => {

  const [slides, setSlides] = useState([])

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "getSlideByType/2", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setSlides(res.data.data.Slide);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  return (
    <Stack pt={{xs : 10 , sm : 40}} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }}>
      <Stack position={"relative"} width={"100%"} height={{xs : "70px" , md : "100px"}}>
        <Swiper
          pagination={{clickable : true}} 
          modules={[Autoplay]} 
          className="mySwiper" 
          style={{width : "100%",height : "100%"}}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={1500}
        >
          {slides.map((slide , i) => {
            return (
              <SwiperSlide key={i}>
                <a href={slide.title} target='_blank' rel="noreferrer">
                  <Stack width={"100%"} height={"100%"}>
                    <img src={import.meta.env.VITE_LINK + slide.image} alt="slider image" width={"100%"} height={"100px"} style={{objectFit : "fill"}} />
                  </Stack>
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Stack>
    </Stack>
  )
}

const Products = ({products}) => {
  
  const isEn = useLang()
  
  return (
    <Stack px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} pt={30} >
      <Header title={isEn ? "Products" : "منتجاتنا"} />
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={16} >
        <Typography color={"#02111D"} fontSize={{xs : 20 , sm : 32}} fontWeight={600} > {isEn ? "Explore Our Products" : "اكتشف منتجاتنا"} </Typography>
        <Link to={"/products"} ><Button endIcon={<NavigateBeforeRounded sx={{ rotate : isEn ? "180deg" : "0deg" }} />} > {isEn ? "View All" : "تصفح الكل "} </Button></Link>
      </Stack>
      <Grid container spacing={15} >
        {products?.slice(0 , 4).map((product) => {
          return (
            <Grid item xs={6} md={4} lg={3} key={product.id}>
              <Pro product={product} newP={true} />
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

const Best = ({products}) => {
  
  const isEn = useLang()
  
  return (
    <Stack px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} pt={60} >
      <Header title={isEn ? "This Month" : "هذا الشهر"} />
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={16} >
        <Typography color={"#02111D"} fontSize={{xs : 20 , sm : 32}} fontWeight={600} > {isEn ? "Best Selling Products" : "افضل المنتجات مبيعا "} </Typography>
        <Link to={"/products"} ><Button endIcon={<NavigateBeforeRounded sx={{ rotate : isEn ? "180deg" : "0deg" }} />} > {isEn ? "View All" : "تصفح الكل "} </Button></Link>
      </Stack>
      <Grid container spacing={15} >
      {products?.slice(0 , 4).map((product) => {
        return (
          <Grid item xs={6} md={4} lg={3} key={product.id} >
            <Pro product={product} />
          </Grid>
        )
      })}
      </Grid>
    </Stack>
  )
}

const Partners = () => {

  const [brands, setBrands] = useState([])

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "brand", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setBrands(res.data.data.Brand);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  const isEn = useLang()
  
  return (
    <Stack pt={60} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }}>
      <Header title={isEn ? "Brands" :"العلامات التجارية"} />
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={16} >
        <Typography color={"#02111D"} fontSize={{xs : 20 , sm : 32}} fontWeight={600} > {isEn ? "Our Brands" :"علاماتنا التجارية"} </Typography>
        <Link to={"/brands"} ><Button endIcon={<NavigateBeforeRounded sx={{ rotate : isEn ? "180deg" : "0deg" }} />} > {isEn ? "View All" : "تصفح الكل "} </Button></Link>
      </Stack>
      <Swiper
        slidesPerView={4.5}
        spaceBetween={24}
        modules={[Autoplay]} 
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={1500}
        className="mySwiper"
        style={{width : "100%"}}
        breakpoints={{
          0 : {
            slidesPerView : 1.5,
          } ,
          450 : {
            slidesPerView : 2.5,
          } ,
          600 : {
            slidesPerView : 3.5,
          },
          900 : {
            slidesPerView : 4.5,
          }
        }}
      >
        {brands?.map((brand , i) => {
          return (
            <SwiperSlide key={i} > 
              <Link to={"/brands/" + brand.id} >
                <Stack height={120} p={8} alignItems={"center"} justifyContent={"center"} border={"1px solid"} borderColor={"#D1D8DD"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : {borderColor : "primary.main"}}} > <img src={"https://backend.touchtechco.com/public/" + brand.image} alt={brand.title} style={{maxHeight : "100%"}} /> </Stack> 
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Stack>
  )
}

const Features = () => {
  const isEn = useLang()
  return (
    <Stack py={60} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} direction={{xs : "column" , md : "row"}} spacing={{xs : 20 , lg : 40}} justifyContent={"center"} >
      <Box textAlign={"center"} flex={1} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
        >
          <path
            fill="#0A5C99"
            d="M80 40c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40zm-69.093 0c0 16.068 13.026 29.093 29.093 29.093 16.068 0 29.093-13.026 29.093-29.093S56.067 10.907 40 10.907 10.907 23.933 10.907 40z"
            opacity="0.3"
          ></path>
          <circle cx="40" cy="40" r="29" fill="#0A5C99"></circle>
          <g
            stroke="#FAFAFA"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            clipPath="url(#clip0_19_12475)"
          >
            <path d="M31.667 51.667a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM48.333 51.667a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667z"></path>
            <path d="M28.333 48.334H27a2 2 0 01-2-2v-4.667m-1.667-13.334h16.334a2 2 0 012 2v18m-6.667 0h10m6.667 0H53a2 2 0 002-2v-8m0 0H41.667m13.333 0l-4.417-7.362a2 2 0 00-1.715-.97h-7.201"></path>
            <path d="M28 48h-1.333a2 2 0 01-2-2v-4.667M23 28h16.333a2 2 0 012 2v18M35 48h9.667M52 48h.667a2 2 0 002-2v-8m0 0H41.333m13.334 0l-4.418-7.362a2 2 0 00-1.715-.971h-7.2M25 31.818h6.667M21.818 35.455h6.667M25 39.09h6.667"></path>
          </g>
          <defs>
            <clipPath id="clip0_19_12475">
              <path
                fill="#fff"
                d="M0 0H40V40H0z"
                transform="translate(20 20)"
              ></path>
            </clipPath>
          </defs>
        </svg>
        <Typography mt={12} mb={4} fontSize={20} lineHeight={"28px"} fontWeight={600} color={"black"} > 
        {isEn ? "FREE AND FAST DELIVERY" :"توصيل مجاني وسريع "}
        </Typography>
        <Typography fontSize={14} lineHeight={"21px"} fontWeight={400} color={"black"}  >
          {isEn ? "Free delivery for all orders over $140" :"التوصيل مجاني لجميع الطلبات التي تزيد قيمتها عن 140 دولارًا "}
        </Typography>
      </Box>
      <Box textAlign={"center"} flex={1} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="80"
          fill="none"
          viewBox="0 0 81 80"
        >
          <path
            fill="#0A5C99"
            d="M80.5 40c0 22.091-17.909 40-40 40S.5 62.091.5 40s17.909-40 40-40 40 17.909 40 40zm-69.093 0c0 16.068 13.026 29.093 29.093 29.093 16.068 0 29.093-13.026 29.093-29.093S56.567 10.907 40.5 10.907 11.407 23.933 11.407 40z"
            opacity="0.3"
          ></path>
          <circle cx="40.5" cy="40" r="29" fill="#0A5C99"></circle>
          <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            clipPath="url(#clip0_19_12480)"
          >
            <path d="M33.833 45a3.333 3.333 0 10-6.666 0v3.333a3.333 3.333 0 006.666 0V45zM53.833 45a3.333 3.333 0 10-6.666 0v3.333a3.333 3.333 0 006.666 0V45z"></path>
            <path d="M27.167 45v-5a13.333 13.333 0 0126.666 0v5M50.5 51.667c0 1.326-1.054 2.597-2.929 3.535-1.875.938-4.419 1.465-7.071 1.465"></path>
          </g>
          <defs>
            <clipPath id="clip0_19_12480">
              <path
                fill="#fff"
                d="M0 0H40V40H0z"
                transform="translate(20.5 20)"
              ></path>
            </clipPath>
          </defs>
        </svg>
        <Typography mt={12} mb={4} fontSize={20} lineHeight={"28px"} fontWeight={600} color={"black"} >
          {isEn ? "24/7 CUSTOMER SERVICE" : "خدمة العملاء 24/7 "}
        </Typography>
        <Typography fontSize={14} lineHeight={"21px"} fontWeight={400} color={"black"}>
          {isEn ? "Friendly 24/7 customer support" :"دعم عملاء ودود على مدار 24 ساعة طوال أيام الأسبوع "}
        </Typography>
      </Box>
      <Box textAlign={"center"} flex={1} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="80"
          fill="none"
          viewBox="0 0 81 80"
        >
          <path
            fill="#0A5C99"
            d="M80.5 40c0 22.091-17.909 40-40 40S.5 62.091.5 40s17.909-40 40-40 40 17.909 40 40zm-69.093 0c0 16.068 13.026 29.093 29.093 29.093 16.068 0 29.093-13.026 29.093-29.093S56.567 10.907 40.5 10.907 11.407 23.933 11.407 40z"
            opacity="0.3"
          ></path>
          <circle cx="40.5" cy="40" r="29" fill="#0A5C99"></circle>
          <path
            fill="#FAFAFA"
            stroke="#FAFAFA"
            d="M28.6 50.6h-.001c-.873-.651-1.673-1.68-2.256-2.84-.583-1.163-.926-2.415-.926-3.493v-12.4c0-2.36 1.755-4.905 3.974-5.732h.001l8.317-3.117s0 0 0 0c.753-.281 1.753-.43 2.774-.43 1.022 0 2.022.149 2.775.43 0 0 0 0 0 0l8.317 3.117h0c2.22.827 3.975 3.372 3.975 5.732V44.25c0 1.087-.343 2.34-.926 3.498-.582 1.16-1.383 2.183-2.256 2.835h0l-7.167 5.35h0l-.006.004c-1.283.99-2.97 1.496-4.695 1.496-1.722 0-3.415-.506-4.735-1.484 0 0 0 0 0 0l-7.166-5.35zm9.642-26.168h0l-8.317 3.117h-.001c-.828.311-1.569.974-2.1 1.742-.53.768-.89 1.699-.89 2.592v12.384c0 .894.31 1.922.767 2.834.457.912 1.092 1.771 1.8 2.3h0l7.166 5.35c1.062.794 2.461 1.174 3.835 1.174s2.776-.38 3.846-1.173l.001-.001 7.167-5.35V49.4c.715-.536 1.351-1.395 1.806-2.306.456-.91.761-1.934.761-2.827v-12.4c0-.887-.36-1.813-.89-2.58-.53-.768-1.27-1.433-2.095-1.753h0l-.006-.002-8.316-3.117h0l-.01-.003c-.638-.225-1.466-.329-2.265-.327-.799.003-1.626.11-2.259.347z"
          ></path>
          <path
            fill="#FAFAFA"
            stroke="#FAFAFA"
            d="M37.913 41.054l.354.353.353-.353 6.284-6.284a.757.757 0 011.059 0 .757.757 0 010 1.06l-7.167 7.166a.736.736 0 01-.53.22.736.736 0 01-.53-.22l-2.682-2.683a.757.757 0 010-1.06.757.757 0 011.059 0l1.8 1.8z"
          ></path>
        </svg>
        <Typography mt={12} mb={4} fontSize={20} lineHeight={"28px"} fontWeight={600} color={"black"} textTransform={"uppercase"}>
          {isEn ? "warranty of the goods" : "ضمان كفاله البضاعه"}
        </Typography>
        <Typography fontSize={14} lineHeight={"21px"} fontWeight={400} color={"black"} > 
        {isEn ? "We Guarantee the warranty of the goods" :"نحن نضمن كفالة البضاعة"}
        </Typography>
      </Box>
    </Stack>
  )
}

const Counter = () => {

  const [counter, setCounter] = useState(null)

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "counter", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setCounter(res.data.data.Counter);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);

  const isEn = useLang()

  let countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
  
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
  
  return (
    counter?.active == 2 &&
    <Stack px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} pt={60}>
      <Stack bgcolor={"primary.main"} p={"70px 48px"} borderRadius={"12px"} direction={{xs : "column" , md :"row"}} spacing={20} alignItems={"center"} justifyContent={"space-between"}>
        <Stack flex={1}>
          <Typography variant="title" color={"secondary"} mb={16} > {isEn ? counter?.product?.sub_category?.category?.name : counter?.product?.sub_category?.category?.name_ar } </Typography>
          <Typography fontWeight={600} fontSize={{xs : 24 , sm : 48}} color={"#FAFAFA"} maxWidth={460} lineHeight={{xs : "40px", sm : "60px"}} mb={16} >{isEn ? counter?.title : counter?.title_ar}</Typography>
          <Stack direction={isEn ? "row" : "row-reverse"} spacing={12} mb={20} width={"fit-content"}>
            <Box bgcolor={"#FFF"} borderRadius={"50%"} width={62} height={62} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
              <Typography variant="title" color={"#000"} lineHeight={"20px"}> {hours} </Typography>
              <Typography fontSize={11} color={"#000"} lineHeight={"18px"}> {!isEn ? "ساعة" : "Hours"} </Typography>
            </Box>
            <Box bgcolor={"#FFF"} borderRadius={"50%"} width={62} height={62} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
              <Typography variant="title" color={"#000"} lineHeight={"20px"}> {minutes} </Typography>
              <Typography fontSize={11} color={"#000"} lineHeight={"18px"}> {!isEn ? "دقيقة" :"Minuts"} </Typography>
            </Box>
            <Box bgcolor={"#FFF"} borderRadius={"50%"} width={62} height={62} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
              <Typography variant="title" color={"#000"} lineHeight={"20px"}> {seconds} </Typography>
              <Typography fontSize={11} color={"#000"} lineHeight={"18px"}> {!isEn ? "ثانية" : "Seconds"} </Typography>
            </Box>
          </Stack>
          <Link to={ "/products/" + counter?.product?.id} >
            <Button variant="contained" color="secondary" sx={{width : "fit-content" , p : {xs : "16px 60px" , sm : "16px 100px"} , borderRadius : "12px"}} >{isEn ? "Buy Now!" : "اشتري الان!"}</Button>
          </Link>
        </Stack>
        <Stack flex={1} position={"relative"} alignItems={"center"}>
          <img src={import.meta.env.VITE_LINK + counter?.product?.images[0]?.url} alt="" width={"100%"} style={{objectFit : "contain" , position : "relative" , zIndex : 2 , maxWidth : "450px"}} />
          <Stack position={"absolute"} borderRadius={"504px"} width={"100%"} height={"100%"} sx={{opacity : ".3" , filter : "blur(100px)"}} bgcolor={"#D9D9D9"} zIndex={1} left={0} top={0}></Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

// const Subscribe = () => {
  
//   return (
//     <Stack pt={60}>
//       <Stack height={440} position={"relative"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} px={20}>
//         <Stack position={"absolute"} left={0} top={0} width={"100%"} height={"101%"} zIndex={-1}> <img src={subscribe} alt="" height={"100%"} style={{objectFit : "cover" , objectPosition : "top"}} /> </Stack>
//         <Typography fontSize={{xs : 26 , sm : 45}} lineHeight={"140%"} fontWeight={700} mb={{xs : 4 , sm : 12}} color={"white"}> اشترك الآن للحصول على أفضل الخدمات لدينا </Typography>
//         <Typography fontSize={{xs : 12 , sm : 16}} lineHeight={"140%"} fontWeight={500} maxWidth={530} mb={{xs : 8 , sm : 12}} color={"white"}> ننصحك بالاشتراك في صحيفتنا، أدخل بريدك الإلكتروني أدناه للحصول على تحديثنا اليومي عنا.  </Typography>
//         <div className="newsletter">
//           <input type="email" placeholder="أدخل عنوان بريدك الالكتروني" />
//           <button>اشترك الان</button>
//         </div>
//       </Stack>
//     </Stack>
//   )
// }

export default Home
