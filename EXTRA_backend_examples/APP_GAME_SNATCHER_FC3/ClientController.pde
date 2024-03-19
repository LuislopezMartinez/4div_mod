ArrayList<ClientController>clients = new ArrayList<ClientController>();
//---------------------------------------------------------------------
class ClientController extends sprite {
    int st = 0;
    WebSocket sock;
    ArrayList <ClientController> playersArround = new ArrayList <ClientController>();
    boolean moved = false;
    String nick = "";
    String skin = "";
    PImage gr;
    String controls = "";
    public ClientController( WebSocket sock ) {
        this.sock = sock;
        this.gr = newGraph(20, 20, WHITE);
    }
    //------------
    void initialize() {
        //this.setGraph(newGraph(10, 10, WHITE));
        this.y = 10;
    }
    //------------
    void finalize() {
    }
    //------------
    void frame() {

        screenDrawGraphic(this.gr, this.x, this.z, -this.angle, 100, 100, 255);

        switch(this.st) {
        case 0:
            this.updatePlayersArround();
            this.move();

            if (this.moved && frameCount%10==0) {
                this.moved = false;
                this.syncPositionWithPlayersArround();
            }

            break;
        }
    }
    //------------
    void move() {
        // this.moved = true;
        screenDrawText(null, 22, "id:"+str(this.id), CENTER, this.x, this.y-15, YELLOW, 255);
    }
    //------------
    void RCV_network(StringList msg) {
        println("CLIENT SAYS: ", msg);
        switch(msg.get(0)) {


        case "netSendChatMessage":
            this.syncChatMessageWithPlayersArround(msg);
            break;

        case "netSendNick":
            // el cliente quiere setear su nick..
            this.nick = msg.get(1);
            this.skin = msg.get(2);
            break;

            /*
        case "netGetNickByID":
             // el cliente pregunta por el nick de un id en concreto..
             int id = int(msg.get(1));
             for (int i=0; i<this.playersArround.size(); i++) {                // recorro lista clientes..
             if (this.playersArround.get(i).id == id) {
             NetMessageWS m = new NetMessageWS(this.sock);
             m.add("netGetNickByID");
             m.add(msg.get(1));
             m.add(this.playersArround.get(i).nick);
             m.send();
             }
             }
             break;
             */

        case "netSyncPlayer":
            this.x = int(msg.get(1));
            this.y = int(msg.get(2));
            this.z = int(msg.get(3));
            this.angle = int(msg.get(4));
            this.controls = msg.get(5);
            this.moved = true;
            break;

        default:
            println("ERROR: [" + msg.get(0) + "] NET COMMAND NOT RECOGNIZED!");
            break;
        }
    }
    //------------
    void updatePlayersArround() {

        // si estan lejos los desSincronizo..
        for (int i=0; i<this.playersArround.size(); i++) {                // recorro lista clientes..
            float dist = this.getDist(this.playersArround.get(i));        // miro distancia a ellos..
            if (dist > CHARAS_DISTANCE_SYNC_OFF) {                        // si estan suficientemente lejos..
                // PLAYER SALE DE RANGO..
                NetMessageWS m = new NetMessageWS(this.playersArround.get(i).sock);
                m.add("playerArround_leave");
                m.add("id:"+this.id);
                m.send();
                this.playersArround.remove(this.playersArround.get(i));   // los saco de la lista del sync..
            }
        }

        // si estan cerca los sicronizo..
        for (int i=0; i<clients.size(); i++) {
            float dist = this.getDist(clients.get(i));
            if (dist < CHARAS_DISTANCE_SYNC_ON) {
                if (!this.playersArround.contains(clients.get(i))) {  // y si no esta ya sincronizado..
                    if (!this.nick.equals("")) {
                        this.playersArround.add(clients.get(i));          // lo añado a la lista del sync..
                        // PLAYER ENTRA EN RANGO..
                        NetMessageWS m = new NetMessageWS(clients.get(i).sock);
                        m.add("playerArround_enter");
                        m.add("id:"+this.id);
                        m.add("x:"+int(this.x));
                        m.add("y:"+int(this.y));
                        m.add("z:"+int(this.z));
                        if (clients.get(i).sock == this.sock) {
                            m.add("localPlayer:"+true);
                        } else {
                            m.add("localPlayer:"+false);
                        }
                        m.add("nick:"+this.nick);
                        m.add("skin:"+this.skin);
                        m.send();
                    }
                }
            }
        }
    }
    //------------
    //------------
    void syncPositionWithPlayersArround() {
        for (int i=0; i<this.playersArround.size(); i++) {
            ClientController id = this.playersArround.get(i);
            NetMessageWS m = new NetMessageWS(id.sock);
            m.add("playerPosition");
            m.add("id:"+this.id);
            m.add("x:"+int(this.x));
            m.add("y:"+int(this.y));
            m.add("z:"+int(this.z));
            m.add("a:"+int(this.angle));
            m.add("controls:" + this.controls);
            m.add("skin:" + this.skin);
            m.send();
        }
    }
    //------------
    void syncChatMessageWithPlayersArround(StringList msg) {
        for (int i=0; i<this.playersArround.size(); i++) {
            ClientController id = this.playersArround.get(i);
            NetMessageWS m = new NetMessageWS(id.sock);
            m.add("netSendChatMessage");
            m.add("id:"+this.id);
            m.add(msg.get(1));
            m.add("msg:"+msg.get(2));
            m.send();
        }
    }
    //------------
}
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
