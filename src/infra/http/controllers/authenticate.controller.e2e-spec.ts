import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { UserFactory } from 'test/factories/make-user'

describe('Authenticate account (E2E)', () => {
  let app: INestApplication
  let clientFractory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    clientFractory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await clientFractory.makePrismaUser({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
