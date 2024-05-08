import { Box, Breadcrumbs, Button, CircularProgress, Grid,  Stack, Typography , IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import useLang from "../../hooks/useLang";


const Contact = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [invalid, setInvalid] = useState("")
  const [loading , setLoading] = useState(false)
  
  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    axios.post( import.meta.env.VITE_API + "register" , data)
    .then(res => {
      console.log(res.data.data)
      setInvalid("")
    })
    .catch(err => {
      setInvalid(err.response.data.message)
      console.log(err.response.data.message)
    })
    .finally(() => setLoading(false))
  }
  
  const isEn = useLang()
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37}>
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" href="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > {isEn ?"Home" :"الرئيسية"} </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> {isEn ? "Contact" : "تواصل معنا"} </Typography>
      </Breadcrumbs>
      <Grid container spacing={20} >
        <Grid item xs={12} md={6}>
          <Box p={20} bgcolor={"#FCFDFD"} borderRadius={"16px"} height={"100%"} >
            <Stack direction={"row"} alignItems={"center"} spacing={4} p={8} border={"1px solid #E3E9ED"} borderRadius={"12px"} mb={4}>
              <IconButton color="primary"> <LocationOnOutlinedIcon /> </IconButton>
              <Typography> {isEn ? "Palestine-Nablus - Al-makhfiya main St- opposite Diwan kwny" :"فلسطين - نابلس - المخفيه بجانب صحة المخفيه - مقابل ديوان الكوني"}</Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={4} p={8} border={"1px solid #E3E9ED"} borderRadius={"12px"} mb={4}>
              <a href="tel:009792347767"><IconButton color="primary"> <PhoneOutlinedIcon /> </IconButton></a>
              <Typography> 009792347767 </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={4} p={8} border={"1px solid #E3E9ED"} borderRadius={"12px"} mb={12}>
              <a href="mailto:info@touchtechco.com" target="_blank" rel="noreferrer" ><IconButton color="primary"> <MailOutlineRoundedIcon /> </IconButton></a>
              <Typography> info@touchtechco.com </Typography>
            </Stack>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27002.037090424805!2d35.247679299999994!3d32.224309549999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ce0f650425697%3A0x7f0ba930bd153d84!2sNablus!5e0!3m2!1sen!2seg!4v1712490999091!5m2!1sen!2seg" width="100%" style={{border : 0 , borderRadius : "12px"}} height="450" loading="lazy"></iframe>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={20} bgcolor={"#FCFDFD"} borderRadius={"16px"} height={"100%"} >

            <Typography fontSize={36} fontWeight={600} mb={20}> {isEn ? "Contact" : "تواصل معنا"}</Typography>

            <Input label={isEn ?"Name" :"الاسم"} required={true} error={errors?.name?.message || (invalid?.name && invalid?.name[0])} type={"text"} register={register} registerName={"name"} />

            <Stack height={"24px"} ></Stack>

            <Input label={isEn ? "Email":"الايميل"} required={true} error={errors?.email?.message || (invalid?.email && invalid?.email[0])} type={"email"} register={register} registerName={"email"} />

            <Stack height={"24px"} ></Stack>

            <Stack position={"relative"} >
              <Input label={isEn ? "Phone Number":"رقم الهاتف"} required={true} type={"number"} error={errors?.mobile?.message || (invalid?.mobile && invalid?.mobile[0])} register={register} registerName={"mobile"} padding={true} />
              <Stack position={"absolute"} top={49} left={16} direction={"row"} alignItems={"center"} spacing={4} pr={4} borderRight={"1px solid #E3E5ED"} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="20"
                  fill="none"
                  viewBox="0 0 28 20"
                >
                  <rect
                    width="27.5"
                    height="19.5"
                    x="0.25"
                    y="0.25"
                    fill="#fff"
                    stroke="#F5F5F5"
                    strokeWidth="0.5"
                    rx="1.75"
                  ></rect>
                  <mask
                    id="mask0_98_8126"
                    style={{ maskType: "luminance" }}
                    width="28"
                    height="20"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <rect
                      width="27.5"
                      height="19.5"
                      x="0.25"
                      y="0.25"
                      fill="#fff"
                      stroke="#fff"
                      strokeWidth="0.5"
                      rx="1.75"
                    ></rect>
                  </mask>
                  <g fillRule="evenodd" clipRule="evenodd" mask="url(#mask0_98_8126)">
                    <path fill="#199E56" d="M0 20h28v-6.667H0V20z"></path>
                    <path fill="#262626" d="M0 6.667h28V0H0v6.667z"></path>
                    <path fill="#E6223A" d="M0 0l13.333 10L0 20V0z"></path>
                  </g>
                </svg>
                <Typography variant="body" >+972</Typography>
              </Stack>
            </Stack>

            <Stack height={"24px"} ></Stack>

            <Input label={isEn ?"Message" :"رسالتك"} multiline={true} required={true} error={errors?.email?.message || (invalid?.email && invalid?.email[0])} type={"text"} register={register} registerName={"email"} />

            <Button disabled={loading} variant="contained" sx={{p : "15px 0" , borderRadius : "8px" , width : "100%" , mt : 20 , height : "58px"}} onClick={handleSubmit(onSubmit)} >
              {loading ? <CircularProgress /> : <Typography variant="button" color={"primary.white"} >{isEn ?"Send" :"ارسال"}</Typography>}
            </Button>
            
          </Box>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Contact
