// Libreria para la creacion de videojuegos web licenciada bajo: [MIT License].
//=================================================================================
// GameLibZeroWEB - 4Div - 2024 - By Erkosone. v1.0 
//=================================================================================
import * as glz from '../../library/4Div.js';
const Process = glz.GameObject; const GameObject = glz.GameObject; const JoyStick = glz.JoyStick; const StringList = glz.StringList; const Scroll = glz.Scroll; const Write = glz.Write; const LoadImages = glz.LoadImages; const LoadSounds = glz.LoadSounds; const Camera3d = glz.Camera3d; const PointLight = glz.PointLight; const SoundPlayTimed = glz.SoundPlayTimed; const LoadModels = glz.LoadModels; const EGUIbutton = glz.EGUIbutton; const EGUIgbutton = glz.EGUIgbutton; const EGUIinputBox = glz.EGUIinputBox;
const fadeOff = glz.fadeOff; const fadeOn = glz.fadeOn; const setFog = glz.setFog; const setMode = glz.setMode; const setFps = glz.setFps; const setFadingColor = glz.setFadingColor; const setBackgroundColor = glz.setBackgroundColor; const enableShadows = glz.enableShadows; const abs = glz.abs; const sin = glz.sin; const cos = glz.cos; const rand = glz.rand; const randInt = glz.randInt; const random = glz.random; const radians = glz.radians; const degrees = glz.degrees; const str = glz.str; const int = glz.int; const isInteger = glz.isInteger; const millis = glz.millis; const setTitle = glz.setTitle; const textInfo = glz.textInfo; const map = glz.map; const screenDrawGraphic = glz.screenDrawGraphic; const screenDrawSprite = glz.screenDrawSprite; const getObject = glz.getObject; const exists = glz.exists; const getGameObjectById = glz.getGameObjectById; const signal = glz.signal; const signalType = glz.signalType; const letMeAlone = glz.letMeAlone; const getOrientation = glz.getOrientation; const setTexture = glz.setTexture; const loadTexture = glz.loadTexture; const fileExists = glz.fileExists; const generateUUID = glz.generateUUID; const isMobile = glz.isMobile; const download = glz.download; const soundSetMasterVolume = glz.soundSetMasterVolume; const SoundFade = glz.soundFade; const soundPlay = glz.soundPlay; const soundStop = glz.soundStop; const soundSetVolume = glz.soundSetVolume; const soundIsPlaying = glz.soundIsPlaying; const key = glz.key; const setAmbientLight = glz.setAmbientLight; const lockEGUI = glz.lockEGUI; const unlockEGUI = glz.unlockEGUI; const getDistance2d = glz.getDistance2d; const getDistance = glz.getDistance; const getAngle = glz.getAngle; const setGravity = glz.setGravity;
const s_kill = glz.s_kill; const s_unprotected = glz.s_unprotected; const s_protected = glz.s_protected; const LEFT = glz.LEFT; const RIGHT = glz.RIGHT; const CENTER = glz.CENTER; const NET_TOK_DATA = glz.NET_TOK_DATA; const SOCKET_CONNECTED = glz.SOCKET_CONNECTED; const SOCKET_CLOSED = glz.SOCKET_CLOSED; const SOCKET_ERROR = glz.SOCKET_ERROR; const SOCKET_NULL = glz.SOCKET_NULL; const WHITE = glz.WHITE; const SILVER = glz.SILVER; const GRAY = glz.GRAY; const BLACK = glz.BLACK; const RED = glz.RED; const MAROON = glz.MAROON; const YELLOW = glz.YELLOW; const OLIVE = glz.OLIVE; const LIME = glz.LIME; const GREEN = glz.GREEN; const BLUE = glz.BLUE; const PINK = glz.PINK; const PURPLE = glz.PURPLE; const ORANGE = glz.ORANGE; const BASIC = glz.BASIC; const LAMBERT = glz.LAMBERT; const WIRED = glz.WIRED; const STANDARD = glz.STANDARD; const TOON = glz.TOON; const PHONG = glz.PHONG; const TEXTURED = glz.TEXTURED; const TYPE_BOX = glz.TYPE_BOX; const TYPE_SPHERE = glz.TYPE_SPHERE; const TYPE_PLANE = glz.TYPE_PLANE; const TYPE_CYLINDER = glz.TYPE_CYLINDER; const _UP = glz._UP; const _DOWN = glz._DOWN; const _LEFT = glz._LEFT; const _RIGHT = glz._RIGHT; const _ENTER = glz._ENTER; const _ESC = glz._ESC; const _SPACE = glz._SPACE; const _SHIFT = glz._SHIFT; const _CONTROL = glz._CONTROL; const _BLOCK_SHIFT = glz._BLOCK_SHIFT; const _TAB = glz._TAB; const _Q = glz._Q; const _W = glz._W; const _E = glz._E; const _R = glz._R; const _T = glz._T; const _Y = glz._Y; const _U = glz._U; const _I = glz._I; const _O = glz._O; const _P = glz._P; const _A = glz._A; const _S = glz._S; const _D = glz._D; const _F = glz._F; const _G = glz._G; const _H = glz._H; const _J = glz._J; const _K = glz._K; const _L = glz._L; const _Ñ = glz._Ñ; const _Z = glz._Z; const _X = glz._X; const _C = glz._C; const _V = glz._V; const _B = glz._B; const _N = glz._N; const _M = glz._M; const _COMA = glz._COMA; const _PUNTO = glz._PUNTO; const _GUION = glz._GUION; const _1 = glz._1; const _2 = glz._2; const _3 = glz._3; const _4 = glz._4; const _5 = glz._5; const _6 = glz._6; const _7 = glz._7; const _8 = glz._8; const _9 = glz._9; const _0 = glz._0; const _DEconstE = glz._DEconstE; const _END = glz._END; const _PAGEDOWN = glz._PAGEDOWN;
//=================================================================================

let ST = 0;         // maquina de estados del codigo principal de la aplicacion..
let text_inicio;
var loader = [];    // array de loaders para la carga de diferentes tipos de recursos por separado..
let img = [];       // array de imagenes para pixi..
let snd = [];       // array de sonidos para waud..
let mod = [];       // array de modelos 3d..
let idGame;         // puntero al proceso principal..

window.setup = function () {
    setBackgroundColor(WHITE);          // color de fondo de pantalla..
    setFadingColor(0xffffff);           // color del fade de pantalla..
    enableShadows(false);               // activa el sistema de sobras..
    setMode(1280, 720, false, true);    // define la resolucion grafica..
    setFps(60);                         // limita los fotogramas por segundo..
    setFog(0, 250);                     // configura la niebla del entorno 3d..
    setAmbientLight(WHITE, 1);          // iluminacion ambiental de la escena 3d..
    fadeOff(0);                         // apaga inmediatamente la pantalla 0 ms..
    fadeOn(1000);                       // enciendo la pantalla durante 1 segundo..
}

window.main = function () {
    switch (ST) {
        case 0:
            text_inicio = new glz.Write(null, 32, "TOUCH TO START", CENTER, glz.WIDTH / 2, glz.HEIGHT / 2, BLUE, 1);
            ST = 10;
            break;
        case 10:
            if (glz.mouse.left) {
                text_inicio.text = "loading assets..";
                text_inicio.color = 0x000000;
                loader[0] = new LoadImages("data/Example_11_3d_art_galery/images/gui/", 3);
                loader[1] = new LoadSounds("data/Example_11_3d_art_galery/sounds/", 1);
                // let lista = [];
                // lista.push("data/Example_11_3d_art_galery/models/yourModelFilename.ext);
                // loader[2] = new LoadModels(lista);

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
                // mod = loader[2].get();
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
class Game extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.idPerso;
        this.camDist = 100;
        this.menuButton;
        this.botonCaminar1 = undefined;
        this.botonCaminar2 = undefined;
    }
    initialize() {
        letMeAlone();
    }
    frame() {
        console.log(glz.world);
        switch (this.st) {
            case 0:

                setGravity(0, -190, 0);
                soundPlay(snd[0], true);

                new CeldaSuelo(0, -40, 100);
                new CeldaSuelo(0, -40, 300);

                new Muro(0, 10, 5, 180, 100, 10);
                new Muro(95, 10, 100, 10, 100, 200);
                new Muro(-95, 10, 100, 10, 100, 200);

                new Muro(95, 10, 300, 10, 100, 200);
                new Muro(-95, 10, 300, 10, 100, 200);
                new Muro(0, 10, 395, 180, 100, 10);

                new Cuadro(90, 15, 40, "data/Example_11_3d_art_galery/images/cuadros/000.png", 0.01, 1);
                new Cuadro(90, 32, 160, "data/Example_11_3d_art_galery/images/cuadros/001.png", 0.01, 1);
                new Cuadro(90, -5, 150, "data/Example_11_3d_art_galery/images/cuadros/002.png", 0.01, 1);
                new Cuadro(90, -5, 280, "data/Example_11_3d_art_galery/images/cuadros/003.png", 0.01, 1);
                new Cuadro(90, 35, 315, "data/Example_11_3d_art_galery/images/cuadros/004.png", 0.01, 1);

                new Plataforma();

                new Sprite3d("data/Example_11_3d_art_galery/images/texturas/004.png");

                this.idPerso = new Personaje();
                this.cam = new Camera3d();
                this.cam.setTarget(this.idPerso);
                this.cam.setTargetDistance(this.camDist);
                this.cam.rotateY(2000);
                this.cam.enableMouseControl = false;


                new MenuInicial();

                fadeOn(1000);
                this.st = 10;
                break;
            case 10:
                this.cam.rotateX(10);
                break;
            case 20:
                this.menuButton = new EGUIgbutton(img[2], glz.WIDTH - 62, 70, 1);
                if (isMobile()) {
                    this.botonCaminar1 = new EGUIgbutton(img[3], 64, glz.HEIGHT - 64, 1);
                    this.botonCaminar2 = new EGUIgbutton(img[3], glz.WIDTH - 64, glz.HEIGHT - 64, 1);
                }
                this.st = 30;
                break;
            case 30:
                // limbo.. game is running..
                if (this.botonCaminar1 != undefined) {
                    let forward = this.botonCaminar1.touched() || this.botonCaminar2.touched();
                    this.idPerso.externalForwardSignal = forward;
                }
                break;
        }
    }
    onEvent_empezar() {
        this.cam.enableMouseControl = true;
        this.idPerso.controlable = true;
        this.st = 20;
    }
}
//---------------------------------------------------------------------------------
class Sprite3d extends GameObject {
    constructor(img_filename) {
        super();
        this.st = 0;
        this.img_filename = img_filename;
    }
    initialize() {
        this.x = 0;
        this.y = -30;
        this.z = 200;
        this.createSprite(this.img_filename);
        this.size = 10;
    }
    frame() {
        switch (this.st) {
            case 0:
                let colision = glz.mouse.intersect(this);
                if (colision) {
                    this.tint(RED);
                } else {
                    this.tint(WHITE);
                }
                break;
            case 10:

                break;
        }
    }
}
//---------------------------------------------------------------------------------
class Plataforma extends GameObject {
    constructor() {
        super();
        this.st = 0;
    }
    initialize() {
        this.y = -30;
        this.z = 200;
        this.createBox(50, 4, 100);
        this.createBody(TYPE_BOX);
        this.setStatic(true);
    }
    frame() {
        switch (this.st) {
            case 0:
                this.translateY(0.01);
                break;
            case 10:

                break;
        }
    }
}
//---------------------------------------------------------------------------------
window.EVENT_MenuInicial_botonStart = function () {
    glz._id_.father.onClick_botonStart();
}
//---------------------------------------------------------------------------------
class MenuInicial extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.logo;
        this.boton;
    }
    frame() {
        switch (this.st) {
            case 0:
                this.logo = screenDrawGraphic(img[0], glz.WIDTH / 2, 150, 0, 1, 1, 1);
                this.boton = new EGUIgbutton(img[1], glz.WIDTH / 2, 500, 0.8);
                this.boton.setEvent("EVENT_MenuInicial_botonStart");
                this.st = 10;
                break;
            case 10:
                // limbo.. esperando a punsar boton start..
                break;
            case 20:
                if (this.logo.x < (glz.WIDTH * 1.5)) {
                    let delta = (glz.WIDTH * 1.5) - this.logo.x;
                    this.logo.x += delta / 20;
                    if (this.logo.x > (glz.WIDTH * 1.4)) {
                        signal(this.boton, s_kill);
                        idGame.onEvent_empezar();
                        this.st = 30;
                    }
                    this.boton.y += 10;
                }
                break;
        }
    }
    onClick_botonStart() {
        soundPlay(snd[1]);
        this.st = 20;
    }
}
//---------------------------------------------------------------------------------
class Cuadro extends GameObject {
    constructor(x, y, z, texture_filename, sizex, sizey) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.tex = texture_filename;
        this.sizex = sizex;
        this.sizey = sizey;
        this.st = 0;
    }
    initialize() {
        this.createMaterial(TEXTURED, this.tex, false);
    }
    frame() {
        switch (this.st) {
            case 0:
                if (this.material.map.image != undefined) {
                    let sz_ = this.material.map.image.width / this.material.map.image.height;
                    let sy_ = this.material.map.image.height / this.material.map.image.width;
                    this.createBox(60, 60 * sy_, 60 * sz_);
                    this.st = 10;
                }
                break;
            case 10:
                if (key(_Z)) {
                    this.x -= 1;
                }
                if (key(_X)) {
                    this.x += 1;
                }

                break;
        }
    }

}
//---------------------------------------------------------------------------------
class CeldaSuelo extends GameObject {
    constructor(x, y, z, name = "") {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name;
    }
    initialize() {
        this.anglex = -90;
        this.createMaterial(TEXTURED, "data/Example_11_3d_art_galery/images/texturas/000.png", true);
        this.createPlane(200, 200);
        this.mesh.name = this.name;
        this.createBody(TYPE_PLANE);
    }
}
//---------------------------------------------------------------------------------
class Muro extends GameObject {
    constructor(x, y, z, xx, yy, zz, name) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.xx = xx;
        this.yy = yy;
        this.zz = zz;
        this.name = name;
    }
    initialize() {
        this.createMaterial(TEXTURED, "data/Example_11_3d_art_galery/images/texturas/001.png", false);
        this.createBox(this.xx, this.yy, this.zz);
        this.mesh.name = this.name;
        this.createBody(TYPE_BOX);
        this.setStatic(true);
    }
    frame() {

    }
}
//---------------------------------------------------------------------------------
class Personaje extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.v = 20;
        this.idSprite;
        this.controlable = false;
        this.externalForwardSignal = false;
    }
    initialize() {
        this.z = 50;
        this.createSphere(1, 10);
        this.size = 5;
        //this.visible = false;
        this.createBody(TYPE_SPHERE);
        this.addGroundControl(this);
    }
    frame() {
        switch (this.st) {
            case 0:
                if (exists(this.idSprite)) {
                    this.idSprite.x = this.x;
                    this.idSprite.y = this.y;
                    this.idSprite.z = this.z;
                }

                if (this.controlable == true) {
                    this.control();
                }

                break;
            case 10:

                break;
        }
    }
    control() {
        if (key(_LEFT)) {
            idGame.cam.rotateX(-200);
        }
        if (key(_RIGHT)) {
            idGame.cam.rotateX(200);
        }

        let keys_pressed = false;
        if (key(_A)) {
            keys_pressed = true;
            this.setVz(this.v * cos(radians(idGame.cam.lon + 90)));
            this.setVx(this.v * sin(radians(idGame.cam.lon + 90)));
        }
        if (key(_D)) {
            keys_pressed = true;
            this.setVz(this.v * cos(radians(idGame.cam.lon - 90)));
            this.setVx(this.v * sin(radians(idGame.cam.lon - 90)));
        }
        if (key(_UP) || this.externalForwardSignal) {
            keys_pressed = true;
            this.setVz(this.v * cos(radians(idGame.cam.lon)));
            this.setVx(this.v * sin(radians(idGame.cam.lon)));
        }
        if (key(_DOWN)) {
            keys_pressed = true;
            this.setVz(-this.v * cos(radians(idGame.cam.lon)));
            this.setVx(-this.v * sin(radians(idGame.cam.lon)));
        }
        if (key(_SPACE) && this.isOnGround()) {
            this.addVy(3);
        }
        if (!keys_pressed && this.isOnGround()) {
            this.brakeX(0.9);
            this.brakeZ(0.9);
        }
    }
}
//---------------------------------------------------------------------------------