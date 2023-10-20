// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module fungible_tokens::nexacoin {
    use std::option;
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct NEXACOIN has drop {}

    // initialize
    fun init(witness: NEXACOIN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<NEXACOIN>(witness, 2, b"NEXACOIN", b"NXC", b"", 
option::none(), ctx);
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx))
    }
    
    // minting gand transferof NXC coins
    public entry fun mint(
        treasury_cap: &mut TreasuryCap<NEXACOIN>, amount: u64, recipient: address, ctx: &mut TxContext
    ) {
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx)
    }
    

    // Burning NXC coins
    public entry fun burn(treasury_cap: &mut TreasuryCap<NEXACOIN>, coin: Coin<NEXACOIN>) {
        coin::burn(treasury_cap, coin);
    }

    #[test_only]
    public fun test_init(ctx: &mut TxContext) {
        init(NEXACOIN {}, ctx)
    }
}
