// ThreadsClone.tsx
"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Divider,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import {
  FavoriteBorder,
  ChatBubbleOutline,
  Repeat,
  Send,
  MoreHoriz,
  VerifiedUser,
} from "@mui/icons-material";

interface Post {
  id: number;
  username: string;
  displayName: string;
  verified: boolean;
  avatar: string;
  time: string;
  content: string;
  images?: string[];
  likes: string;
  comments: number;
  reposts: number;
  shares: number;
}

const posts: Post[] = [
  {
    id: 1,
    username: "suprememicah",
    displayName: "Micah",
    verified: true,
    avatar: "SM",
    time: "14h",
    content: "There are two types of families",
    images: [
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    ],
    likes: "5.4K",
    comments: 2,
    reposts: 39,
    shares: 11,
  },
  {
    id: 2,
    username: "streetartglobe",
    displayName: "Street Art Globe",
    verified: true,
    avatar: "SA",
    time: "21h",
    content:
      "This is CRAZY! 😱🎥\nFeaturing world champion indoor skydiver feithmate 🤯\nWith @leo_volkov",
    images: [
      "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=80",
    ],
    likes: "8.2K",
    comments: 45,
    reposts: 156,
    shares: 23,
  },
];

const ThreadsClone: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #e0e0e0",
          color: "#000",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.5px",
            }}
          >
            Home
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Posts */}
      <Container maxWidth="sm" sx={{ py: 0 }}>
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <Card
              elevation={0}
              sx={{ borderRadius: 0, bgcolor: "transparent" }}
            >
              <CardContent sx={{ px: 2, py: 2.5 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      bgcolor: "#1d9bf0",
                      mr: 1.5,
                    }}
                  >
                    {post.avatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                      >
                        {post.username}
                      </Typography>
                      {post.verified && (
                        <VerifiedUser sx={{ fontSize: 16, color: "#1d9bf0" }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ color: "#666", fontSize: "0.9rem" }}
                      >
                        {post.time}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={handleMenuOpen}
                    sx={{ color: "#666" }}
                  >
                    <MoreHoriz />
                  </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ pl: 7 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: post.images ? 2 : 1.5,
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {post.content}
                  </Typography>

                  {/* Images */}
                  {post.images && post.images.length > 0 && (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          post.images.length > 1 ? "1fr 1fr" : "1fr",
                        gap: 1,
                        mb: 2,
                        overflow: "hidden",
                      }}
                    >
                      {post.images.map((img, idx) => (
                        <Box
                          key={idx}
                          component="img"
                          src={img}
                          alt={`Post image ${idx + 1}`}
                          sx={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: 2,
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {/* Actions */}
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <IconButton size="small" sx={{ color: "#000" }}>
                      <FavoriteBorder sx={{ fontSize: 21 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#000" }}>
                      <ChatBubbleOutline sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#000" }}>
                      <Repeat sx={{ fontSize: 22 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#000" }}>
                      <Send sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>

                  {/* Stats */}
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      {post.likes}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      {post.comments}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      {post.reposts}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      {post.shares}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            {index < posts.length - 1 && (
              <Divider sx={{ borderColor: "#e0e0e0" }} />
            )}
          </React.Fragment>
        ))}
      </Container>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Save</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy link</MenuItem>
        <MenuItem onClick={handleMenuClose}>Report</MenuItem>
      </Menu>
    </Box>
  );
};

export default ThreadsClone;
