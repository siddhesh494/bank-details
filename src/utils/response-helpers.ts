import { ResponseOutput, ResponseParams } from "../interface/common";
import { env, httpContext } from "./require-helpers";
import { Request } from 'express'


function response(data: ResponseParams): ResponseOutput {
  
  const returnObj: ResponseOutput = {
    ...data.messageCode,
  }
  if(data.message) returnObj.message = data.message
  if(data.data) returnObj.data = data.data
  return returnObj
}


async function sendTelegramMessage(data: any, req: Request) {
  try {
    const channel = process.env.CHANNEL_ID
    const token = process.env.TELEGRAM_BOT

    const request = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${createHTML(data, req)}&parse_mode=html`, {
      method: "GET",
      redirect: 'follow'
    })
    const response = await request.json();
    // console.log(response)
  } catch (error) {
    console.log(error)
  }
}

function createHTML(data: any, req: Request) {
  return (
    `
    <strong>[${env}]</strong> <strong>[${data.statusCode}: ${data.message}]</strong>
      <blockquote>
        API: ${req.originalUrl}
      </blockquote>
      <blockquote>
        ApiHash: ${req.headers.apiHash}
      </blockquote>
      <blockquote>
        Payload: ${JSON.stringify(req.body)}
      </blockquote>
    `
  )
}


export {
  response,
  sendTelegramMessage
}