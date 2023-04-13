//SPDX-License// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface StockInterface {
    function buyOrder() external payable;

    function sellOrder() external payable;

    function unsold_amount() external view returns (uint);
}

struct Stock {
    string name;
    address stockAddress;
    uint amount;
}

// struct BuyTransaction {
//         address stockid;
//         uint256 buyprice;
//         uint256 amount;
//         uint256 timestamp;
//         uint256 transactionid;
//     }
// struct SellTransaction {
//         address stockid;
//         uint256 sellprice;
//         uint256 amount;
//         uint256 timestamp;
//         uint256 transactionid;
//     }
// struct CurrentTransaction {
//         address stockid;
//         uint256 amount;
//     }

contract Trader {
    address private government = 0x0B44caC31591F42123b25eec8f8AE6B161b5610C;
    address public owner;
    string public name;
    mapping(address => uint) public stockIndex;
    Stock[] stocks;

    event printString(string val);
    event printUint(uint val);

    modifier restricted() {
        require(msg.sender == owner, "Owner Only");
        _;
    }

    

    constructor(string memory _name, address _address) {
        require(msg.sender == government, "Only government account can be used to deploy new traders.");
        owner = _address;
        name = _name;
        stocks.push(Stock({name: "", stockAddress: address(0), amount: 0}));
    }

    // SellTransaction[] public sellTransact;
    // BuyTransaction[] public buyTransact;
    // CurrentTransaction[] public currentTransact;

    receive() external payable {
        emit printString("Received the amount");
    }

    // function pushSellDetials(address _stockid,uint256 _sellprice,uint256 _amount,uint256 _timestamp,uint256 _transactionid)public{
    //     sellTransact.push(SellTransaction(_stockid,_sellprice,_amount,_timestamp,_transactionid));
    // }

    // function retreiveBuyDetails(address _stockid,uint256 _buyprice,uint256 _amount,uint256 _timestamp,uint256 _transactionid)public{
    //     buyTransact.push(BuyTransaction(_stockid,_buyprice,_amount,_timestamp,_transactionid));
    // }

    // function retriveCurrentDetails(address _stockid,uint256 _amount)public{
    //     currentTransact.push(CurrentTransaction(_stockid,_amount));
    // }

    // function getStocks(uint _index) view public returns(Stock memory){
    //     return stocks[_index];
    // }

    function verifyWallet() view public returns(bool){
        if(msg.sender == owner){
            return true;
        }
        return false;
    }

    function getStocks() view public restricted returns(Stock[] memory){
        return stocks;
    }

    function buyOrder(
        string memory _stockName,
        address _stockAddress
    ) external payable restricted {
        StockInterface(_stockAddress).buyOrder{value: msg.value}();
        if (stockIndex[_stockAddress] == 0) {
            stockIndex[_stockAddress] = stocks.length;
            stocks.push(
                Stock({
                    name: _stockName,
                    stockAddress: _stockAddress,
                    amount: 1
                })
            );
        } else {
            stocks[stockIndex[_stockAddress]].amount =
                stocks[stockIndex[_stockAddress]].amount +
                1;
        }
    }

    function sellOrder(address _stockAddress) external payable restricted {
        require(stockIndex[_stockAddress] != 0, "You dont have this stock.");
        require(stocks[stockIndex[_stockAddress]].amount > 0, "You have 0 amount of this Stock.");
        StockInterface(_stockAddress).sellOrder();
        stocks[stockIndex[_stockAddress]].amount = stocks[stockIndex[_stockAddress]].amount - 1;
    }

    function withdraw() external payable restricted {
        emit printUint(address(this).balance);
        payable(owner).transfer(address(this).balance);
    }
}
