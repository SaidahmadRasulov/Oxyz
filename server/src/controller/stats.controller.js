import { Stats } from "../models/stats.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { pickFields } from "../utils/pickFields.js";

const required_fields = ["order", "item_title", "label", "icon"];
const allowed_fields = [...required_fields];

// GET
export const getStatsData = asyncHandler(async (req, res) => {
  const data = await Stats.findAll();
  res.status(200).json(data);
});

// POST
export const postStatsData = asyncHandler(async (req, res) => {
  const data = pickFields(req.body, allowed_fields);

  if (required_fields.some((field) => !data[field])) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const created = await Stats.create(data);

  res.status(201).json(created);
});

// PUT
export const putStatsData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const statsItem = await Stats.findByPk(id);

  if (!statsItem) {
    return res.status(404).json({ message: "Stats not found" });
  }

  const updateData = pickFields(req.body, allowed_fields);

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  await statsItem.update(updateData);

  res.status(200).json(statsItem);
});

// DELETE
export const deleteStatsData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const statsItem = await Stats.findByPk(id);

  if (!statsItem) {
    return res.status(404).json({ message: "Stats not found" });
  }

  await statsItem.destroy();

  res.status(200).json({
    message: "Stats deleted successfully",
    id,
  });
});
