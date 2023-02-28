const express = require("express");
const router = express.Router();
const {
  getAllEntries,
  createNewEntry,
  getOneEntry,
  deleteEntry,
} = require("../controllers/tasks");

router.route("/").get(getAllEntries).post(createNewEntry);
router.route("/:id").get(getOneEntry).delete(deleteEntry);

module.exports = router;
