const express = require("express");
const router = express.Router();

const {
  getAllEntries,
  createNewEntry,
  getOneEntry,
  deleteEntry,
  editEntry,
} = require("../controllers/tasks");

router.route("/").get(getAllEntries).post(createNewEntry);
router.route("/:id").get(getOneEntry).delete(deleteEntry).patch(editEntry);

module.exports = router;
