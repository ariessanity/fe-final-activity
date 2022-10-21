import { useEffect, useState } from "react";
import { NextPage } from "next";
import { FormControl, FormLabel, Input, Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useUpdateProductMutation } from "../../../store/query/apiSplice";
import { useGetOneProductQuery } from "../../../store/query/apiSplice";

const updateProduct: NextPage = () => {
  const router = useRouter();
  const id = router.query.updateProductID;
  const [productID, setProductID] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [updateProduct] = useUpdateProductMutation();
  const { data: product } = useGetOneProductQuery(id);

  useEffect(() => {
    setName(product?.response.product_name);
    setPrice(product?.response.price);
    setProductID(product?.response.id);
  }, [product]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    updateProduct({ ...data, id: productID });
    router.push("/product");
  };
  return (
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
        <FormControl mb={5}>
          <FormLabel htmlFor="product_name">Name of Product</FormLabel>
          <Input
            id="product_name"
            value={name}
            {...register("product_name", {
              onChange: (e) => {
                setName(e.target.value);
              },
              required: "This is required",
            })}
          />
        </FormControl>

        <FormControl mb={5}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Input
            id="price"
            value={price}
            {...register("price", {
              onChange: (e) => {
                setPrice(e.target.value);
              },
              required: "This is required",
            })}
          />
        </FormControl>

        <Button marginY={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default updateProduct;
