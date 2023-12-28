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
import { SettingsModelUi } from "../types/uiTypes";

export default function SettingsModal({
  params,
}: {
  params: {
    isOpen: boolean;
    onClose: () => void;
  };
}) {
  const finalRef = useRef(null);
  const [lowerLimit, setLowerLimit] = useState("0.5");
  const [upperLimit, setUpperLimit] = useState("4");

  const format = (val: string) => `${val} h`;
  const parse = (val: string) => val.replace(/^\h/, "");

  const submitToLocalStorage = () => {
    const settingsToStore: SettingsModelUi = {
      lowerLimit: lowerLimit,
      upperLimit: upperLimit
    }
    
    localStorage.removeItem("flightrandomizer-limits-settings-ui");
    localStorage.setItem("flightrandomizer-limits-settings-ui", JSON.stringify(settingsToStore));

    params.onClose();
  }

  useEffect(() => {
    const getSettings = (): SettingsModelUi => {
      const json = localStorage.getItem("flightrandomizer-limits-settings-ui");

      if (!json) {
        return {
          lowerLimit: "0.5",
          upperLimit: "4",
        };
      }

      const item: SettingsModelUi = JSON.parse(json);
      return item;
    };

    const values = getSettings();
    setLowerLimit(values.lowerLimit);
    setUpperLimit(values.upperLimit);
  }, [])

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
            max={3}
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
            min={3}
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
          <Button colorScheme="blue" mr={3} onClick={submitToLocalStorage}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
