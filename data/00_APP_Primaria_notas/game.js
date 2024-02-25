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
const dataPath = "data/00_APP_Primaria_notas/";

window.setup = function () {
    setBackgroundColor(GRAY);          // color de fondo de pantalla..
    setFadingColor(0xffffff);           // color del fade de pantalla..
    enableShadows(false);               // activa el sistema de sobras..
    setMode(720 / 2, 1280 / 2, false, true);    // define la resolucion grafica..
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
                loader[0] = new LoadImages("data/00_APP_Primaria_notas/images/", 0);
                //loader[1] = new LoadSounds("data/00_APP_Primaria_notas/sounds/", 0);
                //let lista = [];
                //lista.push("data/00_APP_Primaria_notas/models/yourModelFilename.ext");
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
window.event_game_botonCatalan = function () {
    idGame.onClick_botonAsignatura("catalan");
}
window.event_game_botonCastellano = function () {
    idGame.onClick_botonAsignatura("castellano");
}
window.event_game_botonIngles = function () {
    idGame.onClick_botonAsignatura("ingles");
}
window.event_game_botonMatematicas = function () {
    idGame.onClick_botonAsignatura("matematicas");
}
window.event_game_botonMedi = function () {
    idGame.onClick_botonAsignatura("medi");
}
window.event_game_botonArtistica = function () {
    idGame.onClick_botonAsignatura("artistica");
}
window.event_game_botonEducacionFisica = function () {
    idGame.onClick_botonAsignatura("educacionFisica");
}
//---------------------------------------------------------------------------------
window.event_game_botonAtras = function () {
    idGame.onClick_botonAtras();
}
window.event_game_inCE_value = function () {
    idGame.onClick_botonInCE_value();
}
//---------------------------------------------------------------------------------
class Game extends Process {
    constructor() {
        super();
        this.st = 0;
        this.asignaturaSeleccionada = undefined;
        this.inNotaPonderada = undefined;

        this.catalan = new glz.StringDict();
        this.catalan.set("name", "catalan");
        this.catalan.set("ce1", "5");
        this.catalan.set("ce2", "5");
        this.catalan.set("ce3", "10");
        this.catalan.set("ce4", "25");
        this.catalan.set("ce5", "25");
        this.catalan.set("ce6", "5");
        this.catalan.set("ce7", "5");
        this.catalan.set("ce8", "5");
        this.catalan.set("ce9", "10");
        this.catalan.set("ce10", "5");

        this.castellano = new glz.StringDict();
        this.castellano.set("name", "castellano");
        this.castellano.set("ce1", "5");
        this.castellano.set("ce2", "5");
        this.castellano.set("ce3", "10");
        this.castellano.set("ce4", "25");
        this.castellano.set("ce5", "25");
        this.castellano.set("ce6", "5");
        this.castellano.set("ce7", "5");
        this.castellano.set("ce8", "5");
        this.castellano.set("ce9", "10");
        this.castellano.set("ce10", "5");

        this.ingles = new glz.StringDict();
        this.ingles.set("name", "ingles");
        this.ingles.set("ce1", "5");
        this.ingles.set("ce2", "10");
        this.ingles.set("ce3", "10");
        this.ingles.set("ce4", "10");
        this.ingles.set("ce5", "15");
        this.ingles.set("ce6", "10");
        this.ingles.set("ce7", "10");
        this.ingles.set("ce8", "10");
        this.ingles.set("ce9", "10");
        this.ingles.set("ce10", "10");

        this.matematicas = new glz.StringDict();
        this.matematicas.set("name", "matematicas");
        this.matematicas.set("ce1", "5");
        this.matematicas.set("ce2", "10");
        this.matematicas.set("ce3", "10");
        this.matematicas.set("ce4", "10");
        this.matematicas.set("ce5", "15");
        this.matematicas.set("ce6", "10");
        this.matematicas.set("ce7", "10");
        this.matematicas.set("ce8", "10");
        this.matematicas.set("ce9", "10");
        this.matematicas.set("ce10", "10");


        this.medi = new glz.StringDict();
        this.medi.set("name", "medi");
        this.medi.set("ce1", "5");
        this.medi.set("ce2", "10");
        this.medi.set("ce3", "10");
        this.medi.set("ce4", "10");
        this.medi.set("ce5", "15");
        this.medi.set("ce6", "10");
        this.medi.set("ce7", "10");
        this.medi.set("ce8", "10");
        this.medi.set("ce9", "10");
        this.medi.set("ce10", "10");

        this.artistica = new glz.StringDict();
        this.artistica.set("name", "artistica");
        this.artistica.set("ce1", "5");
        this.artistica.set("ce2", "10");
        this.artistica.set("ce3", "10");
        this.artistica.set("ce4", "10");
        this.artistica.set("ce5", "15");
        this.artistica.set("ce6", "10");
        this.artistica.set("ce7", "10");
        this.artistica.set("ce8", "10");
        this.artistica.set("ce9", "10");
        this.artistica.set("ce10", "10");

        this.educacionFisica = new glz.StringDict();
        this.educacionFisica.set("name", "educacionFisica");
        this.educacionFisica.set("ce1", "5");
        this.educacionFisica.set("ce2", "10");
        this.educacionFisica.set("ce3", "10");
        this.educacionFisica.set("ce4", "10");
        this.educacionFisica.set("ce5", "15");
        this.educacionFisica.set("ce6", "10");
        this.educacionFisica.set("ce7", "10");
        this.educacionFisica.set("ce8", "10");
        this.educacionFisica.set("ce9", "10");
        this.educacionFisica.set("ce10", "10");

    }
    initialize() {
        new Write(null, 22, "CALCULADORA NOTAS PRIMARIA", CENTER, WIDTH / 2, 30, BLACK, 1);
        new Write(null, 16, "Selecciona asignatura!", CENTER, WIDTH / 2, 50, BLUE, 1);

        let c = new EGUIbutton(null, 22, "LLENGUA CATALANA", WIDTH / 2, 100, WHITE);
        c.setEvent("event_game_botonCatalan");
        c.setArea(300, 40);

        c = new EGUIbutton(null, 22, "LLENGUA CASTELLANA", WIDTH / 2, 150, WHITE);
        c.setEvent("event_game_botonCastellano");
        c.setArea(300, 40);

        c = new EGUIbutton(null, 22, "LLENGUA ESTRANGERA", WIDTH / 2, 200, WHITE);
        c.setEvent("event_game_botonIngles");
        c.setArea(300, 40);

        c = new EGUIbutton(null, 22, "MATEMÀTIQUES", WIDTH / 2, 250, WHITE);
        c.setEvent("event_game_botonMatematicas");
        c.setArea(300, 40);

        c = new EGUIbutton(null, 22, "MEDI SOCIAL-NATURAL", WIDTH / 2, 300, WHITE);
        c.setEvent("event_game_botonMedi");
        c.setArea(300, 40);

        c = new EGUIbutton(null, 22, "EDUCACIÓ ARTÍSTICA", WIDTH / 2, 350, WHITE);
        c.setEvent("event_game_botonArtistica");
        c.setArea(300, 40);

        c = new EGUIbutton(null, 22, "EDUCACIÓ FÍSICA", WIDTH / 2, 400, WHITE);
        c.setEvent("event_game_botonEducacionFisica");
        c.setArea(300, 40);

        new Write(null, 18, "Programado por: Luis Lopez Martinez.", CENTER, WIDTH / 2, HEIGHT - 20, WHITE, 1);

        fadeOn(1000);
    }
    frame() {
        switch (this.st) {
            case 0:
                // estado inicial..
                // esperando a clickar un boton de asignatura..
                break;
            case 10:
                lockEGUI();
                fadeOff(500);
                this.st = 20;
                break;
            case 20:
                if (!glz.fading) {
                    letMeAlone();
                    new Write(null, 32, "Introduce valores para:", CENTER, WIDTH / 2, 55, YELLOW, 1);
                    new Write(null, 32, this.asignaturaSeleccionada.get("name"), CENTER, WIDTH / 2, 90, WHITE, 1);
                    let c = new EGUIgbutton(img[0], 32, 20, 0.8);
                    c.setEvent("event_game_botonAtras");
                    for (let i = 0; i < 10; i++) {
                        let key = "ce" + str(i + 1) + " ";
                        let c = new EGUIinputBox(null, 22, key, "", WIDTH / 2, 150 + i * 40, 150);
                        c.setEvent("event_game_inCE_value");
                    }

                    this.inNotaPonderada = new EGUIinputBox(null, 32, "NOTA: ", "", WIDTH / 2, HEIGHT - 50, 100);

                    fadeOn(1000);
                    this.st = 30;
                }
                break;
            case 30:

                break;
            case 100:
                fadeOff(500);
                this.st = 110;
                break;
            case 110:
                if (!glz.fading) {
                    letMeAlone();
                    this.initialize();
                    this.st = 0;
                }
                break;
            case 120:

                break;
        }
    }
    onClick_botonInCE_value() {

    }
    onClick_botonAtras() {
        this.st = 100;
    }
    onClick_botonAsignatura(value) {
        this.asignaturaSeleccionada = this[value];
        this.st = 10;
    }
}
//---------------------------------------------------------------------------------