import { useState } from "react";
import { CroakerParent } from "../contracts/MainContract";
import { CroakerChild } from "../contracts/ChildContract";
import { gravatarUrl } from "../helpers/helpers";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "ton-core";
import { Network } from '@orbs-network/ton-access';
import { useTonConnect } from "./useTonConnect";

const contractAddr = "EQCny0NfOaD58D_NOUh9biE2Zxqn6gZAnCo6pNCVvJXwk3Z_"
const transactionComission = 0.05
const postsBatchSize = 20

export interface PostProps {
  croak: string;
  username: string;
  avatarUrl: string;
  owner?: Address;
  seqno: bigint;
}

export interface BatchOfCroaks {
  croaks: PostProps[];
  isLastCroak: boolean;
  nextCroakNumber: number;
}

export function useMainContract(network: Network) {
  const client = useTonClient(network);
  const { sender } = useTonConnect();
  const [initError, setInitError] = useState<Error | null>(null);

  const mainContract = useAsyncInitialize(async () => {
    try {
      if (!client) return;
      const contract = CroakerParent.fromAddress(
        Address.parse(contractAddr)
      );
      return client.open(contract) as OpenedContract<CroakerParent>;
    } catch (error: any) {
      setInitError(error);
    }
  }, [client]);


  const createCroak = (croak: string, userid: string) => {
    return mainContract?.send(sender, {value: toNano(transactionComission)}, {
      $$type: 'NewCroak',
      croak: croak,
      userid: userid
    });
  };

  const editCroak = (croak: string, seqno: bigint) => {
    return mainContract?.send(sender, {value: toNano(transactionComission)}, {
      $$type: 'EditCroak',
      croak: croak,
      seqno: seqno,
    });
  };

  const loadBatchOfCroaks = async (nextCroakNumber?: number) => {
    let croaks: PostProps[] = [];
    let isLastCroak: boolean = false;
    const maxRetries = 3;

    // Get total number of croaks
    try {
      const totalCroaks = await mainContract?.getNumCroaks() || 0;
        if (totalCroaks === 0) {
          isLastCroak = true;
        }
        if (nextCroakNumber === undefined) {
          nextCroakNumber = Number(totalCroaks);
        }
    } catch (error: any) {
      setInitError(error);
      return;
    }

    // Try to fetch croaks
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        croaks = [];
        let croaksCounter = nextCroakNumber;
        let i = 1;

        while (i <= postsBatchSize && croaksCounter > 0) {
          const seqno: bigint = BigInt(croaksCounter);
          const croakAddress = await mainContract?.getCroakAddress(seqno);
          if (croakAddress) {
            const contract = CroakerChild.fromAddress(croakAddress);
            const childCroak = client?.open(contract) as OpenedContract<CroakerChild>;
            const details = await childCroak?.getDetails();
            const owner = await childCroak?.getOwner();

            croaks.push({
              croak: details?.croak,
              username: details?.userid,
              avatarUrl: gravatarUrl(details?.userid),
              owner: owner || undefined,
              seqno: seqno,
            });

            if (croaksCounter === 1) {
              isLastCroak = true;
              break;
            }
            croaksCounter--;
          }
          i++;
        };

        return {
          croaks: croaks,
          isLastCroak: isLastCroak,
          nextCroakNumber: croaksCounter,
        }
      } catch (error: any) {
        if (attempt + 1 === maxRetries) {
          setInitError(error);
          return;
        }
      }
    }
  };

  return {
    mainContract,
    createCroak,
    editCroak,
    loadBatchOfCroaks,
    initError
  }
}
