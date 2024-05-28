import { Stack } from "@mui/material";
import Footer from "../Footer/Footer";



const Container = ({children}) => {
  return (
    <Stack>
      {/* <Navbar /> */}
      <Stack>
        {children}
      </Stack>
      <Footer />
      
    </Stack>
  ) 
}

export default Container
