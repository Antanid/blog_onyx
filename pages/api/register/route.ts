import { connectMongoDB } from "@/configs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export default async function POST(req: any) {
    try{
const {name, email, password, role} = await req.body;
const hashedPassword = await bcrypt.hash(password, 10);
await connectMongoDB();
await User.create({
    name, email, password: hashedPassword, role
})
return NextResponse.json({message: "User register."}, {status: 201});
    } catch(error){
return NextResponse.json({message: 'An error'}, {status: 500})
    }
}
export const config = {
    api: {
      runtime: 'edge', // Используйте среду выполнения "edge"
    },
  };