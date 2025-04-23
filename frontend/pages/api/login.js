export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (username === validUsername && password === validPassword) {
    const isProd = process.env.NODE_ENV === "production";

    res.setHeader(
      "Set-Cookie",
      [
        `session=valid`,
        `HttpOnly`,
        `Path=/`,
        `Max-Age=${24 * 60 * 60}`, // 1 day
        `SameSite=${isProd ? "None" : "Strict"}`,
        ...(isProd ? ["Secure"] : []),
      ].join("; ")
    );

    return res.status(200).json({ message: "Logged in" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
}
