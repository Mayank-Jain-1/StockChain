//SPDX-License// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 < 0.9.0;


interface StockInterface{
    function buyOrder() external payable;
    function sellOrder() external payable;
    function unsold_amount() view external returns(uint);
}

struct BuyTransaction {
        address stockid;
        uint256 buyprice;
        uint256 amount;
        uint256 timestamp;
        uint256 transactionid;
    }
struct SellTransaction {
        address stockid;
        uint256 sellprice;
        uint256 amount;
        uint256 timestamp;
        uint256 transactionid;
    }
struct CurrentTransaction {
        address stockid;
        uint256 amount;
    }

contract Trader {
    address public owner;
    
    modifier restricted() {
        require(msg.sender == owner,"Owner Only");
        _;
    }

    constructor(address _address) {
        owner = _address;
    }

    SellTransaction[] public sellTransact;
    BuyTransaction[] public buyTransact;
    CurrentTransaction[] public currentTransact;

    address public metamaskid;
    string public name; 
    
    event printString(string val);

    receive() payable external {
        emit printString("Received the amount");
    }

    function retriveSellDetails(address _stockid,uint256 _sellprice,uint256 _amount,uint256 _timestamp,uint256 _transactionid)public{
        sellTransact.push(SellTransaction(_stockid,_sellprice,_amount,_timestamp,_transactionid));
    }

    function retriveBuyDetails(address _stockid,uint256 _buyprice,uint256 _amount,uint256 _timestamp,uint256 _transactionid)public{
        buyTransact.push(BuyTransaction(_stockid,_buyprice,_amount,_timestamp,_transactionid));
    }   

    function retriveCurrentDetails(address _stockid,uint256 _amount)public{
        currentTransact.push(CurrentTransaction(_stockid,_amount));
    }

    function unsold_amount(address _contractAddress) public view returns(uint){
        return StockInterface(_contractAddress).unsold_amount();
    }

    function buyOrder(address _contractAddress) external restricted payable{
        StockInterface(_contractAddress).buyOrder{value: msg.value}();
    }

    function sellOrder(address _contractAddress) external restricted payable{
        StockInterface(_contractAddress).sellOrder();
    }
    function withdraw() external restricted payable{
        payable(owner).transfer(address(this).balance);
    }
}