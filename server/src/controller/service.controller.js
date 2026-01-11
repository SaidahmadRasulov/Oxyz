import { Service } from "../models/service.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { pickFields } from "../utils/pickFields.js";

const required_fields = ["title", "description"];
const allowed_fields = [...required_fields];

// GET ALL
export const getServiceData = asyncHandler(async (req, res) => {
  const data = await Service.findAll();
  res.status(200).json(data);
});

// POST
export const postServiceData = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description || !req.file) {
    return res.status(400).json({
      message: "Title, description and image are required",
    });
  }

  const imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

  const data = await Service.create({
    title,
    description,
    image: imageUrl,
  });

  res.status(201).json(data);
});

// PUT
export const putServiceData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const serviceItem = await Service.findByPk(id);

  if (!serviceItem) {
    return res.status(404).json({ message: "Service not found" });
  }

  const updateData = pickFields(req.body, allowed_fields);

  if (req.file) {
    updateData.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  await serviceItem.update(updateData);

  res.status(200).json(serviceItem);
});

// DELETE
export const deleteServiceData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const serviceItem = await Service.findByPk(id);

  if (!serviceItem) {
    return res.status(404).json({ message: "Service not found" });
  }

  await serviceItem.destroy();

  res.status(200).json({
    message: "Service deleted successfully",
    id,
  });
});
