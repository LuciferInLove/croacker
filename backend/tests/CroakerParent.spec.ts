import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CroakerParent, EditCroak, NewCroak } from '../wrappers/CroakerParent';
import '@ton/test-utils';
import { CroakerChild } from '../wrappers/CroakerChild';

describe('CroakerParent', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let croakerParent: SandboxContract<CroakerParent>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        croakerParent = blockchain.openContract(await CroakerParent.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await croakerParent.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: croakerParent.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and croakerParent are ready to use
    });

    it('should edit croak', async () => {
        const message: NewCroak = {
            $$type: 'NewCroak',
            croak: "Hello testnet!",
            userid: "test_user"
        }

        await croakerParent.send(deployer.getSender(),{
            value: toNano("0.5")
        }, message)

        const croakerChildAddr = await croakerParent.getCroakAddress(1n)
        const croakerChild = blockchain.openContract(CroakerChild.fromAddress(croakerChildAddr))

        expect((await croakerChild.getDetails()).croak).toBe("Hello testnet!")

        const messageEdit : EditCroak = {
            $$type: 'EditCroak',
            seqno: 1n,
            croak: "Edited!"
        }

        await croakerParent.send(deployer.getSender(),{
            value: toNano("0.5")
        }, messageEdit)

        expect((await croakerChild.getDetails()).croak).toBe("Edited!")
    });
});
