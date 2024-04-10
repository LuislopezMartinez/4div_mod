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
                loader[0] = new glz.LoadImages("data/APP_GAME_DAMAS/images/", 3);
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
        this.turno = 0;     // 0=turno player    1=turno ia    2=bloqueo interactividad..
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

    getMouseOnCell() {
        let cx_ = glz.int(1 + (glz.mouse.x - this.offset.x - this.width / 2) / this.width);
        let cy_ = glz.int(1 + (glz.mouse.y - this.offset.y - this.width / 2) / this.width);
        return { cx: cx_, cy: cy_ };
    }
    siguienteTurno() {
        if (this.turno == 0) {
            this.turno = 1;
        } else {
            this.turno = 0;
        }
    }
    frame() {
        switch (this.st) {
            case 0:
                this.crearFichas();
                this.st = 10;
                break;
            case 10:
                // turno mover player..
                //this.getMouseOnCell();
                break;
        }
    }
    crearFichas() {
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
        this.moves = [];    // lista de posibles movimientos de la ficha al hacer click en ella..
        if (this.gr == 0) {
            this.color = "blue";
        } else {
            this.color = "red";
        }
        this.type = "type_ficha";
        this.grKing = undefined;
    }
    initialize() {
        this.x = this.father.offset.x + this.father.separacion * this.cx;
        this.y = this.father.offset.y + this.father.separacion * this.cy;
        this.size = 0.65;
        this.setGraph(img[this.gr]);
        this.t = new glz.Write(null, 18, glz.str(this.cx) + " - " + glz.str(this.cy), glz.CENTER, this.x, this.y, glz.BLACK, 0);
        this.setMatrixCell();

        this.grKing = new glz.GameObject();
        this.grKing.visible = false;
        this.grKing.setGraph(img[3]);

    }
    finalize() {
        this.father.matrix[this.cy][this.cx] = false;
        glz.signal(this.t, glz.s_kill);
        glz.signal(this.grKing, glz.s_kill);
    }
    esMiTurno() {
        if (this.color == "blue") {
            if (this.father.turno == 0) {
                return true;
            }
        } else {
            if (this.father.turno == 1) {
                return true;
            }
        }
        return false;
    }
    frame() {
        this.grKing.x = this.x;
        this.grKing.y = this.y;
        switch (this.st) {
            case 0:
                if (this.collisionMouse() && this.esMiTurno()) {
                    if (this.esRey) {
                        // aqui implementar el movimiento en diagonal hasta el final del tablero..
                        this.moves = this.getPosibleMovements_KingMode();
                    } else {
                        this.moves = this.getPosibleMovements();
                    }
                    if (this.gr == 0) {
                        this.tint(glz.BLUE);
                    } else {
                        this.tint(glz.RED);
                    }

                    for (let i = 0; i < this.moves.length; i++) {
                        new NuevaPosicion(this.gr, this.moves[i]);
                    }
                    this.st = 10;
                }
                break;
            case 10:
                if (!glz.mouse.left) {
                    let moved = false;
                    let mc = this.father.getMouseOnCell();
                    for (let i = 0; i < this.moves.length; i++) {
                        if (mc.cx == this.moves[i].cx && mc.cy == this.moves[i].cy) {
                            // mover ficha a celda seleccionada..
                            this.moveToCell(mc);
                            moved = true;
                        }
                    }
                    this.moves = [];
                    if (moved) {
                        this.father.siguienteTurno();   // si he movido pasa el turno al otro jugador..
                        if ((this.cy == 0 && this.color == "red") || (this.cy == 7 && this.color == "blue")) {
                            this.esRey = true;
                            this.grKing.visible = true;
                        }

                    } else {
                        this.moveToCell({ cx: this.cx, cy: this.cy });
                    }

                    glz.signalType("type_nueva_posicion", glz.s_kill);

                    this.noTint();
                    this.st = 0;
                } else {
                    this.x = this.t.x = glz.mouse.x;
                    this.y = this.t.y = glz.mouse.y;

                }
                break;
        }
    }

    moveToCell(cell) {
        // liberar celda actual..
        this.father.matrix[this.cy][this.cx] = false;
        // mover ficha..
        this.cy = cell.cy;
        this.cx = cell.cx;
        this.x = this.father.offset.x + this.father.separacion * this.cx;
        this.y = this.father.offset.y + this.father.separacion * this.cy;
        this.t.x = this.x;
        this.t.y = this.y;
        this.t.setText(glz.str(this.cx) + " - " + glz.str(this.cy));
        // ocupar celda actual..
        this.setMatrixCell();
    }

    setMatrixCell() {
        //this.father.matrix[this.cy][this.cx] = true;
        this.father.matrix[this.cy][this.cx] = this.gr == 0 ? "blue" : "red";
    }
    getPosibleMovements() {
        let posibleMovements = [];
        //a     b
        //   x
        //c     d

        let a = true, b = true, c = true, d = true;

        if (this.color == "red") {
            a = this.getMatrixCell(this.cx - 1, this.cy - 1);
            if (a != false && a != this.color) {
                if (this.getMatrixCell(this.cx - 2, this.cy - 2) == false) {
                    posibleMovements.push({ cx: this.cx - 2, cy: this.cy - 2, type: 'aa' });
                }
            }
            b = this.getMatrixCell(this.cx + 1, this.cy - 1);
            if (b != false && b != this.color) {
                if (this.getMatrixCell(this.cx + 2, this.cy - 2) == false) {
                    posibleMovements.push({ cx: this.cx + 2, cy: this.cy - 2, type: 'bb' });
                }
            }
            if (a == false) posibleMovements.push({ cx: this.cx - 1, cy: this.cy - 1, type: 'a' });
            if (b == false) posibleMovements.push({ cx: this.cx + 1, cy: this.cy - 1, type: 'b' });
        }

        if (this.color == "blue") {
            c = this.getMatrixCell(this.cx - 1, this.cy + 1);
            if (c != false && c != this.color) {
                if (this.getMatrixCell(this.cx - 2, this.cy + 2) == false) {
                    posibleMovements.push({ cx: this.cx - 2, cy: this.cy + 2, type: 'cc' });
                }
            }
            d = this.getMatrixCell(this.cx + 1, this.cy + 1);
            if (d != false && d != this.color) {
                if (this.getMatrixCell(this.cx + 2, this.cy + 2) == false) {
                    posibleMovements.push({ cx: this.cx + 2, cy: this.cy + 2, type: 'dd' });
                }
            }
            if (c == false) posibleMovements.push({ cx: this.cx - 1, cy: this.cy + 1, type: 'c' });
            if (d == false) posibleMovements.push({ cx: this.cx + 1, cy: this.cy + 1, type: 'd' });
        }
        return posibleMovements;
    }

    getPosibleMovements_KingMode() {
        let posibleMovements = [];
        //a     b
        //   x
        //c     d
        const max = 6;  // maximo salto en diagonal..
        let a = true, b = true, c = true, d = true;

        // a..
        for (let i = 1; i < max; i++) {
            let cx = this.cx - i;
            let cy = this.cy - i;
            let value = this.getMatrixCell(cx, cy);
            if (value == false) {
                posibleMovements.push({ cx: cx, cy: cy, type: 'a' });
            } else {
                if (value != this.color) {
                    if (this.getMatrixCell(cx - 1, cy - 1) == false) {
                        posibleMovements.push({ cx: cx - 1, cy: cy - 1, type: 'aa' });
                        i = max;
                    }
                } else {
                    i = max;
                }
            }
        }

        // b..
        for (let i = 1; i < max; i++) {
            let cx = this.cx + i;
            let cy = this.cy - i;
            let value = this.getMatrixCell(cx, cy);
            if (value == false) {
                posibleMovements.push({ cx: cx, cy: cy, type: 'b' });
            } else {
                if (value != this.color) {
                    if (this.getMatrixCell(cx + 1, cy - 1) == false) {
                        posibleMovements.push({ cx: cx + 1, cy: cy - 1, type: 'bb' });
                        i = max;
                    }
                } else {
                    i = max;
                }
            }
        }

        // c..
        for (let i = 1; i < max; i++) {
            let cx = this.cx - i;
            let cy = this.cy + i;
            let value = this.getMatrixCell(cx, cy);
            if (value == false) {
                posibleMovements.push({ cx: cx, cy: cy, type: 'c' });
            } else {
                if (value != this.color) {
                    if (this.getMatrixCell(cx - 1, cy + 1) == false) {
                        posibleMovements.push({ cx: cx - 1, cy: cy + 1, type: 'cc' });
                        i = max;
                    }
                } else {
                    i = max;
                }
            }
        }

        // d..
        for (let i = 1; i < max; i++) {
            let cx = this.cx + i;
            let cy = this.cy + i;
            let value = this.getMatrixCell(cx, cy);
            if (value == false) {
                posibleMovements.push({ cx: cx, cy: cy, type: 'd' });
            } else {
                if (value != this.color) {
                    if (this.getMatrixCell(cx + 1, cy + 1) == false) {
                        posibleMovements.push({ cx: cx + 1, cy: cy + 1, type: 'dd' });
                        i = max;
                    }
                } else {
                    i = max;
                }
            }
        }

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
    constructor(gr, pos) {
        super();
        this.st = 0;
        this.gr = gr;
        this.cx = pos.cx;
        this.cy = pos.cy;
        this.type = "type_nueva_posicion";
        this.tipoFicha = pos.type;
    }
    initialize() {
        this.alpha = 0.5;
        this.size = this.father.size;
        this.x = this.father.father.offset.x + this.father.father.separacion * this.cx;
        this.y = this.father.father.offset.y + this.father.father.separacion * this.cy;
        this.setGraph(img[this.gr]);
    }
    finalize() {

        let mc = this.father.father.getMouseOnCell();
        let comerFicha = false;
        if (mc.cx == this.cx && mc.cy == this.cy) comerFicha = true;

        if (comerFicha) {
            let cx = 0;
            let cy = 0;
            switch (this.tipoFicha) {
                case "aa":
                    cx = this.cx + 1;
                    cy = this.cy + 1;
                    for (let i = 0; i < glz.gameObjects.length; i++) {
                        if (glz.gameObjects[i].type == "type_ficha") {
                            if (glz.gameObjects[i].cx == cx && glz.gameObjects[i].cy == cy) {
                                glz.signal(glz.gameObjects[i], glz.s_kill);
                                this.father.father.siguienteTurno();    // si he comido ficha.. ya he pasado el turno al otro player.. lo vuelvo a recuperar..
                            }
                        }
                    }
                    break;
                case "bb":
                    cx = this.cx - 1;
                    cy = this.cy + 1;
                    for (let i = 0; i < glz.gameObjects.length; i++) {
                        if (glz.gameObjects[i].type == "type_ficha") {
                            if (glz.gameObjects[i].cx == cx && glz.gameObjects[i].cy == cy) {
                                glz.signal(glz.gameObjects[i], glz.s_kill);
                                this.father.father.siguienteTurno();    // si he comido ficha.. ya he pasado el turno al otro player.. lo vuelvo a recuperar..
                            }
                        }
                    }
                    break;
                case "cc":
                    cx = this.cx + 1;
                    cy = this.cy - 1;
                    for (let i = 0; i < glz.gameObjects.length; i++) {
                        if (glz.gameObjects[i].type == "type_ficha") {
                            if (glz.gameObjects[i].cx == cx && glz.gameObjects[i].cy == cy) {
                                glz.signal(glz.gameObjects[i], glz.s_kill);
                                this.father.father.siguienteTurno();    // si he comido ficha.. ya he pasado el turno al otro player.. lo vuelvo a recuperar..
                            }
                        }
                    }
                    break;
                case "dd":
                    cx = this.cx - 1;
                    cy = this.cy - 1;
                    for (let i = 0; i < glz.gameObjects.length; i++) {
                        if (glz.gameObjects[i].type == "type_ficha") {
                            if (glz.gameObjects[i].cx == cx && glz.gameObjects[i].cy == cy) {
                                glz.signal(glz.gameObjects[i], glz.s_kill);
                                this.father.father.siguienteTurno();    // si he comido ficha.. ya he pasado el turno al otro player.. lo vuelvo a recuperar..
                            }
                        }
                    }
                    break;
            }
        }


    }
    frame() {
        switch (this.st) {
            case 0:
                if (this.livedFrames % 15 == 0) this.visible = !this.visible;
                this.angle++;
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