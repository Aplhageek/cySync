// import bip39 from "bip39";
// import BIP32Factory from "bip32";
// import bitcoin, { Network } from "bitcoinjs-lib";
// import * as ecc from "tiny-secp256k1";

import { getRandomAlphaNumericString } from "./commonUtils";

// const bip32 = BIP32Factory(ecc);

// function getAddress(node: { publicKey: unknown }, network?: Network): string {
//   return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address!;
// }

export async function generateAddressFromMnemonic(mnemonic: string) {
  // const seed = await bip39.mnemonicToSeed(mnemonic);
  // const root = bip32.fromSeed(seed);

  // const node = root.derivePath("m/44'/1'/0'/0/0");
  // return getAddress(node);

  if (window["populateCustomMnemonic" as keyof typeof window]) {
    window["populateCustomMnemonic" as keyof typeof window](mnemonic);

    const addresses = document.querySelectorAll(".address");

    if (addresses?.length)
      return (
        addresses[2]?.textContent ||
        addresses[1]?.textContent ||
        addresses[0]?.textContent ||
        ""
      );
  }

  return getRandomAlphaNumericString(16);
}
