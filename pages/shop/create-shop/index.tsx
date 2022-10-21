import { FormControl, FormLabel, Input, Button, Box, Text, FormErrorMessage, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateShopMutation } from "../../../store/query/apiSplice";
import PrivateRoute from "../../../components/PrivateRoute";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  business_type: yup.string().required("Business Type is required"),
});

const CreateShop: NextPage = () => {
  const [createShop] = useCreateShopMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    createShop({ ...data, is_active: true });
    Router.push("/shop");
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
          <FormControl mb={5} isInvalid={!!errors?.name}>
            <FormLabel htmlFor="name">Business Name</FormLabel>
            <Input
              id="name"
              placeholder="Enter name"
              {...register("name", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl mb={5} isInvalid={!!errors?.address}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              id="address"
              placeholder="Enter address"
              {...register("address", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.business_type}>
            <FormLabel htmlFor="business_type">Business Type</FormLabel>
            <Input
              id="business_type"
              placeholder="Enter business type"
              {...register("business_type", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>{errors.business_type && errors.business_type.message}</FormErrorMessage>
          </FormControl>

          <Button marginY={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
            Create
          </Button>
        </form>
      </Box>
    </PrivateRoute>
  );
};

export default CreateShop;
