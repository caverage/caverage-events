import axios from "axios";
import { apiUrl } from "@/env";
import {
  IUserProfile,
  IUserProfileUpdate,
  IUserProfileCreate,
  IEvent,
  IEventUpdate,
  IEventCreate,
} from "./interfaces";
import { dispatchDeleteEvent, dispatchDeleteUser } from "./store/admin/actions";

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
  },
  async createLogInCode(user_id: number) {
    return axios.post<string>(
      `${apiUrl}/api/v1/login/access-token-link-create/${user_id}`
    );
  },
  async logInGetTokenCode(code: string) {
    return axios.post(`${apiUrl}/api/v1/login/access-token-link/${code}`);
  },
  async getMe(token: string) {
    return axios.get<IUserProfile>(
      `${apiUrl}/api/v1/users/me`,
      authHeaders(token)
    );
  },
  async updateMe(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfile>(
      `${apiUrl}/api/v1/users/me`,
      data,
      authHeaders(token)
    );
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(
      `${apiUrl}/api/v1/users/`,
      authHeaders(token)
    );
  },
  async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
    return axios.put(
      `${apiUrl}/api/v1/users/${userId}`,
      data,
      authHeaders(token)
    );
  },
  async createUser(token: string, data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
  },
  async deleteUser(token: string, user_id: number) {
    return axios.delete(
      `${apiUrl}/api/v1/users/${user_id}`,
      authHeaders(token)
    );
  },
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },
  async getEvents(token: string) {
    return axios.get<IEvent[]>(`${apiUrl}/api/v1/events/`, authHeaders(token));
  },
  async updateEvent(token: string, eventId: number, data: IEventUpdate) {
    return axios.put(
      `${apiUrl}/api/v1/events/${eventId}`,
      data,
      authHeaders(token)
    );
  },
  async createEvent(token: string, data: IEventCreate) {
    return axios.post(`${apiUrl}/api/v1/events/`, data, authHeaders(token));
  },
  async deleteEvent(token: string, event_id: number) {
    return axios.delete(
      `${apiUrl}/api/v1/events/${event_id}`,
      authHeaders(token)
    );
  },
  async register(
    number: string,
    name: string,
    username?: string,
    password?: string
  ) {
    return axios.post<IUserProfile>(`${apiUrl}/api/v1/users/open`, {
      number: number,
      full_name: name,
      email: username,
      password: password,
    });
  },
};
