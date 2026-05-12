import pool from "../config/db.js";

export const addLead = async (req, res) => {
    try {
        const { name, phone, source } = req.body;

        // Validation
        if (!name?.trim() || !phone?.trim() || !source?.trim()) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Phone validation
        if (phone.trim().length < 10) {
            return res.status(400).json({
                message: "Invalid phone number",
            });
        }

        const newLead = await pool.query(
            `INSERT INTO leads (name, phone, source)
       VALUES ($1, $2, $3)
       RETURNING *`,
            [name.trim(), phone.trim(), source.trim()]
        );

        res.status(201).json({
            message: "Lead added successfully",
            lead: newLead.rows[0],
        });

    } catch (error) {
        console.error("Add Lead Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getLeads = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM leads ORDER BY created_at DESC"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("Get Leads Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = [
            "Interested",
            "Not Interested",
            "Converted",
        ];

        // Status validation
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
            });
        }

        const result = await pool.query(
            `UPDATE leads
       SET status = $1
       WHERE id = $2
       RETURNING *`,
            [status, id]
        );

        // Lead not found
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json({
            message: "Lead status updated successfully",
            lead: result.rows[0],
        });

    } catch (error) {
        console.error("Update Lead Status Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM leads
       WHERE id = $1
       RETURNING *`,
            [id]
        );

        // Lead not found
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json({
            message: "Lead deleted successfully",
            deletedLead: result.rows[0],
        });

    } catch (error) {
        console.error("Delete Lead Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};