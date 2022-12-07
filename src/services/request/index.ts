import Axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
} from "axios";
import { clearStorage, getItem } from "@utilities/localStorage";
import { ApiRoutes } from "./settings";
import { TApiRoutes } from "./types";
import { API_BASE_URL } from "@constants/routes";
import { toast } from "react-toastify";

const ApiInstance: AxiosInstance = Axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: getItem("token") ? "Bearer " + getItem("token") : false,
    } as AxiosRequestHeaders & { Authorization: string },
});

ApiInstance.interceptors.request.use(
    (config) => {
        const token = getItem("token");
        if (
            (!config.headers?.Authorization && token) ||
            token !== config.headers?.Authorization
        ) {
            config.headers = {
                ...config.headers,
                Authorization: "Bearer " + token,
            };
        } else if (config.headers.Authorization && !token) {
            config.headers = {
                ...config.headers,
                Authorization: "",
            };
        }

        const lang = getItem("language");
        if (lang) {
            config.params = {
                ...config.params,
                language: lang,
            };
        } else {
            config.params = {
                ...config.params,
                language: "fa",
            };
        }

        const timezone = getItem("tz");
        if (timezone) {
            config.params = {
                ...config.params,
                tz: timezone,
            };
        } else {
            config.params = {
                ...config.params,
                tz: "",
            };
        }

        const temperature = getItem("tu");
        if (temperature) {
            config.params = {
                ...config.params,
                tu: temperature,
            };
        } else {
            config.params = {
                ...config.params,
                tu: "",
            };
        }

        const distance = getItem("du");
        if (distance) {
            config.params = {
                ...config.params,
                du: distance,
            };
        } else {
            config.params = {
                ...config.params,
                du: "",
            };
        }

        const capacity = getItem("cu");
        if (capacity) {
            config.params = {
                ...config.params,
                cu: capacity,
            };
        } else {
            config.params = {
                ...config.params,
                cu: "",
            };
        }

        return config;
    },
    (error) => {
        toast.error("مشکل در برقراری ارتباط");

        return Promise.reject(error);
    },
);

ApiInstance.interceptors.response.use(
    (response) => {
        if (response.data && response.data.message) {
            toast.success(response.data.message);
        }

        return response;
    },
    (error) => {
        if (error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        }

        if (error.response.status === 401) {
            window.location.href = "/";
            clearStorage();
        }

        return Promise.reject(error);
    },
);

class Request {
    // Generic types structure
    // Body: body type
    // Response: response type

    async get<Response>(
        url:
            | keyof TApiRoutes
            | {
                  base: keyof TApiRoutes;
                  params: Record<string, string | number>;
              },
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<Response>> {
        return new Promise((resolve, reject) => {
            const route = ApiRoutes[typeof url === "string" ? url : url.base];

            let callUrl = route.url;

            if (typeof url !== "string") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`#${key}`, value?.toString());
                    return null;
                });
            }

            if (!route.methods.includes("GET")) {
                reject("This url don't have access to 'GET' method");
                return null;
            }

            ApiInstance.get(callUrl, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async post<Body, Response>(
        url:
            | keyof TApiRoutes
            | {
                  base: keyof TApiRoutes;
                  params: Record<string, string | number>;
              },
        data: Body,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<Response>> {
        return new Promise((resolve, reject) => {
            const route = ApiRoutes[typeof url === "string" ? url : url.base];

            let callUrl = route.url;

            if (typeof url !== "string") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`#${key}`, value?.toString());
                    return null;
                });
            }

            if (!route.methods.includes("POST")) {
                reject("This url don't have access to 'POST' method");
                return null;
            }

            ApiInstance.post(callUrl, data, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async put<Body, Response>(
        url:
            | keyof TApiRoutes
            | {
                  base: keyof TApiRoutes;
                  params: Record<string, string | number>;
              },
        data: Body,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<Response>> {
        return new Promise((resolve, reject) => {
            const route = ApiRoutes[typeof url === "string" ? url : url.base];

            let callUrl = route.url;

            if (typeof url !== "string") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`#${key}`, value?.toString());
                    return null;
                });
            }

            if (!route.methods.includes("PUT")) {
                reject("This url don't have access to 'PUT' method");
                return null;
            }

            ApiInstance.put(callUrl, data, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async patch<Body, Response>(
        url:
            | keyof TApiRoutes
            | {
                  base: keyof TApiRoutes;
                  params: Record<string, string | number>;
              },
        data: Body,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<Response>> {
        return new Promise((resolve, reject) => {
            const route = ApiRoutes[typeof url === "string" ? url : url.base];

            let callUrl = route.url;

            if (typeof url !== "string") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`#${key}`, value?.toString());
                    return null;
                });
            }

            if (!route.methods.includes("PATCH")) {
                reject("This url don't have access to 'PATCH' method");
                return null;
            }

            ApiInstance.patch(callUrl, data, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async delete<Response>(
        url:
            | keyof TApiRoutes
            | {
                  base: keyof TApiRoutes;
                  params: Record<string, string | number>;
              },
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<Response>> {
        return new Promise((resolve, reject) => {
            const route = ApiRoutes[typeof url === "string" ? url : url.base];

            let callUrl = route.url;

            if (typeof url !== "string") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`#${key}`, value?.toString());
                    return null;
                });
            }

            if (!route.methods.includes("DELETE")) {
                reject("This url don't have access to 'DELETE' method");
                return null;
            }

            ApiInstance.delete(callUrl, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }
}

export default Request;
