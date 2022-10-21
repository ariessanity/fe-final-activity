import { useForm } from "react-hook-form";
import type { NextPage } from "next";
import { useSignupMutation } from "../../store/query/apiSplice";
import { useRouter } from "next/router";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Box, Text, Stack, useColorModeValue } from "@chakra-ui/react";

const schema = yup.object().shape({
  username: yup.string().min(4).required(),
  password: yup.string().min(4).max(32).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup: NextPage = () => {
  const router = useRouter();
  const [signup] = useSignupMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
    signup({ username: data.username, password: data.password, confirmPassword: data.confirmPassword });
    router.push("/login");
  };

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
        <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={5} isInvalid={!!errors?.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" placeholder="Enter username" {...register("username")} />
              <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb={5} isInvalid={!!errors?.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" placeholder="Enter password" type="password" {...register("password")} />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input id="confirmPassword" placeholder="Enter confirm password" type="password" {...register("confirmPassword")} />
              <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
            </FormControl>
            <Button marginY={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              Submit
            </Button>
            <Text>
              Have an Account?{" "}
              <Link href={"/login"} color="teal">
                Login
              </Link>
            </Text>
          </form>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Signup;
