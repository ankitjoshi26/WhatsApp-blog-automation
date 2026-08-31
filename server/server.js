const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const connectDB = require("./config/db");

console.log("Mongo URI exists:", !!process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "WhatsApp Blog Notifier API is running" }));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
