#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'view' functions on the contract"
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo
echo "get Domains"

near view $CONTRACT getDomains '{"offset": 0}' 

echo  
echo "get Domain By Id"

near view $CONTRACT getDomainById '{"id": 1000}' 

echo  

echo "get Transactions"

near view $CONTRACT getTransactions

echo
echo "get Transactions By DomainId"

near view $CONTRACT getTransactionsByDomainId

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Call 'change' functions on the contract"
echo ---------------------------------------------------------
echo
echo "Create Domain"

near call $CONTRACT createDomain '{"address": "wallet.near", "accessible": true, "description": "Available near url", "price": "1000000000000000000000000"}'  --accountId $NEAR_ACCOUNT

echo
echo "Update Domain"

near call $CONTRACT updateDomain '{"id": 2434609302,"updates":{"accessible":false,"description":"change","createdDate":0, "expiredDate":0,"price":"2000000000000000000000000"}}' --accountId $NEAR_ACCOUNT

echo

echo "Delete Domain"

near call $CONTRACT deleteDomain '{"id":2434609302}' --accountId $NEAR_ACCOUNT

echo

echo "Add Transaction"

near call $CONTRACT addTransaction '{"useTemplate":false, "domainId":2434609302}' --accountId $NEAR_ACCOUNT --deposit 4

echo

echo "now run this script again to see changes made by this file"
exit 0
