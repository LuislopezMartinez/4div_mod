import * as glz from '../../library/4Div.js';
import * as vars from './globalVariables.js';
window.idCam = undefined;
window.localPlayer = undefined;
//---------------------------------------------------------------------------------
window.EVENT_touchscreen_start = function (event) {
    if (window.localPlayer != undefined) {

        let handleStart_a_ok = false;
        let joyCam = window.localPlayer.idGame.idTouchControls.joyCam;
        let xmin = joyCam.initx - joyCam.width / 2;
        let xmax = joyCam.initx + joyCam.width / 2;
        let ymin = joyCam.inity - joyCam.height / 2;
        let ymax = joyCam.inity + joyCam.height / 2;
        if (event.x > xmin && event.x < xmax && event.y > ymin && event.y < ymax) {
            // evento touch iniciado encima de un joy.. no es posible targetear..
        } else {
            handleStart_a_ok = true;
        }

        let handleStart_b_ok = false;
        let joyMov = window.localPlayer.idGame.idTouchControls.joyCam;
        xmin = joyMov.initx - joyMov.width / 2;
        xmax = joyMov.initx + joyMov.width / 2;
        ymin = joyMov.inity - joyMov.height / 2;
        ymax = joyMov.inity + joyMov.height / 2;
        if (event.x > xmin && event.x < xmax && event.y > ymin && event.y < ymax) {
            // evento touch iniciado encima de un joy.. no es posible targetear..
        } else {
            handleStart_b_ok = true;
        }

        // todo dispuesto ok para poder checkear si hay target o no..
        if (handleStart_a_ok && handleStart_a_ok) {
            // window.localPlayer.mobileValidTouchpoints.push(event);
            let idTargetManager = window.localPlayer.idGame.idTargetManager;
            idTargetManager.targetMobileRuntime(event);
        }

    }
}
window.EVENT_touchscreen_end = function (event) {
    for (let i = 0; i < window.localPlayer.mobileValidTouchpoints.length; i++) {
        if (window.localPlayer.mobileValidTouchpoints[i].id == event.id) {
            window.localPlayer.mobileValidTouchpoints.splice(i, 1);
        }
    }
}
//---------------------------------------------------------------------------------
export class NetClient extends glz.GameObject {
    constructor(id, x, y, z, model, fnt, tex) {
        super();
        this.st = 0;
        this.remoteId = id;
        this.offset = new glz.Vector3(0, 0, 0);        // posicion en el mundo donde se muestra animado..
        this.RCVoffset = new glz.Vector3(x, y, z);   // posicion en el mundo donde esta realmente..
        vars.netClients.push(this);
        this.modelo = model;
        this.local = false;
        this.remoteAngle = 0;
        this.nick = "";
        this.idTextNick = new glz.Write(fnt, 22, this.nick, glz.CENTER, this.x, this.y, glz.YELLOW, 1);
        this.idGame = undefined;
        glz.signal(this.idTextNick, glz.s_protected);
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.velocity = 0.20;
        this.idJoy = { up: false, down: false, left: false, right: false };

        this.syncro_frame_counter = 0;  // los frames que hace que se sincronizó el objeto..
        this.syncro_distance = 10;
        this.syncro_x = 0;
        this.syncro_y = 0;
        this.syncro_z = 0;
        this.syncro_a = 0;
        this.moved = false;
        this.subAnimatorModel = undefined;
        this.remoteControls = "0000";
        this.target = undefined;
        this.mobileValidTouchpoints = [];
        this.openChatDelay = 0;

        this.tex = tex;     // texturas cargadas al inicio del juego..
        this.skin = 0;
    }
    initialize() {
        glz.signal(this, glz.s_protected);
    }
    finalize() {
        glz.signal(this.idTextNick, glz.s_unprotected);
        glz.signal(this.idTextNick, glz.s_kill);
        for (var i = 0; i < vars.netClients.length; i++) {
            if (this == vars.netClients[i]) {
                vars.netClients.splice(i, 1);
            }
        }
        glz.signal(this.idJoy, glz.s_kill);
    }
    setSkin(skinNumber) {
        this.skin = skinNumber;
    }
    setLocalPlayer(value) {
        this.local = value;
    }
    set_IDGAME_pointer(value) {
        this.idGame = value;
    }
    setNick(value) {
        this.nick = value;
    }
    updateNickPosition() {
        let vec = this.mesh.position;
        let pos = this.worldToScreen(vec.add(new glz.Vector3(0, 15, 0)));
        this.idTextNick.x = pos.x;
        this.idTextNick.y = pos.y;
        this.idTextNick.setText(this.remoteId + " - " + this.nick);
    }
    frame() {
        switch (this.st) {
            case 0:
                this.visible = false;
                this.size = 1;
                this.y = 10;
                this.createSphere(5);
                if (this.local == true) {
                    window.localPlayer = this;
                    this.idTextNick.setColor(glz.YELLOW);
                    this.createBody(glz.TYPE_SPHERE);
                    window.idCam = new glz.Cam();
                    window.idCam.setTargetHeight(10);
                    window.idCam.setTarget(this);
                    window.idCam.setTargetDistance(10, 40);
                    window.idCam.setCollision(true);
                    if (glz.isMobile()) {
                        window.idCam.setMouseControl(false);
                        glz.mouse.setEventStart("EVENT_touchscreen_start");
                        glz.mouse.setEventEnd("EVENT_touchscreen_end");
                    } else {
                        window.idCam.setMouseControl(true);
                        window.idCam.setMouseKey('right');
                    }


                } else {
                    this.idTextNick.setColor(glz.WHITE);
                    this.x = this.RCVoffset.x;
                    this.y = this.RCVoffset.y;
                    this.z = this.RCVoffset.z;
                }
                this.subAnimatorModel = new NetClient_SUB_animator();
                this.st = 10;
                break;
            case 10:
                if (this.idGame.ready == true) {

                    this.st = 30;
                }
                break;

            case 30:

                if (this.local) {
                    this.chatController();
                    this.controls();
                    this.moverLocal();
                    this.syncPlayer();
                } else {
                    this.moverRemoto();
                }
                this.updateNickPosition();
                break;
        }
    }
    chatController() {
        if (this.openChatDelay > 0) this.openChatDelay--;
        if (glz.key(glz._ENTER)) {
            this.idGame.idChat.openChatRemotely();
            this.openChatDelay = 60;
        }
    }
    syncPlayer() {
        let dx = this.x - this.syncro_x;
        let dy = this.y - this.syncro_y;
        let dz = this.z - this.syncro_z;
        this.syncro_frame_counter++;
        if (glz.abs(dx) > this.syncro_distance || glz.abs(dy) > this.syncro_distance || glz.abs(dz) > this.syncro_distance) {
            this.netSyncPlayer();
        } else {
            if (this.syncro_x != glz.int(this.x) || this.syncro_y != glz.int(this.y) || this.syncro_z != glz.int(this.z)) {
                if (this.syncro_frame_counter > 30) {
                    this.netSyncPlayer();
                }
            }
        }
    }

    netSyncPlayer() {
        this.syncro_frame_counter = 0;

        this.syncro_x = glz.int(this.x);
        this.syncro_y = glz.int(this.y);
        this.syncro_z = glz.int(this.z);
        this.syncro_a = window.idCam.lon;

        let controls = "";
        if (this.left) { controls += 'L'; } else { controls += '0'; }
        if (this.right) { controls += 'R'; } else { controls += '0'; }
        if (this.up) { controls += 'U'; } else { controls += '0'; }
        if (this.down) { controls += 'D'; } else { controls += '0'; }

        let m = new glz.NetMessage();
        m.add("netSyncPlayer");
        m.add(this.syncro_x);
        m.add(this.syncro_y);
        m.add(this.syncro_z);
        m.add(this.syncro_a.toFixed(2));
        m.add(controls);
        m.send();
    }

    controls() {
        this.moved = false;
        if (glz.key(glz._UP) || this.idJoy.up) {
            this.up = true;
            this.moved = true;
        } else {
            this.up = false;
        }
        if (glz.key(glz._DOWN) || this.idJoy.down) {
            this.down = true;
            this.moved = true;
        } else {
            this.down = false;
        }
        if (glz.key(glz._LEFT) || this.idJoy.left) {
            this.left = true;
            this.moved = true;
        } else {
            this.left = false;
        }
        if (glz.key(glz._RIGHT) || this.idJoy.right) {
            this.right = true;
            this.moved = true;
        } else {
            this.right = false;
        }
    }

    moverLocal() {
        if (this.left) {
            this.addImpulseFromCamera(this.velocity, 90, window.idCam);
        }
        if (this.right) {
            this.addImpulseFromCamera(this.velocity, -90, window.idCam);
        }
        if (this.up) {
            this.addImpulseFromCamera(this.velocity, 0, window.idCam);
        }
        if (this.down) {
            this.addImpulseFromCamera(this.velocity, 180, window.idCam);
        }
        this.brakeX(0.8);
        this.brakeZ(0.8);
    }

    moverRemoto() {
        let dx = this.x - this.RCVoffset.x;
        let dy = this.y - this.RCVoffset.y;
        let dz = this.z - this.RCVoffset.z;

        dx /= 30;
        dy /= 30;
        dz /= 30;

        const max = 0.20;
        if (dx > max) dx = max;
        if (dx < -max) dx = -max;
        if (dy > max) dy = max;
        if (dy < -max) dy = -max;
        if (dz > max) dz = max;
        if (dz < -max) dz = -max;

        this.x -= dx;
        this.y -= dy;
        this.z -= dz;
    }

    RCVNetPosition(msg) {
        //let id = msg[1].split(":")[1];
        let x = msg[2].split(":")[1];
        let y = msg[3].split(":")[1];
        let z = msg[4].split(":")[1];
        let angle = msg[5].split(":")[1];
        let remoteControls = msg[6].split(":")[1];
        let skin = msg[7].split(":")[1];

        this.RCVoffset.x = x;
        this.RCVoffset.y = y;
        this.RCVoffset.z = z;
        this.remoteAngle = angle;
        this.remoteControls = remoteControls;
        this.setSkin(glz.int(skin));
    }

    RCVChatMessage(msg) {
        let mensaje = this.nick + ": " + msg[3].split(":")[1];
        let c = new NetClient_SUB_chatMessage(mensaje, this.idGame.idChat.fnt);
        c.father = this;
        window.TTS.add(msg[3].split(":")[1], 1.2);
    }

}
//---------------------------------------------------------------------------------
class NetClient_SUB_chatMessage extends glz.GameObject {
    constructor(mensaje, fnt) {
        super();
        this.st = 0;
        this.mensaje = mensaje;
        this.idText;
        this.offset_y = 0;
        this.duracion = 0;
        this.delta_alpha = 0;
        this.fnt = fnt;
    }
    initialize() {
        let trimmed_message = this.trimWhiteSpaces(this.mensaje);
        this.idText = new glz.Write(this.fnt, 22, trimmed_message, glz.CENTER, this.x, this.y, glz.WHITE, 1);
        let palabras = this.mensaje.split(" ").length - 1;
        this.duracion = palabras * (100 / 60);    // 200 palabras por minuto lectura normald e una persona..
        this.duracion *= glz.getFps();
        this.delta_alpha = 0.9 / this.duracion;
    }
    finalize() {
        glz.signal(this.idText, glz.s_kill);
    }
    frame() {
        this.duracion--;
        if (this.duracion == 0) glz.signal(this, glz.s_kill);
        this.update();
    }
    update() {
        this.idText.x = this.father.idTextNick.x;
        this.idText.y = this.father.idTextNick.y - 20 - this.offset_y;
        this.idText.alpha -= this.delta_alpha;
        this.offset_y += 0.25;
    }
    trimWhiteSpaces(str) {
        let output = "";
        output += str[0];
        for (let i = 1; i < str.length; i++) {
            if (str[i - 1] == ' ' && str[i] == ' ') {
                //..
            } else {
                output += str[i];
            }
        }
        return output;
    }
}
//---------------------------------------------------------------------------------
class NetClient_SUB_animator extends glz.GameObject {
    constructor() {
        super();
        this.st = 0;
        this.x = this.father.x;
        this.y = this.father.y - 5;
        this.z = this.father.z;
        glz.signal(this, glz.s_protected);
        this.modelo;
        this.skin = 0;

        this.targeteable = true;

    }
    setSkin(skinNumber) {
        this.skin = skinNumber;
        this.setTexture(this.father.tex[this.skin]);
    }
    getTarget() {
        return this.father;
    }
    initialize() {
        this.visible = false;
        this.size = 0.05;
        // unir modelo y animaciones en un solo modelo multi-animado..
        this.modelo = glz.mixamoMerger(this.father.modelo);
        // establecer el nuevo modelo a este objeto..
        this.setModel(this.modelo);
        // aplicar skin..
        //this.setTexture(this.father.tex[this.skin]);
        this.clipSet(0);
        this.clipPlay();
    }
    finalize() {

    }


    frame() {
        if (!glz.exists(this.father)) {
            glz.signal(this, glz.s_unprotected);
            glz.signal(this, glz.s_kill);
        } else {

            if (this.skin != this.father.skin) {
                this.setSkin(this.father.skin);
            }

        }
        switch (this.st) {
            case 0:
                if (this.father.idGame.ready == true) {
                    this.visible = true;
                    this.st = 10;
                }
                break;
            case 10:
                this.x = this.father.x;
                this.y = this.father.y - 5;
                this.z = this.father.z;

                if (this.father.local) {
                    // ajusto angulo del personaje cuando me muevo..
                    if (this.father.moved) {
                        this.angley = window.idCam.lon;
                    }

                    if (this.father.moved) {
                        let anima = 0;
                        if (this.father.up) anima = 1;
                        if (this.father.down) anima = 1;
                        if (this.father.left) anima = 3;
                        if (this.father.right) anima = 2;
                        this.clipSwitch(anima, 250);
                    } else {
                        this.clipSwitch(0, 250);
                    }

                } else {

                    let delta = this.angley - this.father.remoteAngle;
                    if (this.angley < this.father.remoteAngle) {
                        if (glz.abs(delta) > 180) {
                            // evitar giros mayores de 180º casuales..
                        } else {
                            this.angley += glz.abs(delta) / 20;
                        }
                    } else if (this.angley > this.father.remoteAngle) {
                        if (glz.abs(delta) > 180) {
                            // evitar giros mayores de 180º casuales..
                        } else {
                            this.angley -= glz.abs(delta) / 20;
                        }
                    }

                    let dx = this.x - this.oldx;
                    let dz = this.z - this.oldz;
                    let v = glz.abs(dx) + glz.abs(dz);
                    if (v > 0.05) {

                        if (this.father.remoteControls.includes("L")) {
                            this.clipSwitch(3, 250);
                        } else if (this.father.remoteControls.includes("R")) {
                            this.clipSwitch(2, 250);
                        } else {
                            this.clipSwitch(1, 250);
                        }

                    } else {
                        this.clipSwitch(0, 250);
                    }
                }

                break;
        }
    }
}
//---------------------------------------------------------------------------------