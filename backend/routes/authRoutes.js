import { Router } from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded or invalid file type" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
} )

export default router;