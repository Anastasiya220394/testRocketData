export type UserRequest = {
    login: string;
    password: string;
};

export type UserResponse = {
    isSuccess: boolean;
    accessToken: string;
    refreshToken: string;
    userName: string;
};
