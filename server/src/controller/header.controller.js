import { asyncHandler } from "../middleware/asyncHandler.js";
import { Header } from "../models/header.model.js";

// Post HEADER DATA
export const postHeaderData = asyncHandler(async (req, res) => {
  const imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  const { title, description } = req.body;

  if (!title || !description || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const headerData = await Header.create({
    title,
    description,
    image: imageUrl,
  });

  res.status(201).json(headerData);
});

// Get HEADER DATA
export const getHeaderData = asyncHandler(async (req, res) => {
  const headerData = await Header.findAll();
  if (!headerData) {
    return res.status(400).json({ message: "Bad request bro!" });
  }
  res.status(200).json(headerData);
});

// @Header ByID 
export const getHeaderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const header = await Header.findByPk(id);
  if (!header) {
    return res.status(404).json({ message: "Header not found" });
  }

  res.status(200).json(header);
});

// UPDATE HEADER DATA
export const updateHeaderData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const header = await Header.findByPk(id);
  if (!header) {
    return res.status(404).json({ message: "Header not found" });
  }

  let image = header.image;
  if (req.file) {
    image = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  }

  await header.update({
    title: title ?? header.title,
    description: description ?? header.description,
    image,
  });

  res.status(200).json(header);
});

// DELETE HEADER DATA
export const deleteHeaderData = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const item = await Header.findByPk(id);

  if (!item) {
    return res.status(404).json({ message: "Header Item not found" });
  }

  await item.destroy();

  res.status(200).json({ message: "Header deleted" });
});
