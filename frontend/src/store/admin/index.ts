import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { AdminState } from "./state";

const defaultState: AdminState = {
  users: [],
  events: [],
};

export const adminModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};