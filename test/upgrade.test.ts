import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("Test upgrade", () => {
    describe("upgrade v1 to v2", () => {
        it("test v1", async () => {
            const Box = await ethers.getContractFactory("Box");
            const box = await upgrades.deployProxy(Box, [42], { initializer: "store"});
            await box.deployed();
            let proxyAddress = box.address;

            const [signer] = await ethers.getSigners();
            const abi = [
                "function store(uint256)",
                "function retrieve() external view returns(uint256)",
                "function increment()",
                "function getY() returns(uint256)",
                "function setY(uint256)"
            ]

            // v1
            let v1Instance = new ethers.Contract(proxyAddress, abi, signer);
            v1Instance = v1Instance.attach(proxyAddress);
            expect(await v1Instance.callStatic.retrieve()).to.eq(42);
            await v1Instance.functions.store(11);
            expect(await v1Instance.callStatic.retrieve()).to.eq(11);

            // v2
            const BoxV2 = await ethers.getContractFactory("BoxV2");
            const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2);
            await boxV2.deployed();
    
            let v2Instance = new ethers.Contract(proxyAddress, abi, signer);
            v2Instance = v2Instance.attach(proxyAddress);
    
            expect(await v2Instance.callStatic.retrieve()).to.eq(11);
            await v2Instance.functions.store(12);
            expect(await v2Instance.callStatic.retrieve()).to.eq(12);
            await v2Instance.functions.increment();
            expect(await v2Instance.callStatic.retrieve()).to.eq(13);
            await v2Instance.functions.setY(21)
            expect(await v2Instance.callStatic.getY()).to.eq(21);
        })
    })
})