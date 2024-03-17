import * as glz from '../../library/4Div.js';
import * as vars from './globalVariables.js';

//---------------------------------------------------------------------------------
window.event_chat_buttonChat = function () {
    glz.getCaller().father.onClick_botonChat();
}
//---------------------------------------------------------------------------------
window.event_chat_in_element = function () {
    glz.getCaller().father.onClick_inElement();
}
//---------------------------------------------------------------------------------
export class Chat extends glz.GameObject {
    constructor(img, fnt) {
        super();
        this.st = 0;
        this.buttonChat = undefined;
        this.in = undefined;
        this.img = img;
        this.fnt = fnt;
    }
    initialize() {
        this.buttonChat = new glz.EGUIgbutton(this.img, 35, glz.HEIGHT - 30);
        this.buttonChat.setEvent("event_chat_buttonChat");
    }
    finalize() {

    }
    frame() {
        //console.log(glz.gameObjects.length);
        //console.log(this.buttonChat.st, this.buttonChat.locked);
        switch (this.st) {
            case 0:
                // limbo..
                break;
            case 10:

                break;

            case 100:
                this.buttonChat.setDisable(true);
                this.in = new glz.EGUIinputBox(this.fnt, 22, "", "", glz.WIDTH / 2 + 30, glz.HEIGHT - 30, glz.WIDTH - 100);
                this.in.setFocus(true);
                this.in.setEvent("event_chat_in_element");
                this.st = 0;
                break;

            case 200:
                let str = this.in.get();
                if (str.length > 0) {
                    let m = new glz.NetMessage();
                    m.add("netSendChatMessage");
                    m.add("channel:general");
                    m.add(this.in.get());
                    m.send();
                }

                glz.signal(this.in, glz.s_kill);
                this.buttonChat.setDisable(false);
                this.st = 0;
                break;
        }
    }
    onClick_botonChat() {
        this.st = 100;
    }
    onClick_inElement() {
        this.st = 200;
    }
}
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
        this.createBody(glz.TYPE_PLANE);
        this.setStatic(true);
    }
    frame() {

    }
}
//---------------------------------------------------------------------------------
export class TouchControls extends glz.GameObject {
    constructor(img) {
        super();
        this.st = 0;
        this.joyCam = undefined;
        this.joyMov = undefined;
        this.vec = new glz.Vector2();
    }
    initialize() {
        this.joyCam = new glz.JoyStick((glz.WIDTH / 6) * 1, (glz.HEIGHT / 4) * 3, 200, 200);
        this.joyMov = new glz.JoyStick((glz.WIDTH / 6) * 5, (glz.HEIGHT / 4) * 3, 200, 200);
        glz.signal(this.joyCam, glz.s_protected);
        glz.signal(this.joyMov, glz.s_protected);
    }
    finalize() {

    }
    frame() {
        //let c = this.joyCam.getAxis();
        //window.idCam.setOrientation(c.multiplyScalar(0.01));
        let max = 10;
        let c = this.joyCam.get();
        if (c.active == true) {
            this.vec.x = c.axis_x / 10;
            if (this.vec.x > max) this.vec.x = max;
            if (this.vec.x < -max) this.vec.x = -max;
            this.vec.y = c.axis_y / 10;
            if (this.vec.y > max) this.vec.y = max;
            if (this.vec.y < -max) this.vec.y = -max;
        } else {
            this.vec.multiplyScalar(0.90);
        }
        window.idCam.setOrientation(this.vec);
        window.idCam.target.idJoy = this.joyMov;

    }
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------