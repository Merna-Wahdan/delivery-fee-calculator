import React from 'react'
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const FeeDetails = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const intl = useIntl()

  return (
      <>
        <Image borderRadius="full" onClick={onOpen} objectFit="cover" boxSize="30px" mb="2px" src="/exclamation-mark.png" alt="how delivery fee is calculated info"/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader >{intl.formatMessage({ id: 'how_delivery_price_is_calculated' })}:</ModalHeader>
            <ModalCloseButton />
            <ModalBody as="i" fontSize="lg" mb="10px" color="gray.600" lineHeight="1.7">
              { intl.formatMessage({ id: 'delivery_price_breakdown_info' }, { br: <br /> }) }
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
