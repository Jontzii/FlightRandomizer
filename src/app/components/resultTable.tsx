"use client"

import { Flight } from "../types/airlineTypes";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  Show,
} from "@chakra-ui/react";

const getTwoNumbers = (num: number): string => (num < 10 ? "0" : "") + num

export default function ResultTable({
  params,
}: {
  params: {
    selectedFlight: Flight;
  };
  }) {
  
  const departureDate = new Date(params.selectedFlight.departureTime * 1000);
  const arrivalDate = new Date(params.selectedFlight.arrivalTime * 1000);

  return (
    <>
      <Divider orientation="horizontal" mt={8} />
      <TableContainer mt={4} mb={24}>
        <Show above="md">
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Flight</Th>
                <Th>Origin</Th>
                <Th>Destination</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{params.selectedFlight.flightNumber}</Td>
                <Td>
                  {`${params.selectedFlight.departureIcao} - ${getTwoNumbers(
                    departureDate.getHours()
                  )}:${getTwoNumbers(departureDate.getMinutes())}`}
                </Td>
                <Td>
                  {`${params.selectedFlight.arrivalIcao} - ${getTwoNumbers(
                    arrivalDate.getHours()
                  )}:${getTwoNumbers(arrivalDate.getMinutes())}`}
                </Td>
              </Tr>
              <Tr>
                <Td>{params.selectedFlight.aircraft}</Td>
                <Td>{params.selectedFlight.departureName}</Td>
                <Td>{params.selectedFlight.arrivalName}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Show>
        <Show below="md">
          <Table variant="striped" colorScheme="blue">
            <Tbody>
              <Tr>
                <Td>Flight</Td>
                <Td>{params.selectedFlight.flightNumber}</Td>
              </Tr>
              <Tr>
                <Td>Origin</Td>
                <Td>{params.selectedFlight.departureIcao}</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>{`${getTwoNumbers(
                  departureDate.getHours()
                )}:${getTwoNumbers(departureDate.getMinutes())}`}</Td>
              </Tr>
              <Tr>
                <Td>Destination</Td>
                <Td>{params.selectedFlight.arrivalIcao}</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>{`${getTwoNumbers(arrivalDate.getHours())}:${getTwoNumbers(
                  arrivalDate.getMinutes()
                )}`}</Td>
              </Tr>
              <Tr>
                <Td>Aircraft</Td>
                <Td>{params.selectedFlight.aircraft}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Show>
      </TableContainer>
    </>
  );
}