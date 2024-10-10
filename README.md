CipherVote is a decentralized voting mechanism that allows users to vote on-chain in a private and secure manner. It uses Maci protocol made by PSE team to ensure that votes are private and collusion resistant. 

How it's Made
The project uses MACI to ensure privacy and collusion resistant voting . 

1. Installation
cd maci-wrapper
yarn install

2. Download the zkeys for the MACI Circuits
In your first terminal window, run:

yarn download-zkeys

3. Update Environment Variables
Copy the example environment files to the required .env files:

cp packages/hardhat/.env.example packages/hardhat/.env
cp packages/nextjs/.env.example packages/nextjs/.env.local

Update the values of the environment variables in these new .env files.

4. Start a Local Ethereum Network
In your first terminal window, run:

yarn chain

This will start a local Ethereum network using Hardhat.

5. Deploy Contracts
In a second terminal window, deploy your contracts:

yarn deploy

6. Launch the NextJS Application
In a third terminal window, start the NextJS frontend:

yarn start

7. Compute Results
In a fourth terminal window, clone the MACI repository:

git clone git@github.com:privacy-scaling-explorations/maci.git

Copy the zkeys generated from the maci-wrapper repo to the CLI directory of the MACI repo:

cp -r ../maci-wrapper/packages/hardhat/zkeys ./cli

Install dependencies and build the MACI project:

pnpm i
pnpm run build

Copy the new contract addresses:

cp -r ../maci-wrapper/packages/contractAddresses.json ./cli/build/contractAddresses.json

Follow the MACI documentation to merge signups, merge messages, generate proof, and then you can upload the tally.json file to the admin panel after the poll is over.

8. Interact with Your DApp
Navigate to http://localhost:3000 to interact with your decentralized application (dApp).
