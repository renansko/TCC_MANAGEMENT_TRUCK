import { UserAttachment } from '../../enterprise/entities/user-attachment'

export abstract class UserAttachmentRepository {
  abstract createMany(attachments: UserAttachment[]): Promise<void>
  abstract deleteMany(attachments: UserAttachment[]): Promise<void>
  abstract findManyByUserId(userId: string): Promise<UserAttachment[]>
  abstract deleteManyByUserId(userId: string): Promise<void>
}
