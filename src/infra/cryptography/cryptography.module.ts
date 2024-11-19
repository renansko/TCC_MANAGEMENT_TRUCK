import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { Encrypter } from '@/domain/control/application/cryptography/encrypter'
import { HasherCompare } from '@/domain/control/application/cryptography/hash-compare'
import { HasherGenerator } from '@/domain/control/application/cryptography/hashed-generator'
import { jwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: Encrypter, useClass: jwtEncrypter },
    { provide: HasherCompare, useClass: BcryptHasher },
    { provide: HasherGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HasherCompare, HasherGenerator],
})
export class CryptographyModule {}
