export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  // In production, use proper password hashing and database lookup
  if (username === "admin" && password === "secret") {
    res.setHeader(
      "Set-Cookie",
      `session=${encodeURIComponent("valid")}; ` +
        `HttpOnly; ` +
        `Path=/; ` +
        `Max-Age=${24 * 60 * 60}; ` + // 1 hour
        `SameSite=Strict; ` +
        `Secure${
          process.env.NODE_ENV === "production" ? "; SameSite=None" : ""
        }`
    );
    return res.status(200).json({ message: "Logged in" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
}
