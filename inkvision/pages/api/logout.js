// pages/api/logout.js

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    "session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure"
  );
  res.status(200).json({ message: "Logged out" });
}
