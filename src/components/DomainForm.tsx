import React from "react";
import { Formik, Form, Field } from "formik";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TextField, Button, InputAdornment } from "@mui/material";
import { setLocalStorage } from "../utils/storage";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormProps {
  stage: number;
  initialValue: { domain: string };
  onSubmit: () => void;
}

function DomainForm({ initialValue, stage, onSubmit }: FormProps) {
  const validateForm = (values: { domain: string }) => {
    const validDomainRegex = /^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/g;
    const errors = { domain: "" };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!values.domain) {
      errors.domain = "Tên miền không được dể trống";
    } else if (!validDomainRegex.test(values.domain)) {
      errors.domain = "Tên miền không đúng định dạng";
    } else {
      errors.domain = "Tên miền hợp lệ";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValue}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        handleBlur,
        values,
        submitForm,
        handleChange,
        handleSubmit,
      }) => (
        <form
          className="domain-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            console.log("test");
          }}
        >
          <Field
            sx={{ marginBottom: "10px" }}
            variant="outlined"
            as={TextField}
            id="domain"
            name="domain"
            label="Nhập tên miền của bạn"
            error={
              touched.domain &&
              Boolean(errors.domain) &&
              errors.domain !== "Tên miền hợp lệ"
            }
            onBlur={handleBlur}
            value={values.domain}
            onChange={handleChange}
            helperText={touched.domain && errors.domain}
            aria-describedby="my-helper-text"
            fullWidth
            InputProps={
              touched.domain &&
              values.domain !== "" && {
                endAdornment:
                  errors.domain !== "Tên miền hợp lệ" ? (
                    <InputAdornment position="end">
                      <ErrorIcon sx={{ fill: "var(--red-color)" }}></ErrorIcon>
                    </InputAdornment>
                  ) : errors.domain === "Tên miền hợp lệ" ? (
                    <InputAdornment position="end">
                      <CheckCircleIcon
                        sx={{ fill: "var(--green-color)" }}
                      ></CheckCircleIcon>
                    </InputAdornment>
                  ) : null,
              }
            }
          />
          <Button
            type="submit"
            variant="contained"
            disabled={
              Boolean(errors.domain) && !(errors.domain === "Tên miền hợp lệ")
            }
            onClick={() => {
              setLocalStorage("isConnect", false);
            }}
          >
            Tiếp tục
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default DomainForm;
