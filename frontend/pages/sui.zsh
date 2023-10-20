#!/bin/zsh

# Read the string input from command-line arguments
input_string=$1
echo "Received address: $input_string"


sui client call --function mint --module managed --package 0xb6b1ce17334bdf6bb97eb7c9bdba0b971d9ea4b373e1b8d2dac424fc7fbe8eb5 --args 0xc3325c3431c4b0301d8d87df4e6c83c42c9b09b4badc45dd1a27570250e716c9 \"100\" 0x10d05c3cb8c29a9299cdbd6f70001470582c9ca799a6eda61dd6598f53e2afe8 --gas-budget 10000000