import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from '@/infra/database/database.module'
describe('Fetch user per name (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[GET] /user/name', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'User teste',
    })

    const nameUser = user.name

    const response = await request(app.getHttpServer())
      .get(`/user/${nameUser}`)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      users: expect.arrayContaining([
        expect.objectContaining({
          name: 'User teste',
        }),
      ]),
    })
  })
})
