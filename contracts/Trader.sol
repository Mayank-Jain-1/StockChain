//SPDX-License// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 < 0.9.0;

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

    SellTransaction[] public sellTransact;
    BuyTransaction[] public buyTransact;
    CurrentTransaction[] public currentTransact;

    address public metamaskid;
    string public name;
    

    function retriveSellDetails(address _stockid,uint256 _sellprice,uint256 _amount,uint256 _timestamp,uint256 _transactionid)public{
        sellTransact.push(SellTransaction(_stockid,_sellprice,_amount,_timestamp,_transactionid));
    }

    function retriveBuyDetails(address _stockid,uint256 _buyprice,uint256 _amount,uint256 _timestamp,uint256 _transactionid)public{
        buyTransact.push(BuyTransaction(_stockid,_buyprice,_amount,_timestamp,_transactionid));
    }   
    function retriveCurrentDetails(address _stockid,uint256 _amount)public{
        currentTransact.push(CurrentTransaction(_stockid,_amount));
    }
}