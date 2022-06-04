const express = require("express");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/events", auth, async (req, res) => {
  const event = new Event({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await event.save();
    res.status(201).send(event);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/events", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "description" ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: "events",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.events);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/eventsAll", auth, async (req, res) => {
  try {
    const event = await Event.find({});

    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/events/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const event = await Event.findOne({ _id, owner: req.user._id });

    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/events/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "date"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates! " });
  }

  try {
    const event = await Event.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!event) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      event[update] = req.body[update];
    });

    await event.save();

    res.send(event);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/events/:id", auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!event) {
      res.status(404).send();
    }
    res.send(event);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
