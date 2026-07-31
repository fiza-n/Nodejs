import Blog from "../models/blog.js"

async function handleBlogCreation(req, res) {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);
        console.log("User:", req.user);

        const { title, description } = req.body;

        const coverImageUrl = req.file
            ? `/uploads/${req.file.filename}`
            : "";

        const blog = await Blog.create({
            title,
            description,
            // coverImageUrl,
            // createdBy: req.user?._id,
        });

        console.log("Saved Blog:", blog);

        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error("Blog create error:", error);
        return res.status(500).send(error.message);
    }
}

export {
    handleBlogCreation
}