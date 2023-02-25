const express = require("express")
const router = express.Router()
const {getAllEntries, createNewEntry} = require("../controllers/tasks")

router.route("/").get(getAllEntries).post(createNewEntry)

module.exports = router
