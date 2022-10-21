# Events

The nft module emits the following events:

## MsgCreateNFT

| Type                                      | Attribute Key | Attribute Value           |
| :---------------------------------------- | :------------ | :------------------------ |
| bluzelle.nft.v1beta1.EventMetadataCreation | creator       | {creator}                 |
| bluzelle.nft.v1beta1.EventMetadataCreation | metadata_id   | {metadataId}              |
| bluzelle.nft.v1beta1.EventNFTCreation      | creator       | {creator}                 |
| bluzelle.nft.v1beta1.EventNFTCreation      | nft_id        | {nftId}                   |
| burn                                      | burner        | {burner}                  |
| burn                                      | amount        | {amount}                  |
| coin_received                             | receiver      | {receiver}                |
| coin_received                             | amount        | {amount}                  |
| coin_spent[]                              | spender       | {spender}                 |
| coin_spent[]                              | amount        | {amount}                  |
| message                                   | action        | /bluzelle.nft.MsgCreateNFT |
| message                                   | sender        | {sender}                  |
| transfer                                  | recipient     | {recipient}               |
| transfer                                  | sender        | {sender}                  |
| transfer                                  | amount        | {amount}                  |

## MsgPrintEdition

| Type                                  | Attribute Key | Attribute Value              |
| :------------------------------------ | :------------ | :--------------------------- |
| bluzelle.nft.v1beta1.EventPrintEdition | printer       | {printer}                    |
| bluzelle.nft.v1beta1.EventPrintEdition | metadata_id   | {metadataId}                 |
| burn                                  | burner        | {burner}                     |
| burn                                  | amount        | {amount}                     |
| coin_received                         | receiver      | {receiver}                   |
| coin_received                         | amount        | {amount}                     |
| coin_spent[]                          | spender       | {spender}                    |
| coin_spent[]                          | amount        | {amount}                     |
| message                               | action        | /bluzelle.nft.MsgPrintEdition |
| message                               | sender        | {sender}                     |
| transfer                              | recipient     | {recipient}                  |
| transfer                              | sender        | {sender}                     |
| transfer                              | amount        | {amount}                     |

## MsgTransferNFT

| Type                                 | Attribute Key | Attribute Value                       |
| :----------------------------------- | :------------ | :------------------------------------ |
| bluzelle.nft.v1beta1.EventNFTTransfer | nft_id        | {nft_id}                              |
| bluzelle.nft.v1beta1.EventNFTTransfer | sender        | {sender}                              |
| bluzelle.nft.v1beta1.EventNFTTransfer | receiver      | {receiver}                            |
| message                              | action        | /bluzelle.nft.v1beta1.EventNFTTransfer |

## MsgSignMetadata

| Type                                  | Attribute Key | Attribute Value              |
| :------------------------------------ | :------------ | :--------------------------- |
| bluzelle.nft.v1beta1.EventMetadataSign | signer        | {signer}                     |
| bluzelle.nft.v1beta1.EventMetadataSign | metadata_id   | {metadata_id}                |
| message                               | action        | /bluzelle.nft.MsgSignMetadata |

## MsgUpdateMetadata

| Type                                    | Attribute Key | Attribute Value                |
| :-------------------------------------- | :------------ | :----------------------------- |
| bluzelle.nft.v1beta1.EventMetadataUpdate | updater       | {updater}                      |
| bluzelle.nft.v1beta1.EventMetadataUpdate | metadata_id   | {metadata_id}                  |
| message                                 | action        | /bluzelle.nft.MsgUpdateMetadata |

## MsgUpdateMetadataAuthority

| Type                                             | Attribute Key | Attribute Value                         |
| :----------------------------------------------- | :------------ | :-------------------------------------- |
| bluzelle.nft.v1beta1.EventMetadataAuthorityUpdate | metadata_id   | {metadata_id}                           |
| bluzelle.nft.v1beta1.EventMetadataAuthorityUpdate | new_authority | {new_authority}                         |
| message                                          | action        | /bluzelle.nft.MsgUpdateMetadataAuthority |

## MsgUpdateMintAuthority

| Type                                         | Attribute Key | Attribute Value                     |
| :------------------------------------------- | :------------ | :---------------------------------- |
| bluzelle.nft.v1beta1.EventMintAuthorityUpdate | metadata_id   | {metadata_id}                       |
| bluzelle.nft.v1beta1.EventMintAuthorityUpdate | new_authority | {new_authority}                     |
| message                                      | action        | /bluzelle.nft.MsgUpdateMintAuthority |

## MsgCreateCollection

| Type                                        | Attribute Key | Attribute Value                  |
| :------------------------------------------ | :------------ | :------------------------------- |
| bluzelle.nft.v1beta1.EventCollectionCreation | creator       | {creator}                        |
| bluzelle.nft.v1beta1.EventCollectionCreation | collection_id | {collection_id}                  |
| message                                     | action        | /bluzelle.nft.MsgCreateCollection |

## MsgVerifyCollection

| Type                                            | Attribute Key | Attribute Value                  |
| :---------------------------------------------- | :------------ | :------------------------------- |
| bluzelle.nft.v1beta1.EventCollectionVerification | verifier      | {verifier}                       |
| bluzelle.nft.v1beta1.EventCollectionVerification | collection_id | {collection_id}                  |
| bluzelle.nft.v1beta1.EventCollectionVerification | nft_id        | {nft_id}                         |
| message                                         | action        | /bluzelle.nft.MsgVerifyCollection |

## MsgUnverifyCollection

| Type                                              | Attribute Key | Attribute Value                    |
| :------------------------------------------------ | :------------ | :--------------------------------- |
| bluzelle.nft.v1beta1.EventCollectionUnverification | verifier      | {verifier}                         |
| bluzelle.nft.v1beta1.EventCollectionUnverification | collection_id | {collection_id}                    |
| bluzelle.nft.v1beta1.EventCollectionUnverification | nft_id        | {nft_id}                           |
| message                                           | action        | /bluzelle.nft.MsgUnverifyCollection |

## MsgUpdateCollectionAuthority

| Type                                               | Attribute Key | Attribute Value                           |
| :------------------------------------------------- | :------------ | :---------------------------------------- |
| bluzelle.nft.v1beta1.EventUpdateCollectionAuthority | collection_id | {collection_id}                           |
| bluzelle.nft.v1beta1.EventUpdateCollectionAuthority | new_authority | {new_authority}                           |
| message                                            | action        | /bluzelle.nft.MsgUpdateCollectionAuthority |
