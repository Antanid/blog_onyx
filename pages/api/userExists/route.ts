import { connectMongoDB } from "@/configs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export default async function POST(req: any, res: any) {
    try {
        await connectMongoDB();
        const {email} = await req.body;
        const user = await User.findOne({ email }).select("_id");
        
        if (user) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
         
        }

    } catch (error) {
       console.log(error) 
    }
}
