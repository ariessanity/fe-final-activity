import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

const LoadingToRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  return <></>;
};

export default LoadingToRedirect;
