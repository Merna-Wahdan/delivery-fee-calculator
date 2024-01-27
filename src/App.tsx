import React from 'react'
import Calculator from './Calculator'
import { Box, Container, Flex } from '@chakra-ui/react'

const App = (): JSX.Element => {
  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/background.jpg')"
        bgSize="cover"
        bgPosition="center"
        filter="blur(10px)"
    />
    <Flex
      position="fixed"
      inset="0"
      justifyContent="center"
      alignItems="center"
    >
      <Container
        position="relative"
        maxWidth="xl"
        p={5}
        boxShadow="2xl"
        borderRadius="md"
        bgColor="rgba(255, 255, 255, 0.8)"
        >
        <Calculator />
      </Container>
    </Flex>
  </>)
}

export default App
