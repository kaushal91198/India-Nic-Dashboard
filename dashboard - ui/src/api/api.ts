import axios from "axios";

// Create an Axios instance with custom settings
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
});
import { toast } from "react-toastify";

// Helper function to show error notifications.
// Replace alert() with your preferred notification method or library (e.g., toast notifications).
const notifyError = (status: number | string, message: string) => {
  toast.error(`${status} - ${message} `, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// Request interceptor to modify or log requests before they are sent
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Intercepted request:", config);
    // Example: Add an Authorization header if token exists
    const token = localStorage.getItem("token"); // or any token retrieval mechanism
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Intercepted response:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      // Check if current window location is "/" and status is 401; if so, skip notifyError.
      if (status === 401 && window.location.pathname === "/") {
        return Promise.reject(error);
      }

      switch (status) {
        case 400:
          notifyError(
            status,
            "Bad Request: The server could not understand the request."
          );
          break;
        case 401:
          notifyError(status, "Unauthorized: Please log in.");
          break;
        case 403:
          notifyError(
            status,
            "Forbidden: You do not have permission to access this resource."
          );
          break;
        case 404:
          notifyError(
            status,
            "Not Found: The requested resource could not be found."
          );
          break;
        case 500:
          notifyError(
            status,
            "Internal Server Error: Something went wrong on the server."
          );
          break;
        default:
          notifyError(status, `An error occurred. Status code: ${status}`);
          break;
      }
    } else if (error.request) {
      notifyError("Network Error", "No response received from the server.");
    } else {
      notifyError("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
