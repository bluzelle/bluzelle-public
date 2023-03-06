import { blzClient } from "../src/authz";
import { SendAuthorization } from "../src/curium/lib/generated/cosmos/bank/v1beta1/authz";
import { getAccountBalance, grant, send } from "../src/index";
describe("Bluzelle Tests", async () => {
        const client = (await blzClient);
        grant(client, "bluzelle13hvkqhy7u2x0kxjatlusruw9wd4k9esx5zymcv", "bluzelle1x6w5eaajummca4a78hawe3cx4xa8nauwxt8hld", {}, {
                gasPrice: 0.002,
                maxGas: 500000,
                mode: 'sync'
            }).then(str => console.log(str))
            .catch(e => console.log(e))
            ;
//       send(client, "bluzelle1x6w5eaajummca4a78hawe3cx4xa8nauwxt8hld", 10 , {
//                 gasPrice: 0.002,
//                 maxGas: 200000,
//                 mode: 'async'
//             }).then(str => console.log(str))
//                 .catch(e => console.log(e))
        
        console.log(await getAccountBalance(client, 'bluzelle13hvkqhy7u2x0kxjatlusruw9wd4k9esx5zymcv'))
        
});