import { Box, Breadcrumbs, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';


const AddAddress = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Loading
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState({});

  const navigate = useNavigate()

  // Handle Submit
  const onSubmit = (data) => {
    setLoading(true);
    data.default = 0;
    axios
        .post(import.meta.env.VITE_API + "address", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data)
            navigate("/address")
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
        <Typography color="#000" variant="breadcrumbs"> العناوين </Typography>
      </Breadcrumbs>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={4} md={3} >
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9} >
          <Typography variant="h3" color={"#13131B"} mb={8} > اضافة عنوان </Typography>
          <Box bgcolor={"#fff"} border={"1px solid #E3E9ED"} borderRadius={"8px"} p={12} pb={20} >
            <Grid container spacing={12} mb={12}>
              <Grid item xs={12} md={6}>
                <Input
                    required={true}
                    type={"text"}
                    label={"الاسم الاول"}
                    register={register}
                    registerName="first_name"
                    error={
                        errors?.first_name?.message ||
                        (error?.first_name && error?.first_name[0])
                    }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                    required={true}
                    type={"text"}
                    label={"اسم العائلة"}
                    register={register}
                    registerName="last_name"
                    error={
                        errors?.last_name?.message ||
                        (error?.last_name && error?.last_name[0])
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
                  error={
                      errors?.mobile?.message ||
                      (error?.mobile && error?.mobile[0])
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                    required={true}
                    type={"text"}
                    label={"اختصار العنوان"}
                    register={register}
                    registerName="label"
                    error={
                        errors?.label?.message ||
                        (error?.label && error?.label[0])
                    }
                />
              </Grid>
            </Grid>
            <Input
                required={true}
                type={"text"}
                label={"العنوان بالتفصيل"}
                register={register}
                registerName="address"
                multiline={true}
                error={
                    errors?.address?.message ||
                    (error?.address && error?.address[0])
                }
            />
          </Box>
        </Grid>
      </Grid>
      <Stack justifyContent={"end"} direction={"row"} mt={20} spacing={8} >
        <Button variant="contained" sx={{py : 8 , width : "200px" , borderRadius : "8px"}} onClick={handleSubmit(onSubmit)} disabled={loading} > {loading ? <CircularProgress /> : "اضافة"} </Button>
      </Stack>
    </Stack>
  )
}

export default AddAddress
