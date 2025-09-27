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
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  const { loading, error, token } = useSelector(
    (state:Statetype) => state.authiniCation
  );

  // 🔐 للتحكم في إظهار/إخفاء الباسورد
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Schema validation
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

  /* 🟢 handel login */
  const loginFormik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await dispatch(handelLogin(values));
      if (error) {
        toast.error(error);
      }
      if (token) {
        toast.success("Login successful ");
        router.push("/");
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f2f5 0%, #e6ebf0 100%)",
      }}
    >
      <Paper
        elevation={3}
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
          sx={{ color: "#1877f2", fontWeight: "bold", mb: 1 }}
        >
          Log In
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#606770", mb: 3 }}
        >
          Welcome back! Please login to your account.
        </Typography>

        <form onSubmit={loginFormik.handleSubmit}>
          {/* 📧 Email */}
          <TextField
            name="email"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.email}
            label="Email address"
            type="email"
            id="email"
            autoFocus
            fullWidth
            required
            variant="outlined"
            size="small"
            margin="normal"
            error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
            helperText={loginFormik.touched.email && loginFormik.errors.email}
          />

          {/* 🔑 Password */}
          <TextField
            name="password"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.password}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            fullWidth
            required
            variant="outlined"
            size="small"
            margin="normal"
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
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* 🔘 Submit button */}
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              height: 45,
              backgroundColor: "#1877f2",
              borderRadius: 3,
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
                background: "#1877f2",
              },
            }}
            disabled={loading || !loginFormik.isValid}
          >
            {loading ? (
              <>
                <CircularProgress size={22} color="inherit" sx={{ mr: 1 }} />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </Button>

          {/* 🚨 API error message */}
          {error && (
            <Typography color="error" align="center" mt={1}>
              {error}
            </Typography>
          )}

          <Box textAlign="center" mt={2}>
            <Link href="/register">
              <Button
                sx={{
                  color: "#1877f2",
                  fontSize: 14,
                  textTransform: "none",
                }}
              >
                Create new account
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
