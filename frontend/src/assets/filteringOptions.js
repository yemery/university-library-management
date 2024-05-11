const borrowSelectOptions = [
  { value: "waiting", label: "Waiting" },
  { value: "confirmed", label: "Confirmed" },
  { value: "delivered", label: "Delivered" },
];

const booksSelectOptions = [
  { value: "0", label: "Borrowed" },
  { value: "1", label: "Unavailable" },
];

const waitlistSelectOptions = [
  { value: "1", label: "Available" },
  { value: "0", label: "Not available" },
];

export { borrowSelectOptions, booksSelectOptions, waitlistSelectOptions };
