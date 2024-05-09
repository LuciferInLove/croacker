import "@stdlib/deploy";
import "@stdlib/ownable";
import "./croaker_child";

message NewCroak {
    croak: String;
    userid: String;
}

message NewCroakResponse {
    seqno: Int as uint256;
}

message EditCroak {
    seqno: Int as uint256;
    croak: String;
}

// users are supposed to interact with this parent contract only
contract CroakerParent with Deployable {
    numCroaks: Int as uint256 = 0;

    // anybody can add a new croak, but we save sender as an owner
    receive(msg: NewCroak){
        self.numCroaks = (self.numCroaks + 1);
        let init: StateInit = initOf CroakerChild(myAddress(), self.numCroaks);
        send(SendParameters{
                to: contractAddress(init),
                body: InternalSaveCroak{excess: sender(), croak: msg.croak, userid: msg.userid}.toCell(),
                value: ton("0.02"), // pay for the deployment and leave some TON in the child for storage
                mode: 0,
                code: init.code, // prepare the initial code when deploying the child contract
                data: init.data
            }
        );
        self.reply(NewCroakResponse{seqno: self.numCroaks}.toCell()); // this will return excess gas to sender
    }

    // only the owner can edit a croak
    receive(msg: EditCroak){
        require(msg.seqno <= self.numCroaks, "Croak does not exist");
        send(SendParameters{ // this will forward excess gas
                to: contractAddress(initOf CroakerChild(myAddress(), msg.seqno)),
                body: InternalEditCroak{excess: sender(), croak: msg.croak}.toCell(),
                value: 0,
                mode: SendRemainingValue
            }
        );
    }

    bounced(msg: bounced<NewCroak>){
        self.numCroaks = (self.numCroaks - 1);
        throw(123);
    }

    bounced(msg: bounced<EditCroak>){
        throw(123);
    }

    get fun numCroaks(): Int {
        return self.numCroaks;
    }

    get fun croakAddress(seqno: Int): Address {
        return contractAddress(initOf CroakerChild(myAddress(), seqno));
    }
}