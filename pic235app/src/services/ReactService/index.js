import axios, { AxiosRequestConfig } from "axios";

import config from "./../../config.json";

export const RequestType = {
  GET: "get",  // eslint-disable-line no-unused-vars
  POST: "post", // eslint-disable-line no-unused-vars
  PUT: "PUT", // eslint-disable-line no-unused-vars
  PATCH: "PATCH", // eslint-disable-line no-unused-vars
  DELETE: "DELETE" // eslint-disable-line no-unused-vars
}

export const ResponseType = {
  Normal: "Normal", // eslint-disable-line no-unused-vars
  Blob: "Blob", // eslint-disable-line no-unused-vars
  Zip: "Zip" // eslint-disable-line no-unused-vars
}

export class BaseService {
  // Name of the controller used in this service
  controller;

  constructor(controller) {
    this.controller = controller;
  }

  // Get the session token
  GetToken(key = "token") {
    return new Promise((resolve, reject) => {
      try {
        if (typeof localStorage !== "undefined") resolve(localStorage.getItem(key));
        return resolve(null);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Create a request using an URL
  async CreateRequestByUrl(
    requestType,
    url,
    data,// eslint-disable-line
    responseType = ResponseType.Normal
  ) {
    const token = await this.GetToken(`@${config.appName}:token`);

    const options = {
      method: requestType,
      url: config.apiUrl + url,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (responseType === ResponseType.Blob) options.responseType = "blob";
    else if (responseType === ResponseType.Zip) options.responseType = "arraybuffer";

    const { data: result } = await axios(options);

    return result;
  }

  async CreateRequest(
    requestType,
    route,
    data,
    responseType = ResponseType.Normal
  ) {
    return new Promise((resolve, reject) => {
      let url = `/${this.controller}`;

      if (route && route !== "") url = `${url}/${route}`;

      this.CreateRequestByUrl(requestType, url, data, responseType).then(resolve, (error) => {
        const e = error;
        const initialError = e.response ? e.response.data : e;
        const finalError = initialError.message ? initialError.message : initialError;
        reject(finalError);
      });
    });
  }
}
