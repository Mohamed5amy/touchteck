import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";




const Brands = () => {

  const [brands, setBrands] = useState([])

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "brand", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Brand);
            setBrands(res.data.data.Brand);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#F8FAFC"} >
      <Breadcrumbs separator=">">
        <Link underline="hover" to="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> العلامات التجارية </Typography>
      </Breadcrumbs>
      {/* All */}
      <Stack pt={20} pb={37} >
        <Typography color={"#02111D"} variant="h2" mb={16} > علاماتنا التجارية </Typography>
        <Grid container spacing={12} >
          {brands?.map((brand , i) => {
            return (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Link to={"/brands/" + brand.id}>
                  <Stack height={120} p={8} alignItems={"center"} justifyContent={"center"} border={"1px solid"} borderColor={"#D1D8DD"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : {borderColor : "primary.main"}}} > <img src={"https://backend.touchtechco.com/public/" + brand.image} alt={brand.title} style={{maxHeight : "100%"}} /> </Stack> 
                </Link>
              </Grid>
            )
          })}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default Brands
