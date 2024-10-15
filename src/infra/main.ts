import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './auth/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  })
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir apenas o frontend em localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir cookies e cabeçalhos de autenticação
  })

  const envServise = app.get(EnvService)

  const port = envServise.get('PORT')

  await app.listen(port)
}

bootstrap()
