const Subscriber = require("../models/Subscriber");

const subscribe = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ message: "Name and phone are required" });
    const existing = await Subscriber.findOne({ phone });
    if (existing) return res.status(400).json({ message: "This number is already subscribed" });
    const subscriber = await Subscriber.create({ name, phone, whatsappOptIn: true });
    res.status(201).json({ message: "Successfully subscribed", subscriber });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const { phone } = req.body;
    const subscriber = await Subscriber.findOneAndUpdate({ phone }, { whatsappOptIn: false }, { new: true });
    if (!subscriber) return res.status(404).json({ message: "Subscriber not found" });
    res.json({ message: "Successfully unsubscribed", subscriber });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { subscribe, unsubscribe };
