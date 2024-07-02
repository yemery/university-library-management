const borrowSelectOptions = [
  { value: "", label: "Filter status" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

const booksSelectOptions = [
  { value: "", label: "Borrow status"},
  { value: "0", label: "Borrowed" },
  { value: "1", label: "Available" },
];

const waitlistSelectOptions = [
  { value: "1", label: "Available" },
  { value: "0", label: "Not available" },
];

const usersSelectOptions = [
  { value: "", label: "Role" },
  { value: "librarian", label: "Librarian" },
  { value: "student", label: "Student" },
];

export { borrowSelectOptions, booksSelectOptions, waitlistSelectOptions, usersSelectOptions };
