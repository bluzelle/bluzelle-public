// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import BluzelleCuriumBluzelleCuriumCurium from './bluzelle/curium/bluzelle.curium.curium'
import BluzelleCuriumBluzelleCuriumFaucet from './bluzelle/curium/bluzelle.curium.faucet'
import BluzelleCuriumBluzelleCuriumStorage from './bluzelle/curium/bluzelle.curium.storage'
import BluzelleCuriumBluzelleCuriumTax from './bluzelle/curium/bluzelle.curium.tax'


export default { 
  BluzelleCuriumBluzelleCuriumCurium: load(BluzelleCuriumBluzelleCuriumCurium, 'bluzelle.curium.curium'),
  BluzelleCuriumBluzelleCuriumFaucet: load(BluzelleCuriumBluzelleCuriumFaucet, 'bluzelle.curium.faucet'),
  BluzelleCuriumBluzelleCuriumStorage: load(BluzelleCuriumBluzelleCuriumStorage, 'bluzelle.curium.storage'),
  BluzelleCuriumBluzelleCuriumTax: load(BluzelleCuriumBluzelleCuriumTax, 'bluzelle.curium.tax'),
  
}


function load(mod, fullns) {
    return function init(store) {        
        if (store.hasModule([fullns])) {
            throw new Error('Duplicate module name detected: '+ fullns)
        }else{
            store.registerModule([fullns], mod)
            store.subscribe((mutation) => {
                if (mutation.type == 'common/env/INITIALIZE_WS_COMPLETE') {
                    store.dispatch(fullns+ '/init', null, {
                        root: true
                    })
                }
            })
        }
    }
}
