// Libreria para la creacion de videojuegos web licenciada bajo: [MIT License].
//=================================================================================
// GameLibZeroWEB - 4Div - 2024 - By Erkosone. v1.0 
//=================================================================================
import * as glz from '../../library/4Div.js';
const Process = glz.GameObject; const GameObject = glz.GameObject; const JoyStick = glz.JoyStick; const StringList = glz.StringList; const Scroll = glz.Scroll; const Write = glz.Write; const LoadImages = glz.LoadImages; const LoadSounds = glz.LoadSounds; const Camera3d = glz.Camera3d; const PointLight = glz.PointLight; const SoundPlayTimed = glz.SoundPlayTimed; const LoadModels = glz.LoadModels; const EGUIbutton = glz.EGUIbutton; const EGUIgbutton = glz.EGUIgbutton; const EGUIinputBox = glz.EGUIinputBox; const LoadFonts = glz.LoadFonts;
const fadeOff = glz.fadeOff; const fadeOn = glz.fadeOn; const setFog = glz.setFog; const setMode = glz.setMode; const setFps = glz.setFps; const setFadingColor = glz.setFadingColor; const setBackgroundColor = glz.setBackgroundColor; const enableShadows = glz.enableShadows; const abs = glz.abs; const sin = glz.sin; const cos = glz.cos; const rand = glz.rand; const randInt = glz.randInt; const random = glz.random; const radians = glz.radians; const degrees = glz.degrees; const str = glz.str; const int = glz.int; const isInteger = glz.isInteger; const millis = glz.millis; const setTitle = glz.setTitle; const textInfo = glz.textInfo; const map = glz.map; const screenDrawGraphic = glz.screenDrawGraphic; const screenDrawSprite = glz.screenDrawSprite; const getObject = glz.getObject; const exists = glz.exists; const getGameObjectById = glz.getGameObjectById; const signal = glz.signal; const signalType = glz.signalType; const letMeAlone = glz.letMeAlone; const getOrientation = glz.getOrientation; const setTexture = glz.setTexture; const loadTexture = glz.loadTexture; const fileExists = glz.fileExists; const generateUUID = glz.generateUUID; const isMobile = glz.isMobile; const download = glz.download; const soundSetMasterVolume = glz.soundSetMasterVolume; const SoundFade = glz.soundFade; const soundPlay = glz.soundPlay; const soundStop = glz.soundStop; const soundSetVolume = glz.soundSetVolume; const soundIsPlaying = glz.soundIsPlaying; const key = glz.key; const setAmbientLight = glz.setAmbientLight; const lockEGUI = glz.lockEGUI; const unlockEGUI = glz.unlockEGUI; const getDistance2d = glz.getDistance2d; const getDistance = glz.getDistance; const getAngle = glz.getAngle; const setGravity = glz.setGravity; const mixamoMerger = glz.mixamoMerger;
const s_kill = glz.s_kill; const s_unprotected = glz.s_unprotected; const s_protected = glz.s_protected; const LEFT = glz.LEFT; const RIGHT = glz.RIGHT; const CENTER = glz.CENTER; const NET_TOK_DATA = glz.NET_TOK_DATA; const SOCKET_CONNECTED = glz.SOCKET_CONNECTED; const SOCKET_CLOSED = glz.SOCKET_CLOSED; const SOCKET_ERROR = glz.SOCKET_ERROR; const SOCKET_NULL = glz.SOCKET_NULL; const WHITE = glz.WHITE; const SILVER = glz.SILVER; const GRAY = glz.GRAY; const BLACK = glz.BLACK; const RED = glz.RED; const MAROON = glz.MAROON; const YELLOW = glz.YELLOW; const OLIVE = glz.OLIVE; const LIME = glz.LIME; const GREEN = glz.GREEN; const BLUE = glz.BLUE; const PINK = glz.PINK; const PURPLE = glz.PURPLE; const ORANGE = glz.ORANGE; const BASIC = glz.BASIC; const LAMBERT = glz.LAMBERT; const WIRED = glz.WIRED; const STANDARD = glz.STANDARD; const TOON = glz.TOON; const PHONG = glz.PHONG; const TEXTURED = glz.TEXTURED; const TYPE_BOX = glz.TYPE_BOX; const TYPE_SPHERE = glz.TYPE_SPHERE; const TYPE_PLANE = glz.TYPE_PLANE; const TYPE_CYLINDER = glz.TYPE_CYLINDER; const _UP = glz._UP; const _DOWN = glz._DOWN; const _LEFT = glz._LEFT; const _RIGHT = glz._RIGHT; const _ENTER = glz._ENTER; const _ESC = glz._ESC; const _SPACE = glz._SPACE; const _SHIFT = glz._SHIFT; const _CONTROL = glz._CONTROL; const _BLOCK_SHIFT = glz._BLOCK_SHIFT; const _TAB = glz._TAB; const _Q = glz._Q; const _W = glz._W; const _E = glz._E; const _R = glz._R; const _T = glz._T; const _Y = glz._Y; const _U = glz._U; const _I = glz._I; const _O = glz._O; const _P = glz._P; const _A = glz._A; const _S = glz._S; const _D = glz._D; const _F = glz._F; const _G = glz._G; const _H = glz._H; const _J = glz._J; const _K = glz._K; const _L = glz._L; const _Ñ = glz._Ñ; const _Z = glz._Z; const _X = glz._X; const _C = glz._C; const _V = glz._V; const _B = glz._B; const _N = glz._N; const _M = glz._M; const _COMA = glz._COMA; const _PUNTO = glz._PUNTO; const _GUION = glz._GUION; const _1 = glz._1; const _2 = glz._2; const _3 = glz._3; const _4 = glz._4; const _5 = glz._5; const _6 = glz._6; const _7 = glz._7; const _8 = glz._8; const _9 = glz._9; const _0 = glz._0; const _DEconstE = glz._DEconstE; const _END = glz._END; const _PAGEDOWN = glz._PAGEDOWN; const all_sound = glz.all_sound;
//=================================================================================
let WIDTH;
let HEIGHT;
let ST = 0;         // maquina de estados del codigo principal de la aplicacion..
let text_inicio;
var loader = [];    // array de loaders para la carga de diferentes tipos de recursos por separado..
let img = [];       // array de imagenes para pixi..
let snd = [];       // array de sonidos para waud..
let mod = [];       // array de modelos 3d..
let fnt = [];
let idGame;         // puntero al proceso principal..
const dataPath = "data/00_TUTORIAL_ClienteServidor_mmo/";

let netClients = [];
const NET_PLAYER_MAX_DISTANCE_AUTO_ADJUST_POSITION = 50;    // si el player en red recive su posicion y esta a mas de esta distancia.. no se interpolara la posicion, se ajustara de una vez.
const NET_PLAYER_MIN_DISTANCE_AUTO_ADJUST_POSITION = 10;      // si estas muy cerca del destino te colocas ya ahi.. evita pequeños ajustes super lentos..

window.setup = function () {
    setBackgroundColor(WHITE);          // color de fondo de pantalla..
    setFadingColor(0xffffff);           // color del fade de pantalla..
    enableShadows(false);               // activa el sistema de sobras..
    setMode(1280 / 2, 720 / 2, false, true);    // define la resolucion grafica..
    setFps(60);                         // limita los fotogramas por segundo..
    setFog(0, 250);                     // configura la niebla del entorno 3d..
    setAmbientLight(WHITE, 1);          // iluminacion ambiental de la escena 3d..
    fadeOff(0);                         // apaga inmediatamente la pantalla 0 ms..
    fadeOn(1000);                       // enciendo la pantalla durante 1 segundo..
}

window.main = function () {
    switch (ST) {
        case 0:
            WIDTH = glz.WIDTH;
            HEIGHT = glz.HEIGHT;
            text_inicio = new glz.Write(null, 32, "TOUCH TO START", CENTER, glz.WIDTH / 2, glz.HEIGHT / 2, BLUE, 1);
            ST = 10;
            break;
        case 10:
            if (glz.mouse.left) {
                text_inicio.text = "loading assets..";
                text_inicio.color = 0x000000;
                //loader[0] = new LoadImages("data/00_TUTORIAL_ClienteServidor_mmo/images/", 0);
                //loader[1] = new LoadSounds("data/00_TUTORIAL_ClienteServidor_mmo/sounds/", 0);
                //let lista = [];
                //lista.push("data/00_TUTORIAL_ClienteServidor_mmo/models/yourModelFilename.ext");
                //loader[2] = new LoadModels(lista);

                ST = 20;
            }
            break;
        case 20:
            let loaderReady = true;
            for (let i = 0; i < loader.length; i++) {
                if (loader[i].ready == false) {
                    loaderReady = false;
                }
            }
            if (loaderReady) {
                //img = loader[0].get();
                //snd = loader[1].get();
                //mod = loader[2].get();
                fadeOff(500);
                ST = 30;
            }
            break;
        case 30:
            if (!glz.fading) {
                signal(text_inicio, glz.s_kill);
                letMeAlone();
                idGame = new Game();
                ST = 40;
            }
            break;
        case 40:

            break;
    }
}
//---------------------------------------------------------------------------------
window.event_game_inNick = function () {
    idGame.nick = glz._id_.get();
}
//---------------------------------------------------------------------------------
window.event_game_sendButton = function () {
    if (idGame.nick != "") {
        idGame.onClick_sendButton();
    } else {
        alert("Debes introducir un nick valido!");
    }

}
//---------------------------------------------------------------------------------
class Game extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.nick = "";
        this.controls = "0000";    // left right up down..
        this.oldControls = "0000"; // left right up down..
    }
    initialize() {
        fadeOn(1000);
    }
    frame() {
        switch (this.st) {
            case 0:
                glz.socketOpen("ws://localhost", 9080);
                this.counter = 0;
                this.st = 2;
                break;
            case 2:
                switch (glz.socketStatus()) {
                    case SOCKET_CONNECTED:
                        alert("SOCKET_CONNECTED");
                        this.st = 10;
                        break;
                    case SOCKET_CLOSED:
                        alert("SOCKET_CLOSED");
                        this.st = 0;
                        break;
                    case SOCKET_ERROR:
                        alert("SOCKET_ERROR");
                        this.st = 0;
                        break;
                }
                break;
            case 10:
                // actualizar estado controles..
                this.netSendControls();
                this.checkConnectionStatus();
                break;
        }
    }
    checkConnectionStatus() {
        switch (glz.socketStatus()) {
            case SOCKET_CONNECTED:
                //..
                break;
            case SOCKET_CLOSED:
                alert("SOCKET_CLOSED");
                //window.location.reload();
                letMeAlone();
                this.st = 0;
                break;
            case SOCKET_ERROR:
                alert("SOCKET_ERROR");
                //window.location.reload();
                letMeAlone();
                this.st = 0;
                break;
        }
    }
    netSendControls() {
        this.oldControls = this.controls;
        this.controls = "0000";
        if (key(_LEFT)) this.controls = this.controls.replaceAt(0, "1");
        if (key(_RIGHT)) this.controls = this.controls.replaceAt(1, "1");
        if (key(_UP)) this.controls = this.controls.replaceAt(2, "1");
        if (key(_DOWN)) this.controls = this.controls.replaceAt(3, "1");
        if (this.controls != this.oldControls) {
            let m = new glz.NetMessage();
            m.add("update_controls");
            m.add(this.controls);
            m.send();
        }
    }
    onClick_sendButton() {
        this.st = 100;
    }
    RCV_update_nick() {
        this.st = 120;
    }

}
//---------------------------------------------------------------------------------
class NetClient extends GameObject {
    constructor(id, x, y) {
        super();
        this.st = 0;
        this.remoteId = id;
        this.offset = new glz.Vector2(0, 0);        // posicion en el mundo donde se muestra animado..
        this.RCVoffset = new glz.Vector2(x, y);   // posicion en el mundo donde esta realmente..
        netClients.push(this);
    }
    initialize() {

    }
    finalize() {

    }
    frame() {
        switch (this.st) {
            case 0:
                this.newGraph(10, 10);
                this.tint(RED);
                this.st = 10;
                break;
            case 10:
                this.mover();
                this.old_x = this.offset.x;
                this.old_y = this.offset.y;
                //console.log(this.x, this.y);
                break;
            case 20:

                break;
            case 30:

                break;
        }
    }
    mover() {
        let dx = this.RCVoffset.x - this.offset.x;
        let dy = this.RCVoffset.y - this.offset.y;
        if (dx > 0) {
            this.mirrorx = false;
        } else if (dx < 0) {
            this.mirrorx = true;
        }
        if (Math.abs(dx) > NET_PLAYER_MAX_DISTANCE_AUTO_ADJUST_POSITION) {
            this.offset.x += dx;
        } else {
            if (Math.abs(dx) < NET_PLAYER_MIN_DISTANCE_AUTO_ADJUST_POSITION) {
                this.offset.x += dx / 10;
            } else {
                this.offset.x += dx / 20;
            }
        }
        if (Math.abs(dy) > NET_PLAYER_MAX_DISTANCE_AUTO_ADJUST_POSITION) {
            this.offset.y += dy;
        } else {
            if (Math.abs(dy) < NET_PLAYER_MIN_DISTANCE_AUTO_ADJUST_POSITION) {
                this.offset.y += dy / 10;
            } else {
                this.offset.y += dy / 20;
            }
        }
        //this.x = this.offset.x - idCam.offset.x;
        //this.y = this.offset.y - idCam.offset.y;
        this.x = this.offset.x;
        this.y = this.offset.y;
    }
    RCVNetPosition(x, y) {
        this.RCVoffset.x = x;
        this.RCVoffset.y = y;
    }
}
//---------------------------------------------------------------------------------
window.onNetEvent = function (msg) {
    console.log(msg);
    switch (msg[0]) {
        case "playerArround_enter":
            let id = 0;
            let x = 0;
            let y = 0;
            for (let i = 1; i < msg.length; i++) {
                let params = msg[i].split(":");
                switch (params[0]) {
                    case "id":
                        id = params[1];
                        break;
                    case "x":
                        x = params[1];
                        break;
                    case "y":
                        y = params[1];
                        break;
                }
            }
            new NetClient(id, x, y);    // creo proceso player en red con su ID en el servidor y el nick..
            break;

        case "playerArround_leave":
            for (let i = 0; i < netClients.length; i++) {
                if (netClients[i].remoteId == msg[1].split(":")[1]) {
                    signal(netClients[i], s_kill);
                }
            }
            break;

        case "playerPosition":
            for (let i = 0; i < netClients.length; i++) {
                if (netClients[i].remoteId == msg[1].split(":")[1]) {
                    netClients[i].RCVNetPosition(msg[2].split(":")[1], msg[3].split(":")[1]);
                }
            }
            break;

        case "playerDisconnect":
            for (let i = 0; i < netClients.length; i++) {
                if (netClients[i].remoteId == msg[1]) {
                    signal(netClients[i], s_kill);
                }
            }
            break;

        default:
            console.log("ERROR: [" + msg[0] + "] NET COMMAND NOT RECOGNIZED!");
            break;
    }
}
//---------------------------------------------------------------------------------