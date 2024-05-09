import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export type InternalSaveCroak = {
    $$type: 'InternalSaveCroak';
    excess: Address;
    croak: string;
    userid: string;
}

export function storeInternalSaveCroak(src: InternalSaveCroak) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4059344317, 32);
        b_0.storeAddress(src.excess);
        b_0.storeStringRefTail(src.croak);
        b_0.storeStringRefTail(src.userid);
    };
}

export function loadInternalSaveCroak(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4059344317) { throw Error('Invalid prefix'); }
    let _excess = sc_0.loadAddress();
    let _croak = sc_0.loadStringRefTail();
    let _userid = sc_0.loadStringRefTail();
    return { $$type: 'InternalSaveCroak' as const, excess: _excess, croak: _croak, userid: _userid };
}

export type InternalEditCroak = {
    $$type: 'InternalEditCroak';
    excess: Address;
    croak: string;
}

export function storeInternalEditCroak(src: InternalEditCroak) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3555760232, 32);
        b_0.storeAddress(src.excess);
        b_0.storeStringRefTail(src.croak);
    };
}

export function loadInternalEditCroak(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3555760232) { throw Error('Invalid prefix'); }
    let _excess = sc_0.loadAddress();
    let _croak = sc_0.loadStringRefTail();
    return { $$type: 'InternalEditCroak' as const, excess: _excess, croak: _croak };
}

export type CroakDetails = {
    $$type: 'CroakDetails';
    croak: string;
    userid: string;
}

export function storeCroakDetails(src: CroakDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.croak);
        b_0.storeStringRefTail(src.userid);
    };
}

export function loadCroakDetails(slice: Slice) {
    let sc_0 = slice;
    let _croak = sc_0.loadStringRefTail();
    let _userid = sc_0.loadStringRefTail();
    return { $$type: 'CroakDetails' as const, croak: _croak, userid: _userid };
}

export type NewCroak = {
    $$type: 'NewCroak';
    croak: string;
    userid: string;
}

export function storeNewCroak(src: NewCroak) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(748564838, 32);
        b_0.storeStringRefTail(src.croak);
        b_0.storeStringRefTail(src.userid);
    };
}

export function loadNewCroak(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 748564838) { throw Error('Invalid prefix'); }
    let _croak = sc_0.loadStringRefTail();
    let _userid = sc_0.loadStringRefTail();
    return { $$type: 'NewCroak' as const, croak: _croak, userid: _userid };
}

export type NewCroakResponse = {
    $$type: 'NewCroakResponse';
    seqno: bigint;
}

export function storeNewCroakResponse(src: NewCroakResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(345468902, 32);
        b_0.storeUint(src.seqno, 256);
    };
}

export function loadNewCroakResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 345468902) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    return { $$type: 'NewCroakResponse' as const, seqno: _seqno };
}

export type EditCroak = {
    $$type: 'EditCroak';
    seqno: bigint;
    croak: string;
}

export function storeEditCroak(src: EditCroak) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2857788817, 32);
        b_0.storeUint(src.seqno, 256);
        b_0.storeStringRefTail(src.croak);
    };
}

export function loadEditCroak(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2857788817) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    let _croak = sc_0.loadStringRefTail();
    return { $$type: 'EditCroak' as const, seqno: _seqno, croak: _croak };
}

 type CroakerParent_init_args = {
    $$type: 'CroakerParent_init_args';
}

function initCroakerParent_init_args(_: CroakerParent_init_args) {
    return (_: Builder) => {};
}

async function CroakerParent_init() {
    const __code = Cell.fromBase64('te6ccgECHAEABP0AART/APSkE/S88sgLAQIBYgIDApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAcv/ye1UFgQCASAPEAPuAY5SgCDXIXAh10nCH5UwINcLH94gghAsnjFmuo4WMNMfAYIQLJ4xZrry4IFtMTCl8sB7f+CCEKpWZZG6jhTTHwGCEKpWZZG68uCBbTEw8sB7f+Awf+BwIddJwh+VMCDXCx/eIIIQLJ4xZrrjAiCCEKpWZZG64wIFBgcBNjDTHwGCECyeMWa68uCB1AHQAdQB0BJsEts8fwgBMjDTHwGCEKpWZZG68uCB0//UAdASbBLbPH8KAWaCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAMAp4CpPhD+Cgi2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ij4QkBWGQkCwMhVIIIQ8fStvVAEyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFjPFskBzMhYzxbJAczJggkxLQBacEAWfwZFVds8IMgBghAUl2/mWMsfy//J+EIBf23bPA0MAqqCALfTUyO78vT4Q/goVQLbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI+EJYGQsBeshZghDT8JhoUAPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMyXCAQH8EA21t2zwNATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPA0ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIPv3o22ebZ4YwWEQIBIBITAAIgAgEgFBUCAUgaGwIRtw/7Z4A7Z4YwFhcAlbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkAE87UTQ1AH4Y9IAAZTT/wEx4DD4KNcLCoMJuvLgids8GAGQ+EP4KFjbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIGQACcACmAtD0BDBtAYIA1hwBgBD0D2+h8uCHAYIA1hwiAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMkAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtVDNCWk5UUnZ6MmU2dWVlN0VzOFhFdUhLWXBpa3cyc3hYMVdhMXBDTkxBcXCCA=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initCroakerParent_init_args({ $$type: 'CroakerParent_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const CroakerParent_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    21059: { message: `Only owner can edit` },
    47059: { message: `Croak does not exist` },
    54404: { message: `Parent only` },
}

const CroakerParent_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InternalSaveCroak","header":4059344317,"fields":[{"name":"excess","type":{"kind":"simple","type":"address","optional":false}},{"name":"croak","type":{"kind":"simple","type":"string","optional":false}},{"name":"userid","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"InternalEditCroak","header":3555760232,"fields":[{"name":"excess","type":{"kind":"simple","type":"address","optional":false}},{"name":"croak","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CroakDetails","header":null,"fields":[{"name":"croak","type":{"kind":"simple","type":"string","optional":false}},{"name":"userid","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"NewCroak","header":748564838,"fields":[{"name":"croak","type":{"kind":"simple","type":"string","optional":false}},{"name":"userid","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"NewCroakResponse","header":345468902,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"EditCroak","header":2857788817,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"croak","type":{"kind":"simple","type":"string","optional":false}}]},
]

const CroakerParent_getters: ABIGetter[] = [
    {"name":"numCroaks","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"croakAddress","arguments":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const CroakerParent_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"NewCroak"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EditCroak"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class CroakerParent implements Contract {

    static async init() {
        return await CroakerParent_init();
    }

    static async fromInit() {
        const init = await CroakerParent_init();
        const address = contractAddress(0, init);
        return new CroakerParent(address, init);
    }

    static fromAddress(address: Address) {
        return new CroakerParent(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  CroakerParent_types,
        getters: CroakerParent_getters,
        receivers: CroakerParent_receivers,
        errors: CroakerParent_errors,
    };

    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: NewCroak | EditCroak | Deploy) {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NewCroak') {
            body = beginCell().store(storeNewCroak(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EditCroak') {
            body = beginCell().store(storeEditCroak(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }

    async getNumCroaks(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('numCroaks', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getCroakAddress(provider: ContractProvider, seqno: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(seqno);
        let source = (await provider.get('croakAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }

}
