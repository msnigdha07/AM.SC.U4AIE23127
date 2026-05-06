import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import Navbar from "../components/Navbar";

import NotificationCard from "../components/NotificationCard";

import { fetchNotifications } from "../api/notificationApi";

import {
  getPriorityNotifications
} from "../services/priorityService";

function PriorityInbox() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [topN, setTopN] =
    useState(10);

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);

      const result =
        await fetchNotifications();

      if (result.success) {
        const prioritized =
          getPriorityNotifications(
            result.data,
            topN
          );

        setNotifications(
          prioritized
        );

        setError("");
      } else {
        setError(result.error);
      }

      setLoading(false);
    }

    loadNotifications();
  }, [topN]);

  return (
    <div>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
        >
          Priority Inbox
        </Typography>

        <FormControl
          fullWidth
          sx={{ marginBottom: 3 }}
        >
          <InputLabel>
            Top Notifications
          </InputLabel>

          <Select
            value={topN}
            label="Top Notifications"
            onChange={(e) =>
              setTopN(
                e.target.value
              )
            }
          >
            <MenuItem value={5}>
              Top 5
            </MenuItem>

            <MenuItem value={10}>
              Top 10
            </MenuItem>

            <MenuItem value={15}>
              Top 15
            </MenuItem>

            <MenuItem value={20}>
              Top 20
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
          notifications.map(
            (notification) => (
              <NotificationCard
                key={notification.ID}
                notification={notification}
              />
            )
          )}
      </Container>
    </div>
  );
}

export default PriorityInbox;