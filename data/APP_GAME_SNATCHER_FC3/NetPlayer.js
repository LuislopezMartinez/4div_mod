import * as glz from '../../library/4Div.js';
import * as vars from './globalVariables.js';
window.idCam = undefined;
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
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.velocity = 0.25;

        this.syncro_frame_counter = 0;  // los frames que hace que se sincronizó el objeto..
        this.syncro_distance = 10;
        this.syncro_x = 0;
        this.syncro_y = 0;
        this.syncro_z = 0;
        this.syncro_a = 0;

    }
    initialize() {
        glz.signal(this, glz.s_protected);
        console.log(this.remoteId);
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
                this.size = 1;
                this.y = 10;
                this.createSphere(5);
                if (this.local == true) {
                    this.createBody(glz.TYPE_SPHERE);
                    window.idCam = new glz.Cam();
                    window.idCam.setTargetHeight(10);
                    window.idCam.setTarget(this);
                    window.idCam.setTargetDistance(20, 40);
                    window.idCam.setCollision(true);
                } else {
                    this.x = this.RCVoffset.x;
                    this.y = this.RCVoffset.y;
                    this.z = this.RCVoffset.z;
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

                if (this.local) {
                    this.controls();
                    this.moverLocal();
                    this.syncPlayer();
                } else {
                    this.moverRemoto();
                }

                break;
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

        let m = new glz.NetMessage();
        m.add("netSyncPlayer");
        m.add(this.syncro_x);
        m.add(this.syncro_y);
        m.add(this.syncro_z);
        m.add(this.syncro_a.toFixed(2));
        m.send();
    }

    controls() {
        if (glz.key(glz._UP)) {
            this.up = true;
        } else {
            this.up = false;
        }
        if (glz.key(glz._DOWN)) {
            this.down = true;
        } else {
            this.down = false;
        }
        if (glz.key(glz._LEFT)) {
            this.left = true;
        } else {
            this.left = false;
        }
        if (glz.key(glz._RIGHT)) {
            this.right = true;
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

        const max = 0.25;
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
        let id = msg[1].split(":")[1];
        let x = msg[2].split(":")[1];
        let y = msg[3].split(":")[1];
        let z = msg[4].split(":")[1];
        let angle = msg[5].split(":")[1];

        this.RCVoffset.x = x;
        this.RCVoffset.y = y;
        this.RCVoffset.z = z;
        this.remoteAngle = angle;
    }

}
