// Libreria para la creacion de videojuegos web licenciada bajo: [MIT License].
//=================================================================================
// GameLibZeroWEB - 4Div - 2024 - By Erkosone. v1.0 
//=================================================================================
import * as glz from '../../library/4Div.js';
const Process = glz.GameObject; const GameObject = glz.GameObject; const JoyStick = glz.JoyStick; const StringList = glz.StringList; const Scroll = glz.Scroll; const Write = glz.Write; const LoadImages = glz.LoadImages; const LoadSounds = glz.LoadSounds; const Camera3d = glz.Camera3d; const PointLight = glz.PointLight; const SoundPlayTimed = glz.SoundPlayTimed; const LoadModels = glz.LoadModels; const EGUIbutton = glz.EGUIbutton; const EGUIgbutton = glz.EGUIgbutton; const EGUIinputBox = glz.EGUIinputBox;
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
let idGame;         // puntero al proceso principal..
let idCam;

const TYPE_ENTITY = -1111;

window.setup = function () {
    setBackgroundColor(GRAY);          // color de fondo de pantalla..
    setFadingColor(0xffffff);           // color del fade de pantalla..
    enableShadows(true);               // activa el sistema de sobras..
    setMode(1280, 720, false, true);    // define la resolucion grafica..
    setFps(60);                         // limita los fotogramas por segundo..
    setFog(0, 250);                     // configura la niebla del entorno 3d..
    setAmbientLight(WHITE, 0.6);        // iluminacion ambiental de la escena 3d..
    glz.setCameraPosition(0, 20, -50);  // set position inicial de la camara hacia la escena..
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
                loader[0] = new LoadImages("data/Example_14_escenas/images/gui/", 2);
                //loader[1] = new LoadSounds("data/Example_14_escenas/sounds/", 0);
                //let lista = [];
                //lista.push("data/modelos_3d/escenas/escena_0/escena_0.obj");
                //loader[0] = new LoadModels(lista);

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
                //mod = loader[0].get();
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
                idCam.setTargetDistance(50);
                let l = new PointLight(WHITE, 5000);
                l.setTarget(idCam);
                ST = 40;
            }
            break;
        case 40:
            idCam.manualMovement();
            break;
    }
}
//---------------------------------------------------------------------------------
class Game extends Process {
    constructor() {
        super();
        this.st = 0;
        this.target = undefined;
        this.sizeSteep = 0.1;
        this.angleSteep = 5;
        this.transSteep = 1;
        this.rSteep = 0.5;
        this.filename = "escena.txt";
        this.data = [];
        this.first_process_intersected_by_mouse = undefined;
        this.text;
        this.gui;
    }

    initialize() {
        //new Write(null, 22, "1=Cube, 2=Sphere, 3=Cylinder", CENTER, WIDTH / 2, 20, WHITE, 1);
        this.gui = new Gui();
        fadeOn(1000);
    }

    frame() {
        switch (this.st) {
            case 0:
                //..
                if (this.target) {

                    // liberar foco de la camara..
                    if (key(_ESC)) {
                        this.unsetTarget();
                    }

                    if (key(_R)) {
                        if (glz.keyCode == 45) this.target.anglex -= this.angleSteep;
                        if (glz.keyCode == 46) this.target.anglex += this.angleSteep;
                        if (glz.keyCode == 36) this.target.angle -= this.angleSteep;
                        if (glz.keyCode == 35) this.target.angle += this.angleSteep;
                        if (glz.keyCode == 33) this.target.angley -= this.angleSteep;
                        if (glz.keyCode == 34) this.target.angley += this.angleSteep;
                    } else if (key(_S)) {
                        switch (this.target.geometryType) {
                            case "CUBE":
                                if (glz.keyCode == 45) this.target.sizex -= this.sizeSteep;
                                if (glz.keyCode == 46) this.target.sizex += this.sizeSteep;
                                if (glz.keyCode == 36) this.target.sizez -= this.sizeSteep;
                                if (glz.keyCode == 35) this.target.sizez += this.sizeSteep;
                                if (glz.keyCode == 33) this.target.sizey -= this.sizeSteep;
                                if (glz.keyCode == 34) this.target.sizey += this.sizeSteep;
                                break;
                            case "SPHERE":
                                if (glz.keyCode == 45) this.target.sizex -= this.sizeSteep;
                                if (glz.keyCode == 46) this.target.sizex += this.sizeSteep;
                                if (glz.keyCode == 36) this.target.sizez -= this.sizeSteep;
                                if (glz.keyCode == 35) this.target.sizez += this.sizeSteep;
                                if (glz.keyCode == 33) this.target.sizey -= this.sizeSteep;
                                if (glz.keyCode == 34) this.target.sizey += this.sizeSteep;
                                break;
                            case "CYLINDER":
                                if (glz.keyCode == 45) this.target.rtop -= this.rSteep;
                                if (glz.keyCode == 46) this.target.rtop += this.rSteep;
                                if (glz.keyCode == 36) this.target.rdown -= this.rSteep;
                                if (glz.keyCode == 35) this.target.rdown += this.rSteep;
                                if (glz.keyCode == 33) this.target.height -= this.sizeSteep;
                                if (glz.keyCode == 34) this.target.height += this.sizeSteep;
                                if (glz.keyCode == 45 || glz.keyCode == 46 || glz.keyCode == 36 || glz.keyCode == 35 || glz.keyCode == 33 || glz.keyCode == 34) {
                                    this.target.updateMesh();
                                }
                                break;
                        }
                    } else if (key(_T)) {
                        if (glz.keyCode == 45) this.target.x -= this.transSteep;
                        if (glz.keyCode == 46) this.target.x += this.transSteep;
                        if (glz.keyCode == 36) this.target.z -= this.transSteep;
                        if (glz.keyCode == 35) this.target.z += this.transSteep;
                        if (glz.keyCode == 33) this.target.y -= this.transSteep;
                        if (glz.keyCode == 34) this.target.y += this.transSteep;
                        console.log(this.target.x, this.target.y, this.target.z);
                    }

                } else {

                    // si no hay target..
                    if (glz.mouse.intersects[0] != undefined) {
                        this.first_process_intersected_by_mouse = getGameObjectById(glz.mouse.intersects[0].object.id_);
                    } else {
                        this.first_process_intersected_by_mouse = undefined;
                    }

                    // crear nuevo cubo..
                    if (key(_1)) {
                        new Entity("CUBE");
                        this.st = 10;
                    }
                    if (key(_2)) {
                        new Entity("SPHERE");
                        this.st = 10;
                    }
                    if (key(_3)) {
                        new Entity("CYLINDER");
                        this.st = 10;
                    }

                }
                break;
            case 10:
                if (!key(_1) && !key(_2) && !key(_3) && !key(_D)) {
                    this.st = 0;
                }
                break;
        }
    }
    setTarget(target) {
        this.target = target;
        //idCam.setTarget(target);
    }
    unsetTarget() {
        idCam.setTarget(undefined);
        if (this.target) {
            this.target.free();
            this.target = undefined;
        }
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
window.EVENT_gui_botonUpload = function () {
    idGame.gui.onClick_botonUpload();
}
//-------
window.EVENT_gui_botonDownload = function () {
    idGame.gui.onClick_botonDownload();
}
//-------
window.EVENT_gui_checkButtonPhysicsCollider = function () {
    idGame.gui.onClick_checkButtonPhysicsCollider(glz._id_.value);
}
//-------
window.EVENT_gui_buttonEraseScene = function () {
    idGame.gui.onClick_buttonEraseScene();
}
//-------
class Gui extends GameObject {
    constructor() {
        super();
        this.st = 0;

    }
    initialize() {
        this.x = WIDTH - 100;
        this.y = HEIGHT / 2;
        this.newGraph(200, HEIGHT);
        this.tint(0x111111);

        let b = new EGUIgbutton(img[1], this.x - 70, 50, 0.5);
        b.setLabel(null, 16, "Load file..", RIGHT, 30, 0, WHITE);
        b.setEvent("EVENT_gui_botonUpload");

        b = new EGUIgbutton(img[0], this.x - 70, 90, 0.5);
        b.setLabel(null, 16, "Save file as..", RIGHT, 30, 0, WHITE);
        b.setEvent("EVENT_gui_botonDownload");

        b = new EGUIgbutton(img[2], this.x + 70, 50, 0.6);
        b.setEvent("EVENT_gui_buttonEraseScene");

        new Write(null, 22, "BOXEATOR v1.0", CENTER, this.x, 15, WHITE, 1);
        new Write(null, 14, "OBJETO EN FOCO\n---------------------------", CENTER, this.x, 150, WHITE, 1);
        this.tx = new Write(null, 10, "X: ", RIGHT, this.x - 90, 180, WHITE, 1);
        this.ty = new Write(null, 10, "Y: ", RIGHT, this.x - 90, 190, WHITE, 1);
        this.tz = new Write(null, 10, "Z: ", RIGHT, this.x - 90, 200, WHITE, 1);
        this.tsx = new Write(null, 10, "Sx: ", RIGHT, this.x - 10, 180, WHITE, 1);
        this.tsy = new Write(null, 10, "Sy: ", RIGHT, this.x - 10, 190, WHITE, 1);
        this.tsz = new Write(null, 10, "Sz: ", RIGHT, this.x - 10, 200, WHITE, 1);

    }
    onClick_buttonEraseScene() {
        if (window.confirm("Eliminar toda la escena?")) {
            this.st = 200;
        }
    }
    onClick_checkButtonPhysicsCollider(value) {
        idGame.target.collider = value;
    }
    frame() {

        switch (this.st) {
            case 0:
                if (idGame.target) {

                    if (!exists(this.phys)) {
                        console.log(idGame.target.collider);
                        this.phys = new glz.EGUIcheckButton(this.x - 80, 250, 16, 16, idGame.target.collider);
                        this.phys.setLabel(null, 14, "Physics collider?", RIGHT, 16, 0, WHITE);
                        this.phys.setEvent("EVENT_gui_checkButtonPhysicsCollider");
                    }

                    this.tx.setText("X: " + idGame.target.x);
                    this.ty.setText("Y: " + idGame.target.y);
                    this.tz.setText("Z: " + idGame.target.z);
                    if (idGame.target.geometryType == "CYLINDER") {
                        this.tsx.setText("R_TOP:     " + idGame.target.rtop.toFixed(2));
                        this.tsy.setText("R_DOWN: " + idGame.target.rdown.toFixed(2));
                        this.tsz.setText("HEIGHT:    " + idGame.target.height.toFixed(2));
                    } else {
                        this.tsx.setText("Sx: " + idGame.target.sizex.toFixed(2));
                        this.tsy.setText("Sy: " + idGame.target.sizey.toFixed(2));
                        this.tsz.setText("Sz: " + idGame.target.sizez.toFixed(2));
                    }
                } else {

                    if (this.phys != undefined) {
                        signal(this.phys, s_kill);
                    }

                    this.tx.setText("X: ---");
                    this.ty.setText("Y: ---");
                    this.tz.setText("Z: ---");
                    this.tsx.setText("Sx: ---");
                    this.tsy.setText("Sy: ---");
                    this.tsz.setText("Sz: ---");
                }
                break;
            case 10:

                break;
            case 100:
                // wait to load scene file..
                if (this.escenaCargada) {
                    if (this.escenaCargada.ready) {
                        this.st = 110;
                    }
                }
                break;
            case 110:
                // archivo de escena ya esta cargado..
                // limpiamos escena actual..
                signalType(TYPE_ENTITY, s_kill);
                // instanciar los objetos leidos del archivo de escena..
                let lines = this.escenaCargada.get();
                for (let i = 0; i < lines.length - 1; i++) {
                    let params = lines[i].split("~");
                    let obj = undefined;
                    for (let j = 0; j < params.length; j++) {
                        let param = params[j].split(":");
                        switch (param[0]) {
                            case "type":
                                obj = new Entity(param[1]);
                                break;
                            case "collider":
                                obj[param[0]] = glz.parseBoolean(param[1]);
                                break;
                            default:
                                obj[param[0]] = parseFloat(param[1]);
                                break;
                        }

                    }
                }
                idGame.unsetTarget();
                this.st = 0;
                break;
            case 200:
                // limpiamos escena actual..
                signalType(TYPE_ENTITY, s_kill);
                idGame.unsetTarget();
                this.st = 0;
                break;
        }

    }
    //-------
    onClick_botonUpload() {
        this.escenaCargada = glz.uploadTxt();
        this.st = 100;
    }
    //-------
    onClick_botonDownload() {
        let data = "";
        for (let i = 0; i < glz.gameObjects.length; i++) {
            if (glz.gameObjects[i].getClassName() == "Entity") {
                data += glz.gameObjects[i].getData() + "\n";
            }
        }
        glz.downloadTxt("escena.txt", data);
    }
    //-------
    finalize() {

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Entity extends Process {
    constructor(type) {
        super();
        this.st = 0;
        this.geometryType = type
        this.rtop = 10;
        this.rdown = 10;
        this.height = 10;
        this.setType(TYPE_ENTITY);
        this.collider = true;
    }

    initialize() {
        this.createMaterial(PHONG, GRAY);
        switch (this.geometryType) {
            case "CUBE":
                this.createBox(10, 10, 10);
                break;
            case "SPHERE":
                this.createSphere(10, 10);
                break;
            case "CYLINDER":
                this.createCylinder(this.rtop, this.rdown, this.height);
                break;
        }
        this.enableShadows(true);
    }

    frame() {
        switch (this.st) {
            case -10:
                this.createCylinder(this.rtop, this.rdown, this.height);
                this.st = 0;
                break;
            case 0:
                if (idGame.first_process_intersected_by_mouse == this) {
                    this.tint(YELLOW);
                    if (glz.mouse.right) {
                        this.tint(ORANGE);
                        idGame.setTarget(this);
                        this.st = 10;
                    }
                } else {
                    if (this.collider) {
                        this.noTint();
                    } else {
                        this.tint(0x555555);
                    }
                }
                break;
            case 10:
                // estoy en foco..
                break;
        }

    }
    updateMesh() {
        this.createCylinder(this.rtop, this.rdown, this.height);
    }
    free() {
        this.noTint();
        this.st = 0;
    }
    getData() {
        let data = "";
        data += "type:" + this.geometryType;
        data += "~x:" + this.x;
        data += "~y:" + this.y;
        data += "~z:" + this.z;
        data += "~anglex:" + this.anglex;
        data += "~angley:" + this.angley;
        data += "~anglez:" + this.angle;
        switch (this.geometryType) {
            case "CYLINDER":
                data += "~rtop:" + this.rtop;
                data += "~rdown:" + this.rdown;
                data += "~height:" + this.height;
                break;
            default:
                data += "~sizex:" + this.sizex;
                data += "~sizey:" + this.sizey;
                data += "~sizez:" + this.sizez;
                break;
        }
        data += "~collider:" + this.collider;
        return data;
    }
    finalize() {

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------