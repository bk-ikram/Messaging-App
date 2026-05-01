// src/utils/apiFetch.js
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000; // exp is in seconds, Date.now() in ms
  } catch {
    return true; // if decoding fails, treat as expired
  }
}

export default function createApiFetch({ token, onExpired }) {
  return async function apiFetch(url, options = {}) {
    if (token && isTokenExpired(token)) {
      onExpired();
      return null;
    }
    try{
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (res.status === 401) {
        onExpired(); // catch server-side expiry too, as a safety net
        return null;
      }
      if(!res.ok){
        const data = await res.json();
        const error = new Error(data?.message || "Request failed");
        error.status = res.status;
        error.data = data;
        throw error;
      }
        

      return res.json();
    }
    catch(err){
        console.error('Fetch error: ',err.message);
        throw err;
    }
    
  };
}