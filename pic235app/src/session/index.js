import config from "./../config.json";

export class Session {
  static setToken = async (token, setAdmin = true) => {
    if (typeof localStorage !== "undefined")
      localStorage.setItem(`@${config.appName}:token`, token);

    if (setAdmin)
      localStorage.setItem(`@${config.appName}:token-admin`, token);
  };

  static getToken = async (admin = false) => {
    if (typeof localStorage !== "undefined") {
      if (!admin)
        return localStorage.getItem(`@${config.appName}:token`);
      else
        return localStorage.getItem(`@${config.appName}:token-admin`);
    }

    return null;
  };

  static clear = async () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(`@${config.appName}:token`);
      localStorage.removeItem(`@${config.appName}:token-admin`);
    }
  };
}