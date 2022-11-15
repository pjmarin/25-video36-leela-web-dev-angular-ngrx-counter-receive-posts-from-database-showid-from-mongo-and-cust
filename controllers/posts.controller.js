import { Post } from "../models/Post.js";

export const getPosts = async (req, res) => {
	try {			
		const posts = await Post.find({});
		return res.status(200).json(posts);
	} catch(err) {
		return res
			.status(401)
			.send({ error: err.message });
	}
};

export const addPost = async (req, res) => {
	try {
		const { title, description } = req.body;	
		const newPost = new Post({ title, description });
		
		await newPost.save();
		return res.status(200).json(newPost);
	} catch(err) {
		return res
			.status(401)
			.send({ error: err.message });
	}
};