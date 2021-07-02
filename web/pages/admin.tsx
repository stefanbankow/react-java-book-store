import { UserProfile } from "@auth0/nextjs-auth0";
import {
  Box,
  Fade,
  Container,
  Heading,
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import BooksAdminPanel from "../components/UI/Admin/Books/BooksAdminPanel";
import ErrorMessage from "../components/UI/ErrorMessage";
import { fetcher } from "../lib/fetcher";

export interface IAdminPageProps {}

export const useUserWithRole = () => {
  const { data, error } = useSWR("/api/auth/user", fetcher);
  return {
    data: data as { user: UserProfile; isAdmin: boolean },
    error,
    isLoading: !data && !error,
  };
};

export default function AdminPage() {
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);

  const { data, error, isLoading } = useUserWithRole();
  let pageData;

  const handleTabChange = (index: number) => {
    setTabIndex(index);
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
        <ErrorMessage
          status={error.status}
          message="There was an error when trying to verify your user role!"
        />
      </Center>
    );
  } else {
    if (data.isAdmin)
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
                <BooksAdminPanel />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
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
