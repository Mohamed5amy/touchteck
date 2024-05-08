import { Stack, Typography } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useLang from "../../hooks/useLang";



const Bottom = ({cats}) => {

  const itemStyle = {
    transition : ".5s",
    cursor : "pointer",
    borderBottom : "2px solid",
    borderColor : "transparent",
    "span" : {
      transition : ".5s",
    },
    "&:hover" : {
      bgcolor : "#79D70A0a",
      borderColor : "primary.secondary",
      "span" : {
        color : "primary.secondary"
      },
    },
  }

  const items = [
    {
      name : "الرئيسة",
      Ename : "Home",
      link : "/",
    },
    {
      name : "من نحن",
      Ename : "About",
      link : "/about",
    },
  ]

  const items2 = [
    {
      name : "منتجاتنا",
      Ename : "Products",
      link : "/products",
    },
    {
      name : "علاماتنا التجارية",
      Ename : "Brands",
      link : "/brands",
    },
    {
      name : "تواصل معنا",
      Ename : "Contact",
      link : "/contact",
    },
  ]

  const isEn = useLang()
  
  return (
    <Stack direction={"row"} alignItems={"end"} spacing={2} position={"relative"} display={{xs : "none" , md : "flex"}}
    height={"70px"} sx={{ maxWidth: "100%" }} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} >
      {items.map((item , i) => {
        return (
          <Stack key={i} spacing={4} direction={"row"} alignItems={"center"} px={4} height={"100%"} color={"#434E58"} sx={itemStyle}>
            <Link to={item.link} >
              <Typography variant="button" color={"text.secondary"} noWrap >{isEn ? item.Ename : item.name}</Typography>
            </Link>
          </Stack>
        )
      })}
      {cats?.map((item , i) => {
        return <GCategory key={i} item={item} itemStyle={itemStyle} />
      })}
      {items2.map((item , i) => {
        return (
          <Stack key={i} spacing={4} direction={"row"} alignItems={"center"} px={4} height={"100%"} color={"#434E58"} sx={itemStyle}>
            <Link to={item.link} >
              <Typography variant="button" color={"text.secondary"} noWrap >{isEn ? item.Ename : item.name}</Typography>
            </Link>
          </Stack>
        )
      })}
    </Stack>
  )
}

const GCategory = ({item , itemStyle}) => {

  const [active, setActive] = useState(false)
  const isEn = useLang()

  return (
    <Stack spacing={4} direction={"row"} alignItems={"center"} px={4} height={"100%"} color={"#434E58"} sx={itemStyle} position={"relative"} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} >
      <Link to={"/general-category/" + item.id} >
        <Typography variant="button" color={"text.secondary"} noWrap >{isEn ? item.name : item.name_ar }</Typography>
      </Link>
      {active && <Category cats={item?.categories} />}
    </Stack>
  )
}

const Category = ({cats}) => {

  const [active, setActive] = useState(false)
  const [catId, setCatId] = useState("")
  const isEn = useLang()
  
  return (
    <Stack bgcolor={"text.light"} position={"absolute"} top={"99%"} left={"-50px"} width={"300px"} zIndex={10} py={4}>
      {cats?.map((cat , i) => {
        return (
          <Stack key={i} position={"relative"}
          sx={{transition : ".5s" , "&:hover" : {color : "primary.secondary"}}} color={"text.secondary"} px={8} py={4}
          onMouseEnter={() => {setActive(true) ; setCatId(cat.id)}} onMouseLeave={() => setActive(false)}>
            <Link to={"/category/" + cat.id} >
              <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography fontSize={16} fontWeight={500}> {isEn ? cat.name : cat.name_ar } </Typography>
                {cat?.sub_categories?.length ? <ArrowBackIosIcon fontSize="small" sx={{rotate : isEn ? "180deg" : "0deg"}} /> : null}
              </Stack>
            </Link>
            {(active && catId == cat.id && cat?.sub_categories?.length > 0) && <SCategory cats={cat.sub_categories} />}
          </Stack>
        )
      })}
    </Stack>
  )
}

const SCategory = ({cats}) => {

  const isEn = useLang()
  
  return (
    <Stack bgcolor={"primary.whiteBg"} position={"absolute"} top={"-8px"} left={"300px"} width={"300px"} zIndex={10} spacing={8} p={8}>
      {cats?.map((cat , i) => {
        return (
          <Stack key={i} direction={"row"} alignItems={"center"} justifyContent={"space-between"}
          x={{transition : ".5s" , "&:hover" : {color : "primary.secondary"}}} color={"text.secondary"}>
            <Link to={"/sub-category/" + cat.id}>
              <Typography fontSize={16} fontWeight={500}> {isEn ? cat.title : cat.title_ar} </Typography>
            </Link>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default Bottom
