import { api } from "@/api";
import { ActionContext } from "vuex";
import {
    IUserProfileCreate,
    IUserProfileUpdate,
    IEventCreate,
    IEventUpdate,
} from "@/interfaces";
import { State } from "../state";
import { AdminState } from "./state";
import { getStoreAccessors } from "typesafe-vuex";
import {
    commitSetUsers,
    commitSetUser,
    commitSetEvents,
    commitSetEvent,
} from "./mutations";
import { dispatchCheckApiError } from "../main/actions";
import {
    commitAddNotification,
    commitRemoveNotification,
} from "../main/mutations";

type MainContext = ActionContext<AdminState, State>;

/** User Actions */
const user = {
    async actionGetUsers(context: MainContext) {
        try {
            const response = await api.getUsers(context.rootState.main.token);
            if (response) {
                commitSetUsers(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateUser(
        context: MainContext,
        payload: { id: number; user: IUserProfileUpdate }
    ) {
        try {
            const loadingNotification = {
                content: "saving",
                showProgress: true,
            };
            commitAddNotification(context, loadingNotification);
            const response = (
                await Promise.all([
                    api.updateUser(
                        context.rootState.main.token,
                        payload.id,
                        payload.user
                    ),
                    await new Promise((resolve, reject) =>
                        setTimeout(() => resolve(), 500)
                    ),
                ])
            )[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: "User successfully updated",
                color: "success",
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateUser(context: MainContext, payload: IUserProfileCreate) {
        try {
            const loadingNotification = {
                content: "saving",
                showProgress: true,
            };
            commitAddNotification(context, loadingNotification);
            const response = (
                await Promise.all([
                    api.createUser(context.rootState.main.token, payload),
                    await new Promise((resolve, reject) =>
                        setTimeout(() => resolve(), 500)
                    ),
                ])
            )[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: "User successfully created",
                color: "success",
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionDeleteUser(context: MainContext, payload: { user_id: number }) {
        try {
            const loadingNotification = {
                content: "deleting",
                showProgress: true,
            };
            commitAddNotification(context, loadingNotification);
            const response = (
                await Promise.all([
                    api.deleteUser(
                        context.rootState.main.token,
                        payload.user_id
                    ),
                    await new Promise((resolve, reject) =>
                        setTimeout(() => resolve(), 500)
                    ),
                ])
            )[0];
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: "User successfully deleted",
                color: "success",
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
};

/** Event Actions */
const event = {
    async actionGetEvents(context: MainContext) {
        try {
            const response = await api.getEvents(context.rootState.main.token);
            if (response) {
                commitSetEvents(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateEvent(
        context: MainContext,
        payload: { id: number; event: IEventUpdate }
    ) {
        try {
            const loadingNotification = {
                content: "saving",
                showProgress: true,
            };
            commitAddNotification(context, loadingNotification);
            const response = (
                await Promise.all([
                    api.updateEvent(
                        context.rootState.main.token,
                        payload.id,
                        payload.event
                    ),
                    await new Promise((resolve, reject) =>
                        setTimeout(() => resolve(), 500)
                    ),
                ])
            )[0];
            commitSetEvent(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: "Event successfully updated",
                color: "success",
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateEvent(context: MainContext, payload: IEventCreate) {
        try {
            const loadingNotification = {
                content: "saving",
                showProgress: true,
            };
            commitAddNotification(context, loadingNotification);
            const response = (
                await Promise.all([
                    api.createEvent(context.rootState.main.token, payload),
                    await new Promise((resolve, reject) =>
                        setTimeout(() => resolve(), 500)
                    ),
                ])
            )[0];
            commitSetEvent(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: "Event successfully created",
                color: "success",
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },

    async actionDeleteEvent(
        context: MainContext,
        payload: { event_id: number }
    ) {
        try {
            const loadingNotification = {
                content: "deleting",
                showProgress: true,
            };
            commitAddNotification(context, loadingNotification);
            const response = (
                await Promise.all([
                    api.deleteEvent(
                        context.rootState.main.token,
                        payload.event_id
                    ),
                    await new Promise((resolve, reject) =>
                        setTimeout(() => resolve(), 500)
                    ),
                ])
            )[0];
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: "Event successfully deleted",
                color: "success",
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
};

/** Invite Actions */
const invite = {
    async actionSendInvites(
        context: MainContext,
        payload: { user_ids: number[]; event_id: number }
    ) {
        try {
            const loadingNotification = {
                content: "Inviting",
                showProgress: true,
            };
            commitAddNotification(context, loadingNotification);
            const response = (
                await Promise.all([
                    api.sendInvites(context.rootState.main.token, {
                        user_ids: payload.user_ids,
                        event_id: payload.event_id,
                    }),
                    await new Promise((resolve, reject) =>
                        setTimeout(() => resolve(), 500)
                    ),
                ])
            )[0];
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: "Invites Successfully Queued",
                color: "success",
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
};

export const actions = {
    ...user,
    ...event,
    ...invite,
};

const { dispatch } = getStoreAccessors<AdminState, State>("");

/** User */
export const dispatchCreateUser = dispatch(actions.actionCreateUser);
export const dispatchGetUsers = dispatch(actions.actionGetUsers);
export const dispatchUpdateUser = dispatch(actions.actionUpdateUser);
export const dispatchDeleteUser = dispatch(actions.actionDeleteUser);

/** Event */
export const dispatchCreateEvent = dispatch(actions.actionCreateEvent);
export const dispatchGetEvents = dispatch(actions.actionGetEvents);
export const dispatchUpdateEvent = dispatch(actions.actionUpdateEvent);
export const dispatchDeleteEvent = dispatch(actions.actionDeleteEvent);

/** Invite */
export const dispatchSendInvites = dispatch(actions.actionSendInvites);
