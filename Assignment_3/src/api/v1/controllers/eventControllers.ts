import { Request, Response, NextFunction } from "express";
import * as postService from "../services/eventPostService";
import { successResponse } from "../models/responseModel";

/**
 * Handles updating a post.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await postService.updateEvent({ id: req.params.id, ...req.body });
        res.status(200).json(successResponse("", "Event updated"));
    } catch (error: unknown) {
        next(error);
    }
};

export const getPostByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const post = await postService.getPostById(id);  
        if (!post) {
            res.status(404).json({ error: "Event not found" });
            return;
        }   
        res.status(200).json(successResponse(post));
    } catch (error: unknown) {
        next(error);
    }   
};  

export const createPostHandler = async (
    req: Request,
    res: Response,  
    next: NextFunction  
): Promise<void> => {
    try {
        const newPost = await postService.createPost(req.body); 
        res.status(201).json(successResponse(newPost, "Event created"));
    } catch (error: unknown) {
        next(error);
    }
};

export const deletePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await postService.deletePost(id);
        res.status(200).json(successResponse("", "Event deleted"));
    } catch (error: unknown) {
        next(error);
    }
};

export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await postService.updateEvent({ id, ...req.body });
        res.status(200).json(successResponse("", "Event updated"));
    } catch (error: unknown) {
        next(error);
    }
};