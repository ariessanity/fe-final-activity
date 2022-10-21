import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import ShopCard from "../../components/Card/ShopCard";
import PrivateRoute from "../../components/PrivateRoute";
import { useGetShopQuery } from "../../store/query/apiSplice";

const Shop = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetShopQuery();

  return (
    <PrivateRoute>
      {isLoading && "Loading"}
      {isError && (
        <>
          <Text fontSize={"xl"}>
            No shop available.{" "}
            <Link href={"/shop/create-shop"}>
              <Text fontSize={"xl"} color={"teal"} cursor="pointer">
                Create Shop
              </Text>
            </Link>
          </Text>
        </>
      )}
      {isSuccess && (
        <Box>
          {isSuccess && (
            <SimpleGrid minChildWidth="15rem" spacing={5}>
              {data.response?.map((shop: any) => {
                const { id, name, address, business_type } = shop;
                return (
                  <Box key={id}>
                    <ShopCard name={name} address={address} business_type={business_type} shopID={shop.id} is_active={shop.is_active} />
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

export default Shop;
