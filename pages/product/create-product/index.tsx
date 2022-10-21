import { FormControl, FormLabel, Input, Button, Box, Text, Select, FormErrorMessage, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateProductMutation, useGetShopQuery } from "../../../store/query/apiSplice";
import PrivateRoute from "../../../components/PrivateRoute";

const schema = yup.object().shape({
  product_name: yup.string().required("Name is required"),
  price: yup.number().positive().required("Price is required").typeError("You must specify a number"),
  shop_id: yup.string().required("Shop is required"),
});

const createProduct: NextPage = () => {
  const { data: shop } = useGetShopQuery();
  const [createProduct] = useCreateProductMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    createProduct({ product_name: data.product_name, price: +data.price, shop_id: +data.shop_id, is_active: true });
    Router.push("/product");
  };
  return (
    <PrivateRoute>
      <Box
        h="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        mx={"auto"}
        maxW={"lg"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={5} isInvalid={!!errors?.product_name}>
            <FormLabel htmlFor="product_name">Name of Product</FormLabel>
            <Input id="product_name" placeholder="Enter product name" {...register("product_name", {})} />
            <FormErrorMessage>{errors.product_name && errors.product_name.message}</FormErrorMessage>
          </FormControl>

          <FormControl mb={5} isInvalid={!!errors?.price}>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" placeholder="Enter price" {...register("price", {})} />
            <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.shop_id}>
            <FormLabel htmlFor="shop_id">Shop</FormLabel>
            <Select placeholder="Select Shop" {...register("shop_id")}>
              {shop?.response.map((shop: any) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.shop_id && errors.shop_id.message}</FormErrorMessage>
          </FormControl>

          <Button marginY={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
            Create
          </Button>
        </form>
      </Box>
    </PrivateRoute>
  );
};

export default createProduct;
