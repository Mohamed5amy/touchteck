import { Box, Breadcrumbs, Button, CircularProgress, FormControlLabel, Grid, MenuItem, Radio, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";


const Check = () => {
  
  const products = useSelector(state => state.carts.carts)
  // Add id
  const [addId, setAddId] = useState("")
  // Total
  const [total, setTotal] = useState(0)
  useEffect(() => {
    setTotal(0)
    products.map(pro => setTotal(prev => prev + (pro.count * pro.price)))
  } , [products])

  // Get Address
  const [address, setAddress] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "addressForClient", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Address);
            setAddress(res.data.data.Address);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  // Submit The Cart
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onSubmit = () => {
    setLoading(true);
    axios
        .post(import.meta.env.VITE_API + "cart", {address_id : addId.toString()}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data)
            navigate("/success")
        })
        .catch((err) => {
            console.log(err.response.data.message);
        })
        .finally(() => {
            setLoading(false);
        });
  };
  
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" href="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Link underline="hover" href="/cart">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > عربة التسوق </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> الفاتورة </Typography>
      </Breadcrumbs>
      <Grid container spacing={20} mb={14}>
        <Grid item xs={12} md={6}>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"}>
            <Typography fontSize={{xs : 24 , sm : 32}} fontWeight={600} color={"#000"} mb={24}> بيانات الدفع </Typography>
            {/* Form */}
            <Stack spacing={16}>
              <Stack spacing={4}>
                <Typography color={"#000"} sx={{opacity : ".5"}} > العنوان<span style={{color : "#DB4444"}} >*</span> </Typography>
                <TextField sx={{bgcolor : "#F5F5F5"}} select value={addId} onChange={e => setAddId(e.target.value) } >
                  {address.map(add => {
                    return <MenuItem value={add.id} key={add.id} > {add.label} </MenuItem>
                  })}
                </TextField>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} >

            {products?.map(product => {
              return (
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"Center"} 
                mb={8} key={product.id}>
                  <Stack alignItems={"center"} flex={2} direction={"row"} spacing={8}>
                      <img src={"https://backend.touchtechco.com/public/" + product?.details?.images[0].url} alt="Cart Image" width={54} height={54} style={{objectFit : "fill" , borderRadius : "16px"}} />
                      <Typography lineHeight={"24px"} color={"#000"} fontWeight={500} >{product?.details?.title}</Typography>
                  </Stack>
                  <Typography color={"primary"} fontWeight={500} > {product?.details?.price} جنيه </Typography>
                </Stack>
              )
            })}
            
            <Stack direction={"row"} justifyContent={"space-between"} py={12} borderBottom={"1px solid rgba(0, 0, 0, 0.20)"} >
              <Typography color={"#000"} > المجموع: </Typography>
              <Typography color={"primary"} > {total} جنيه </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} py={12} borderBottom={"1px solid rgba(0, 0, 0, 0.20)"} >
              <Typography color={"#000"} > التوصيل: </Typography>
              <Typography color={"primary"} > مجاني </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} pt={12} pb={16}>
              <Typography color={"#000"} > المجموع الكلي: </Typography>
              <Typography color={"primary"} > {total} جنيه </Typography>
            </Stack>

            <FormControlLabel control={<Radio />} label="الدفع عند التوصيل" checked />
            
            <Button variant="contained" sx={{py : "16px" , mt : 16, borderRadius : "8px"}} fullWidth disabled={loading || !addId} onClick={() => onSubmit()} > {loading ? <CircularProgress /> : " تأكيد الطلب "} </Button>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Check
