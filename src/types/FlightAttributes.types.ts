export type FlightAttributes = {
    flightNumber: string;
    airplaneId: number;
    departureAirportId: string;
    arrivalAirportId: string;
    arrivalTime: Date;
    departureTime: Date;
    price: number;
    boardingGate?: string;
    totalSeats: number;
};
