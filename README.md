# CySync React Application

React application to display wallets on a network for a particular user & associated transaction history with the same.

Project uses API's from below portal:
- [Blockcypher](https://www.blockcypher.com/dev/#introduction) for wallets, addresses, transactions CRUD.
- [bip39](https://github.com/iancoleman/bip39/tree/master/src) for mnemonic & address generation.

## Steps to run project

- Login to [Blockcypher](https://www.blockcypher.com/) & fetch your token.
- Add token to `VITE_API_TOKEN` environment variable in `.env.development` file.
- run command `npm i`
- run command `npm run dev`
