import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import E from "../../images/E.png"
import M from "../../images/M.png"
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
import logo from "../../images/logo.svg";

const NewPass = () => {

    // is Logged in ?
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
  
    useEffect(() => {
      isAuthenticated() && navigate("/admins-list")
    } , [isAuthenticated , navigate])
  
    const { register, handleSubmit, formState: { errors } } = useForm();
  
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

          <Typography variant="h2" mb={20} textAlign={"center"} > Add New password </Typography>
          
          <Input label={"New password"} required={true} error={errors?.password?.message} type={"password"} register={register} registerName={"password"} />
          
          <Stack height={"24px"} ></Stack>

          <Input label={"Confirm password"} required={true} error={errors?.password?.message} type={"password"} register={register} registerName={"password"} />

          <Button disabled={loading} variant="contained" sx={{p : "15px 0" , borderRadius : "8px" , width : "100%" , mt : 20 , height : "58px"}} onClick={handleSubmit(onSubmit)} >
            {loading ? <CircularProgress /> : <Typography variant="button" color={"primary.white"} >Change password</Typography>}
          </Button>
          
        </Box>
      </Stack>
  )
}

export default NewPass
