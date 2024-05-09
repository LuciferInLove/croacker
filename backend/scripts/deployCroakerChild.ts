import { toNano } from '@ton/core';
import { CroakerChild } from '../wrappers/CroakerChild';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const croakerChild = provider.open(await CroakerChild.fromInit());

    await croakerChild.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(croakerChild.address);

    // run methods on `croakerChild`
}
