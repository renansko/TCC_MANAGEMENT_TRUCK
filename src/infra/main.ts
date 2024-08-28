import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './auth/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  })

  const envServise = app.get(EnvService)

  const port = envServise.get('PORT')

  await app.listen(port)
}

bootstrap()
