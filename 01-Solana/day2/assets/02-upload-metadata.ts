import { createMetaplexInstance } from "./metaplex";
const metaplex = createMetaplexInstance()


const metadata = {

    name:"lessthan3",
    description:"less than 3 nft in Solana using Metaplex Token Standard",
    image:"https://arweave.net/0xJ-q0IHALbpVtu89hW81HkoFQPmb9xAvk9SWMp9LFM",
    attributes:[{
        trait_type: 'Event',
        value:'Solana Developers Bootcamp'
    }
    ]
}

async function main(){
    const {uri} =await metaplex.nfts().uploadMetadata(metadata)
    console.log('metadata uri', uri);
}
main()

// uri https://arweave.net/7IsHiIu3XfHJqtVKyNiZDblG5cHDXjxMX9KyFNS0uuU