// src/utils/authFetch.js

export const fetchWithAuth = async (url, options = {}) => {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });

  if (res.status === 401) {
    // Token might be expired, try refreshing
    const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const { token } = await refreshRes.json();
      localStorage.setItem("token", token);

      // Retry original request
      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    } else {
      // Refresh token failed — logout user
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return res;
};
