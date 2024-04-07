import { Box, Breadcrumbs, Button, CircularProgress, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Popup from "../../components/Popup/Popup"
import addressImg from "../../images/address.png"

const Address = () => {

  // Loading
  const [loading, setLoading] = useState(false);

  // Get Address
  const [address, setAddress] = useState([])
  useEffect(() => {
    setLoading(true)
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
        .finally(() => setLoading(false));
  }, []);

  // Handle Del
  const [open, setOpen] = useState(false)
  const [delId, setDelId] = useState("")
  const handleDelete = () => {
    axios
        .delete(import.meta.env.VITE_API + "address/" + delId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err.response.data.message);
        })
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
        {!loading ? <Grid item xs={12} sm={8} md={9} >
          {address.length > 0 ?
          <>
          <Typography variant="h3" color={"#13131B"} mb={8} > العناوين </Typography>
          {address?.map(add => {
            return (
              <Box bgcolor={"#fff"} border={"1px solid #E3E9ED"} borderRadius={"8px"} p={12} mb={8} position={"relative"} key={add.id}>
                <Stack position={"absolute"} right={24} top={24} direction={"row"} spacing={2}>
                  <IconButton color="error" onClick={() => {
                    setDelId(add.id)
                    setOpen(true)
                  }} > <DeleteOutlineIcon /> </IconButton>
                  <Link to={"edit/" + add.id} onClick={() => {
                    localStorage.setItem("address" , JSON.stringify(add))
                  }} ><IconButton color="primary" > <EditOutlinedIcon /> </IconButton></Link>
                </Stack>
                <Stack direction={"row"} spacing={8} alignItems={"center"} mb={12}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    fill="none"
                    viewBox="0 0 24 25"
                  >
                    <path
                      fill="#66707A"
                      d="M20.381 21.983a.75.75 0 01-.53-.22l-6.38-6.38a.754.754 0 010-1.06l7.73-7.73c.19-.19.48-.26.74-.19.26.08.46.29.52.55.19.85.29 1.8.29 2.9v6c0 2.77-.58 4.64-1.84 5.91-.14.14-.35.17-.53.22zm-5.32-7.13l5.26 5.26c.63-.97.93-2.35.93-4.26v-6c0-.41-.01-.79-.04-1.15l-6.15 6.15z"
                    ></path>
                    <path
                      fill="#66707A"
                      d="M6.27 23.333c-.06 0-.11-.01-.17-.02-3.31-.76-4.85-3.13-4.85-7.46v-6c0-5.43 2.32-7.75 7.75-7.75h6c4.33 0 6.7 1.54 7.46 4.85.06.25-.02.52-.2.7L6.8 23.113a.75.75 0 01-.53.22zM9 3.603c-4.61 0-6.25 1.64-6.25 6.25v6c0 3.47.96 5.21 3.29 5.9l14.85-14.85c-.68-2.33-2.43-3.29-5.9-3.29H9v-.01z"
                    ></path>
                    <path
                      fill="#66707A"
                      d="M15 23.603H9c-1.1 0-2.04-.09-2.9-.29a.728.728 0 01-.55-.52c-.08-.26 0-.54.19-.74l7.73-7.73c.29-.29.77-.29 1.06 0l6.38 6.38a.75.75 0 010 1.06c-1.27 1.26-3.14 1.84-5.91 1.84zm-7.15-1.54c.36.03.74.04 1.15.04h6c1.92 0 3.29-.3 4.26-.93L14 15.913l-6.15 6.15zM9.119 14.163c-.63 0-1.26-.23-1.76-.7-1.59-1.51-2.23-3.17-1.85-4.79.38-1.66 1.83-2.78 3.61-2.78 1.78 0 3.23 1.12 3.61 2.78.37 1.63-.27 3.28-1.86 4.79-.49.46-1.12.7-1.75.7zm-2.15-5.16c-.32 1.36.6 2.58 1.43 3.37.41.39 1.04.39 1.44 0 .82-.78 1.74-2 1.43-3.37-.27-1.19-1.33-1.62-2.15-1.62-.82 0-1.87.43-2.15 1.62z"
                    ></path>
                    <path
                      fill="#66707A"
                      d="M9.148 10.343c-.55 0-1-.45-1-1s.44-1 1-1h.01c.55 0 1 .45 1 1s-.46 1-1.01 1z"
                    ></path>
                  </svg>
                  <Typography fontSize={16} fontWeight={600} lineHeight={"140%"} color={"#02111D"} > {add.label} </Typography>
                </Stack>
                <Stack direction={"row"} spacing={8} alignItems={"center"} mb={12}>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 23.4558H9C4.59 23.4558 3.25 22.1158 3.25 17.7058V7.70581C3.25 3.29581 4.59 1.95581 9 1.95581H15C19.41 1.95581 20.75 3.29581 20.75 7.70581V17.7058C20.75 22.1158 19.41 23.4558 15 23.4558ZM9 3.45581C5.42 3.45581 4.75 4.13581 4.75 7.70581V17.7058C4.75 21.2758 5.42 21.9558 9 21.9558H15C18.58 21.9558 19.25 21.2758 19.25 17.7058V7.70581C19.25 4.13581 18.58 3.45581 15 3.45581H9Z" fill="#66707A"/>
                  <path d="M14 6.95581H10C9.59 6.95581 9.25 6.61581 9.25 6.20581C9.25 5.79581 9.59 5.45581 10 5.45581H14C14.41 5.45581 14.75 5.79581 14.75 6.20581C14.75 6.61581 14.41 6.95581 14 6.95581Z" fill="#66707A"/>
                  <path d="M11.9992 20.5658C10.7292 20.5658 9.69922 19.5358 9.69922 18.2658C9.69922 16.9958 10.7292 15.9658 11.9992 15.9658C13.2692 15.9658 14.2992 16.9958 14.2992 18.2658C14.2992 19.5358 13.2692 20.5658 11.9992 20.5658ZM11.9992 17.4558C11.5592 17.4558 11.1992 17.8158 11.1992 18.2558C11.1992 18.6958 11.5592 19.0558 11.9992 19.0558C12.4392 19.0558 12.7992 18.6958 12.7992 18.2558C12.7992 17.8158 12.4392 17.4558 11.9992 17.4558Z" fill="#66707A"/>
                  </svg>
                  <Typography fontSize={16} fontWeight={600} lineHeight={"140%"} color={"#02111D"} > {add.mobile} </Typography>
                </Stack>
                <Stack direction={"row"} spacing={8}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    fill="none"
                    viewBox="0 0 24 25"
                  >
                    <path
                      fill="#66707A"
                      d="M11.999 14.876c-2.13 0-3.87-1.73-3.87-3.87s1.74-3.86 3.87-3.86 3.87 1.73 3.87 3.87-1.74 3.86-3.87 3.86zm0-6.23c-1.3 0-2.37 1.06-2.37 2.37s1.06 2.37 2.37 2.37 2.37-1.06 2.37-2.37-1.07-2.37-2.37-2.37z"
                    ></path>
                    <path
                      fill="#66707A"
                      d="M12.002 23.466a5.97 5.97 0 01-4.13-1.67c-2.95-2.84-6.21-7.37-4.98-12.76 1.11-4.89 5.38-7.08 9.11-7.08h.01c3.73 0 8 2.19 9.11 7.09 1.22 5.39-2.04 9.91-4.99 12.75a5.97 5.97 0 01-4.13 1.67zm0-20.01c-2.91 0-6.65 1.55-7.64 5.91-1.08 4.71 1.88 8.77 4.56 11.34a4.425 4.425 0 006.17 0c2.67-2.57 5.63-6.63 4.57-11.34-1-4.36-4.75-5.91-7.66-5.91z"
                    ></path>
                  </svg>
                  <Stack spacing={4} >
                    <Typography fontSize={18} fontWeight={600} lineHeight={"140%"} color={"#02111D"} >
                      {add.first_name + " " + add.last_name}
                    </Typography>
                    <Typography fontSize={15} fontWeight={400} lineHeight={"140%"} color={"#02111D"} maxWidth={250} > {add.address}</Typography>
                  </Stack>
                </Stack>
              </Box>
            )
          })}
          </> 
          : 
          <Stack alignItems={"center"} spacing={24} pt={16}>
            <img src={addressImg} alt="Wish list No Item" />
            <Stack spacing={4} alignItems={"center"} >
              <Typography variant="h2" color={"#02111D"} textAlign={"center"} >لا يوجد لديك اى عناوين</Typography>
              <Typography variant="subtitle" color={"#242432"} textAlign={"center"} >اضف عنوان الان</Typography>
            </Stack>
            <Link to={"add"} >
            <Button variant="contained" sx={{p : {xs : "16px 70px" , sm : "16px 120px"} , borderRadius : "8px"}} > اضافة عنوان </Button>
            </Link>
          </Stack>}
        </Grid> : 
        <Grid item xs={12} sm={8} md={9}> 
          <Stack alignItems={"center"} pt={24} ><CircularProgress /></Stack>
        </Grid>}
      </Grid>
      {address.length > 0 &&
      <Stack justifyContent={"end"} direction={"row"} mt={8} spacing={8} >
        <Link to={"add"} >
          <Button variant="contained" sx={{py : 8 , width : "200px" , borderRadius : "8px"}}>
            اضافة عنوان جديد 
          </Button>
        </Link>
      </Stack>}
      <Popup
          open={open}
          setOpen={setOpen}
          message={"هل انت متأكد انك تريد حذف هذا العنوان ؟"}
          type="delete"
          fn={handleDelete}
      />
    </Stack>
  )
}

export default Address
