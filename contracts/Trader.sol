//SPDX-License// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 < 0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

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
contract Temp{
    uint256 public transactid;
    function increment() public {

        transactid = 12345;

    }
    
}
contract Trader {

    address public metamaskid;
    string public name;
    
    SellTransaction[] public sellTransact;
    BuyTransaction[] public buyTransact;
    
    Temp public transactionid;
    
    // constructor(address counterAddress) {

    //     transactionid = Temp(counterAddress);

    // }

    function setter() public{
        
        transactionid.increment();
    }


    function retrive(address _stockid,uint256 _sellprice,uint256 _amount,uint256 _timestamp,uint256 _transactionid)public{
        sellTransact.push(SellTransaction(_stockid,_sellprice,_amount,_timestamp,_transactionid));
}
    
}