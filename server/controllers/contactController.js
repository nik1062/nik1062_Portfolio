import { ContactMessage } from "../models/Contact.js";

const memoryMessages = [];

export const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Name, email, and message are required." });
  }

  const databaseConnected = req.app.get("databaseConnected");

  if (databaseConnected) {
    try {
      await ContactMessage.create({ name, email, message });
    } catch (error) {
      console.error("Database save failed:", error);
      return res.status(500).json({ ok: false, error: "Failed to save message." });
    }
  } else {
    memoryMessages.push({ name, email, message, createdAt: new Date().toISOString() });
    console.log("New contact message (memory):", { name, email, message });
  }

  return res.status(201).json({ ok: true, message: "Message received." });
};

export const getMessages = async (req, res) => {
  const databaseConnected = req.app.get("databaseConnected");

  if (databaseConnected) {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(25);
    return res.json({ ok: true, messages });
  }

  return res.json({ ok: true, messages: memoryMessages.slice(-25).reverse() });
};
