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
    uint public amount = 0;
    uint public sellOrders = 0;
    uint public buyOrders = 0;
    string public companyName;
    uint public currentPrice = 1;
    address[] transactions;
    mapping(address => uint) public holderIndex;
    Holder[] public holders;

    // constructor(string memory _companyName, uint _amount, uint _currentPrice ){
    //     owner = msg.sender;
    //     companyName = _companyName;
    //     amount = _amount;
    //     currentPrice = _currentPrice;
    // }
    event something(uint val);
    event printBool(bool val);
    event printString(string val);


    constructor(){
        contractAddress = address(this);
        Holder memory emptyHolder = Holder({
            trader_address: 0x0000000000000000000000000000000000000000,
            amount: 0
        });
        amount = 600;
        holders.push(emptyHolder);
    }

    receive() payable external {
        emit printString("Received the amount");
    }


    function pay(address _recepient) public payable {
        address payable conntractAddress = payable(_recepient);
        conntractAddress.transfer(1);
        
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function getValue() payable public returns(uint) {
        return(msg.value);
    }


    function buyOrder() public payable  {
        uint valueSent = msg.value/1000000000000000000;
        emit something(valueSent);
        require(valueSent == currentPrice);
        bool sent = payable(address(this)).send(currentPrice);
        require(sent, "Not able to receive payment ethers");
        emit printBool(sent);
        address _address = msg.sender;
        

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

    function sellOrder() public payable {
        address payable _address = payable(msg.sender);
        bool sent = _address.send(currentPrice*1 ether);
        require(sent, "Was not able to send the ethers, reverted");
        uint index = holderIndex[_address];
        require(index != 0 && holders[index].amount > 0 );
        holders[index].amount -= 1;
    }

    function checkSender() view public returns (address){
        return msg.sender;
    }

    function addTransaction(address _address) public {
        transactions.push(_address);
    }

}