import { getDB } from "@/UTILS/api-routes";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    
    try {
       const {phone , password} = await request.json();
       const db = await getDB();
       
       const user = await db.collection("users").findOne({phone});

       if(!user){
        return NextResponse.json(
            {message:"Пользователь не найден"},
            {status:401}
        );
       }

       const dcrypt = await import("bcryptjs");
       const isPasswordValid = await bcrypt.compare(password, user.password);

       if(!isPasswordValid){
        return NextResponse.json(
            {message:"Неверный пароль"},
            {status:401}
        );
       }

       const responseData = {
        success:true,
        user:{
            _id:user.id,
            phone:user.phone,
            surname:user.surname,
            name:user.name,
            email:user.email,
        }
       };

       return NextResponse.json(responseData)
    } catch (error) {
         console.error("Ошибка авторизации:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}