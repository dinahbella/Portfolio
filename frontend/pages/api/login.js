export default function handler(req, res) {
  const { username, password } = req.body;

  if (username === "admin" && password === "secret") {
    res.setHeader("Set-Cookie", [
      "session=valid; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure",
    ]);
    res.status(200).json({ message: "Logged in" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
