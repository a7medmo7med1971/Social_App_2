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
import { useRouter } from "next/navigation";
import ThreadsLoadingScreen from "@/app/ThreadsLoadingClient ";


// Types
interface Comment {
  _id: string;
  content: string;
  commentCreator: {
    _id: string;
    name: string;
    photo: string;
  };
  post: string;
  createdAt: string;
}

interface Post {
  _id: string;
  body: string;
  image?: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  comments?: Comment[];
}

const ThreadsClone: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  const { posts, loading } = useSelector((state: Statetype) => state.allPostesReducer);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, postId: string) => {
    setAnchorEl({ ...anchorEl, [postId]: event.currentTarget });
  };

  const handleMenuClose = (postId: string) => {
    setAnchorEl({ ...anchorEl, [postId]: null });
  };

  const handleProfile = (id: string) => {
    router.push(`/profile/${id}`);
  };

  useEffect(() => {
    dispatch(getAllPostes(50));
  }, [dispatch]);

  if (loading) return <ThreadsLoadingScreen />;

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
        bgcolor: "#FAFAFA",
        minHeight: "100vh",
        pt: { xs: 0, md: 0 },
        pb: { xs: 8, md: 2 },
      }}
    >
      {/* Top Header - Home */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          borderTop: "20px",
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          py: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: "16px",
            color: "white",
            letterSpacing: "-0.2px",
          }}
        >
          Home
        </Typography>
      </Box>

      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          maxWidth: { xs: "100%", sm: 630 },
          bgcolor: "#ffffff",
          borderRadius: "20px",
          marginTop: "15px",
        }}
      >
        {posts?.map((post: Post, index: number) => (
          <Box key={post._id}>
            <Box
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "20px",
                transition: "background-color 0.15s ease",
                cursor: "pointer",

              }}
            >
              <Box sx={{ px: 2, py: 2.5 }}>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  {/* Left side - Avatar */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={post.user.photo}
                      alt={post.user.name}
                      sx={{
                        width: 36,
                        height: 36,
                        fontSize: "14px",
                        fontWeight: 600,
                        bgcolor: "#e4e6eb",
                        color: "#000",
                        cursor: "pointer",
                      }}
                      onClick={() => handleProfile(post.user._id)}
                    >
                      {post.user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>

                  {/* Right side - Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#000000",
                            cursor: "pointer",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                          onClick={() => handleProfile(post.user._id)}
                        >
                          {post.user.name}
                        </Typography>
                        <Verified sx={{ fontSize: 16, color: "#0095f6" }} />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                          sx={{
                            color: "#999999",
                            fontSize: "15px",
                            fontWeight: 400,
                          }}
                        >
                          {formatDate(post.createdAt)}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, post._id);
                          }}
                          sx={{
                            color: "#999999",
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
                        color: "#000000",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        mb: post.image ? 1.25 : 1.5,
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
                          mb: 1.5,
                        }}
                      />
                    )}

                    {/* Action Buttons with Counts */}
                    <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                      {/* Like Button */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          cursor: "pointer",
                          "&:hover .icon": {
                            color: "#666666",
                          },
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FavoriteBorder 
                          className="icon"
                          sx={{ 
                            fontSize: 20,
                            color: "#000000",
                            transition: "color 0.2s ease",
                          }} 
                        />
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "#666666",
                          }}
                        >
                          {Math.floor(Math.random() * 500)}
                        </Typography>
                      </Box>

                      {/* Comment Button */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          cursor: "pointer",
                          "&:hover .icon": {
                            color: "#666666",
                          },
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ChatBubbleOutline 
                          className="icon"
                          sx={{ 
                            fontSize: 20,
                            color: "#000000",
                            transition: "color 0.2s ease",
                          }} 
                        />
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "#666666",
                          }}
                        >
                          {post.comments?.length || 0}
                        </Typography>
                      </Box>

                      {/* Repost Button */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          cursor: "pointer",
                          "&:hover .icon": {
                            color: "#666666",
                          },
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Repeat 
                          className="icon"
                          sx={{ 
                            fontSize: 21,
                            color: "#000000",
                            transition: "color 0.2s ease",
                          }} 
                        />
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "#666666",
                          }}
                        >
                          {Math.floor(Math.random() * 50)}
                        </Typography>
                      </Box>

                      {/* Send Button */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          cursor: "pointer",
                          "&:hover .icon": {
                            color: "#666666",
                          },
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Send 
                          className="icon"
                          sx={{ 
                            fontSize: 20,
                            color: "#000000",
                            transition: "color 0.2s ease",
                          }} 
                        />
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "#666666",
                          }}
                        >
                          {Math.floor(Math.random() * 20)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Comments Section - Show first comment if exists */}
                {post.comments && post.comments.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    {/* Avatars Row */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 1.5,
                        pl: 0.5,
                      }}
                    >
                      {/* Show up to 3 comment avatars stacked */}
                      {post.comments.slice(0, 3).map((comment, idx) => (
                        <Avatar
                          key={comment._id}
                          src={comment.commentCreator.photo}
                          sx={{
                            width: 20,
                            height: 20,
                            fontSize: "10px",
                            fontWeight: 600,
                            bgcolor: "#e4e6eb",
                            color: "#000",
                            border: "2px solid #fff",
                            marginLeft: idx > 0 ? "-8px" : 0,
                            cursor: "pointer",
                            zIndex: 3 - idx,
                          }}
                          onClick={() => handleProfile(comment.commentCreator._id)}
                        >
                          {comment.commentCreator.name?.charAt(0).toUpperCase()}
                        </Avatar>
                      ))}
                      
                      {/* Replies count text */}
                      <Typography
                        sx={{
                          color: "#999999",
                          fontSize: "15px",
                          fontWeight: 400,
                          ml: 0.5,
                        }}
                      >
                        {post.comments.length} {post.comments.length === 1 ? "reply" : "replies"}
                      </Typography>
                    </Box>

                    {/* First Comment Preview */}
                    <Box
                      sx={{
                        bgcolor: "#fafafa",
                        borderRadius: "16px",
                        p: 2,
                        cursor: "pointer",
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1.5 }}>
                        {/* Comment Avatar */}
                        <Avatar
                          src={post.comments[0].commentCreator.photo}
                          sx={{
                            width: 28,
                            height: 28,
                            fontSize: "12px",
                            fontWeight: 600,
                            bgcolor: "#e4e6eb",
                            color: "#000",
                            cursor: "pointer",
                          }}
                          onClick={() => handleProfile(post.comments[0].commentCreator._id)}
                        >
                          {post.comments[0].commentCreator.name?.charAt(0).toUpperCase()}
                        </Avatar>

                        {/* Comment Content */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "15px",
                                color: "#000000",
                                cursor: "pointer",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                              onClick={() => handleProfile(post.comments[0].commentCreator._id)}
                            >
                              {post.comments[0].commentCreator.name}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#999999",
                                fontSize: "15px",
                                fontWeight: 400,
                              }}
                            >
                              {formatDate(post.comments[0].createdAt)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              lineHeight: 1.4,
                              color: "#000000",
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {post.comments[0].content}
                          </Typography>
                        </Box>
                      </Box>

                      {/* "Add a topic" or "Reply to username" section */}
                      {post.comments.length === 1 && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mt: 2,
                            pt: 2,
                            borderTop: "1px solid #e5e5e5",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 28,
                              height: 28,
                              fontSize: "12px",
                              fontWeight: 600,
                              bgcolor: "#e4e6eb",
                              color: "#000",
                            }}
                          >
                            {post.user.name?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography
                            sx={{
                              color: "#999999",
                              fontSize: "15px",
                              fontWeight: 400,
                            }}
                          >
                            Reply to {post.comments[0].commentCreator.name}...
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
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
                  minWidth: 240,
                  borderRadius: 3,
                  bgcolor: "#ffffff",
                  border: "1px solid #dbdbdb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
              }}
            >
              <MenuItem
                onClick={() => handleMenuClose(post._id)}
                sx={{
                  py: 1.75,
                  px: 2.5,
                  fontSize: "15px",
                  color: "#000000",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                }}
              >
                Save
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuClose(post._id)}
                sx={{
                  py: 1.75,
                  px: 2.5,
                  fontSize: "15px",
                  color: "#000000",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                }}
              >
                Copy link
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuClose(post._id)}
                sx={{
                  py: 1.75,
                  px: 2.5,
                  fontSize: "15px",
                  color: "#000000",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                }}
              >
                Hide
              </MenuItem>
              <Divider sx={{ bgcolor: "#efefef", my: 0.5 }} />
              <MenuItem
                onClick={() => handleMenuClose(post._id)}
                sx={{
                  py: 1.75,
                  px: 2.5,
                  fontSize: "15px",
                  color: "#ed4956",
                  "&:hover": { bgcolor: "rgba(237,73,86,0.05)" },
                }}
              >
                Report
              </MenuItem>
            </Menu>

            {/* Divider between posts */}
            {index < posts.length - 1 && <Divider sx={{ bgcolor: "#efefef" }} />}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ThreadsClone;