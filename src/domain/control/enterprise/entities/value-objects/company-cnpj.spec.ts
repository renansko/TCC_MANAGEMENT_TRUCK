import { expect, test } from 'vitest'
import { CompanyCNPJ } from './company-cnpj'

test('it should be able to create a new cnpj from text', () => {
  const companyCNPJ = CompanyCNPJ.createFromText('12345678911323')

  expect(companyCNPJ.value).toEqual('12.345.678/9113-23')
})
