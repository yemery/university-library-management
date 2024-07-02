import React from "react";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { updateBook } from "../../features/book/bookThunks";
import { useNavigate } from "react-router-dom";
import H5 from "../atoms/H5";
import { Label, Select } from "flowbite-react";

function EditupdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const book = useSelector((state) => state.books.book);

  const updateForm = useFormik({
    initialValues: {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      gender: book.gender,
      is_available: book.is_available,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      is_available: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        values = {
          ...values,
          is_available: values.is_available == "1" ? true : false,
        };
        await dispatch(updateBook(values));
        navigate(0); // refresh the page
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={updateForm.handleSubmit}>
      <div className="space-y-6">
        <H5 label={"Edit Book"} />
        <div>
          <Input
            label="title"
            type="text"
            name="title"
            placeholder={"enter title of the book"}
            value={updateForm.values.title}
            onChange={updateForm.handleChange}
            onBlur={updateForm.handleBlur}
          />
          {updateForm.touched.title && updateForm.errors.title && (
            <ErrorMessage message={updateForm.errors.title} />
          )}
        </div>
        <div>
          <Input
            label="author"
            type="text"
            name="author"
            placeholder={"enter author of the book"}
            value={updateForm.values.author}
            onChange={updateForm.handleChange}
            onBlur={updateForm.handleBlur}
          />
          {updateForm.touched.author && updateForm.errors.author && (
            <ErrorMessage message={updateForm.errors.author} />
          )}
        </div>
        <div>
          <Input
            label="description"
            type="text"
            name="description"
            placeholder={"enter description of the book"}
            value={updateForm.values.description}
            onChange={updateForm.handleChange}
            onBlur={updateForm.handleBlur}
          />
          {updateForm.touched.description && updateForm.errors.description && (
            <ErrorMessage message={updateForm.errors.description} />
          )}
        </div>
        <div>
          <Input
            label="gender"
            type="text"
            name="gender"
            placeholder={"enter gender of the book"}
            value={updateForm.values.gender}
            onChange={updateForm.handleChange}
            onBlur={updateForm.handleBlur}
          />
          {updateForm.touched.gender && updateForm.errors.gender && (
            <ErrorMessage message={updateForm.errors.gender} />
          )}
        </div>
        <Select
          id="is_available"
          name="is_available"
          value={updateForm.values.is_available}
          onChange={updateForm.handleChange}
          onBlur={updateForm.handleBlur}
        >
          <option value="1" selected={updateForm.values.is_available == true}>
            Available
          </option>
          <option value="0" selected={updateForm.values.is_available == false}>
            Borrowed
          </option>
        </Select>

        {updateForm.touched.is_available && updateForm.errors.is_available && (
          <ErrorMessage message={updateForm.errors.is_available} />
        )}
        <div className="w-full">
          <Button text="update" />
        </div>
      </div>
    </form>
  );
}

export default EditupdateForm;
