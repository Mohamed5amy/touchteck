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
import useLang from "../../hooks/useLang";



const Cats = () => {

  const [catId, setCatId] = useState("")
  const [subCatId, setSubCatId] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [brand, setBrand] = useState("")
  const [filters, setFilters] = useState([])

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const {id} = useParams()

  const [pages, setPages] = useState({})
  const [currenPage, setCurrenPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios
        .get(import.meta.env.VITE_API + "filterProducts", {
          params : filters.length > 0 ? 
          {
            max_price : maxPrice,
            min_price : minPrice,
            categoriesIds : subCatId ? "" : [id],
            brandsIds : brand,
            subCategoriesIds : [
              {
                id : subCatId[0],
                options : filters
              }
            ],
            page : currenPage
          } : 
          {
            max_price : maxPrice,
            min_price : minPrice,
            categoriesIds : subCatId ? "" : [id],
            brandsIds : brand,
            subCategoriesIds : subCatId && [{id : subCatId}],
            page : currenPage
          } 
        } , {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            // setProducts(res.data.data.Product?.filter(pro => pro?.sub_category?.category?.id == id))
            if (currenPage === 1) {
              setProducts(res.data.data.Product.data);
            } else {
              setProducts(Object.values(res.data.data.Product.data));
            }
            setPages(res.data.data.Product);
            console.log(res.data.data.Product)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setLoading(false));
  }, [maxPrice , minPrice , catId , subCatId , brand , filters , id , currenPage]);

  const [gCats, setGCats] = useState()
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "category/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Category);
            setGCats(res.data.data.Category);
        })
        .catch((err) => {
            console.log(err);
        })
  }, [id]);
  
  const isEn = useLang()
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#F8FAFC"}>
      <Breadcrumbs separator=">">
        <Link underline="hover" to="/">
          <Typography color={"primary"} variant="breadcrumbs" > {isEn ? "Home" :"الرئيسية"} </Typography>
        </Link>
        <Typography color="text.secondary" variant="breadcrumbs"> {isEn ? "Products" :"المنتجات"} </Typography>
      </Breadcrumbs>
      <Typography variant="h4" mt={12} mb={8}> 
        {isEn ? gCats?.name : gCats?.name_ar} 
      </Typography>
      <Grid container mb={35}>
        <Grid item xs={12} sm={5} md={4} lg={3}> 
          <Filter setCatId={setCatId} setSubCatId={setSubCatId} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setBrand={setBrand} subId={subCatId} setFilters={setFilters} filters={filters} /> 
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          {loading ? <Stack alignItems={"center"} pt={24} ><CircularProgress /></Stack> : <ProductsList products={products} pages={pages} currenPage={currenPage} setCurrenPage={setCurrenPage} />}
        </Grid>
      </Grid>
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

  const isEn = useLang()
  
  return (
    <>
    <Stack bgcolor={"#FFF"} borderRadius={"8px"} overflow={"hidden"} >
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p="12px 16px" bgcolor={"primary.main"} >
        <Typography variant="title" color={"#F8FAFC"} fontWeight={500} fontSize={16} > {isEn ? "Shop By":"تصفح عن طريق"}</Typography>
        <IconButton onClick={() => setActive(prev => !prev)} sx={{ rotate : active ? "180deg" : "0deg" , transition : ".5s" , display : {xs : "flex" , sm : "none"} }} > <KeyboardArrowDownRoundedIcon /> </IconButton>
      </Stack>
      <Stack sx={{overflow : "hidden" , transition : ".5s"}} height={active ? "auto" : "0px"} px={6}>
        <Box >
        {/* minHeight={"300px"} */}
          <Category setCatId={setCatId} setSubCatId={setSubCatId} setOptions={setOptions} setFilters={setFilters} subId={subId} />
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
  const isEn = useLang()
  
  return (
    <Stack mt={12} bgcolor={"#FFF"} borderRadius={"8px"} overflow={"hidden"}>
      <Stack p={"12px 16px"} bgcolor={"primary.main"} direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
        <Typography fontWeight={500} color={"#F8FAFC"}> {isEn ? "Featured Brands" :"علاماتنا المميزة"} </Typography>
        <Stack direction={isEn ? "row-reverse" : "row"} spacing={2}>
          <IconButton onClick={() => swiperRef.current.slidePrev()}> <ArrowForwardIcon sx={{color : "white"}}/> </IconButton>
          <IconButton onClick={() => swiperRef.current.slideNext()} className="next" > <ArrowBackIcon sx={{color : "white"}}/> </IconButton>
        </Stack>
      </Stack>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        style={{width : "100%" , direction : "rtl"}}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {Array(Math.ceil(brands?.length / 6)).fill("0").map((item , j) => {
          return (
            <SwiperSlide key={j}>
              <Grid container>
                {brands?.slice((j+1)*6 - 6 , (j+1)*6).map(brand => {
                  return (
                    <Grid xs={4} key={brand.id} item>
                      <Link to={"/brands/" + brand.id}>
                        <Stack alignItems={"center"} justifyContent={"center"} height={"100%"} p={8} sx={{transition : ".5s" , "&:hover" : {scale : "1.1"}}}>
                        <img src={"https://backend.touchtechco.com/public/"+brand?.image} alt={brand.title} width={"100%"} />
                        </Stack>  
                      </Link>
                    </Grid> 
                  )
                })}
              </Grid>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Stack>
  )
}

const Category = ({setCatId , setSubCatId , setOptions , setFilters , subId}) => {

  const {id} = useParams()
  
  const [gCats, setGCats] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "category", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Category.filter(cat => cat.id == id));
            setGCats(res.data.data.Category.filter(cat => cat.id == id));
        })
        .catch((err) => {
            console.log(err);
        })
  }, [id]);

  const isEn = useLang()
  
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}> {isEn ? "Categories" : "التصنيفات"} </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <RadioGroup>
            <FormControlLabel value={""} control={<Radio />} label={isEn ? "All" : "الكل"} onChange={() => {
              setSubCatId("")
              setCatId("")
              setSubCatId("")
              setFilters([])
              setOptions([])
            }} />
            {gCats?.map((cat , i) => {
              return (
                <Fragment key={i}>
                  <RadioGroup>
                  {cat?.sub_categories?.map(sub => {
                    return (
                      <FormControlLabel key={sub.id} value={sub.id} control={<Radio checked={subId == sub.id} />} label={isEn ? sub.title : sub.title_ar} onChange={() => {
                        setFilters([])
                        setOptions([])
                        setSubCatId([sub.id])
                      }} />
                    )
                  })}
                  </RadioGroup>
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
  
  const [value, setValue] = useState([0 , 5000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isEn = useLang()
  
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}> {isEn ? "Price" : "السعر"} </AccordionSummary>
      <AccordionDetails>
        <Stack pb={12} borderBottom={"1px solid"} borderColor={"primary.border"} mb={16} px={8}>
          <Slider 
          value={value}
          onChange={handleChange}
          step={100}
          min={0}
          max={5000}
          />
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={2} mt={4}>
            <Box bgcolor={"primary.errorBg"} padding={"4px 8px"} borderRadius={"4px"} >
              <Typography variant="breadcrumbs" > {value[0]} ₪ </Typography>
            </Box>
            <Typography variant="breadcrumbs" color={"text.secondary"} > {isEn ? "To" :"الى"} </Typography>
            <Box bgcolor={"primary.errorBg"} padding={"4px 8px"} borderRadius={"4px"} >
              <Typography variant="breadcrumbs" > {value[1]} ₪ </Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} pb={12} >
          <Button variant="outlined" sx={{p : "8px 40px" , borderRadius : "8px" , color : "text.third" , borderColor : "text.third"}} onClick={() => {
            setValue([0 , 5000])
            setMaxPrice("")
            setMinPrice("")
          }}> {isEn?"Reset" :"اعادة"}  </Button>
          <Button variant="outlined" sx={{p : "8px 40px" , borderRadius : "8px"}} onClick={() => {
            setMinPrice(value[0])
            setMaxPrice(value[1])
          }} > {isEn ? "Apply":"تطبيق"}  </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
    
  )
}

const Brands = ({setBrand , brands}) => {

  const {id} = useParams()
  
  const isEn = useLang()
  
  return (
    !id&&<Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}> {isEn ? "Brands" :"العلامات التجارية"} </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <RadioGroup>
            <FormControlLabel value={""} control={<Radio />} label={isEn ?"All Brands" :"الكل"} onChange={() => {
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

const ProductsList = ({products , pages , currenPage , setCurrenPage}) => {

  const isEn = useLang()
  
  return (
    <Stack pl={{xs : 0 , sm : 20}} mt={{xs : 12 , sm : 0}} >
      {products.length > 0 && <Stack direction={{xs : "column" , md : "row"}} alignItems={{xs : "start" , md : "center"}} justifyContent={"space-between"} mb={8} spacing={4} >
        <Typography variant="title" > {pages?.total} <span style={{color : "#5F6177"}} >{isEn ? "product found" :"منتجات موجوده"}</span> </Typography>
      </Stack>}
      {products.length > 0 ? <Grid container spacing={15} mb={24} >
        {products?.map((pro , i) => {
          return (
            <Grid item xs={6} sm={12} md={6} lg={4} key={pro.id} >
              <Pro product={pro} newP={i <= 3} />
            </Grid>
          )
        })}
      </Grid> :
      <Stack alignItems={"center"} spacing={24} pt={16}>
        <img src={wish} alt="Wish list No Item" />
        <Stack spacing={4} alignItems={"center"}>
          <Typography variant="h2" color={"#02111D"} textAlign={"center"} > {isEn ? "No products found" :"لا يوجد اي منتجات"} </Typography>
        </Stack>
      </Stack>}
      {products.length > 0 && <Stack alignItems={"center"}> 
        <Pagination count={pages?.last_page} color="primary" defaultPage={1} onChange={(e , v) => setCurrenPage(v)} page={currenPage} /> 
      </Stack>}
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
  
  const isEn = useLang()
  
  return (
    options?.map(option => {
      return (
        <Accordion key={option.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}> {isEn ? option.title : option.title_ar} </AccordionSummary>
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

export default Cats
