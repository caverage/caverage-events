import { IUserProfile } from "@/interfaces";
import { MainState, AppNotification } from "./state";
import { getStoreAccessors } from "typesafe-vuex";
import { State } from "../state";

const login = {
    setToken(state: MainState, payload: string) {
        state.token = payload;
    },
    setLogInMethod(state: MainState, payload: string) {
        state.logInMethod = payload;
    },
    setLoggedIn(state: MainState, payload: boolean) {
        state.isLoggedIn = payload;
    },
    setLogInError(state: MainState, payload: boolean) {
        state.logInError = payload;
    },
};

const user = {
    setUserProfile(state: MainState, payload: IUserProfile) {
        state.userProfile = payload;
    },
};

const utility = {
    setDashboardMiniDrawer(state: MainState, payload: boolean) {
        state.dashboardMiniDrawer = payload;
    },
    setDashboardShowDrawer(state: MainState, payload: boolean) {
        state.dashboardShowDrawer = payload;
    },
    removeNotification(state: MainState, payload: AppNotification) {
        state.notifications = state.notifications.filter(
            (notification) => notification !== payload
        );
    },
    addNotification(state: MainState, payload: AppNotification) {
        state.notifications.push(payload);
    },
};

export const mutations = {
    ...login,
    ...user,
    ...utility,
};

const { commit } = getStoreAccessors<MainState | any, State>("");

/** Login */
export const commitSetLogInMethod = commit(mutations.setLogInMethod);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLogInError = commit(mutations.setLogInError);
export const commitSetToken = commit(mutations.setToken);

/** User */
export const commitSetUserProfile = commit(mutations.setUserProfile);

/** Utility */
export const commitSetDashboardMiniDrawer = commit(
    mutations.setDashboardMiniDrawer
);
export const commitSetDashboardShowDrawer = commit(
    mutations.setDashboardShowDrawer
);
export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
