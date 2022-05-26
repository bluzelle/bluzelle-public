import {$, cd} from 'zx';
import * as path from 'path'

const rootDir = () => path.join(__dirname, '../../..');

$`yarn build-curium-store`
     .then(buildSdk);


function buildSdk() {
    return $`yarn webpack`;
}