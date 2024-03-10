import * as glz from '../../library/4Div.js';
import * as vars from './globalVariables.js';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
export class Suelo extends glz.GameObject {
    constructor(tex) {
        super();
        this.textura = tex;
    }
    initialize() {
        this.anglex = 90;
        this.createMaterial(glz.TEXTURED, this.textura, true, 1);
        this.createPlane(400, 400);

    }
    frame() {

    }
}

