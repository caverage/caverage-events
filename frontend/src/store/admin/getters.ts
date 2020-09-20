import { AdminState } from "./state";
import { getStoreAccessors } from "typesafe-vuex";
import { State } from "../state";

export const getters = {
  adminUsers: (state: AdminState) => state.users,
  adminOneUser: (state: AdminState) => (userId: number) => {
    const filteredUsers = state.users.filter((user) => user.id === userId);
    if (filteredUsers.length > 0) {
      return { ...filteredUsers[0] };
    }
  },
  adminEvents: (state: AdminState) => state.events,
  adminOneEvent: (state: AdminState) => (eventId: number) => {
    const filteredEvents = state.events.filter((event) => event.id == eventId);
    if (filteredEvents.length > 0) {
      return { ...filteredEvents[0] };
    }
  },
};

const { read } = getStoreAccessors<AdminState, State>("");

export const readAdminOneUser = read(getters.adminOneUser);
export const readAdminUsers = read(getters.adminUsers);

export const readAdminOneEvent = read(getters.adminOneEvent);
export const readAdminEvents = read(getters.adminEvents);
