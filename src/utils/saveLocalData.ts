type authDataTypes = {
  accessToken: string;
};

export const saveLocalData = (authData: authDataTypes) => {
  const { accessToken } = authData;
  localStorage.removeItem('accessToken');
  localStorage.setItem('accessToken', accessToken);
};

export const saveLocalVariableData = (key: string, data: any) => {
  localStorage.setItem(key, data);
};

export const getLocalData = (key: string) => {
  const data = localStorage.getItem(key);
  return data;
};

export const removeLocalData = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalData = () => {
  localStorage.clear();
};
