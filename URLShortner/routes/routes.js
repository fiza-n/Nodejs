import express from "express"
import {handleGenerateNewUrls, handleDeleteUrlByID, handleVisitedHistoryOnUrls,handleGetAnalytics} from "../controllers/url.js"
const router = express.Router()

router.post("/",handleGenerateNewUrls)
router.delete("/:id", handleDeleteUrlByID)
router.get("/:shortId", handleVisitedHistoryOnUrls)
router.get("/analytics/:shortId", handleGetAnalytics)

export default router;