// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


struct Holder{
    address trader_address;
    uint amount;
}

contract Stock{
    address private owner;
    address public contractAddress;
    uint public unsold_amount;
    uint public amountInPublic;
    uint public sellOrders = 0;
    uint public buyOrders = 0;
    string public companyName;
    uint public currentPrice = 1;
    address[] transactions;
    mapping(address => uint) public holderIndex;
    Holder[] public holders;
    event something(uint val);
    event printBool(bool val);
    event printString(string val);


    constructor(){
        contractAddress = address(this);
        unsold_amount = 600;
        amountInPublic = 0;
        Holder memory emptyHolder = Holder({
            trader_address: 0x0000000000000000000000000000000000000000,
            amount: 0
        });
        holders.push(emptyHolder);
    }

    receive() payable external {
        emit printString("Received the amount");
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function buyOrder() external payable  {
        uint valueSent = msg.value/1000000000000000000;
        emit something(valueSent);
        require(valueSent == currentPrice);
        bool sent = payable(address(this)).send(currentPrice);
        require(sent, "Not able to receive payment ethers");
        emit printBool(sent);
        address _address = msg.sender;
        
        if(unsold_amount > 0){
            unsold_amount--;
            amountInPublic++;
        }

        if(holderIndex[_address] == 0){
            Holder memory updatedHolder = Holder({
                trader_address: _address,
                amount: 1
            });
            holderIndex[_address] = holders.length;
            holders.push(updatedHolder);
        }else{
            holders[holderIndex[_address]].amount += 1;
        }
    }

    function sellOrder() external payable {
        address payable _address = payable(msg.sender);
        bool sent = _address.send(currentPrice*1 ether);
        require(sent, "Was not able to send the ethers, reverted");
        uint index = holderIndex[_address];
        require(index != 0 && holders[index].amount > 0 );
        holders[index].amount -= 1;
    }
}