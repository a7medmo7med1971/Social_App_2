"use client";
import React, { useEffect } from "react";
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
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  CalendarToday,
} from "@mui/icons-material";
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

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
    validationSchema,
    onSubmit: (values) => {
      dispatch(handelSignup(values));
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (successMessage) {
      toast.success(successMessage);
      router.push("/login");
    }
  }, [error, successMessage, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0a0a0a",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "700",
              color: "#ffffff",
              mb: 1,
              fontSize: "28px",
            }}
          >
            Join Threads
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              color: "#777777", 
              fontSize: "14px",
              lineHeight: 1.4,
            }}
          >
            Connect with friends and share your thoughts
          </Typography>
        </Box>

        <form onSubmit={signupFormik.handleSubmit}>
          {/* Name Field */}
          <TextField
            name="name"
            id="name"
            type="text"
            value={signupFormik.values.name}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            placeholder="Full name"
            fullWidth
            variant="outlined"
            error={signupFormik.touched.name && Boolean(signupFormik.errors.name)}
            helperText={signupFormik.touched.name && signupFormik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#777777", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#262626",
                border: "none",
                "& fieldset": {
                  border: "1px solid #3a3a3a",
                },
                "&:hover fieldset": {
                  borderColor: "#555555",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                  borderWidth: "1px",
                },
                "& input": {
                  color: "#ffffff",
                  fontSize: "15px",
                  "&::placeholder": {
                    color: "#777777",
                    opacity: 1,
                  },
                },
              },
            }}
          />

          {/* Email Field */}
          <TextField
            name="email"
            type="email"
            id="email"
            value={signupFormik.values.email}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            placeholder="Email address"
            fullWidth
            variant="outlined"
            error={signupFormik.touched.email && Boolean(signupFormik.errors.email)}
            helperText={signupFormik.touched.email && signupFormik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#777777", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#262626",
                border: "none",
                "& fieldset": {
                  border: "1px solid #3a3a3a",
                },
                "&:hover fieldset": {
                  borderColor: "#555555",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                  borderWidth: "1px",
                },
                "& input": {
                  color: "#ffffff",
                  fontSize: "15px",
                  "&::placeholder": {
                    color: "#777777",
                    opacity: 1,
                  },
                },
              },
            }}
          />

          {/* Password Field */}
          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={signupFormik.values.password}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            placeholder="Password"
            fullWidth
            variant="outlined"
            error={signupFormik.touched.password && Boolean(signupFormik.errors.password)}
            helperText={signupFormik.touched.password && signupFormik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#777777", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#777777" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#262626",
                border: "none",
                "& fieldset": {
                  border: "1px solid #3a3a3a",
                },
                "&:hover fieldset": {
                  borderColor: "#555555",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                  borderWidth: "1px",
                },
                "& input": {
                  color: "#ffffff",
                  fontSize: "15px",
                  "&::placeholder": {
                    color: "#777777",
                    opacity: 1,
                  },
                },
              },
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            name="rePassword"
            type={showConfirmPassword ? "text" : "password"}
            id="rePassword"
            value={signupFormik.values.rePassword}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            placeholder="Confirm password"
            fullWidth
            variant="outlined"
            error={signupFormik.touched.rePassword && Boolean(signupFormik.errors.rePassword)}
            helperText={signupFormik.touched.rePassword && signupFormik.errors.rePassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#777777", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: "#777777" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#262626",
                border: "none",
                "& fieldset": {
                  border: "1px solid #3a3a3a",
                },
                "&:hover fieldset": {
                  borderColor: "#555555",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                  borderWidth: "1px",
                },
                "& input": {
                  color: "#ffffff",
                  fontSize: "15px",
                  "&::placeholder": {
                    color: "#777777",
                    opacity: 1,
                  },
                },
              },
            }}
          />

          {/* Date of Birth */}
          <FormLabel
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              mb: 1,
              display: "block",
              fontSize: "14px",
            }}
          >
            Date of birth
          </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(value) => {
                if (value) {
                  signupFormik.setFieldValue("dateOfBirth", value.format("D-M-YYYY"));
                }
              }}
              value={dayjs(signupFormik.values.dateOfBirth, "D-M-YYYY")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "medium",
                  error: signupFormik.touched.dateOfBirth && Boolean(signupFormik.errors.dateOfBirth),
                  helperText: signupFormik.touched.dateOfBirth && signupFormik.errors.dateOfBirth,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ color: "#777777", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "#262626",
                      border: "none",
                      "& fieldset": {
                        border: "1px solid #3a3a3a",
                      },
                      "&:hover fieldset": {
                        borderColor: "#555555",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ffffff",
                        borderWidth: "1px",
                      },
                      "& input": {
                        color: "#ffffff",
                        fontSize: "15px",
                      },
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>

          {/* Gender */}
          <FormLabel
            component="legend"
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              mt: 3,
              mb: 2,
              display: "block",
              fontSize: "14px",
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
              gap: 2,
              mb: 2,
            }}
          >
            <FormControlLabel
              value="female"
              control={
                <Radio 
                  sx={{ 
                    color: "#777777",
                    "&.Mui-checked": { color: "#ffffff" },
                  }} 
                />
              }
              label={
                <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                  Female
                </Typography>
              }
            />
            <FormControlLabel
              value="male"
              control={
                <Radio 
                  sx={{ 
                    color: "#777777",
                    "&.Mui-checked": { color: "#ffffff" },
                  }} 
                />
              }
              label={
                <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                  Male
                </Typography>
              }
            />
            <FormControlLabel
              value="custom"
              control={
                <Radio 
                  sx={{ 
                    color: "#777777",
                    "&.Mui-checked": { color: "#ffffff" },
                  }} 
                />
              }
              label={
                <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                  Custom
                </Typography>
              }
            />
          </RadioGroup>
          {signupFormik.touched.gender && signupFormik.errors.gender && (
            <Typography 
              sx={{ 
                color: "#f44336", 
                fontSize: "12px",
                mt: -1,
                mb: 2,
              }}
            >
              {signupFormik.errors.gender}
            </Typography>
          )}

          {/* Sign Up Button */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              height: 48,
              borderRadius: "12px",
              background: "#ffffff",
              color: "#000000",
              fontWeight: "700",
              fontSize: "15px",
              textTransform: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "#f0f0f0",
                transform: "translateY(-1px)",
              },
              "&:disabled": {
                background: "#333333",
                color: "#777777",
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: "#777777" }} />
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 3, backgroundColor: "#333333" }} />

          {/* Login Link */}
          <Box textAlign="center">
            <Typography sx={{ color: "#777777", fontSize: "14px", mb: 1 }}>
              Already have an account?
            </Typography>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                Log in
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}