import { Box, Stack, Typography } from "@mui/material";

const Header = ({title}) => {
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={8} mb={8}>
      <Box width={20} height={40} borderRadius={"4px"} bgcolor={"secondary.main"} ></Box>
      <Typography fontWeight={600} color={"primary"} > {title} </Typography>
    </Stack>
  )
}

export default Header
