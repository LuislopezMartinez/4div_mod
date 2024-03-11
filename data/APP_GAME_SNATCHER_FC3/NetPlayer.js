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
    }
    initialize() {
        glz.signal(this, glz.s_protected);
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

                    window.idCam = new glz.Cam();
                    window.idCam.setTargetHeight(30);
                    window.idCam.setTarget(this);
                    window.idCam.setTargetDistance(20, 40);
                    window.idCam.setCollision(true);
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
                    window.idCam.setRotation(1);
                }

                this.mover();


                break;
            case 40:

                break;
            case 50:

                break;
        }
    }
    mover() {
        //..
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
