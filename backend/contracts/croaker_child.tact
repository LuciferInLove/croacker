import "@stdlib/deploy";

message InternalSaveCroak {
    excess: Address;
    croak: String;
    userid: String;
}
message InternalEditCroak {
    excess: Address;
    croak: String;
}
struct CroakDetails {
    croak: String;
    userid: String;
}

contract CroakerChild {
    parent: Address;
    owner: Address?;
    seqno: Int as uint256;
    croak: String = "";
    userid: String = "";
    init(parent: Address, seqno: Int){
        self.parent = parent;
        self.seqno = seqno;
    }

    receive(msg: InternalSaveCroak){
        require(sender() == self.parent, "Parent only");
        self.owner = msg.excess;
        self.croak = msg.croak;
        self.userid = msg.userid;
    }

    receive(msg: InternalEditCroak){
        require(sender() == self.parent, "Parent only");
        require(msg.excess == self.owner, "Only owner can edit");
        self.croak = msg.croak;
        send(SendParameters{to: msg.excess, value: 0, mode: (SendRemainingBalance + SendIgnoreErrors)}); // this will return excess gas to original sender
    }

    get fun details(): CroakDetails {
        return CroakDetails{croak: self.croak, userid: self.userid};
    }

    get fun owner(): Address? {
        return self.owner;
    }
}