import { ClubSliceState } from "src/entities/Club";
import { CustomerSliceState } from "src/entities/Customer/model/types/customer";
import { timeReserveType } from "src/features/Reserve/model/types/timeReserveType";
import { AuthState } from "src/features/auth/model/types/auth";

export interface StateSchema {
  club: ClubSliceState;
  customer: CustomerSliceState;
  auth: AuthState
  reserve: timeReserveType;
}
