import { Container, Stack, Text, Box } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Box position="absolute" bottom="0" width="100%">
    <Container bgColor="black" py={4}>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="center"
      spacing={8}
    >
      <Text color="white" fontSize="sm">
        © {new Date().getFullYear()} contactMate
      </Text>
    </Stack>
  </Container>
  </Box>
  )
}

export default Footer