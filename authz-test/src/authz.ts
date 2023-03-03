import {bluzelle, API} from 'bluzelle';

const api: API = bluzelle({
    mnemonic: 'rather expand outer owner happy merit fox endless illegal square faint logic error blur ginger smile myself brush orange alert smile push school divert',
    endpoint: 'http://localhost:1317',
    uuid: Date.now().toString(),
    chain_id: 'curium'
})

export {api};