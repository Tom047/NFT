const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
    let MyToken, myToken, owner, addr1, addr2;

    beforeEach(async () => {
        MyToken = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2, _] = await ethers.getSigners();
        myToken = await MyToken.deploy(owner.address);
        // No need to call `deployed()`
    });


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await myToken.owner()).to.equal(owner.address);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            await myToken.safeMint(addr1.address, 1, "https://token.com/1");
            const addr1Balance = await myToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(1);

            await myToken.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
            const addr2Balance = await myToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(1);
        });
    });
});
