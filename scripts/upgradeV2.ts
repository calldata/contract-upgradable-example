import { ethers, upgrades } from "hardhat";

async function main() {
    let BoxV2 = await ethers.getContractFactory("BoxV2");
    let boxV2 = await upgrades.upgradeProxy("0x653Db777184a9FE330634880c06c3960Cd372362", BoxV2);
    await boxV2.deployed();

    console.log("Box V2 upgraded");
}

main();