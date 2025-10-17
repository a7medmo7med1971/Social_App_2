"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Close,
  Image as ImageIcon,
  GifBox,
  Poll,
  CalendarMonth,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

export default function CreatePost() {
  const router = useRouter();
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  
  const maxLength = 500;
  const progress = (postBody.length / maxLength) * 100;

  function handlePostBody(e: any) {
    if (e.target.value.length <= maxLength) {
      setPostBody(e.target.value);
    }
  }

  function handlePostImage(e: any) {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit() {
    if (!postBody.trim()) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append("body", postBody);
    if (postImage) formData.append("image", postImage);

    axios
      .post("https://linked-posts.routemisr.com/posts", formData, {
        headers: { token: token },
      })
      .then((res) => {
        console.log("✅ تم إنشاء البوست:", res.data);
        setPostBody("");
        setPostImage(null);
        setPreview(null);
        router.push("/");
      })
      .catch((err) => {
        console.error("❌ خطأ في إنشاء البوست:", err.response?.data || err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Box
      sx={{

        pt: { xs: 4, md: 4 },
        pb: { xs: 4, md: 4 },
      }}
    >




      {/* Main Content */}
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: { xs: 0, sm: 3 },
            border: { xs: "none", sm: "1px solid #e5e5e5" },
            overflow: "hidden",
            p: 2.5,
          }}
        >
          {/* User Info & Text Area */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {/* Avatar */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                fontSize: "0.875rem",
                fontWeight: 600,
                bgcolor: "#000",
              }}
            >
              A
            </Avatar>

            {/* Content Area */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#000",
                  mb: 1,
                }}
              >
                username
              </Typography>

              {/* Text Input */}
              <TextField
                fullWidth
                multiline
                minRows={4}
                placeholder="Start a thread..."
                value={postBody}
                onChange={handlePostBody}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "15px",
                    lineHeight: 1.4,
                    color: "#000",
                    "& textarea": {
                      "&::placeholder": {
                        color: "#999999",
                        opacity: 1,
                      },
                    },
                  },
                }}
                sx={{ mb: 2 }}
              />

              {/* Image Preview */}
              {preview && (
                <Box
                  sx={{
                    mb: 2,
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #efefef",
                  }}
                >
                  <Image
                    src={preview}
                    alt="preview"
                    width={600}
                    height={300}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      setPostImage(null);
                      setPreview(null);
                    }}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      width: 32,
                      height: 32,
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.8)",
                      },
                    }}
                  >
                    <Close sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              )}

              {/* Attachment Icons */}
              <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  style={{ display: "none" }}
                  onChange={handlePostImage}
                />
                <label htmlFor="upload-image">
                  <IconButton
                    component="span"
                    size="small"
                    sx={{
                      color: "#999",
                      p: 0.75,
                      "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </label>
                <IconButton
                  size="small"
                  sx={{
                    color: "#999",
                    p: 0.75,
                    "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                  }}
                >
                  <GifBox sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "#999",
                    p: 0.75,
                    "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                  }}
                >
                  <Poll sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "#999",
                    p: 0.75,
                    "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                  }}
                >
                  <CalendarMonth sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>

              {/* Character Counter */}
              {postBody.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
             
        
                  {progress > 80 && (
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: progress > 90 ? "#ed4956" : "#999999",
                        fontWeight: 500,
                      }}
                    >
                      {maxLength - postBody.length}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>

          {/* Bottom Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              pt: 3,
              borderTop: "1px solid #efefef",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#999999",
                fontWeight: 400,
              }}
            >
              Anyone can reply
            </Typography>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={postBody.trim().length === 0 || loading}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                borderRadius: 3,
                px: 3,
                py: 1,
                fontSize: "15px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#262626",
                },
                "&:disabled": {
                  bgcolor: "#e5e5e5",
                  color: "#a3a3a3",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#a3a3a3" }} />
              ) : (
                "Post"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}