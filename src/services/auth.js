const PREFIX = "@fidback/";

export const setUserData = (userData, token) => {
  localStorage.setItem(
    `${PREFIX}userData`,
    JSON.stringify({ user: userData, accessToken: token })
  );
};

export const getUserData = () => {
  return JSON.parse(localStorage.getItem(`${PREFIX}userData`));
};

export const isAuthenticated = () => {
  return localStorage.getItem(`${PREFIX}userData`) !== null;
};

export const logout = () => {
  localStorage.removeItem(`${PREFIX}userData`);
};

export const getToken = () => {
  if (isAuthenticated()) {
    const { accessToken } = getUserData();
    return accessToken;
  }

  return null;
};
