const main = async () => {
  const [owner, acc1,acc2] = await hre.ethers.getSigners();
  const InterestContractFactory = await hre.ethers.getContractFactory('StakingPool');
  const interestContract = await InterestContractFactory.deploy(10000);
  await interestContract.deployed();

  console.log("Contract owner:", owner.address);
  
  // console.log("Balance of owner before deposit:", hre.ethers.utils.formatEther(interestContract.poolAmt));

  try {
    tx = await interestContract.connect(acc1).invest({ value: hre.ethers.utils.parseEther('10') });
    await tx.wait();
  } catch (error) {
    console.log(error);
  }

  try {
    tx = await interestContract.connect(acc2).invest({ value: hre.ethers.utils.parseEther('10') });
    await tx.wait();
  } catch (error) {
    console.log(error);
  }

  try {
    tx = await interestContract.connect(acc1).withdraw();
    await tx.wait();
  } catch (error) {
    console.log(error);
  }

  // console.log("Balance of owner after deposit:", hre.ethers.utils.formatEther(interestContract.poolAmt));
  
  // try {
  //   tx = await interestContract.deposit({ value: hre.ethers.utils.parseEther('1234') });
  //   await tx.wait();
  // } catch (error) {
  //   console.log(error);
  // }

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();