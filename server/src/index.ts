import { AppDataSource } from "./config/db.js";
import { PORT } from "./config/env.js";
async function bootstrap(){

  await AppDataSource.initialize()

  const { app } = await import('./app.js')

  app.listen(PORT,()=>{
    console.log('Server running on PORT:',PORT)
  })
}
bootstrap()