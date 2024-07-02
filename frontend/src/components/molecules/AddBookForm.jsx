import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { postBook } from "../../features/book/bookThunks";
import { toast } from "react-toastify";
import { booksList } from "../../features/book/bookThunks";

function AddBookForm({close}) {
  const dispatch = useDispatch();

  const bookForm = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      gender: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(postBook(values));
        toast.success("Book added successfully");
        close()
        dispatch(booksList());
      } catch (error) {
        console.log(error);
        toast.error("Bad request");
        close()
      }
    },
  });
  return (
    <form onSubmit={bookForm.handleSubmit}>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          add new book
        </h3>
        <div>
          <Input
            label="title"
            type="text"
            name="title"
            placeholder={"enter title of the book"}
            value={bookForm.values.title}
            onChange={bookForm.handleChange}
            onBlur={bookForm.handleBlur}
          />
          {bookForm.touched.title && bookForm.errors.title && (
            <ErrorMessage message={bookForm.errors.title} />
          )}
        </div>
        <div>
          <Input
            label="author"
            type="text"
            name="author"
            placeholder={"enter author of the book"}
            value={bookForm.values.author}
            onChange={bookForm.handleChange}
            onBlur={bookForm.handleBlur}
          />
          {bookForm.touched.author && bookForm.errors.author && (
            <ErrorMessage message={bookForm.errors.author} />
          )}
        </div>
        <div>
          <Input
            label="description"
            type="text"
            name="description"
            placeholder={"enter description of the book"}
            value={bookForm.values.description}
            onChange={bookForm.handleChange}
            onBlur={bookForm.handleBlur}
          />
          {bookForm.touched.description && bookForm.errors.description && (
            <ErrorMessage message={bookForm.errors.description} />
          )}
        </div>
        <div>
          <Input
            label="gender"
            type="gender"
            name="gender"
            placeholder={"enter gender of the book"}
            value={bookForm.values.gender}
            onChange={bookForm.handleChange}
            onBlur={bookForm.handleBlur}
          />
          {bookForm.touched.gender && bookForm.errors.gender && (
            <ErrorMessage message={bookForm.errors.gender} />
          )}
        </div>
        <div className="w-full">
          {/* <Button className="bg-red-500 hover:bg-red-600" > Add Book</Button> */}
          <Button text="Submit" />
        </div>
      </div>

     
      
    </form>
  );
}

export default AddBookForm;
