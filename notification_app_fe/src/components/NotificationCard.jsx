import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack
} from "@mui/material";

import {
  getViewedNotifications,
  markAsViewed
} from "../utils/localStorage";

function NotificationCard({
  notification
}) {
  const viewedNotifications =
    getViewedNotifications();

  const isViewed =
    viewedNotifications.includes(
      notification.ID
    );

  const getColor = (type) => {
    switch (type) {
      case "Placement":
        return "primary";

      case "Result":
        return "success";

      case "Event":
        return "warning";

      default:
        return "default";
    }
  };

  const handleClick = () => {
    markAsViewed(notification.ID);

    window.location.reload();
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        marginBottom: 2,
        borderRadius: 3,
        boxShadow: 3,
        cursor: "pointer",

        backgroundColor:
          isViewed
            ? "#f5f5f5"
            : "#e3f2fd"
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            label={notification.Type}
            color={getColor(
              notification.Type
            )}
          />

          <Typography variant="body2">
            {notification.Timestamp}
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          sx={{ marginTop: 2 }}
        >
          {notification.Message}
        </Typography>

        <Typography
          variant="body2"
          sx={{ marginTop: 1 }}
        >
          {isViewed
            ? "Viewed"
            : "New Notification"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;