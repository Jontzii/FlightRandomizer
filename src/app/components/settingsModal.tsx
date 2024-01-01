import { useEffect, useRef, useState } from "react";
import {
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { SettingsModelUi } from "@/app/types/uiTypes";

export default function SettingsModal({
  params,
}: {
  params: {
    isOpen: boolean;
    onClose: () => void;
    userLimits: SettingsModelUi,
    setUserLimits: (val: SettingsModelUi) => void
  };
}) {
  const finalRef = useRef(null);
  const [lowerLimit, setLowerLimit] = useState(0.5);
  const [upperLimit, setUpperLimit] = useState(4.0);

  const format = (val: number): string => `${val} h`;
  const parse = (val: string): number => Number(val.replace(/^\h/, ""));

  const submit = () => {
    const settingsToStore: SettingsModelUi = {
      lowerLimit: lowerLimit,
      upperLimit: upperLimit
    }
    
    params.setUserLimits(settingsToStore);
    params.onClose();
  }

  useEffect(() => {
    setLowerLimit(params.userLimits.lowerLimit);
    setUpperLimit(params.userLimits.upperLimit);
  }, [params.userLimits.lowerLimit, params.userLimits.upperLimit]);

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={params.isOpen}
      onClose={params.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel fontSize={"sm"} mt={3}>
            Lower limit for searching flights
          </FormLabel>
          <NumberInput
            step={0.5}
            min={0}
            max={Math.min(6, upperLimit - 1)}
            mt={1}
            mb={2}
            onChange={(valueString) => setLowerLimit(parse(valueString))}
            value={format(lowerLimit)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel fontSize={"sm"} mt={3}>
            Upper limit for searching flights
          </FormLabel>
          <NumberInput
            step={0.5}
            min={Math.max(2, lowerLimit + 1)}
            max={12}
            mt={1}
            mb={2}
            onChange={(valueString) => setUpperLimit(parse(valueString))}
            value={format(upperLimit)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={submit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
