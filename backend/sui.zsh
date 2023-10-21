#!/bin/zsh

input_string=$1
echo "Received address: $input_string"
export PACKAGE_ID=0x1b0db71ce1efb4bfbd9ef9427ce159c6d48e0c076ebd0ea9d2dd8f301dabba61
export TREASURYCAP_ID=0x7d679eab8a1b2f12bf19378742319588782a9ff127fadaea9065e77c49f122df

sui client call --function mint --module nexacoin --package $PACKAGE_ID --args $TREASURYCAP_ID \"100\" "$input_string" --gas-budget 10000000