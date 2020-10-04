export interface IUserProfile {
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string;
  id: number;
  number: string;
  invites: IInvite[];
}

export interface IUserProfileUpdate {
  email?: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  number?: string;
}

export interface IUserProfileCreate {
  email: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  number: string;
}

export interface IEvent {
  name: string;
  description: string;
  date: string;
  id: number;
  invites: IInvite[];
}

export interface IEventUpdate {
  name?: string;
  description?: string;
  date?: string;
  attendees?: IUserProfile[];
}

export interface IEventCreate {
  name?: string;
  description?: string;
  date?: string;
  attendees?: IUserProfile[];
}

export interface IInvite {
  user: IUserProfile;
  event: IEvent;
  status: string;
}
