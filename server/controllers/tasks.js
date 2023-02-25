const getAllEntries = (req,res) =>{
    res.send("getting all entries")
}

const createNewEntry = (req, res) =>{
    res.send("create new entry")
}

module.exports = {
    getAllEntries,
    createNewEntry
}