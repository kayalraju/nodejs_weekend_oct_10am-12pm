const IndexingModel = require("../model/indexingModel");

class IndexingController {
  async createData(req, res) {
    const { username, firstName, lastName, tags, bio, location, isActive } =
      req.body;

    try {
      const newIndex = new IndexingModel({
        username,
        firstName,
        lastName,
        tags,
        bio,
        location,
        isActive,
      });

      const savedIndex = await newIndex.save();
      return res
        .status(201)
        .json({ message: "Index created", data: savedIndex });
    } catch (error) {
      console.error("Error creating index:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async UserNameIndexing(req, res) {
    try {
      const username = req.params.username;
      const data = await IndexingModel.find({ username });
      return res.status(200).json({ message: "Index found", data: data });
    } catch (error) {
      console.error("Error finding index:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async compoundIndexing(req,res) {
    try {
      const { firstName, lastName } = req.query;
      const indexes = await IndexingModel.find({ firstName, lastName });
      return res.status(200).json({ message: "Index found", data: indexes });
    } catch (error) {
      console.error("Error finding index:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new IndexingController();
