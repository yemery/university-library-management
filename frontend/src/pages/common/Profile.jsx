const Profile = () => {
  const userInfo = {
    name: "John Doe",
    email: "john@mail.com",
    role: "Librarian",
    campus: "Main Campus",
  };
  // pay attention for naming in redux & api resonse cus we'll use keys in labels

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-semibold">User Information</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(userInfo).map(([key, value]) => {
          return (
            <div key={value} className="flex flex-col">
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {key}
              </label>
              <input
                type="text"
                id="base-input"
                value={value}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
