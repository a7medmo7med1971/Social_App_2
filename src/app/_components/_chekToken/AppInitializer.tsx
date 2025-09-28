"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setToken } from "@/redex/authSlice";
import { useDispatch } from "react-redux";


export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      dispatch(setToken(savedToken)); 
    }
  }, [dispatch]);

  return null; // مش بيعرض أي UI
}
