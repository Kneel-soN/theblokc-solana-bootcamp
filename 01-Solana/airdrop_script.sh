#!/bin/bash

address="9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK"

while true; do
    echo "------------------------------------"
    echo "Address: $address"
    solana airdrop -u devnet 1 "$address"
    echo "Airdrop completed at $(date)"
    echo "------------------------------------"
    sleep 300 # Sleep for 5 minutes (300 seconds)
done
