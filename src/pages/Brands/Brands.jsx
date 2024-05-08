import { Breadcrumbs, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useLang from "../../hooks/useLang";




const Brands = () => {

  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
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
        }).finally(() => setLoading(false))
  }, []);

  const isEn = useLang()
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#F8FAFC"} >
      <Breadcrumbs separator=">">
        <Link underline="hover" to="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > {isEn ? "Home" :"الرئيسية"} </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> {isEn ? "Brands" :"العلامات التجارية"} </Typography>
      </Breadcrumbs>
      {/* All */}
      <Stack pt={20} pb={37} >
        <Typography color={"#02111D"} variant="h2" mb={16} > {isEn ? "Our Brands" :"علاماتنا التجارية "} </Typography>
        {loading ? <Stack alignItems={"center"} py={24} ><CircularProgress /></Stack> : <Grid container spacing={12} >
          {brands?.map((brand , i) => {
            return (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Link to={"/brands/" + brand.id}>
                  <Stack height={120} p={8} alignItems={"center"} justifyContent={"center"} border={"1px solid"} borderColor={"#D1D8DD"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : {borderColor : "primary.main"}}} > <img src={"https://backend.touchtechco.com/public/" + brand.image} alt={brand.title} style={{maxHeight : "100%"}} /> </Stack> 
                </Link>
              </Grid>
            )
          })}
        </Grid>}
      </Stack>
    </Stack>
  )
}

export default Brands
