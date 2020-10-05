import { MainState } from "./state";
import { getStoreAccessors } from "typesafe-vuex";
import { State } from "../state";

const user = {
    hasAdminAccess: (state: MainState) => {
        return (
            state.userProfile &&
            state.userProfile.is_superuser &&
            state.userProfile.is_active
        );
    },
    userProfile: (state: MainState) => state.userProfile,
};

const login = {
    token: (state: MainState) => state.token,
    loginMethod: (state: MainState) => state.logInMethod,
    isLoggedIn: (state: MainState) => state.isLoggedIn,
    loginError: (state: MainState) => state.logInError,
};

const utility = {
    dashboardShowDrawer: (state: MainState) => state.dashboardShowDrawer,
    dashboardMiniDrawer: (state: MainState) => state.dashboardMiniDrawer,
    firstNotification: (state: MainState) =>
        state.notifications.length > 0 && state.notifications[0],
};

export const getters = {
    ...user,
    ...login,
    ...utility,
};

const { read } = getStoreAccessors<MainState, State>("");

/** User */
export const readHasAdminAccess = read(getters.hasAdminAccess);
export const readUserProfile = read(getters.userProfile);

/** Login */
export const readLogInMethod = read(getters.loginMethod);
export const readIsLoggedIn = read(getters.isLoggedIn);
export const readLoginError = read(getters.loginError);
export const readToken = read(getters.token);

/** Utility */
export const readDashboardMiniDrawer = read(getters.dashboardMiniDrawer);
export const readDashboardShowDrawer = read(getters.dashboardShowDrawer);
export const readFirstNotification = read(getters.firstNotification);
