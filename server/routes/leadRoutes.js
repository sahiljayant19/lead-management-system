import express from "express";

import {
    addLead,
    getLeads,
    updateLeadStatus,
    deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

// Add Lead
router.post("/", addLead);

// Get All Leads
router.get("/", getLeads);

// Update Lead Status
router.put("/:id", updateLeadStatus);

// Delete Lead
router.delete("/:id", deleteLead);

export default router;