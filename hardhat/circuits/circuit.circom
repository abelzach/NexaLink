pragma circom 2.0.3;

include "../node_modules/circomlib/circuits/poseidon.circom";

template HashVerifier() {
    signal input addresses[2];
    signal input chainIds[2];
    signal input tokenContract;
    signal input tokenId;
    signal input gameHash;

    signal output computedHash;

    component hash = Poseidon(6);

    hash.inputs[0] <== tokenContract;
    hash.inputs[1] <== tokenId;
    hash.inputs[2] <== addresses[0];
    hash.inputs[3] <== chainIds[0];
    hash.inputs[4] <== addresses[1];
    hash.inputs[5] <== chainIds[1];

    computedHash <== hash.out;

    gameHash === computedHash;
}

component main { public [ tokenId, gameHash ] } = HashVerifier();