// pages/api/auth/login.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  // 🔐 Replace these with real DB lookups in production
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "secret123";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
}
