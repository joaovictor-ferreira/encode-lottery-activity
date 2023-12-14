import { useEffect } from "react";
import { useContractRead } from "wagmi";
import lotteryJson from "/Users/goncaloazevedo/Desktop/Encode bootcamp/weekend/my-create-web3-dapp/frontend/components/instructionsComponent/assets/Lottery.json";


const lotAddress = "0xFc64B9b724BdE2728369E8a13000DF949068B5Fb";

function CheckState() {
  const { data, isError, isLoading } = useContractRead({
    address: lotAddress,
    abi: lotteryJson.abi,
    functionName: "betsOpen",
  });

  const result = typeof data === "boolean" ? data : false;
  const stateText = result ? "Open" : "Closed";

  useEffect(() => {
    // Your effect logic here, e.g., update state or perform actions based on result
    console.log(result);
  }, [result]);

  if (isLoading) return <div>Fetching state…</div>;
  if (isError) return <div>Error fetching state</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // Align content towards the upper part
        height: "100vh", // Adjust the height as needed
      }}
    >
      <div>Lottery is: {stateText}</div>
    </div>
  );
}

export default CheckState;