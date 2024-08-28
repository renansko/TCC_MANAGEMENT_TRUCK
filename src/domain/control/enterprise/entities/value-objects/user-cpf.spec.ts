import { expect, test } from 'vitest'
import { UserCPF } from './UserCPF'

test('it should be able to create a new usercpf from text', () => {
  const userCpf = UserCPF.createFromText('12345678911')

  expect(userCpf.value).toEqual('123.456.789-11')
})
