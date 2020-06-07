declare namespace API {
  export interface CurrentUser {
    name: string;
    email: string;
    access?: 'user' | 'guest' | 'admin';
  }

  export interface LoginStateType {
    ok: 1 | 0;
    info?: {
      email: string;
      name: string;
    };
    token?: string;
    message?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
