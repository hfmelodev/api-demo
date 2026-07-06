import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.API_PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`
      🚀 \x1b[32m> Server started successfully!
      📡 \x1b[33m> Waiting for connections on port ${env.API_PORT}`)
  })
