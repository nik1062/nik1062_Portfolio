import express from "express";
import { getAnswer } from "../controllers/assistantController.js";
import { submitContact, getMessages } from "../controllers/contactController.js";
import { loginAdmin, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/health", (req, res) => {
  const databaseConnected = req.app.get("databaseConnected");
  res.json({ ok: true, database: databaseConnected ? "connected" : "offline" });
});

// Public Routes
router.post("/contact", submitContact);
router.post("/assistant", getAnswer);

// Admin Auth
router.post("/auth/login", loginAdmin);

// Protected Admin Routes
router.get("/messages", verifyToken, getMessages);

export default router;
