// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Box {
    uint256 public x;

    function store(uint256 _x) external {
        x = _x;
    }

    function retrieve() external view returns(uint256) {
        return x;
    }
}
