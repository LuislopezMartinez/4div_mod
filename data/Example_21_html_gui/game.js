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
const dataPath = "data/Example_21_html_gui/";

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
                //loader[0] = new LoadImages("data/Example_21_html_gui/images/", 0);
                //loader[1] = new LoadSounds("data/Example_21_html_gui/sounds/", 0);
                //let lista = [];
                //lista.push("data/Example_21_html_gui/models/yourModelFilename.ext");
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
        glz.createButton(null, 20, "Empezar!", 100, 100);
        glz.createSlider(100, 150, 200, 0, 100, 10);
        glz.createLabel(null, 16, "My Label", glz.RIGHT, 100, 200);
        glz.createInputText(null, 16, "texto de prueba", 100, 250, 10);
        glz.createInputTextArea(null, 16, "texto de prueba\npor los siglos", 300, 250, 50, 5);
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