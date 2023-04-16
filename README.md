StockChain - A new way to Buy and Sell stocks. 
Deployed Website link - [StockChain](https://stockchain-383405.uc.r.appspot.com/trader)
By - [@Mayank Jain](https://github.com/Mayank-Jain-1) and [@YashBansal](https://github.com/Y-a-s-h-b)

*#SolvingForIndia #GeeksForGeeks #Google Cloud #AMD*

# What is Stockchain ?
StockChain is a blockchain-based project designed to facilitate stock exchange using smart contracts. It aims to create a decentralized platform that enables secure and transparent trading of stocks without the need for intermediaries like brokers or clearinghouses.

By leveraging the blockchain technology, StockChain seeks to eliminate the inefficiencies and complexities associated with traditional stock exchange systems, such as delays in settlement, high transaction fees, and the risk of fraud. It provides a secure and tamper-proof platform that enables participants to exchange stocks in a peer-to-peer manner, with all transactions recorded on the blockchain.

Through the use of smart contracts, StockChain automates the process of buying and selling stocks, eliminating the need for intermediaries and reducing the transaction costs. It also provides increased transparency by allowing all participants to view the transaction history, which enhances trust and reduces the risk of fraud. Overall, StockChain aims to create a more efficient and transparent stock exchange system, which benefits all participants.

# What problems does it solve? Why StockChain?
StockChain aims to solve several problems associated with traditional stock exchange systems:

1. Intermediaries: Traditional stock exchange systems require intermediaries such as brokers, clearinghouses, and custodians to facilitate transactions. These intermediaries add complexity and cost to the system, leading to higher fees for investors. StockChain eliminates the need for intermediaries, thereby reducing the cost and complexity of the system.
1. Settlement time: Traditional stock exchange systems typically have a settlement time of several days, during which time the price of the stock may fluctuate. StockChain enables near-instantaneous settlement, reducing the risk of price fluctuations and enabling faster access to funds.
1. Transparency: Traditional stock exchange systems lack transparency, with investors having limited access to information on the underlying assets. StockChain provides increased transparency by allowing all participants to view the transaction history, thereby enhancing trust and reducing the risk of fraud.
1. Security: Traditional stock exchange systems are vulnerable to hacking, fraud, and other security breaches. StockChain uses blockchain technology to provide a secure and tamper-proof platform for trading, thereby reducing the risk of security breaches.
Overall, StockChain aims to solve these problems by providing a more efficient, secure, and transparent stock exchange system that benefits all participants.

# How does StockChain handle these problems?
StockChain addresses the problems associated with traditional stock exchange systems through the use of blockchain technology and smart contracts. Here's how it handles these problems:

1. Intermediaries: StockChain eliminates the need for intermediaries by using smart contracts to automate the process of buying and selling stocks. These smart contracts act as self-executing programs that automatically execute trades based on predetermined conditions, thereby eliminating the need for intermediaries such as brokers, clearinghouses, and custodians.
1. Settlement time: StockChain enables near-instantaneous settlement by using blockchain technology. Transactions are validated and recorded on the blockchain, which eliminates the need for a clearinghouse and reduces settlement time to a matter of seconds.
1. Transparency: StockChain provides increased transparency by using blockchain technology to record all transactions on a decentralized ledger. This ledger is transparent, immutable, and tamper-proof, which ensures that all participants can view the transaction history and verify the authenticity of the transactions.
1. Security: StockChain uses blockchain technology to provide a secure and tamper-proof platform for trading. Transactions are validated and recorded on a decentralized ledger, which eliminates the risk of fraud, hacking, and other security breaches.
1. Overall, StockChain addresses the problems associated with traditional stock exchange systems by leveraging the benefits of blockchain technology and smart contracts, which provide a more efficient, secure, and transparent platform for trading stocks.


# How to use StockChain? / How it works?
You must have metamask installed in your browser to interact with StockChain
1. A Preset wallet Address (Government Wallet address) can be only used to deploy new Stocks with their Name, Initial Price and Amount to be deployed. This information of Stocks is also stored into a Whitelist contract which is used to verify stocks, traders and store their information.
1. Using that same Government account traders can also be generated and be pushed into the Whitelist contract. Each wallet address is mapped to a single Trader contract address which will be holding the trader's trading information like current holdings and past transactions. Its information is stored into the Whitelist contract which can be later used to verify details of the trader.
1. After the trader and stocks are deployed. Any trader using its own wallet address and his Trader contract address can go to the "MarketPlace" and buy and sell stocks.
1. A trader can go to trader and enter his Trader contract address. If the wallet address verifies as the owner of the trader contract he will be shown the details of his current holdings in the market.
1. Once a stock is sold ethereum are stored into the Trader contract address. Using the traders wallet address all the funds in the contract can be withdrawn into the wallet from the MarketPlace itself.

Note* : Currently price manipulation on buy and sell stocks has not been implemented. It is an obvious and must integration in this application. So sit tight you will be seeing it in near future. 😁


# Tech Used / Worflow followed
1. Remix for initial creating of Contracts and manual testing of contract.
### Development Environment
1. Using Truffle to compile contracts
1. React.js for frontend, Redux used for storing global state provider. 
1. Web3.js as a web3 provider.
1. Ganache as a local test ethereum blockchain.
1. Json-server for making a pseudo server for fast testing, debugging and optimazing.

### Production Environment
1. React.js for frontend, Redux used for storing global state provider.
1. Metamask for handling wallets and a web3 provider. 
1. Making a Web3 instance of `window.ethereum` given by metamask for running transactions.
1. Using a Google Cloud AMD VM instance to deploy our application on. 
