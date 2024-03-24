//------------------------------------------------------------
void onNetServerCloseWS(WebSocket s) {
    println("[SERVER] Conection closed.");
    
    // find the socket to client..
    ClientController cliente = null;
    for (int i=0; i<clients.size(); i++) {
        if (clients.get(i).sock == s) {
            cliente = clients.get(i);
        }
    }
    
    // if found.. kill them..
    if (cliente != null) {
        clients.remove(cliente);
        signal(cliente, s_kill);
    }
    
    // broadcast of disconnection to all other clients..
    for (int i=0; i<clients.size(); i++) {
        NetMessageWS m = new NetMessageWS(clients.get(i).sock);
        m.add("playerDisconnect");
        m.add(str(cliente.id));
        m.send();
    }
}
//------------------------------------------------------------
void onNetServerOpenWS(WebSocket s) {
    println("[SERVER] New conection established!");
    ClientController c = new ClientController(s);
    clients.add(c);
}
//--------------------------------------------------------------------
// PUT HERE YOUR NET RCV PARSER CODE----------------------------------
//--------------------------------------------------------------------
void onNetServerMessageWS(WebSocket s, StringList msg) {
    //println(msg);
    for (int i=0; i<clients.size(); i++) {
        if (clients.get(i).sock == s) {
            clients.get(i).RCV_network(msg);
        }
    }
}
