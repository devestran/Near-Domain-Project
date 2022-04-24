import { Context, u128, storage, PersistentUnorderedMap, ContractPromiseBatch } from "near-sdk-as";
import { Domain, PartialDomain, transactions, NewTransaction } from "./model";
import { AccountId } from "../../utils";

export const domains = new PersistentUnorderedMap<u32, Domain>("domains");

export function createDomain(
  address: string,
  accessible: boolean,
  description: string,
  price : u128
): Domain {
  return Domain.addDomain(address, accessible, description, price);
}

export function init(): void{
  storage.set<AccountId>("owner", Context.sender)
}

export function getBalance(): u128 {
  return Context.accountBalance;
}

export function getDomains(offset: u32, limit: u32 = 10): Domain[] {
  return Domain.findDomains(offset, limit);
}

export function getDomainById(id: u32): Domain {
  return Domain.findDomainById(id);
}

export function updateDomain(id: u32, updates: PartialDomain): Domain {
  assert_username_update(domains.getSome(id).user)
  return Domain.findDomainByIdAndUpdate(id, updates);
}

export function deleteDomain(id: u32): void {
  assert_username_delete(domains.getSome(id).user)
  Domain.findDomainByIdAndDelete(id);
}

export function addTransaction(useTemplate: boolean, domainId: u32): void {
  assert_domain(domainId);
  assert_domain_is_active(domains.getSome(domainId));
  assert_username_transaction(domains.getSome(domainId).user)
  assert_enoughDeposit(domains.getSome(domainId).price)
  const Owner: AccountId = Context.sender
  ContractPromiseBatch.create(Owner).transfer(domains.getSome(domainId).price);
  const transaction = new NewTransaction(useTemplate, domains.getSome(domainId).price, domainId);
  transactions.push(transaction);
}

/*ASSERT*/
function assert_domain(domainId: u32): void {
  assert(domains.contains(domainId), 'Domain not exists');
}

function assert_domain_is_active(domain: Domain): void {
  assert(domain.accessible, 'Domain is inactive');
}

function assert_enoughDeposit(price: u128): void {
  assert(Context.attachedDeposit >= price, `attachedDeposit:${Context.attachedDeposit}, price:${price} Please check your wallet for payment!`)
}

function assert_username_update(user: string): void {
  assert(user == Context.sender, 'Unauthorized update!');
}

function assert_username_delete(user: string): void {
  assert(user == Context.sender, 'Unauthorized delete!');
}

function assert_username_transaction(user: string): void {
  assert(user != Context.sender, 'AccountId must be different!');
}
/*ASSERT*/

const limit_domain = 10;
export function getTransactions(): NewTransaction[] {
  const numComments = min(limit_domain, transactions.length);
  const startIndex = transactions.length - numComments;
  const result = new Array<NewTransaction>(numComments);
  for (let i = 0; i < numComments; i++) {
    result[i] = transactions[i + startIndex];
  }
  return result;
}

export function getTransactionsByDomainId(
  id: i32,
  limit: i32 = 10
): NewTransaction[] {
  const numComments = min(limit, transactions.length);
  const startIndex = transactions.length - numComments;
  // const result = new Array<NewTransaction>(numComments);
  const result: NewTransaction[] = [];
  for (let i = 0; i < numComments; i++) {
    if (transactions[i].domainId === id) {
      // result[i] = transactions[i + startIndex];
      result.push(transactions[i + startIndex]);
    }
  }
  return result;
}

