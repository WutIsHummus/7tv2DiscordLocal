import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch'; // Ensure 'node-fetch' is installed if using Node 18+
import { base64ArrayBuffer } from '@src/utils/helpers/arrayBufferToBase64';
import { error } from 'console';
import postData from '@src/utils/helpers/postData';
import { headers } from 'next/headers';


const { BOT_TOKEN } = process.env

async function fetchAndCheckImage(url: string, type: string) {
    const fileExtension = type === 'png' ? 'png' : 'gif'; // Determine the file extension based on the type variable
    for (let scale of ['4x', '3x', '2x', '1x']) {
        let scaledUrl = url.replace(/4x\.(gif|png)$/, `${scale}.${fileExtension}`); // Replace with dynamic file extension
        let response = await fetch(scaledUrl);
        if (response.ok) {
            const contentLength = response.headers.get('content-length');
            if (contentLength && Number(contentLength) <= 225280) {
                const arrayBuffer = await response.arrayBuffer();
                return {
                    base64: `data:image/${fileExtension};base64,${base64ArrayBuffer(arrayBuffer)}`,
                    url: scaledUrl
                };
            }
            console.log("Exceeds")
        } else {
            console.error(`Failed to fetch ${scaledUrl}: ${response.statusText}`);
        }
    }
    throw new Error('No suitable image found within size limits.');
}


export async function POST(req: NextRequest) {
    try {

        // Initialize Request Data
        const reqData = await req.json();
        console.log(req)
        const { url, type, name } = reqData.emote;
        const { base64 } = await fetchAndCheckImage(url, type);


        // Set up payload
        const DiscordApi = `https://discord.com/api/v10/guilds/1041002194406739979/emojis`;
        // Post Emote data to discord
        const response = await postData(DiscordApi, {
            "name": name,
            "image": base64,
            "roles": []
        }, {
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bot ${BOT_TOKEN}`
            }
        });

        if (response.isError) {
            console.error(response.errors);
            if (response.errors.code === 50138) {
                console.log('Handling resize error - Trying alternative method');
                const newReq = req

            }
            throw new Error(`API error: ${response.errors.message}`);
        }



        return NextResponse.json({ message: 'POST request successful' }, { status: 200 });
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage, }, { status: 500 });
    }
}
