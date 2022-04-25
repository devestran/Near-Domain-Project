# Near Domain Project
This project is a simple crud base domain management program on the Near blockchain. A new domain is determined by the admin users and the customers are provided to purchase it.The addresses offered for sale by the domain owner are rented for 1 year when the necessary payment is made. For 1 year, the address is defined for the relevant customer and the purchase is closed. If the required fee for the address is paid, it is recorded in the transaction table. In summary with this project, you can purchase and follow up domain transactions with near extension.
## Installation
>  Prerequisites: Make sure you've installed Node.js ≥ 12. You should use git bash terminal.
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
near dev-deploy ./build/release/domain.wasm
```
- Contract define(sample AccountID:dev-1111-111111111111)
```sh 
export CONTRACT=<AccountId>
```
- Get contract value
```sh 
echo $CONTRACT
```
- Create test account(optional)
```sh 
near create-account <subAccountName>.<AccountName>.testnet --masterAccount <AccountName>.testnet --initialBalance 20
```
- Check test account(optional)
```sh 
near state <subAccountName>.<AccountName>.testnet
```
- Delete test account(optional)
```sh 
near delete <subAccountName>.<AccountName>.testnet <AccountName>.testnet
```
- Create domain
```sh 
near call $CONTRACT createDomain '{"address": "wallet.near", "accessible": true, "description": "Available near url", "price": "1000000000000000000000000"}'  --accountId <AccountName>.testnet
```
- Get all domains
```sh 
near view $CONTRACT getDomains '{"offset": 0}' 
```
- Get domain by domainId
```sh 
near view $CONTRACT getDomainById '{"id": 1000}' 
```
- Update domain
```sh 
near call $CONTRACT updateDomain '{"id": 2434609302,"updates":{"accessible":false,"description":"change","createdDate":0, "expiredDate":0,"price":"2000000000000000000000000"}}' --accountId <AccountName>.testnet
```
- Delete domain
```sh 
near call $CONTRACT deleteDomain '{"id":2434609302}' --accountId <AccountName>.testnet
```
- Subscription for domain
```sh 
near call $CONTRACT addTransaction '{"useTemplate":false, "domainId":2434609302}' --accountId <AccountName>.testnet --deposit 4
```
- Get transactions for subscription
```sh 
near view $CONTRACT getTransactions
```
- Get transactions by domainId
```sh 
near view $CONTRACT getTransactionsByDomainId '{"id":2710975801}'
```
