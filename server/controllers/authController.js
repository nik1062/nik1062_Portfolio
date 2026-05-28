import jwt from "jsonwebtoken";

export const loginAdmin = (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const jwtSecret = process.env.JWT_SECRET || "super-secret-local-key";

  if (password === adminPassword) {
    const token = jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "1d" });
    return res.json({ ok: true, token });
  }
  return res.status(401).json({ ok: false, error: "Invalid credentials" });
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET || "super-secret-local-key";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
};
