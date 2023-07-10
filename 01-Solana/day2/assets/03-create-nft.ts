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

/// result
// nft {
 //   model: 'nft',
 //   updateAuthorityAddress: PublicKey [PublicKey(9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK)] {
 //     _bn: <BN: 7f94296b6f179cc5ede878db295310cea15f0f42aacb0de5b602068c14afc5c4>
//    },
//  json: {
//  name: 'lessthan3 viper',
//      description: 'less than 3 nft viper in Solana using Metaplex Token Standard',
//      image: 'https://arweave.net/DJVE02MCiMCN6rdWwQTkvarSvK9IBCCksRz_PFTHl5s',
//      attributes: [ [Object], [Object] ]
//    },
 //   jsonLoaded: true,
//    name: 'SolDevBootcamp',
//  symbol: '',
 //   uri: 'https://arweave.net/U77Qs5TauxcRHzU8kGFqT1B1lrPQaqCDEYaQOlaLSTw',
 //   isMutable: true,
 //   primarySaleHappened: false,
 //   sellerFeeBasisPoints: 0,
 //   editionNonce: 254,
 //   creators: [
 //     {
 //       address: [PublicKey [PublicKey(9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK)]],
  //      verified: true,
  //      share: 100
//      }
 //   ],
  //  tokenStandard: 0,
//  collection: null,
 //   collectionDetails: null,
 //   uses: null,
 //   programmableConfig: null,
//  address: PublicKey [PublicKey(C99hjXptvbhWLWQbxjg82JyGsVFG7JdUYdQ69PDzG2MY)] {
 //     _bn: <BN: a5870ad994e96d99a092c383ab2a8224fe5ed16fee6c0fec249249ee1d48d6b3>
//  },
//    metadataAddress: Pda [PublicKey(796Vd51Bae1YxoRJwk4tsj19HvhXqhYT5vECRa5bLEMd)] {
//      _bn: <BN: 5b38fac26bba4988b1ed6d8e33804f2a6edc5f9904be93c60017f898565eae58>,
//      bump: 251
 //   },
  //  mint: {
//     model: 'mint',
 //     address: PublicKey [PublicKey(C99hjXptvbhWLWQbxjg82JyGsVFG7JdUYdQ69PDzG2MY)] {
//        _bn: <BN: a5870ad994e96d99a092c383ab2a8224fe5ed16fee6c0fec249249ee1d48d6b3>
 //     },
//      mintAuthorityAddress: PublicKey [PublicKey(CnVHpRydxrsHpvtcf11FfeJsLj6BRbvj5S8HcPTWmCua)] {
 //       _bn: <BN: af17ae1ef2fe7610c61bc7078fc4aa75cd39733c32e7bba54a6d7bb4dbb98b65>
//  },
 //     freezeAuthorityAddress: PublicKey [PublicKey(CnVHpRydxrsHpvtcf11FfeJsLj6BRbvj5S8HcPTWmCua)] {
 //       _bn: <BN: af17ae1ef2fe7610c61bc7078fc4aa75cd39733c32e7bba54a6d7bb4dbb98b65>
 //     },
 //     decimals: 0,
 //     supply: { basisPoints: <BN: 1>, currency: [Object] },
 //     isWrappedSol: false,
//      currency: { symbol: 'Token', decimals: 0, namespace: 'spl-token' }
 //   },
 //   token: {
 //     model: 'token',
 //     address: Pda [PublicKey(GaUninj6FgfW4Wx9XyvrLzC2mutPidRzBxCtKUt1H2hr)] {
//  _bn: <BN: e772e4128bb717220d6477261ac47b920f60ed09bd5c28cf4eb06c46c8619a85>,
  //      bump: 255
 //     },
 //     isAssociatedToken: true,
//      mintAddress: PublicKey [PublicKey(C99hjXptvbhWLWQbxjg82JyGsVFG7JdUYdQ69PDzG2MY)] {
 //       _bn: <BN: a5870ad994e96d99a092c383ab2a8224fe5ed16fee6c0fec249249ee1d48d6b3>
 //     },
 //     ownerAddress: PublicKey [PublicKey(9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK)] {
 //       _bn: <BN: 7f94296b6f179cc5ede878db295310cea15f0f42aacb0de5b602068c14afc5c4>
 //     },
 //     amount: { basisPoints: <BN: 1>, currency: [Object] },
 //     closeAuthorityAddress: null,
 //     delegateAddress: null,
 //     delegateAmount: { basisPoints: <BN: 0>, currency: [Object] },
 //     state: 1
//    },
 //   edition: {
  //    model: 'nftEdition',
//  isOriginal: true,
 //     address: Pda [PublicKey(CnVHpRydxrsHpvtcf11FfeJsLj6BRbvj5S8HcPTWmCua)] {
//        _bn: <BN: af17ae1ef2fe7610c61bc7078fc4aa75cd39733c32e7bba54a6d7bb4dbb98b65>,
//        bump: 254
 //     },
  //    supply: <BN: 0>,
 //     maxSupply: <BN: 0>
//    }
//  }
//