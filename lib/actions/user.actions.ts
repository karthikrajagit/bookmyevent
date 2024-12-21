'use server';

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../models/user.model";
import Event from "../models/event.model";
import Order from "../models/order.model";
import Category from "../models/category.model";

export const createUser = async (user: CreateUserParams) => {

    try {
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error)
    }
}

export const updateUser = async (id: string, user: UpdateUserParams) => {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId: id }, user, {
            new : true
        })

        if(!updatedUser) {
            throw new Error("User not found")
        }
        return JSON.parse(JSON.stringify(updatedUser)); 
    } catch (error) {
        handleError(error)
    }
}

export const deletedUser = async(id: string) => {
    try {
        await connectToDatabase();

        const userToDelete = await User.findOneAndDelete({ clerkId: id })

        if(!userToDelete) {
            throw new Error("User not found")
        }

        await Promise.all([
            Event.updateMany(
                {_id: {$in: userToDelete.events}},
                {$pull: {attendees: userToDelete._id}}
            ),

            Order.updateMany(
                {_id: {$in: userToDelete.orders}},
                {$unset: {buyer: 1}}
            )
        ])
        const deletedUser = await User.findByIdAndDelete(userToDelete._id)

        return JSON.parse(JSON.stringify(deletedUser));
    } catch (error) {
        handleError(error)
    }
}