import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useLang from "../../hooks/useLang";

const Register = () => {

    // is Logged in ?
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
  
    useEffect(() => {
      isAuthenticated() && navigate("/profile")
    } , [isAuthenticated , navigate])
  
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    // Signing in
    const [invalid, setInvalid] = useState("")
    const [loading , setLoading] = useState(false)
    
    const onSubmit = (data) => {
      setLoading(true)
      console.log(data)
      axios.post( import.meta.env.VITE_API + "register" , data)
      .then(res => {
        console.log(res.data.data)
        setInvalid("")
        navigate("/login")
      })
      .catch(err => {
        setInvalid(err.response.data.message)
        console.log(err.response.data.message)
      })
      .finally(() => setLoading(false))
    }

    const isEn = useLang()

  return (
    <Stack position={"relative"} pt={20} zIndex={2} alignItems={"center"} bgcolor={"#ECF1F6"} >
        <Box p={{xs : "20px" , sm : "40px"}} bgcolor={"#FCFDFD"} borderRadius={"16px"} width={{xs : "350px" , sm : "530px"}} mb={24} textAlign={"center"} >

          <img src={logo} width={170} alt="Logo" />

          <Typography variant="h2" mt={8} mb={0} textAlign={"center"} > {isEn ? "Sign Up Now" : "سجل حساب الان"} </Typography>
          <Typography mb={20} textAlign={"center"} color={"#434E58"} > {isEn ? "Please fill the details and create account" : "من فضلك املأ بياناتك فى الاسفل"} </Typography>

          <Input label={isEn ? "Full Name" :"الاسم كامل"} required={true} error={errors?.name?.message || (invalid?.name && invalid?.name[0])} type={"text"} register={register} registerName={"name"} />

          <Stack height={"24px"} ></Stack>

          <Stack position={"relative"} >
            <Input label={isEn ? "Phone Number" :"رقم الهاتف"} required={true} type={"number"} error={errors?.mobile?.message || (invalid?.mobile && invalid?.mobile[0])} register={register} registerName={"mobile"} padding={true} />
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

          <Input label={isEn ? "Email" :"الايميل"} required={true} error={errors?.email?.message || (invalid?.email && invalid?.email[0])} type={"email"} register={register} registerName={"email"} />

          <Stack height={"24px"} ></Stack>

          <Input label={isEn ? "Password" :"كلمة المرور"} required={true} error={errors?.password?.message || (invalid?.password && invalid?.password[0])} type={"password"} register={register} registerName={"password"} />

          <Button disabled={loading} variant="contained" sx={{p : "15px 0" , borderRadius : "8px" , width : "100%" , mt : 20 , height : "58px"}} onClick={handleSubmit(onSubmit)} >
            {loading ? <CircularProgress /> : <Typography variant="button" color={"primary.white"} >{isEn ? "Register" :"تسجيل"}</Typography>}
          </Button>

          <Stack direction={"row"} spacing={4} justifyContent={"center"} mt={12} >
            <Typography variant="subtitle" color={"text.secondary"} > {isEn ? "Already have account?" :"تملك حساب بالفعل ؟"} </Typography>
            <Typography variant="subtitle" > <Link to={"/login"} > {isEn ? "Login" :"تسجيل دخول"} </Link> </Typography>
          </Stack>
          
        </Box>  
      </Stack>
  )
}

export default Register
