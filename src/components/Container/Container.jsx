import { Stack } from "@mui/material";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Container = ({children}) => {
  return (
    <Stack>
      <Navbar />
      <Stack>
        {children}
      </Stack>
      <Footer />
    </Stack>
  ) 
}

export default Container
