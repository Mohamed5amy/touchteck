import { Box, Breadcrumbs, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
// import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';


const Settings = () => {
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" href="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> الاعدادات </Typography>
      </Breadcrumbs>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={4} md={3} >
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9} >
          <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"} mb={8}>
            <Typography variant="h3" color={"#13131B"} > الاعدادات </Typography>
            <Button variant="contained" sx={{py : 8 , width : "200px" , borderRadius : "8px"}} > حفظ </Button>
          </Stack>
          <Box bgcolor={"#fff"} border={"1px solid #E3E9ED"} borderRadius={"8px"} p={12} pb={20} mb={12}>
            <Typography variant="h3" color={"#13131B"} mb={8} > تغيير كلمة المرور </Typography>
            <Grid container spacing={12}>
              <Grid item xs={12} md={6}>
                <Typography mb={4} color={"#13131B"}> كلمة المرور الحالية </Typography>
                <TextField placeholder="**********" sx={{bgcolor : "#F3F3F7"}} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography mb={4} color={"#13131B"}> كلمة المرور الجديدة </Typography>
                <TextField placeholder="**********" sx={{bgcolor : "#F3F3F7"}} fullWidth />
              </Grid>
            </Grid>
          </Box>
            {/* <Stack justifyContent={"end"} direction={"row"} mt={12} spacing={8} >
              <Button variant="outlined" color="error" sx={{py : 8 , width : "200px" , borderRadius : "8px"}} startIcon={<DeleteSweepIcon />} > Delete Account </Button>
            </Stack> */}
        </Grid>
      </Grid>
      <Stack justifyContent={"end"} direction={"row"} mt={20} spacing={8} >
        
      </Stack>
    </Stack>
  )
}

export default Settings
