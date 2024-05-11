import { Breadcrumbs, Button, Box, Grid, IconButton, Stack, Typography , TextField  , MenuItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Pro from "../../components/Pro/Pro";
import { ADD_FAV , DEL_FAV } from "../../store/favSlice";
import { useDispatch } from "react-redux";
import { ADD_CART } from "../../store/cartsSlice";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { ToastContainer, toast } from 'react-toastify';
import useLang from "../../hooks/useLang";



const Product = () => {

  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  const {id} = useParams()
  const [product, setProduct] = useState([])
  const [images, setImages] = useState([])

  const [colors, setColors] = useState([])
  

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "product/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Product);
            setProduct(res.data.data.Product);
            let myImages = [];
            res.data.data.Product.images.map(img => myImages.push({
              original : "https://backend.touchtechco.com/public/" + img.url, 
              thumbnail : "https://backend.touchtechco.com/public/" + img.url
            }))
            setImages(myImages)
            console.log(myImages)
        })
        .catch((err) => {
            console.log(err);
        })
  }, [id]);

  // Add To Favorite
  const dispatch = useDispatch()

  const [checkFav, setCheckFav] = useState(false)

  useEffect(() => {
    product.is_favorite ? setCheckFav(true) : setCheckFav(false)
  } , [product])

  const addToFav = () => {
    if (isAuthenticated()) {
      axios
      .post(import.meta.env.VITE_API + "favorite", {
        product_id : product.id,
      } , {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
          console.log(res.data);
          if (checkFav) {
            dispatch(DEL_FAV(product.id))
            setCheckFav(false)
          } else {
            dispatch(ADD_FAV(res.data.data.Product)) 
            setCheckFav(true)
          }
      })
      .catch((err) => {
          console.log(err);
      })
    } else {
      navigate("/login")
    }
  }

  // Add To Cart
  const [onCart, setOnCart] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    product.on_cart ? setOnCart(true) : setOnCart(false)
  } , [product])

  const handleAddToCart = () => {

    setLoading(true)

    if(isAuthenticated()) {
      if (colors.length > 0) {
        colors?.map((color , i) => {
          axios
          .post(import.meta.env.VITE_API + "addProductToCart", {
            product_id : product.id,
            count : color.count,
            color_id : color.id,
            price : product.price,
            plus : 1
          } , {
              headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
              },
          })
          .then((res) => {
              console.log(res.data.data);
              setOnCart(true)
              dispatch(ADD_CART(res.data.data.Cart.products))
              i + 1 == colors.length && toast.success(isEn ? "Product has been added to cart" : "تمت اضافة المنتج بنجاح")
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => i + 1 == colors.length && setLoading(false));
        })
      } else {
        toast.error(isEn ? "Please select how many pieces do you want" : "من فضلك اختر كم قطعة تريد من المنتج")
        setLoading(false)
      }
    } else {
      navigate("/login")
    }
    console.log(colors)
  }

  const isEn = useLang()

  useEffect(() => {
    window.scrollTo(0, 0)
  } , [])
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} >
      <Breadcrumbs separator=">" sx={{mb : 12}}>
        <Link underline="hover" to="/">
          <Typography color={"primary"} variant="breadcrumbs" > {isEn ? "Home" :"الرئيسية"} </Typography>
        </Link>
        <Link underline="hover" to="/products">
          <Typography color={"primary"} variant="breadcrumbs" > {isEn ? "Products" :"المنتجات"} </Typography>
        </Link>
        <Typography color="text.secondary" variant="breadcrumbs"> {product?.title} </Typography>
      </Breadcrumbs>
      {images && <Grid container spacing={20}>
        <Grid item xs={12} md={6.5}>
          <ImageGallery items={images && images} thumbnailPosition="bottom" autoPlay="true" showBullets={false} showNav={false} showPlayButton={false} isRTL={true} />
          {/* Des */}
          <Stack mt={16} spacing={8} >
            <Typography variant="title" > {isEn ? "Product Description" : "مواصفات المنتج"} </Typography>
            <Stack direction={"row"} alignItems={"center"}>
              <ArrowLeftIcon color="primary" sx={{rotate : isEn ? "180deg" : "0deg" }} />
              <Typography variant="subtitle" > {isEn ? "Brand" : "العلامة التجارية"} : </Typography>
              &nbsp;&nbsp;
              <Typography variant="subtitle" color={"text.third"} > {product?.brand_title} </Typography>
            </Stack> 
            {product?.options?.map(option => {
              return (
                <Stack direction={"row"} alignItems={"center"} key={option.id} >
                  <ArrowLeftIcon color="primary" />
                  <Typography variant="subtitle" > {isEn ? option.title : option.title_ar} : </Typography>
                  &nbsp;&nbsp;
                  <Typography variant="subtitle" color={"text.third"} > {option.option} </Typography>
                </Stack> 
              )
            })}
          </Stack>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <Typography variant="h2" mb={4} fontSize={{xs : 24 , sm : 32}} sx={{textTransform : "capitalize"}}>
            {isEn ? product?.title : product?.title_ar}
          </Typography>
          <Typography variant="h2" color={"primary"} mb={4} fontSize={{xs : 24 , sm : 32}} sx={{textTransform : "capitalize"}}>{product?.price} ₪</Typography>
          <Typography color={"#66707A"} mb={4} fontSize={14} sx={{textTransform : "capitalize"}}>
            {isEn ? product?.description : product?.description_ar}
          </Typography>
          {/* Quantity */}
          <Stack mt={8} direction={"row"} alignItems={"center"} spacing={{xs : 2 , sm : 10}} mb={16} >
            <Button variant="contained" sx={{py : 8 , borderRadius: "8px" , flex : 1}} onClick={() => handleAddToCart()} startIcon={<ShoppingCartRoundedIcon sx={{ display : {xs : "none" , sm  :"block"} }} />} disabled={loading}> {isEn ? "Add To Cart" : "اضافة لعربة التسوق"} </Button>
            <IconButton size="large" className={checkFav ? "active" : ""} sx={{color : "#9EA7B8" , "&:hover , &.active" : {color : "red"}}} color="error" onClick={() => addToFav()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill={checkFav ? "red" : "none"}
                viewBox="0 0 22 22"
            >
              <path
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.842"
                d="M3.086 11.39c-.936-2.921.158-6.552 3.225-7.54 1.612-.52 3.603-.086 4.733 1.474 1.067-1.617 3.114-1.99 4.726-1.473 3.065.987 4.165 4.618 3.23 7.538-1.456 4.63-6.535 7.04-7.956 7.04-1.419 0-6.453-2.357-7.958-7.04z"
                clipRule="evenodd"
              ></path>
              <path
                stroke={checkFav ? "white" : "currentColor"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.842"
                d="M14.303 7.133c1.052.108 1.71.942 1.671 2.111"
              ></path>
            </svg>
          </IconButton>
          </Stack>
          {/* Colors */}
          <Colors productColors={product.colors} colors={colors} setColors={setColors} />
          {/* Features */}
          <Stack p={8} borderRadius={"8px"} border={"1px solid"} borderColor={"primary.border"}>
            <Stack direction={"row"} alignItems={"center"} spacing={4} pb={8} mb={6} borderBottom={"1px solid"} borderColor={"primary.border"} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#71748E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 14h1c1.1 0 2-.9 2-2V2H6c-1.5 0-2.81.83-3.49 2.05"
                ></path>
                <path
                  stroke="#71748E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M2 17c0 1.66 1.34 3 3 3h1c0-1.1.9-2 2-2s2 .9 2 2h4c0-1.1.9-2 2-2s2 .9 2 2h1c1.66 0 3-1.34 3-3v-3h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1.29l-1.71-2.99A2.016 2.016 0 0016.84 5H15v7c0 1.1-.9 2-2 2h-1"
                ></path>
                <path
                  stroke="#71748E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 22a2 2 0 100-4 2 2 0 000 4zM16 22a2 2 0 100-4 2 2 0 000 4zM22 12v2h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1.29L22 12zM2 8h6M2 11h4M2 14h2"
                ></path>
              </svg>
              <Typography variant="subtitle" color={"text.third"} > {isEn ? "Sold and shipped by" : "يتم بيعه و شحنه عن طريق"} : </Typography>
              <Typography variant="subtitle" color={"secondary"} > {isEn ? "Touch Tech" : "تاتش تك"} </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={4}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#71748E"
                  d="M12 22.76c-1.09 0-2.17-.32-3.02-.95l-4.3-3.21c-1.14-.85-2.03-2.63-2.03-4.04V7.12c0-1.54 1.13-3.18 2.58-3.72l4.99-1.87c.99-.37 2.55-.37 3.54 0l4.99 1.87c1.45.54 2.58 2.18 2.58 3.72v7.43c0 1.42-.89 3.19-2.03 4.04L15 21.8c-.83.64-1.91.96-3 .96zM10.75 2.94L5.76 4.81c-.85.32-1.6 1.4-1.6 2.32v7.43c0 .95.67 2.28 1.42 2.84l4.3 3.21c1.15.86 3.09.86 4.25 0l4.3-3.21c.76-.57 1.42-1.89 1.42-2.84V7.12c0-.91-.75-1.99-1.6-2.32l-4.99-1.87c-.68-.24-1.84-.24-2.51.01z"
                ></path>
                <path
                  fill="#71748E"
                  d="M10.66 14.23c-.19 0-.38-.07-.53-.22L8.52 12.4a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l1.08 1.08 3.77-3.77c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-4.3 4.3c-.15.15-.34.22-.53.22z"
                ></path>
              </svg>
              <Typography variant="subtitle" color={"text.third"} > {isEn ? "Warranty" : "الضمان"} : </Typography>
              <Typography variant="subtitle" color={"secondary"} > {isEn ? "Start on sale" : "يبدأ عند البيع مباشرة"} </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>}
      <Products catId={product?.sub_category?.category?.id} />
      <ToastContainer position="bottom-right" />
    </Stack >
  )
}


const Colors = ({productColors , colors , setColors}) => {
  
  const isEn = useLang()

  return (
    <Stack mb={12}>
      <Typography variant="title" > {isEn ? "Available Colors" : "الالوان المتاحة"} </Typography>
      <Grid container mt={8} spacing={8} >
        {productColors?.map(color => {
          return (
            <Color key={color.id} color={color} colors={colors} setColors={setColors} />
          )
        })}
      </Grid>
    </Stack>
  )
}

const Color = ({color , colors , setColors}) => {

  const [counter, setCounter] = useState(0)
  const isEn = useLang()

  return (
    <Grid item xs={6} sm={4} >
      <Stack direction={"row"} alignItems={"center"} spacing={4} mb={4} >
        <Box width={20} height={20} bgcolor={color.color} borderRadius={"50%"} border={"1px solid gray"}></Box>
        <Typography variant="subtitle" color={"text.third"} > {isEn ? color.title : color.title_ar } </Typography>
      </Stack>
      <TextField select fullWidth value={counter} onChange={e => {
        setCounter(e.target.value)
        let index = colors.findIndex((i) => +i.id === +color.id);
        if (index > -1) {
          colors.splice(index, 1);
          setColors(prev => [...prev, {
            id : color.id,
            count : e.target.value
          }])
        } else {
          setColors(prev => [...prev, {
            id : color.id,
            count : e.target.value
          }])
        }
      }} >
        {Array(color.count + 1).fill(null).map((_ , i) => {
          return (
            <MenuItem key={i} value={i}> {i} </MenuItem>
          )
        })}
      </TextField>
    </Grid>
  )
}

const Products = ({catId}) => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
        .post(import.meta.env.VITE_API + "filterProducts", {
          categoriesIds : [catId]
        } , { 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Product);
            setProducts(res.data.data.Product);
        })
        .catch((err) => {
            console.log(err);
        })
  }, [catId]);
  
  const isEn = useLang()
  
  return (
    <Stack pt={30} pb={60} >
      <Header title={isEn ? "Similar Products" : "منتجات مشابهة"} />
      <Stack height={32}></Stack>
      <Grid container spacing={15}>
        {products?.slice(0 , 4).map(product => {
          return (
            <Grid item xs={6} md={4} lg={3} key={product.id} >
              <Link to={"/products/" + product.id} onClick={() => window.scrollTo(0, 0)} ><Pro product={product} /></Link>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default Product


{/* <ButtonGroup  sx={{height : "56px"}} >
<Button sx={{borderRadius : "8px"}} onClick={() => setCounter(counter - 1)} disabled={counter < 2} > - </Button>
<Button disabled sx={{px : {xs : 4 , sm : 12}}} > {counter} </Button>
<Button sx={{borderRadius : "8px"}} onClick={() => setCounter(counter + 1)} disabled={counter == product?.count} > + </Button>
</ButtonGroup> */}