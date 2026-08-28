const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  whatsappOptIn: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Subscriber", subscriberSchema);
