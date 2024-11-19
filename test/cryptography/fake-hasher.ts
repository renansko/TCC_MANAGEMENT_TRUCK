import { HasherCompare } from '@/domain/control/application/cryptography/hash-compare'
import { HasherGenerator } from '@/domain/control/application/cryptography/hashed-generator'

export class FakeHasher implements HasherGenerator, HasherCompare {
  async compare(plain: string, hash: string) {
    return plain.concat('-hashed') === hash
  }

  async hash(plain: string) {
    return plain.concat('-hashed')
  }
}
