import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCard from "../../components/Card/ProductCard";
import PrivateRoute from "../../components/PrivateRoute";
import { useGetOneShopQuery } from "../../store/query/apiSplice";

const ShopProducts = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, isLoading, isSuccess, isError, error } = useGetOneShopQuery(id);

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
        <>
          <Flex alignItems={"center"} justifyContent={"center"} w={"full"} mb={10}>
            <Text fontSize={"3xl"} fontWeight={500} textTransform={"uppercase"}>
              {data?.response?.name}
            </Text>
          </Flex>
          <SimpleGrid minChildWidth="15rem" spacing={5}>
            {data?.response?.product_items.map((product: any) => {
              return (
                <Box key={product.id}>
                  <ProductCard price={product.price} product_name={product.product_name} id={product.id} />
                </Box>
              );
            })}
          </SimpleGrid>
        </>
      )}
    </PrivateRoute>
  );
};

export default ShopProducts;
