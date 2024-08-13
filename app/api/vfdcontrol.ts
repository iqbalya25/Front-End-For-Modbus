import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/vfdcontrol",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendCommand = async (command: "ON" | "OFF") => {
  try {
    const response = await api.post("/button", { command });
    return response.data;
  } catch (error) {
    console.error("Error sending command:", error);
    throw error;
  }
};

export const getLampStatus = async () => {
  try {
    const response = await api.get("/status");
    return response.data;
  } catch (error) {
    console.error("Error getting lamp status:", error);
    throw error;
  }
};