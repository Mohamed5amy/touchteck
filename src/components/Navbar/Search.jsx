import { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useLang from "../../hooks/useLang";


const Search = () => {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "product", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setProducts(res.data.data.Product);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
      if (search?.length > 0 && search?.charCodeAt(0) !== 32) {
          const newData =
              products &&
              products.filter((admin) =>
                  admin.title.toLowerCase().includes(search.toLowerCase())
              );
          setFilteredData(newData);
      } else {
          setFilteredData(products);
      }
  }, [search, products]);
  
  const isEn = useLang()
  
  return (
    <Stack className="search" direction={"row"} alignItems={"center"} position={"relative"}>
      <input type="text" placeholder={isEn ? "Search products" : "ابحث عن منتج"} value={search} onChange={e => setSearch(e.target.value)} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#66707A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M11.275 2.714a8.561 8.561 0 110 17.122 8.561 8.561 0 010-17.122zM19.899 18.488a1.411 1.411 0 11-.001 2.822 1.411 1.411 0 010-2.822z"
          clipRule="evenodd"
        ></path>
      </svg>
      {(search && filteredData.length > 0) && <Stack position={"absolute"} right={0} top={"110%"} width={"100%"} maxHeight={400} overflow={"scroll"} bgcolor={"#FCFDFD"} borderRadius={"8px"} zIndex={10000}>
        {filteredData?.map(pro => {
          return(
            <Link key={pro.id} to={"/products/"+pro.id} onClick={() => setSearch("")} >
              <Stack p={8} direction={"row"} spacing={8} sx={{transition : ".5s" , "&:hover" : {bgcolor : "#efefef"}}}>
                <img src={"https://backend.touchtechco.com/public/" + pro?.images[0]?.url} alt="product" width={100} />
                <Stack>
                  <Typography color={"#02111D"} > {pro.title} </Typography>
                  <Typography fontSize={14} fontWeight={500} color={"text.third"} > {isEn ? "Price" : "السعر"} : {pro.price} </Typography>
                  <Typography fontSize={14} fontWeight={500} color={"secondary"} > {pro.brand_title} </Typography>
                </Stack>
              </Stack>
            </Link>
          )
        })}
      </Stack>}
    </Stack>
  )
}

export default Search