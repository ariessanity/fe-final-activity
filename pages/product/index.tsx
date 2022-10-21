import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import ProductCard from "../../components/Card/ProductCard";
import PrivateRoute from "../../components/PrivateRoute";
import { useGetProductQuery } from "../../store/query/apiSplice";

const Product = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetProductQuery();

  return (
    <PrivateRoute>
      {isLoading && "Loading"}
      {isError && (
        <>
          <Text fontSize={"xl"}>
            No product available.{" "}
            <Link href={"/product/create-product"}>
              <Text fontSize={"xl"} color={"teal"} cursor="pointer">
                Create Product
              </Text>
            </Link>
          </Text>
        </>
      )}
      {isSuccess && (
        <Box>
          {isSuccess && (
            <SimpleGrid minChildWidth="20rem" spacing={5}>
              {data.response?.map((product: any) => {
                const { id, product_name, price, shop_id } = product;
                return (
                  <Box key={id}>
                    <ProductCard product_name={product_name} price={price} id={id} shop_id={shop_id} />
                  </Box>
                );
              })}
            </SimpleGrid>
          )}
        </Box>
      )}
    </PrivateRoute>
  );
};

export default Product;
