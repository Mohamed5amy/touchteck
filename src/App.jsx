import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { AuthProvider } from "react-auth-kit";
import ForgetPass from "./pages/Login/ForgetPass";
import OTP from "./pages/Login/OTP";
import NewPass from "./pages/Login/NewPass";
import Register from "./pages/Register/Register";
import ROTP from "./pages/Register/ROTP";
import Products from "./pages/Products/Products";
import { Provider } from "react-redux";
import store from "./store"
import Product from "./pages/Product/Product";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import WishList from "./pages/WishList/WishList";
import Brands from "./pages/Brands/Brands";
import Cart from "./pages/Cart/Cart";
import Check from "./pages/Check/Check";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";
import Settings from "./pages/Settings/Settings";
// rtl
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import AddAddress from "./pages/AddAddress/AddAddress";
import Address from "./pages/Address/Address";
import EditAddress from "./pages/EditAddress/EditAddress";
import Success from "./pages/Success/Success";
import Order from "./pages/Orders/Order";
import Contact from "./pages/Contact/Contact";
import GCats from "./pages/Products/GCats";
import Cats from "./pages/Products/Cats";
import SCats from "./pages/Products/SCat";
import useLang from "./hooks/useLang";

function App() {

  const isEn = useLang()

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = createTheme({
    direction : isEn ? "ltr" : "rtl",
    palette : {
      primary : {
        main : "#0A5C99",
        secondary : "#79D70A",
        border : "#E4E5EC",
        icons : "#71748E",

        whiteBg : "#FCFCFD",
        bg : "#F3F3F7",
        inputsBg : "#F3F3F7",
        errorBg : "#F7E8F1",
        successBg : "#E0F5E6",
      },
      secondary : {
        main : "#79D70A",
      },
      text : {
        third : "#8386A0",
        placeholder : "#C5C7D3",
        light : "#F6F7F8"
      }
    },

    typography : {
      fontFamily : isEn ? '"Poppins", sans-serif' : '"Cairo", sans-serif',
      h1 : {
        fontSize : "64px",
        fontWeight : "600",
        lineHeight : "140%"
      },
      h2 : {
        fontSize : "32px",
        fontWeight : "600",
        lineHeight : "140%"
      },
      h3 : {
        fontSize : "24px",
        fontWeight : "600",
        lineHeight : "150%"
      },
      h4 : {
        fontSize : 22,
        fontWeight : "500",
        lineHeight : "160%"
      },
      h5 : {
        fontSize : "20px",
        fontWeight : "500",
        lineHeight : "140%"
      },
      title : {
        fontSize : "18px",
        fontWeight : "500",
        lineHeight : "140%",
      },
      subtitle : {
        fontSize : "16px",
        fontWeight : "500",
        lineHeight : "140%",
      },
      button : {
        fontSize : "16px",
        fontWeight : "500",
        textTransform : "capitalize",
        lineHeight : "auto",
      },
      breadcrumbs : {
        fontSize : "14px",
        fontWeight : "500",
        lineHeight : "auto",
      },
      body : {
        fontSize : "14px",
        fontWeight : "400",
        lineHeight : "140%",
      },
      inputs : {
        fontSize : "14px",
        fontWeight : "400",
        lineHeight : "auto",
      },
      label : {
        fontSize : "14px",
        fontWeight : "400",
        lineHeight : "140%"
      },
    },

    spacing : 2

  })
  
  
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      // cookieSecure={window.location.protocol === "https:"}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store} >
          {!isEn ?
          <CacheProvider value={cacheRtl} >
            <MyApp />
          </CacheProvider> : <MyApp />}
        </Provider>
      </ThemeProvider>
    </AuthProvider>
  )

}

const MyApp = () => {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/products" element={ <Products /> } />
          <Route path="/products/:id" element={ <Product /> } />
          <Route path="/wishlist" element={ <WishList /> } />
          <Route path="/brands" element={ <Brands /> } />
          <Route path="/brands/:id" element={ <Products /> } />
          <Route path="/general-category/:id" element={ <GCats /> } />
          <Route path="/category/:id" element={ <Cats /> } />
          <Route path="/sub-category/:id" element={ <SCats /> } />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/check" element={ <Check /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/address/edit/:id" element={ <EditAddress /> } />
          <Route path="/address/add" element={ <AddAddress /> } />
          <Route path="/address" element={ <Address /> } />
          <Route path="/orders" element={ <Orders /> } />
          <Route path="/orders/:id" element={ <Order /> } />
          <Route path="/success" element={ <Success /> } />
          <Route path="/settings" element={ <Settings /> } />
          <Route path="/contact" element={ <Contact /> } />
          {/* Login */}
          <Route path="/login" element={ <Login /> } />
          <Route path="/forget-password" element={ <ForgetPass /> } />
          <Route path="/forget-password/otp" element={ <OTP /> } />
          <Route path="/forget-password/new-password" element={ <NewPass /> } />
          {/* Register */}
          <Route path="/sign-up" element={ <Register /> } />
          <Route path="/sign-up/otp" element={ <ROTP /> } />
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
