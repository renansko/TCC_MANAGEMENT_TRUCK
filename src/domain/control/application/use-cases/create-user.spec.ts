import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { UserCPF } from '../../enterprise/entities/value-objects/user-cpf'
import { AlreadyExistsError } from './errors/already-exist-error'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create a user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to create an user', async () => {
    const result = await sut.execute({
      cpf: UserCPF.createFromText('12345678912'),
      cep: '81900350',
      birth: '16/03/2001',
      address: 'Rua enjoa',
      password: '123456',
      email: 'user@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
    })
    if (result.isRight()) {
      expect(result.value?.user.phone).toEqual('419902324525')
      expect(result.value?.user.cpf.value).toEqual('123.456.789-12')
    }
  })
  it('not should be able create a user with a cpf that already exists', async () => {
    await sut.execute({
      cpf: UserCPF.createFromText('12345678912'),
      cep: '81900350',
      birth: '16/03/2001',
      address: 'Rua enjoa',
      password: '123456',
      email: 'user@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
    })

    const result = await sut.execute({
      cpf: UserCPF.createFromText('12345678912'),
      cep: '81900350',
      birth: '16/03/2001',
      address: 'Rua enjoa',
      password: '123456',
      email: 'user@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })

  it('not should be able create a user with a email that already exists', async () => {
    await sut.execute({
      cpf: UserCPF.createFromText('12345678912'),
      cep: '81900350',
      birth: '16/03/2001',
      address: 'Rua enjoa',
      password: '123456',
      email: 'user@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
    })

    const result = await sut.execute({
      cpf: UserCPF.createFromText('12342678912'),
      cep: '81900350',
      birth: '16/03/2001',
      address: 'Rua enjoa',
      password: '123456',
      email: 'user@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
