// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


struct holder{
    address trader_address;
    string trader_name;
    uint amount;
    address[] transactions;
}

contract Stock{
    address private owner;
    uint public unsold_amount;
    uint public amount = 0;
    uint public sellOrders = 0;
    uint public buyOrders = 0;
    string public companyName;
    uint public currentPrice;

    constructor(string memory _companyName, uint _amount, uint _currentPrice ){
        owner = msg.sender;
        companyName = _companyName;
        amount = _amount;
        currentPrice = _currentPrice;
    }



    function pay(address _recepient) public payable {
        address payable conntractAddress = payable(_recepient);
        conntractAddress.transfer(msg.value);
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

}