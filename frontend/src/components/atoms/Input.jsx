
function Input({label, type, placeholder}) {
  return (
    <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>
            <input
              type={type}
              className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-gray-300 focus:border-gray-500 block w-full p-2.5 outline-none"              placeholder={placeholder}
              required
            />
          </div>
  )
}

export default Input