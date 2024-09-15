import { Module } from '@nestjs/common'
import { EnvModule } from '../auth/env/env.module'
import { R2Storage } from './e2-storage'
import { Uploader } from '@/domain/control/application/storage/uploader'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
