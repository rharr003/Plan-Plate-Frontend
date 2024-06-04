type LocalAuthReturn = [string | null, (token: string) => void, () => void];

export default function useLocalAuth(): LocalAuthReturn {
  const token = localStorage.getItem("plan-plate-token");
  function setToken(token: string) {
    localStorage.setItem("plan-plate-token", token);
  }

  function deleteToken() {
    localStorage.removeItem("plan-plate-token");
  }

  return [token, setToken, deleteToken];
}
