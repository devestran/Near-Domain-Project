import {
    PersistentUnorderedMap,
    math,
    u128,
    PersistentVector,
    Context,
  } from "near-sdk-as";
  import { Timestamp } from "../../utils";
  
  export const domains = new PersistentUnorderedMap<u32, Domain>("domains");
  
  // export const ownerDomain = new PersistentUnorderedMap<u32, Array<AccountId>>(
  //   "access"
  // );
  
  // export const ONE_NEAR = u128.from("1000000000000000000000000");
  export const transactions = new PersistentVector<NewTransaction>("m");
  
  type AccountId = string;
  
  @nearBindgen
  export class PartialDomain {
    accessible: boolean;
    description: string;
    createdDate: Timestamp;
    expiredDate: Timestamp;
    price : u128;
  }
  
  @nearBindgen
  export class Domain {
    id: u32;
    user: AccountId = Context.sender;
    address: string;
    accessible: boolean;
    description: string;
    createdDate: Timestamp = Context.blockTimestamp;
    expiredDate: Timestamp;
    price : u128;
  
    constructor(address: string, accessible: boolean, description: string,  price : u128) {
      this.id = math.hash32<string>(address);
      this.address = address;
      this.accessible = accessible;
      this.description = description;
      this.price = price;
    }
  
    static addDomain(address: string, accessible: boolean, description: string, price : u128): Domain {
      const domain = new Domain(address, accessible, description, price);
      domains.set(domain.id, domain);
  
      return domain;
    }
  
    static findDomainById(id: u32): Domain {
        return domains.getSome(id);
    }
  
    static findDomains(offset: u32, limit: u32): Domain[] {
      return domains.values(offset, offset + limit);
    }
  
    static findDomainByIdAndUpdate(id: u32, partial: PartialDomain): Domain {
      const domain = this.findDomainById(id);
  
      domain.accessible = partial.accessible;
      domain.description = partial.description;
      domain.price = partial.price;
  
      domains.set(id, domain);
  
      return domain;
    }

    static findDomainByIdAndUpdateAccess(id: u32, expiredDate: Timestamp): void {
      const domain = this.findDomainById(id);
      domain.accessible = false
      domain.expiredDate= expiredDate
      domains.set(id, domain);
    }
  
    static findDomainByIdAndDelete(id: u32): void {
      domains.delete(id);
    }
  }

  @nearBindgen
  export class NewTransaction {
    domainId: u32;
    owner: string;
    useTemplate: boolean;
    registerDate: Timestamp = Context.blockTimestamp;
    expiredDate: Timestamp = Context.blockTimestamp + 31536000000000000
    // 31.536.000.000 one year later subscription end time
    price: u128;
    constructor( useTemplate: boolean, price: u128, domainId: u32) {
      this.owner = Context.sender;
      this.domainId = domainId;
      this.useTemplate = useTemplate;
      this.price = price;
      Domain.findDomainByIdAndUpdateAccess(domainId,Context.blockTimestamp + 31536000000000000)
    }


  }
  
 