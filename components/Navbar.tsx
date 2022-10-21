import Link from "next/link";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../store/hook";
import { logout, selectAuth } from "../store/slice/authSlice";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import {
  Box,
  Flex,
  Text,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  MenuGroup,
  useToast,
} from "@chakra-ui/react";

interface Page {
  name: string;
  url: string;
}

const PAGES: Page[] = [
  { name: "Home", url: "/" },
  { name: "Shop", url: "/shop" },
  { name: "Products", url: "/product" },
];

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name } = useSelector(selectAuth);

  return (
    <>
      <Box bg={useColorModeValue("teal", "teal.900")} px={"5%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} fontWeight="semibold" textTransform={"uppercase"}>
            <HStack as={"nav"} spacing={6} color={"white"} display={{ base: "none", md: "flex" }}>
              {PAGES.map((page, index) => (
                <Link key={index} href={page.url}>
                  {page.name}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {name ? (
              <>
                <Flex alignItems="center">
                  <Flex gap={5} fontWeight="semibold" justifyContent={"center"} alignItems="center" flex="20%">
                    <Link href={"/cart"}>
                      <IconButton
                        aria-label={"Cart"}
                        fontSize={"1.5rem"}
                        variant={"ghost"}
                        color={"white"}
                        icon={<AiOutlineShoppingCart />}
                      />
                    </Link>
                  </Flex>
                  <Menu>
                    <MenuButton
                      as={Button}
                      colorScheme={"white"}
                      color="teal"
                      variant="ghost"
                      rightIcon={<ChevronDownIcon color={"white"} />}
                    >
                      <Flex alignItems={"center"} justifyContent="center" gap={1}>
                        <Avatar boxSize="1.30em" bg="pink.100" />
                        <Text color={"white"}>{name}</Text>
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      <MenuGroup>
                        <MenuItem>
                          <Link href={"/shop/create-shop"}>Create Shop</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href={"/product/create-product"}>Create Product</Link>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            dispatch(logout());
                            toast({
                              title: `Acount Logout`,
                              position: "bottom",
                              status: "error",
                              isClosable: true,
                            });
                            removeCookie("token", { path: "/" });
                            router.push("/");
                          }}
                        >
                          Logout
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </Flex>
              </>
            ) : (
              <>
                <Flex gap={5}>
                  <Flex justifyContent={"center"} alignItems="center" flex="20%" gap={2} fontWeight="semibold">
                    <Link href={"/cart"}>
                      <IconButton
                        color={"white"}
                        aria-label={"Cart"}
                        variant={"ghost"}
                        fontSize={"1.5rem"}
                        icon={<AiOutlineShoppingCart />}
                      />
                    </Link>
                  </Flex>
                  <Button colorScheme="white" variant="solid" flex="40%">
                    <Link href="/login">Login</Link>
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {PAGES.map((page, index) => (
                <Link key={index} href={page.url}>
                  {page.name}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
