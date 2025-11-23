"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  IconButton,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import {
  ArrowBack,
  MoreHoriz,
  Instagram,
  Link as LinkIcon,
  Verified,
  FavoriteBorder,
  ChatBubbleOutline,
  Repeat,
  Send,
} from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

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

export default function ProfileUser() {
  const router = useRouter();
  const { id } = useParams();
  const token = Cookies.get("token");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  function getUsersPosts(id: string) {
    axios
      .get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=2` )
       
     
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (id) getUsersPosts(id as string);
  }, [id]);

  const user = posts[0]?.user;

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
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        pt: { xs: 7, md: 8 },
        pb: { xs: 8, md: 2 },
      }}
    >
      {/* Mobile Header */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          zIndex: 1100,
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          height: 56,
        }}
      >
        <IconButton onClick={() => router.back()} sx={{ color: "#000", p: 1 }}>
          <ArrowBack sx={{ fontSize: 24 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>Profile</Typography>
        <IconButton sx={{ color: "#000", p: 1 }}>
          <MoreHoriz sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      <Container maxWidth="sm" sx={{ maxWidth: { xs: "100%", sm: 600 }, px: { xs: 0, sm: 2 } }}>
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: { xs: 0, sm: 3 },
            border: { xs: "none", sm: "1px solid #e5e5e5" },
            overflow: "hidden",
          }}
        >
          {/* Profile Header */}
          <Box sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: "24px", color: "#000", mb: 0.5 }}>
                  {user?.name || "User"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography sx={{ fontSize: "15px", color: "#000", fontWeight: 400 }}>
                    @{user?.name?.toLowerCase().replace(/\s+/g, "")}
                  </Typography>
                  <Verified sx={{ fontSize: 16, color: "#0095f6" }} />
                </Box>
              </Box>

              <Avatar
                src={user?.photo}
                sx={{
                  width: 84,
                  height: 84,
                  fontSize: "2rem",
                  fontWeight: 600,
                  bgcolor: "#000",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>

            {/* Bio */}
            <Typography sx={{ fontSize: "15px", lineHeight: 1.4, color: "#000", mb: 2 }}>
              Welcome to my profile
            </Typography>

            {/* Stats */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Typography sx={{ fontSize: "15px", color: "#999999" }}>{posts.length} threads</Typography>
              <Typography sx={{ fontSize: "15px", color: "#999999" }}>·</Typography>
              <Typography sx={{ fontSize: "15px", color: "#999999" }}>0 followers</Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Button fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                Follow
              </Button>
              <Button fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                Share
              </Button>
            </Box>

            {/* Icons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton size="small" sx={{ color: "#999" }}>
                <Instagram sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "#999" }}>
                <LinkIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>

          <Divider />

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ px: 2.5 }}
          >
            <Tab label="Threads" sx={{ textTransform: "none", fontWeight: 600 }} />
            <Tab label="Replies" sx={{ textTransform: "none", fontWeight: 600 }} />
            <Tab label="Reposts" sx={{ textTransform: "none", fontWeight: 600 }} />
          </Tabs>

          <Divider />

          {/* Posts */}
          {loading ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography sx={{ color: "#999" }}>Loading...</Typography>
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography sx={{ color: "#999", fontSize: "15px" }}>
                No threads yet
              </Typography>
            </Box>
          ) : (
            posts.map((post, index) => (
              <React.Fragment key={post._id}>
                <Box
                  sx={{
                    p: 2.5,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#fafafa" },
                  }}
                  onClick={() => router.push(`/singlepost/${post._id}`)}
                >
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar
                      src={post.user.photo}
                      sx={{
                        width: 36,
                        height: 36,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        bgcolor: "#000",
                      }}
                    >
                      {post.user.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
                            {post.user.name}
                          </Typography>
                          <Verified sx={{ fontSize: 14, color: "#0095f6" }} />
                        </Box>

                        <Typography sx={{ color: "#999999", fontSize: "15px" }}>
                          {formatDate(post.createdAt)}
                        </Typography>
                      </Box>

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

                      {post.image && (
                        <Box
                          component="img"
                          src={post.image}
                          alt="Post"
                          sx={{
                            width: "100%",
                            maxHeight: 400,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: "1px solid #efefef",
                            mb: 1.5,
                          }}
                        />
                      )}

                      <Box sx={{ display: "flex", gap: 0.25, mb: 1 }}>
                        <IconButton size="small">
                          <FavoriteBorder sx={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton size="small">
                          <ChatBubbleOutline sx={{ fontSize: 19 }} />
                        </IconButton>
                        <IconButton size="small">
                          <Repeat sx={{ fontSize: 21 }} />
                        </IconButton>
                        <IconButton size="small">
                          <Send sx={{ fontSize: 19 }} />
                        </IconButton>
                      </Box>

                      <Typography sx={{ color: "#999999", fontSize: "15px" }}>
                        {post.comments?.length || 0} replies
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {index < posts.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
}
