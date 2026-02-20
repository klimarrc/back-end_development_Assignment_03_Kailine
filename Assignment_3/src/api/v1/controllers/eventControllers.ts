import { Request, Response, NextFunction } from "express";
import * as postService from "../services/eventPostService";
import { successResponse } from "../models/responseModel";
import { EventPost } from "../models/eventPostModel";
import { HTTP_STATUS } from "src/constants/httpConstants";

// Create post handler - validates body only
export const createPostHandler = async (
    req: Request,
    res: Response,  
    next: NextFunction  
): Promise<void> => {
    try {
        const newPostData = req.body as EventPost;
        const newPost = await postService.createEventPost({
            id: newPostData.id,
            name: newPostData.name,
            capacity: newPostData.capacity ?? 0,
            registrationCount: newPostData.registrationCount ?? 0,
            date: newPostData.date,
            status: newPostData.status,
            category: newPostData.category
        });
        res.status(HTTP_STATUS.CREATED).json(successResponse(newPost, "Event created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

export const getAllPostsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const posts: EventPost[] = await postService.getAllEventPosts();
        res.status(HTTP_STATUS.OK).json(successResponse(posts));
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
        const {id} = req.params;
        const post = await postService.getPostById(id as string);
        res.status(HTTP_STATUS.OK).json(successResponse({post}, "Event retrieved successfully"));
    } catch (error: unknown) {
        next(error);    
    }
};

export const updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params;
        const updatedData = req.body as Partial<EventPost>;
        const updatedPost = await postService.updatePostEvent({ 
            id: id as string,
            name: updatedData.name ?? "",
            capacity: updatedData.capacity ?? 0,
            registrationCount: updatedData.registrationCount ?? 0,
            date: updatedData.date ?? new Date(),   
            status: updatedData.status!,
            category: updatedData.category!
        });
        if (updatedPost) {
            res.status(HTTP_STATUS.OK).json(successResponse(updatedPost, "Event updated successfully"));
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json(successResponse(null, "Event not found"));
        }
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
        const {id} = req.params;
        await postService.deletePostEvent(id as string);
        res.status(HTTP_STATUS.OK).json(successResponse(null, "Event deleted successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

