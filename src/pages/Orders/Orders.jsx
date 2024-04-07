import { Breadcrumbs, Button, Grid, Stack,  Typography , CircularProgress , Box } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ordersImg from "../../images/orders.png"
import { useEffect, useState } from "react";
import axios from "axios";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
        .get(import.meta.env.VITE_API + "getCartForClient", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Cart);
            setOrders(res.data.data.Cart);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setLoading(false))
  }, []);
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" href="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> الطلبات </Typography>
      </Breadcrumbs>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={4} md={3} >
          <Sidebar />
        </Grid>
        {loading ? 
        <Grid item xs={12} sm={8} md={9}> 
          <Stack alignItems={"center"} pt={24} ><CircularProgress /></Stack>
        </Grid> : 
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h3" color={"#13131B"} mb={8} > الطلبات </Typography>
          {orders?.map(add => {
            return (
              <Box bgcolor={"#fff"} border={"1px solid #E3E9ED"} borderRadius={"8px"} p={8} mb={8} position={"relative"} key={add.id}>
                <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
                  <Stack spacing={8}>
                    <Typography fontWeight={500} fontSize={16} color={"#02111D"} > رقم الطلب : <span style={{color : "#66707A"}} >{add.id}#</span></Typography>
                    <Typography fontWeight={500} fontSize={16} color={"#02111D"} > الحالة : <span style={{color : "#66707A"}} >{add.status}</span></Typography>
                    <Typography fontWeight={500} fontSize={16} color={"#02111D"} > العنوان : <span style={{color : "#66707A"}} >{add.address.label}</span></Typography>
                    <Typography fontWeight={500} fontSize={16} color={"#02111D"} > رقم الجوال : <span style={{color : "#66707A"}} >{add.address.mobile}</span></Typography>
                    <Typography fontWeight={500} fontSize={16} color={"#02111D"} > عدد المنتجات : <span style={{color : "#66707A"}} >{add.products.length}</span></Typography>
                  </Stack>
                  <Link to={"/orders/" + add.id} >
                    <Button variant="outlined" sx={{p : "12px 40px" , borderRadius : "8px"}} endIcon={<KeyboardBackspaceIcon />} > تفاصيل الطلب </Button>
                  </Link>
                </Stack>
              </Box>
            )
          })}
          {orders.length < 1 && <Stack alignItems={"center"} spacing={24} pt={16}>
            <img src={ordersImg} alt="Wish list No Item" />
            <Stack spacing={4} alignItems={"center"} >
              <Typography variant="h2" color={"#02111D"} textAlign={"center"} >لا يوجد طلبات حتي الان</Typography>
              <Typography variant="subtitle" color={"#242432"} textAlign={"center"} > اذهب للتسوق و اضف بعض المنتجات </Typography>
            </Stack>
            <Button variant="contained" sx={{p : {xs : "16px 70px" , sm : "16px 120px"} , borderRadius : "8px"}} > اكمال التسوق </Button>
          </Stack>}
        </Grid>}
      </Grid>
    </Stack>
  )
}

export default Orders
