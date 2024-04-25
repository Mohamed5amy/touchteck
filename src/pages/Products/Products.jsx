import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Button, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, Pagination, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import Slider from '@mui/material/Slider';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Pro from "../../components/Pro/Pro";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Swiper, SwiperSlide } from 'swiper/react';
import wish from "../../images/cart.png"



const Products = () => {

  const [catId, setCatId] = useState("")
  const [subCatId, setSubCatId] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [brand, setBrand] = useState("")
  const [filters, setFilters] = useState([])

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const {id , id2} = useParams()


  useEffect(() => {
    setLoading(true)
    axios
        .post(import.meta.env.VITE_API + "filterProducts", 
        filters.length > 0 ? 
        {
          max_price : maxPrice,
          min_price : minPrice,
          categoriesIds : subCatId ? "" : catId,
          brandsIds : brand,
          subCategoriesIds : [
            {
              id : subCatId[0],
              options : filters
            }
          ],
        } : 
        {
          max_price : maxPrice,
          min_price : minPrice,
          categoriesIds : subCatId ? "" : catId,
          brandsIds : brand,
          subCategoriesIds : subCatId && [{id : subCatId}],
        } , {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setProducts(res.data.data.Product);
            id && setProducts(res.data.data.Product?.filter(pro => pro.brand_id == id))
            id2 && setProducts(res.data.data.Product?.filter(pro => pro.sub_category.category.id == id2))
            console.log(res.data.data.Product)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setLoading(false));
  }, [maxPrice , minPrice , catId , subCatId , brand , filters , id , id2]);
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#F8FAFC"}>
      <Breadcrumbs separator=">">
        <Link underline="hover" to="/">
          <Typography color={"primary"} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Typography color="text.secondary" variant="breadcrumbs"> المنتجات </Typography>
      </Breadcrumbs>
      {id && <Brand count={products.length} />}
      {id2 && <Cat count={products.length} />}
      <Grid container mt={12} mb={35}>
        <Grid item xs={12} sm={5} md={4} lg={3} > 
          <Filter setCatId={setCatId} setSubCatId={setSubCatId} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setBrand={setBrand} subId={subCatId} setFilters={setFilters} filters={filters} /> 
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          {loading ? <Stack alignItems={"center"} pt={24} ><CircularProgress /></Stack> : <ProductsList products={products} />}
        </Grid>
      </Grid>
    </Stack>
  )
}

const Brand = ({count}) => {

  const {id} = useParams()
  const [brand, setBrand] = useState()
  useEffect(() => {
    id &&
    axios
        .get(import.meta.env.VITE_API + "brand/" + id , {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setBrand(res.data.data.Brand);
        })
        .catch((err) => {
            console.log(err);
        })
  }, [id]);
  
  return (
    <Stack p={8} mt={12} mb={4} borderRadius={"12px"} bgcolor={"#ECF1F6"} direction={"row"} spacing={8} >
      <Stack height={120} width={250} p={8} alignItems={"center"} justifyContent={"center"} border={"1px solid"} borderColor={"#D1D8DD"} borderRadius={"8px"} sx={{transition : ".5s" , "&:hover" : {borderColor : "primary.main"}}} > <img src={"https://backend.touchtechco.com/public/" + brand?.image} alt={brand?.title} style={{maxHeight : "100%"}} /> </Stack>
      <Stack spacing={8} >
        <Typography variant="h2" color={"#02111D"} > {brand?.title} </Typography>
        <Typography variant="body" color={"#02111D"} > يمكنك تصفح {count} من منتجات {brand?.title} المختلفة </Typography>
      </Stack>
    </Stack>
  )
} 

const Cat = ({count}) => {

  const {id2} = useParams()
  const [brand, setBrand] = useState()
  useEffect(() => {
    id2 &&
    axios
        .get(import.meta.env.VITE_API + "category/" + id2 , {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setBrand(res.data.data.Category);
        })
        .catch((err) => {
            console.log(err);
        })
  }, [id2]);
  
  return (

    <Stack p={8} mt={12} mb={4} borderRadius={"12px"} bgcolor={"#ECF1F6"} direction={"row"} spacing={8} >
      <Stack height={120} width={250} border={"1px solid"} borderColor={"primary.border"} mt={12} borderRadius={"12px"} alignItems={"center"} justifyContent={"center"} fontSize={32} p={12} fontWeight={600} fontFamily={'"Rakkas", serif'}
      sx={{transition : ".5s" , "&:hover" : {color : "primary.main" , borderColor : "primary.main"}}}> {brand?.name}
      </Stack>
      <Stack spacing={8} >
        <Typography variant="h2" color={"#02111D"} > {brand?.name} </Typography>
        <Typography variant="body" color={"#02111D"} > يمكنك تصفح {count} من فئة {brand?.name} المختلفة </Typography>
      </Stack>
    </Stack>
    
  )
} 

const Filter = ({setCatId , setSubCatId , setMaxPrice , setMinPrice , setBrand , subId , setFilters , filters}) => {

  const [active, setActive] = useState(true)
  const [options, setOptions] = useState([])

  // Brands
  const [brands, setBrands] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "brand", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            // console.log(res.data.data.Brand);
            setBrands(res.data.data.Brand);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  return (
    <>
    <Stack bgcolor={"#FFF"} borderRadius={"8px"} overflow={"hidden"} >
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p="12px 16px" bgcolor={"primary.main"} >
        <Typography variant="title" color={"#F8FAFC"} fontWeight={500} fontSize={16} > تصفح عن طريق</Typography>
        <IconButton onClick={() => setActive(prev => !prev)} sx={{ rotate : active ? "180deg" : "0deg" , transition : ".5s" , display : {xs : "flex" , sm : "none"} }} > <KeyboardArrowDownRoundedIcon /> </IconButton>
      </Stack>
      <Stack sx={{overflow : "hidden" , transition : ".5s"}} height={active ? "auto" : "0px"} px={6}>
        <Box >
        {/* minHeight={"300px"} */}
          <Category setCatId={setCatId} setSubCatId={setSubCatId} setOptions={setOptions} setFilters={setFilters} />
          <Price setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
          <Brands setBrand={setBrand} brands={brands} setBrands={setBrands} />
          <Options subId={subId} setFilters={setFilters} filters={filters} options={options} setOptions={setOptions}/>
        </Box>
      </Stack>
    </Stack>
    <FeaturedBrands brands={brands} />
    </>
  )
}

const FeaturedBrands = ({brands}) => {

  const swiperRef = useRef();
  
  return (
    <Stack mt={12} bgcolor={"#FFF"} borderRadius={"8px"} overflow={"hidden"}>
      <Stack p={"12px 16px"} bgcolor={"primary.main"} direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
        <Typography fontWeight={500} color={"#F8FAFC"}> علاماتنا المميزة </Typography>
        <Stack direction={"row"} spacing={2}>
          <IconButton onClick={() => swiperRef.current.slidePrev()}> <ArrowForwardIcon sx={{color : "white"}}/> </IconButton>
          <IconButton onClick={() => swiperRef.current.slideNext()} className="next" > <ArrowBackIcon sx={{color : "white"}}/> </IconButton>
        </Stack>
      </Stack>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop
        style={{width : "100%"}}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <Grid container>
            {brands?.map(brand => {
              return (
                <Grid xs={4} key={brand.id} item >
                  <Link to={"/brands/" + brand.id} >
                    <Stack alignItems={"center"} justifyContent={"center"} height={"100%"} p={8} sx={{transition : ".5s" , "&:hover" : {scale : "1.1"}}} >
                    <img src={"https://backend.touchtechco.com/public/"+ brand?.image} alt={brand.title} width={"100%"} />
                    </Stack>  
                  </Link>
                </Grid> 
              )
            })}
          </Grid>
        </SwiperSlide>
      </Swiper>
    </Stack>
  )
}

const Category = ({setCatId , setSubCatId , setOptions , setFilters}) => {

  const {id2} = useParams()

  const [cats, setCats] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "category", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            // console.log(res.data.data.Category);
            setCats(res.data.data.Category);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  const [checked, setChecked] = useState(false)
  const [catId, setcatId] = useState("")
  
  return (
    !id2&&<Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}> التصنيفات </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <RadioGroup>
            <FormControlLabel value={""} control={<Radio />} label={"الكل"} onChange={e => {
              setSubCatId("")
              setChecked(e.target.checked)
              setcatId("")
              setCatId("")
              setSubCatId("")
              setFilters([])
              setOptions([])
            }} />
          {cats?.map(cat => {
            return (
              <Fragment key={cat.id}>
                <FormControlLabel value={cat.id} control={<Radio />} label={cat.name} onChange={e => {
                  setSubCatId("")
                  setChecked(e.target.checked)
                  setcatId(cat.id)
                  setCatId([cat.id])
                  setFilters([])
                  setOptions([])
                }} />
                {(checked && catId == cat.id ) && 
                <RadioGroup sx={{pl : 8}}>
                {cat?.sub_categories?.map(sub => {
                  return (
                    <FormControlLabel key={sub.id} value={sub.id} control={<Radio />} label={sub.title} onChange={() => {
                      setFilters([])
                      setOptions([])
                      setSubCatId([sub.id])
                    }} />
                  )
                })}
                </RadioGroup>}
              </Fragment>
            )
          })}
            
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  )
}

const Price = ({setMaxPrice , setMinPrice}) => {
  
  const [value, setValue] = useState([0 , 100000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}> السعر </AccordionSummary>
      <AccordionDetails>
        <Stack pb={12} borderBottom={"1px solid"} borderColor={"primary.border"} mb={16} px={8}>
          <Slider 
          value={value}
          onChange={handleChange}
          step={1000}
          min={0}
          max={100000}
          />
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={2} mt={4}>
            <Box bgcolor={"primary.errorBg"} padding={"4px 8px"} borderRadius={"4px"} >
              <Typography variant="breadcrumbs" > {value[0]} جنية </Typography>
            </Box>
            <Typography variant="breadcrumbs" color={"text.secondary"} > الى </Typography>
            <Box bgcolor={"primary.errorBg"} padding={"4px 8px"} borderRadius={"4px"} >
              <Typography variant="breadcrumbs" > {value[1]} جنية </Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} pb={12} >
          <Button variant="outlined" sx={{p : "8px 40px" , borderRadius : "8px" , color : "text.third" , borderColor : "text.third"}} onClick={() => {
            setValue([0 , 100000])
            setMaxPrice("")
            setMinPrice("")
          }}> اعادة  </Button>
          <Button variant="outlined" sx={{p : "8px 40px" , borderRadius : "8px"}} onClick={() => {
            setMinPrice(value[0])
            setMaxPrice(value[1])
          }} > تطبيق  </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
    
  )
}

const Brands = ({setBrand , brands}) => {

  const {id} = useParams()
    
  return (
    !id&&<Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}> العلامات التجارية </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <RadioGroup>
            <FormControlLabel value={""} control={<Radio />} label={"الكل"} onChange={() => {
              setBrand("")
            }} />
            {brands?.map(cat => {
              return (
                <Fragment key={cat.id}>
                  <FormControlLabel value={cat.id} control={<Radio />} label={cat.title} onChange={() => {
                    setBrand([cat.id])
                  }} />
                </Fragment>
              )
            })}
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  )
}

const ProductsList = ({products}) => {

  return (
    <Stack pl={{xs : 0 , sm : 20}} mt={{xs : 12 , sm : 0}} >
      {/* <Stack direction={{xs : "column" , md : "row"}} alignItems={{xs : "start" , md : "center"}} justifyContent={"space-between"} mb={8} spacing={4} >
        <Typography variant="title" > 160 <span style={{color : "#5F6177"}} >Product Found</span> </Typography>
        <TextField select sx={{ minWidth : {xs : "100%" , md : "200px"} }} label="Sort By" >
          <MenuItem value={"Default"} > Default </MenuItem>
          <MenuItem value={"Latest"} > Latest </MenuItem>
          <MenuItem value={"Newest"} > Best Selling </MenuItem>
          <MenuItem value={"Highest"} > Price : High To Low </MenuItem>
          <MenuItem value={"Lowest"} > Price : Low To High </MenuItem>
        </TextField>
      </Stack> */}
      {products.length > 0 ? <Grid container spacing={15} mb={24} >
        {products?.map((pro , i) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={pro.id} >
              <Pro product={pro} newP={i <= 3} />
            </Grid>
          )
        })}
      </Grid> :
      <Stack alignItems={"center"} spacing={24} pt={16}>
        <img src={wish} alt="Wish list No Item" />
        <Stack spacing={4} alignItems={"center"}>
          <Typography variant="h2" color={"#02111D"} textAlign={"center"} > لا يوجد اي منتجات </Typography>
        </Stack>
      </Stack>}
      {products.length > 0 && <Stack alignItems={"center"} > <Pagination count={1} color="primary" defaultPage={1} /> </Stack>}
    </Stack>
  )
}

const Options = ({subId , setFilters , filters , options , setOptions}) => {
  
  useEffect(() => {
    subId &&
    axios
        .get(import.meta.env.VITE_API + "subCategory/" + subId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setOptions(res.data.data.SubCategory.options);
            console.log(res.data.data.SubCategory.options);
        })
        .catch((err) => {
            console.log(err);
        })
  }, [subId , filters]);
  
  return (
    options?.map(option => {
      return (
        <Accordion key={option.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}> {option.title} </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup>
                {option.options?.map(cat => {
                  return (
                    <Fragment key={cat}>
                      <FormControlLabel value={cat} control={<Radio />} label={cat} onClick={() => {
                        console.log(filters.findIndex((i) => +i.id === +option.id))
                        let index = filters.findIndex((i) => +i.id === +option.id);
                        if (index > -1) {
                          filters.splice(index, 1);
                          setFilters(prev => [...prev, {
                            id : option.id,
                            option : [cat]
                          }])
                        } else {
                          setFilters(prev => [...prev, {
                            id : option.id,
                            option : [cat]
                          }])
                        }
                      }} />
                    </Fragment>
                  )
                })}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      )
    })
  )
}

export default Products
