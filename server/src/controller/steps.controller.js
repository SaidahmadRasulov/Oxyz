import { Steps } from "../models/steps.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { pickFields } from "../utils/pickFields.js";

export const getStepsData = asyncHandler(async (req, res) => {
  const data = await Steps.findAll();
  res.status(200).json(data);
});

export const postStepsData = asyncHandler(async (req, res) => {
  const data = pickFields(req.body, allowed_fields);

  if (required_fields.some((field) => !data[field])) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const created = await Steps.create(data);

  res.status(201).json(created);
});

// PUT
export const putStepsData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const stepItem = await Steps.findByPk(id);

  if (!stepItem) {
    return res.status(404).json({ message: "Step not found" });
  }

  const updateData = pickFields(req.body, allowed_fields);

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  await stepItem.update(updateData);

  res.status(200).json(stepItem);
});

// DELETE
export const deleteStepsData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const stepItem = await Steps.findByPk(id);

  if (!stepItem) {
    return res.status(404).json({ message: "Step not found" });
  }

  await stepItem.destroy();

  res.status(200).json({
    message: "Step deleted successfully",
    id,
  });
});
