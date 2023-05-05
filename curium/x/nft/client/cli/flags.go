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
)

func FlagCreateNFT() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.String(FlagName, "", "Name of the nft")
	fs.String(FlagSymbol, "", "Symbol of the nft")
	fs.String(FlagUri, "", "Uri of the nft")
	fs.String(FlagMutableUri, "", "Mutable uri of the nft")
	fs.Uint32(FlagSellerFeeBasisPoints, 0, "Seller fee basis points of the nft")
	fs.Uint64(FlagCollectionId, 0, "collection id for the nft")
	fs.String(FlagCreators, "", "Creators of nft")
	fs.String(FlagCreatorShares, "", "Shares between creators for seller fee")
	fs.Bool(FlagMutable, false, "mutability of the nft")
	fs.String(FlagUpdateAuthority, "", "update authority of the nft")
	fs.Uint64(FlagMasterEditionMaxSupply, 0, "master edition max supply")

	return fs
}

func FlagPrintEdition() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, "collection id for the nft")
	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to print")
	fs.String(FlagOwner, "", "Owner of printed edition")

	return fs
}

func FlagTransferNFT() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.String(FlagNftId, "", "Id of the nft to transfer")
	fs.String(FlagNewOwner, "", "New owner of the nft")

	return fs
}

func FlagSignMetadata() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to sign")

	return fs
}

func FlagUpdateMetadata() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to update")
	fs.String(FlagName, "", "Name of the nft")
	fs.String(FlagSymbol, "", "Symbol of the nft")
	fs.String(FlagUri, "", "Uri of the nft")
	fs.Uint32(FlagSellerFeeBasisPoints, 0, "Seller fee basis points of the nft")
	fs.String(FlagCreators, "", "Creators of nft")
	fs.String(FlagCreatorShares, "", "Shares between creators for seller fee")

	return fs
}

func FlagUpdateMetadataAuthority() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagMetadataId, 0, "Id of the metadata to sign")
	fs.String(FlagNewAuthority, "", "New update authority of the metadata")

	return fs
}

func FlagCreateCollection() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.String(FlagSymbol, "", "Symbol of the collection")
	fs.String(FlagName, "", "Name of the collection")
	fs.String(FlagUri, "", "Uri of the collection")
	fs.String(FlagMutableUri, "", "Mutable uri of the collection")
	fs.String(FlagUpdateAuthority, "", "Update authority of the collection")
	fs.Bool(FlagMutable, false, "mutability of the collection")

	return fs
}

func FlagVerifyCollection() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, "Id of the collection to verify")
	fs.String(FlagNftId, "", "Id of the nft to be verififed")

	return fs
}

func FlagUpdateCollectionAuthority() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, "Id of the collection to verify")
	fs.String(FlagNewAuthority, "", "New authority of the collection")

	return fs
}

func FlagUpdateCollectionUri() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, "Id of the collection to verify")
	fs.String(FlagUri, "", "New uri for uri of collection")

	return fs
}

func FlagUpdateCollectionMutableUri() *flag.FlagSet {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	fs.Uint64(FlagCollectionId, 0, "Id of the collection to update")
	fs.String(FlagMutableUri, "", "New uri of mutable uri of collection")

	return fs
}
