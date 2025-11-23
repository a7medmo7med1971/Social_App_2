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
  Search,
  Edit,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, Statetype } from "@/redex/store";
import { getAllPostes } from "@/redex/getAllPostes";
import { useRouter } from "next/navigation";
import ThreadsLoadingScreen from "@/app/ThreadsLoadingScreen";
import CreatePost from "../(postes)/CreatePoste";

const ThreadsClone: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  const { posts, loading } = useSelector((state: Statetype) => state.allPostesReducer);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [activeTab, setActiveTab] = useState('forYou');
  interface Post {
  _id: string;
  body: string;
  image?: string;
  createdAt: string;
  comments: any[];
  user: {
    _id: string;
    name: string;
    photo: string;
  };
}


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, postId: string) => {
    setAnchorEl({ ...anchorEl, [postId]: event.currentTarget });
  };

  const handleMenuClose = (postId: string) => {
    setAnchorEl({ ...anchorEl, [postId]: null });
  };

  // const handleProfile = (id: string) => {
  //   router.push(`/profile/${id}`);
  // };
  
  const handleSinglePost = (id: string) => {
    router.push(`/singlepost/${id}`);
  };

  useEffect(() => {
    dispatch(getAllPostes(10));
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
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          zIndex: 100,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            maxWidth: { xs: "100%", sm: 630 },
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 56,
            }}
          >
            <IconButton sx={{ p: 1, color: "#000" }}>
              <Search sx={{ fontSize: 22 }} />
            </IconButton>

            <Box sx={{ display: "flex", gap: 4 }}>
              <Box
                onClick={() => setActiveTab('forYou')}
                sx={{
                  position: "relative",
                  pb: 1.5,
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: activeTab === 'forYou' ? "#000" : "#999",
                  }}
                >
                  For you
                </Typography>
                {activeTab === 'forYou' && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      bgcolor: "#000",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </Box>

              <Box
                onClick={() => setActiveTab('following')}
                sx={{
                  position: "relative",
                  pb: 1.5,
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: activeTab === 'following' ? "#000" : "#999",
                  }}
                >
                  Following
                </Typography>
                {activeTab === 'following' && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      bgcolor: "#000",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </Box>
            </Box>

            <IconButton sx={{ p: 1, color: "#000" }}>
              <Edit sx={{ fontSize: 22 }} />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Feed */}
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          maxWidth: { xs: "100%", sm: 630 },
        }}
      
      >
        <CreatePost></CreatePost>
        {posts?.map((post: Post, index: number) => (
          <Box key={post._id}>
            <Box
              sx={{
                px: 2,
                py: 2,
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                "&:hover": {
                  bgcolor: "#fafafa",
                },
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {/* Avatar with thread line */}
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
                      border: "1px solid #e5e5e5",
                    }}
                    // onClick={() => handleProfile(post.user._id)}
                  >
                    {post.user.name?.charAt(0).toUpperCase()}
                  </Avatar>

                  {/* Thread line and comment avatars */}
                  {post.comments && post.comments.length > 0 && (
                    <>
                      <Box
                        sx={{
                          width: 2,
                          bgcolor: "#e5e5e5",
                          flex: 1,
                          my: 1,
                        }}
                      />
                      <Box sx={{ display: "flex", position: "relative" }}>
                        {post.comments.slice(0, 2).map((comment, idx) => (
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
                            }}
                            onClick={() => handleProfile(comment.commentCreator._id)}
                          >
                            {comment.commentCreator.name?.charAt(0).toUpperCase()}
                          </Avatar>
                        ))}
                        {post.comments.length > 2 && (
                          <Avatar
                            sx={{
                              width: 20,
                              height: 20,
                              fontSize: "9px",
                              fontWeight: 700,
                              bgcolor: "#e4e6eb",
                              color: "#666",
                              border: "2px solid #fff",
                              marginLeft: "-8px",
                            }}
                          >
                            +{post.comments.length - 2}
                          </Avatar>
                        )}
                      </Box>
                    </>
                  )}
                </Box>

                {/* Content */}
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
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#000000",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                        // onClick={() => handleProfile(post.user._id)}
                      >
                        {post.user.name}
                      </Typography>
                      <Verified sx={{ fontSize: 14, color: "#0095f6" }} />
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
                          color: "#666",
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
                      lineHeight: 1.33,
                      color: "#000000",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      mb: post.image ? 1.5 : 1.5,
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
                        borderRadius: 3,
                        border: "1px solid #e5e5e5",
                        mb: 1.5,
                      }}
                    />
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        cursor: "pointer",
                        "&:hover .icon": {
                          opacity: 0.6,
                        },
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FavoriteBorder
                        className="icon"
                        sx={{
                          fontSize: 20,
                          color: "#000000",
                          transition: "opacity 0.2s ease",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#999999",
                        }}
                      >
                        {Math.floor(Math.random() * 500)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        cursor: "pointer",
                        "&:hover .icon": {
                          opacity: 0.6,
                        },
                      }}
                      onClick={() => handleSinglePost(post._id)}
                    >
                      <ChatBubbleOutline
                        className="icon"
                        sx={{
                          fontSize: 20,
                          color: "#000000",
                          transition: "opacity 0.2s ease",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#999999",
                        }}
                      >
                        {post.comments?.length || 0}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        cursor: "pointer",
                        "&:hover .icon": {
                          opacity: 0.6,
                        },
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Repeat
                        className="icon"
                        sx={{
                          fontSize: 20,
                          color: "#000000",
                          transition: "opacity 0.2s ease",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#999999",
                        }}
                      >
                        {Math.floor(Math.random() * 50)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        cursor: "pointer",
                        "&:hover .icon": {
                          opacity: 0.6,
                        },
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Send
                        className="icon"
                        sx={{
                          fontSize: 20,
                          color: "#000000",
                          transition: "opacity 0.2s ease",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#999999",
                        }}
                      >
                        {Math.floor(Math.random() * 20)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Comments Section */}
                  {post.comments && post.comments.length > 0 && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#999999",
                          mb: 1,
                        }}
                      >
                        {post.comments.length} {post.comments.length === 1 ? "reply" : "replies"}
                      </Typography>

                      {/* First Comment */}
                      <Box
                        sx={{
                          bgcolor: "#fafafa",
                          borderRadius: "16px",
                          p: 1.5,
                          cursor: "pointer",
                          transition: "background-color 0.15s ease",
                          "&:hover": {
                            bgcolor: "#f5f5f5",
                          },
                        }}
                        onClick={() => handleSinglePost(post._id)}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProfile(post.comments[0].commentCreator._id);
                            }}
                          >
                            {post.comments[0].commentCreator.name?.charAt(0).toUpperCase()}
                          </Avatar>

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  color: "#000000",
                                  cursor: "pointer",
                                  "&:hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProfile(post.comments[0].commentCreator._id);
                                }}
                              >
                                {post.comments[0].commentCreator.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#999999",
                                  fontSize: "13px",
                                  fontWeight: 400,
                                }}
                              >
                                {formatDate(post.comments[0].createdAt)}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                lineHeight: 1.33,
                                color: "#000000",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                              }}
                            >
                              {post.comments[0].content}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
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
            {index < posts.length - 1 && <Divider sx={{ bgcolor: "#f0f0f0" }} />}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ThreadsClone;