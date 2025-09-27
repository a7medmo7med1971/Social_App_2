"use client";
import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, Statetype } from "@/redex/store";
import { handelSignup } from "@/redex/authSkiceSignup";
import toast from "react-hot-toast";

// ✅ Validation Schema
const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),

  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  dateOfBirth: yup.string().required("Date of birth is required"),

  gender: yup.string().required("Gender is required"),
});

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  const { loading, error, successMessage } = useSelector(
    (state: Statetype) => state.signupReducer
  );

  /*handel signup*/
  const signupFormik = useFormik<{
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: dayjs().format("D-M-YYYY"),
      gender: "",
    },
    validationSchema, // ✅ ربط الـ Schema هنا
    onSubmit: (values) => {
      dispatch(handelSignup(values));
      if (error) {
        toast.error(error);
      }
      if (successMessage) {
        toast.success(successMessage);
        router.push("/login");
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f2f5 0%, #e6ebf0 100%)",
        p: 1,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            fontWeight: "700",
            mb: 1,
            background: "linear-gradient(90deg,#1877f2,#6b8eff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Create a new account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#606770", mb: 3 }}
        >
          It’s quick and easy.
        </Typography>

        <form onSubmit={signupFormik.handleSubmit}>
          {/* الاسم */}
          <TextField
            name="name"
            id="name"
            type="text"
            value={signupFormik.values.name}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            label="First name"
            fullWidth
            required
            variant="outlined"
            size="small"
            error={signupFormik.touched.name && Boolean(signupFormik.errors.name)}
            helperText={signupFormik.touched.name && signupFormik.errors.name}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />

          {/* البريد */}
          <TextField
            name="email"
            label="Email Address"
            type="email"
            id="email"
            value={signupFormik.values.email}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            fullWidth
            required
            variant="outlined"
            size="small"
            error={
              signupFormik.touched.email && Boolean(signupFormik.errors.email)
            }
            helperText={signupFormik.touched.email && signupFormik.errors.email}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />

          {/* كلمة السر */}
          <TextField
            name="password"
            label="Password"
            type="password"
            id="password"
            value={signupFormik.values.password}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            fullWidth
            required
            variant="outlined"
            size="small"
            error={
              signupFormik.touched.password &&
              Boolean(signupFormik.errors.password)
            }
            helperText={
              signupFormik.touched.password && signupFormik.errors.password
            }
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />

          {/* تأكيد كلمة السر */}
          <TextField
            name="rePassword"
            label="Confirm Password"
            type="password"
            id="rePassword"
            value={signupFormik.values.rePassword}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            fullWidth
            required
            variant="outlined"
            size="small"
            error={
              signupFormik.touched.rePassword &&
              Boolean(signupFormik.errors.rePassword)
            }
            helperText={
              signupFormik.touched.rePassword && signupFormik.errors.rePassword
            }
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />

          {/* تاريخ الميلاد */}
          <FormLabel
            sx={{
              color: "#1c1e21",
              fontWeight: 500,
              mb: 1,
              display: "block",
            }}
          >
            Date of birth
          </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(value) => {
                if (value) {
                  signupFormik.setFieldValue(
                    "dateOfBirth",
                    value.format("D-M-YYYY")
                  );
                }
              }}
              value={dayjs(signupFormik.values.dateOfBirth, "D-M-YYYY")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error:
                    signupFormik.touched.dateOfBirth &&
                    Boolean(signupFormik.errors.dateOfBirth),
                  helperText:
                    signupFormik.touched.dateOfBirth &&
                    signupFormik.errors.dateOfBirth,
                  sx: {
                    "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  },
                },
              }}
            />
          </LocalizationProvider>

          {/* الجنس */}
          <FormLabel
            component="legend"
            sx={{
              color: "#1c1e21",
              fontWeight: 500,
              mt: 1,
              display: "block",
            }}
          >
            Gender
          </FormLabel>
          <RadioGroup
            name="gender"
            value={signupFormik.values.gender}
            onChange={signupFormik.handleChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value="custom"
              control={<Radio color="primary" />}
              label="Custom"
            />
          </RadioGroup>
          {signupFormik.touched.gender && signupFormik.errors.gender && (
            <Typography color="error" variant="caption">
              {signupFormik.errors.gender}
            </Typography>
          )}

          {/* زرار التسجيل */}
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              height: 50,
              borderRadius: 3,
              background: "#1877f2",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              textTransform: "none",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
                background: "#1877f2",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={22} color="inherit" sx={{ mr: 1 }} />
                Creating...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          {/* رابط تسجيل الدخول */}
          <Box textAlign="center" mt={2}>
            <Link href="/login">
              <Button
                sx={{
                  color: "#1877f2",
                  fontSize: 14,
                  textTransform: "none",
                }}
              >
                Already have an account?
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
