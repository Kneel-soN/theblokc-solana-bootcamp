import { createMetaplexInstance} from "./metaplex";
import {toMetaplexFile} from '@metaplex-foundation/js'
import fs from 'fs'

const buffer = fs.readFileSync(__dirname + '/image.jpg')
const file = toMetaplexFile(buffer,"image.jpg");
const metaplex = createMetaplexInstance()

async function main(){

    const imageUrl= await metaplex.storage().upload(file)
    console.log('image Url', imageUrl);
}
main()

// image url = https://arweave.net/DJVE02MCiMCN6rdWwQTkvarSvK9IBCCksRz_PFTHl5s