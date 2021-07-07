import { Button, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export interface IAdminBookPanelButtonProps {
  type: string;
  width: string;
  children: React.ReactNode;
}

export default function AdminBookPanelButton({
  type,
  width,
  children,
}: IAdminBookPanelButtonProps) {
  const router = useRouter();
  const handleSortButtonClick = () => {
    const query = router.query;

    if ((query.sortBy || "id") === type) {
      router.push(
        router.asPath.split("?")[0] +
          `?search=${query.search || ""}&page=0&size=${
            query.size || 24
          }&sortBy=${query.sortBy || "id"}&asc=${!Boolean(
            query.asc === "true" || false
          )}`
      );
    } else {
      router.push(
        router.asPath.split("?")[0] +
          `?search=${query.search || ""}&page=0&size=${
            query.size || 24
          }&sortBy=${type}&asc=${query.asc || false}`
      );
    }
  };

  return (
    <Button
      variant="link"
      isActive={(router.query.sortBy || "id") === type}
      onClick={handleSortButtonClick}
      whiteSpace="normal"
      h="50px"
      w={width}
    >
      {children}
      {(router.query.sortBy || "id") === type &&
        (router.query.asc === "true" ? (
          <Icon as={FiChevronUp} />
        ) : (
          <Icon as={FiChevronDown} />
        ))}
    </Button>
  );
}
