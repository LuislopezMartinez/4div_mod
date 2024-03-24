////////////////////////////////////////////////////////////////////////
//            This file are part of:
//            GameLibZero 2.4.7 by Luis Lopez Martinez
//                  12/09/2017 - 24/05/2020
//                OPEN SOURCE - M.I.T. License.
////////////////////////////////////////////////////////////////////////
int ST = 0;
PImage[] img;
PFont[]  fnt;
EGUIradioButton platform;
EGUIradioButton opengl;
EGUIcheckBox netLibZeroWS;
EGUIcheckBox netLibZeroTCP;
EGUIcheckBox egui;
EGUIbutton generarProyecto;
EGUIinputBox nombreProyecto;
projectManager idPM;
//-------------------------------------------------------------------------------------------------
void onExit() {
}
//-------------------------------------------------------------------------------------------------
void Settings() {
    setMode(400, 320, false);
    setFps(30);
    fadingColor = 0;
    backgroundColor = 0;
    orientation(LANDSCAPE);
}
//-------------------------------------------------------------------------------------------------
void Setup() {
    img      = loadImages("image/main");
    fnt = loadFonts("fnt");
}
//-------------------------------------------------------------------------------------------------
void Draw() {
    switch(ST) {
    case 0:
        idPM = new projectManager();
        ST = 10;
        break;
    case 10:
        superScreenDrawText(fnt[0], 50, "GAME LIB ZERO", CENTER, 200, 30, WHITE, 255, VIOLET, 2);
        screenDrawText(fnt[2], 16, "Project creator for Processing 4.3.0", CENTER, 200, 65, WHITE, 255);
        screenDrawText(fnt[2], 14, "Author: Luis lopez martinez BCN (SPAIN).", CENTER, 200, 80, BLUE, 255);
        break;
    }
}
//-------------------------------------------------------------------------------------------------
void superScreenDrawText(PFont fnt, int size, String text, int align, float x, float y, color c, float alpha, color backColor, float backSize) {
    screenDrawText(fnt, size, text, align, x-backSize, y, backColor, alpha);
    screenDrawText(fnt, size, text, align, x+backSize, y, backColor, alpha);
    screenDrawText(fnt, size, text, align, x, y-backSize, backColor, alpha);
    screenDrawText(fnt, size, text, align, x, y+backSize, backColor, alpha);
    screenDrawText(fnt, size, text, align, x, y, c, alpha);
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
void seleccion_plataforma() {
    switch(platform.value) {
    case 0:
        idPM.PLATAFORMA = "Desktop";
        break;
    case 1:
        idPM.PLATAFORMA = "Android";
        break;
    }
}
//-------------------------------------------------------------------------------------------------
void selection_render() {
    switch(opengl.value) {
    case 0:
        idPM.OPENGL = true;
        break;
    case 1:
        idPM.OPENGL = false;
        break;
    }
}
//-------------------------------------------------------------------------------------------------
void add_egui() {
    if (egui.value) {
        idPM.EGUI = true;
    } else {
        idPM.EGUI = false;
    }
}
//-------------------------------------------------------------------------------------------------
void add_netLibZeroWS() {
    if (netLibZeroWS.value) {
        idPM.NETLIBZERO_WS = true;
    } else {
        idPM.NETLIBZERO_WS = false;
    }
}
//-------------------------------------------------------------------------------------------------
void add_netLibZeroTCP() {
    if (netLibZeroTCP.value) {
        idPM.NETLIBZERO_TCP = true;
    } else {
        idPM.NETLIBZERO_TCP = false;
    }
}
//-------------------------------------------------------------------------------------------------
void nombre_proyecto() {
    idPM.NOMBRE_PROYECTO = nombreProyecto.parameter;
}
//-------------------------------------------------------------------------------------------------
void generar_proyecto() {
    idPM.generarProyecto();
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
class projectManager extends sprite {
    int st = 0;
    String[] plataformas = { "Desktop", "Android" };
    String[] renders = { "OpenGL", "JavaFX" };
    boolean EGUI = false;
    boolean NETLIBZERO_WS = false;
    boolean NETLIBZERO_TCP = false;
    String PLATAFORMA = "Desktop";
    boolean OPENGL = true;
    String NOMBRE_PROYECTO = "newProject";
    void frame() {
        switch(st) {
        case 0:

            platform = new EGUIradioButton(plataformas, 144, 110);
            platform.setEvent("seleccion_plataforma");

            opengl = new EGUIradioButton(renders, 144, 140);
            opengl.setEvent("selection_render");

            netLibZeroWS = new EGUIcheckBox( 215, 184, 18, 18, DARKBLUE, SKYBLUE );
            netLibZeroWS.setEvent("add_netLibZeroWS");

            netLibZeroTCP = new EGUIcheckBox( 215, 210, 18, 18, DARKBLUE, SKYBLUE );
            netLibZeroTCP.setEvent("add_netLibZeroTCP");

            egui       = new EGUIcheckBox( 215, 236, 18, 18, DARKBLUE, SKYBLUE );
            egui.setEvent("add_egui");


            nombreProyecto = new EGUIinputBox("Name: ", "newProject", 0, 300, 220, 16, false);
            nombreProyecto.setEvent("nombre_proyecto");

            generarProyecto = new EGUIbutton("BUILD PROJECT", 330, 300);
            generarProyecto.setTextColor(YELLOW);
            generarProyecto.setEvent("generar_proyecto");

            st = 10;
            break;
        case 10:
            screenDrawText(fnt[2], 12, "SELECT PLATFORM TO BUILD PROJECT", CENTER, 200, 95, GREEN, 255);
            screenDrawText(fnt[2], 12, "SELECT RENDER->ONLY DESKTOP", CENTER, 200, 126, GREEN, 255);
            screenDrawText(fnt[2], 12, "ADD EXTRA MODULES", CENTER, 200, 160, GREEN, 255);
            screenDrawText(fnt[2], 14, "netLibZeroWS", LEFT, 195, 184, WHITE, 255);
            screenDrawText(fnt[2], 14, "netLibZeroTCP", LEFT, 195, 210, WHITE, 255);
            screenDrawText(fnt[2], 14, "Egui", LEFT, 195, 236, WHITE, 255);
            break;
        }
    }
    void generarProyecto() {
        // crear carpeta con el nombre del proyecto..
        String fullPath = sketchPath("PROJECTS/" + NOMBRE_PROYECTO );
        mkDir(fullPath);
        mkDir(fullPath+"/code");



        // añadirle el template segun la plataforma..
        fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/APP_TEMPLATE.pde"), fullPath+"/"+ NOMBRE_PROYECTO + ".pde", true);



        // mirar de añadir el core correcto de la libreria gameLibZero..
        switch(PLATAFORMA) {
        case "Desktop":
            if (OPENGL) {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/desktop_gameLibZero_openGL.pde"), fullPath+"/"+ "desktop_gameLibZero_openGL.pde", true);
            } else {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/desktop_gameLibZero_javaFX.pde"), fullPath+"/"+ "desktop_gameLibZero_javaFX.pde", true);
            }
            break;
        case "Android":
            fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/android_gameLibZero_openGL.pde"), fullPath+"/"+ "android_gameLibZero_openGL.pde", true);
            break;
        }



        // mirar si añadir libreria netLibZero_WS segun la plataforma..
        switch(PLATAFORMA) {
        case "Desktop":
            if (NETLIBZERO_WS) {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netLibZeroWS.pde"), fullPath+"/"+ "netLibZeroWS.pde", true);
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netEventsWS.pde"), fullPath+"/"+ "netEventsWS.pde", true);
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/java_websocket.jar"), fullPath+"/code/"+ "java_websocket.jar", true);
            }
            break;
        case "Android":
            if (NETLIBZERO_WS) {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netLibZeroWS.pde"), fullPath+"/"+ "netLibZeroWS.pde", true);
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netEventsWS.pde"), fullPath+"/"+ "netEventsWS.pde", true);
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/java_websocket.jar"), fullPath+"/code/"+ "java_websocket.jar", true);
            }
            break;
        }



        // mirar si añadir libreria netLibZero_TCP segun la plataforma..
        switch(PLATAFORMA) {
        case "Desktop":
            if (NETLIBZERO_TCP) {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netLibZeroTCP.pde"), fullPath+"/"+ "netLibZeroTCP.pde", true);
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netEventsTCP.pde"), fullPath+"/"+ "netEventsTCP.pde", true);
            }
            break;
        case "Android":
            if (NETLIBZERO_TCP) {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netLibZeroTCP.pde"), fullPath+"/"+ "netLibZeroTCP.pde", true);
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/netEventsTCP.pde"), fullPath+"/"+ "netEventsTCP.pde", true);
            }
            break;
        }



        // mirar si añadir libreria egui segun la plataforma..
        switch(PLATAFORMA) {
        case "Desktop":
            if (EGUI) {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/desktop_EGUI.pde"), fullPath+"/"+ "desktop_EGUI.pde", true);
            }
            break;
        case "Android":
            if (EGUI) {
                fileCopy( dataPath("PROCESSING_LIBRARY_GLZ_NLZ_EGUI/android_EGUI.pde"), fullPath+"/"+ "android_EGUI.pde", true);
            }
            break;
        }



        // crear carpeta data..
        mkDir(fullPath+"/data");
        // salir..
        exit();
    }
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
