import * as glz from '../../library/4Div.js';
//---------------------------------------------------------------------------------
export class Personaje extends glz.GameObject {
    constructor(modelos, skins, idGame) {
        super();
        this.st = 0;
        this.modelos = modelos;
        this.skins = skins;
        this.pos = 0;
        this.initx = 0;
        this.initAngle = 0;
        this.idGame = idGame;
    }
    setSkin(num) {
        this.pos = num;
        this.setTexture(this.skins[this.pos]);
        this.idGame.skinNumber = this.pos;
    }
    anterior() {
        if (this.pos > 0) {
            this.pos--;
            this.setTexture(this.skins[this.pos]);
            this.idGame.skinNumber = this.pos;
        }
    }
    siguiente() {
        if (this.pos < this.skins.length - 1) {
            this.pos++;
            this.setTexture(this.skins[this.pos]);
            this.idGame.skinNumber = this.pos;
        }
    }
    initialize() {
        let luz = new glz.SpotLight(glz.WHITE, 10000);
        luz.y = 40;
        luz.z = -20;
        this.angley = 180;
        this.z = -25;
        this.size = .05;
        let modelo = glz.mixamoMerger(this.modelos);
        this.setModel(modelo);
        // aplicar skin..
        this.setTexture(this.skins[this.pos]);
        this.clipSet(0);
        this.clipPlay();
    }
    finalize() {

    }
    frame() {
        switch (this.st) {
            case 0:
                let colision = glz.mouse.intersect(this);
                if (colision) {
                    if (glz.mouse.touch) {
                        this.initx = glz.mouse.x;
                        this.initAngle = this.angley;
                        this.st = 10;
                    }
                } else {
                    //..
                }



                break;
            case 10:
                this.angley = this.initAngle - (this.initx - glz.mouse.x);
                if (!glz.mouse.touch) {
                    this.st = 0;
                }
                break;
        }
    }
}
//---------------------------------------------------------------------------------
export class Marco extends glz.GameObject {
    constructor(x, y, col, gr) {
        super();
        this.x = x;
        this.y = y;
        this.col = col;
        this.gr = gr;
    }
    initialize() {
        //this.setGraph(img[5]);
        this.setGraph(this.gr);
    }
    frame() {

    }

}
//---------------------------------------------------------------------------------
export class Logo extends glz.GameObject {
    constructor(grx) {
        super();
        this.grx = grx;
        this.counter = 0;
        this.direccion = 0;
        this.delta = 6;
        this.gr = new glz.GameObject();
    }
    initialize() {
        this.x = glz.WIDTH / 2;
        this.y = 150;
        this.size = 0.8;
        this.setGraph(this.grx);

        this.gr.x = this.x;
        this.gr.y = this.y;
        this.gr.size = this.size;
        this.gr.setGraph(this.grx);

    }
    frame() {
        this.gr.alpha = glz.abs(glz.sin(glz.radians(this.counter))) / 2;
        this.gr.x = this.x + this.delta * glz.sin(glz.radians(glz.frameCount));
        this.gr.y = this.y + this.delta * glz.cos(glz.radians(glz.frameCount));
        this.counter = (this.counter + 5) % 180;

        if (glz.frameCount % 2 == 0) {
            this.tint(glz.color(glz.randInt(255), glz.randInt(255), glz.randInt(255)));
        }

        if (this.counter == 0) {
            let color = glz.color(glz.randInt(255), glz.randInt(255), glz.randInt(255));
            this.gr.tint(color);
        }
    }
}
//---------------------------------------------------------------------------------
export class Humo extends glz.GameObject {
    constructor(gr) {
        super();
        this.value = glz.random(0.25);
        this.gr = gr;
    }
    initialize() {
        this.size = 100;
        this.alpha = 0.25;
        this.x = glz.random(-50, 50);
        this.y = glz.random(-50, 50);
        this.createSprite(this.gr);
    }
    finalize() {

    }
    frame() {
        this.angle += this.value;
    }
}
//---------------------------------------------------------------------------------
export class Suelo extends glz.GameObject {
    constructor(tex, tex_normal) {
        super();
        this.textura = tex;
        this.textura_normal = tex_normal;
    }
    initialize() {
        this.anglex = 90;
        this.createMaterial(glz.TEXTURED, this.textura, true, 10);
        this.setNormalMaterial(this.textura_normal);
        this.createPlane(200, 200);
    }
    frame() {
        //this.angle += 0.025;

    }
}
//---------------------------------------------------------------------------------
export class DialogBox extends glz.GameObject {
    constructor(fnt) {
        super();
        this.st = 0;
        this.data = [];
        this.linesToShow = 4;
        this.lsa = 0;
        this.idTexts = [];
        this.cursor;
        //this.fnt = fnt[2];
        this.fnt = fnt;
        this.textSize = 20;
        this.interline = this.textSize + 10;
        this.eventName = "";
    }
    initialize() {
        this.x = glz.WIDTH / 2;
        this.y = glz.HEIGHT - (this.interline * this.linesToShow) / 2 - 10;
        this.newGraph(glz.WIDTH - 20, this.interline * this.linesToShow);
        this.tint(glz.BLUE);
        let vec = this.getRealPoint(0, 0);
        for (let i = 0; i < this.linesToShow; i++) {
            this.idTexts.push(new glz.Write(this.fnt, this.textSize, "", glz.RIGHT, vec.x + 5, vec.y + this.interline / 2 + this.interline * i, glz.WHITE, 1));
        }
        this.cursor = new glz.Write(this.fnt, this.textSize, ">>", glz.LEFT, vec.x + this.graph._width - 2, vec.y + this.graph._height - 2 - this.textSize / 2, glz.YELLOW, 1);
        this.cursor.visible = false;
    }
    finalize() {
        glz.signal(this.cursor, glz.s_kill);
        for (let i = 0; i < this.idTexts.length; i++) {
            glz.signal(this.idTexts[i], glz.s_kill);
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
                        this.cursor.setColor(glz.RED);
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
                    glz.signal(this, glz.s_kill);
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