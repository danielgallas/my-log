const express = require("express");
const router = express.Router();
const {
  getAllEntries,
  createNewEntry,
  getOneEntry,
} = require("../controllers/tasks");

router.route("/").get(getAllEntries).post(createNewEntry);
router.route("/:id").get(getOneEntry);

module.exports = router;
