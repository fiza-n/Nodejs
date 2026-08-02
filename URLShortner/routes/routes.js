import express from "express"
import {handleGenerateNewUrls, handleDeleteUrlByID, handleVisitedHistoryOnUrls,handleGetAnalytics,handleRedirect} from "../controllers/url.js"
const router = express.Router()

router.post("/",handleGenerateNewUrls)
router.delete("/:id", handleDeleteUrlByID)
router.get("/:shortId", handleVisitedHistoryOnUrls)
router.get("/analytics/:shortId", handleGetAnalytics)
router.get("/redirect/:shortId", handleRedirect)


export default router;