import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/authSlice";
import * as yup from "yup";
import { DEFAULT_BASE_URL } from "@/config/appConfig";

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  username: "",
  password: "",
};

// refactor form code to remove feedback
const Form = () => {
  const [pageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const isLogin = pageType === "login";

  const login = async (
    values: typeof initialValuesLogin,
    onSubmitProps: FormikHelpers<typeof initialValuesLogin>
  ) => {
    // call to backend to check user login credentials, amend depending on endpoint
    const url = new URL(`${DEFAULT_BASE_URL}/api/admin/auth`);
    url.searchParams.append("username", values.username);
    url.searchParams.append("password", values.password);

    const loggedInResponse = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const loggedIn = await loggedInResponse.json();

    console.log(loggedIn.message);
    if (loggedIn.message === "Login successful.") {
      // Check if we're in a development environment and if the token is missing
      if (import.meta.env.VITE_ENV === "development") {
        loggedIn.token = "MOCK_TOKEN";
      }

      dispatch(
        setLogin({
          user: loggedIn.user, // Note: You should also send user details and token from backend in the response.
          token: loggedIn.token,
        })
      );

      onSubmitProps.resetForm();

      navigate("/dashboard");
    }
  };

  const handleFormSubmit = async (
    values: typeof initialValuesLogin,
    onSubmitProps: FormikHelpers<typeof initialValuesLogin>
  ) => {
    if (isLogin) await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            // might not need this...
            gridTemplateColumns="repeat(2, minmax(0,1fr))"
            sx={{
              "&^ >div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isLogin && (
              <>
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as typeof initialValuesLogin).username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{
                    gridColumn: "span 2",
                    "& label": {
                      color: palette.primary[100], // changes label color
                    },
                    "& .MuiInputBase-input": {
                      color: palette.primary[100], // changes input text color
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: palette.primary[100] }, // changes default border color
                      "&:hover fieldset": { borderColor: palette.primary[500] }, // Border color when hovered
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 2",
                    "& label": {
                      color: palette.primary[100], // changes label color
                    },
                    "& .MuiInputBase-input": {
                      color: palette.primary[100], // changes input text color
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: palette.primary[100] }, // changes default border color
                      "&:hover fieldset": { borderColor: palette.primary[500] }, // Border color when hovered
                    },
                  }}
                />
              </>
            )}
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.default,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {" "}
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: palette.primary[100],
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary[100],
                  },
                }}
              >
                Login
              </Typography>
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
