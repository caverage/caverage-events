export interface IUserProfile {
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string;
  id: number;
}

export interface IUserProfileUpdate {
  email?: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface IUserProfileCreate {
  email: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface IEvent {
  name: string;
  description: string;
  date: string;
  attendees: IUserProfile[];
  id: number;
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
