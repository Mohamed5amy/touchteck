import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useLang from "../../hooks/useLang";

const Login = () => {

    // is Logged in ?
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
  
    useEffect(() => {
      isAuthenticated() && navigate("/")
    } , [isAuthenticated , navigate])
  
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    // Signing in
    const [invalid, setInvalid] = useState("")
    const [loading , setLoading] = useState(false)
  
    const signIn = useSignIn()
  
    const onSubmit = (data) => {
      setLoading(true)
      console.log(data)
      axios.post( import.meta.env.VITE_API + "login" , data)
      .then(res => {
        console.log(res.data.data)
        signIn({
          token : res.data.data.token,
          expiresIn: 3600,
          tokenType : "Bearer",
          authState : {email : res.data.data.Employee.email}
        })
        setInvalid("")
        localStorage.setItem("token" , res.data.data.token)
        localStorage.setItem("user" , JSON.stringify(res.data.data.Employee))
        navigate("/")
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

          <Typography variant="h2" mt={8} mb={0} textAlign={"center"} > {isEn ? "Welcome Back" : "مرحبا بعودتك"} </Typography>
          <Typography mb={20} textAlign={"center"} color={"#434E58"} > {isEn ? "Enter your details below" :"املأ بيانات حسابك فى الاسفل"} </Typography>

          <Input label={isEn ? "Email" : "الايميل"} required={true} error={errors?.email_or_mobile?.message || (invalid?.email_or_mobile && invalid?.email_or_mobile[0])} type={"email"} register={register} registerName={"email_or_mobile"} />

          <Stack height={"24px"} ></Stack>

          <Input label={isEn ? "Password" : "كلمة المرور"} required={true} error={errors?.password?.message || (invalid?.password && invalid?.password[0])} type={"password"} register={register} registerName={"password"} />

          <Button disabled={loading} variant="contained" sx={{p : "15px 0" , borderRadius : "8px" , width : "100%" , mt : 20 , height : "58px"}} onClick={handleSubmit(onSubmit)} >
            {loading ? <CircularProgress /> : <Typography variant="button" color={"primary.white"} >{isEn ? "Login" :"دخول"}</Typography>}
          </Button>

          {invalid && <Typography color={"error"} textAlign={"center"} mt={5} fontWeight={500} >
            {isEn ? "Email or password is invalid" : "الايميل او كلمة المرور غير صالحين "}
          </Typography>}

          {/* <Typography variant="subtitle" display={"block"} textAlign={"center"} mt={16} > 
            <Link to={"/forget-password"} >نسيت كلمة المرور ؟</Link> 
          </Typography> */}

          {isEn ? 
          <Stack direction={"row"} spacing={4} justifyContent={"center"} mt={16} >
            <Typography variant="subtitle" color={"text.secondary"} > {isEn ? "You Are New Here" : "انت جديد هنا ؟"} </Typography>
            <Typography variant="subtitle" > <Link to={"/sign-up"} >  {isEn ? "Register" : "تسجيل"} </Link> </Typography>
          </Stack>:
          <Stack direction={"row"} spacing={4} justifyContent={"center"} mt={16} >
            <Typography variant="subtitle" color={"text.secondary"} > انت جديد هنا ؟ </Typography>
            <Typography variant="subtitle" > <Link to={"/sign-up"} >  تسجيل </Link> </Typography>
          </Stack>}
          
        </Box>  
      </Stack>
  )
}

export default Login
