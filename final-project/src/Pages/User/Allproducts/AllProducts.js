import { useMemo, useState } from "react";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useFetch } from "../../../Helper/USeFetch";
import allproductsStyles from './allproductsStyles.module.scss'
import { useLocation } from "react-router-dom";
import { Card } from "../../../Components";
const AllProducts = () => {
  const location = useLocation()
  const {from} = location.state
  console.log(from);
  const limit = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useFetch(
    `http://localhost:3002/products?_page=${currentPage}&_limit=${limit}&category=${from}`
  );
  console.log(data);

  if (error) {
    return (
      <>
        <Typography variant="body1">ERROR - Typography Body1</Typography>
        <Typography variant="body2">ERROR - Typography Body2</Typography>
      </>
    );
  }

  return (
    <>
      <div className={allproductsStyles.proContainer} >
        {loading ? (
          <div className={`${allproductsStyles.center} d-flex justify-center`}>
             <CircularProgress />
            </div>

            
          
        ) : (
          <>
          <div className={`${allproductsStyles.cardConatiner} `}>
            {(data.data).map((d) => (
              <>
                <Card item={d} />
              </>
            ))}
          </div>
          <div className={allproductsStyles.center}>
             <Pagination
           variant="outlined"
           defaultPage={1}
           page={currentPage}
           count={Math.ceil(data?.headers["x-total-count"] / limit)}
           onChange={(_, page) => setCurrentPage(page)}
         />
          </div>
          
         </>
        )}
       
      </div>
    </>
  );
};

export default AllProducts;
