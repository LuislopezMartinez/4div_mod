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
const dataPath = "data/APP_GAME_DAMAS/";

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
                loader[0] = new glz.LoadImages("data/APP_GAME_DAMAS/images/", 2);
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
class Game extends glz.GameObject {
    constructor() {
        super();
        this.st = 0;
    }
    initialize() {
        new Tablero();
        glz.fadeOn(1000);
    }
    frame() {
        switch (this.st) {
            case 0:

                break;
        }
    }
}
//---------------------------------------------------------------------------------
export class Tablero extends glz.GameObject {
    constructor() {
        super();
        this.st = 0;
        this.width = 79;
        this.offset = undefined;
        this.separacion = undefined;
        this.matrix = [];
    }
    initialize() {
        this.buildMatrix();
        this.x = glz.WIDTH / 2;
        this.y = glz.HEIGHT / 2;
        this.setGraph(img[2]);
        this.offset = this.getRealPoint(67, 67);
        this.separacion = this.size * this.width;
    }
    finalize() { }

    buildMatrix() {
        for (let fila = 0; fila < 8; fila++) {
            this.matrix.push([false, false, false, false, false, false, false, false]); // add void row..
        }
    }

    frame() {
        switch (this.st) {
            case 0:
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        switch (i) {
                            case 0:
                                if (j % 2 == 0) {/* */ } else { new Ficha(0, j, i); }
                                break;
                            case 1:
                                if (j % 2 == 0) { new Ficha(0, j, i); } else {/* */ }
                                break;
                            case 2:
                                if (j % 2 == 0) {/* */ } else { new Ficha(0, j, i); }
                                break;

                            case 5:
                                if (j % 2 == 0) { new Ficha(1, j, i); } else {/* */ }
                                break;
                            case 6:
                                if (j % 2 == 0) {/* */ } else { new Ficha(1, j, i); }
                                break;
                            case 7:
                                if (j % 2 == 0) { new Ficha(1, j, i); } else {/* */ }
                                break;
                        }
                    }
                }

                this.st = 10;
                break;
            case 10:

                break;
        }
    }
}
//---------------------------------------------------------------------------------
export class Ficha extends glz.GameObject {
    constructor(gr, cx, cy) {
        super();
        this.st = 0;
        this.gr = gr;
        this.cx = cx;
        this.cy = cy;
        this.esRey = false;
        this.t = undefined;
    }
    initialize() {
        this.x = this.father.offset.x + this.father.separacion * this.cx;
        this.y = this.father.offset.y + this.father.separacion * this.cy;
        this.size = 0.65;
        this.setGraph(img[this.gr]);
        this.t = new glz.Write(null, 18, glz.str(this.cx) + " - " + glz.str(this.cy), glz.CENTER, this.x, this.y, glz.BLACK, 1);
        this.setMatrixCell();
    }
    finalize() { }
    frame() {
        switch (this.st) {
            case 0:
                if (this.collisionMouse()) {
                    this.tint(glz.RED);
                    this.st = 10;
                }
                break;
            case 10:
                if (!glz.mouse.left) {
                    console.log(this.getPosibleMovements());
                    this.noTint();
                    this.st = 0;
                }
                break;
        }
    }
    setMatrixCell() {
        this.father.matrix[this.cy][this.cx] = true;
    }
    getPosibleMovements() {
        let posibleMovements = [];
        //a     b
        //   x
        //c     d
        let a = this.getMatrixCell(this.cx - 1, this.cy - 1);
        let b = this.getMatrixCell(this.cx + 1, this.cy - 1);
        let c = this.getMatrixCell(this.cx - 1, this.cy + 1);
        let d = this.getMatrixCell(this.cx + 1, this.cy + 1);
        if (!a) posibleMovements.push({ cx: this.cx - 1, cy: this.cy - 1 });
        if (!b) posibleMovements.push({ cx: this.cx + 1, cy: this.cy - 1 });
        if (!c) posibleMovements.push({ cx: this.cx - 1, cy: this.cy + 1 });
        if (!d) posibleMovements.push({ cx: this.cx + 1, cy: this.cy + 1 });
        return posibleMovements;
    }

    getMatrixCell(x, y) {
        let a = true;
        try {
            a = this.father.matrix[y][x];
        } catch (e) {
            // out of range exception..
        }
        if (a == undefined) a = true;
        return a;
    }
}
//---------------------------------------------------------------------------------
export class NuevaPosicion extends glz.GameObject {
    constructor(gr, cx, cy) {
        super();
        this.st = 0;
        this.gr = gr;
        this.cx = 0;
        this.cy = 0;
    }
    initialize() {
        this.x = this.father.offset.x + this.father.separacion * this.cx;
        this.y = this.father.offset.y + this.father.separacion * this.cy;
        this.setGraph(img[this.gr]);
    }
    finalize() { }
    frame() {
        switch (this.st) {
            case 0:
                if (glz.frameCount % 60 == 0) this.visible = !this.visible;
                break;
            case 10:
                break;
        }
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------