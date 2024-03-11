// Libreria para la creacion de videojuegos web licenciada bajo: [MIT License].
//=================================================================================
// GameLibZeroWEB - 4Div - 2024 - By Erkosone. v1.0 
//=================================================================================
import * as glz from '../../library/4Div.js';
import * as vars from './globalVariables.js';
import * as es0 from './escenaTitulo.js';
import * as es1 from './escenaMundo.js';
import * as net from './NetPlayer.js';
const Process = glz.GameObject; const GameObject = glz.GameObject; const JoyStick = glz.JoyStick; const StringList = glz.StringList; const Scroll = glz.Scroll; const Write = glz.Write; const LoadImages = glz.LoadImages; const LoadSounds = glz.LoadSounds; const Camera3d = glz.Camera3d; const PointLight = glz.PointLight; const SoundPlayTimed = glz.SoundPlayTimed; const LoadModels = glz.LoadModels; const EGUIbutton = glz.EGUIbutton; const EGUIgbutton = glz.EGUIgbutton; const EGUIinputBox = glz.EGUIinputBox; const LoadFonts = glz.LoadFonts; const Storage = glz.Storage;
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
const dataPath = "data/APP_GAME_SNATCHER_FC3/";
let data = new Storage();
let idPlayer;

window.setup = function () {
    setBackgroundColor(0x333333);          // color de fondo de pantalla..
    setFadingColor(BLACK);           // color del fade de pantalla..
    enableShadows(false);               // activa el sistema de sobras..
    setMode(1280, 720, false, true);   // define la resolucion grafica..
    setFps(60);                         // limita los fotogramas por segundo..
    setFog(0, 250);                     // configura la niebla del entorno 3d..
    setAmbientLight(WHITE, 1);          // iluminacion ambiental de la escena 3d..
    fadeOff(0);                         // apaga inmediatamente la pantalla 0 ms..
    fadeOn(500);                       // enciendo la pantalla durante 1 segundo..
    soundSetMasterVolume(.1);
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
                loader[0] = new LoadImages("data/APP_GAME_SNATCHER_FC3/images/", 5);
                loader[1] = new LoadSounds("data/APP_GAME_SNATCHER_FC3/sounds/", 5);

                let list = [];
                list.push("data/APP_GAME_SNATCHER_FC3/fonts/MSX-Screen0.ttf");
                list.push("data/APP_GAME_SNATCHER_FC3/fonts/MSX-Screen1.ttf");
                list.push("data/APP_GAME_SNATCHER_FC3/fonts/PressStart2P-vaV7.ttf");
                loader[2] = new LoadFonts(list);

                let lista = [];
                lista.push("data/APP_GAME_SNATCHER_FC3/models/OBJ/character-soldier.obj");
                loader[3] = new LoadModels(lista);
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
                img = loader[0].get();
                snd = loader[1].get();
                fnt = loader[2].get();
                mod = loader[3].get();
                fadeOff(500);
                ST = 30;
            }
            break;
        case 30:
            if (!glz.fading) {
                signal(text_inicio, glz.s_kill);
                letMeAlone();
                idGame = new Game();
                soundStop(all_sound, snd);
                fadeOn(1000);
                ST = 40;
            }
            break;
        case 40:

            break;
    }
}
//---------------------------------------------------------------------------------
window.event_game_empezarDeNuevo = function () {
    idGame.onClick_empezarDeNuevo();
}
window.event_game_empezarPartida = function () {
    idGame.onClick_empezarPartida();
}
window.event_game_continuarPartida = function () {
    idGame.onClick_continuarPartida();
}
window.event_game_inNick = function () {
    idGame.onClick_inNick();
}
window.event_game_botonConectar = function () {
    idGame.onClick_botonConectar();
}
//---------------------------------------------------------------------------------
class Game extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.dialog;
        this.botonEmpezar;
        this.botonContinuar;
        this.botonBorrar;
        this.inNick;
        this.botonConectar;
        this.idLabelNickRegistrado;
        this.delay = 0;
        this.ready = false;
    }
    initialize() {
        new Write(fnt[0], 14, "UNA PRODUCCION DE:", CENTER, WIDTH / 2, HEIGHT / 2 - 32, 0xa9eca2, 1);
        this.a = new Write(fnt[0], 32, "LUIS LOPEZ MARTINEZ", CENTER, WIDTH / 2, HEIGHT / 2, WHITE, 1);
        new Write(fnt[1], 16, "4Div_mod - 2024", CENTER, WIDTH / 2, HEIGHT / 2 + 32, YELLOW, 1);

        let contador_frase_inicio = 0;
        if (data.contains("contador_frase_inicio")) {
            contador_frase_inicio = data.get("contador_frase_inicio");
            contador_frase_inicio++;
            if (contador_frase_inicio >= vars.frases.length) {
                contador_frase_inicio = 0;
            }
            data.set("contador_frase_inicio", contador_frase_inicio);
        } else {
            data.set("contador_frase_inicio", 0);
        }

        let c = new Write(fnt[0], 18, vars.frases[contador_frase_inicio], CENTER, WIDTH / 2, HEIGHT - 60, LIME, 1);
        let w = c.getWidth();
        new Write(fnt[0], 18, "Frase del dia: ", LEFT, c.x - w / 2, HEIGHT - 60, WHITE, 1);

        soundPlay(snd[0], false, 0.2);
        fadeOn(2000);
    }
    frame() {
        switch (this.st) {
            case 0:
                if (!soundIsPlaying(snd[0]) || glz.mouse.left) {
                    soundStop(snd[0]);
                    fadeOff(1000);
                    this.st = 10;
                }
                break;
            case 10:
                if (!glz.fading) {
                    letMeAlone();
                    soundPlay(snd[1]);
                    new es0.Suelo(img[2]);
                    for (let i = 0; i < 30; i++) {
                        new es0.Humo(img[3]);
                    }

                    if (!data.contains("date")) {
                        this.botonEmpezar = new EGUIbutton(fnt[0], 32, "EMPEZAR PARTIDA", WIDTH / 2, 480, WHITE);
                        this.botonEmpezar.setArea(400, 80);
                        this.botonEmpezar.setEvent("event_game_empezarPartida");
                    } else {
                        this.botonBorrar = new EGUIbutton(null, 32, "EMPEZAR DE NUEVO", WIDTH / 2, 500 - 60, WHITE);
                        this.botonBorrar.setArea(400, 80);
                        this.botonBorrar.setColor(RED);
                        this.botonBorrar.setEvent("event_game_empezarDeNuevo");

                        this.botonContinuar = new EGUIbutton(null, 32, "CONTINUAR PARTIDA", WIDTH / 2, 500 + 60, WHITE);
                        this.botonContinuar.setArea(400, 100);
                        this.botonContinuar.setEvent("event_game_continuarPartida");
                        this.idLabelNickRegistrado = new Write(fnt[0], 22, "[" + data.get("nick") + "]", RIGHT, WIDTH / 2 - 190, 530, WHITE, 1);
                        this.idLabelNickRegistrado.z = this.botonContinuar.z + 1;
                    }

                    let c = new Write(fnt[1], 22, "[4DIV_MOD] WebGL 2 GAME FRAMEWORK by Erkosone.", CENTER, WIDTH / 2, 20, BLACK, 1);

                    new es0.Logo(img[1]);
                    new es0.Marco(WIDTH / 2, HEIGHT / 2, PINK);
                    fadeOn(1000);
                    this.st = 20;
                }
                break;
            case 20:
                this.alpha += 0.01;
                break;

            case 100:
                soundPlay(snd[4]);
                data.clear();
                soundStop(snd[1]);
                fadeOff(500);
                this.st = 110;
                break;
            case 110:
                if (!glz.fading) {
                    this.st = 120;
                }
                break;
            case 120:
                this.st = 10;
                break;

            case 200:
                soundPlay(snd[3]);
                //fadeOff(500);
                signal(this.botonEmpezar, s_kill);
                this.inNick = new EGUIinputBox(fnt[0], 32, "Tu Nombre: ", "", WIDTH / 2, 480, 200);
                this.inNick.setLabelColor(WHITE);
                this.inNick.setAutoClear(true);
                this.inNick.setFocus(true);
                this.inNick.setEvent("event_game_inNick");
                this.st = 210;
                break;
            case 210:

                break;

            case 300:
                lockEGUI();
                soundPlay(snd[3]);
                this.st = 500;
                break;

            case 400:
                if (this.inNick.get() != "") {
                    signal(this.botonConectar, s_kill);
                    soundPlay(snd[4]);
                    this.botonConectar = new EGUIbutton(fnt[0], 32, "CONECTAR", WIDTH / 2 + 210, 480, WHITE);
                    this.botonConectar.setEvent("event_game_botonConectar");
                } else {
                    //..
                }
                this.st = 410;
                break;
            case 410:

                break;

            case 500:
                glz.socketOpen("ws://192.168.1.136", 9080);
                this.st = 510;
                break;
            case 510:
                switch (glz.socketStatus()) {
                    case SOCKET_CONNECTED:
                        //alert("SOCKET_CONNECTED");
                        soundStop(snd[1]);
                        soundPlay(snd[2]);
                        this.st = 520;
                        break;
                    case SOCKET_CLOSED:
                        alert("SOCKET_CLOSED");
                        this.st = 1000;
                        break;
                    case SOCKET_ERROR:
                        alert("SOCKET_ERROR");
                        this.st = 1000;
                        break;
                }
                break;
            case 520:
                // conexion realizada con exito..
                if (!data.contains("date")) {
                    data.set("date", new Date());
                    data.set("nick", this.inNick.get());
                }
                signal(this.inNick, s_kill);
                signal(this.botonConectar, s_kill);
                signal(this.botonBorrar, s_kill);
                signal(this.botonContinuar, s_kill);
                signal(this.idLabelNickRegistrado, s_kill);
                new Write(fnt[0], 36, "CONECTADO AL SERVIDOR!", CENTER, WIDTH / 2, 480, YELLOW, 1);
                this.netSendNick();
                this.st = 530;
                break;
            case 530:
                this.delay++;
                if (this.delay == 60) {
                    this.delay = 0;
                    fadeOff(500);
                    this.st = 540;
                }
                break;
            case 540:
                if (!glz.fading) {
                    letMeAlone();
                    this.st = 550;
                }
                break;
            case 550:
                this.delay++;
                if (this.delay == 10) {
                    soundPlay(snd[5], true);
                    fadeOn(500);
                    this.createWorld();
                    this.ready = true;
                    this.st = 2000;
                }
                break;

            case 1000:
                fadeOff(500);
                this.st = 1010;
                ST = 30;
                break;

            case 2000:
                this.netSendControls();
                this.checkConnectionStatus();
                break;

        }
    }
    createWorld() {
        new es1.Suelo(img[2]);
    }
    netSendControls() {

    }
    netSendNick() {
        let m = new glz.NetMessage();
        m.add("netSendNick");
        m.add(data.get("nick"));
        m.send();
    }
    checkConnectionStatus() {
        switch (glz.socketStatus()) {
            case SOCKET_CONNECTED:
                //..
                break;
            case SOCKET_CLOSED:
                alert("SOCKET_CLOSED");
                fadeOff(500);
                //letMeAlone();
                this.st = 1000;
                break;
            case SOCKET_ERROR:
                alert("SOCKET_ERROR");
                fadeOff(500);
                //letMeAlone();
                this.st = 1000;
                break;
        }
    }
    onClick_botonConectar() {
        this.st = 500;
    }
    onClick_inNick() {
        this.st = 400;
    }
    onClick_empezarDeNuevo() {
        this.st = 100;
    }
    onClick_empezarPartida() {
        this.st = 200;
    }
    onClick_continuarPartida() {
        this.st = 300;
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
            let z = 0;
            let localPlayer = false;
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
                    case "z":
                        z = params[1];
                        break;
                    case "localPlayer":
                        localPlayer = glz.parseBoolean(params[1]);
                        break;
                }
            }
            let c = new net.NetClient(id, x, y, z, mod[0]);    // creo proceso player en red con su ID en el servidor y el nick..
            if (localPlayer == true) {
                c.setLocalPlayer(true);
            }
            c.set_IDGAME_pointer(idGame);
            break;

        case "playerArround_leave":
            for (let i = 0; i < vars.netClients.length; i++) {
                if (vars.netClients[i].remoteId == msg[1].split(":")[1]) {
                    signal(vars.netClients[i], s_kill);
                }
            }
            break;

        case "playerPosition":
            for (let i = 0; i < vars.netClients.length; i++) {
                if (vars.netClients[i].remoteId == msg[1].split(":")[1]) {
                    vars.netClients[i].RCVNetPosition(msg);
                }
            }
            break;

        case "playerDisconnect":
            for (let i = 0; i < vars.netClients.length; i++) {
                if (vars.netClients[i].remoteId == msg[1]) {
                    signal(vars.netClients[i], s_kill);
                }
            }
            break;

        case "netGetNickByID":
            for (let i = 0; i < vars.netClients.length; i++) {
                if (vars.netClients[i].remoteId == msg[1]) {
                    vars.netClients[i].nick = msg[2];
                    vars.netClients[i].st = 22;
                }
            }
            break;

        default:
            console.log("ERROR: [" + msg[0] + "] NET COMMAND NOT RECOGNIZED!");
            break;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------