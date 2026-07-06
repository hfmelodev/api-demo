import { fastifyCookie } from '@fastify/cookie'
import { fastifyCors } from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { errorHandler } from './_errors'
import { env } from './env'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.setNotFoundHandler((request, reply) => {
  return reply.status(404).send({
    message: `Rota ${request.method}:${request.url} não encontrada.`,
  })
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API boilerplate NodeJs usando Fastify Demo',
      description: 'API boilerplate NodeJs usando Fastify Demo com documentação utilizando o Swagger',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: env.TOKEN_COOKIE_NAME,
    signed: false,
  },
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyCookie)

app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
})
