import { Room, Submission, User } from "../types";

export const users = new Map<string, User>();
export const rooms = new Map<string, Room>();
export const submissions = new Map<string, Submission[]>();
export const deadUsers = new Map<string, User>();
export const currentSocketIds = new Map<string, string>();
