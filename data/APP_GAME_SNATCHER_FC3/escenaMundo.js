import * as glz from '../../library/4Div.js';
import { NetClient } from './NetPlayer.js';
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
    openChatRemotely() {
        this.st = 90;
    }
    initialize() {
        this.buttonChat = new glz.EGUIgbutton(this.img, 35, glz.HEIGHT - 30);
        this.buttonChat.setEvent("event_chat_buttonChat");
    }
    finalize() {

    }
    frame() {
        switch (this.st) {
            case 0:
                if (!glz.exists(this.in)) {
                    this.flag_open_chat_remotely = false;
                }
                break;

            case 90:
                if (!glz.exists(this.in)) {
                    this.st = 100;
                }
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
    constructor(tex, tex_normal) {
        super();
        this.textura = tex;
        this.textura_normal = tex_normal;
    }
    initialize() {
        this.anglex = 90;
        this.createMaterial(glz.TEXTURED, this.textura, true, 10);
        this.setNormalMaterial(this.textura_normal);
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
export class Target extends glz.GameObject {
    constructor(img, fnt) {
        super();
        this.st = 0;
        this.gr = img[6];
        glz.signal(this, glz.s_protected);
        this.x = 80;
        this.y = 80;
        this.text_nick = new glz.Write(fnt[0], 16, "nick", glz.CENTER, this.x, this.y - 20, glz.WHITE, 1);
    }
    initialize() {
        this.visible = false;
        this.setGraph(this.gr);
    }
    finalize() { }
    frame() {

        if (glz.isMobile()) {
            //..
        } else {
            this.targetDesktopRuntime();
        }

        //this.targetRuntime();
        if (glz.key(glz._ESC)) window.localPlayer.target = undefined;
        switch (this.st) {
            case 0:
                if (window.localPlayer.target != undefined) {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
                if (this.visible) {
                    this.text_nick.visible = true;


                    if (window.localPlayer.target instanceof NetClient) {
                        this.text_nick.setText(window.localPlayer.target.nick);
                    }



                } else {
                    this.text_nick.visible = false;
                }
                break;
            case 10:
                break;
        }
    }

    targetMobileRuntime(event) {

        for (let i = 0; i < glz.gameObjects.length; i++) {
            let c = glz.gameObjects[i];
            if (c.targeteable != undefined) {
                let collision = false;

                let pos = new glz.Vector2();
                let ray = new glz.Raycaster();
                pos.x = (event.x / glz.WIDTH) * 2 - 1;
                pos.y = - (event.y / glz.HEIGHT) * 2 + 1;
                ray.setFromCamera(pos, glz.camera);
                let list = ray.intersectObjects(glz.scene.children, true);

                for (let i = 0; i < list.length; i++) {
                    if (c.model) {
                        if (list[i].object.parent.id_ == c.id) {
                            collision = true;
                        }
                    } else {
                        if (list[i].object.id_ == c.id) {
                            collision = true;
                        }
                    }
                }

                if (collision) {
                    if (window.localPlayer == c.getTarget()) {
                        window.localPlayer.target = undefined;
                    } else {
                        window.localPlayer.target = c.getTarget();
                    }
                }
            }
        }
        // control de perdida del target..
        if (window.localPlayer.target != undefined) {
            if (glz.exists(window.localPlayer.target)) {
                // si el target existe pero se vuelve intargeteable..
                if (window.localPlayer.target.targeteable == false) window.localPlayer.target = undefined;
            } else {
                // si el target deja de existir..
                window.localPlayer.target = undefined;
            }
        }
    }
    targetDesktopRuntime() {
        if (glz.mouse.left) {
            let found = false;
            for (let i = 0; i < glz.gameObjects.length; i++) {
                let c = glz.gameObjects[i];
                if (c.targeteable != undefined) {
                    let collision = false;
                    if (glz.mouse.intersect(c)) collision = true;
                    if (collision) {
                        found = true;
                        if (window.localPlayer == c.getTarget()) {
                            window.localPlayer.target = undefined;
                        } else {
                            window.localPlayer.target = c.getTarget();
                        }
                    }
                }
            }
            if (!found) window.localPlayer.target = undefined;
        }
        // control de perdida del target..
        if (window.localPlayer.target != undefined) {
            if (glz.exists(window.localPlayer.target)) {
                // si el target existe pero se vuelve intargeteable..
                if (window.localPlayer.target.targeteable == false) window.localPlayer.target = undefined;
            } else {
                // si el target deja de existir..
                window.localPlayer.target = undefined;
            }
        }
    }

    targetRuntime_() {
        if (glz.isMobile()) {
            for (let i = 0; i < glz.gameObjects.length; i++) {
                let c = glz.gameObjects[i];
                if (c.targeteable != undefined) {
                    let collision = false;
                    collision = glz.mouse.intersect(c);
                    if (collision) {
                        if (window.localPlayer == c.getTarget()) {
                            window.localPlayer.target = undefined;
                        } else {
                            window.localPlayer.target = c.getTarget();
                        }
                    }
                }
            }

        } else {
            if (glz.mouse.left) {
                let found = false;
                for (let i = 0; i < glz.gameObjects.length; i++) {
                    let c = glz.gameObjects[i];
                    if (c.targeteable != undefined) {
                        let collision = false;
                        if (glz.mouse.intersect(c)) collision = true;
                        if (collision) {
                            found = true;
                            if (window.localPlayer == c.getTarget()) {
                                window.localPlayer.target = undefined;
                            } else {
                                window.localPlayer.target = c.getTarget();
                            }
                        }
                    }
                }
                if (!found) window.localPlayer.target = undefined;
            }
        }

        // control de perdida del target..
        if (window.localPlayer.target != undefined) {
            if (glz.exists(window.localPlayer.target)) {
                // si el target existe pero se vuelve intargeteable..
                if (window.localPlayer.target.targeteable == false) window.localPlayer.target = undefined;
            } else {
                // si el target deja de existir..
                window.localPlayer.target = undefined;
            }
        }

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------