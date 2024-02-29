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
const dataPath = "data/APP_GAME_SNATCHER_FC3/";

window.setup = function () {
    setBackgroundColor(BLACK);          // color de fondo de pantalla..
    setFadingColor(BLACK);           // color del fade de pantalla..
    enableShadows(false);               // activa el sistema de sobras..
    setMode(1280, 720, false, false);   // define la resolucion grafica..
    setFps(60);                         // limita los fotogramas por segundo..
    setFog(0, 250);                     // configura la niebla del entorno 3d..
    setAmbientLight(WHITE, 1);          // iluminacion ambiental de la escena 3d..
    fadeOff(0);                         // apaga inmediatamente la pantalla 0 ms..
    fadeOn(1000);                       // enciendo la pantalla durante 1 segundo..
    soundSetMasterVolume(1);
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
                loader[0] = new LoadImages("data/APP_GAME_SNATCHER_FC3/images/", 4);
                loader[1] = new LoadSounds("data/APP_GAME_SNATCHER_FC3/sounds/", 4);
                let list = [];
                list.push("data/APP_GAME_SNATCHER_FC3/fonts/MSX-Screen0.ttf");
                list.push("data/APP_GAME_SNATCHER_FC3/fonts/MSX-Screen1.ttf");
                list.push("data/APP_GAME_SNATCHER_FC3/fonts/PressStart2P-vaV7.ttf");
                loader[2] = new LoadFonts(list);
                //let lista = [];
                //lista.push("data/APP_GAME_SNATCHER_FC3/models/yourModelFilename.ext");
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
                img = loader[0].get();
                snd = loader[1].get();
                fnt = loader[2].get();
                fadeOff(500);
                ST = 30;
            }
            break;
        case 30:
            if (!glz.fading) {
                signal(text_inicio, glz.s_kill);
                letMeAlone();
                idGame = new Game();
                fadeOn(1000);
                ST = 40;
            }
            break;
        case 40:

            break;
    }
}

//---------------------------------------------------------------------------------
class Game extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.dialog;
    }
    initialize() {
        new Write(fnt[0], 14, "UNA PRODUCCION DE:", CENTER, WIDTH / 2, HEIGHT / 2 - 32, 0xa9eca2, 1);
        this.a = new Write(fnt[0], 32, "LUIS LOPEZ MARTINEZ", CENTER, WIDTH / 2, HEIGHT / 2, WHITE, 1);
        new Write(fnt[1], 16, "GameLibZero - 2024", CENTER, WIDTH / 2, HEIGHT / 2 + 32, YELLOW, 1);
        soundPlay(snd[0], false, 0.2);
        fadeOn(4000);
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

                    this.dialog = new DialogBox();
                    this.dialog.add("Lorem Ipsum es simplemente el texto de relleno de las");
                    this.dialog.add("imprentas y archivos de texto. Lorem Ipsum ha sido el texto de");
                    this.dialog.add("relleno estándar de las industrias desde el año 1500, cuando");
                    this.dialog.add("un impresor (N. del T. persona que se dedica a la imprenta)");
                    this.dialog.add("desconocido usó una galería de textos y los mezcló de tal");
                    this.dialog.add("manera que logró hacer un libro de textos especimen. No sólo");
                    this.dialog.add("sobrevivió 500 años, sino que tambien ingresó como texto de");
                    this.dialog.add("relleno en documentos electrónicos, quedando esencialmente");
                    this.dialog.add("igual al original. Fue popularizado en los 60s con la creación de");
                    this.dialog.add("las hojas 'Letraset', las cuales contenian pasajes de Lorem");
                    this.dialog.add("Ipsum, y más recientemente con software de autoedición,");
                    this.dialog.add("como por ejemplo Aldus PageMaker, el cual incluye versiones");
                    this.dialog.add("de Lorem Ipsum.");

                    new Suelo();

                    //new Humo(0);
                    //new Humo(1);

                    fadeOn(1000);
                    this.st = 20;
                }
                break;
            case 20:

                break;

        }
    }
}
//---------------------------------------------------------------------------------
class Humo extends GameObject {
    constructor(mode) {
        super();
        this.mode = mode;
    }
    initialize() {

        this.createMaterial(TEXTURED, img[3]);
        if (this.mode == 0) {
            this.x = 50;
            this.y = 0;
            this.createPlane(100, 100);
        } else {
            this.x = -50;
            this.y = 0;
            this.createPlane2(100, 100);
        }
    }
    finalize() {

    }
    frame() {
        //this.angle += random(0.25);
    }
}
//---------------------------------------------------------------------------------
class Suelo extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.counter = 0;
    }
    frame() {
        switch (this.st) {
            case 0:
                this.anglex = -90;
                this.createMaterial(TEXTURED, dataPath + "images/004.png", true);
                this.createPlane(100, 100);
                this.st = 10;
                break;
            case 10:
                this.counter -= 0.01;
                // animateUV();
                this.setTextureOffet(0, this.counter);
                break;
            case 20:
                break;
        }
    }
}
//---------------------------------------------------------------------------------
class DialogBox extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.data = [];
        this.linesToShow = 4;
        this.lsa = 0;
        this.idTexts = [];
        this.cursor;
        this.fnt = fnt[2];
        this.textSize = 20;
        this.interline = this.textSize + 10;
        this.eventName = "";
    }
    initialize() {
        this.x = WIDTH / 2;
        this.y = HEIGHT - (this.interline * this.linesToShow) / 2 - 10;
        this.newGraph(WIDTH - 20, this.interline * this.linesToShow);
        this.tint(BLUE);
        let vec = this.getRealPoint(0, 0);
        for (let i = 0; i < this.linesToShow; i++) {
            this.idTexts.push(new Write(this.fnt, this.textSize, "", RIGHT, vec.x + 5, vec.y + this.interline / 2 + this.interline * i, WHITE, 1));
        }
        this.cursor = new Write(this.fnt, this.textSize, ">>", LEFT, vec.x + this.graph._width - 2, vec.y + this.graph._height - 2 - this.textSize / 2, YELLOW, 1);
        this.cursor.visible = false;
    }
    finalize() {
        signal(this.cursor, s_kill);
        for (let i = 0; i < this.idTexts.length; i++) {
            signal(this.idTexts[i], s_kill);
        }
    }
    add(str) {
        this.data.push(str);
    }
    frame() {
        switch (this.st) {
            case 0:
                if (this.lsa < this.linesToShow) {
                    this.st = 10;
                } else {
                    this.cursor.visible = true;
                    this.st = 2;
                }
                break;
            case 2:
                if (glz.mouse.left) {
                    this.st = 4;
                }
                break;
            case 4:
                if (!glz.mouse.left) {
                    this.cursor.visible = false;
                    this.st = 20;
                }
                break;
            case 10:
                if (this.deletrea1() == false) {
                    // linea escrita completamente..
                    this.lsa++;
                    this.st = 0;
                } else {
                    // linea esta escribiendose..
                }
                break;
            case 12:
                if (glz.mouse.left) {
                    this.st = 14;
                }
                break;
            case 14:
                if (!glz.mouse.left) {
                    this.lsa++;
                    this.st = 0;
                }
                break;
            case 20:
                if (this.lsa < this.data.length) {
                    // quedan lineas por escribir..
                    for (let i = 0; i < this.idTexts.length - 1; i++) {
                        this.idTexts[i].text = this.idTexts[i + 1].text;
                    }
                    this.idTexts[this.linesToShow - 1].text = "";
                    //this.lsa++;
                    this.st = 30;
                } else {
                    // no quedan lineas por escribir..
                    this.cursor.visible = true;
                }
                break;
            case 30:
                if (this.deletrea2() == false) {
                    // linea escrita completamente..
                    this.cursor.visible = true;
                    this.st = 32;
                    if (this.lsa == this.data.length - 1) {
                        this.cursor.text = "END";
                        this.cursor.setColor(RED);
                        this.st = 100;
                    }

                } else {
                    // linea esta escribiendose..
                }
                break;
            case 32:
                if (glz.mouse.left) {
                    this.st = 34;
                }
                break;
            case 34:
                if (!glz.mouse.left) {
                    this.lsa++;
                    if (this.lsa < this.data.length) {
                        this.cursor.visible = false;
                    }
                    this.st = 20;
                }
                break;
            case 100:
                if (glz.mouse.left) {
                    this.st = 110;
                }
                break;
            case 110:
                if (!glz.mouse.left) {
                    if (this.eventName != "") {
                        glz.method(this.eventName);
                    }
                    signal(this, s_kill);
                }
                break;
        }
    }
    deletrea2() {
        if (this.idTexts[this.linesToShow - 1].text.length < this.data[this.lsa].length) {
            this.idTexts[this.linesToShow - 1].text += this.data[this.lsa].charAt(this.idTexts[this.linesToShow - 1].text.length);
            return true;
        }
        return false;
    }
    deletrea1() {
        if (this.idTexts[this.lsa].text.length < this.data[this.lsa].length) {
            this.idTexts[this.lsa].text += this.data[this.lsa].charAt(this.idTexts[this.lsa].text.length);
            return true;
        }
        return false;
    }
    setEvent(eventName) {
        this.eventName = eventName;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
