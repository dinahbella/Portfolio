// pages/api/login.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Use environment variables for credentials (set in .env.local)
  const validUsername = process.env.USERNAME;
  const validPassword = process.env.PASSWORD;

  if (username === validUsername && password === validPassword) {
    // Set secure session cookie
    res.setHeader("Set-Cookie", [
      "session=valid; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure",
    ]);
    res.status(200).json({ message: "Logged in" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
