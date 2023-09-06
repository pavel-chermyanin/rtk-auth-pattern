import { useRefreshMutation } from "../app/services/auth";

export const refreshAccessToken = async (refreshToken:string) => {
  const [refreshMutation] = useRefreshMutation();
  const refreshResponse = await refreshMutation({ refreshToken }).unwrap();
  return refreshResponse;
};
