import * as glz from '../../library/4Div.js';
import { NetClient } from './NetPlayer.js';
import * as vars from './globalVariables.js';
import * as main from './game.js';
//---------------------------------------------------------------------------------
window.event_actionBar_buttonAction = function () {
    glz.getCaller().father.onClick_buttonAction();
}
//---------------------------------------------------------------------------------
export class ActionBar extends glz.GameObject {
    constructor() {
        super();
        this.st = 0;
        this.x = glz.WIDTH / 2;
        this.y = glz.HEIGHT - 80;
        this.buttonAction = undefined;
        this.casillaFondo = glz.screenDrawGraphic(main.skills[16], this.x, this.y);
    }
    initialize() {
        let obj = window.localPlayer.target.getClassName();
        switch (obj) {
            case "Roca":
                this.buttonAction = new glz.EGUIgbutton(main.skills[11], this.x, this.y);
                this.buttonAction.setEvent("event_actionBar_buttonAction");
                break;
            default:
                this.buttonAction = new glz.EGUIgbutton(main.skills[8], this.x, this.y);
                break;
        }

    }
    finalize() {
        glz.signal(this.buttonAction, glz.s_kill);
        glz.signal(this.casillaFondo, glz.s_kill);

    }
    onClick_buttonAction() {

    }
    frame() {
        switch (this.st) {
            case 0:

                break;
            case 10:

                break;
        }
    }
}
//---------------------------------------------------------------------------------
class CastBar extends glz.GameObject {

}
//---------------------------------------------------------------------------------
window.event_inventario_buttonBag = function () {
    glz.getCaller().father.onClick_botonBag();

}
//---------------------------------------------------------------------------------
export class Inventario extends glz.GameObject {
    constructor(img, fnt) {
        super();
        this.st = 0;
        this.buttonBag = undefined;
        this.img = img;
        this.fnt = fnt;
        this.show = false;
        this.celda = 0;
        this.temp = [];
    }
    initialize() {
        this.x = glz.WIDTH - (this.img[8].width / 2 + 20);
        this.y = glz.HEIGHT / 2;
        this.buttonBag = new glz.EGUIgbutton(this.img[9], glz.WIDTH - 50, 50);
        this.buttonBag.setEvent("event_inventario_buttonBag");

    }
    finalize() {

    }
    frame() {

        switch (this.st) {
            case 0:
                break;
            case 10:
                break;

            case 100:
                if (!this.show) {
                    this.show = !this.show;
                    this.openBag();
                } else {
                    this.show = !this.show;
                    this.closeBag();
                }
                this.st = 0;
                break;
        }
    }
    openBag() {
        // 5,29 - 77
        this.visible = false;
        this.setGraph(this.img[8]);
        this.visible = true;
        let t = new glz.Write(this.fnt[0], 14, " Inventario estupendo!", glz.RIGHT, this.x - this.img[8].width / 2, this.y - this.img[8].height / 2 + 14, glz.YELLOW, 1);
        this.temp.push(t);
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < 4; i++) {
                let vec = this.getRealPoint(5 + 77 / 2, 29 + 77 / 2);
                vec.x += i * 78;
                vec.y += j * 78;
                let num = 4 * j + i;

                let t = new glz.EGUIgbutton([this.img[10], this.img[11]], vec.x - 1, vec.y - 1, 1);
                this.temp.push(t);
                let z_ = t.z + 1;
                t = new glz.Write(this.fnt[0], 12, num, glz.RIGHT, vec.x - 32, vec.y - 25, glz.GRAY, 1);
                t.z = z_;
                this.temp.push(t);
            }
        }



    }
    closeBag() {
        this.visible = false;
        this.clearGraph();
        this.visible = true;
        for (let i = 0; i < this.temp.length; i++) {
            glz.signal(this.temp[i], glz.s_kill);
        }
        this.temp = [];
    }
    onClick_botonBag() {
        this.st = 100;
    }
}
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

                let params = str.split(" ");
                if (params)


                    if (str.length > 0) {

                        if (str[0] == '/') {
                            // comando detectado..
                            let param = str.split(" ");
                            switch (param[0]) {
                                case "/dados":
                                case "/rol":
                                    if (param.length == 1) {
                                        let msg = "Tirada de dados [0-100]: " + glz.randInt(100);
                                        this.netSendChatMessage(msg);
                                    } else {
                                        if (glz.isNumber(glz.parseInt(param[1]))) {
                                            let msg = "Tirada de dados [0-" + param[1] + "]: " + glz.randInt(param[1]);
                                            this.netSendChatMessage(msg);
                                        } else {
                                            console.log("CHAT: [" + param[1] + "] No es un número!");
                                        }
                                    }


                                    break;
                                case "":

                                    break;
                                default:
                                    console.log("CHAT: [" + param[0] + "] Comando no reconocido!");
                                    break;
                            }
                        } else {
                            // texto normal..
                            this.netSendChatMessage(str);
                        }
                    }

                glz.signal(this.in, glz.s_kill);
                this.buttonChat.setDisable(false);
                this.st = 0;
                break;
        }
    }
    netSendChatMessage(str) {
        let m = new glz.NetMessage();
        m.add("netSendChatMessage");
        m.add("channel:general");
        m.add(str);
        m.send();
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
export class Roca extends glz.GameObject {
    constructor(obj) {
        super();
        this.st = 0;
        this.obj = obj;
        this._size_ = 5;
        this.targeteable = true;
    }
    getTarget() {
        return this;
    }
    initialize() {
        this.y = this._size_;
        this.x = glz.random(-200, 200);
        this.z = glz.random(-200, 200);
        this.createSphere(this._size_);
        this.createBody(glz.TYPE_SPHERE);
        this.size = 20;
        this.setModel(this.obj[glz.randInt(this.obj.length - 1)]);
        this.setStatic(true);
        this.offset_mesh_y = -this._size_ + 0.4;
    }
    finalize() { }
    frame() {
        switch (this.st) {
            case 0:
                break;
            case 10:
                break;
        }
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
        this.img = img;
        glz.signal(this, glz.s_protected);
        this.x = 60;
        this.y = 80;
        this.text_name = new glz.Write(fnt[0], 16, "nick", glz.CENTER, this.x, this.y - 20, glz.WHITE, 1);

        this.idFlecha = undefined;
        this.mouseMovedWhenClicking = false;
        this.actionBar = undefined;

    }
    initialize() {
        this.visible = false;
        this.setGraph(this.img[6]);

        this.idFlecha = new glz.GameObject();
        this.idFlecha.visible = false;
        this.idFlecha.offset_x = 0;
        this.idFlecha.offset_y = 0;
        this.idFlecha.counter = 0;
        this.idFlecha.setGraph(this.img[14]);
        glz.signal(this.idFlecha, glz.s_protected);
        this.idFlecha.frame = function () {
            if (this.visible) {
                this.x = this.offset_x;
                this.counter = (this.counter + 5) % 360;
                this.y = (this.offset_y - 70) + glz.sin(glz.radians(this.counter)) * 30;
            }
        }

    }
    finalize() { }
    frame() {

        if (glz.isMobile()) {
            //..
        } else {
            this.targetDesktopRuntime();
        }

        if (glz.key(glz._ESC)) window.localPlayer.target = undefined;
        switch (this.st) {
            case 0:
                if (window.localPlayer.target != undefined) {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
                if (this.visible) {
                    this.text_name.visible = true;


                    // perform target arrow transforms..
                    let bb = window.localPlayer.target.getBoundingBox();
                    let vec = new glz.Vector3(window.localPlayer.target.x, bb.max.y, window.localPlayer.target.z);
                    let screen = glz.worldToScreen(vec);
                    this.idFlecha.offset_x = screen.x;
                    this.idFlecha.offset_y = screen.y;
                    this.idFlecha.visible = true;


                    let className = window.localPlayer.target.getClassName();


                    // CONTROL DE ACTION FARM BUTTON..
                    if (window.localPlayer.target != undefined) {
                        let distance = glz.getDistance(window.localPlayer, window.localPlayer.target);
                        if (distance < vars.NET_PLAYER_MIN_DISTANCE_SHOW_ACTIONBAR_FARM) {
                            if (this.actionBar == undefined) {
                                this.actionBar = new ActionBar();
                            }
                        } else {
                            if (this.actionBar != undefined) {
                                glz.signal(this.actionBar, glz.s_kill);
                                this.actionBar = undefined;
                            }
                        }


                    }

                    if (window.localPlayer.target instanceof NetClient) {
                        this.text_name.setText(window.localPlayer.target.nick);
                    } else if (window.localPlayer.target instanceof Roca) {
                        this.text_name.setText(className);
                    }



                } else {
                    this.text_name.visible = false;
                    this.idFlecha.visible = false;
                    if (this.actionBar != undefined) {
                        glz.signal(this.actionBar, glz.s_kill);
                        this.actionBar = undefined;
                    }
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

            if (glz.mouse.moved) {
                this.mouseMovedWhenClicking = true;
            }

            if (this.mouseMovedWhenClicking == false && !glz.mouse.isOverSprite()) {
                let found = false;
                for (let i = 0; i < glz.gameObjects.length; i++) {
                    let c = glz.gameObjects[i];
                    if (c.targeteable != undefined) {
                        let collision = false;
                        if (glz.mouse.intersect(c)) collision = true;
                        if (collision && !this.mouseMovedWhenClicking) {
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


        } else {
            this.mouseMovedWhenClicking = false;
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