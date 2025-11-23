"use client";
import { getSinglePost } from '@/redex/getSinglePost';
import { dispatchType, Statetype } from '@/redex/store';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  ArrowBack,
} from "@mui/icons-material";
import ThreadsLoadingScreen from '@/app/ThreadsLoadingScreen';

export default function Singlepost() {
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  const { post, loading } = useSelector((state: Statetype) => state.SinglePostsReducer);
  const params = useParams();
  const id = params?.id as string;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfile = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (id) dispatch(getSinglePost(id));
  }, [dispatch, id]);

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
              height: 56,
              gap: 1,
            }}
          >
            <IconButton
              onClick={() => router.back()}
              sx={{
                p: 1,
                color: "#000",
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
              }}
            >
              <ArrowBack sx={{ fontSize: 24 }} />
            </IconButton>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                color: "#000",
              }}
            >
              Thread
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          maxWidth: { xs: "100%", sm: 630 },
        }}
      >
        {/* Post */}
        <Box
          sx={{
            borderBottom: "1px solid #f0f0f0",
            px: 2,
            py: 2,
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
                src={post?.user?.photo}
                alt={post?.user?.name}
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
                onClick={() => post?.user?._id && handleProfile(post.user._id)}
              >
                {post?.user?.name?.charAt(0).toUpperCase()}
              </Avatar>

              {/* Thread line */}
              {post?.comments && post.comments.length > 0 && (
                <Box
                  sx={{
                    width: 2,
                    bgcolor: "#e5e5e5",
                    flex: 1,
                    my: 1,
                    minHeight: 20,
                  }}
                />
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
                  onClick={() => post?.user?._id && handleProfile(post.user._id)}
                  >
                    {post?.user?.name}
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
                    {formatDate(post?.createdAt)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleMenuOpen}
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
                  mb: post?.image ? 1.5 : 1.5,
                }}
              >
                {post?.body}
              </Typography>

              {/* Post Image */}
              {post?.image && (
                <Box
                  component="img"
                  src={post?.image}
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
              <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
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
                    {post?.comments?.length || 0}
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
            </Box>
          </Box>
        </Box>

        {/* Comments Section */}
        <Box sx={{ px: 2, pt: 2, pb: 3 }}>
          {post?.comments && post.comments.length > 0 ? (
            post.comments.map((comment: any, index: number) => (
              <Box key={comment._id}>
                <Box sx={{ display: "flex", gap: 1.5, py: 2 }}>
                  {/* Avatar with thread line */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={comment?.commentCreator?.photo}
                      alt={comment?.commentCreator?.name}
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
                      onClick={() => handleProfile(comment?.commentCreator?._id)}
                    >
                      {comment?.commentCreator?.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    {/* Thread line for comments */}
                    {index < post.comments.length - 1 && (
                      <Box
                        sx={{
                          width: 2,
                          bgcolor: "#e5e5e5",
                          flex: 1,
                          my: 1,
                          minHeight: 20,
                        }}
                      />
                    )}
                  </Box>

                  {/* Comment Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
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
                          onClick={() => handleProfile(comment?.commentCreator?._id)}
                        >
                          {comment?.commentCreator?.name}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: "#999999",
                          fontSize: "15px",
                          fontWeight: 400,
                        }}
                      >
                        {formatDate(comment?.createdAt)}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        lineHeight: 1.33,
                        color: "#000000",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        mb: 1.5,
                      }}
                    >
                      {comment?.content}
                    </Typography>

                    {/* Comment Actions */}
                    <Box sx={{ display: "flex", gap: 2 }}>
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
                          {Math.floor(Math.random() * 100)}
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
                      >
                        <ChatBubbleOutline
                          className="icon"
                          sx={{
                            fontSize: 20,
                            color: "#000000",
                            transition: "opacity 0.2s ease",
                          }}
                        />
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
                      >
                        <Repeat
                          className="icon"
                          sx={{
                            fontSize: 20,
                            color: "#000000",
                            transition: "opacity 0.2s ease",
                          }}
                        />
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
                      >
                        <Send
                          className="icon"
                          sx={{
                            fontSize: 20,
                            color: "#000000",
                            transition: "opacity 0.2s ease",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {index < post.comments.length - 1 && (
                  <Divider sx={{ bgcolor: "#f0f0f0" }} />
                )}
              </Box>
            ))
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
              }}
            >
              <Typography
                sx={{
                  color: "#999999",
                  fontSize: "15px",
                  fontWeight: 400,
                }}
              >
                No replies yet
              </Typography>
            </Box>
          )}
        </Box>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
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
            onClick={handleMenuClose}
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
            onClick={handleMenuClose}
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
            onClick={handleMenuClose}
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
            onClick={handleMenuClose}
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
      </Container>
    </Box>
  );
}