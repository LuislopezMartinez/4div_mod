import * as glz from '../../library/4Div.js';
import * as vars from './globalVariables.js';
let idCam = undefined;
//---------------------------------------------------------------------------------
export class NetClient extends glz.GameObject {
    constructor(id, x, y, z, model) {
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
        this.idTextNick = new glz.Write(null, 22, this.nick, glz.CENTER, this.x, this.y, glz.YELLOW, 1);
        this.idGame = undefined;
        glz.signal(this.idTextNick, glz.s_protected);
    }
    initialize() {

    }
    finalize() {
        glz.signal(this.idTextNick, glz.s_unprotected);
        glz.signal(this.idTextNick, glz.s_kill);
    }
    setLocalPlayer(value) {
        this.local = value;
    }
    set_IDGAME_pointer(value) {
        this.idGame = value;
    }
    frame() {
        switch (this.st) {
            case 0:
                this.idTextNick.visible = false;
                this.visible = false;
                this.size = 20;
                this.setModel(this.modelo);
                if (this.local == true) {

                    idCam = new glz.Cam();
                    idCam.setTargetHeight(10);
                    idCam.setTargetDistance(20, 40);
                    idCam.setTarget(this);

                    /*
                    idCam = new glz.Camera3d();
                    idCam.setPosition(0, 0, 50);
                    idCam.setTarget(this);
                    idCam.setTargetDistance(60);
                    idCam.setFreeMoveDistance(10);
                    idCam.setRotation(180);
                    idCam.setAzimut(-45);
                    idCam.setMouseControl(false);
                    */
                }
                this.st = 10;
                break;
            case 10:

                let m = new glz.NetMessage();
                m.add("netGetNickByID");
                m.add(this.remoteId);
                m.send();

                this.st = 20;
                break;
            case 20:
                // limbo..
                // esperando nick de este player..
                break;
            case 22:
                if (this.idGame.ready == true) {
                    this.idTextNick.visible = true;
                    this.visible = true;
                    this.st = 30;
                }
                break;
            case 30:

                if (glz.key(glz._SPACE)) {
                    //idCam.advance(1);
                    idCam.setRotation(1);
                }

                this.mover();
                this.old_x = this.offset.x;
                this.old_y = this.offset.y;
                this.old_z = this.offset.z;
                let vec = this.worldToScreen();
                this.idTextNick.x = vec.x;
                this.idTextNick.y = vec.y - 150;
                this.idTextNick.setText(this.nick);

                break;
            case 40:

                break;
            case 50:

                break;
        }
    }
    mover() {

        let dx = this.RCVoffset.x - this.offset.x;
        let dy = this.RCVoffset.y - this.offset.y;
        let dz = this.RCVoffset.z - this.offset.z;

        if (dx > 0) {
            this.mirrorx = false;
        } else if (dx < 0) {
            this.mirrorx = true;
        }

        if (Math.abs(dx) > vars.NET_PLAYER_MAX_DISTANCE_AUTO_ADJUST_POSITION) {
            this.offset.x += dx;
        } else {
            if (Math.abs(dx) < vars.NET_PLAYER_MIN_DISTANCE_AUTO_ADJUST_POSITION) {
                this.offset.x += dx / 10;
            } else {
                this.offset.x += dx / 20;
            }
        }

        if (Math.abs(dy) > vars.NET_PLAYER_MAX_DISTANCE_AUTO_ADJUST_POSITION) {
            this.offset.y += dy;
        } else {
            if (Math.abs(dy) < vars.NET_PLAYER_MIN_DISTANCE_AUTO_ADJUST_POSITION) {
                this.offset.y += dy / 10;
            } else {
                this.offset.y += dy / 20;
            }
        }

        if (Math.abs(dz) > vars.NET_PLAYER_MAX_DISTANCE_AUTO_ADJUST_POSITION) {
            this.offset.z += dz;
        } else {
            if (Math.abs(dz) < vars.NET_PLAYER_MIN_DISTANCE_AUTO_ADJUST_POSITION) {
                this.offset.z += dz / 10;
            } else {
                this.offset.z += dz / 20;
            }
        }

        this.x = this.offset.x;
        this.y = this.offset.y;
        this.z = this.offset.z;

        this.angley = this.remoteAngle - 270;

    }
    RCVNetPosition(msg) {
        let id = msg[1].split(":")[1];
        let x = msg[2].split(":")[1];
        let y = msg[3].split(":")[1];
        let z = msg[4].split(":")[1];
        let angle = msg[5].split(":")[1];

        this.RCVoffset.x = x;
        //this.RCVoffset.y = y;
        this.RCVoffset.z = z;
        this.remoteAngle = angle;
    }
}
