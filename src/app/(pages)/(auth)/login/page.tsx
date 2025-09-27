"use client";
import { handelLogin } from "@/redex/authSlice";
import { dispatchType, Statetype } from "@/redex/store";
import { Box, Button, TextField, Typography, Paper, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
const router=useRouter() 
const dispatch =useDispatch<dispatchType>()
  const { loading, error, token } = useSelector(
      (state: Statetype) => state.authiniCation
  );
/*handel login*/
const loginFormik = useFormik<{email: string; password: string}>({
  initialValues: {
    email: "",
    password: "",
  },
  onSubmit: (values) => {
    dispatch(handelLogin(values))
       if (error) {
      toast.error(error); 
      
    }
    if (token) {
      toast.success("تم تسجيل الدخول بنجاح ");
      router.push("/")
     
    }
  },
});



  return (
   <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5", // نفس الخلفية بتاعت فيسبوك
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 430,
         borderRadius: 4,
          backgroundColor: "#ffffff",
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
          <TextField
            name="email"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.email}
            label="Email address"
            type="email"
            id="email"
            fullWidth
            required
            variant="outlined"
            size="small"
            margin="normal"
          />

          <TextField
            name="password"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.password}
            label="Password"
            type="password"
            id="password"
            fullWidth
            required
            variant="outlined"
            size="small"
            margin="normal"
          />

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
            disabled={loading}
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

          <Box textAlign="center" mt={2}>
            <Link  href="/register">
                   <Button
             
              sx={{
                color: "#1877f2",
                fontSize: 14,
                textTransform: "none",
              }}
            >
              Create new account
            </Button></Link>
     
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
