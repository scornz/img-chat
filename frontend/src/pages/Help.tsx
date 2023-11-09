import { Text, Stack, Center } from "@chakra-ui/react";

function Help() {
    return (
        <Center>
        <Stack pl="10%" pr="10%">
        <Text textAlign="center" fontSize="l" lineHeight="2">
            This application offers two 
            tabs: <Text as="span" fontWeight="bold">Conversational</Text> and <Text as="span" fontWeight="bold">Single Prompt</Text>. 
            The <Text as="span" fontWeight="bold">Conversational</Text> tab simulates a CUI using OpenAI's ChatGPT 3.5 for generating 
            an image using OpenAI's DALL-E 3. A user will input an initial prompt from which the CUI attempts to clarify any ambiguities before generating
            a final image. The <Text as="span" fontWeight="bold">Single Prompt</Text> tab simulates standard textual prompt image
            generation. Enter the same prompt to both different systems and see what happens!
        </Text>
        <Text textAlign="center" fontSize='xs' color='gray'>
            Built by Mike Scornavacca, Ava Crnkovic-Rubsamen, Pierce Maloney, and Henry Knoll in Fall 2023
        </Text>
        </Stack>
        </Center>
      );
}

export default Help;