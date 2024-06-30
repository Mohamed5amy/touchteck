import {  Box, Breadcrumbs, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import about from "../../images/about.png";
import n1 from "../../images/n1.png"
import n3 from "../../images/n3.png"
import useLang from "../../hooks/useLang";

const About = () => {
  
  const isEn = useLang()
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#F8FAFC"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 24}} >
        <Link underline="hover" to="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > {isEn ? "Home" :"الرئيسية"} </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> {isEn ?"About" :"من نحن"} </Typography>
      </Breadcrumbs>
      <Stack direction={{xs : "column" , md : "row"}} alignItems={{xs : "center" , md : "start"}} justifyContent={"space-between"} spacing={{xs : 20 , sm : 40}} >
        <Box maxWidth={525} flex={1} >
          <Typography fontSize={36} fontWeight={700} mb={8} >{isEn ? "What We Provide" : "ماذا نقدم"}</Typography>
          <Typography lineHeight={"35px"} color={"#4B4444"} fontSize={18}>
            {isEn ? "TOUCH TECH is your ideal destination for providing wholesale and retail mobile and computer accessories. We specialize in importing the latest accessories of the highest quality at competitive prices. We always strive to meet the needs of our individual and corporate customers by providing a wide range of innovative and advanced products. Choose TOUCH TECH to be your ideal partner in the world of mobile and computer accessories." : "شركة (TOUCH TECH) هي وجهتكم المثلى لتوفير إكسسوارات الأجهزة الخلوية والكمبيوتر وملحقاتها بالجملة والمفرق. نحن متخصصون في استيراد أحدث الإكسسوارات بأعلى مستويات الجودة وبأسعار تنافسية. نسعى دائماً لتلبية احتياجات عملائنا من الأفراد والشركات بتقديم مجموعة واسعة من المنتجات المبتكرة والمتطورة. اختر (TOUCH TECH) لتكون شريكك المثالي في عالم إكسسوارات الأجهزة الخلوية والكمبيوتر."}
          </Typography>
        </Box>
        <Stack flex={1} ><img src={about} alt="" /></Stack>
      </Stack>
      <Grid container pt={60} spacing={15} >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack height={"100%"} p={12} alignItems={"center"} justifyContent={"center"} border={"1px solid rgba(0, 0, 0, 0.30)"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : { borderColor : "primary.main" , translate : "0 -5px" , boxShadow : "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}} >
            <img src={n1} alt="Service 1" style={{ marginBottom : "24px" }} />
            <Typography mb={6} fontWeight={700} fontSize={32} lineHeight={"30px"} > 10.5k </Typography>
            <Typography color={"#605353"} textAlign={"center"} > {isEn ? "Sallers active our site" :"بائعون نشطون في موقعنا "}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack height={"100%"} p={12} alignItems={"center"} justifyContent={"center"} border={"1px solid rgba(0, 0, 0, 0.30)"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : { borderColor : "primary.main" , translate : "0 -5px" , boxShadow : "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}} >
            <img src={n1} alt="Service 1" style={{ marginBottom : "24px" }} />
            <Typography mb={6} fontWeight={700} fontSize={32} lineHeight={"30px"} > 33k </Typography>
            <Typography color={"#605353"} textAlign={"center"} > {isEn ? "Mopnthly Produduct Sale" :"مبيعات شهرية"} </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack height={"100%"} p={12} alignItems={"center"} justifyContent={"center"} border={"1px solid rgba(0, 0, 0, 0.30)"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : { borderColor : "primary.main" , translate : "0 -5px" , boxShadow : "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}} >
            <img src={n3} alt="Service 1" style={{ marginBottom : "24px" }} />
            <Typography mb={6} fontWeight={700} fontSize={32} lineHeight={"30px"} > 45.5k </Typography>
            <Typography color={"#605353"} textAlign={"center"} > {isEn ? "Customer active in our site":"عميل نشط في موقعنا"} </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack height={"100%"} p={12} alignItems={"center"} justifyContent={"center"} border={"1px solid rgba(0, 0, 0, 0.30)"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : { borderColor : "primary.main" , translate : "0 -5px" , boxShadow : "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}} >
            <img src={n1} alt="Service 1" style={{ marginBottom : "24px" }} />
            <Typography mb={6} fontWeight={700} fontSize={32} lineHeight={"30px"} > 25k </Typography>
            <Typography color={"#605353"} textAlign={"center"} > {isEn ? "Anual gross sale in our site":"إجمالي المبيعات السنوية في موقعنا"} </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack pt={60} direction={{xs : "column" , md :"row"}} spacing={{xs : 20 , lg : 40}} justifyContent={"center"}>
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
          <Typography mt={12} mb={4} fontSize={20} lineHeight={"28px"} fontWeight={600} color={"black"} >
            {isEn ? "MONEY BACK GUARANTEE" : "ضمان استعادة الاموال"}
          </Typography>
          <Typography fontSize={14} lineHeight={"21px"} fontWeight={400} color={"black"} > 
          {isEn ? "We reurn money within 30 days" :"نقوم بإرجاع الأموال خلال 30 يومًا "}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

export default About
