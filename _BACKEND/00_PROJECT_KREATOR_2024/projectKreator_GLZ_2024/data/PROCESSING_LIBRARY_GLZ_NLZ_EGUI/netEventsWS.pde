//------------------------------------------------------------
void onNetServerCloseWS(WebSocket s) {
    println("[SERVER] Conection closed.");
}
//------------------------------------------------------------
void onNetServerOpenWS(WebSocket s) {
    println("[SERVER] New conection established!");
}
//--------------------------------------------------------------------
// PUT HERE YOUR NET RCV PARSER CODE----------------------------------
//--------------------------------------------------------------------
void onNetServerMessageWS(WebSocket s, StringList msg) {
}
