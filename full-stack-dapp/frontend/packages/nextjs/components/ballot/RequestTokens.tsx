import { useState } from "react";
import { signMessage } from "@wagmi/core"

export const RequestTokens = () => {
    const [data, setData] = useState<{ hash: string }>();
    const [isLoading, setLoading] = useState(false);
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const body = { signature: signature };
  
    if (isLoading) return <p>Loading...</p>;
    if (!signature)
    return (
      <div>
        <button
          className="btn btn-active btn-black bg-base-400  "
          onClick={async () => {
            setLoading(true);
            signMessage({
              message: "Sign message to Receive tokens",
            }).then((value) => {
              setSignature(value);
              setLoading(false);
              setError("");
            }).catch(error => {
              setError(error.message);
              setLoading(false);
              });
          }}
        >
          Sign Message
        </button>
        {error && (<p>Error: {error}</p>)}
      </div>
    );
    if (!data && signature)
      return (
        <button
        className="btn btn-active btn-black bg-base-400  "
          onClick={async () => {
            setLoading(true);
            fetch("http://localhost:3001/mint-tokens", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
              .then((res) => res.json())
              .then((data) => {
                setData(data);
                setLoading(false);
              });
          }}
        >
          Request tokens
        </button>
      );

    return (
      <div>
        {(data?.hash && (
          <div>
            <p>Submitted transaction:</p>
            <a   className="btn btn-active btn-black"href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank">
              See your transaction
            </a>
          </div>
        )) || <p>Error</p>}
      </div>
    );
  };