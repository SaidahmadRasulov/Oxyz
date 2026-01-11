import { asyncHandler } from "../middleware/asyncHandler.js";
import { News } from "../models/news.model.js";

// POST
export const postNewsData = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

  const data = await News.create({
    title,
    content,
    image: imageUrl,
  });

  res.status(201).json(data);
});

// GET
export const getNewsData = asyncHandler(async (req, res) => {
  const data = await News.findAll();
  res.status(200).json(data);
});

// PUT
export const putNewsData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const newsItem = await News.findByPk(id);

  if (!newsItem) {
    return res.status(404).json({ message: "News item not found" });
  }

  let image = newsItem.image;
  if (req.file) {
    image = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  }

  await newsItem.update({
    title: title ?? newsItem.title,
    content: content ?? newsItem.content,
    image,
  });

  res.status(200).json(newsItem);
});

// DELETE
export const deleteNewsData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await News.findByPk(id);

  if (!item) {
    return res.status(404).json({ message: "News item not found" });
  }

  await item.destroy();

  res.status(200).json({ message: "News deleted successfully", id });
});
