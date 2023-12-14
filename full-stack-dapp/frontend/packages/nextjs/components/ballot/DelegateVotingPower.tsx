import { useState } from "react";
import { useContractWrite } from "wagmi";

export const DelegateVotingPower = (params: { contractAddress: `0x${string}` }) => {
  const [delegateeAddress, setDelegateeAddress] = useState("");
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: params.contractAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "delegatee",
            type: "address",
          },
        ],
        name: "delegate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "delegate",
    args: [delegateeAddress],
  });
  return (
    <div className="card lg:card-side bg-base-200 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Delegate Voting Power</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            write?.();
          }}
        >
          <div className="form-control w-full max-w-xs my-4 mt-0">
            <label className="label">
              <span className="label-text">Enter delegatee address:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={delegateeAddress}
              onChange={e => setDelegateeAddress(e.target.value)}
            />
          </div>
          <button className="btn btn-active btn-black" disabled={!write || isLoading}>
            {isLoading ? "Delegating..." : "Delegate"}
          </button>
          {isSuccess && (
            <div>
              <p>Submitted transaction:</p>
              <a  className="btn btn-active btn-black"  href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank">
               See your transaction
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
