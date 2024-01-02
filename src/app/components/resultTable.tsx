"use client";

import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Divider,
} from "@chakra-ui/react";
import { FlightUi } from "@/app/types/uiTypes";

const getTwoNumbers = (num: number): string => (num < 10 ? "0" : "") + num;

const secondsToHHmm = (time: number): string => {
  var h = Math.floor(time / 3600);
  var m = Math.floor((time % 3600) / 60);

  return `${getTwoNumbers(h)}:${getTwoNumbers(m)}`;
};

export default function ResultTable({
  params,
}: {
  params: {
    selectedFlight: FlightUi;
  };
}) {
  const departure = new Date(params.selectedFlight.departureTime * 1000);
  const arrival = new Date(params.selectedFlight.arrivalTime * 1000);
  const departureLocal = new Date(
    (params.selectedFlight.departureTime +
      params.selectedFlight.departureTimeLocalOffset) *
      1000
  );
  const arrivalLocal = new Date(
    (params.selectedFlight.arrivalTime +
      params.selectedFlight.arrivalTimeLocalOffset) *
      1000
  );

  const departureLocalTime =
    getTwoNumbers(departureLocal.getUTCHours()) +
    ":" +
    getTwoNumbers(departureLocal.getUTCMinutes());
  const arrivalLocalTime =
    getTwoNumbers(arrivalLocal.getUTCHours()) +
    ":" +
    getTwoNumbers(arrivalLocal.getUTCMinutes());

  const departureUtcTime =
    getTwoNumbers(departure.getUTCHours()) +
    ":" +
    getTwoNumbers(departure.getUTCMinutes());
  const arrivalUtcTime =
    getTwoNumbers(arrival.getUTCHours()) +
    ":" +
    getTwoNumbers(arrival.getUTCMinutes());

  const blockTime = secondsToHHmm(
    params.selectedFlight.arrivalTime - params.selectedFlight.departureTime
  );

  return (
    <>
      <Divider orientation="horizontal" mt={8} />
      <TableContainer mt={4} mb={24}>
        <Table
          __css={{ "table-layout": "fixed", width: "full" }}
          variant="striped"
          colorScheme="blue"
        >
          <Tbody fontSize={{ base: "small", sm: "medium" }}>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}>
                Flight
              </Td>
              <Td>{params.selectedFlight.flightNumber}</Td>
            </Tr>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}>
                Origin
              </Td>
              <Td>{params.selectedFlight.departureIcao.toUpperCase()}</Td>
            </Tr>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}></Td>
              <Td>{`${departureUtcTime} / ${departureLocalTime} (UTC/Local)`}</Td>
            </Tr>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}>
                Destination
              </Td>
              <Td>{params.selectedFlight.arrivalIcao.toUpperCase()}</Td>
            </Tr>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}></Td>
              <Td>{params.selectedFlight.arrivalName}</Td>
            </Tr>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}></Td>
              <Td>{`${arrivalUtcTime} / ${arrivalLocalTime} (UTC/Local)`}</Td>
            </Tr>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}>
                Length
              </Td>
              <Td>{`${blockTime}`}</Td>
            </Tr>
            <Tr>
              <Td width={{ base: "110px", sm: "130px", md: "150px" }}>
                Aircraft
              </Td>
              <Td>{params.selectedFlight.aircraft}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
