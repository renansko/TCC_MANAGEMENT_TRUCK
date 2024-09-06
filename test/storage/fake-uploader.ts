import {
  Uploader,
  UploadParams,
} from '@/domain/control/application/storage/uploader'
import { randomUUID } from 'crypto'

interface Upload {
  fileName: string
  url: string
}

export class FakerUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ fileName }: UploadParams) {
    const url = randomUUID()

    this.uploads.push({
      fileName,
      url,
    })

    return { url }
  }
}
