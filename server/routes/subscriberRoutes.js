const express = require("express");
const { subscribe, unsubscribe } = require("../controllers/subscriberController");
const router = express.Router();
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);
module.exports = router;
