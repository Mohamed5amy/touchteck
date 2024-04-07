import { Box, Breadcrumbs, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Loading
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState({});

  // Handle Submit
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data)
    data.id = user?.id

    axios
        .post(import.meta.env.VITE_API + "updateClient", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data)
            toast.success("تم تحديث البيانات بنجاح")
            localStorage.setItem("user" , JSON.stringify(res.data.data.Client))
        })
        .catch((err) => {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        })
        .finally(() => {
            setLoading(false);
        });
  };
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" to="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> الملف الشخصي </Typography>
      </Breadcrumbs>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={4} md={3} >
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9} >
          <Typography variant="h3" color={"#13131B"} mb={8} > البيانات الشخصية </Typography>
          <Box bgcolor={"#fff"} border={"1px solid #E3E9ED"} borderRadius={"8px"} p={12} pb={20} >
            <Grid container spacing={12}>
              <Grid item xs={12} md={6}>
                <Input
                    required={true}
                    type={"text"}
                    label={"الاسم"}
                    defaultValue={user?.name}
                    register={register}
                    registerName="name"
                    error={
                        errors?.name?.message ||
                        (error?.name && error?.name[0])
                    }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  required={true}
                  type={"number"}
                  label={"رقم الجوال"}
                  register={register}
                  registerName="mobile"
                  defaultValue={user?.mobile}
                  error={
                      errors?.mobile?.message ||
                      (error?.mobile && error?.mobile[0])
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  required={true}
                  type={"email"}
                  label={"الايميل"}
                  register={register}
                  defaultValue={user?.email}
                  registerName="email"
                  error={
                      errors?.email?.message ||
                      (error?.email && error?.email[0])
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Stack justifyContent={"end"} direction={"row"} mt={20} spacing={8} >
        <Button variant="contained" sx={{py : 8 , width : "200px" , borderRadius : "8px"}} onClick={handleSubmit(onSubmit)} disabled={loading} > {loading ? <CircularProgress /> : "تحديث البيانات"} </Button>
      </Stack>
      <ToastContainer position="bottom-right" />
    </Stack>
  )
}

export default Profile
