import { Contact } from "../models/contact.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { pickFields } from "../utils/pickFields.js";

const required_fields = [
  "work_time",
  "contact_number_main",
  "contact_number_second",
  "telegram",
  "whatsapp",
  "facebook",
  "instagram",
  "email",
  "location",
];

const allowed_fields = [...required_fields];

export const postContactData = asyncHandler(async (req, res) => {
  const missingFields = required_fields.filter((field) => !req.body[field]);

  if (missingFields.length) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields,
    });
  }

  const contact = await Contact.create(pickFields(req.body, allowed_fields));

  res.status(201).json({
    success: true,
    data: contact,
  });
});

/**
 * GET ALL CONTACTS
 */
export const getContacts = asyncHandler(async (_req, res) => {
  const contacts = await Contact.findAll();

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

/**
 * GET CONTACT BY ID
 */
export const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByPk(id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * UPDATE CONTACT
 */
export const putContactData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByPk(id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const updateData = pickFields(req.body, allowed_fields);

  if (!Object.keys(updateData).length) {
    return res.status(400).json({
      message: "No valid fields to update",
    });
  }

  await contact.update(updateData);

  res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * DELETE CONTACT
 */
export const deleteContactData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByPk(id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  await contact.destroy();

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});
