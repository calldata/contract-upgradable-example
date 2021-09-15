import { ethers, upgrades } from "hardhat";

async function main() {
    const Box = await ethers.getContractFactory("Box");
    const box = await upgrades.deployProxy(Box, [42], { initializer: "store"});
    await box.deployed();
    console.log("Box v1 deployed at: ", box.address);
}

main();