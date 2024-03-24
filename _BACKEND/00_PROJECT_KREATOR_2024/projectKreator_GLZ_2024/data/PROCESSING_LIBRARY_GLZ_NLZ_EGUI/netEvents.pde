//------------------------------------------------------------
void onNetServerClose(Servidor s) {
    println("[SERVER] Conection closed.");
}
//------------------------------------------------------------
void onNetServerOpen(Servidor s) {
    println("[SERVER] New conection established!");
}
//--------------------------------------------------------------------
void onNetServerError(Servidor s, Exception e) {
}
//--------------------------------------------------------------------
// PUT HERE YOUR NET RCV PARSER CODE----------------------------------
//--------------------------------------------------------------------
void onNetServerMessage(Servidor s, StringList msg) {
    println(msg);
}
//--------------------------------------------------------------------
// PUT HERE YOUR NET RCV PARSER CODE----------------------------------
//--------------------------------------------------------------------
void onNetClientMessage(Client c, StringList msg) {
    println(msg);
}
//------------------------------------------------------------
void onNetClientOpen(Client c){
    println("[CLIENT] Conectado al servidor!");
}
void onNetClientClose(Client c){
    println("[CLIENT] Desconectado al servidor!");
}
//------------------------------------------------------------
void onNetClientError(Client c, Exception e) {
}
//------------------------------------------------------------
