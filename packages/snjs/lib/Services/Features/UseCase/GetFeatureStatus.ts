import { Uuid } from '@standardnotes/domain-core'
import { AnyFeatureDescription, NativeFeatureIdentifier, FindNativeFeature } from '@standardnotes/features'
import { DecryptedItemInterface } from '@standardnotes/models'
import { Subscription } from '@standardnotes/responses'
import { FeatureStatus, ItemManagerInterface } from '@standardnotes/services'

export class GetFeatureStatusUseCase {
  constructor(_items: ItemManagerInterface) {}

  execute(_dto: {
    featureId: NativeFeatureIdentifier | Uuid
    firstPartyOnlineSubscription: Subscription | undefined
    firstPartyRoles: { online: string[] } | { offline: string[] } | undefined
    hasPaidAnyPartyOnlineOrOfflineSubscription: boolean
    inContextOfItem?: DecryptedItemInterface
  }): FeatureStatus {
    return FeatureStatus.Entitled
  }

  findNativeFeature(featureId: NativeFeatureIdentifier | Uuid): AnyFeatureDescription | undefined {
    return FindNativeFeature(featureId.value)
  }
}
