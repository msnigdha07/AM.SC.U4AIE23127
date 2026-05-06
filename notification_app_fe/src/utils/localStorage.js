const STORAGE_KEY =
  "viewedNotifications";

export function getViewedNotifications() {
  const stored =
    localStorage.getItem(
      STORAGE_KEY
    );

  return stored
    ? JSON.parse(stored)
    : [];
}

export function markAsViewed(id) {
  const viewed =
    getViewedNotifications();

  if (!viewed.includes(id)) {
    viewed.push(id);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(viewed)
    );
  }
}