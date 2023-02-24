import { useState } from "react";
// import Image from "next/image";
import {
  Flex,
  Text,
  Heading,
  Image,
  Input,
  Button,
  InputGroup,
  Stack,
  VStack,
  Divider,
  ButtonGroup,
  StackDivider,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src="/hamburger.png" alt="Green double couch with wooden legs" />
        <VStack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>

          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </VStack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Home;
