interface bookingType {
  customerId: string;
  timeSlots: number[];
}

interface roomsType {
  name: string;
  availableTimeSlots: boolean[];
  bookings: bookingType[];
}

export interface clubType {
  _id: string;
  phoneNumber: string;
  nameClub: string;
  location: string;
  roomsNumber: number;
  rooms: roomsType[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ClubSliceState {
  clubs: clubType[];
  status: Status;
}
