"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  FavoriteBorder,
  ChatBubbleOutline,
  Repeat,
  Send,
  MoreHoriz,
  Verified,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, Statetype } from "@/redex/store";
import { getAllPostes } from "@/redex/getAllPostes";

const ThreadsClone: React.FC = () => {
  const dispatch = useDispatch<dispatchType>();
  const { posts } = useSelector((state: Statetype) => state.allPostesReducer);

  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, postId: string) => {
    setAnchorEl({ ...anchorEl, [postId]: event.currentTarget });
  };

  const handleMenuClose = (postId: string) => {
    setAnchorEl({ ...anchorEl, [postId]: null });
  };

  useEffect(() => {
    dispatch(getAllPostes(50));
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        minHeight: "100vh",
        pt: { xs: 7, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
            {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #e0e0e0",
          color: "#000",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.5px",
            }}
          >
            Threads Clone
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          maxWidth: { xs: "100%", sm: 600 },
        }}
      >
        {posts?.map((post, index) => (
          <React.Fragment key={post._id}>
            <Box sx={{ px: 2, py: 3 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                {/* Avatar */}
                <Avatar
                  src={post.user.photo}
                  alt={post.user.name}
                  sx={{
                    width: 36,
                    height: 36,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    bgcolor: "#000",
                  }}
                >
                  {post.user.name?.charAt(0).toUpperCase()}
                </Avatar>

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#000",
                        }}
                      >
                        {post.user.name}
                      </Typography>
                      <Verified sx={{ fontSize: 14, color: "#0095f6" }} />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography
                        sx={{
                          color: "#999",
                          fontSize: "15px",
                        }}
                      >
                        {formatDate(post.createdAt)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, post._id)}
                        sx={{
                          color: "#999",
                          p: 0.5,
                          "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                        }}
                      >
                        <MoreHoriz sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Post Text */}
                  <Typography
                    sx={{
                      fontSize: "15px",
                      lineHeight: 1.4,
                      color: "#000",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      mb: post.image ? 1.5 : 2,
                    }}
                  >
                    {post.body}
                  </Typography>

                  {/* Post Image */}
                  {post.image && (
                    <Box
                      component="img"
                      src={post.image}
                      alt="Post"
                      sx={{
                        width: "100%",
                        maxHeight: 500,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "0.5px solid #dbdbdb",
                        mb: 2,
                      }}
                    />
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", gap: 0.5, mb: 1.5 }}>
                    <IconButton
                      size="small"
                      sx={{
                        color: "#000",
                        p: 1,
                        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      <FavoriteBorder sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        color: "#000",
                        p: 1,
                        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      <ChatBubbleOutline sx={{ fontSize: 19 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        color: "#000",
                        p: 1,
                        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      <Repeat sx={{ fontSize: 21 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        color: "#000",
                        p: 1,
                        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      <Send sx={{ fontSize: 19 }} />
                    </IconButton>
                  </Box>

                  {/* Stats */}
                  <Typography
                    sx={{
                      color: "#999",
                      fontSize: "14px",
                    }}
                  >
                    {Math.floor(Math.random() * 100)} replies · {Math.floor(Math.random() * 1000)} likes
                  </Typography>
                </Box>
              </Box>

              {/* Menu */}
              <Menu
                anchorEl={anchorEl[post._id]}
                open={Boolean(anchorEl[post._id])}
                onClose={() => handleMenuClose(post._id)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    border: "1px solid #e5e5e5",
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleMenuClose(post._id)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    fontSize: "15px",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                  }}
                >
                  Save
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(post._id)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    fontSize: "15px",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                  }}
                >
                  Copy link
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(post._id)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    fontSize: "15px",
                    color: "#dc2626",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                  }}
                >
                  Report
                </MenuItem>
              </Menu>
            </Box>

            {index < posts.length - 1 && (
              <Divider sx={{ borderColor: "#f0f0f0" }} />
            )}
          </React.Fragment>
        ))}
      </Container>
    </Box>
  );
};

export default ThreadsClone;