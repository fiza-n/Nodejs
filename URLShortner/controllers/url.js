import shortid from "shortid"
import URL from "../models/url.js"


async function handleGenerateNewUrls(req,res){
    const body = req.body
    if(!body.url){
        return res.status(400).json({
            status:"error",
            message:"url is required"
        })
    }
   const id = shortid.generate()
    await URL.create({
        shortId: id,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id

    })

 return res.render("home", {
    id: id
 })

}
async function handleDeleteUrlByID(req,res) {
    await URL.findByIdAndDelete(req.params.id)
    return res.json({
        message: "url deleted"
    })
}

async function handleVisitedHistoryOnUrls(req,res){
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    // res.redirect(entry.redirectUrl)
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId
    const result  = await URL.findOne({
        shortId
    })
    res.json({
        totalClicks:result.visitHistory.length,
        analytics: result.visitHistory
    })
}

export{
    handleGenerateNewUrls,
    handleDeleteUrlByID,
    handleVisitedHistoryOnUrls,
    handleGetAnalytics
}