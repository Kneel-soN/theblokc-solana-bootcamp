import {createMetaplexInstance} from './metaplex'

async function main() {
    const metaplex = createMetaplexInstance()
    const metadataUri = 'https://arweave.net/hhXwaCJ0WDfHo7vIGoeDxt6NfMnaNjneVInjohIjRWA'
    const {nft} = await metaplex.nfts().create({
        uri: metadataUri,
        name: 'SolDevBootcamp',
        sellerFeeBasisPoints: 0,
    })

    console.log('nft', nft)
}

main()