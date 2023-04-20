import {BluzelleClient} from "./sdk";

interface NodeStatusResponse {
    nodeId: string,
    chainId: string,
    moniker: string,
    blockHeight: number
    caughtUp: boolean
}

interface ValidatorResponse {
    address: string
    votingPower: number
}

export const getStatus = (client: BluzelleClient): Promise<NodeStatusResponse> =>
    client.tmClient.status()
        .then(result => ({
            nodeId: Buffer.from(result.nodeInfo.id).toString('hex'),
            chainId: result.nodeInfo.network,
            moniker: result.nodeInfo.moniker,
            blockHeight: result.syncInfo.latestBlockHeight,
            caughtUp: !result.syncInfo.catchingUp,
        }))

export const getValidators = (client: BluzelleClient): Promise<ValidatorResponse[]> =>
    client.tmClient.validators({})
        .then(result => result.validators.map(validator => ({
            address: Buffer.from(validator.address).toString('hex'),
            votingPower: validator.votingPower
        })))