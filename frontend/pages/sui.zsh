#!/bin/zsh

# Read the string input from command-line arguments
input_string=$1
echo "Received address: $input_string"


sui client call --function mint --module nexacoin --package 0x1b0db71ce1efb4bfbd9ef9427ce159c6d48e0c076ebd0ea9d2dd8f301dabba61 --args 0x7d679eab8a1b2f12bf19378742319588782a9ff127fadaea9065e77c49f122df \"100\" 0x10d05c3cb8c29a9299cdbd6f70001470582c9ca799a6eda61dd6598f53e2afe8 --gas-budget 10000000