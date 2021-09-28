import { useAuth0 } from "@auth0/auth0-react";
import {
  Flex,
  Center,
  Spinner,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Fade,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminTabPanel from "../../components/UI/Admin/AdminTabPanel";
import MyErrorMessage from "../../components/UI/MyErrorMessage";
import { isUserAdmin } from "../../lib/auth0util";

export interface IAdminTabProps {}

export default function AdminTab({}: IAdminTabProps) {
  const tabNames = ["orders", "books", "authors"];
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    switch (router.query.adminTab && router.query.adminTab[0]) {
      case "orders":
        setTabIndex(0);
        break;
      case "books":
        setTabIndex(1);
        break;
      case "authors":
        setTabIndex(2);
        break;
      default:
        break;
    }
  }, [router.query.adminTab]);

  const { user, error, isLoading } = useAuth0();
  let pageData;

  const handleTabChange = (index: number) => {
    router.push("/admin/" + tabNames[index]);
  };

  if (isLoading) {
    pageData = (
      <Flex my="20" minH="80vh">
        <Center my="auto" w="100%">
          <Spinner size="xl" />
        </Center>
      </Flex>
    );
  } else if (error) {
    router.replace("/");
    pageData = (
      <Center
        flexDir="column"
        mx="auto"
        my="10"
        textAlign="center"
        w="90%"
        h="80vh"
      >
        <MyErrorMessage
          status={500}
          message="There was an error when trying to verify your user role!"
        />
      </Center>
    );
  } else {
    if (isUserAdmin(user!))
      pageData = (
        <>
          <Heading textAlign={{ base: "center", md: "left" }} my="10">
            Admin Dashoard
          </Heading>
          <Tabs
            index={tabIndex}
            onChange={handleTabChange}
            isLazy={true}
            variant="enclosed"
            colorScheme="gray"
          >
            <TabList>
              <Tab>Orders</Tab>
              <Tab>Books</Tab>
              <Tab>Authors</Tab>
            </TabList>
            <TabPanels>
              <TabPanel />
              <TabPanel>
                <AdminTabPanel tabType="books" />
              </TabPanel>
              <TabPanel>
                <AdminTabPanel tabType="authors" />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      );
    else router.push("/");
  }
  return (
    <Box mx={{ base: "5", md: "10" }} mb="10">
      <Fade in transition={{ enter: { duration: 1 } }}>
        <Container maxW="100%">{pageData}</Container>
      </Fade>
    </Box>
  );
}
