import { asyncHandler } from "../middleware/asyncHandler.js";
import { NavbarLinks } from "../models/navlinks.model.js";

export const postNavbarLink = asyncHandler(async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const navbarData = await NavbarLinks.create({
    title,
    url,
  });

  res.status(201).json(navbarData);
});

export const getNavbarLink = asyncHandler(async (req, res) => {
  const data = await NavbarLinks.findAll();

  if (!data) {
    return res.status(400).json({ message: "Bad Request Bro!" });
  }

  res.status(200).json(data);
});

export const getNavbarLinkById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await NavbarLinks.findByPk(id);
  if (!item) {
    return res.status(404).json({ message: "NavbarLink not found" });
  }

  res.status(200).json(item);
});

export const putNavbarLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  const link = await NavbarLinks.findByPk(id);
  if (!link) {
    return res.status(404).json({ message: "This Item not found!" });
  }

  await link.update({
    title: title ?? link.title,
    url: url ?? link.url,
  });

  res.status(200).json(link);
});

export const deleteNavbarLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await NavbarLinks.findByPk(id);

  if (!item) {
    return res.status(404).json({ message: "NavbarLink Item not found" });
  }

  await item.destroy();

  res.status(200).json({ message: "NavbarLink deleted" });
});
