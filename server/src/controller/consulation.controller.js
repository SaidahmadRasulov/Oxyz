import { asyncHandler } from "../middleware/asyncHandler.js";
import { Consulation } from "../models/consulation.model.js";

export const postConsulData = asyncHandler(async (req, res) => {
  const { username, phone_number } = req.body;

  if (!username || !phone_number) {
    return res.status(404).json({ message: "All field is required" });
  }

  const consulData = await Consulation.create({
    username,
    phone_number,
  });

  res.status(201).json(consulData);
});

export const getConsulData = asyncHandler(async (req, res) => {
  const data = await Consulation.findAll();
  if (!data) {
    return res
      .status(400)
      .json({ message: "Bad request or Not data on Backend" });
  }
  res.status(200).json(data);
});

export const putConsulData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, phone_number } = req.body;
  const consul_item = await Consulation.findByPk(id);

  if (!username || !phone_number) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (!consul_item) {
    return res
      .status(404)
      .json({ message: "Consul person not found or deleted" });
  }

  const updatedData = await consul_item.update({
    username: username ?? consul_item.username,
    phone_number: phone_number ?? consul_item.phone_number,
  });

  res.status(200).json(updatedData);
});

export const delConsulData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const consul = await Consulation.findByPk(id);

  if (!consul) {
    return res
      .status(400)
      .json({ message: "Consul data not found or already deleted" });
  }

  await consul.destroy();
  res.status(200).json({ message: "Consul date was deleted successfull" });
});
