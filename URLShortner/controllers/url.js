import shortid from "shortid"
import URL from "../models/url.js"
import redis from "../index.js"


async function handleGenerateNewUrls(req,res){
    const body = req.body
    if(!body.url){
        return res.status(400).json({
            status:"error",
            message:"url is required"
        })
    }
   const id = shortid.generate()
    const url = await URL.create({
        shortId: id,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id

    })
   await redis.set(id, JSON.stringify(url))

   const keys = await redis.keys("*");
console.log(keys);

const value = await redis.get(keys[0]);
console.log(value);

 return res.render("home", {
    id: id,
    url
 })
// return res.json({
//      shortId: id,
//      url
// })

}
async function handleDeleteUrlByID(req,res) {
    const deleteUrl = await URL.findByIdAndDelete(req.params.id)
    await redis.del(deleteUrl.shortId)
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

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;
    
    // Step 1: Pehle Redis check karo
    const cached = await redis.get(shortId);
    
    if (cached) {
        // Cache hit — seedha redirect, DB touch nahi hua
        const url = JSON.parse(cached);
        return res.redirect(url.redirectUrl);
    }
    
    // Step 2: Cache miss — ab DB check karo
    const url = await URL.findOne({ shortId });
    
    if (!url) {
        return res.status(404).json({ message: "url not found" });
    }
    
    // Step 3: DB se mila to Redis mein bhi daal do (agli baar fast ho)
    await redis.set(shortId, JSON.stringify(url));
    
    return res.redirect(url.redirectUrl);
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
    handleGetAnalytics,
    handleRedirect
}