////////////////////////////////////////////////////////////////////////
//            This file are part of:
//            GameLibZero 2.4.5 by Luis Lopez Martinez
//                13/04/2019 - Barcelona SPAIN.
//                        OPEN SOURCE
////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------

final int TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST = -99999;

void lockEGUI() {

    for (sprite s : sprites) {
        try {
            ((EGUIinputArea)s).locked = true;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIinputBox)s).locked = true;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIbutton)s).locked = true;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIgbutton)s).locked = true;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIradioButton)s).locked = true;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIdropDownList)s).locked = true;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIlista)s).locked = true;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIcheckList)s).locked = true;
        }
        catch(Exception e) {
        }
    }
}
//------------------------------------------------------------
void unlockEGUI() {

    for (sprite s : sprites) {
        try {
            ((EGUIinputArea)s).locked = false;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIinputBox)s).locked = false;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIbutton)s).locked = false;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIgbutton)s).locked = false;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIradioButton)s).locked = false;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIdropDownList)s).locked = false;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIlista)s).locked = false;
        }
        catch(Exception e) {
        }
        try {
            ((EGUIcheckList)s).locked = false;
        }
        catch(Exception e) {
        }
    }
}
//------------------------------------------------------------
color c1 = #002d5a;        // azul fuerte..
color c2 = #0074d9;        // azul claro..
color c3 = #505050;        // gris fondo ventana claro..
color c4 = #323232;        // gris fondo ventana oscuro..
color c5 = #fe0000;        // rojo fuerte..
color c6 = #680000;        // rojo claro..
color c7 = #11A557;        // verde..
color c8 = #F8FC0A;        // amarillo..
color c9 = #F2A30F;        // naranja..
color c10 = #4A72FC;       // lila boton resaltado..
boolean lockUi = false;
//==============================================================================================================================================
//==============================================================================================================================================
class EGUIinputArea extends sprite {
    int st = 0;
    PImage g1, g2;
    int numLines;
    int interLineSeparation = 0;
    int w, h;
    String[] lines;
    PFont fnt = null;
    int maxTextWidth;
    String buffer = "";
    boolean lock = false;
    int activeLine = 0;            // indica la linea en la que estoy escribiendo actualmente..
    int textSize = 16;
    color textColor = BLACK;
    int inter = 0;                 // separancion extra entre lineas..
    boolean _ENTER_LOCK = false;
    boolean _BACKSPACE_LOCK = false;
    float offsety=0;
    float extraLineOffsety=0;
    float offsetx=0;
    boolean locked = false;
    boolean blocked = false;
    public EGUIinputArea(PFont fnt, int textSize, String text, float x, float y, int w, int numLines, color textColor) {
        // PARA SEPARAR MAS LAS LINEAS.. TOCAR INTER = 0..
        inter = 5;
        type = -1001;
        interLineSeparation = textSize;
        this.textSize = textSize;
        this.numLines = numLines;
        int interlineTotalSeparationHeight = inter+(2+(numLines-1))*interLineSeparation;
        this.h = numLines*textSize + inter*numLines + interLineSeparation/2;
        this.maxTextWidth = w-8;
        // crear el marco para contener el texto..
        g1 = newGraphBox(w, h, GRAY, LIGHTGRAY);
        g2 = newGraphBox(w, h, GRAY, WHITE);
        priority = 64;
        this.fnt = fnt;
        this.x = x;
        this.y = y;
        this.textColor = textColor;
        lines = new String[numLines];
        for (int i=0; i<numLines; i++) {
            lines[i] = "";
        }
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    void frame() {
        // no compatible con Android por el \G que no lo soporta..
        // en Android se hace diferente.. si hacemos port buscar solucion..
        //String[] params = keyboard.buffer.split("(?<=\\G.{23})");
        //println(params);
        switch(st) {
        case 0:
            setGraph(g1);
            createBody(TYPE_BOX);
            setStatic(true);
            offsety = y - (g1.height/2) + interLineSeparation/2 + inter;
            extraLineOffsety = interLineSeparation + inter;
            offsetx = x - g1.width/2 + 4;
            st = 10;
            break;
        case 10:
            escribeLineas();
            if (collisionMouse(this) && !lockUi && !locked && !blocked) {
                graph = g2;

                if (mouse.touch && !lock) {
                    st = 20;
                }
            } else {
                graph = g1;
            }
            break;
        case 20:
            escribeLineas();
            if (!mouse.touch) {
                lockUi = true;
                keyboard.setActive(true);
                hint(ENABLE_KEY_REPEAT);
                keyboard.clear();
                keyboard.buffer = lines[activeLine];
                st = 30;
            }
            break;
        case 30:
            escribeLineas();

            lines[activeLine] = keyboard.buffer;
            if (blitter.textWidth(keyboard.buffer)>(g1.width-10)) {
                if (activeLine<numLines-1) {
                    activeLine++;
                    // get last char on buffer..
                    String lastChar = keyboard.buffer.substring(keyboard.buffer.length()-1);
                    // purgue last char from line..
                    lines[activeLine-1] = lines[activeLine-1].substring(0, lines[activeLine-1].length()-1);
                    // clear keyboard buffer..
                    keyboard.clear();
                    // inject last char on keyboard buffer for add to new line..
                    keyboard.buffer = lastChar;
                } else {
                    keyboard.buffer = keyboard.buffer.substring(0, keyboard.buffer.length()-1);
                }
            } else {

                if (key(_BACKSPACE)) {
                    if (blitter.textWidth(keyboard.buffer)<1 && !_BACKSPACE_LOCK) {
                        _BACKSPACE_LOCK = true;
                        if (activeLine>0) {
                            activeLine--;
                            keyboard.buffer = lines[activeLine];
                        }
                    }
                }

                if (key(_ENTER) && !_ENTER_LOCK) {
                    _ENTER_LOCK = true;
                    if (activeLine<numLines-1) {
                        activeLine++;
                        keyboard.buffer = lines[activeLine];
                    }
                }

                if (!key(_ENTER) && _ENTER_LOCK) {
                    _ENTER_LOCK = false;
                }

                if (!key(_BACKSPACE) && _BACKSPACE_LOCK) {
                    _BACKSPACE_LOCK = false;
                }
            }

            if ( mouse.touch && !collisionMouse(this) ) {
                lockUi = false;
                keyboard.setActive(false);
                keyboard.clear();
                hint(DISABLE_KEY_REPEAT);
                st = 40;
            }

            break;
        case 40:
            escribeLineas();
            if (!mouse.touch) {
                keyboard.clear();
                st = 10;
            }
            break;
        }
    }

    void escribeLineas() {
        for (int i=0; i<numLines; i++) {
            if (i==activeLine && st==30) {
                screenDrawText(this.fnt, this.textSize, lines[i]+(frameCount/10 % 2 == 0 ? "_" : ""), RIGHT, offsetx, offsety+extraLineOffsety*i, textColor, 255);
            } else {
                screenDrawText(this.fnt, this.textSize, lines[i], RIGHT, offsetx, offsety+extraLineOffsety*i, textColor, 255);
            }
        }
    }

    PImage newGraphBox(int w, int h, color stroke, color fill) {
        PImage gr = newGraph(w, h, fill);
        for (int x=0; x<w; x++) {
            gr.set(x, 0, stroke);
            gr.set(x, h-1, stroke);
        }
        for (int y=0; y<h; y++) {
            gr.set(0, y, stroke);
            gr.set(w-1, y, stroke);
        }
        return gr;
    }

    void setLock(boolean lock) {
        this.lock = lock;
    }
}
//==============================================================================================================================================
class EGUIinputBox extends sprite {
    int st = 0;
    PImage g1, g2;
    String parameter="";
    String pwdModeParameter ="";
    int w, h;
    String title;
    int textSize = 14;
    boolean pwdMode = false;
    String eventName="";
    color titleColor = BLACK;
    color parameterColor = BLACK;
    PFont fntText = null;
    int sizeText;
    String labelText;
    int alignText;
    float xText;
    float yText;
    color colorText;
    float alphaText;
    boolean drawLabel = false;
    boolean lock = false;
    int textCorrectonY = 2;
    boolean locked = false;
    boolean blocked = false;
    boolean autoClear = false;
    public EGUIinputBox( String title, String str, float x, float y, int w, int h, boolean pwdMode ) {
        type = -1001;        // tipo de proceso UI..
        blitter.pushMatrix();
        blitter.textSize(textSize);
        float anchoTitulo = blitter.textWidth(title);
        blitter.popMatrix();
        this.x = x + w/2 + anchoTitulo;
        this.y = y;
        this.w = w;
        this.h = h;
        this.title = title;
        this.pwdMode = pwdMode;
        this.parameter = str;
        pwdModeParameter = "";
        for (int i=0; i<this.parameter.length(); i++) {
            pwdModeParameter += "*";
        }
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    void frame() {
        switch(st) {
        case 0:
            g1 = newGraphBox(w, h, GRAY, LIGHTGRAY);
            g2 = newGraphBox(w, h, GRAY, WHITE);
            setGraph(g1);
            createBody(TYPE_BOX);
            setStatic(true);
            st = 10;
            break;
        case 10:
            screenDrawText(fntText, textSize, title, LEFT, x-graph.width/2, y-textCorrectonY, titleColor, 255);
            if (pwdMode) {
                screenDrawText(fntText, textSize, pwdModeParameter, RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            } else {
                screenDrawText(fntText, textSize, parameter, RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            }
            if (collisionMouse(this) && !lockUi && !locked && !blocked ) {
                graph = g2;

                if (mouse.touch && !lock) {
                    if (this.autoClear==true) {
                        keyboard.buffer = "";
                    } else {
                        keyboard.buffer = parameter;
                    }
                    st = 20;
                }
            } else {
                graph = g1;
            }
            break;
        case 20:
            screenDrawText(fntText, textSize, title, LEFT, x-graph.width/2, y-textCorrectonY, titleColor, 255);
            if (pwdMode) {
                screenDrawText(fntText, textSize, pwdModeParameter, RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            } else {
                screenDrawText(fntText, textSize, parameter, RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            }
            if (!mouse.touch) {
                lockUi = true;
                keyboard.setActive(true);
                hint(ENABLE_KEY_REPEAT);
                st = 30;
            }
            break;
        case 30:
            screenDrawText(fntText, textSize, title, LEFT, x-graph.width/2, y-textCorrectonY, titleColor, 255);
            if (pwdMode) {
                pwdModeParameter = "";
                for (int i=0; i<parameter.length(); i++) {
                    pwdModeParameter += "*";
                }
                screenDrawText(fntText, textSize, pwdModeParameter+(frameCount/10 % 2 == 0 ? "_" : ""), RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            } else {
                screenDrawText(fntText, textSize, parameter+(frameCount/10 % 2 == 0 ? "_" : ""), RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            }

            PVector vec = calculateText(null, textSize, keyboard.buffer);
            if (vec.x>this.g1.width-10) {
                keyboard.removeLastChar();
            }

            this.parameter = keyboard.buffer;

            if (key(_ENTER)) {
                method(eventName);
                st = 40;
            }

            if (mouse.touch) {                    // si este control esta activo y hay mouse.touch..
                if (collisionMouse(this)) {      // si el click es en el mismo control..
                    // no pasa nada..
                } else {                        // si el click es en otro control..
                    method(eventName);         // finalizo la entrada de texto de este control..
                    st = 40;
                }
            }

            break;
        case 40:
            screenDrawText(fntText, textSize, title, LEFT, x-graph.width/2, y-textCorrectonY, titleColor, 255);
            if (pwdMode) {
                screenDrawText(fntText, textSize, pwdModeParameter, RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            } else {
                screenDrawText(fntText, textSize, parameter, RIGHT, x-(graph.width/2)+5, y-textCorrectonY, parameterColor, 255);
            }
            if (!key(_ENTER)) {
                lockUi = false;
                keyboard.setActive(false);
                keyboard.clear();
                hint(DISABLE_KEY_REPEAT);
                st = 10;
            }
            break;
        }

        if (drawLabel) {
            screenDrawText(fntText, sizeText, labelText, alignText, x+xText, y+yText-textCorrectonY, colorText, alphaText);
        }
    }
    void setEvent( String methodName ) {
        this.eventName = methodName;
    }
    void setTextFont(PFont textFont) {
        this.fntText = textFont;
    }
    void setTitleColor(color c) {
        titleColor = c;
    }
    void setParameterColor(color c) {
        parameterColor = c;
    }
    void setTextSize(int size) {
        this.textSize = size;
        blitter.textSize(textSize);
    }
    PImage newGraphBox(int w, int h, color stroke, color fill) {
        PImage gr = newGraph(w, h, fill);
        for (int x=0; x<w; x++) {
            gr.set(x, 0, stroke);
            gr.set(x, h-1, stroke);
        }
        for (int y=0; y<h; y++) {
            gr.set(0, y, stroke);
            gr.set(w-1, y, stroke);
        }
        return gr;
    }
    void setLabel(PFont fntText, int sizeText, String labelText, int alignText, float xText, float yText, color colorText, float alphaText) {
        this.drawLabel = true;
        this.fntText = fntText;
        this.sizeText = sizeText;
        this.labelText = labelText;
        this.alignText = alignText;
        this.xText = xText;
        this.yText = yText;
        this.colorText = colorText;
        this.alphaText = alphaText;
    }
    void setLock(boolean lock) {
        this.lock = lock;
    }
    void setParameter(String parameter) {
        this.parameter = this.pwdModeParameter = parameter;
    }
    void clear() {
        this.parameter = this.pwdModeParameter = "";
    }
    void setAutoClear(boolean autoClear) {
        this.autoClear = autoClear;
    }
}
//==============================================================================================================================================
class EGUIbutton extends sprite {
    int st = 0;
    int value = 0;
    int w;
    int h = 18;
    PImage g1, g2, g3;
    float textSize = 14;
    String title="";
    PImage gTile;
    float size;
    String eventName="";
    color textColor = WHITE;
    color c1 = BLUE;
    color c2 = DARKBLUE;
    color c10 = SKYBLUE;
    boolean locked = false;
    boolean blocked = false;
    public EGUIbutton( String title, float x, float y ) {
        type = -1001;        // tipo de proceso UI..
        this.title = title;
        blitter.pushMatrix();
        blitter.textSize(textSize);
        w = (int)blitter.textWidth(title) + 10;
        blitter.popMatrix();
        this.x = x;
        this.y = y;
        this.size = 100;
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    public EGUIbutton( PFont fnt, float textSize, String title, float x, float y ) {
        type = -1001;        // tipo de proceso UI..
        this.title = title;
        blitter.pushMatrix();
        if (fnt!=null) {
            blitter.textFont(fnt);
        }
        this.textSize = textSize;
        h = (int)(textSize + textSize/4);
        blitter.textSize(textSize);
        w = (int)blitter.textWidth(title) + (int)textWidth("OO");
        blitter.popMatrix();
        this.x = x;
        this.y = y;
        this.size = 100;
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    public EGUIbutton( PImage gTile, float size, float x, float y ) {
        type = -1001;        // tipo de proceso UI..
        this.gTile = gTile;
        this.x = x;
        this.y = y;
        this.size = size;
        this.w = gTile.width;
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    void frame() {
        if (gTile != null) {
            screenDrawGraphic( gTile, x, y, 0, size, size, 255 );
        }
        switch(st) {
        case 0:
            if (this.b!=null) {
                // esto es por si redimensiono el control con setArea();
                world.remove(this.b);
            }
            if (gTile != null) {
                g1 = newGraph(w+10, gTile.height+4, c1);
                g2 = newGraph(w+10, gTile.height+4, c2);
                g3 = newGraph(w+10, gTile.height+4, c10);
            } else {
                g1 = newGraph(w+4, h, c1);
                g2 = newGraph(w+4, h, c2);
                g3 = newGraph(w+4, h, c10);
            }

            for (int y_=0; y_<g1.height; y_++) {
                for (int x_=0; x_<this.g1.width; x_++) {
                    if (x_>this.g1.width-3) {
                        graphSetPixel(g1, x_, y_, BLACK);
                        graphSetPixel(g2, x_, y_, BLACK);
                        graphSetPixel(g3, x_, y_, BLACK);
                    }
                    if (y_>g1.height-3) {
                        graphSetPixel(g1, x_, y_, BLACK);
                        graphSetPixel(g2, x_, y_, BLACK);
                        graphSetPixel(g3, x_, y_, BLACK);
                    }
                }
            }


            sizeX = sizeY = size;
            setGraph(g1);
            createBody(TYPE_BOX);
            setStatic(true);
            st = 10;
            break;
        case 10:
            screenDrawText(null, (int)textSize, title, CENTER, x, y-2, textColor, 255);
            if (collisionMouse(this) && !lockUi && !locked && !blocked) {
                graph = g3;
                if (mouse.touch) {
                    graph = g2;
                    value = 1;
                    //method(eventName);
                    st = 20;
                }
            } else {
                graph = g1;
            }
            break;
        case 20:
            lockUi = true;
            screenDrawText(null, (int)textSize, title, CENTER, x, y-2, textColor, 255);
            value = 0;
            if (!mouse.touch) {
                lockUi = false;
                graph = g1;
                method(eventName);
                st = 10;
            }
            break;
        }
    }

    void setEvent( String methodName ) {
        this.eventName = methodName;
    }

    void setTextColor(color c) {
        this.textColor = c;
    }

    void setColor(color a, color b, color c) {
        this.c1 = a;        // color del boton normal..
        this.c2 = c;        // color del boton mouseOver..
        this.c10 = b;      // color del boton clickOver..
        g1 = newGraph(w+4, h, c1);
        g2 = newGraph(w+4, h, c2);
        g3 = newGraph(w+4, h, c10);
    }
    void setTextSize(int size) {
        this.textSize = size;
        blitter.pushMatrix();
        this.textSize = textSize;
        h = (int)(textSize + textSize/4);
        blitter.textSize(textSize);
        w = (int)blitter.textWidth(title) + (int)textWidth("OO");
        blitter.popMatrix();
    }
    /*
    void setWidth(int w) {
     this.w = w;
     g1 = newGraph(w+4, h, c1);
     g2 = newGraph(w+4, h, c2);
     g3 = newGraph(w+4, h, c10);
     }
     */
    void setArea(int w, int h) {
        this.w = w;
        this.h = h;
        this.st = 0;
        //g1 = newGraph(w+4, h, c1);
        //g2 = newGraph(w+4, h, c2);
        //g3 = newGraph(w+4, h, c10);
    }
}
//==============================================================================================================================================
class EGUIgbutton extends sprite {
    int st = 0;
    PImage gr;
    color collisionMouseTintColor = ORANGE;
    color noCollisionMouseTintColor = WHITE;
    color clickMouseTintColor = BLUE;
    String eventName = "";
    PFont fntText;
    int sizeText;
    String labelText;
    int alignText;
    float xText;
    float yText;
    color colorText;
    float alphaText;
    boolean drawLabel = false;
    boolean locked = false;
    boolean blocked = false;
    EGUIgbutton(PImage gr, float x, float y, int size) {
        type = -1001;        // tipo de proceso UI..
        this.gr = gr;
        this.x = x;
        this.y = y;
        this.size = size;
        priority = 64;
        setGraph(gr);
        createBody(TYPE_BOX, TYPE_SENSOR);
        setSensor(true);
        setStatic(true);
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    void frame() {
        switch(st) {
        case 0:
            //setGraph(gr);
            //createBody(TYPE_BOX, TYPE_SENSOR);

            st = 10;
            break;
        case 10:
            if (collisionMouse(this) && !lockUi && !locked && !blocked) {
                tint(collisionMouseTintColor);
                if (mouse.touch) {
                    tint(GRAY);
                    lockUi = true;
                    //method(eventName);
                    st = 20;
                }
            } else {
                tint(this.noCollisionMouseTintColor);
            }
            break;
        case 20:
            if (!mouse.touch) {
                lockUi = false;
                method(eventName);
                tint(WHITE);
                st = 10;
            }
            break;
        }

        if (drawLabel) {
            screenDrawText(fntText, sizeText, labelText, alignText, x+xText, y+yText, colorText, alphaText);
        }
    }
    void setEvent( String methodName ) {
        this.eventName = methodName;
    }

    void setLabel(PFont fntText, int sizeText, String labelText, int alignText, float xText, float yText, color colorText, float alphaText) {
        this.drawLabel = true;
        this.fntText = fntText;
        this.sizeText = sizeText;
        this.labelText = labelText;
        this.alignText = alignText;
        this.xText = xText;
        this.yText = yText;
        this.colorText = colorText;
        this.alphaText = alphaText;
    }
}
//==============================================================================================================================================
class EGUIradioButton extends sprite {
    int st = 0;
    String option[];
    int w = 110;
    int h = 18;
    int textSize = 14;
    PImage g1, g2, g3;
    int num = 0;
    int value = 0;        // indica la opcion escogida..
    boolean collision = false;
    String eventName="";
    boolean locked = false;
    boolean blocked = false;
    public EGUIradioButton( String option[], float x, float y ) {
        type = -1001;        // tipo de proceso UI..
        priority = 64;
        this.option = option;
        this.x = x;
        this.y = y;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    void frame() {
        switch(st) {
        case 0:
            priority = 64;
            g1 = newGraph(w-2, h, c1);
            g2 = newGraph(w-2, h, c2);
            g3 = newGraph(w-2, h, c10);
            st = 10;
            break;
        case 10:
            for ( int i=0; i<option.length; i++ ) {
                num = int((mouse.x-(x-w/2)) / w);
                collision = false;
                if (mouse.y>y-h/2 && mouse.y<y+h/2) {
                    collision = true;
                }

                if (collision) {
                    if (mouse.touch) {
                        this.st = 20;
                    }
                    if (num==i) {
                        if (mouse.touch) {
                            value = num;
                            screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);        // colisiono y mouse SI encima mio y mouse.touch SI..
                        } else {
                            screenDrawGraphic(g3, x + w*i, y, 0, 100, 100, 255);        // colisiono y mouse NO encima mio y mouse.touch NO..
                            if (num==value) {
                                screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);
                            }
                        }
                    } else {
                        screenDrawGraphic(g1, x + w*i, y, 0, 100, 100, 255);            // colisiono y mouse NO encima mio..
                    }

                    if (value==i) {
                        screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);
                    }
                } else {
                    if (value == i) {
                        screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);    // colision NO y seleccionado SI..
                    } else {
                        screenDrawGraphic(g1, x + w*i, y, 0, 100, 100, 255);    // colision NO y seleccionado NO..
                    }
                }

                screenDrawText(null, textSize, option[i], CENTER, x + w*i, y-2, 255, 255);
            }

            break;
        case 20:
            for ( int i=0; i<option.length; i++ ) {
                num = int((mouse.x-(x-w/2)) / w);
                collision = false;
                if (mouse.y>y-h/2 && mouse.y<y+h/2) {
                    collision = true;
                }

                if (collision) {
                    if (num==i) {
                        if (mouse.touch) {
                            value = num;
                            screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);        // colisiono y mouse SI encima mio y mouse.touch SI..
                        } else {
                            screenDrawGraphic(g3, x + w*i, y, 0, 100, 100, 255);        // colisiono y mouse NO encima mio y mouse.touch NO..
                            if (num==value) {
                                screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);
                            }
                        }
                    } else {
                        screenDrawGraphic(g1, x + w*i, y, 0, 100, 100, 255);            // colisiono y mouse NO encima mio..
                    }

                    if (value==i) {
                        screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);
                    }
                } else {
                    if (value == i) {
                        screenDrawGraphic(g2, x + w*i, y, 0, 100, 100, 255);    // colision NO y seleccionado SI..
                    } else {
                        screenDrawGraphic(g1, x + w*i, y, 0, 100, 100, 255);    // colision NO y seleccionado NO..
                    }
                }

                screenDrawText(null, textSize, option[i], CENTER, x + w*i, y-2, 255, 255);
            }

            if (!mouse.touch) {
                method(eventName);
                this.st = 10;
            }
            break;
        }
    }
    //++++++++++++++++++++++++++
    void setEvent( String methodName ) {
        this.eventName = methodName;
    }
    //++++++++++++++++++++++++++
}
//==============================================================================================================================================
class EGUIlabel extends sprite {
    PFont fnt_;
    int size;
    String text;
    int cod;
    color col;
    //++++++++++++++++++++++++++
    public EGUIlabel(PFont fnt_, int size, String text, int cod, float x, float y, color col, float alpha) {
        this.fnt_ = fnt_;
        this.size = size;
        this.text = text;
        this.cod = cod;
        this.x = x;
        this.y = y;
        this.col = col;
        this.alpha = alpha;
        priority = 64;
        type = -1001;        // tipo de proceso UI..
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    //++++++++++++++++++++++++++
    void frame() {
        screenDrawText(fnt_, size, text, cod, x, y, col, alpha);
    }
    //++++++++++++++++++++++++++
}
//==============================================================================================================================================
class EGUIcheckBox extends sprite {
    int st = 0;
    PImage g1, g2, g3;
    String title = "";
    boolean value = false;        // parametro de salida que dice como esta la caja..
    int w = 22;
    int h = 18;
    color color1 = c1;
    color color2 = c2;
    String eventName="";
    String text = "";
    PFont fnt = null;
    int textSize = 14;
    color textColor;
    int textAlign = CENTER;
    int xOffset = 0;
    int yOffset = 0;
    boolean locked = false;
    boolean blocked = false;
    //++++++++++++++++++++++++++
    public EGUIcheckBox( float x, float y, int w, int h ) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        g1 = newGraph(w, h, color1);
        g2 = newGraph(w, h, color2);
        g3 = newGraph(w, h, color2);
        type = -1001;        // tipo de proceso UI..
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    //++++++++++++++++++++++++++
    public EGUIcheckBox( float x, float y, int w, int h, color cc1, color cc2 ) {
        this.x = x;
        this.y = y;
        this.color1 = cc1;
        this.color2 = cc2;
        this.w = w;
        this.h = h;
        g1 = newGraph(w, h, color1);
        g2 = newGraph(w, h, color2);
        g3 = newGraph(w, h, color2);
        type = -1001;        // tipo de proceso UI..
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    //++++++++++++++++++++++++++
    void frame() {
        switch(st) {
        case 0:
            //g1 = newGraph(size, size, color1);
            //g2 = newGraph(size, size, color2);
            //g3 = newGraph(size, size, color2);
            if (graph!=null) {        // si he llamado a setValue() antes de que pase un frame.. graph ya tiene algun valor.. lo uso para el setGraph()..
                setGraph(graph);
            } else {
                setGraph(g1);
            }
            createBody(TYPE_BOX);
            setStatic(true);
            st = 10;
            break;
            //++++++++++++++++++++++++++
        case 10:
            if ( collisionMouse(this) && !lockUi && !locked && !blocked) {
                screenDrawGraphic(g3, x, y, 0, 100, 100, 64);
                if (mouse.touch) {

                    if (value) {
                        value = false;
                        graph = g1;
                    } else if (!value) {
                        value = true;
                        graph = g2;
                    }
                    st = 20;
                }
            }
            break;
            //++++++++++++++++++++++++++
        case 20:
            lockUi = true;
            if (!mouse.touch) {
                lockUi = false;
                method(eventName);
                st = 10;
            }
            break;
        }
        screenDrawText(fnt, textSize, text, textAlign, x+xOffset, y+yOffset, textColor, 255);
    }
    //++++++++++++++++++++++++++
    void setValue(boolean value) {
        if (value) {
            graph = g2;
            this.value = true;
        } else {
            graph = g1;
            this.value = false;
        }
    }
    void setValue(String valueStr) {
        boolean value = java.lang.Boolean.parseBoolean(valueStr);
        if (value) {
            graph = g2;
            this.value = true;
        } else {
            graph = g1;
            this.value = false;
        }
    }
    //++++++++++++++++++++++++++
    void setColorSelected( color c ) {
        this.color1 = c;
    }
    //++++++++++++++++++++++++++
    void setColorUnselected(color c) {
        this.color2 = c;
    }
    //++++++++++++++++++++++++++
    void setEvent( String methodName ) {
        this.eventName = methodName;
    }
    //++++++++++++++++++++++++++
    void setText(PFont fnt, String text) {
        this.fnt = fnt;
        this.text = text;
    }
    void setText(PFont fnt, int size, String text, int textAlign, int xof, int yof, color col) {
        this.fnt = fnt;
        this.text = text;
        this.textSize = size;
        this.textColor = col;
        this.textAlign = textAlign;
        this.xOffset = xof;
        this.yOffset = yof;
    }
    //++++++++++++++++++++++++++
    void setTextColor(color col) {
        this.textColor = col;
    }
    //++++++++++++++++++++++++++
}

//==============================================================================================================================================
//------------------------------------------------------------
//------------------------------------------------------------
void EVENT_EGUI_dropDownList() {
    if (!((EGUIdropDownList)_id_.father).locked && !((EGUIdropDownList)_id_.father).blocked) {
        ((EGUIdropDownList)_id_.father).st = 100;
    }
    ((EGUIdropDownList)_id_.father).eventCaptor = true;
}
//------------------------------------------------------------
void EVENT_EGUI_null_dropDownList() {
    ((EGUIdropDownList)_id_.father).st = 200;
    ((EGUIdropDownList)_id_.father).eventCaptor = true;
}
//------------------------------------------------------------
void EVENT_EGUI_dropDownList_element() {
    ((EGUIdropDownList)_id_.father).st = 300;
    ((EGUIdropDownList)_id_.father).RCVparameter = _id_.id;
    ((EGUIdropDownList)_id_.father).eventCaptor = true;
}
//------------------------------------------------------------
void EVENT_EGUI_dropDownList_botonSubir() {
    ((EGUIdropDownList)_id_.father).st = 400;
    ((EGUIdropDownList)_id_.father).eventCaptor = true;
}
//------------------------------------------------------------
void EVENT_EGUI_dropDownList_botonBajar() {
    ((EGUIdropDownList)_id_.father).st = 500;
    ((EGUIdropDownList)_id_.father).eventCaptor = true;
}
//------------------------------------------------------------
class EGUIdropDownList extends sprite {
    int st = 0;
    String eventName = "";
    PFont fnt;
    float textSize = 22;
    String title = "";
    color titleColor = BLACK;
    float width = 100;
    float height = 32;
    EGUIbutton botonBase;
    String str = "";         // string temporal para calcular el ancho de los botones..
    StringList items;        // lista de items..
    int optionSelected = 0;    // numero de item seleccionado por default..
    int showIndex = 0;       // indice del campo a mostrar en la lista..
    String columnDelimitier = "~";    // delimitador de columnas para cada item..
    int tamanioListaMostrar = 5;
    int RCVparameter = 0;    // en esta variable recivo el index del boton pulsado de la lista..
    EGUIbutton botonSubir;
    EGUIbutton botonBajar;
    boolean locked = false;
    boolean blocked = false;
    boolean eventCaptor = false;        // si este control recibe un evento de algun subcrontrol se pone a true.. para evitar el auto cierre..
    EGUIdropDownList(PFont fnt, int textSize, String title, int x, float y, int width, StringList items, int itemSelected) {
        if (items.size()<1) {
            println("ERROR: La lista pasada a EGUIdropDownList esta vacia");
            return;
        }
        this.fnt = fnt;
        this.textSize = textSize;
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.optionSelected = itemSelected;
        this.items = items;
        type = -1001;        // tipo de proceso UI..
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }

    void finalize() {
        if (exists(this.botonBase)) {
            signal(this.botonBase, s_kill);
        }
        if (exists(this.botonSubir)) {
            signal(this.botonSubir, s_kill);
        }
        if (exists(this.botonBajar)) {
            signal(this.botonBajar, s_kill);
        }
    }

    void frame() {
        screenDrawText(fnt, (int)textSize, title, LEFT, x-this.width/2-10, y, this.titleColor, 255);
        switch(this.st) {
        case 0:
            float w = 0;
            str = "";
            blitter.textSize = this.textSize;
            if (this.fnt!=null) {
                blitter.textFont = this.fnt;
            }
            while (w < this.width) {
                str = str + "-";
                w = blitter.textWidth(str);
            }
            this.botonBase = new EGUIbutton( fnt, textSize, str, x, y );
            this.botonBase.title = this.title;
            this.botonBase.title = split(items.get(optionSelected), this.columnDelimitier)[showIndex];
            this.botonBase.setEvent("EVENT_EGUI_dropDownList");
            this.st = 10;
            break;
        case 10:
            // limbo..
            break;

        case 100:
            eventCaptor = false;
            lockEGUI();
            signal(this.botonBase, s_kill);
            if (items.size()<=tamanioListaMostrar) {
                this.optionSelected = 0;
            }
            int altoBoton = this.botonBase.g1.height;
            for (int i=0; i<tamanioListaMostrar; i++) {
                if ( i < items.size()-optionSelected ) {
                    EGUIbutton opt = new EGUIbutton(fnt, textSize, str, x, y+(i*(altoBoton+1)));
                    opt.title = split(items.get(optionSelected+i), this.columnDelimitier)[showIndex];
                    opt.setEvent("EVENT_EGUI_dropDownList_element");
                    opt.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
                    opt.id = optionSelected+i;
                } else {
                    EGUIbutton opt = new EGUIbutton(fnt, textSize, str, x, y+(i*(altoBoton+1)));
                    opt.setEvent("EVENT_EGUI_null_dropDownList");
                    opt.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
                }
            }


            blitter.pushMatrix();
            if (fnt!=null) {
                blitter.textFont(fnt);
            }
            blitter.textSize(textSize);
            w = (int)blitter.textWidth("<<") + (int)textWidth("OO");
            blitter.popMatrix();


            this.botonSubir = new EGUIbutton(fnt, textSize, "<<", x, y);
            this.botonSubir.x += this.botonBase.g1.width/2 + w/2 + 3;
            this.botonSubir.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
            this.botonSubir.setEvent("EVENT_EGUI_dropDownList_botonSubir");
            this.botonBajar = new EGUIbutton(fnt, textSize, ">>", this.botonSubir.x, y+(altoBoton+1));
            this.botonBajar.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
            this.botonBajar.setEvent("EVENT_EGUI_dropDownList_botonBajar");
            this.st = 110;
            break;
        case 110:
            // limbo..
            break;
        case 200:
            // vengo del evento de un item fuera de rango de la lista..
            eventCaptor = false;
            unlockEGUI();
            signal(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST, s_kill);
            this.st = 0;
            break;
        case 300:
            // vengo del evento de un item de la lista..
            // cambio el itemSelected..
            eventCaptor = false;
            unlockEGUI();
            this.optionSelected = this.RCVparameter;
            method(this.eventName);
            this.st = 200;
            break;

        case 400:
            // vengo del evento "EVENT_EGUI_dropDownList_botonSubir"..
            eventCaptor = false;
            if (this.optionSelected>0) {
                this.optionSelected --;
            }
            signal(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST, s_kill);
            altoBoton = this.botonBase.g1.height;
            for (int i=0; i<tamanioListaMostrar; i++) {
                if ( i < items.size()-optionSelected ) {
                    EGUIbutton opt = new EGUIbutton(fnt, textSize, str, x, y+(i*(altoBoton+1)));
                    opt.title = split(items.get(optionSelected+i), this.columnDelimitier)[showIndex];
                    opt.setEvent("EVENT_EGUI_dropDownList_element");
                    opt.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
                    opt.id = optionSelected+i;
                } else {
                    EGUIbutton opt = new EGUIbutton(fnt, textSize, str, x, y+(i*(altoBoton+1)));
                    opt.setEvent("EVENT_EGUI_null_dropDownList");
                    opt.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
                }
            }
            blitter.pushMatrix();
            if (fnt!=null) {
                blitter.textFont(fnt);
            }
            blitter.textSize(textSize);
            w = (int)blitter.textWidth("<<") + (int)textWidth("OO");
            blitter.popMatrix();
            this.botonSubir = new EGUIbutton(fnt, textSize, "<<", x, y);
            this.botonSubir.x += this.botonBase.g1.width/2 + w/2 + 3;
            this.botonSubir.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
            this.botonSubir.setEvent("EVENT_EGUI_dropDownList_botonSubir");
            this.botonBajar = new EGUIbutton(fnt, textSize, ">>", this.botonSubir.x, y+(altoBoton+1));
            this.botonBajar.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
            this.botonBajar.setEvent("EVENT_EGUI_dropDownList_botonBajar");
            this.st = 110;
            break;

        case 500:
            // vengo del evento "EVENT_EGUI_dropDownList_botonBajar"..
            eventCaptor = false;
            if (this.optionSelected<this.items.size()-this.tamanioListaMostrar) {
                this.optionSelected ++;
            }
            signal(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST, s_kill);
            altoBoton = this.botonBase.g1.height;
            for (int i=0; i<tamanioListaMostrar; i++) {
                if ( i < items.size()-optionSelected ) {
                    EGUIbutton opt = new EGUIbutton(fnt, textSize, str, x, y+(i*(altoBoton+1)));
                    opt.title = split(items.get(optionSelected+i), this.columnDelimitier)[showIndex];
                    opt.setEvent("EVENT_EGUI_dropDownList_element");
                    opt.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
                    opt.id = optionSelected+i;
                } else {
                    EGUIbutton opt = new EGUIbutton(fnt, textSize, str, x, y+(i*(altoBoton+1)));
                    opt.setEvent("EVENT_EGUI_null_dropDownList");
                    opt.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
                }
            }
            blitter.pushMatrix();
            if (fnt!=null) {
                blitter.textFont(fnt);
            }
            blitter.textSize(textSize);
            w = (int)blitter.textWidth("<<") + (int)textWidth("OO");
            blitter.popMatrix();
            this.botonSubir = new EGUIbutton(fnt, textSize, "<<", x, y);
            this.botonSubir.x += this.botonBase.g1.width/2 + w/2 + 3;
            this.botonSubir.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
            this.botonSubir.setEvent("EVENT_EGUI_dropDownList_botonSubir");
            this.botonBajar = new EGUIbutton(fnt, textSize, ">>", this.botonSubir.x, y+(altoBoton+1));
            this.botonBajar.setType(TYPE_VOLATILE_GUI_ELEMENT_DROPDOWNLIST);
            this.botonBajar.setEvent("EVENT_EGUI_dropDownList_botonBajar");
            this.st = 110;
            break;
        }
    }
    int getIndex() {
        return this.optionSelected;
    }
    String getOption() {
        return items.get(this.optionSelected);
    }
    void setEvent(String event) {
        this.eventName = event;
    }
    void setDelimitier(String delimitier) {
        this.columnDelimitier = delimitier;
    }
    void setOption(int optionNumber) {
        if (optionNumber>this.items.size() || optionNumber<0) {
            println("ERROR: EGUIdropDownList.setOption() fuera de rango");
        }
        this.optionSelected = optionNumber;
        signal(this.botonBase, s_kill);
        this.st = 0;
    }
    void selectOption(int column, String parameter) {
        for (int i=0; i<this.items.size(); i++) {
            String buffer = split(this.items.get(i), this.columnDelimitier)[column];
            if (buffer.equals(parameter)) {
                this.setOption(i);
            }
        }
    }
}


//==============================================================================================================================================
//------------------------------------------------------------
class EGUIframe extends sprite {
    int st = 0;
    int width = 320;
    int height = 200;
    color fillColor = 220;
    color strokeColor = #666666;
    EGUIframe(float x, float y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this. height = height;
    }
    void frame() {
        switch(this.st) {
        case 0:
            if (this.graph!=null) {
                this.graph = null;
            }
            PGraphics g = createGraphics(this.width, this.height);
            g.beginDraw();
            g.background(0);
            g.fill(fillColor);
            g.stroke(this.strokeColor);
            g.strokeWeight(2);
            g.rect(1, 1, this.width-2, this.height-2);
            g.endDraw();
            setGraph(g.copy());
            createBody(TYPE_BOX);
            setStatic(true);
            this.st = 10;
            break;
        case 10:
            // limbo..
            break;
        }
    }

    void setFillColor(color c) {
        this.fillColor = c;
        this.st= 0;
    }
}
//------------------------------------------------------------
class EGUIlista extends sprite {
    int st = 0;
    int textSize = 14;
    PFont fnt = null;
    String label = "*lista*";
    EGUIframe marco;
    EGUIframe marcoScrollBar;
    float _x;
    float _y;
    int w;
    int h;
    StringList items;
    int yOffset = 0;
    int interline = 20;
    ListaSubScrollBar idScrollButton;
    int anchoScrollBar = 30;
    float maxYoffset;
    int height_items;
    boolean locked = false;
    boolean blocked = false;
    String eventName = "";
    PImage gMask;
    PImage gMaskClick;
    int value = -1;
    boolean autoClose = true;
    String eventName_onOpenList = "";
    String eventName_onCloseList = "";
    boolean gat = false;
    void setAutoClose(boolean autoClose_) {
        this.autoClose = autoClose_;
    }

    public EGUIlista(float x, float y, int width, int height_items, StringList items, int textSize) {
        this._x = x;
        this._y = y;
        this.w = width;
        this.height_items = height_items;
        this.h = height_items*interline+2;
        this.items = items;
        this.items.sort();
        this.textSize = textSize;
        this.interline = this.textSize + this.textSize/4;
        this.maxYoffset = this.interline*(this.items.size()-this.height_items);
        this.gMask = newGraph(this.w-4, interline, WHITE);

        this.marco = new EGUIframe(_x, _y, w, h);
        this.marco.setRegion( new region( marco.x-marco.width/2, marco.y-marco.height/2, this.w, this.h ) );

        this.marcoScrollBar = new EGUIframe(_x+w/2+anchoScrollBar/2, _y, anchoScrollBar, h);
        idScrollButton = new ListaSubScrollBar(_x+w/2+anchoScrollBar/2, _y-h/2, h, anchoScrollBar);
        idScrollButton.father = this;

        this.maxYoffset = this.interline*(this.items.size()-this.height_items)+this.interline*3;
        this.gMask = newGraph(this.w-4, interline, WHITE);
        this.gMaskClick = newGraph(this.w-4, interline, GRAY);
    }

    void frame() {
        switch(this.st) {
        case 0:
            this.setRegion(this.marco.r);
            this.priority = this.marco.priority-1;
            if (!this.eventName_onOpenList.equals("")) {
                method(this.eventName_onOpenList);
            }
            this.st = 10;
            break;
        case 10:

            if (collisionMouse(this.marco) || collisionMouse(this.marcoScrollBar)) {
                if (mouse.touch) {
                    this.gat = true;
                }
                if (!lockUi && !locked && !blocked) {
                    int rowNum = int((mouse.y - this.r.y)/this.interline);

                    if (rowNum < this.items.size()) {    // solo es posible hacer click y remarcar linea si hay opcion en ella..
                        screenDrawGraphic(this.gMask, this._x, this.interline/2+this.r.y+rowNum*this.interline, 0, 100, 100, 255);
                        if (mouse.touch) {
                            lockUi = true;
                            this.st = 20;
                        }
                    }
                }
            } else {
                if (!mouse.touch) {
                    this.gat = false;
                }
                if (!this.gat) {
                    if (mouse.touch) {
                        this.st = 100;
                    }
                }
            }

            this.pintaItems();

            if (mouse.wheelUp) {
                if (this.yOffset<this.maxYoffset) {
                    this.yOffset +=this.interline;
                    // reposicionar boton barra scroll..
                    this.idScrollButton.setExternalValue( this.yOffset, this.maxYoffset );
                }
            }
            if (mouse.wheelDown && this.yOffset>0) {
                this.yOffset -= this.interline;
                // reposicionar boton barra scroll..
                this.idScrollButton.setExternalValue( this.yOffset, this.maxYoffset );
            }

            break;
        case 20:
            if (collisionMouse(this.marco)) {
                int rowNum = int((mouse.y - this.r.y)/this.interline);
                screenDrawGraphic(this.gMaskClick, this._x, this.interline/2+this.r.y+rowNum*this.interline, 0, 100, 100, 255);
                if (!mouse.touch) {
                    lockUi = false;
                    this.value = rowNum + int(this.yOffset/this.interline);
                    method(this.eventName);
                    if (!this.eventName_onCloseList.equals("")) {
                        method(this.eventName_onCloseList);
                    }
                    if (this.autoClose) {
                        signal(this, s_kill);
                        lockUi = false;
                        this.st = 30;
                    } else {
                        this.st = 10;
                    }
                }
            }

            this.pintaItems();
            break;

        case 100:
            if (!this.eventName_onCloseList.equals("")) {
                method(this.eventName_onCloseList);
            }
            signal(this, s_kill);
            lockUi = false;
            this.st = 110;
            break;
        }
    }

    void setExternalValue( float value, float maxValue ) {
        float newYoffsetValue = map(value, 0, maxValue, 0, maxYoffset);
        this.yOffset = int(int(newYoffsetValue)/this.interline)*this.interline;
    }

    void pintaItems() {
        int xoff = int(this.r.x)+this.interline/2;
        int yoff = int(this.r.y)+this.interline/2;
        for (int i=0; i<this.items.size(); i++) {
            this.screenDrawText(null, this.textSize, this.items.get(i), RIGHT, xoff, -this.yOffset+yoff+interline*i, BLACK, 255);
        }
    }

    void screenDrawText(PFont fnt_, int size, String text, int cod, float x, float y, color col, float alpha) {
        blitter.pushMatrix();
        blitter.camera();
        blitter.noLights();
        blitter.hint(DISABLE_DEPTH_TEST);
        if (fnt_ != null) {
            blitter.textFont(fnt_);
        }
        blitter.textSize(size);
        if (cod==CENTER) {
            blitter.textAlign(CENTER, CENTER);
        }
        if (cod==RIGHT) {
            blitter.textAlign(LEFT, CENTER);
        }
        if (cod==LEFT) {
            blitter.textAlign(RIGHT, CENTER);
        }
        blitter.fill(col, alpha);
        blitter.clip(this.r.x+this.r.w/2, this.r.y+this.r.h/2, this.r.w, this.r.h);
        blitter.text(text, x, y);
        blitter.hint(ENABLE_DEPTH_TEST);
        blitter.popMatrix();
    }

    void setEvent(String eventName) {
        this.eventName = eventName;
    }

    void finalize() {
        signal(this.marco, s_kill);
        signal(idScrollButton, s_kill);
        signal(this.marcoScrollBar, s_kill);
    }
}

class ListaSubScrollBar extends sprite {
    int st = 0;
    float miny;
    float maxy;
    float delta;
    boolean locked = false;
    boolean blocked = false;
    float value = 0;
    public ListaSubScrollBar(float x, float y, float alto, float anchoScrollBar) {
        this.x = x;
        this.y = this.miny = y + anchoScrollBar/2;
        this.maxy = this.miny + alto - anchoScrollBar;
        this.delta = this.maxy - this.miny;
    }

    void frame() {
        switch(this.st) {
        case 0:
            setGraph(newGraph(20, 20, BLACK));
            createBody(TYPE_BOX);
            setStatic(true);
            this.st = 10;
            break;
        case 10:
            if (collisionMouse(this) && !lockUi && !this.locked && !this.blocked) {
                if (mouse.touch) {
                    lockUi = true;
                    this.st = 20;
                }
            }
            break;
        case 20:
            float yy = mouse.y;
            if (yy<this.miny) {
                yy=this.miny;
            }
            if (yy>this.maxy) {
                yy=this.maxy;
            }
            setPosition(this.x, yy);
            this.value = map(this.y-this.miny, 0, this.delta, 0, 100);

            // reajustar el valor del offsety de los elementos de la lista..
            if (((EGUIlista)this.father).items.size()>((EGUIlista)this.father).height_items) {
                ((EGUIlista)this.father).setExternalValue(value, 100);
            }

            if (!mouse.touch) {
                lockUi = false;
                if (((EGUIlista)this.father).items.size()<=((EGUIlista)this.father).height_items) {
                    setPosition(this.x, this.miny);
                }
                this.st = 10;
            }

            break;
        }
    }

    void setExternalValue( float value, float maxValue ) {
        float newYvalue = map(value, 0, maxValue, miny, maxy);
        setPosition(this.x, newYvalue);
    }
}
//------------------------------------------------------------
//------------------------------------------------------------
void EVENT_EGUIcheckList_checkBox() {
    ((EGUIcheckList)_id_.father).onClick_checkBox( _id_.properties.get("name"), ((EGUIcheckBox)_id_).value );
}
//------------------------------------------------------------
void EVENT_EGUIcheckList_baseButton() {
    ((EGUIcheckList)_id_.father).onClick_baseButton();
}
//------------------------------------------------------------
class EGUIcheckList extends sprite {
    int st = 0;
    PFont fnt = null;
    int textSize = 14;
    String label = "";
    StringList items;
    EGUIframe fondo;
    boolean blocked = false;
    boolean locked = false;
    EGUIbutton baseButton;
    String eventName = "";
    int interElement = 0;
    int anchoMinimo = 100;
    int altoMinimo = 20;
    final int STATUS_OPENED = -1;
    final int STATUS_CLOSED = -2;
    int estado = STATUS_CLOSED;
    String eventName_onOpenList = "";
    String eventName_onCloseList = "";
    ArrayList <sprite>controles = new ArrayList<sprite>();
    String delimitier = "~";
    EGUIcheckList(PFont fnt, int textSize, String label, StringList items, int x, int y ) {
        this.fnt = fnt;
        this.textSize = textSize;
        this.label = label;
        this.items = items;
        for (int i=0; i<this.items.size(); i++) {
            this.properties.set( this.items.get(i), "FALSE" );
        }
        this.x = x;
        this.y = y;
        this.type = -1001;            // UI process..
        priority = 64;
        try {
            if (this.father.type == -1001) {
                this.priority = this.father.priority -16;
            }
        }
        catch(Exception e) {
        }
    }
    void setValues(boolean value) {
        for (int i=0; i<this.items.size(); i++) {
            this.properties.set(this.items.get(i), str(value).toUpperCase());
        }
    }
    void setValue(String property, String value) {
        this.properties.set(property, value);
    }

    StringList getValues() {
        StringList data = new StringList();
        String[] theKeys = this.properties.keyArray();
        for (int i=0; i<this.properties.size(); i++) {
            data.append(theKeys[i] + this.delimitier + this.properties.get(theKeys[i]));
        }
        return data;
    }

    void frame() {
        switch(this.st) {
        case 0:
            this.baseButton = new EGUIbutton(this.fnt, this.textSize, this.label, this.x, this.y);
            this.baseButton.setEvent("EVENT_EGUIcheckList_baseButton");
            this.baseButton.setColor(GRAY, LIGHTGRAY, GRAY);
            this.st = 10;
            break;
        case 10:
            // esperando a que se haga click en el boton de apertura de la checkList..
            break;
        case 20:
            // se ha hecho click en abrir la lista..

            // detectar las medidas correctas para los elementos..
            float ancho = this.anchoMinimo;
            float alto = this.altoMinimo;
            for (int i=0; i<this.items.size(); i++) {
                PVector vec = calculateText(null, this.textSize, this.items.get(i));
                if (vec.x > ancho) {
                    ancho = vec.x;
                }
                if (vec.y > alto) {
                    alto = vec.y;
                }
            }

            this.interElement = (int)alto;

            ancho += this.textSize*3;
            alto = alto * this.items.size() + this.interElement/2;

            // posicionar el frame de la lista..
            float xx = this.x + (ancho-this.baseButton.w)/2;
            float yy = this.y + this.baseButton.h/2 + alto/2 + 2;
            this.fondo = new EGUIframe(xx, yy, (int)ancho, (int)alto);
            //this.controles.add(this.fondo);
            // crear los checkBoxes..
            float offx = xx-ancho/2 + this.textSize;
            float offy = this.y + this.interElement;
            for (int i=0; i<this.items.size(); i++) {

                String optionName = split(this.items.get(i), delimitier)[0];

                EGUIcheckBox cb = new EGUIcheckBox(offx, offy+this.interElement*i, (int)(this.textSize*1.5), (int)(this.textSize*1.5));
                //putGraphic(cb.g2, 2, 2, img[37]);
                cb.setText(null, this.textSize, optionName, RIGHT, 30, 0, BLACK);
                cb.setValue(this.properties.get(optionName));
                cb.setEvent("EVENT_EGUIcheckList_checkBox");
                cb.properties.set("name", optionName);
                this.controles.add(cb);
            }
            this.st = 30;
            break;

        case 30:
            if (mouse.touch) {
                if (!collisionMouse(this.fondo)) {
                    if (!collisionMouse(this.baseButton)) {
                        onClick_baseButton();
                    }
                }
            }
            break;

        case 1000:
            signal(this.fondo, s_kill);
            for (sprite s : this.controles) {
                signal(s, s_kill);
            }
            this.st = 10;
            break;
        }
    }

    void onClick_checkBox(String name, boolean newValue) {
        this.properties.set(name, str(newValue).toUpperCase());
    }

    void onClick_baseButton() {
        switch(estado) {
        case STATUS_CLOSED:
            this.estado = this.STATUS_OPENED;
            lockEGUI();
            if (!this.eventName_onOpenList.equals("")) {
                method(this.eventName_onOpenList);
            }
            this.st = 20;
            break;
        case STATUS_OPENED:
            this.estado = this.STATUS_CLOSED;
            if (!this.eventName_onCloseList.equals("")) {
                method(this.eventName_onCloseList);
            }
            unlockEGUI();

            this.st = 1000;
            break;
        }
    }

    void setEvent(String eventName) {
        this.eventName = eventName;
    }
}
//------------------------------------------------------------
//==============================================================================================================================================
//==============================================================================================================================================
