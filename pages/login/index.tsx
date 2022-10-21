import { useForm } from "react-hook-form";
import type { NextPage } from "next";
import Link from "next/link";
import { useLoginMutation } from "../../store/query/apiSplice";
import { useRouter } from "next/router";
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Box, Text, useToast, Stack, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hook";
import { useCookies } from "react-cookie";
import { setUser } from "../../store/slice/authSlice";

const Login: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [login, { data: user, isLoading, isSuccess, isError, error }] = useLoginMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    login({ username: data.username, password: data.password });
  };

  useEffect(() => {
    if (isSuccess) {
      setCookie("token", user?.response?.response?.accessToken, { path: "/" });
      dispatch(setUser({ name: user?.response.username, accessToken: user?.response?.response?.accessToken }));
      toast({
        title: `Account Login`,
        position: "bottom",
        status: "success",
        isClosable: true,
      });
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>{error}</h1>}
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb={5} isInvalid={!!errors?.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  placeholder="Enter username"
                  {...register("username", {
                    required: "This is required",
                    minLength: { value: 4, message: "Minimum length should be 4" },
                  })}
                />
                <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors?.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "This is required",
                    minLength: { value: 4, message: "Minimum length should be 4" },
                  })}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>

              <Stack spacing={3} mt={5}>
                <Button
                  type="submit"
                  bg={"teal"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                >
                  Sign in
                </Button>
                <Text>
                  New Customer?{" "}
                  <Link href={"/signup"} color="teal">
                    Signup
                  </Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Login;
