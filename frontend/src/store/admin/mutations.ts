import { IUserProfile, IEvent } from "@/interfaces";
import { AdminState } from "./state";
import { getStoreAccessors } from "typesafe-vuex";
import { State } from "../state";

/** User Mutations */
const user = {
    setUsers(state: AdminState, payload: IUserProfile[]) {
        state.users = payload;
    },
    setUser(state: AdminState, payload: IUserProfile) {
        const users = state.users.filter(
            (user: IUserProfile) => user.id !== payload.id
        );
        users.push(payload);
        state.users = users;
    },
};

/** Event Mutations */
const event = {
    setEvents(state: AdminState, payload: IEvent[]) {
        state.events = payload;
    },
    setEvent(state: AdminState, payload: IEvent) {
        const events = state.events.filter(
            (event: IEvent) => event.id !== payload.id
        );
        events.push(payload);
        state.events = events;
    },
};

export const mutations = {
    ...user,
    ...event,
};

const { commit } = getStoreAccessors<AdminState, State>("");

/** User */
export const commitSetUser = commit(mutations.setUser);
export const commitSetUsers = commit(mutations.setUsers);

/** Event */
export const commitSetEvent = commit(mutations.setEvent);
export const commitSetEvents = commit(mutations.setEvents);
