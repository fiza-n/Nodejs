import Blog from "../models/blog.js"
import Comment from "../models/comment.js"

async function handleBlogCreation(req, res) {
    try {
      
        const { title, description } = req.body;

        const coverImageUrl = req.file
            ? `/uploads/${req.file.filename}`
            : "";

        const blog = await Blog.create({
            title,
            description,
            coverImageUrl,
            createdBy: req.user?._id,
        });


        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error("Blog create error:", error);
        return res.status(500).send(error.message);
    }
}

async function handleGetBlogById(req,res){
   const blogs =  await Blog.findById(req.params.id).populate("createdBy", "fullname profileImageUrl")
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy", "fullname profileImageUrl")
   
  return res.render("blogDetails", {
    user: req.user,
    blogs,
    comments
  })
}

async function handleBlogComments(req,res){
 await Comment.create({
        comment: req.body.comment,
        blogId: req.params.blogId,
        createdBy: req.user?._id
    })

    return res.redirect(`/blog/${req.params.blogId}`)
}

export {
    handleBlogCreation,
    handleGetBlogById,
    handleBlogComments
}