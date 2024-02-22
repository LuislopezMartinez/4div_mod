// Libreria para la creacion de videojuegos web licenciada bajo: [MIT License].
//=================================================================================
// GameLibZeroWEB - 4Div - 2024 - By Erkosone. v1.0 
//=================================================================================
import * as glz from '../../library/4Div.js';
const Process = glz.GameObject; const GameObject = glz.GameObject; const JoyStick = glz.JoyStick; const StringList = glz.StringList; const Scroll = glz.Scroll; const Write = glz.Write; const LoadImages = glz.LoadImages; const LoadSounds = glz.LoadSounds; const Camera3d = glz.Camera3d; const PointLight = glz.PointLight; const SoundPlayTimed = glz.SoundPlayTimed; const LoadModels = glz.LoadModels; const EGUIbutton = glz.EGUIbutton; const EGUIgbutton = glz.EGUIgbutton; const EGUIinputBox = glz.EGUIinputBox;
const fadeOff = glz.fadeOff; const fadeOn = glz.fadeOn; const setFog = glz.setFog; const setMode = glz.setMode; const setFps = glz.setFps; const setFadingColor = glz.setFadingColor; const setBackgroundColor = glz.setBackgroundColor; const enableShadows = glz.enableShadows; const abs = glz.abs; const sin = glz.sin; const cos = glz.cos; const rand = glz.rand; const randInt = glz.randInt; const random = glz.random; const radians = glz.radians; const degrees = glz.degrees; const str = glz.str; const int = glz.int; const isInteger = glz.isInteger; const millis = glz.millis; const setTitle = glz.setTitle; const textInfo = glz.textInfo; const map = glz.map; const screenDrawGraphic = glz.screenDrawGraphic; const screenDrawSprite = glz.screenDrawSprite; const getObject = glz.getObject; const exists = glz.exists; const getGameObjectById = glz.getGameObjectById; const signal = glz.signal; const signalType = glz.signalType; const letMeAlone = glz.letMeAlone; const getOrientation = glz.getOrientation; const setTexture = glz.setTexture; const loadTexture = glz.loadTexture; const fileExists = glz.fileExists; const generateUUID = glz.generateUUID; const isMobile = glz.isMobile; const download = glz.download; const soundSetMasterVolume = glz.soundSetMasterVolume; const soundFade = glz.soundFade; const soundPlay = glz.soundPlay; const soundStop = glz.soundStop; const soundSetVolume = glz.soundSetVolume; const soundIsPlaying = glz.soundIsPlaying; const key = glz.key; const setAmbientLight = glz.setAmbientLight; const lockEGUI = glz.lockEGUI; const unlockEGUI = glz.unlockEGUI; const getDistance2d = glz.getDistance2d; const getDistance = glz.getDistance; const getAngle = glz.getAngle; const setGravity = glz.setGravity;
const s_kill = glz.s_kill; const s_unprotected = glz.s_unprotected; const s_protected = glz.s_protected; const LEFT = glz.LEFT; const RIGHT = glz.RIGHT; const CENTER = glz.CENTER; const NET_TOK_DATA = glz.NET_TOK_DATA; const SOCKET_CONNECTED = glz.SOCKET_CONNECTED; const SOCKET_CLOSED = glz.SOCKET_CLOSED; const SOCKET_ERROR = glz.SOCKET_ERROR; const SOCKET_NULL = glz.SOCKET_NULL; const WHITE = glz.WHITE; const SILVER = glz.SILVER; const GRAY = glz.GRAY; const BLACK = glz.BLACK; const RED = glz.RED; const MAROON = glz.MAROON; const YELLOW = glz.YELLOW; const OLIVE = glz.OLIVE; const LIME = glz.LIME; const GREEN = glz.GREEN; const BLUE = glz.BLUE; const PINK = glz.PINK; const PURPLE = glz.PURPLE; const ORANGE = glz.ORANGE; const BASIC = glz.BASIC; const LAMBERT = glz.LAMBERT; const WIRED = glz.WIRED; const STANDARD = glz.STANDARD; const TOON = glz.TOON; const PHONG = glz.PHONG; const TEXTURED = glz.TEXTURED; const TYPE_BOX = glz.TYPE_BOX; const TYPE_SPHERE = glz.TYPE_SPHERE; const TYPE_PLANE = glz.TYPE_PLANE; const TYPE_CYLINDER = glz.TYPE_CYLINDER; const _UP = glz._UP; const _DOWN = glz._DOWN; const _LEFT = glz._LEFT; const _RIGHT = glz._RIGHT; const _ENTER = glz._ENTER; const _ESC = glz._ESC; const _SPACE = glz._SPACE; const _SHIFT = glz._SHIFT; const _CONTROL = glz._CONTROL; const _BLOCK_SHIFT = glz._BLOCK_SHIFT; const _TAB = glz._TAB; const _Q = glz._Q; const _W = glz._W; const _E = glz._E; const _R = glz._R; const _T = glz._T; const _Y = glz._Y; const _U = glz._U; const _I = glz._I; const _O = glz._O; const _P = glz._P; const _A = glz._A; const _S = glz._S; const _D = glz._D; const _F = glz._F; const _G = glz._G; const _H = glz._H; const _J = glz._J; const _K = glz._K; const _L = glz._L; const _Ñ = glz._Ñ; const _Z = glz._Z; const _X = glz._X; const _C = glz._C; const _V = glz._V; const _B = glz._B; const _N = glz._N; const _M = glz._M; const _COMA = glz._COMA; const _PUNTO = glz._PUNTO; const _GUION = glz._GUION; const _1 = glz._1; const _2 = glz._2; const _3 = glz._3; const _4 = glz._4; const _5 = glz._5; const _6 = glz._6; const _7 = glz._7; const _8 = glz._8; const _9 = glz._9; const _0 = glz._0; const _DELETE = glz._DELETE; const _END = glz._END; const _PAGEDOWN = glz._PAGEDOWN; const all_sound = glz.all_sound;
//=================================================================================
let WIDTH;
let HEIGHT;
let ST = 0;         // maquina de estados del codigo principal de la aplicacion..
let text_inicio;
var loader = [];    // array de loaders para la carga de diferentes tipos de recursos por separado..
let img = [];       // array de imagenes para pixi..
let snd = [];       // array de sonidos para waud..
let mod = [];       // array de modelos 3d..
let idGame;         // puntero al proceso principal..
let idCam;
let idGameController;// id del controlador primcipal de la partida..
let texturas = [];

let mixamo_models = [];

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
            WIDTH = glz.WIDTH;
            HEIGHT = glz.HEIGHT;
            text_inicio = new glz.Write(null, 32, "TOUCH TO START", CENTER, glz.WIDTH / 2, glz.HEIGHT / 2, BLUE, 1);
            ST = 10;
            break;
        case 10:
            if (glz.mouse.left) {
                text_inicio.text = "loading assets..";
                text_inicio.color = 0x000000;
                loader[0] = new LoadImages("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/gui/", 22);
                loader[1] = new LoadSounds("data/Example_12_3d_erkosone_world_game_mechanics_demo/sounds/", 13);

                let assets = [];
                assets.push("data/modelos_3d/corazon/corazon.obj");
                assets.push("data/modelos_3d/externos/estrella/estrella.obj");
                loader[2] = new LoadModels(assets);

                let list = [];
                list.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/models/idle.fbx");
                list.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/models/run.fbx");
                list.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/models/jump.fbx");
                loader[3] = new LoadModels(list);

                // cargar texturas para cubos..
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/000.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/001.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/002.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/003.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/004.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/005.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/006.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/007.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/008.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/009.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/010.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/011.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/012.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/013.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/014.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/tree.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/tree2.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/tree3.png"));
                texturas.push(loadTexture("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/tree4.png"));

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
                mod = loader[2].get();
                mixamo_models = loader[3].get();
                fadeOff(500);
                ST = 30;
            }
            break;
        case 30:
            if (!glz.fading) {
                signal(text_inicio, glz.s_kill);
                letMeAlone();
                idGame = new Game();
                idCam = new Camera3d();
                ST = 40;
            }
            break;
        case 40:
            //console.log(glz.world);
            break;
    }
}
//---------------------------------------------------------------------------------
window.EVENT_game_botonTouchMe = function () {
    idGame.onClick_botonTouchMe();
}
//---------------------------------------------------------------------------------
class Game extends GameObject {
    constructor(st = 0) {
        super();
        this.st = st;
        this.botonTouchMe;
        this.fondo;         // fondo gui..
    }
    initialize() {
        letMeAlone();
    }
    frame() {
        switch (this.st) {
            case 0:
                this.st = 2;
                break;
            case 2:
                soundPlay(snd[1], true);
                new Intro_Suelo(0, 0, 0);
                let o = new GameObject();
                o.setGraph(img[0]);
                o.x = WIDTH / 2;
                o.y = 200;
                o.sizex = 2;
                o.sizey = 1.5;
                o = new GameObject();
                o.setGraph(img[3]);
                o.x = WIDTH / 2;
                o.y = HEIGHT - 35;
                this.botonTouchMe = new EGUIgbutton(img[2], WIDTH / 2, 500, 1);
                this.botonTouchMe.setEvent("EVENT_game_botonTouchMe");
                fadeOn(3000);
                this.st = 10;
                break;
            case 10:
                // esperando touch me..
                break;
            case 20:
                if (!glz.fading) {
                    letMeAlone();
                    this.fondo = new Scroll(img[10], WIDTH, HEIGHT);
                    this.fondo.x = WIDTH / 2;
                    this.fondo.y = HEIGHT / 2;
                    new Intro_selectFile_biselSuperior();
                    fadeOn(2000);
                    this.st = 30;
                }
                break;
            case 30:
                this.fondo.offset.x += 0.2;
                this.fondo.offset.y += 0.1;
                break;
        }
    }
    onClick_botonTouchMe() {
        soundFade(snd[1], 1000);
        soundPlay(snd[0]);
        lockEGUI();
        fadeOff(2000);
        this.st = 20;
    }
    finalize() {

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//=================================================================================
class Intro_Suelo extends GameObject {
    constructor(x, y, z) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.textures = [];
    }
    initialize() {
        this.textures.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/000.png");
        this.textures.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/001.png");
        this.textures.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/002.png");
        this.textures.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/003.png");
        this.textures.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/004.png");
        this.textures.push("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/005.png");
        for (let i = 0; i < 500; i++) {
            let b = screenDrawSprite(this.textures[int(random(0, 5))], random(-100, 100), this.y + 8, random(-100, 100));
            b.size = 6;

        }

        this.createMaterial(TEXTURED, "data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/checkerboard.jpg", true);
        this.createPlane(200, 200);
        this.createBody(TYPE_PLANE);
        idCam.enableMouseControl = false;
    }
    frame() {
        idCam.rotateX(-10);
    }
    finalize() {
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
window.EVENT_intro_selectFile_botonJugar = function () {
    glz._id_.father.onClick_botonJugar();
}
//---------------------------------------------------------------------------------
window.EVENT_intro_selectFile_botonAtras = function () {
    glz._id_.father.onClick_botonAtras();
}
//---------------------------------------------------------------------------------
class Intro_selectFile_biselSuperior extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.ydest = 55;
        this.gameModes = [];
        this.botonAtras;
        this.botonJugar;
        this.modoSeleccionado = "";
    }
    initialize() {
        this.x = glz.WIDTH / 2;
        this.y = -100;
        this.setGraph(img[4]);
        this.botonAtras = new EGUIgbutton(img[12], 140, HEIGHT - 50, 0.8);
        this.botonAtras.setEvent("EVENT_intro_selectFile_botonAtras");
        soundStop(all_sound, snd);
        soundPlay(snd[2], true);
    }
    frame() {
        switch (this.st) {
            case 0:
                let delta = this.ydest - this.y;
                if (this.y < this.ydest) {
                    this.y += delta / 20;
                    if (this.y > 50) {
                        new Write(null, 42, "Selecciona un tipo de juego", CENTER, WIDTH / 2, 50, WHITE, 1);
                        this.st = 10;
                    }
                }
                break;
            case 10:
                let b;
                b = new Intro_selectFile_biselSuperior_sub_gameType(WIDTH / 10 * 2, "Level 1");
                this.gameModes.push(b);
                b = new Intro_selectFile_biselSuperior_sub_gameType(WIDTH / 2, "Level 2");
                this.gameModes.push(b);
                b = new Intro_selectFile_biselSuperior_sub_gameType(WIDTH / 10 * 8, "Level 3");
                this.gameModes.push(b);
                this.st = 20;
                break;
            case 20:
                // limbo..
                break;
            case 30:
                if (!exists(this.botonJugar)) {
                    this.botonJugar = new EGUIgbutton(img[13], WIDTH - 140, HEIGHT - 50, 0.8);
                    this.botonJugar.setEvent("EVENT_intro_selectFile_botonJugar");
                }
                this.st = 20;
                break;

            case 100:
                // jugar!
                soundPlay(snd[0]);
                lockEGUI();
                soundFade(snd[2], 1000);
                fadeOff(1000);
                this.st = 110;
                break;
            case 110:
                if (!glz.fading) {
                    letMeAlone();
                    idGameController = new GameController(this.modoSeleccionado);
                }
                break;

            case 1000:
                // volver atras.. a la pantalla del titulo..
                soundPlay(snd[3]);
                fadeOff(1000);
                lockEGUI();
                this.st = 1010;
                break;
            case 1010:
                if (!glz.fading) {
                    soundStop(all_sound, snd);
                    idGame = new Game();
                }
                break;
        }
    }
    onClick_botonAtras() {
        this.st = 1000;
    }
    onEvent_gameType_selected() {
        this.st = 30;
    }
    onClick_botonJugar() {
        this.st = 100;
    }
}
//---------------------------------------------------------------------------------
class Intro_selectFile_biselSuperior_sub_gameType extends GameObject {
    constructor(xdest, gameType) {
        super();
        this.st = 0;
        this.xdest = xdest;
        this.gameType = gameType;
        this.idText;
        this.maskSelected;
        this.anima = 0;
    }
    initialize() {
        this.x = -100;
        this.y = 350;
        this.setGraph(img[6]);
        this.idText = new Write(null, 42, this.gameType, CENTER, this.x, this.y - 85, WHITE, 1);
    }
    frame() {
        this.idText.x = this.x;
        switch (this.st) {
            case 0:
                let delta = this.xdest - this.x;
                if (this.x < this.xdest) {
                    let dx_ = delta / 20;
                    if (dx_ < 4) dx_ = 4;
                    this.x += dx_;
                } else {
                    this.maskSelected = new screenDrawGraphic(img[5], this.x, this.y, 0, 1, 1, 1);
                    this.maskSelected.visible = false;
                    this.st = 10;
                }
                break;
            case 10:
                if (this.touched()) {
                    this.maskSelected.visible = true;
                    this.father.modoSeleccionado = this.gameType;
                    for (let i = 0; i < this.father.gameModes.length; i++) {
                        if (this.father.gameModes[i] != this) {
                            if (this.father.gameModes[i].maskSelected != undefined) {
                                this.father.gameModes[i].maskSelected.visible = false;
                            }
                        }
                    }
                    this.father.onEvent_gameType_selected();
                    soundPlay(snd[4]);
                    this.st = 20;
                }
                break;
            case 20:
                if (this.maskSelected.visible) {
                    this.anima = (this.anima + 5) % 360;
                    this.maskSelected.size = 1 + 0.02 * sin(radians(this.anima));
                }
                if (!this.maskSelected.visible) {
                    this.st = 10;
                }
                break;
        }
    }
}
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
window.event_gameController__botonSaltar = function () {
    idGameController.scene.idPerso.jump();
}
//---------------------------------------------------------------------------------
class GameController extends GameObject {
    constructor(gameMode) {
        super();
        this.gameMode = gameMode;
        this.st = 0;
        this.scene = undefined;
        this.idJoy;
    }
    frame() {
        switch (this.st) {
            case 0:
                soundStop(all_sound, snd);
                letMeAlone();
                this.launchScene();

                // hud..
                if (isMobile()) {
                    let b = new EGUIbutton(null, 32, "SALTAR", (WIDTH / 4) * 3, HEIGHT - 120, WHITE);
                    b.setArea(260, 140);
                    b.setEvent("event_gameController__botonSaltar");
                    this.idJoy = new JoyStick((WIDTH / 4), (HEIGHT / 2), WIDTH / 2, HEIGHT);
                    //this.idJoy.setVisible(false);
                }

                fadeOn(2000);
                this.st = 10;
                break;
            case 10:

                break;
        }
    }
    launchScene() {
        console.log(this.gameMode);
        switch (this.gameMode) {
            case "Level 1":
                this.scene = new Escena_1();
                break;
            case "Level 2":
                this.scene = new Escena_2();
                break;
            case "Level 3":

                break;
        }
    }
}
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class HealthMeter extends GameObject {
    constructor() {
        super();
        this.vida = 8;
        this.images = [14, 15, 16, 17, 18, 19, 20, 21, 22];
        this.images.reverse();
        this.st = 0;
        this.c = 0;
        this.pushHealth = 0;
        this.popHealth = 0;
        this.idText = new Write(null, 32, glz.fps, CENTER, WIDTH - 50, 50, YELLOW, 1);
        this.muerto = false;
    }
    initialize() {
        this.x = 70;
        this.y = 70;
        this.size = 2.5;
        this.setGraph(img[this.images[this.vida]]);
    }
    frame() {
        this.idText.setText(glz.fps);

        if (this.vida == 0 && this.muerto == false) {
            this.muerto = true;
            this.father.onEvent_hasMuerto();
        }


        switch (this.st) {
            case 0:
                if (this.pushHealth > 0) {
                    this.pushHealth--;
                    this.st = 10;
                } else if (this.popHealth > 0) {
                    this.popHealth--;
                    this.st = 30;
                }
                break;
            case 10:
                // SUBIR VIDA..
                if (this.vida < 8) {
                    this.vida++;
                    soundPlay(snd[6]);
                    this.setGraph(img[this.images[this.vida]]);
                    this.c = 0;
                    this.st = 20;
                }
                break;
            case 20:
                this.c = (this.c + 1) % 30;
                if (this.c == 0) {
                    this.st = 0;
                }
                break;
            case 30:
                // BAJAR VIDA..
                if (this.vida > 0) {
                    this.vida--;
                    soundPlay(snd[7]);
                    this.setGraph(img[this.images[this.vida]]);
                    this.c = 0;
                    this.st = 40;
                }
                break;
            case 40:
                this.c = (this.c + 1) % 30;
                if (this.c == 0) {
                    this.st = 0;
                }
                break;
        }
    }
    suma(value) {
        this.pushHealth = value;
    }
    resta(value) {
        this.popHealth = value;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Escena_1 extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.idJoy;
        this.idPerso;
        this.healtMeter;
        this.meta;
        this.musica;
        // el data vamos a guardar la informacion de los objetos del nivel..
        // asi podremos verificar si se cumplen determinadas condiciones y 
        // tomar acciones en consecuencia..
        // para este nivel una mecanica va a ser disponer 3 cubos que pueden cambiar de color
        // al ser golpeados por el personaje..
        // si en algun momento los cubos estan del mismo color indicaremos que hay que crear una
        // plataforma llamada "meta" hasta donde tendremos que llegar para superar definitivamente esta prueba.
        this.data = new Map();  // datos del nivel..
    }
    initialize() {
        // gravedad escena..
        setGravity(0, -60, 0);

        // suelo escena..
        new Plano("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/015.png", 600, 600);

        // cancion escena..
        this.musica = snd[5];
        soundPlay(this.musica, true);

        // personaje para esta escena..
        //this.idPerso = new Personaje();
        this.idPerso = new Personaje2();
        this.healtMeter = new HealthMeter();


        // configuracion sistema segun esta escena..
        idCam.setTarget(this.idPerso);
        idCam.setTargetDistance(10);
        idCam.setFreeMoveDistance(2);
        idCam.setCollision(false);
        idCam.resetX();
        idCam.resetY();
        idCam.rotateY(1500);

        // items mundo..
        new CuboSwitch4Colores("CuboSwitch4Colores_1", 10, 6, 10, 0);
        new CuboSwitch4Colores("CuboSwitch4Colores_2", 0, 6, 10, 1);
        new CuboSwitch4Colores("CuboSwitch4Colores_3", -10, 6, 10, 3);

        new Corazon(10, 3, 20);
        new Corazon(0, 3, 20);
        new Corazon(-10, 3, 20);
        new Corazon(10, 3, 30);
        new Corazon(0, 3, 30);
        new Corazon(-10, 3, 30);




    }
    frame() {
        // codigo principal del controlador de la escena..
        switch (this.st) {
            case 0:
                // si bajo el volumen de la musica por algun evento..
                // se volvera a subir..
                if (!soundIsPlaying(snd[9])) {
                    soundSetVolume(this.musica, 0.5);
                }
                break;
            case 10:
                // ESTADO ESPERANDO EL FADE FIN DE ESCENA..
                if (!glz.fading) {
                    signal(this, s_kill);
                    idGame = new Game(20);    // vuelvo al menu de inicio.. indico st=20 para que vaya a la pantalla de seleccion de niveles..
                }
                break;

            case 100:
                // ESTADO QUE CAMBIA LA CAMARA..
                idCam.setDummy(this.meta);
                idCam.enableCollision = false;
                this.st = 110;
                break;
            case 110:
                if (!idCam.isDummyMove()) {
                    idCam.setDummy(this.idPerso);
                    this.st = 120;
                }
                break;
            case 120:
                if (!idCam.isDummyMove()) {
                    idCam.setDummy(undefined);
                    idCam.enableCollision = true;
                    this.st = 0;
                }
                break;
        }
    }
    onEvent_CuboSwitch4Colores_switchToNextTexture(nombreElemento, value) {
        this.data.set(nombreElemento, value);
        let a = this.data.get("CuboSwitch4Colores_1");
        let b = this.data.get("CuboSwitch4Colores_2");
        let c = this.data.get("CuboSwitch4Colores_3");
        if (a === b && a === c) {
            if (!this.meta) {
                // meta para superar el nivel..
                soundPlay(snd[9]);
                this.meta = new Meta(this.idPerso, 10, 10, 20);
                soundSetVolume(this.musica, 0.1);
                this.st = 100;
            }
        }
    }
    onEvent_nivelSuperado() {
        soundStop(all_sound, snd);
        soundPlay(snd[10]);
        this.idPerso.disableControls();
        fadeOff(5000);
        this.st = 10;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
window.EVENT_personaje2_collisionStart = function (evento) {
    let perso = evento.target.gameObject;
    perso.onEvent_collisionStart(evento);

}
//---------------------------------------------------------------------------------
class Personaje2 extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.texturas = [];
        this.vel = 7;
        this.oremus = 0;    // el angulo para ir hacia el norte.. lo saco de la longitud de la camara..
        this.lockJump = false;
        this.light;
        this.controlable = true;
        this.flag_sonido_salto = false;
        this.saltar = false;                // esta variable se puede poner a true de forma externa para saltar con un boton..
        this.action = "stand";
    }
    initialize() {
        this.y = 5;
        this.offset_mesh_y = -1;
    }
    jump() {
        this.saltar = true;
    }
    onEvent_collisionStart(e) {
        // recibo en este metodo el evento de la colision..
        // vamos a extraer la fuerza del impacto y a compararlo con un minimo..
        // si execedemos minimo hay golpe y daño..
        let vImpacto = abs(e.target.gameObject.body.velocity.y);
        if (vImpacto > 50) {
            this.father.healtMeter.resta(2);
        } else if (vImpacto > 30) {
            this.father.healtMeter.resta(1);
        }
    }
    frame() {

        switch (this.st) {
            case 0:
                this.alpha = 0;

                let modelo = glz.mixamoMerger(mixamo_models);
                this.setModel(modelo);
                this.clipSet(0);
                this.clipPlay();
                this.createBody(TYPE_SPHERE, 1.2);
                this.enableShadows(false);
                this.addGroundControl();
                this.size = 0.0125;

                this.setEventCollisionStart("EVENT_personaje2_collisionStart");

                this.light = new PointLight(WHITE, 10);
                this.light.setTarget(idCam);

                this.st = 10;
                break;
            case 10:

                this.light.setIntensity(idCam.targetDistance * 30);

                this.animar();

                if (this.controlable) {
                    this.controls();
                } else {
                    this.setRotationY(this.oremus);
                    this.brakeZ(0.9);
                    this.brakeX(0.9);
                }

                if (this.flag_sonido_salto) {
                    if (this.isOnGround()) {
                        if (this.lockJump == false) {
                            this.flag_sonido_salto = false;
                            soundPlay(snd[12]);
                        }
                    }
                } else {
                    // SI NO HE SALTADO TODAVIA..
                    if (this.lockJump == true) {
                        // SI SALTO..
                        this.flag_sonido_salto = true;
                    }
                }


                break;

        }
    }
    animar() {
        if (this.action != "jump") {
            if (key(_UP) || key(_DOWN) || key(_LEFT) || key(_RIGHT)) {
                this.action = "run";
            } else {
                this.action = "stand";
            }
        } else {
            if(this.flag_sonido_salto==false){
                if (key(_UP) || key(_DOWN) || key(_LEFT) || key(_RIGHT)) {
                    this.action = "run";
                } else {
                    this.action = "stand";
                }
            }
        }
        switch (this.action) {
            case "jump":
                this.clipSwitch(2, 500, 1);
                break;
            case "run":
                this.clipSwitch(1, 500, Infinity);
                break;
            case "stand":
                this.clipSwitch(0, 500, Infinity);
                break;
        }

    }
    controls() {
        let joyData;
        if (isMobile()) {
            joyData = idGameController.idJoy.get();
            if (joyData.active) {
                let ajusteVelocidad = joyData.distance / 100;
                let v = this.vel * ajusteVelocidad;
                if (v > this.vel) v = this.vel;
                this.setVelocityFromCamera(v, joyData.angle - 90, idCam);
                this.oremus = joyData.angle - 180;
            }
        }


        if (key(_UP)) {
            this.setVelocityFromCamera(this.vel, 0, idCam);
            this.oremus = idCam.lon;
        }
        if (key(_DOWN)) {
            this.setVelocityFromCamera(this.vel, 180, idCam);
            this.oremus = idCam.lon - 180;
        }
        if (key(_LEFT)) {
            this.setVelocityFromCamera(this.vel, 90, idCam);
            this.oremus = idCam.lon + 90;
        }
        if (key(_RIGHT)) {
            this.setVelocityFromCamera(this.vel, -90, idCam);
            this.oremus = idCam.lon - 90;
        }

        if ((key(_SPACE) || this.saltar) && this.isOnGround() && !this.lockJump) {
            this.saltar = false;
            this.setVy(0);
            this.addVy(.02);
            this.lockJump = true;
            this.action = "jump";
        }

        if (!key(_SPACE)) {
            this.lockJump = false;
        }
        this.setRotationY(this.oremus);

        if (!key(_UP) && !key(_DOWN)) {
            this.brakeZ(0.1);
        }
        if (!key(_LEFT) && !key(_RIGHT)) {
            this.brakeX(0.1);
        }
    }

    disableControls() {
        this.controlable = false;
    }
    enableControls() {
        this.controlable = true;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Corazon extends GameObject {
    constructor(x, y, z) {
        super();
        this.st = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    initialize() {
        this.setModel(mod[0]);
    }
    frame() {
        this.angley++;
        switch (this.st) {
            case 0:
                let dist = this.mesh.position.distanceTo(this.father.idPerso.mesh.position);
                if (dist < 2) {
                    this.father.healtMeter.suma(1);
                    this.st = 10;
                }
                break;
            case 10:
                if (this.size > 0) {
                    this.size -= 0.05;
                } else {
                    signal(this, s_kill);
                }
                break;
        }
    }
}
//---------------------------------------------------------------------------------
class Plano extends GameObject {
    constructor(textura, w, h) {
        super();
        this.textura = textura;
        this.w = w;
        this.h = h;
    }
    initialize() {
        this.createMaterial(TEXTURED, this.textura, true, 40);
        this.createPlane(this.w, this.h);
        this.createBody(TYPE_PLANE);
        //this.enableShadows(true);
    }
}
//---------------------------------------------------------------------------------
window.EVENT_CuboSwitch4Colores_startCollision = function (event) {
    event.target.gameObject.switchToNextTexture();
}
//---------------------------------------------------------------------------------
class CuboSwitch4Colores extends GameObject {
    constructor(nombreElemento, x, y, z, anima) {
        super();
        this.animation = [0, 1, 2, 3];  // texturas para los cubos..
        this.anima = anima;                 // textura seleccionada..
        this.nombreElemento = nombreElemento;
        this.x = x;
        this.y = y;
        this.z = z;
        this.delay = 0;                 // = 0 is available for new texture change..
    }
    initialize() {
        this.createMaterial(TEXTURED, texturas[this.animation[this.anima]], false);
        this.createBox(3, 3, 3);
        this.createBody(TYPE_BOX);
        this.setStatic(true);
        this.setEventCollisionStart("EVENT_CuboSwitch4Colores_startCollision");
        this.father.data.set(this.nombreElemento, this.anima);
    }
    frame() {
        if (this.delay > 0) this.delay--;
    }
    switchToNextTexture() {
        if (this.delay == 0) {
            if (!this.father.meta) {
                soundPlay(snd[8]);
                this.anima = (this.anima + 1) % this.animation.length;
                this.setTexture(texturas[this.animation[this.anima]]);
                // informo al manager de la escena de este cambio..
                this.father.onEvent_CuboSwitch4Colores_switchToNextTexture(this.nombreElemento, this.anima);
                this.delay = 25;
            }

        }
    }
}
//---------------------------------------------------------------------------------
class Meta extends GameObject {
    constructor(idPerso, x, y, z) {
        super();
        this.st = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.objPersonaje = idPerso;
        this.estrella;
    }
    initialize() {
        this.createMaterial(TEXTURED, texturas[7], false);
        this.createCylinder(5, 5, 1);
        this.createBody(TYPE_CYLINDER);
        this.setStatic(true);
        this.estrella = new Estrella(this.objPersonaje, this.x, this.y + 1, this.z);
    }
    frame() {
        if (this.delay > 0) this.delay--;
    }
}
//---------------------------------------------------------------------------------
class Estrella extends GameObject {
    constructor(target, x, y, z) {
        super();
        this.st = 0;
        this.target = target;   // el target es el puntero al personaje.. para calcular el overlap
        this.x = x;
        this.y = y;
        this.z = z;
        this.c = 0;
    }
    initialize() {
        this.size = 0.01;
        this.setModel(mod[1]);
        //this.setEventCollisionStart("EVENT_CuboSwitch4Colores_startCollision");
    }
    frame() {
        switch (this.st) {
            case 0:
                this.c = (this.c + 5) % 360;
                this.size = 0.01 + 0.001 * sin(radians(this.c));

                let dist = this.mesh.position.distanceTo(this.target.mesh.position);
                if (dist < 2) {
                    this.target.father.onEvent_nivelSuperado();
                    this.st = 10;
                }
                break;
            case 10:
                if (this.size > 0) {
                    this.size -= 0.005;
                } else {
                    signal(this, s_kill);
                }
                break;
        }

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Escena_2 extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.idPerso;
        this.healtMeter;
        this.meta;
        this.musica;
        // el data vamos a guardar la informacion de los objetos del nivel..
        // asi podremos verificar si se cumplen determinadas condiciones y 
        // tomar acciones en consecuencia..
        // para este nivel una mecanica va a ser disponer 3 cubos que pueden cambiar de color
        // al ser golpeados por el personaje..
        // si en algun momento los cubos estan del mismo color indicaremos que hay que crear una
        // plataforma llamada "meta" hasta donde tendremos que llegar para superar definitivamente esta prueba.
        this.data = new Map();  // datos del nivel..
    }
    onEvent_hasMuerto() {
        soundStop(all_sound, snd);
        soundPlay(snd[13]);
        this.idPerso.disableControls();
        fadeOff(2500);
        this.st = 10;
    }
    initialize() {
        // gravedad escena..
        setGravity(0, -60, 0);

        // suelo escena..
        new Plano("data/Example_12_3d_erkosone_world_game_mechanics_demo/images/textures/009.png", 600, 600);

        // cancion escena..
        this.musica = snd[11];
        soundPlay(this.musica, true);

        // personaje para esta escena..
        this.idPerso = new Personaje2();
        this.healtMeter = new HealthMeter();


        // configuracion sistema segun esta escena..
        //idCam.enableMouseControl = true;
        //idCam.enableCollision = true;
        idCam.setTarget(this.idPerso);
        idCam.setTargetDistance(14);
        idCam.setFreeMoveDistance(2);
        idCam.setCollision(false);

        idCam.resetX();
        idCam.resetY();
        idCam.rotateY(1500);


        // items mundo..
        new Arbol(texturas[15], 30, 1, 10);
        new Arbol(texturas[16], 0, 1, 10);
        new Arbol(texturas[17], -30, 1, 10);
        new Arbol(texturas[18], 0, 1, -30);

        new Plataforma_elevadora(texturas[10], 0, 4, 0, 0, 10, 500);
        new Plataforma_elevadora(texturas[10], -10, 15, 0, 5, 5, 500);
        new Plataforma_elevadora(texturas[12], -10, 30, 10, 10, 0, 500);

        new Plataforma_fija(texturas[13], -10, 30, 20, 10, 10);

    }
    frame() {

        //console.log(idCam.pointerX);

        // codigo principal del controlador de la escena..
        switch (this.st) {
            case 0:
                // si bajo el volumen de la musica por algun evento..
                // se volvera a subir..
                if (!soundIsPlaying(snd[9])) {
                    soundSetVolume(this.musica, 0.5);
                }
                break;
            case 10:
                // ESTADO ESPERANDO EL FADE FIN DE ESCENA..
                if (!glz.fading) {
                    signal(this, s_kill);
                    idGame = new Game(20);    // vuelvo al menu de inicio.. indico st=20 para que vaya a la pantalla de seleccion de niveles..
                }
                break;

            case 100:
                // ESTADO QUE CAMBIA LA CAMARA..
                idCam.setDummy(this.meta);
                idCam.enableCollision = false;
                this.st = 110;
                break;
            case 110:
                if (!idCam.isDummyMove()) {
                    idCam.setDummy(this.idPerso);
                    this.st = 120;
                }
                break;
            case 120:
                if (!idCam.isDummyMove()) {
                    idCam.setDummy(undefined);
                    idCam.enableCollision = true;
                    this.st = 0;
                }
                break;
        }
    }
    onEvent_CuboSwitch4Colores_switchToNextTexture(nombreElemento, value) {
        this.data.set(nombreElemento, value);
        let a = this.data.get("CuboSwitch4Colores_1");
        let b = this.data.get("CuboSwitch4Colores_2");
        let c = this.data.get("CuboSwitch4Colores_3");
        if (a === b && a === c) {
            if (!this.meta) {
                // meta para superar el nivel..
                soundPlay(snd[9]);
                this.meta = new Meta(this.idPerso, 10, 10, 20);
                soundSetVolume(this.musica, 0.1);
                this.st = 100;
            }
        }
    }
    onEvent_nivelSuperado() {
        soundStop(all_sound);
        soundPlay(snd[10]);
        this.idPerso.disableControls();
        fadeOff(5000);
        this.st = 10;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Arbol extends GameObject {
    constructor(tex, x, y, z) {
        super();
        this.st = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.tex = tex;
        this.collider = new Arbol_sub_collider(x, y, z);
    }
    initialize() {
        this.size = 14;
        this.createSprite(this.tex);
        this.mesh.center.y = 0;
    }
    frame() {
        switch (this.st) {
            case 0:

                break;
            case 10:

                break;
        }
    }
}
//---------------------------------------------------------------------------------
class Arbol_sub_collider extends GameObject {
    constructor(x, y, z) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
    initialize() {
        this.y += 4;
        this.z += 1.5;
        this.createCylinder(2, 2, 8);
        this.createBody(TYPE_CYLINDER);
        this.setStatic(true);
        this.visible = false;
    }

}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Plataforma_elevadora extends GameObject {
    constructor(tex, x, y, z, hmin, hmax, waitTime) {
        super();
        this.st = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.tex = tex;
        this.hmin = hmin;
        this.hmax = hmax;
        this.waitTime = waitTime;
        this.ymin = this.y - hmin;  // posicion inferior minima..
        this.ymax = this.y + hmax;  // posicion superior maxima..
        this.vel = 0.05;

        this.time;


    }
    initialize() {
        this.createMaterial(TEXTURED, this.tex, false);
        this.createBox(5, 0.5, 5);
        this.createBody(TYPE_BOX);
        this.setStatic(true);
    }
    frame() {
        switch (this.st) {
            case 0:
                if (this.y < this.ymax) {
                    this.translateY(this.vel);
                } else {
                    this.time = millis();
                    this.st = 10;
                }
                break;
            case 10:
                // esperar tiempo de waitTime en ms..
                if (millis() > this.time + this.waitTime) {
                    this.st = 20;
                }
                break;
            case 20:
                if (this.y > this.ymin) {
                    this.translateY(-this.vel);
                } else {
                    this.time = millis();
                    this.st = 30;
                }
                break;
            case 30:
                // esperar tiempo de waitTime en ms..
                if (millis() > this.time + this.waitTime) {
                    this.st = 0;
                }
                break;
        }
    }
}
//---------------------------------------------------------------------------------
class Plataforma_fija extends GameObject {
    constructor(tex, x, y, z, xsize, zsize) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.tex = tex;
        this.xsize = xsize;
        this.zsize = zsize;
    }
    initialize() {
        this.createMaterial(TEXTURED, this.tex, false);
        this.createBox(this.xsize, 0.5, this.zsize);
        this.createBody(TYPE_BOX);
        this.setStatic(true);
    }
    frame() {

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------