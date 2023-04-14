const Home = () => {
   return (
      <div className="flex flex-col items-center p-4">
         <div className="max-w-3xl w-full">
            <h1 className="text-center text-5xl text-primary font-semibold p-4">
               Welcome to StockChain
            </h1>

            {/* What is StockChain */}
            <div className="mt-7  bg-primary p-4 rounded-lg bg-opacity-20">
               <h3 className="text-2xl font-semibold pb-2">
                  What is Stockchain?
               </h3>
               <p className="px-3">
                  &gt; StockChain is a blockchain-based project designed to
                  facilitate stock exchange using smart contracts. It aims to
                  create a decentralized platform that enables secure and
                  transparent trading of stocks without the need for
                  intermediaries like brokers or clearinghouses.
                  <br />
                  <br />
                  By leveraging the blockchain technology, StockChain seeks to
                  eliminate the inefficiencies and complexities associated with
                  traditional stock exchange systems, such as delays in
                  settlement, high transaction fees, and the risk of fraud. It
                  provides a secure and tamper-proof platform that enables
                  participants to exchange stocks in a peer-to-peer manner, with
                  all transactions recorded on the blockchain.
                  <br />
                  <br />
                  Through the use of smart contracts, StockChain automates the
                  process of buying and selling stocks, eliminating the need for
                  intermediaries and reducing the transaction costs. It also
                  provides increased transparency by allowing all participants
                  to view the transaction history, which enhances trust and
                  reduces the risk of fraud. Overall, StockChain aims to create
                  a more efficient and transparent stock exchange system, which
                  benefits all participants.
               </p>
            </div>

            {/* What problems does it solve */}
            <div className="mt-7  bg-primary p-4 rounded-lg bg-opacity-20">
               <h3 className="text-2xl font-semibold pb-2">
                  What problems does it solve? Why StockChain?
               </h3>
               <div className="px-3 space-y-2">
                  <p>
                     StockChain aims to solve several problems associated with
                     traditional stock exchange systems:
                  </p>
                  <ul className="px-6 list-decimal space-y-3">
                     <li className="">
                        Intermediaries: Traditional stock exchange systems
                        require intermediaries such as brokers, clearinghouses,
                        and custodians to facilitate transactions. These
                        intermediaries add complexity and cost to the system,
                        leading to higher fees for investors. StockChain
                        eliminates the need for intermediaries, thereby reducing
                        the cost and complexity of the system.
                     </li>
                     <li>
                        Settlement time: Traditional stock exchange systems
                        typically have a settlement time of several days, during
                        which time the price of the stock may fluctuate.
                        StockChain enables near-instantaneous settlement,
                        reducing the risk of price fluctuations and enabling
                        faster access to funds.
                     </li>
                     <li>
                        Transparency: Traditional stock exchange systems lack
                        transparency, with investors having limited access to
                        information on the underlying assets. StockChain
                        provides increased transparency by allowing all
                        participants to view the transaction history, thereby
                        enhancing trust and reducing the risk of fraud.
                     </li>
                     <li>
                        Security: Traditional stock exchange systems are
                        vulnerable to hacking, fraud, and other security
                        breaches. StockChain uses blockchain technology to
                        provide a secure and tamper-proof platform for trading,
                        thereby reducing the risk of security breaches.
                     </li>
                  </ul>
                  <p>
                     Overall, StockChain aims to solve these problems by
                     providing a more efficient, secure, and transparent stock
                     exchange system that benefits all participants.
                  </p>
               </div>
            </div>

            {/* How does StockChain handle these problems? */}
            <div className="mt-7  bg-primary p-4 rounded-lg bg-opacity-20">
               <h3 className="text-2xl font-semibold pb-2">
                  How does StockChain handle these problems?
               </h3>
               <div className="px-3 space-y-2">
                  <p>
                     StockChain addresses the problems associated with
                     traditional stock exchange systems through the use of
                     blockchain technology and smart contracts. Here's how it
                     handles these problems:
                  </p>
                  <ol className="px-6 list-decimal space-y-3">
                     <li className="">
                        Intermediaries: StockChain eliminates the need for
                        intermediaries by using smart contracts to automate the
                        process of buying and selling stocks. These smart
                        contracts act as self-executing programs that
                        automatically execute trades based on predetermined
                        conditions, thereby eliminating the need for
                        intermediaries such as brokers, clearinghouses, and
                        custodians.
                     </li>
                     <li>
                        Settlement time: StockChain enables near-instantaneous
                        settlement by using blockchain technology. Transactions
                        are validated and recorded on the blockchain, which
                        eliminates the need for a clearinghouse and reduces
                        settlement time to a matter of seconds.
                     </li>
                     <li>
                        Transparency: StockChain provides increased transparency
                        by using blockchain technology to record all
                        transactions on a decentralized ledger. This ledger is
                        transparent, immutable, and tamper-proof, which ensures
                        that all participants can view the transaction history
                        and verify the authenticity of the transactions.
                     </li>
                     <li>
                        Security: StockChain uses blockchain technology to
                        provide a secure and tamper-proof platform for trading.
                        Transactions are validated and recorded on a
                        decentralized ledger, which eliminates the risk of
                        fraud, hacking, and other security breaches.
                     </li>
                  </ol>
                  <p>
                     Overall, StockChain addresses the problems associated with
                     traditional stock exchange systems by leveraging the
                     benefits of blockchain technology and smart contracts,
                     which provide a more efficient, secure, and transparent
                     platform for trading stocks.
                  </p>
               </div>
            </div>

            {/* How to use StockChain */}
            <div className="mt-7  bg-primary p-4 rounded-lg bg-opacity-20">
               <h3 className="text-2xl font-semibold pb-2">
                  How to use StockChain? / How it works?
               </h3>
               <div className="px-3 space-y-2">
                  <ul className="px-6 list-decimal space-y-3">
                     <li className="">
                        You must have metamask installed in your browser to
                        interact with StockChain
                     </li>
                     <li className="">
                        A Preset wallet Address (Government Wallet address) can
                        be only used to deploy new Stocks with their Name,
                        Initial Price and Amount to be deployed. This
                        information of Stocks is also stored into a Whitelist
                        contract which is used to verify stocks, traders and
                        store their information.
                     </li>
                     <li>
                        Using that same Government account traders can also be
                        generated and be pushed into the Whitelist contract.
                        Each wallet address is mapped to a single Trader
                        contract address which will be holding the trader's
                        trading information like current holdings and past
                        transactions. Its information is stored into the
                        Whitelist contract which can be later used to verify
                        details of the trader.
                     </li>
                     <li>
                        After the trader and stocks are deployed. Any trader
                        using its own wallet address and his Trader contract
                        address can go to the "MarketPlace" and buy and sell
                        stocks.
                     </li>
                     <li>
                        A trader can go to trader and enter his Trader contract address. If the wallet address verifies as the owner of the trader contract he will be shown the details of his current holdings in the market.
                     </li>
                     <li>
                        Once a stock is sold ethereum are stored into the Trader contract address. Using the traders wallet address all the funds in the contract can be withdrawn into the wallet from the MarketPlace itself.
                     </li>
                  </ul>
                  <p>
                    <strong>Note* : </strong>
                    Currently price manipulation on buy and sell stocks has not been implemented. It is an obvious and must integration in this application. So sit tight you will be seeing it in near future. 😁
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
