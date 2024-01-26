import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"


export const FeeDetails = (): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Image  borderRadius="full" onClick={onOpen} objectFit="cover" boxSize="30px" mb="2px" src="/exclamation-mark.png"/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader >How delivery fee is calculated:</ModalHeader>
            <ModalCloseButton />
            <ModalBody as="i" fontSize="lg" mb="10px" color="gray.600" lineHeight="1.7">
            • If the cart value is below 10€, a surcharge equal to the difference up to 10€ is added.
            <br/>
            • A base fee of 2€ covers the first 1km, with an additional 1€ for every extra 500m; a minimum fee of 1€ always applies.
            <br/>
            • A surcharge of 50 cents is added for each item starting from the fifth one. For orders with more than 12 items, an extra 1.20€ is charged.
            <br/>
            • During Friday rush hours (3 - 7 PM), the delivery fee increases by 1.2x, with a maximum cap of 15€
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }