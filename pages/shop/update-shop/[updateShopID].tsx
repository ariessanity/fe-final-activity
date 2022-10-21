import { useEffect, useState } from "react";
import { NextPage } from "next";
import { FormControl, FormLabel, Input, Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useUpdateShopMutation } from "../../../store/query/apiSplice";
import { useGetOneShopQuery } from "../../../store/query/apiSplice";

const updateShop: NextPage = () => {
  const router = useRouter();
  const id = router.query.updateShopID;
  const [shopID, setShopID] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [updateShop] = useUpdateShopMutation();
  const { data: shop, isLoading, isSuccess, isError, error } = useGetOneShopQuery(id);

  useEffect(() => {
    setName(shop?.response.name);
    setAddress(shop?.response.address);
    setBusinessType(shop?.response.business_type);
    setShopID(shop?.response.id);
  }, [shop]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    updateShop({ ...data, id: shopID });
    router.push("/shop");
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
          <FormLabel htmlFor="name">Name of Product</FormLabel>
          <Input
            id="name"
            value={name}
            {...register("name", {
              onChange: (e) => {
                setName(e.target.value);
              },
              required: "This is required",
            })}
          />
        </FormControl>

        <FormControl mb={5}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id="address"
            value={address}
            {...register("address", {
              onChange: (e) => {
                setAddress(e.target.value);
              },
              required: "This is required",
            })}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="business_type">Business Type</FormLabel>
          <Input
            id="business_type"
            value={businessType}
            {...register("business_type", {
              onChange: (e) => {
                setBusinessType(e.target.value);
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

export default updateShop;
