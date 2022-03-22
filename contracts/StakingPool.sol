pragma solidity ^0.8.5;

contract StakingPool {
    address public admin;
    uint256 public interestDivider;
    uint256 public poolAmt;
    uint256 public end;
    address payable[] public investors;

    struct StakeValue {
        uint256 stake;
        uint256 startBlock;
    }

    mapping(address  => StakeValue) public stakes;

    constructor(uint256 _interestDivider) {
        admin = msg.sender;
        interestDivider = _interestDivider;
    }

    event Invest(address indexed _address, uint256 _value);

    function invest() external payable {
        if (stakes[payable(msg.sender)].stake == 0) {
            investors.push(payable(msg.sender));
        }
        // payable(address(this)).transfer(msg.value);
        poolAmt += msg.value;
        stakes[payable(msg.sender)].stake += msg.value;
        stakes[payable(msg.sender)].startBlock = block.number;
        emit Invest(msg.sender, msg.value);
    }

    function withdraw() public payable {
        address recepient = msg.sender;
        require(stakes[(recepient)].stake > 0, "You are not an investor");
        uint256 endBlock = block.number;
        uint256 difference = endBlock - stakes[(recepient)].startBlock ;
        uint256 interest = (difference * 1) / interestDivider;
        uint256 totalAmt = stakes[(recepient)].stake + interest;
        stakes[(recepient)].stake = 0; 
        poolAmt -= totalAmt;
        payable(msg.sender).transfer(totalAmt);
    }
}
