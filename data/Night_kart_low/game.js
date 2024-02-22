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
const dataPath = "data/Night_kart_low/";

window.setup = function () {
    setBackgroundColor(GRAY);          // color de fondo de pantalla..
    setFadingColor(BLACK);           // color del fade de pantalla..
    enableShadows(false);               // activa el sistema de sobras..
    setMode(1280 / 2, 720 / 2, false, false);    // define la resolucion grafica..
    setFps(60);                         // limita los fotogramas por segundo..
    setFog(0, 450);                     // configura la niebla del entorno 3d..
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
                //loader[0] = new LoadImages("data/Night_kart_low/images/", 0);
                //loader[1] = new LoadSounds("data/Night_kart_low/sounds/", 0);
                //let lista = [];
                //lista.push("data/Night_kart_low/models/yourModelFilename.ext");
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
            //..
            break;
    }
}
//---------------------------------------------------------------------------------
class Game extends Process {
    constructor() {
        super();
        this.st = 0;
        this.escena = undefined;
    }
    frame() {
        switch (this.st) {
            case 0:
                this.escena = new Escena_titulo_juego();
                fadeOn(1000);
                this.st = 10;
                break;
            case 10:
                if (!exists(this.escena)) {
                    this.st = 20;
                }
                break;
            case 20:
                fadeOff(1000);
                this.st = 30;
                break;
            case 30:
                if (!glz.fading) {
                    letMeAlone();
                    this.escena = new Escena_jugar();
                    fadeOn(1000);
                    this.st = 40;
                }
                break;
            case 40:
                if (!exists(this.escena)) {
                    this.st = 50;
                }
                break;
        }
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Escena_titulo_juego extends Process {
    constructor() {
        super();
        this.st = 0;
        this.idText;
    }
    initialize() {
        //..
    }
    frame() {
        switch (this.st) {
            case 0:
                new Write(null, 32, "TITULO JUEGO ESTUPENDO!", CENTER, WIDTH / 2, 50, WHITE, 1);
                this.idText = new Write(null, 32, "PULSA ENTER", CENTER, WIDTH / 2, 100, YELLOW, 1);
                this.st = 10;
                break;
            case 10:
                if (glz.frameCount % 15 == 0) {
                    this.idText.visible = !this.idText.visible;
                }
                if (key(_ENTER)) {
                    this.idText.visible = true;
                    signal(this, s_kill);
                }
                break;
        }

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Escena_jugar extends Process {
    constructor() {
        super();
        this.st = 0;
        this.kart;
    }
    frame() {
        switch (this.st) {
            case 0:
                setGravity(0, -90, 0);
                this.createMaterial(TEXTURED, dataPath + "/images/circuit0.png", false);
                this.createPlane(2000, 2000);
                this.createBody(TYPE_PLANE);

                this.kart = new Kart();

                this.st = 10;
                break;
            case 10:


                break;
        }
    }
}
//---------------------------------------------------------------------------------
class Kart extends Process {
    constructor() {
        super();
        this.st = 0;
        this.giro = 0;
    }
    initialize() {
        //..
    }
    frame() {
        switch (this.st) {
            case 0:
                this.y = 12;
                this.size = 0.5;
                this.createSphere(10);
                this.createBody(TYPE_SPHERE);
                this.size = 10;
                this.createSprite("data/night_kart_low/images/kart2.png");
                this.cam = new Camera3d();
                this.cam.setTarget(this);
                this.cam.setTargetHeight(15);
                this.cam.rotateY(1000);
                this.cam.setTargetDistance(40);
                this.cam.setCollision(false);
                this.st = 10;
                break;
            case 10:
                if (randInt(1, 7) === 1) {
                    new Humo(this.x, this.y, this.z);
                }

                if (key(_LEFT)) {
                    this.cam.rotateX(this.giro);
                    if (this.giro > -500) {
                        this.giro -= 50;
                    }
                } else if (key(_RIGHT)) {
                    this.cam.rotateX(this.giro);
                    if (this.giro < 500) {
                        this.giro += 50;
                    }
                } else {
                    if (this.giro > 0) {
                        this.giro -= 50;
                    } else if (this.giro < 0) {
                        this.giro += 50;
                    }
                }

                if (key(_UP)) {
                    this.addImpulseFromCamera(1, 0, this.cam);
                }
                if (key(_DOWN)) {
                    this.addImpulseFromCamera(1, 180, this.cam);
                }
                this.brake(0.9);

                break;
        }

    }
}
//---------------------------------------------------------------------------------
class Humo extends Process {

    constructor(x, y, z) {
        super();
        this.st = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    initialize() {
        this.createSprite("data/night_kart_low/images/humo.png");
        this.size = 10;
    }
    frame() {
        //this.addVy(5);
        this.y += Math.random() - 0.3;
        this.x += Math.random() - 0.5;
        this.z += Math.random() - 0.5;
        if (this.livedFrames > 99) {
            signal(this, s_kill);
        }

    }

}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------