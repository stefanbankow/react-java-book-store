import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export interface ISearchInputProps {
  placeholder: string;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchInput({
  placeholder,
  setIsTyping,
}: ISearchInputProps) {
  const router = useRouter();
  const [timerVar, setTimerVar] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    router.replace(
      router.asPath.split("?")[0] +
        `?search=${event.target.value}&page=0&size=${
          router.query.size || 24
        }&sortBy=${router.query.sortBy || "id"}&asc=${
          router.query.asc || false
        }`,
      undefined,
      {
        shallow: true,
      }
    );
    clearTimeout(timerVar as NodeJS.Timeout);
    setTimerVar(setTimeout(() => setIsTyping(false), 750));
  };

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FiSearch} />}
      />
      <Input
        onChange={handleTyping}
        value={router.query.search || ""}
        placeholder={placeholder}
      />
    </InputGroup>
  );
}
