import { Grid, IconButton, Stack, Typography } from "@mui/material";
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import qr from "../../images/qr.svg"
import apple from "../../images/apple.svg"
import playstore from "../../images/playstore.svg"

const Footer = () => {
  return (
    <Stack bgcolor={"#042036"} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} py={12} >
      <Grid container spacing={20} pb={12} >
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Stack spacing={12} > 
            <img src={logo} alt="Logo" width={100} /> 
            <Typography fontSize={15} lineHeight={"150%"} color={"#DDD"} >Touch Tech هو متجرك الشامل لأحدث وأروع الأجهزة. استكشف مجموعتنا الواسعة من المنتجات عالية التقنية واستمتع بأفضل الأسعار والخدمات.</Typography> 
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} >
          <Typography fontSize={18} fontWeight={700} color={"#FFF"} > روابط </Typography>
          <Stack color={"#DDD"} fontSize={15} lineHeight={"150%"} spacing={4} mt={4} >
            <Link to={"/"} > الرئيسية </Link>
            <Link to={"/products"} > منتجاتنا </Link>
            <Link to={"/about"} > من نحن </Link>
            <Link to={"/brands"} > علامتنا التجارية </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} >
          <Typography fontSize={18} fontWeight={700} color={"#FFF"} > معلومات </Typography>
          <Stack color={"#DDD"} fontSize={15} lineHeight={"140%"} spacing={4} mt={4} >
            <Link to={"/contact"}> تواصل معنا </Link>
            <Link to={"/policy"}> سياستنا </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Typography fontSize={18} fontWeight={700} color={"#fff"} > معلومات الاتصال </Typography>
          <Stack mt={4} spacing={2} color={"#DDD"} >
            <Stack direction={"row"} spacing={4} alignItems={"start"} >
              <a href="https://www.google.com/maps/search/Palestine-Nablus+-+Al-makhfiya+main+St-/@32.2243079,35.2270797,14z/data=!3m1!4b1?entry=ttu"target="_blank" rel="noreferrer" ><IconButton color="secondary" > <LocationOnOutlinedIcon /> </IconButton></a>
              <Typography variant="subtitle" maxWidth={200} > فلسطين - نابلس - شارع المخفية الرئيسي-مقابل ديوان كوني </Typography>
            </Stack>
            <Stack direction={"row"} spacing={4} alignItems={"center"} >
              <a href="tel:009792347767"><IconButton color="secondary" > <LocalPhoneOutlinedIcon /> </IconButton></a>
              <Typography variant="subtitle" > 009792347767 </Typography>
            </Stack>
            <Stack direction={"row"} spacing={4} alignItems={"center"} >
              <a href="mailto:info@touchtechco.com" target="_blank" rel="noreferrer" ><IconButton color="secondary"> <MailOutlineRoundedIcon /> </IconButton></a>
              <Typography variant="subtitle" > info@touchtechco.com </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} >
          <Typography fontSize={20} fontWeight={500} color={"#FFF"} > تحميل التطبيق </Typography>
          <Stack mt={8} direction={"row"} spacing={6} >
            <img src={qr} alt="Qr Code" />
            <Stack spacing={6} flex={1} minWidth={100} maxWidth={100} >
              <img src={playstore} alt="Play Store"/>
              <img src={apple} alt="Apple"/>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Stack alignItems={"center"} pt={8} borderTop={"1px solid"} borderColor={"#66707A"} direction={{xs : "column" , sm : "row"}} justifyContent={"space-between"} spacing={8} >
        <Typography fontSize={{xs : 14 , sm : 16}} fontWeight={600} color={"#DDD"} > 
        © 2023 تاتش تيك. جميع الحقوق محفوظة علي عطوان
        </Typography>
        <Stack direction={"row"} spacing={8} className="socialFooter" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              fill="currentColor"
              d="M9 0C4.037 0 0 4.037 0 9c0 4.962 4.037 9 9 9 4.962 0 9-4.038 9-9 0-4.963-4.037-9-9-9zm2.238 9.317H9.774v5.219h-2.17v-5.22H6.573V7.473h1.031V6.28c0-.854.406-2.19 2.19-2.19l1.608.007v1.79h-1.167c-.19 0-.46.095-.46.503v1.084h1.653l-.19 1.844z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
          >
            <g clipPath="url(#clip0_150_7230)">
              <path
                fill="currentColor"
                d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm4.11 7.017c.003.089.005.178.005.267 0 2.73-2.078 5.878-5.877 5.878a5.847 5.847 0 01-3.167-.928 4.144 4.144 0 003.058-.856A2.068 2.068 0 015.2 9.943a2.056 2.056 0 00.934-.035 2.066 2.066 0 01-1.657-2.025v-.026c.287.16.607.248.935.258a2.064 2.064 0 01-.64-2.758A5.865 5.865 0 009.03 7.515a2.066 2.066 0 013.52-1.884c.463-.09.906-.26 1.312-.5a2.074 2.074 0 01-.909 1.142 4.12 4.12 0 001.187-.326 4.2 4.2 0 01-1.03 1.07z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_150_7230">
                <path fill="currentColor" d="M0 0H18V18H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
          >
            <g fill="currentColor" clipPath="url(#clip0_150_7233)">
              <path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm.19 14.24H9.19a5.383 5.383 0 01-2.575-.655l-2.855.748.764-2.79a5.373 5.373 0 01-.719-2.692 5.393 5.393 0 015.387-5.385c1.44 0 2.793.562 3.81 1.58a5.352 5.352 0 011.576 3.81 5.394 5.394 0 01-5.386 5.384z"></path>
              <path d="M9.193 4.376a4.483 4.483 0 00-4.48 4.475c0 .846.237 1.67.685 2.382l.106.17-.452 1.651 1.695-.444.163.097a4.47 4.47 0 002.279.623h.002a4.483 4.483 0 004.477-4.475c0-1.196-.465-2.32-1.31-3.167a4.448 4.448 0 00-3.165-1.312zm2.633 6.4c-.112.314-.65.6-.909.64a1.847 1.847 0 01-.847-.054 7.738 7.738 0 01-.768-.283c-1.35-.583-2.231-1.942-2.299-2.032-.067-.09-.55-.73-.55-1.392 0-.662.348-.988.472-1.122a.495.495 0 01.359-.169c.09 0 .18.001.258.005.082.004.193-.032.302.23.113.27.382.933.415 1 .034.067.056.146.012.236a3.84 3.84 0 01-.337.46c-.06.074-.137.14-.059.274.079.135.349.576.749.933.514.458.948.6 1.082.667.135.068.213.056.292-.033.078-.09.336-.393.426-.528.09-.135.18-.112.303-.067s.785.37.92.437c.134.068.224.101.257.158.034.056.034.325-.078.64z"></path>
            </g>
            <defs>
              <clipPath id="clip0_150_7233">
                <path fill="currentColor" d="M0 0H18V18H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
          >
            <g fill="currentColor" clipPath="url(#clip0_150_7237)">
              <path d="M10.723 9a1.723 1.723 0 11-3.446 0 1.723 1.723 0 013.446 0z"></path>
              <path d="M13.029 5.952a1.603 1.603 0 00-.387-.594 1.6 1.6 0 00-.594-.387c-.182-.07-.456-.155-.96-.177-.545-.025-.708-.03-2.088-.03-1.38 0-1.543.005-2.088.03-.504.022-.778.107-.96.177a1.599 1.599 0 00-.594.387c-.172.167-.304.37-.387.594-.07.182-.155.456-.178.96-.024.545-.03.708-.03 2.088 0 1.38.006 1.543.03 2.088.023.504.108.778.178.96.083.225.215.428.387.594a1.6 1.6 0 00.594.387c.182.07.456.155.96.178.545.025.708.03 2.088.03 1.38 0 1.543-.005 2.088-.03.504-.023.778-.107.96-.178a1.712 1.712 0 00.98-.98c.072-.183.156-.457.179-.96.025-.546.03-.709.03-2.089s-.005-1.543-.03-2.088c-.023-.504-.107-.778-.178-.96zM9 11.654a2.654 2.654 0 110-5.308 2.654 2.654 0 010 5.308zm2.759-4.792a.62.62 0 110-1.24.62.62 0 010 1.24z"></path>
              <path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm5.137 11.13c-.025.55-.113.926-.24 1.255a2.643 2.643 0 01-1.512 1.512c-.329.127-.704.215-1.254.24-.551.025-.727.031-2.13.031-1.405 0-1.58-.006-2.132-.031-.55-.025-.925-.113-1.254-.24A2.532 2.532 0 014.7 13.3a2.534 2.534 0 01-.596-.915c-.128-.329-.216-.704-.24-1.254-.026-.552-.032-.728-.032-2.131 0-1.404.006-1.58.031-2.13.025-.55.113-.926.24-1.255.13-.345.334-.657.597-.915.258-.263.57-.467.915-.597.329-.127.704-.215 1.254-.24.551-.025.727-.031 2.131-.031 1.403 0 1.58.006 2.13.031.55.025.926.113 1.255.24.345.13.658.334.916.597.262.258.466.57.596.915.127.329.215.704.24 1.254.025.551.031.727.031 2.131 0 1.403-.006 1.58-.031 2.13z"></path>
            </g>
            <defs>
              <clipPath id="clip0_150_7237">
                <path fill="currentColor" d="M0 0H18V18H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
          >
            <g clipPath="url(#clip0_150_7242)">
              <path
                fill="currentColor"
                d="M9 0a9 9 0 100 18A9 9 0 009 0zM6.383 13.737H4.419V7.412h1.964v6.325zM5.4 6.549a1.143 1.143 0 11-.01-2.286A1.143 1.143 0 015.4 6.55zm8.337 7.188h-1.962v-3.08c0-.733-.015-1.675-1.021-1.675-1.007 0-1.184.798-1.184 1.623v3.132H7.614V7.412H9.5v.862h.027c.261-.497.902-1.022 1.858-1.022 1.987 0 2.353 1.31 2.353 3.01v3.475z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_150_7242">
                <path fill="currentColor" d="M0 0H18V18H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Footer
