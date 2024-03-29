// controllers/organizationController.js
const Organization = require("../models/Organization");

exports.createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const organization = new Organization({ name });
    await organization.save();
    res.status(201).json(organization);
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const organization = await Organization.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!organization) {
      res.status(404).json({ error: "Item not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Organization.findByIdAndDelete(id);

   
    if (!item) {
      res.json(400).json({ error: "internal server error " });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Similarly, implement updateOrganization and deleteOrganization functions
