"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
}
