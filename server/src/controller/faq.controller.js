import { Faq } from "../models/faq.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { pickFields } from "../utils/pickFields.js";

/**
 * REQUIRED & ALLOWED FIELDS
 */
const required_fields = ["faq_number", "question", "answer"];
const allowed_fields = [...required_fields];

/**
 * CREATE FAQ
 */
export const postFaqData = asyncHandler(async (req, res) => {
  const missingFields = required_fields.filter(
    (field) => req.body[field] === undefined
  );

  if (missingFields.length) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields,
    });
  }

  const faq = await Faq.create(pickFields(req.body, allowed_fields));

  res.status(201).json({
    success: true,
    data: faq,
  });
});

/**
 * GET ALL FAQ
 */
export const getAllFaqs = asyncHandler(async (_req, res) => {
  const faqs = await Faq.findAll({
    order: [["faq_number", "ASC"]],
  });

  res.status(200).json({
    success: true,
    count: faqs.length,
    data: faqs,
  });
});

/**
 * GET FAQ BY ID
 */
export const getFaqById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const faq = await Faq.findByPk(id);
  if (!faq) {
    return res.status(404).json({ message: "FAQ not found" });
  }

  res.status(200).json({
    success: true,
    data: faq,
  });
});

/**
 * UPDATE FAQ
 */
export const putFaqData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const faq = await Faq.findByPk(id);
  if (!faq) {
    return res.status(404).json({ message: "FAQ not found" });
  }

  const updateData = pickFields(req.body, allowed_fields);

  if (!Object.keys(updateData).length) {
    return res.status(400).json({
      message: "No valid fields to update",
    });
  }

  await faq.update(updateData);

  res.status(200).json({
    success: true,
    data: faq,
  });
});

/**
 * DELETE FAQ
 */
export const deleteFaqData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const faq = await Faq.findByPk(id);
  if (!faq) {
    return res.status(404).json({ message: "FAQ not found" });
  }

  await faq.destroy();

  res.status(200).json({
    success: true,
    message: "FAQ deleted successfully",
  });
});
