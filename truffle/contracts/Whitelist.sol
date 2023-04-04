//SPDX-License// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 < 0.9.0;

struct Stock{
    string name;
    address stockAddress;
}

struct Trader{
    string name;
    address traderAddress;
}

contract Whitelist{
    address owner;
    Trader[] traders;
    mapping(address => uint) traderIndex;
    Stock[] stocks;
    mapping(string => uint) stocksIndex;

    constructor(){
        owner = msg.sender;
        traders.push(Trader({
            name: "owner",
            traderAddress: 0x0000000000000000000000000000000000000000
        }));
        stocks.push(Stock({
            name: "junk",
            stockAddress: 0x0000000000000000000000000000000000000000
        }));
    }

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }

    function verifyTrader(address _address) view public returns(bool){
        if(traderIndex[_address] == 0){
            return false;
        }
        return true;
    }

    function addTrader(string memory _name,address _address) public onlyOwner {
        require(traderIndex[_address] == 0, "Trader already Exists");
        traderIndex[_address] = traders.length;
        traders.push(Trader({
            name: _name,
            traderAddress: _address
        }));
    }

    function getStockAddress(string memory _name) view public returns(address){
        require(stocksIndex[_name] != 0, "Not found");
        return stocks[stocksIndex[_name]].stockAddress;
    } 

    function addStock(string memory _name, address _address) public onlyOwner {
        require(stocksIndex[_name] == 0, "Stock with this name, Already Exists");
        stocksIndex[_name] = stocks.length;
        stocks.push(Stock({
            name: _name, 
            stockAddress: _address
        }));
    }
    

}