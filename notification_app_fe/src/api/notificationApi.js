import axios from "axios";

import { Log } from "../utils/logger";

const BASE_URL =
  "http://20.207.122.201/evaluation-service/notifications";

const ACCESS_TOKEN =
  import.meta.env.VITE_ACCESS_TOKEN;

export async function fetchNotifications(
  type = "",
  page = 1,
  limit = 5
) {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications"
    );

    let url =
      `${BASE_URL}?page=${page}&limit=${limit}`;

    if (type) {
      url +=
        `&notification_type=${type}`;
    }

    const response = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return {
      success: true,
      data: response.data.notifications
    };
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Failed to fetch notifications"
    };
  }
}