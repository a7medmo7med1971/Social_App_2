"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  return (


  );
}
