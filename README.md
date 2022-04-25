# Near Domain Project
This project is a simple crud base domain management program on the Near blockchain. A new domain is determined by the users and the customers are provided to purchase it.The addresses offered for sale by the domain owner are rented for 1 year when the necessary payment is made. For 1 year, the address is defined for the relevant customer and the purchase is closed. If the required fee for the address is paid, it is recorded in the transaction table. In summary with this project, you can purchase and follow up domain transactions with near extension.
## Installation
>  Prerequisites: Make sure you've installed Node.js ≥ 12.You should use git bash terminal.
- Git clone this repo
```sh 
https://github.com/devestran/Near-Domain-Project 
```
- Run command on terminal:
```sh 
yarn install
```
- Build
```sh 
yarn build:release
```
- Deploy
```sh 
near dev-deploy ./build/debug/domain.wasm
```
- Contract define(sample AccountID:dev-1111-111111111111)
```sh 
export CONTRACT=<AccountId>
```
- Get contract value
```sh 
echo $CONTRACT
```
- All Domains

