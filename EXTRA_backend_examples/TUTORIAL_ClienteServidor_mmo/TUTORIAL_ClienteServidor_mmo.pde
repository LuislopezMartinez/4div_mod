
/*
    GameLibZero APP TEMPLATE.  (23/02/2019).
 
 
 */

final int CHARAS_DISTANCE_SYNC_ON = 100; // dist. a la que entra el sync..
final int CHARAS_DISTANCE_SYNC_OFF= 150; // dist. a la que sale el sync..


ServerTCP daemon;
WebSocketServer daemon2;

//--------------------------------------------------------------------
// PUT HERE YOUR VIDEO CONFIGURATION ETC..----------------------------
//--------------------------------------------------------------------
void Settings() {
    setMode(320, 200, false);
    setFps(60);
    fadingColor = 0;
    backgroundColor = 0;
    println(getIp());
    println(getMac());
    //daemon = createServerTCP(9080);
    //daemon.setTimeout(10);    // x segundos sin beacon del cliente indica un problema de conexion..
    daemon2 = createServerWS(9080);
}
//--------------------------------------------------------------------
// PUT HERE YOUR INIT LOAD RESOURCES CODE-----------------------------
//--------------------------------------------------------------------
void Setup() {
    orientation(LANDSCAPE);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// PUT HERE YOUR MAIN APP CODE----------------------------------------
//--------------------------------------------------------------------
void Draw() {
    screenDrawText(null, 22, "Clientes conectados: " + str(clients.size()), RIGHT, 10, 10, WHITE, 255);
}
//--------------------------------------------------------------------
// PUT HERE YOUR EXIT CODE--------------------------------------------
//--------------------------------------------------------------------
void onExit() {
}
