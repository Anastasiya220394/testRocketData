import { UserRequest, UserResponse } from "./types";

export const loginUserRequest = async (user: UserRequest): Promise<UserResponse> => {
    const answer = await fetch(`http://api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: user.login,
        password: user.password,
      })
    });
    if (!answer.ok) {
      throw new Error(String(answer.status));
    }
    return answer.json();
};
