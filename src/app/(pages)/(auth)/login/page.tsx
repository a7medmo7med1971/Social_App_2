"use client";
import { handelLogin } from "@/redex/authSlice";
import { dispatchType, Statetype } from "@/redex/store";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  const { loading, error, token } = useSelector(
    (state: Statetype) => state.authiniCation
  );

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
        "Password must have at least 8 characters, including uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
  });

  const loginFormik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await dispatch(handelLogin(values));
    },
    validationSchema,
  });

  useEffect(() => {
if (error) {
  toast.error(error, {
    duration: 4000,
    position: 'bottom-center',
    style: {
      background: '#000',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    },
    iconTheme: {
      primary: '#ff4444',
      secondary: '#000',
    },
  });
}

if (token) {
  toast.success("Login successful", {
    duration: 3000,
    position: 'bottom-center',
    style: {
      background: '#000',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#000',
    },
  });
  router.push("/");
}
  }, [error, token, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#0a0a0a",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
        }}
      >
        {/* Logo */}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Box
            component="svg"
            width="64"
            height="64"
            viewBox="0 0 192 192"
            sx={{ color: "#000" }}
          >
            <path
              fill="currentColor"
              d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883Z"
            />
          </Box>
        </Box> */}

        {/* Title */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "white",
            fontSize: "1.75rem",
          }}
        >
          Log in with your Instagram account
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#737373",
            mb: 4,
            fontSize: "0.95rem",
          }}
        >
          Enter your details to continue
        </Typography>

        {/* Form */}
        <form onSubmit={loginFormik.handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              name="email"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              value={loginFormik.values.email}
              placeholder="Email address"
              type="email"
              id="email"
              autoFocus
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f5f5f5",
                  border: "none",
                  "& fieldset": {
                    border: "1px solid #e5e5e5",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #d0d0d0",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #000",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                  fontSize: "0.95rem",
                },
              }}
              error={
                loginFormik.touched.email && Boolean(loginFormik.errors.email)
              }
              helperText={loginFormik.touched.email && loginFormik.errors.email}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              name="password"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              value={loginFormik.values.password}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f5f5f5",
                  border: "none",
                  "& fieldset": {
                    border: "1px solid #e5e5e5",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #d0d0d0",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #000",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                  fontSize: "0.95rem",
                },
              }}
              error={
                loginFormik.touched.password &&
                Boolean(loginFormik.errors.password)
              }
              helperText={
                loginFormik.touched.password && loginFormik.errors.password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: "#666" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Error Message */}
          {error && (
            <Typography
              sx={{
                color: "#dc2626",
                fontSize: "0.875rem",
                textAlign: "center",
                mb: 2,
                bgcolor: "#fee2e2",
                py: 1.5,
                px: 2,
                borderRadius: 2,
              }}
            >
              {error}
            </Typography>
          )}

          {/* Login Button */}
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
                Logging in...
              </>
            ) : (
            "Log in"
            )}
          </Button>

          {/* Divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: 3,
            }}
          >
            <Divider sx={{ flex: 1, borderColor: "#e5e5e5" }} />
            <Typography
              sx={{
                px: 2,
                color: "#737373",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              or
            </Typography>
            <Divider sx={{ flex: 1, borderColor: "#e5e5e5" }} />
          </Box>

          {/* Sign Up Link */}
          <Box textAlign="center">
            <Typography
              variant="body2"
              sx={{
                color: "#737373",
                fontSize: "0.95rem",
              }}
            >
              Don't have an account?{" "}
              <Link
                href="/register"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}