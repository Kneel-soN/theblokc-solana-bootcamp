import { createMetaplexInstance } from "./metaplex";
const metaplex = createMetaplexInstance()


const metadata = {

    name:"lessthan3 viper",
    description:"less than 3 nft viper in Solana using Metaplex Token Standard",
    image:"https://arweave.net/DJVE02MCiMCN6rdWwQTkvarSvK9IBCCksRz_PFTHl5s",
    attributes:[{
        trait_type: 'Event',
        value:'Solana Developers Bootcamp',
            },
            {
        trait_type: 'Date',
        value:'1688817600',
             }

    
    ]
}

async function main(){
    const {uri} =await metaplex.nfts().uploadMetadata(metadata)
    console.log('metadata uri', uri);
}
main()

// uri https://arweave.net/U77Qs5TauxcRHzU8kGFqT1B1lrPQaqCDEYaQOlaLSTw