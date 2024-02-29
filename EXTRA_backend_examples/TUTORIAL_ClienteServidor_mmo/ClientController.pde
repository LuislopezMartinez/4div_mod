ArrayList<ClientController>clients = new ArrayList<ClientController>();
//---------------------------------------------------------------------
class ClientController extends sprite {
    int st = 0;
    WebSocket sock;
    ArrayList <ClientController> playersArround = new ArrayList <ClientController>();
    boolean left = false;
    boolean right = false;
    boolean up = false;
    boolean down = false;

    boolean moved = false;

    public ClientController( WebSocket sock ) {
        this.sock = sock;
    }
    //------------
    void initialize() {
        this.x = random(0, WIDTH);
        this.y = random(0, HEIGHT);
        this.setGraph(newGraph(10, 10, WHITE));
    }
    //------------
    void finalize() {
    }
    //------------
    void frame() {
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
        if (this.left) {
            this.x--;
            this.moved = true;
        }
        if (this.right) {
            this.x++;
            this.moved = true;
        }
        if (this.up) {
            this.y--;
            this.moved =true;
        }
        if (this.down) {
            this.y++;
            this.moved = true;
        }
        screenDrawText(null, 22, "id:"+str(this.id), CENTER, this.x, this.y-15, YELLOW, 255);
    }
    //------------
    void RCV_network(StringList msg) {
        println("CLIENT SAYS: ", msg);
        switch(msg.get(0)) {
        case "update_controls":
            String controls = msg.get(1);
            if (controls.charAt(0) == '1') {
                this.left = true;
            } else {
                this.left = false;
            }
            if (controls.charAt(1) == '1') {
                this.right = true;
            } else {
                this.right = false;
            }
            if (controls.charAt(2) == '1') {
                this.up = true;
            } else {
                this.up = false;
            }
            if (controls.charAt(3) == '1') {
                this.down = true;
            } else {
                this.down = false;
            }
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
                    this.playersArround.add(clients.get(i));          // lo añado a la lista del sync..
                    // PLAYER ENTRA EN RANGO..
                    NetMessageWS m = new NetMessageWS(clients.get(i).sock);
                    m.add("playerArround_enter");
                    m.add("id:"+this.id);
                    m.add("x:"+this.x);
                    m.add("y:"+this.y);
                    m.send();
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
            m.add("x:"+this.x);
            m.add("y:"+this.y);
            m.send();
        }
    }
    //------------
    //------------
}
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
