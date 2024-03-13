export function getAuthorizationToken() {
  const key: string = localStorage.getItem("idToken") ?? "";
  return localStorage.getItem(key);
}

export const AuthInterceptor = async (config: any) => {
  if (config.headers != null) {
    config.headers.Authorization = `Bearer ${getAuthorizationToken()}`;
  }
  return config;
};
