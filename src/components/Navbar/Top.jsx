import { Stack, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import useLang from "../../hooks/useLang";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Top = () => {

  const isEnglish = useLang()
  
  const handleLang = () => {
    if (isEnglish) {
      localStorage.setItem("lang" , "arabic")
    } else {
      localStorage.setItem("lang" , "english")
    }
    window.location.reload()
  }

  useEffect(()=>{
    isEnglish ? document.body.classList.add("english") : document.body.classList.remove("english")
  } , [isEnglish])
  
  return (
      <Stack py={6} direction={"row"} spacing={4} alignItems={"center"} bgcolor={"primary.main"} justifyContent={"space-between"} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} color={"#FAFAFA"}  >
        {/* Left */}
        <Typography fontWeight={600} sx={{transition : ".5s" ,"&:hover" : {color : "primary.secondary" , cursor : "pointer"}}} flexDirection={isEnglish ? "row-reverse" : "row"} display={"flex"} alignItems={"center"} gap={4} onClick={() => handleLang()} > {isEnglish ? "Arabic" : "English"} <PublicIcon /> </Typography>
        {/* Right */}
        {isEnglish ? <Typography display={{xs : "none" , md : "flex"}} variant="body" > Welcome to the world of Touch TECH, here technology meets creativity! <Link to={"/products"} > &nbsp; <strong style={{ textDecoration : "underline" }} > Shop Now</strong> </Link> </Typography> :
        <Typography display={{xs : "none" , md : "flex"}} variant="body" > أهلاً وسهلاً بكم في عالم Touch TECH، هنا تلتقي التكنولوجيا بالإبداع!<Link to={"/products"} > &nbsp; <strong style={{ textDecoration : "underline" }} > تسوق الآن </strong> </Link> </Typography>}
        {/* Middle */}
        <Stack direction={"row"} display={{xs : "none" , md : "block" }} spacing={8} className="socialFooter" >
          <a href="https://www.facebook.com/touchtechpal?mibextid=LQQJ4d" target="_blank" rel="noreferrer">
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
          </a>
          <a href="https://api.whatsapp.com/send?phone=+972594050740&text=Welcome%20To Touch%20Tech" target="_blank" rel="noreferrer">
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
          </a>
          <a href="https://www.instagram.com/touchtech.ps/?igsh=MWgyMzk1MGlsemxjOA%3D%3D" target="_blank" rel="noreferrer">
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
          </a>
          <a href="https://www.tiktok.com/@ps.touch.tech?_t=8mA180UD7CK&_r=1" target="_blank" rel="noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            fill="none"
            viewBox="0 0 19 18"
          >
            <rect width="18" height="18" x="0.25" fill="currentColor" rx="9"></rect>
            <path
              fill="#0A5C99"
              d="M8.316 8.095v-.651a3.607 3.607 0 00-.512-.044 3.796 3.796 0 00-2.176 6.911 3.792 3.792 0 01-.724-4.06c.581-1.379 1.917-2.123 3.412-2.156z"
            ></path>
            <path
              fill="#0A5C99"
              d="M8.408 13.46c.98.388 1.691-.733 1.732-1.66V3.523h1.512A2.841 2.841 0 0111.608 3H9.54v8.268c-.035.932-.8 1.67-1.732 1.671a1.816 1.816 0 01-.814-.195c-.074.263.446.975 1.414.715zm6.068-7.128v-.46c-.557 0-1.1-.164-1.564-.472.406.472.955.8 1.564.932z"
            ></path>
            <path
              fill="#0A5C99"
              d="M11.608 11.204V7c.837.6 1.842.922 2.872.92v-1.6a2.867 2.867 0 01-1.568-.92 2.864 2.864 0 01-1.26-1.88H10.14v8.28a1.736 1.736 0 01-3.14.948 1.736 1.736 0 01.8-3.272c.174.001.346.028.512.08v-1.6a3.792 3.792 0 00-2.688 6.4c.643.434 1.404.659 2.18.644 2.098 0 3.8-1.699 3.804-3.796z"
            ></path>
          </svg>
          </a>
          <a href="https://t.me/TouchTech0" target="_blank" rel="noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            fill="currentColor"
            viewBox="0 0 19 18"
          >
            <rect width="18" height="18" x="0.75" fill="currentColor" rx="9"></rect>
            <path
              fill="#0A5C99"
              d="M7.709 10.59l-.199 2.793c.284 0 .407-.122.555-.269l1.331-1.272 2.76 2.02c.506.282.862.134.999-.465l1.81-8.486c.161-.748-.27-1.041-.762-.858L3.557 8.13c-.726.282-.715.687-.123.87l2.721.847 6.322-3.956c.298-.197.568-.088.346.11l-5.114 4.59z"
            ></path>
          </svg>
          </a>
        </Stack>
      </Stack>
  )
}

export default Top
