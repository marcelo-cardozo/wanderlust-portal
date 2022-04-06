const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");

  // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;

  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("📝 Your transaction signature", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("Gif Count: ", account.totalGifts.toString());

  await program.rpc.addGift(
    "https://media0.giphy.com/media/FbPsiH5HTH1Di/giphy.gif",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("Gif Count: ", account.totalGifts.toString());
  console.log("Gif List: ", account.gifs);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
