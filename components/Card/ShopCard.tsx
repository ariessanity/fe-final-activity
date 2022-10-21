import { Box, Center, Heading, Stack, Text, useColorModeValue, Image, Badge, Switch, Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useToggleShopMutation } from "../../store/query/apiSplice";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDeleteShopMutation } from "../../store/query/apiSplice";

interface Props {
  name: string;
  address: string;
  business_type: string;
  shopID: number;
  is_active?: boolean;
}

const ShopCard: React.FC<Props> = ({ name, address, business_type, shopID, is_active }) => {
  const [deleteShop] = useDeleteShopMutation();
  const [toggleShop] = useToggleShopMutation();

  const IMAGE =
    "https://img.freepik.com/free-vector/shopping-mall-outside-composition-mall-building-with-tags-headlines-shops-wall_1284-58788.jpg?w=1480&t=st=1666255783~exp=1666256383~hmac=b9b7a49b0e96d43ec58b4526710d9c50d73297bfc3c42fb93f6bf59c9aba5957";
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={0}
      >
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"200px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(10px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image rounded={"lg"} height={200} width={282} objectFit={"cover"} src={IMAGE} />
        </Box>
        <Stack pt={10} align={"start"}>
          <Flex justifyContent={"space-between"} width="100%">
            <Badge colorScheme="purple"> {business_type}</Badge>
            <Switch
              size="sm"
              isChecked={is_active}
              onChange={() => {
                toggleShop({ id: shopID, is_active: !is_active });
              }}
            />
          </Flex>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            <Link href={`/shop/${shopID}`}>{name}</Link>
          </Heading>
          <Flex justifyContent="space-between" alignContent="center" w={"100%"}>
            <Text color={"gray.500"} fontSize={"xl"}>
              {address}
            </Text>
            <Flex alignItems={"center"}>
              <Link href={`/shop/update-shop/${shopID}`}>
                <IconButton aria-label={"Delete Product"} mr={-3} variant="ghost" icon={<EditIcon />} />
              </Link>

              <IconButton
                aria-label={"Delete Product"}
                mr={-3}
                variant="ghost"
                icon={<DeleteIcon />}
                onClick={() => {
                  deleteShop(shopID);
                }}
              />
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
};

export default ShopCard;
