import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Provider } from "@project-serum/anchor";
import idl from "./idl.json";

export { idl };
// Get our program's id from the IDL file.
export const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl("devnet");

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed",
};

export const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, window.solana, opts);
  return provider;
};
