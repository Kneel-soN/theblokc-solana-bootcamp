import {createMetaplexInstance} from './metaplex'

async function main() {
    const metaplex = createMetaplexInstance()
    const metadataUri = 'https://arweave.net/U77Qs5TauxcRHzU8kGFqT1B1lrPQaqCDEYaQOlaLSTw'
    const {nft} = await metaplex.nfts().create({
        uri: metadataUri,
        name: 'SolDevBootcamp',
        sellerFeeBasisPoints: 0,
    })

    console.log('nft', nft)
}

main()