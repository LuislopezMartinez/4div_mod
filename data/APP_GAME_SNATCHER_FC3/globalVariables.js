import * as glz from '../../library/4Div.js';
export let netClients = [];
export const NET_PLAYER_MAX_DISTANCE_AUTO_ADJUST_POSITION = 50;    // si el player en red recive su posicion y esta a mas de esta distancia.. no se interpolara la posicion, se ajustara de una vez.
export const NET_PLAYER_MIN_DISTANCE_AUTO_ADJUST_POSITION = 10;      // si estas muy cerca del destino te colocas ya ahi.. evita pequeños ajustes super lentos..

export let frases = [];
frases.push("La clave es comprender antes de reaccionar.");
frases.push("La naturaleza de internet te permite tomar una pausa.");
frases.push("Busca alguien de confianza solo para que te escuche.");
frases.push("Debes enfrentar tus emociones para mejorar tus reacciones.");
frases.push("Hay que experimentar una emocion para saber lo que produce.");
frases.push("Yo so yo, y me hago responsable de mis emociones.");
frases.push("Las palabras obtienen su poder del valor que nosotros les damos.");

/*
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
*/

export class Properties {
    constructor(tipo_entidad = "entidad desconocida") {
        this._type = tipo_entidad;
        this._name = "...";
        this._level = 1;
        this._levelBaseValue = 10;
        this._stamina = 1;
        this._strength = 1;
        this._agility = 1;
        this._intellect = 1;
        this._defense = 1;

        this._stamina_actual = 1;
        this._strength_actual = 1;
        this._agility_actual = 1;
        this._intellect_actual = 1;
        this._defense_actual = 1;

    }
    // SETTERS..
    set level(value) {
        this._level = value;
        // CALCULO LOS VALORES MAXIMOS PARA ESTE NIVEL..
        this._stamina = 50 + (this._levelBaseValue * this._level);
        this._strength = this._levelBaseValue * this._level;
        this._agility = this._levelBaseValue * this._level;
        this._intellect = this._levelBaseValue * this._level;
        this._defense = this._levelBaseValue * this._level;
        // APLICO LOS VALORES A LAS PROPIEDADES DINAMICAS..
        this._stamina_actual = this._stamina;
        this._strength_actual = this._strength;
        this._agility_actual = this._agility;
        this._intellect_actual = this._intellect;
        this._defense_actual = this._defense;

    }
    // GETTERS..
    get level() { return this._level; }
    get stamina() { return this._stamina_actual; }
    get strength() { return this._strength_actual; }
    get agility() { return this._agility_actual; }
    get intellect() { return this._intellect_actual; }
    get defense() { return this._defense_actual; }
    heal(value) {

    }
    damage(value) {

    }
}