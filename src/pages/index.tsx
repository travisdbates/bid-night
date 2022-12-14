import { useState } from "react";
import {
  Center,
  Flex,
  Text,
  Heading,
  Divider,
  Avatar,
  SelectField,
  VStack,
  HStack,
  Skeleton,
  Input,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Editable,
  EditablePreview,
  EditableInput,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";

import { supabase } from "~/lib/supabase";
import { ChatIcon } from "@chakra-ui/icons";

const baseArray = new Array(250).fill(0);

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState({
    index: null,
    comment: "",
  });
  const {
    data,
    isValidating: applicationsValidating,
    mutate: applicationsMutate,
  } = useSWR(
    "existingAmounts",
    async () => {
      const { data } = await supabase
        .from("cash_call")
        .select("*")
        .order("id", { ascending: true });
      console.log({ data });
      return data;
    },
    { refreshInterval: 1000 }
  );

  return (
    <>
      <Head>
        <title>BidNight</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <Center
          p={4}
          m={4}
          borderRadius={8}
          border="2px solid black"
          w={480}
          maxWidth={480}
        >
          <Flex flexDir={"column"} w={"100%"} alignItems="center">
            <Text fontSize={36}>
              <strong>Bid</strong>Night
            </Text>
            <Divider mb={8} mt={8} />
            <VStack spacing={8} width={"100%"}>
              {baseArray.map((_, index) => {
                return (
                  <Flex
                    key={index}
                    width={"100%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Avatar
                      name={(index + 1).toString()}
                      getInitials={(name) => name}
                    />
                    {data ? (
                      <>
                        <SelectField
                          onChange={async (e) => {
                            console.log(index + 1, e.target.value);
                            await supabase
                              .from("cash_call")
                              .update({ amount: e.target.value })
                              .eq("id", index + 1);
                            applicationsMutate();
                          }}
                          value={data[index]?.amount ? data[index].amount : 0}
                        >
                          <option value={null}>-</option>
                          <option value={100}>$100</option>
                          <option value={500}>$500</option>
                          <option value={1000}>$1,000</option>
                          <option value={2000}>$2,000</option>
                          <option value={3000}>$3,000</option>
                          <option value={4000}>$4,000</option>
                          <option value={5000}>$5,000</option>
                          <option value={10000}>$10,000</option>
                          <option value={12000}>$12,000</option>
                          <option value={15000}>$15,000</option>
                          <option value={20000}>$20,000</option>
                          <option value={30000}>$30,000</option>
                          <option value={40000}>$40,000</option>
                          <option value={50000}>$50,000</option>
                          <option value={100000}>$100,000</option>
                        </SelectField>
                        {/* <EditableInputField
                          value={data[index]?.amount ? data[index].amount : 0}
                        /> */}
                        <Editable
                          defaultValue={
                            data[index]?.amount ? data[index].amount : "Edit"
                          }
                          onSubmit={async (value) => {
                            console.log(index + 1, value);
                            await supabase
                              .from("cash_call")
                              .update({ amount: value })
                              .eq("id", index + 1);
                            applicationsMutate();
                          }}
                          border={"1px solid rgba(0,0,0,0.1)"}
                          borderRadius={8}
                          paddingX={2}
                        >
                          <EditablePreview />
                          <EditableInput type={"number"} pattern="\d*" />
                        </Editable>
                        <Button
                          onClick={() => {
                            setComment({
                              index,
                              comment: data[index]?.comments
                                ? data[index].comments
                                : "",
                            });
                            onOpen();
                          }}
                          variant={data[index]?.comments ? "solid" : "outline"}
                          colorScheme={data[index]?.comments ? "blue" : ""}
                        >
                          <ChatIcon />
                        </Button>
                      </>
                    ) : (
                      <Skeleton />
                    )}
                  </Flex>
                );
              })}
            </VStack>
          </Flex>
        </Center>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={comment.comment}
              onChange={async (e) => {
                setComment({
                  index: comment.index,
                  comment: e.target.value,
                });
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={async () => {
                await supabase
                  .from("cash_call")
                  .update({ comments: comment.comment })
                  .eq("id", comment.index + 1);
                applicationsMutate();
                onClose();
              }}
              colorScheme="blue"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
