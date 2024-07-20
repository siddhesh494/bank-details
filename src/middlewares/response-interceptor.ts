import { mung } from "../utils/require-helpers";
import { sendTelegramMessage } from "../utils/response-helpers";


module.exports = mung.json(
  function transform(body: any, req: any, res: any) {

    if(req.body.password) delete req.body.password

    if(body.status !== 200) sendTelegramMessage(body, req)
  }, 
  {
    mungError: true
  }
)