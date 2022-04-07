## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## MetaMask Integration
TODO

## Keplr Integration
Unfortunately "Keplr extension manages only one address/public key pair" so we can't sign transactions using that but it's enough for our read balance proposes.

Keplr documentation mentions also launchpad vs stargate versioning but it seems that that is not updated.

https://blog.cosmos.network/launchpad-a-pre-stargate-stable-version-of-the-cosmos-sdk-e0c58d8c4e24

Let's hope that in future integration with that extension will be improved like MetaMask but for now, we need RPC/REST call to the Cosmos SDK node to query that:
REST: https://node.atomscan.com
RPC: https://rpc.atomscan.com/

I used RPC because of its lightweight payloads and high performance.

### Keplr wallet API
https://docs.keplr.app/api/

### Keplr example
There is an example https://github.com/chainapsis/keplr-example/blob/master/src/main.js but it seems that is not working becouse of versioning problem with @cosmjs/launchpad.

TODO: currently, there is no auth/accounts method - is it deprecated?

## Todo in future:
- More tests
- Add react life update
- Test build
- Add store via Redux 
- There was a problem with crypto library in @cosmjs/crypto/build/pbkdf2.js 56:67-84, investigate why is that
