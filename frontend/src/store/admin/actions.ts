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

export const actions = {
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
      const loadingNotification = { content: "saving", showProgress: true };
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
      const loadingNotification = { content: "saving", showProgress: true };
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
      const loadingNotification = { content: "saving", showProgress: true };
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
      const loadingNotification = { content: "saving", showProgress: true };
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
};

const { dispatch } = getStoreAccessors<AdminState, State>("");

export const dispatchCreateUser = dispatch(actions.actionCreateUser);
export const dispatchGetUsers = dispatch(actions.actionGetUsers);
export const dispatchUpdateUser = dispatch(actions.actionUpdateUser);

export const dispatchCreateEvent = dispatch(actions.actionCreateEvent);
export const dispatchGetEvents = dispatch(actions.actionGetEvents);
export const dispatchUpdateEvent = dispatch(actions.actionUpdateEvent);
