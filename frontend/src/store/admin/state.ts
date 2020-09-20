import { IUserProfile, IEvent } from "@/interfaces";

export interface AdminState {
  users: IUserProfile[];
  events: IEvent[];
}
