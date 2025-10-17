"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function ProfileUser() {
  const params = useParams();
  const id = params?.id as string;
  const token =  Cookies.get('token');

  function getUsersPostes(id:string){
    axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=10`,{headers:{token:token}})
    .then((res)=>{
      console.log(res.data.posts);
    }).catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    getUsersPostes(id);
  })

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
}
