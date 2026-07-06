import type { FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { BadRequestError } from './bad-request'
import { NotFoundError } from './not-found'
import { UnauthorizedError } from './unauthorized'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Erro na validação, verifique os dados enviados.',
      errors: error.validation.map(issue => ({
        // Remove o / do inicio da string
        field: issue.instancePath.replace(/^\//, ''),
        message: issue.message,
      })),
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  // Arquivo enviado excede o limite definido no @fastify/multipart
  if ((error as { code?: string }).code === 'FST_REQ_FILE_TOO_LARGE') {
    return reply.status(413).send({
      message: 'Arquivo muito grande. O tamanho máximo permitido é 5MB.',
    })
  }

  //TODO: Enviar erro para alguma plataforma de observabilidade
  console.error(error)

  return reply.status(500).send({
    message: 'Erro interno do servidor. Tente novamente mais tarde.',
  })
}
