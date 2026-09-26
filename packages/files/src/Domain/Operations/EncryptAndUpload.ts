import { FileUploadProgress } from '../Types/FileUploadProgress'
import { FileUploadResult } from '../Types/FileUploadResult'
import { PureCryptoInterface } from '@standardnotes/sncrypto-common'
import { FileEncryptor } from '../UseCase/FileEncryptor'
import { FileContent, VaultListingInterface } from '@standardnotes/models'
import { FilesApiInterface } from '../Api/FilesApiInterface'

export class EncryptAndUploadFileOperation {
  public readonly encryptedChunkSizes: number[] = []

  private readonly encryptor: FileEncryptor
  private readonly encryptionHeader: string

  private totalBytesPushedInDecryptedTerms = 0
  private totalBytesUploadedInDecryptedTerms = 0
  private aggregateEncryptedBytes = new Uint8Array()

  public getAggregateEncryptedBytes(): Uint8Array {
    return this.aggregateEncryptedBytes
  }

  constructor(
    private file: {
      decryptedSize: FileContent['decryptedSize']
      key: FileContent['key']
      remoteIdentifier: FileContent['remoteIdentifier']
    },
    private valetToken: string,
    private crypto: PureCryptoInterface,
    _api: FilesApiInterface,
    public readonly vault?: VaultListingInterface,
  ) {
    this.encryptor = new FileEncryptor(file, this.crypto)

    this.encryptionHeader = this.encryptor.initializeHeader()
  }

  public getValetToken(): string {
    return this.valetToken
  }

  public getProgress(): FileUploadProgress {
    const reportedDecryptedSize = this.file.decryptedSize

    return {
      decryptedFileSize: reportedDecryptedSize,
      decryptedBytesUploaded: this.totalBytesUploadedInDecryptedTerms,
      decryptedBytesRemaining: reportedDecryptedSize - this.totalBytesUploadedInDecryptedTerms,
      percentComplete: (this.totalBytesUploadedInDecryptedTerms / reportedDecryptedSize) * 100.0,
    }
  }

  public getResult(): FileUploadResult {
    return {
      encryptionHeader: this.encryptionHeader,
      finalDecryptedSize: this.totalBytesPushedInDecryptedTerms,
      key: this.file.key,
      remoteIdentifier: this.file.remoteIdentifier,
    }
  }

  public async pushBytes(decryptedBytes: Uint8Array, _chunkId: number, isFinalChunk: boolean): Promise<boolean> {
    this.totalBytesPushedInDecryptedTerms += decryptedBytes.byteLength

    const encryptedBytes = this.encryptBytes(decryptedBytes, isFinalChunk)

    this.encryptedChunkSizes.push(encryptedBytes.length)

    const combined = new Uint8Array(this.aggregateEncryptedBytes.length + encryptedBytes.length)
    combined.set(this.aggregateEncryptedBytes, 0)
    combined.set(encryptedBytes, this.aggregateEncryptedBytes.length)
    this.aggregateEncryptedBytes = combined

    this.totalBytesUploadedInDecryptedTerms += decryptedBytes.byteLength

    return true
  }

  private encryptBytes(decryptedBytes: Uint8Array, isFinalChunk: boolean): Uint8Array {
    const encryptedBytes = this.encryptor.pushBytes(decryptedBytes, isFinalChunk)

    return encryptedBytes
  }
}
