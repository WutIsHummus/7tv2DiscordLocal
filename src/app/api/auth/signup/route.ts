import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch'; // Ensure 'node-fetch' is installed if using Node 18+
import { base64ArrayBuffer } from '@src/utils/helpers/arrayBufferToBase64';
import { v4 as uuid } from "uuid"
const { FUSION_KEY, FUSION_CLIENT_ID, FUSION_URL } = process.env
export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const username = data.signupState.username;
        const email = data.signupState["email-address"];
        const first_name = data.signupState["first-name"];
        const last_name = data.signupState["last-name"];
        const password = data.signupState.password;
        console.log(data)
        const userID = uuid()
        const userReq = {
            registration: {
                applicationId: FUSION_CLIENT_ID,
                data: {},
                id: userID,
                roles: ["User"],
                username: username,
                usernameStatus: 'ACTIVE',
            },
            sendSetPasswordEmail: false,
            skipVerification: false,
            user: {
                id: userID,
                email: email,
                first_name: first_name,
                last_name: last_name
            }
        }
        /*
        let res = await fetch("https://sandbox.fusionauth.io/api/user",{
            headers: env.
        });
        if (res.ok) {
            const arrayBuffer = await res.arrayBuffer(); 
            emote.base64 = `data:image/${type};base64,` + base64ArrayBuffer(arrayBuffer)
        } else {
            console.log(`Failed to fetch ${url}: ${res.statusText}`);
        }
        */
        return NextResponse.json({ message: 'POST request successful', data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
