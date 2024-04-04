// Libreria para la creacion de videojuegos web licenciada bajo: [MIT License].
//=================================================================================
// GameLibZeroWEB - 4Div - 2024 - By Erkosone. v1.0 
//=================================================================================
import * as glz from '../../library/4Div.js';
//=================================================================================
let ST = 0;         // maquina de estados del codigo principal de la aplicacion..
let text_inicio;
var loader = [];    // array de loaders para la carga de diferentes tipos de recursos por separado..
let img = [];       // array de imagenes para pixi..
let snd = [];       // array de sonidos para waud..
let mod = [];       // array de modelos 3d..
let fnt = [];
let idGame;         // puntero al proceso principal..
const dataPath = "data/APP_DIBUJO/";

window.setup = function () {
    glz.setBackgroundColor(glz.WHITE);          // color de fondo de pantalla..
    glz.setFadingColor(0xffffff);           // color del fade de pantalla..
    glz.enableShadows(false);               // activa el sistema de sobras..
    glz.setMode(1280, 720, false, true);    // define la resolucion grafica..
    glz.setFps(60);                         // limita los fotogramas por segundo..
    glz.setFog(0, 250);                     // configura la niebla del entorno 3d..
    glz.setAmbientLight(glz.WHITE, 1);          // iluminacion ambiental de la escena 3d..
    glz.setCameraPosition(0, 20, -50);  // set position inicial de la camara hacia la escena..
    glz.fadeOff(0);                         // apaga inmediatamente la pantalla 0 ms..
    glz.fadeOn(1000);                       // enciendo la pantalla durante 1 segundo..
}

window.main = function () {
    switch (ST) {
        case 0:
            text_inicio = new glz.Write(null, 32, "TOUCH TO START", glz.CENTER, glz.WIDTH / 2, glz.HEIGHT / 2, glz.BLUE, 1);
            ST = 10;
            break;
        case 10:
            if (glz.mouse.left) {
                text_inicio.text = "loading assets..";
                text_inicio.color = 0x000000;
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
                glz.fadeOff(500);
                ST = 30;
            }
            break;
        case 30:
            if (!glz.fading) {
                glz.signal(text_inicio, glz.s_kill);
                glz.letMeAlone();
                idGame = new Game();
                ST = 40;
            }
            break;
        case 40:

            break;
    }
}
//---------------------------------------------------------------------------------
window.event_game_botonDeshacer = function () {
    if (idGame.sprites.length > 0) {
        glz.signal(idGame.sprites[idGame.sprites.length - 1], glz.s_kill);
        idGame.sprites.pop();
    }
}
//---------------------------------------------------------------------------------
class Game extends glz.GameObject {
    constructor() {
        super();
        this.pixi = undefined;
        this.gr = undefined;
        this.crearProceso = false;
        this.sprites = [];
        this.botonDeshacer = undefined;
    }
    initialize() {
        this.botonDeshacer = new glz.EGUIbutton(null, 22, "DESHACER", 100, 30, glz.WHITE);
        this.botonDeshacer.setEvent("event_game_botonDeshacer");
        this.pixi = glz.getPixi();
        this.gr = new this.pixi.Graphics();
        glz.app.stage.addChild(this.gr);
        glz.fadeOn(1000);
    }
    frame() {
        if (glz.mouse.left) {
            if (glz.mouse.moved) {
                this.pinta();
            }
        } else {
            // SI HE PINTADO.. CREAR SNAPSHOT DEL PIXI.GRAPHICS..
            this.generarSprite();
        }
    }
    generarSprite() {
        if (this.crearProceso) {
            this.crearProceso = false;
            let proceso = new glz.GameObject();
            let textura = glz.app.renderer.generateTexture(this.gr);
            proceso.x = this.gr._localBoundsRect.x + this.gr._localBoundsRect.width / 2;
            proceso.y = this.gr._localBoundsRect.y + this.gr._localBoundsRect.height / 2;
            proceso.setGraph(textura);
            this.gr.clear();
            this.sprites.push(proceso);
        }
    }
    pinta() {
        this.gr.lineStyle(10, glz.BLACK, 1);
        this.drawPointLine();
        this.crearProceso = true;
    }
    drawPointLine() {
        let oldPos = new glz.Vector2(glz.mouse.oldx, glz.mouse.oldy);
        let newPos = new glz.Vector2(glz.mouse.x, glz.mouse.y);
        const delta = { x: oldPos.x - newPos.x, y: oldPos.y - newPos.y };
        let deltaLength = oldPos.distanceTo(newPos);
        this.drawPoint(newPos);
        if (deltaLength > 1) {
            const additionalPoints = deltaLength;
            for (let i = 1; i < additionalPoints; i++) {
                const pos = {
                    x: newPos.x + delta.x * (i / additionalPoints),
                    y: newPos.y + delta.y * (i / additionalPoints),
                };
                this.drawPoint(pos);
            }
        }
    }
    drawPoint(pos) {
        this.gr.drawCircle(pos.x, pos.y, 1);
    }
}
//---------------------------------------------------------------------------------