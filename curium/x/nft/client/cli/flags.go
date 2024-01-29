package cli

import (
	flag "github.com/spf13/pflag"
)

const (
	FlagName                   = "name"
	FlagSymbol                 = "symbol"
	FlagUri                    = "uri"
	FlagMutableUri             = "mutable-uri"
	FlagSellerFeeBasisPoints   = "seller-fee-basis-points"
	FlagCreators               = "creators"
	FlagCreatorShares          = "creator-shares"
	FlagMutable                = "mutable"
	FlagUpdateAuthority        = "update-authority"
	FlagMasterEditionMaxSupply = "master-edition-max-supply"
	FlagNftId                  = "nft-id"
	FlagNewOwner               = "new-owner"
	FlagMetadataId             = "metadata-id"
	FlagNewAuthority           = "new-authority"
	FlagCollectionId           = "collection-id"
	FlagOwner                  = "owner"
	FlagNftIds								 = "nft-ids"
	FlagReceivers							 = "receivers" 
)

func FlagCreateNFT() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.String(FlagName, "", `Name of the nft (default: "")`)
	fs.String(FlagSymbol, "", `Symbol of the nft (default: "")`)
	fs.String(FlagUri, "", `Uri of the nft (default: "")`)
	fs.String(FlagMutableUri, "", "Mutable uri of the nft")
	fs.Uint32(FlagSellerFeeBasisPoints, 0, `Seller fee basis points of the nft (default: 0)`)
	fs.Uint64(FlagCollectionId, 0, `collection id for the nft (default: 0)`)
	fs.String(FlagCreators, "", `Creators of nft (default: "")`)
	fs.String(FlagCreatorShares, "", `Shares between creators for seller fee (default: "")`)
	fs.Bool(FlagMutable, false, `mutability of the nft (default: false)`)
	fs.String(FlagUpdateAuthority, "", `update authority of the nft (default: "")`)
	fs.Uint64(FlagMasterEditionMaxSupply, 0, "master edition max supply (default: 0)")

	return fs
}

func FlagPrintEdition() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, "collection id for the nft (default: 0)")
	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to print (default: 0)")
	fs.String(FlagOwner, "", `Owner of printed edition (default: "")`)

	return fs
}

func FlagTransferNFT() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.String(FlagNftId, "", `Id of the nft to transfer (default: "")`)
	fs.String(FlagNewOwner, "", `New owner of the nft (default: "")`)

	return fs
}

func FlagSignMetadata() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to sign (defalut: 0)")

	return fs
}

func FlagUpdateMetadata() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to update (default: 0)")
	fs.String(FlagName, "", `Name of the nft (default: "")`)
	fs.String(FlagSymbol, "", `Symbol of the nft (default: "")`)
	fs.String(FlagUri, "", `Uri of the nft (default: "")`)
	fs.Uint32(FlagSellerFeeBasisPoints, 0, `Seller fee basis points of the nft default: ""`)
	fs.String(FlagCreators, "", `Creators of nft (default: "")`)
	fs.String(FlagCreatorShares, "", `Shares between creators for seller fee (default: "")`)

	return fs
}

func FlagUpdateMetadataAuthority() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to sign (default: 0)")
	fs.String(FlagNewAuthority, "", `New update authority of the metadata (default: "")`)

	return fs
}

func FlagCreateCollection() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.String(FlagSymbol, "", `Symbol of the collection (default: "")`)
	fs.String(FlagName, "", `Name of the collection (default: "")`)
	fs.String(FlagUri, "", `Uri of the collection (default: "")`)
	fs.String(FlagMutableUri, "", `Mutable uri of the collection (default: "")`)
	fs.String(FlagUpdateAuthority, "", `Update authority of the collection (default: "")`)
	fs.Bool(FlagMutable, false, "mutability of the collection (default: false)")

	return fs
}

func FlagVerifyCollection() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, `Id of the collection to verify (default: 0)`)
	fs.String(FlagNftId, "", `Id of the nft to be verififed (default: "")`)

	return fs
}

func FlagUpdateCollectionAuthority() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, `Id of the collection to verify (default: 0)`)
	fs.String(FlagNewAuthority, "", `New authority of the collection (default: "")`)

	return fs
}

func FlagUpdateCollectionUri() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, `Id of the collection to verify (default: 0)`)
	fs.String(FlagUri, "", `New uri for uri of collection (default: "")`)

	return fs
}

func FlagUpdateCollectionMutableUri() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, `Id of the collection to update (default: 0)`)
	fs.String(FlagMutableUri, "", `New uri of mutable uri of collection (default: "")`)

	return fs
}

func FlagMultiSendNFT() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.String(FlagNftIds, "", `Ids of the nfts to send`)
	fs.String(FlagReceivers, "", `The addresses of the receivers "")`)

	return fs
}

