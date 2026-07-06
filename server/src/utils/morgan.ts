import morgan from "morgan";
import logger from "./logger.js";

const stream = {
  write: (message:string) => { logger.http(message.trim());},
}
const httpLogger = morgan(':method :url :status :response-time ms', {stream})

export default httpLogger;