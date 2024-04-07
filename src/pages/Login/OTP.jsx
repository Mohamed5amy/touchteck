import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import E from "../../images/E.png"
import M from "../../images/M.png"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
import logo from "../../images/logo.svg";
import OTPInput, { ResendOTP } from "otp-input-react";

const ForgetPassOTP = () => {

    // is Logged in ?
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
  
    useEffect(() => {
      isAuthenticated() && navigate("/admins-list")
    } , [isAuthenticated , navigate])
  
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [OTP, setOTP] = useState("");
  
    // Signing in
    const [invalid, setInvalid] = useState("")
    const [loading , setLoading] = useState(false)
  
    const signIn = useSignIn()
  
    const onSubmit = (data) => {
      setLoading(true)
      console.log(data)
      // axios.post( import.meta.env.VITE_API + "super-admin-login" , data)
      // .then(res => {
      //   console.log(res.data.data)
      //   signIn({
      //     token : res.data.data.api_token,
      //     expiresIn: 3600,
      //     tokenType : "Bearer",
      //     authState : {email : res.data.data.email}
      //   })
      //   setInvalid("")
      //   localStorage.setItem("token" , res.data.data.api_token)
      //   localStorage.setItem("user" , JSON.stringify(res.data.data))
      //   localStorage.setItem("role" , "superAdmin")
      //   navigate("/admins-list")
      // })
      // .catch(err => {
      //   setInvalid(err)
      // })
      // .finally(() => setLoading(false))
    }

  return (
          <Stack position={"relative"} pt={20} zIndex={2} alignItems={"center"} bgcolor={"#ECF1F6"} >
            <Box p={{xs : "20px" , sm : "40px"}} bgcolor={"#FCFDFD"} borderRadius={"16px"} width={{xs : "350px" , sm : "530px"}} mb={24} textAlign={"center"} >

          <Typography variant="h2" mb={4} textAlign={"center"} > Verify your email </Typography>

          <Typography variant="body" display={"block"} textAlign={"center"} color={"primary.secondary"} > OTP has been sent to your email</Typography>

          <Typography variant="inputs" fontWeight={500} display={"block"} mb={20} textAlign={"center"} color={"primary.secondary"} > example@email.com</Typography>
          {/* OTP */}
          <Stack alignItems={"center"} className="otp">

            <OTPInput 
              value={OTP} 
              onChange={setOTP} 
              autoFocus 
              OTPLength={6} 
              otpType="number" 
              disabled={false} 
            />

            <Stack mt={20} className="otpCounter" > <ResendOTP onResendClick={() => console.log("Resend clicked")} /> </Stack>

          </Stack>

          <Button disabled={loading || OTP.length !== 6 } variant="contained" sx={{p : "15px 0" , borderRadius : "8px" , width : "100%" , height : "58px" , mt : 20}} onClick={handleSubmit(onSubmit)} >
            {loading ? <CircularProgress /> : <Typography variant="button" color={"primary.white"} >Continue</Typography>}
          </Button>

          {invalid && <Typography color={"error"} textAlign={"center"} mt={5} fontWeight={500} > OTP Is Wrong </Typography>}
          
        </Box>
      </Stack>
  )
}

export default ForgetPassOTP
