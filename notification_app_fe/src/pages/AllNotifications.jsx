import {
  useEffect,
  useState
} from "react";

import {
  CircularProgress,
  Alert,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack
} from "@mui/material";

import Navbar from "../components/Navbar";

import NotificationCard from "../components/NotificationCard";

import { fetchNotifications } from "../api/notificationApi";

import { Log } from "../utils/logger";

function AllNotifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [filterType, setFilterType] =
    useState("");

  const [page, setPage] =
    useState(1);

  const limit = 5;

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);

      await Log(
        "frontend",
        "info",
        "page",
        "Opened All Notifications page"
      );

      const result =
        await fetchNotifications(
          filterType,
          page,
          limit
        );

      if (result.success) {
        setNotifications(result.data);

        setError("");

        await Log(
          "frontend",
          "info",
          "component",
          "Notifications displayed successfully"
        );
      } else {
        setError(result.error);

        await Log(
          "frontend",
          "error",
          "component",
          "Failed to display notifications"
        );
      }

      setLoading(false);
    }

    loadNotifications();
  }, [filterType, page]);

  return (
    <div>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
        >
          All Notifications
        </Typography>

        <FormControl
          fullWidth
          sx={{ marginBottom: 3 }}
        >
          <InputLabel>
            Filter By Type
          </InputLabel>

          <Select
            value={filterType}
            label="Filter By Type"
            onChange={(e) => {
              setFilterType(
                e.target.value
              );

              setPage(1);
            }}
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="Placement">
              Placement
            </MenuItem>

            <MenuItem value="Result">
              Result
            </MenuItem>

            <MenuItem value="Event">
              Event
            </MenuItem>
          </Select>
        </FormControl>

        {loading && (
          <CircularProgress />
        )}

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!loading &&
          notifications.length === 0 && (
            <Alert severity="info">
              No notifications found
            </Alert>
          )}

        {!loading &&
          notifications.map(
            (notification) => (
              <NotificationCard
                key={notification.ID}
                notification={notification}
              />
            )
          )}

        <Stack
          spacing={2}
          sx={{
            marginTop: 4,
            alignItems: "center"
          }}
        >
          <Pagination
            count={10}
            page={page}
            onChange={(
              event,
              value
            ) =>
              setPage(value)
            }
            color="primary"
          />
        </Stack>
      </Container>
    </div>
  );
}

export default AllNotifications;