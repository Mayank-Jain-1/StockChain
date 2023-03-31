// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


struct Holder{
    address trader_address;
    string trader_name;
    uint amount;
}

contract Stock{
    address private owner;
    address public contractAddress;
    // uint public unsold_amount;
    // uint public amount = 0;
    // uint public sellOrders = 0;
    // uint public buyOrders = 0;
    // string public companyName;
    // uint public currentPrice;
    address[] transactions;
    mapping(address => uint) public holderIndex;
    Holder[] public holders;

    // constructor(string memory _companyName, uint _amount, uint _currentPrice ){
    //     owner = msg.sender;
    //     companyName = _companyName;
    //     amount = _amount;
    //     currentPrice = _currentPrice;
    // }

    constructor(){
        contractAddress = address(this);
        Holder memory emptyHolder = Holder({
            trader_address: 0x0000000000000000000000000000000000000000,
            trader_name: "mayank",
            amount: 123
        });
        holders.push(emptyHolder);
    }


    function pay(address _recepient) public payable {
        address payable conntractAddress = payable(_recepient);
        conntractAddress.transfer(msg.value);
        
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function buyOrder(address _address, string memory _name, uint _amount) public {

        Holder memory updatedHolder = Holder({
            trader_address: _address,
            trader_name: _name,
            amount: _amount
        });

        if(holderIndex[_address] == 0){
            holderIndex[_address] = holders.length;
            holders.push(updatedHolder);
        }else{
            holders[holderIndex[_address]] = updatedHolder;
        }
    }

    function addTransaction(address _address) public {
        transactions.push(_address);
    }

}