export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Replace with your actual authentication logic
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If using JWT
    const token = generateToken(username); // Implement your token generation

    // Set HTTP-only cookie if using session cookies

    return res.status(200).json({
      message: "Authentication successful",
      token: token, // Only include if using localStorage approach
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Simple token generation (replace with proper JWT implementation)
function generateToken(username) {
  return Buffer.from(`${username}:${Date.now()}`).toString("base64");
}
