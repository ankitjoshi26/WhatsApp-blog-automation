const Blog = require("../models/Blog");
const Subscriber = require("../models/Subscriber");
const { notifySubscriber } = require("../services/whatsappService");

const createBlog = async (req, res) => {
  try {
    const { title, slug, url, published = false } = req.body;
    if (!title || !slug || !url) return res.status(400).json({ message: "title, slug and url are required" });

    const blog = await Blog.create({ title, slug, url, published, publishedAt: published ? new Date() : undefined });
    let notification = { attempted: 0, sent: 0, failed: 0 };

    if (published) {
      const subscribers = await Subscriber.find({ whatsappOptIn: true });
      notification.attempted = subscribers.length;
      for (const subscriber of subscribers) {
        try {
          await notifySubscriber(subscriber, blog);
          notification.sent++;
        } catch (error) {
          notification.failed++;
          console.error(`WhatsApp failed for ${subscriber.phone}:`, error.message);
        }
      }
    }

    res.status(201).json({ message: "Blog created", blog, notification });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const publishBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { published: true, publishedAt: new Date() }, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const subscribers = await Subscriber.find({ whatsappOptIn: true });
    let sent = 0, failed = 0;
    for (const subscriber of subscribers) {
      try { await notifySubscriber(subscriber, blog); sent++; }
      catch (error) { failed++; console.error(`WhatsApp failed for ${subscriber.phone}:`, error.message); }
    }

    res.json({ message: "Blog published", blog, notification: { attempted: subscribers.length, sent, failed } });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { createBlog, publishBlog };
