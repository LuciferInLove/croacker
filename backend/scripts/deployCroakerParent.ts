import { toNano } from '@ton/core';
import { CroakerParent } from '../wrappers/CroakerParent';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const croakerParent = provider.open(await CroakerParent.fromInit());

    await croakerParent.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(croakerParent.address);

    // run methods on `croakerParent`
}
