import { AdminState } from "./state";
import { getStoreAccessors } from "typesafe-vuex";
import { State } from "../state";

/** User Getters */
const user = {
    adminUsers: (state: AdminState) => state.users,
    adminOneUser: (state: AdminState) => (userId: number) => {
        const filteredUsers = state.users.filter((user) => user.id === userId);
        if (filteredUsers.length > 0) {
            return { ...filteredUsers[0] };
        }
    },
};

/** Event Getters */
const event = {
    adminEvents: (state: AdminState) => state.events,
    adminOneEvent: (state: AdminState) => (eventId: number) => {
        const filteredEvents = state.events.filter(
            (event) => event.id == eventId
        );
        if (filteredEvents.length > 0) {
            return { ...filteredEvents[0] };
        }
    },
};

export const getters = {
    ...user,
    ...event,
};

const { read } = getStoreAccessors<AdminState, State>("");

/** User */
export const readAdminOneUser = read(getters.adminOneUser);
export const readAdminUsers = read(getters.adminUsers);

/** Events */
export const readAdminOneEvent = read(getters.adminOneEvent);
export const readAdminEvents = read(getters.adminEvents);
