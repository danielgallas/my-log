const express = require("express")
const router = express.Router()
const {getAllEntries, createNewEntry} = require("../controllers/tasks")

router.route("/").get(getAllEntries)

router.route("/create").get(createNewEntry)

module.exports = router
