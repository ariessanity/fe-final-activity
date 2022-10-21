import { Box, Flex, IconButton, useColorModeValue, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";
import { selectAuth } from "../../store/slice/authSlice";
import { useSelector } from "react-redux";
import { useDeleteProductMutation, useCreateCartMutation } from "../../store/query/apiSplice";
import { useGetUserQuery } from "../../store/query/apiSplice";
import Link from "next/link";

interface Props {
  id?: number;
  product_name: string;
  price: number;
  shop_id?: number;
  is_active?: boolean;
}

const ProductCard: React.FC<Props> = ({ product_name, price, id, shop_id }) => {
  const toast = useToast();
  const { name } = useSelector(selectAuth);
  const { data: user } = useGetUserQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [createCart, { isSuccess, isError }] = useCreateCartMutation();

  let userID = user?.response.filter((u: any) => {
    return u.username === name;
  });

  const handleClick = () => {
    createCart({ user_id: userID[0].id, product_id: id, shop_id: shop_id, is_active: true });
    if (isSuccess) {
      toast({
        title: `Added to cart`,
        position: "bottom",
        status: "success",
        isClosable: true,
      });
    }
    if (isError) {
      toast({
        title: `Already added to cart`,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box bg={useColorModeValue("white", "gray.800")} borderWidth="1px" rounded="lg" shadow="lg">
        <Box p="6" width="15rem">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" fontWeight="semibold">
              {product_name}
            </Box>
            <IconButton
              as={FiShoppingCart}
              h={7}
              w={7}
              alignSelf={"center"}
              aria-label={"Cart"}
              variant="ghost"
              onClick={() => {
                handleClick();
              }}
            />
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                ₱
              </Box>
              {price}
            </Box>
            <Flex alignItems={"center"}>
              <Link href={`/product/update-product/${id}`}>
                <IconButton aria-label={"Delete Product"} mr={-3} variant="ghost" icon={<EditIcon />} />
              </Link>
              <IconButton
                aria-label={"Delete Product"}
                mr={-3}
                variant="ghost"
                icon={<DeleteIcon />}
                onClick={() => {
                  deleteProduct(id);
                }}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductCard;
