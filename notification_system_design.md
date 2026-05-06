# Campus Notification System Design

## Tech Stack
- React
- Material UI
- Axios
- React Router

## Features Implemented
- Notification fetching
- Filtering by type
- Pagination
- Priority inbox
- Top N notifications
- Viewed/unviewed notifications
- Logging middleware integration
- Error handling
- Loading states

## Priority Logic
Priority order:
1. Placement
2. Result
3. Event

If priorities are same:
- latest notification first

## Logging Middleware
Integrated custom middleware using:
- frontend stack
- api/component/page packages

## Local Storage
Used localStorage to persist viewed notifications.

## Scalability
Priority sorting separated into reusable service layer.