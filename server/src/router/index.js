import { Router } from "express";
import { createAdmin, loginAdmin } from "../controller/admin.controller.js";
// @Header Imports
import {
  deleteHeaderData,
  getHeaderById,
  getHeaderData,
  postHeaderData,
  updateHeaderData,
} from "../controller/header.controller.js";

// --------------------------
import uploadImage from "../middleware/uploadImage.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.middleware.js";
// --------------------------

// @Navlinks Import
import {
  deleteNavbarLink,
  getNavbarLink,
  getNavbarLinkById,
  postNavbarLink,
  putNavbarLink,
} from "../controller/navlinks.controller.js";

// @Consul Imports
import {
  getConsulData,
  postConsulData,
} from "../controller/consulation.controller.js";
import {
  deleteQuote,
  getAllQuotes,
  postQuoteData,
  updateQuote,
} from "../controller/quote.controller.js";
import {
  deleteContactData,
  getContacts,
  postContactData,
  putContactData,
} from "../controller/contact.controller.js";
import {
  deleteFaqData,
  getAllFaqs,
  postFaqData,
  putFaqData,
} from "../controller/faq.controller.js";
import {
  deleteNewsData,
  getNewsData,
  postNewsData,
  putNewsData,
} from "../controller/news.controller.js";
import {
  deleteStatsData,
  getStatsData,
  postStatsData,
  putStatsData,
} from "../controller/stats.controller.js";
import {
  deleteServiceData,
  getServiceData,
  postServiceData,
  putServiceData,
} from "../controller/service.controller.js";
import {
  deleteStepsData,
  getStepsData,
  postStepsData,
  putStepsData,
} from "../controller/steps.controller.js";

const globalRouter = Router();

globalRouter.get("/", (req, res) => {
  res.send("Welcome to API");
});

// Admin Routes

// globalRouter.post('/admin/create', createAdmin)
globalRouter.post("/admin/login", loginAdmin);

// @Navbar Routes
globalRouter.post("/nav", auth, isAdmin, postNavbarLink);
globalRouter.get("/nav", getNavbarLink);
globalRouter.put("/nav/:id", putNavbarLink);
globalRouter.delete("/nav/:id", deleteNavbarLink);

// @Header Routes
globalRouter.post(
  "/header",
  auth,
  isAdmin,
  uploadImage.single("image"),
  postHeaderData
);
globalRouter.get("/header", getHeaderData);
globalRouter.put(
  "/header/:id",
  uploadImage.single("image"),
  auth,
  isAdmin,
  updateHeaderData
);
globalRouter.delete("/header/:id", auth, isAdmin, deleteHeaderData);

// @Consul Routes
globalRouter.post("/consulation", auth, isAdmin, postConsulData);
globalRouter.get("/consulation", getConsulData);
globalRouter.put("/consulation/:id", auth, isAdmin, postConsulData);
globalRouter.delete("/consulation/:id", auth, isAdmin, postConsulData);

// @Quote Routes
globalRouter.post("/quote", auth, isAdmin, postQuoteData);
globalRouter.get("/quote", getAllQuotes);
globalRouter.put("/quote/:id", auth, isAdmin, updateQuote);
globalRouter.delete("/quote/:id", auth, isAdmin, deleteQuote);

// @Contact Routes
globalRouter.post(
  "/contact",
  uploadImage.single("logo"),
  auth,
  isAdmin,
  postContactData
);
globalRouter.get("/contact", getContacts);
globalRouter.put(
  "/contact/:id",
  uploadImage.single("image"),
  auth,
  isAdmin,
  putContactData
);
globalRouter.delete("/contact/:id", auth, isAdmin, deleteContactData);

// @Faq routes
globalRouter.post("/faq", auth, isAdmin, postFaqData);
globalRouter.get("/faq", getAllFaqs);
globalRouter.put("/faq/:id", auth, isAdmin, putFaqData);
globalRouter.delete("/faq/:id", auth, isAdmin, deleteFaqData);

// @News routes
globalRouter.get("/news", getNewsData);
globalRouter.post(
  "/news",
  uploadImage.single("image"),
  auth,
  isAdmin,
  postNewsData
);
globalRouter.put(
  "/news/:id",
  uploadImage.single("image"),
  auth,
  isAdmin,
  putNewsData
);
globalRouter.delete("/news/:id", auth, isAdmin, deleteNewsData);

// @Stats routes

globalRouter.post("/stats", auth, isAdmin, postStatsData);
globalRouter.get("/stats", getStatsData);
globalRouter.put("/stats/:id", auth, isAdmin, putStatsData);
globalRouter.delete("/stats/:id", auth, isAdmin, deleteStatsData);

// @Steps routes

globalRouter.get("/steps", getStepsData);
globalRouter.post("/steps", auth, isAdmin, postStepsData);
globalRouter.put("/steps/:id", auth, isAdmin, putStepsData);
globalRouter.delete("/steps/:id", auth, isAdmin, deleteStepsData);

// @Service routes

globalRouter.get("/service", getServiceData);
globalRouter.post(
  "/service",
  uploadImage.single("image"),
  auth,
  isAdmin,
  postServiceData
);
globalRouter.put(
  "/service/:id",
  uploadImage.single("image"),
  auth,
  isAdmin,
  putServiceData
);
globalRouter.delete("/service/:id", auth, isAdmin, deleteServiceData);

export default globalRouter;
