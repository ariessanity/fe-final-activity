import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { useGetCartQuery, useGetProductQuery, useDeleteCartMutation } from "../../store/query/apiSplice";

const Cart: NextPage = () => {
  const { data: carts } = useGetCartQuery();
  const { data: product } = useGetProductQuery();
  const [deleteCart] = useDeleteCartMutation();

  //Filtering PRODUCT list from CART product_id
  var cartArr = carts?.response.map((cart: any) => cart.product_id || 0);
  var productArr = product?.response.filter((item: any) => {
    return cartArr?.includes(item.id);
  });

  //Checking for total price
  var getPrice = productArr?.map((item: any) => {
    return item.price;
  });
  var totalPrice = getPrice?.reduce((acc: number, sum: number) => {
    return acc + sum;
  }, 0);

  return (
    <PrivateRoute>
      <Flex w={"full"} flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"} mb={"2rem"} fontWeight={500}>
          CART
        </Text>
        <Flex alignItems={"flex-start"} flexDirection={"column"} justifyContent="space-between" w={"20vw"}>
          {productArr?.map((item: any) => {
            return (
              <Box
                key={item.id}
                width={"100%"}
                mb={"5%"}
                onClick={() => {
                  let deleteItem = carts?.response.filter((cart: any) => cart.product_id === item.id);
                  deleteCart(deleteItem[0].id);
                }}
              >
                <Flex justifyContent={"space-between"} alignItems="center">
                  <Text fontSize={"xl"}>{item.product_name} </Text>
                  <Text fontSize={"md"}> ₱{item.price}</Text>
                </Flex>
                <Divider p={2} />
              </Box>
            );
          })}

          <Flex alignItems={"center"} justifyContent="space-between" width={"20vw"}>
            <Text fontWeight={400} fontSize={"xl"} alignSelf={"flex-start"} mb={"10%"}>
              Total Price:
            </Text>
            <Text fontWeight={400} fontSize={"xl"} alignSelf={"flex-start"}>
              ₱{totalPrice}
            </Text>
          </Flex>

          <Button colorScheme="teal" variant="outline" fontWeight={400} fontSize={"xl"}>
            <Link href={"/"}>Check out</Link>
          </Button>
        </Flex>
      </Flex>
    </PrivateRoute>
  );
};

export default Cart;
