import { Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import success from '../../images/success.json';

const Success = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"primary.whiteBg"} pb={37}>
      <Breadcrumbs separator=">" >
        <Link underline="hover" to="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> عملية ناجحة</Typography>
      </Breadcrumbs>
      <Stack alignItems={"center"} spacing={24} pt={12}>
          <Lottie 
            options={defaultOptions}
            height={400}
            width={"100%"}
          />
          <Stack spacing={4} alignItems={"center"}>
            <Typography variant="h2" color={"#02111D"} textAlign={"center"} > تم اكمال طلبك بنجاح و الطلب قيد التنفيذ </Typography>
            <Typography variant="subtitle" color={"#242432"} textAlign={"center"} > يمكنك تتبع حالة طلبك من طلباتي </Typography>
          </Stack>
          <a href={"/products"} >
            <Button variant="contained" sx={{p : {xs : "16px 70px" , sm : "16px 120px"} , borderRadius : "8px"}} > طلباتي</Button>
          </a>
        </Stack>
    </Stack>
  )
}

export default Success
