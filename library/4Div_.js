
// GameLibZeroWEB by Luis lopez martinez.  (SPAIN)
// This software is licensed under ZLIB license.
// Free way to use it for personal/comercial use with full features. (Enjot it!).
// I writes this lines on 22 november of 2023 of our lord lucifer.

const s_kill = 77;
const s_protected = 777;
const s_unprotected = 7777;

const all_sound = 77777;

const LEFT = 15;
const RIGHT = 16;
const CENTER = 17;

const GLZ_TYPE_DEFAULT = -1;

let _glz_socket = null;
const NET_TOK_DATA = '~';           // delimitier for socket tokens..
const SOCKET_CONNECTED = 21;
const SOCKET_ERROR = 22;
const SOCKET_CLOSED = 23;
const SOCKET_NULL = 24;

// colors..
const WHITE = 0xffffff;
const SILVER = 0xc0c0c0;
const GRAY = 0x808080;
const BLACK = 0x000000;
const RED = 0xff0000;
const MAROON = 0x800000;
const YELLOW = 0xffff00;
const OLIVE = 0x808000;
const LIME = 0x00ff00;
const GREEN = 0x008000;
const BLUE = 0x0000ff;
const PINK = 0xff00ff;
const PURPLE = 0x800080;
const ORANGE = 0xf77f07;

// 3d materials..
const BASIC = 8;        // A basic material that doesn’t respond to lighting, providing flat shading and a consistent color across the object.
const LAMBERT = 9;      // A material that reacts to light in a Lambertian manner, providing diffuse reflection and smooth shading.
const WIRED = 10;       // wireframe activated..
const STANDARD = 11;    // A physically based material with realistic shading, offering parameters like roughness and metalness for controlling the surface appearance.
const TOON = 12;        // A simplified shading model that creates a flat, cartoon-like appearance.
const PHONG = 13;       // A material that simulates specular and shiny surfaces, reacting to light with highlights and reflections.
const TEXTURED = 14;    // material with texture applyed.

let _4div_light_ambient_;
let _4div_light_ambient_color_ = WHITE;
let _4div_light_ambient_intensity_ = 0.1;

let _4div_fullscreen = false;
let app;
let WIDTH = 0;
let HEIGHT = 0;
let backgroundColor = RED;
let mouse;

let fading = false;
let alphaFading = 0;
let deltaFading = 0;
let fadingColor = WHITE;
let fadingType = 0;
let fadingRect_z = 1000000;

let _id_ = undefined;
let unique_process_id_ = 0;
let gameObjects = [];
let frameCount = 0;

var fps = 0;            // indica los frames reales por segundo..
var fps_counter = 0;    // contador de frames mientras no pasen 1000 milisegundos..
var fps_flag = false;   // se pone a true cuando pasan 1000 milisegundos..
var fps_time_start = 0; // marca el tiempo al inicio de la cuenta de frames..
var fps_time_now = 0;   // marca el tiempo actual..

let renderer;
let scene;
let fog;
let needFogUpdate = false;
let camera;
let THREE_TEXTURE;
let three_renderer_use_shadows = true;

var world;                  // mundo fisico de cannon.js..
var timeStep = 1 / 60;        // tiempo que dura un frame..

// variables para el sistema de tocoSuelo..
var upVector = new CANNON.Vec3(0, 1, 0);
var contactNormal = new CANNON.Vec3(0, 0, 0);
var _3div_requestIsGrounded = [];

const TYPE_BOX = 18;
const TYPE_SPHERE = 19;
const TYPE_PLANE = 20;
const TYPE_CYLINDER = 21;

const _UP = 38;
const _DOWN = 40;
const _LEFT = 37;
const _RIGHT = 39;
const _ENTER = 13;
const _ESC = 27;
const _SPACE = 32;
const _SHIFT = 16;
const _CONTROL = 17;
const _BLOCK_SHIFT = 20;
const _TAB = 9;
const _Q = 81;
const _W = 87;
const _E = 69;
const _R = 82;
const _T = 84;
const _Y = 89;
const _U = 85;
const _I = 73;
const _O = 79;
const _P = 80;
const _A = 65;
const _S = 83;
const _D = 68;
const _F = 70;
const _G = 71;
const _H = 72;
const _J = 74;
const _K = 75;
const _L = 76;
const _Ñ = 192;
const _Z = 90;
const _X = 88;
const _C = 67;
const _V = 86;
const _B = 66;
const _N = 78;
const _M = 77;
const _COMA = 188;
const _PUNTO = 190;
const _GUION = 189;
const _1 = 49;
const _2 = 50;
const _3 = 51;
const _4 = 52;
const _5 = 53;
const _6 = 54;
const _7 = 55;
const _8 = 56;
const _9 = 57;
const _0 = 48;
const _DELETE = 46;
const _END = 35;
const _PAGEDOWN = 34;

var GLZ_KEYBOARD;
var keyboard_buffer = "";
var keys = [256];
const GLZ_KEYBOARD_NORMAL_KEY_TYPE = "_TYPE_GLZ_KEYBOARD_NORMAL_KEY_";
const GLZ_KEYBOARD_SPECIAL_KEY_TYPE = "_TYPE_GLZ_KEYBOARD_SPECIAL_KEY_";
let glz_sound_master_volume = 1;
//----------------------------------------------------------------------------------
function soundSetMasterVolume(value) {
    glz_sound_master_volume = value;
}
//==================================================================================
//----------------------------------------------------------------------------------
function setTitle(title) {
    document.title = title;
}
//----------------------------------------------------------------------------------
function abs(num) {
    return Math.abs(num);
}
//----------------------------------------------------------------------------------
function sin(num) {
    return Math.sin(num);
}
//----------------------------------------------------------------------------------
function cos(num) {
    return Math.cos(num);
}
//----------------------------------------------------------------------------------
function rand(min, max) {
    if (arguments.length == 1) {
        return Math.random() * min;
    } else if (arguments.length == 2) {
        return (Math.random() * (max - min)) + min;
    }
}
//----------------------------------------------------------------------------------
function random(min, max) {
    if (arguments.length == 1) {
        return Math.random() * min;
    } else if (arguments.length == 2) {
        return (Math.random() * (max - min)) + min;
    }
}
//----------------------------------------------------------------------------------
// Convert from degrees to radians.
function radians(degrees) {
    return degrees * Math.PI / 180;
}
//----------------------------------------------------------------------------------
// Convert from radians to degrees.
function degrees(radians) {
    return radians * 180 / Math.PI;
}
//----------------------------------------------------------------------------------
function method(codeToExecute) {
    //var tmpFunc = new Function(codeToExecute);
    //tmpFunc();
    window[codeToExecute]();
}
//----------------------------------------------------------------------------------
function str(number) {
    return number.toString();
}
//----------------------------------------------------------------------------------
function int(floatvalue) {
    return Math.floor(floatvalue);
}
//----------------------------------------------------------------------------------
function isInteger(value) {
    return Number.isInteger(value);
}
//----------------------------------------------------------------------------------
//==================================================================================
function setFps(value) {
    app.ticker.maxFPS = value;
}
//----------------------------------------------------------------------------------
function enableShadows(value) {
    three_renderer_use_shadows = value;
}
//----------------------------------------------------------------------------------
window.onload = function () {
    window.addEventListener("resize", resizeGame);
    this.setup();
    resizeGame();
    Waud.init();
    Waud.autoMute();

    initTouch();
    mouse = new Mouse();
    signal(mouse, s_protected);

    fadeRect = PIXI.Sprite.from(PIXI.Texture.WHITE);
    fadeRect.width = WIDTH;
    fadeRect.height = HEIGHT;
    fadeRect.tint = fadingColor;
    fadeRect.alpha = 0;
    fadeRect.zIndex = fadingRect_z;        // cuanto mas alto mas delante se pintara..
    app.stage.addChild(fadeRect);
    app.ticker.add(_main_core_);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    camera.position.z = -50;
    camera.position.y = 20;
    camera.lookAt(scene.position);

    // setup THREE WebGL renderer
    THREE.Cache.enabled = true;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    if (three_renderer_use_shadows) {
        renderer.shadowMap.enabled = true;
        //renderer.shadowMap.type = THREE.BasicShadowMap;
        //renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    renderer.setClearColor(backgroundColor, 1);
    renderer.setSize(WIDTH, HEIGHT);

    _4div_light_ambient_ = new THREE.AmbientLight(_4div_light_ambient_color_, _4div_light_ambient_intensity_);
    scene.add(_4div_light_ambient_);

    THREE_TEXTURE = PIXI.BaseTexture.from(renderer.domElement, PIXI.SCALE_MODES.LINEAR);
    var THREE_SPRITE = new PIXI.Sprite.from(new PIXI.Texture(THREE_TEXTURE));
    app.stage.addChild(THREE_SPRITE);

    initCannon();

    console.log("Page loaded!");

}
//----------------------------------------------------------------------------------
function setAmbientLightColor(value) {
    if (_4div_light_ambient_) {
        _4div_light_ambient_color_ = value;
        _4div_light_ambient_.color.setHex(value);
    } else {
        _4div_light_ambient_color_ = value;
    }
}
function setAmbientLightIntensity(value) {
    if (_4div_light_ambient_) {
        _4div_light_ambient_.intensity = value;
    } else {
        _4div_light_ambient_intensity_ = value;
    }
}
//----------------------------------------------------------------------------------
function initCannon() {

    world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();

    world.solver.iterations = 10;
    //world.solver.tolerance = 0.1;
    //world.defaultContactMaterial.friction = 0.1;
    //world.broadphase.useBoundingBoxes = true;

    world.addEventListener("preStep", function (e) {
        for (let i = 0; i < _3div_requestIsGrounded.length; i++) {
            _3div_requestIsGrounded[i].isOnGround = false;
        }
    });

    world.addEventListener("postStep", function (e) {
        if (world.contacts.length > 0) {
            for (var i = 0; i < world.contacts.length; i++) {
                var contact = world.contacts[i];
                for (var j = 0; j < _3div_requestIsGrounded.length; j++) {
                    var object = _3div_requestIsGrounded[j];
                    if (contact.bi.id == object.id || contact.bj.id == object.id) {
                        if (contact.bi.id == object.id) {
                            contact.ni.negate(contactNormal);
                        } else {
                            contact.ni.copy(contactNormal);
                        }


                        if (!object.isOnGround) {
                            object.isOnGround = contactNormal.dot(upVector) > 0.5;
                        }


                    }
                }
            }
        }
    });
}
//---------------------------------------------------------------------------------
function setGravity(x, y, z) {
    world.gravity.set(x, y, z);
}
//----------------------------------------------------------------------------------
function resizeGame() {
    var canvas = document.getElementById("myCanvas2d");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    app.renderer.view.style.width = canvas.width + 'px';
    app.renderer.view.style.height = canvas.height + 'px';

}
//----------------------------------------------------------------------------------
function requestFullScreen() {
    if (_4div_fullscreen) {
        var el = document.body;
        // Supports most browsers and their versions.
        var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (requestMethod) {
            // Native full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") {
            // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
}
//----------------------------------------------------------------------------------
function setMode(width_, height_, fullscreen_) {
    //app = new PIXI.Application({width: width_, height: height_, backgroundColor: backgroundColor});
    app = new PIXI.Application({ width: width_, height: height_ });
    _4div_fullscreen = fullscreen_;
    WIDTH = width_;
    HEIGHT = height_;
    app.stage.sortableChildren = true;
    this.document.body.appendChild(app.view);
}
//---------------------------------------------------------------------------------
function setFilter(value) {
    switch (value) {
        case "LINEAR":
            PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
            break;
        case "NEAREST":
            PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
            break;
        default:
            PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
            console.warn("setFilter(", value, ") not exists!, default: LINEAR");
            break;
    }
}
//---------------------------------------------------------------------------------
function setFog(near, far) {
    fog = new THREE.Fog(backgroundColor, near, far);
    needFogUpdate = true;
}
//---------------------------------------------------------------------------------
function _fade_instantaneo_() {
    if (fadingType == -1) {
        deltaFading = 0;
        alphaFading = 0;
        fading = false;
    } else if (fadingType == 1) {
        deltaFading = 0;
        alphaFading = 1;
        fading = false;
    }
}
//---------------------------------------------------------------------------------
function fadeOn(time_) {
    fading = true;
    fadingType = -1;
    var fadingFramesLeft = Math.floor((time_ * 60) / 1000);
    deltaFading = (1.0 / fadingFramesLeft);
    if (time_ == 0) {
        _fade_instantaneo_();
    }
    //console.log(fadingFramesLeft, deltaFading, alphaFading); 
}
//---------------------------------------------------------------------------------
function fadeOff(time_) {
    fading = true;
    fadingType = 1;
    var fadingFramesLeft = Math.floor((time_ * 60) / 1000);
    deltaFading = (1.0 / fadingFramesLeft);
    if (time_ == 0) {
        _fade_instantaneo_();
    }
    //console.log(alphaFading, deltaFading, fading);
}
//---------------------------------------------------------------------------------
function _main_core_() {
    // MAIN LOOP..
    _id_ = undefined;
    if (frameCount > 1) {
        main();
        if (needFogUpdate == true) {
            needFogUpdate = false;
            scene.fog = fog;
        }
    }

    // SORT gameObject SET..
    gameObjects.sort(function (a, b) {
        return a.priority - b.priority;
    });

    // EXECUTE SPRITE BATCH OPERATIONS FOR PURGE OBJECTS..
    for (var i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].statusKill) {
            gameObjects[i].finalize();
            if (gameObjects[i].graph != undefined) {
                app.stage.removeChild(gameObjects[i].graph);
            }
            if (gameObjects[i].clipRegion != undefined) {
                app.stage.removeChild(gameObjects[i].clipRegion);
            }

            if (gameObjects[i].mesh != undefined) {
                if (gameObjects[i].model) {
                    removeObject3D(this.mesh);
                } else {
                    gameObjects[i].mesh.geometry.dispose();
                    gameObjects[i].mesh.material.dispose();
                }
                scene.remove(gameObjects[i].mesh);

            }
            gameObjects[i].destroyBody();
            this.body = undefined;
            gameObjects.splice(i, 1);        // elimino el proceso de la lista..
        } else if (!gameObjects[i].live) {
            gameObjects[i].statusKill = true;
        }
    }

    for (var i = 0; i < gameObjects.length; i++) {
        _id_ = gameObjects[i];
        if (_id_.livedFrames == 0) {
            _id_.initialize();
        }
        _id_.livedFrames++;
        if (_id_.live) {
            // DRAW SPRITE GRAPH..
            gameObjects[i].draw();

            // EXECUTE SPRITE CODE..
            gameObjects[i].frame();
        }
    }

    // fading system..
    if (fading) {
        if (fadingType == -1) {
            if (alphaFading > 0.0) {
                alphaFading -= deltaFading;
            } else {
                deltaFading = 1.0;
                alphaFading = 0.0;
                fading = false;
            }
        } else if (fadingType == 1) {
            if (alphaFading < 1.0) {
                alphaFading += deltaFading;
            } else {
                deltaFading = 0;
                alphaFading = 1.0;
                fading = false;
            }
        }
    }

    if (alphaFading > 0) {
        fadeRect.alpha = alphaFading;
    }

    // frame counter..
    frameCount++;

    // fps real time counter..
    if (fps_flag) {
        fps_counter++;
        fps_time_now = Date.now();
        if ((fps_time_now - fps_time_start) > 1000) {
            fps_flag = false;
        }
    } else {
        fps = fps_counter;
        fps_counter = 0;
        fps_time_start = Date.now();
        fps_flag = true;
    }

    if (world) {
        world.step(timeStep);
    }

    // tunel three.js..
    renderer.render(scene, camera);
    THREE_TEXTURE.update();

    mouse.wheelDown = false;
    mouse.wheelUp = false;

}
//---------------------------------------------------------------------------------
class GameObject {
    constructor() {
        this.graph;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.oldx = 0;
        this.oldy = 0;
        this._cx = 0.5;
        this._cy = 0.5;
        this.angle = 0; // angle z..
        this.anglex = 0;
        this.angley = 0;
        this.size = 1;
        this.sizex = 1;
        this.sizey = 1;
        this.sizez = 1;
        this.alpha = 1.0;
        this.live = true;
        this.statusKill = false;
        this.killProtection = false;
        this.livedFrames = 0;
        this.priority = 0;
        this.type = 0;
        unique_process_id_++;
        this.id = unique_process_id_;   // id del proceso.. int..
        this.touch_id;
        gameObjects.push(this);

        this.father = _id_;
        this.clipRegion;
        this.mirrorx = false;
        this.mirrory = false;

        this.newgraph_created = false;
        this.visible = true;
        this.sx = 0;
        this.sy = 0;

        this.geometry = undefined;
        this.material = undefined;
        this.mesh = undefined;
        this.physic = false;
        this.model = false;

        this.body;                      // cuerpo fisico del proceso..
        this.radius = 0;                // si creas cuerpos esfericos guardan aquí su radio..
        this.oldMass = 0;               // cuando haces estatico un cuerpo guardas aquí su masa    

    }
    initialize() {

    }
    frame() {

    }
    finalize() {

    }
    draw() {
        // 2D layer..
        this.oldx = this.x;
        this.oldy = this.y;

        if (this.graph != undefined) {
            this.graph.visible = this.visible;
            if (this._scene != undefined) {
                this.sx = this.x - (this._scene.offset.x * this._scene_zoom_factor);
                this.sy = this.y - (this._scene.offset.y * this._scene_zoom_factor);
                this.graph.x = this.sx;
                this.graph.y = this.sy;
            } else {
                this.graph.x = this.x;
                this.graph.y = this.y;
            }

            this.graph.zIndex = this.z;
            this.graph.anchor.x = this._cx;
            this.graph.anchor.y = this._cy;
            this.graph.alpha = this.alpha;
            this.graph.rotation = -radians(this.angle);
            if (this.sizex === 1 && this.sizey === 1) {
                if (this.newgraph_created === true) {
                    this.graph.width = this._w * this.size;
                    this.graph.height = this._h * this.size;
                } else {
                    if (this.mirrorx == true) {
                        this.graph.scale.x = -this.size;
                    } else {
                        this.graph.scale.x = this.size;
                    }
                    if (this.mirrory == true) {
                        this.graph.scale.y = -this.size;
                    } else {
                        this.graph.scale.y = this.size;
                    }


                }

            } else {
                if (this.newgraph_created === true) {
                    this.graph.width = this._w * this.sizex;
                    this.graph.height = this._h * this.sizey;
                } else {
                    if (this.mirrorx == true) {
                        this.graph.scale.x = -this.sizex;
                    } else {
                        this.graph.scale.x = this.sizex;
                    }
                    if (this.mirrory == true) {
                        this.graph.scale.y = -this.sizey;
                    } else {
                        this.graph.scale.y = this.sizey;
                    }
                }
            }
            this.graph.mask = this.clipRegion;
        }

        //3D layer..
        if (this.mesh != undefined) {
            this.mesh.visible = this.visible;
            this.mesh.position.set(this.x, this.y, this.z);
            if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                this.mesh.scale.x = this.sizex;
                this.mesh.scale.y = this.sizey;
                this.mesh.scale.z = this.sizez;
            } else {
                this.mesh.scale.x = this.size;
                this.mesh.scale.y = this.size;
                this.mesh.scale.z = this.size;
            }

            // physics 3d layer..
            if (this.physic) {
                this.mesh.quaternion.copy(this.body.quaternion);
                this.mesh.position.copy(this.body.position);
                this.angle = this.body.quaternion.z;
                this.anglex = this.body.quaternion.x;
                this.angley = this.body.quaternion.y;
                this.x = this.body.position.x;
                this.y = this.body.position.y;
                this.z = this.body.position.z;
            } else {
                this.mesh.rotation.set(radians(this.anglex), radians(this.angley), radians(this.angle));
            }

            if (this.model == false) {
                this.material.opacity = this.alpha;
            }
        }
    }
    //============================================================
    createSprite(img_) {
        this.model = false;
        let texture;
        if (img_ instanceof THREE.Texture) {
            texture = img_;
        } else {
            texture = new THREE.TextureLoader().load(img_);
        }
        //texture = new THREE.TextureLoader().load(img_);
        this.material = new THREE.SpriteMaterial({ map: texture, color: WHITE });
        this.mesh = new THREE.Sprite(this.material);
        this.mesh.id_ = this.id;
        this.mesh.renderOrder = 1;
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createBox(width, height, depth, wparts = 1, hparts = 1, dparts = 1) {
        this.model = false;
        this.geometry = new THREE.BoxGeometry(width, height, depth, wparts, hparts, dparts);
        if (this.material == undefined) {
            this.material = new THREE.MeshNormalMaterial();
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = this.visible;
        this.mesh.updateMatrix();
        this.mesh.id_ = this.id;
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createPlane(width_, depht_, wparts = 1, dparts = 1) {
        this.createBox(width_, 1, depht_, wparts, 1, dparts);
    }
    //------------------------------------------------------------
    //------------------------------------------------------------
    createSphere(radius, detail) {
        this.model = false;
        this.geometry = new THREE.SphereGeometry(radius, detail * 1.5, detail);
        if (this.material == undefined) {
            this.material = new THREE.MeshNormalMaterial();
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = this.visible;
        this.mesh.updateMatrix();
        this.mesh.id_ = this.id;
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createCylinder(r_top, r_bot, height, detail = 8, opened) {
        this.model = false;
        this.geometry = new THREE.CylinderGeometry(r_top, r_bot, height, detail, 1, opened);
        //this.material = new THREE.MeshNormalMaterial();
        if (this.material == undefined) {
            this.material = new THREE.MeshNormalMaterial();
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = this.visible;
        this.mesh.updateMatrix();
        this.mesh.id_ = this.id;
        this.mesh.name = "cylinder";    // este tiene nombre para saber que es u cilindro y alinear el quaternion en su draw.. three y cannon orientan diferente a los cylinder en Z..
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createTorus(radius, weight, detail) {
        this.model = false;
        this.geometry = new THREE.TorusGeometry(radius, weight, detail * 1.5, detail);
        //this.material = new THREE.MeshNormalMaterial();
        if (this.material == undefined) {
            this.material = new THREE.MeshNormalMaterial();
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = this.visible;
        this.mesh.updateMatrix();
        this.mesh.id = this.id;
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createIcosahedron(radius) {
        this.model = false;
        this.radius = radius;
        this.geometry = new THREE.IcosahedronGeometry(radius, 1);
        //this.material = new THREE.MeshNormalMaterial();
        if (this.material == undefined) {
            this.material = new THREE.MeshNormalMaterial();
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = this.visible;
        this.mesh.updateMatrix();
        this.mesh.id = this.id;
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createMaterial(shaderType, col, texture_repeat = false, repeat_divisions = 10) {
        switch (shaderType) {
            case BASIC:
                this.material = new THREE.MeshBasicMaterial();
                this.material.color.setHex(col);
                break;
            case LAMBERT:
                if (col == undefined) {
                    col = WHITE;
                }
                this.material = new THREE.MeshLambertMaterial();
                this.material.color.setHex(col);
                break;
            case WIRED:
                this.material = new THREE.MeshBasicMaterial();
                this.material.color.setHex(col);
                this.material.wireframe = true;
                break;
            case STANDARD:
                this.material = new THREE.MeshStandardMaterial();
                this.material.color.setHex(col);
                break;
            case TOON:
                this.material = new THREE.MeshToonMaterial();
                this.material.color.setHex(col);
                break;
            case PHONG:
                if (col == undefined) {
                    col = WHITE;
                }
                this.material = new THREE.MeshPhongMaterial();
                this.material.color.setHex(col);
                this.material.shininess = 100;
                this.material.transparent = true;   // para activar el alpha de los procesos en las primitivas 3d..
                break;
            case TEXTURED:
                let texture;
                if (col instanceof THREE.Texture) {
                    texture = col;
                } else {
                    texture = new THREE.TextureLoader().load(col);
                }
                if (texture_repeat == true) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(repeat_divisions, repeat_divisions);
                }
                this.material = new THREE.MeshPhongMaterial({
                    map: texture,
                    //specular: 0xffffff,
                    //shininess: 30,
                });
                this.material.transparent = true;
                break;
        }
        //this.material.transparent = true;   // para activar el alpha de los procesos en las primitivas 3d..
        return this.material;
    }
    //------------------------------------------------------------
    lookAt() {
        console.log("TO DO");
    }
    //------------------------------------------------------------
    worldToScreen() {
        var position = new THREE.Vector3();
        position.x = this.x;
        position.y = this.y;
        position.z = this.z;
        var vector = position.project(camera);
        vector.x = (vector.x + 1) / 2 * WIDTH;
        vector.y = -(vector.y - 1) / 2 * HEIGHT;
        return vector;
    }
    //============================================================
    //------------------------------------------------------------
    //============================================================
    destroyBody() {
        if (this.body) {
            this.physic = false;
            world.remove(this.body);
            this.body = undefined;
        }
    }
    //------------------------------------------------------------
    createBody(tipo, w = 1, h = 1, d = 1) {
        this.draw();    // update rotation position scale of mesh..
        this.physic = true;
        var width_;
        var height_;
        var depth_;
        var radius_;
        if (this.mesh == undefined) {
            console.log("ERROR: undefinned mesh!");
            return;
        }
        switch (tipo) {
            case TYPE_CYLINDER:
                let radiusTop;
                let radiusBottom;
                let height;
                const numSegments = 8;
                if (this.model) {
                    // not available..
                    console.log("ERROR: Cylinder body not available for 3d models!");
                    return;
                } else {
                    if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                        // not available..
                        console.log("ERROR: Cylinder not support separated axis scale transforms!");
                    } else {
                        radiusTop = this.mesh.geometry.parameters.radiusTop * this.size;
                        radiusBottom = this.mesh.geometry.parameters.radiusBottom * this.size;
                        height = this.mesh.geometry.parameters.height * this.size;
                    }
                }
                const cylinderShape = new CANNON.Cylinder(radiusTop, radiusBottom, height, numSegments);
                const mass_ = (Math.PI * radiusTop * radiusBottom * height) / 10000;
                this.body = new CANNON.Body({ mass: mass_, shape: cylinderShape });
                this.body.angularVelocity.set(0, 0, 0);
                this.body.force.set(0, 0, 0);
                this.body.angularDamping = 0.5;
                this.body.fixedRotation = false;
                //this.body.id_ = this.id;
                this.body.gameObject = this;

                this.body.quaternion.copy(this.mesh.quaternion);
                this.body.position.copy(this.mesh.position);

                if (this.mesh.name == "cylinder") {
                    var quat = new CANNON.Quaternion();
                    quat.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
                    var translation = new CANNON.Vec3(0, 0, 0);
                    this.body.shapes[0].transformAllPoints(translation, quat);
                }

                world.addBody(this.body);
                break;

            // BOX TYPE..
            case TYPE_BOX:
                if (this.model) {
                    if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                        width_ = w * this.sizex;
                        height_ = h * this.sizey;
                        depth_ = d * this.sizez;
                    } else {
                        width_ = w * this.size;
                        height_ = h * this.size;
                        depth_ = d * this.size;
                    }
                } else {
                    if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                        width_ = this.mesh.geometry.parameters.width * this.sizex;
                        height_ = this.mesh.geometry.parameters.height * this.sizey;
                        depth_ = this.mesh.geometry.parameters.depth * this.sizez;

                    } else {

                        width_ = this.mesh.geometry.parameters.width * this.size;
                        height_ = this.mesh.geometry.parameters.height * this.size;
                        depth_ = this.mesh.geometry.parameters.depth * this.size;
                    }
                }


                var shape = new CANNON.Box(new CANNON.Vec3(width_ / 2, height_ / 2, depth_ / 2));
                var masa = (width_ * height_ * depth_) / 10000;
                this.body = new CANNON.Body({
                    mass: masa
                });
                this.body.addShape(shape);
                this.body.angularVelocity.set(0, 0, 0);
                this.body.force.set(0, 0, 0);
                this.body.angularDamping = 0.5;
                this.body.fixedRotation = false;
                //this.body.id_ = this.id;
                this.body.gameObject = this;

                this.body.quaternion.copy(this.mesh.quaternion);
                this.body.position.copy(this.mesh.position);

                world.addBody(this.body);
                break;

            // SPHERE TYPE..
            case TYPE_SPHERE:
                if (this.model) {
                    this.radius = w;
                    if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                        radius_ = this.radius * this.size;
                        console.log("Warning!, only nor sizex, sizey allowed..");
                        if (radius_ === 0) {
                            console.log("Warning!, radius = 0.. createSphere() ??");
                            radius_ = 1;
                        }
                    } else {
                        radius_ = this.radius * this.size;
                        if (radius_ === 0) {
                            console.log("Warning!, radius = 0.. createSphere() ??");
                            radius_ = 1;
                        }
                    }

                } else {
                    if (this.radius === 0) {
                        this.radius = 1;
                    }
                    if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                        radius_ = this.radius * this.size;
                        console.log("Warning!, only nor sizex, sizey allowed..");
                        if (radius_ === 0) {
                            console.log("Warning!, radius = 0.. createSphere() ??");
                            radius_ = 1;
                        }
                    } else {
                        radius_ = this.radius * this.size;
                        if (radius_ === 0) {
                            console.log("Warning!, radius = 0.. createSphere() ??");
                            radius_ = 1;
                        }
                    }
                }

                var shape = new CANNON.Sphere(radius_);
                var masa = ((4 / 3) * Math.PI * radius_ * radius_ * radius_) / 10000;
                this.body = new CANNON.Body({
                    mass: masa
                });
                this.body.addShape(shape);
                this.body.angularVelocity.set(0, 0, 0);
                this.body.force.set(0, 0, 0);
                this.body.angularDamping = 0.5;
                this.body.fixedRotation = false;
                //this.body.id_ = this.id;
                this.body.gameObject = this;

                this.body.quaternion.copy(this.mesh.quaternion);
                this.body.position.copy(this.mesh.position);

                world.addBody(this.body);
                break;


            // PLANE TYPE..
            case TYPE_PLANE:
                if (this.model) {
                    console.log("ERROR: only primitives 3d are available to build plane collider!");
                    return;
                }

                if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                    width_ = this.mesh.geometry.parameters.width * this.sizex;
                    height_ = 1;
                    depth_ = this.mesh.geometry.parameters.depth * this.sizez;
                } else {
                    width_ = this.mesh.geometry.parameters.width * this.size;
                    height_ = 1;
                    depth_ = this.mesh.geometry.parameters.depth * this.size;
                }
                var shape = new CANNON.Box(new CANNON.Vec3(width_ / 2, height_, depth_ / 2));
                var masa = 0;
                this.body = new CANNON.Body({
                    mass: masa
                });
                this.body.addShape(shape);
                this.body.angularVelocity.set(0, 0, 0);
                this.body.force.set(0, 0, 0);
                this.body.angularDamping = 0.5;
                this.body.fixedRotation = false;
                //this.body.id_ = this.id;
                this.body.gameObject = this;

                this.body.quaternion.copy(this.mesh.quaternion);
                this.body.position.copy(this.mesh.position);

                world.addBody(this.body);
                break;
        }
    }
    //------------------------------------------------------------
    setEventCollisionStart(function_name) {

        this.body.isTrigger = true;
        this.body.addEventListener('collide', (event) => {
            window[function_name](event);
        });
    }
    setEventCollisionEnd(function_name) {
        this.body.isTrigger = true;
        this.body.addEventListener('endContact', (event) => {
            window[function_name](event);
        });
    }
    //------------------------------------------------------------
    setMass(mass) {
        if (this.body) {
            this.body.mass = mass;
        } else {
            console.log("ERROR: body = undeffined! not mass apply!");
        }
    }
    getMass() {
        if (this.body) {
            return this.body.mass;
        } else {
            console.log("ERROR: body = undeffined! not mass apply!");
        }
    }
    //------------------------------------------------------------
    addImpulse(imp_) {
        // Add an impulse to the center
        this.body.applyImpulse(imp_, this.body.position);
    }
    //---------------------------------------------------------
    addImpulseFromCamera(force, angle, camera) {
        if (this.body != undefined) {
            this.addVz(force * cos(radians(camera.lon + angle)));
            this.addVx(force * sin(radians(camera.lon + angle)));
        } else {
            console.log("WARNING: Attempt to apply impulse on a undefined physics body!");
        }
    }
    //---------------------------------------------------------
    setVelocityFromCamera(velocity, angle, camera) {
        if (this.body != undefined) {
            this.setVz(velocity * cos(radians(camera.lon + angle)));
            this.setVx(velocity * sin(radians(camera.lon + angle)));
        } else {
            // aqui hace como la funcion advance() pues no hay fisica en el proceso..
            this.z += velocity * cos(radians(camera.lon + angle));
            this.x += velocity * sin(radians(camera.lon + angle));
        }
    }
    //---------------------------------------------------------
    addVx(imp_x) {
        // Add an impulse to the center
        var impulse = new CANNON.Vec3(imp_x, 0, 0);
        this.body.applyImpulse(impulse, this.body.position);
    }
    //---------------------------------------------------------
    addVy(imp_y) {
        // Add an impulse to the center
        var impulse = new CANNON.Vec3(0, imp_y, 0);
        this.body.applyImpulse(impulse, this.body.position);
    }
    //---------------------------------------------------------
    addVz(imp_z) {
        // Add an impulse to the center
        var impulse = new CANNON.Vec3(0, 0, imp_z);
        this.body.applyImpulse(impulse, this.body.position);
    }
    //---------------------------------------------------------
    getVx() {
        return this.body.velocity.x;
    }
    //---------------------------------------------------------
    getVy() {
        return this.body.velocity.y;
    }
    //---------------------------------------------------------
    getVz() {
        return this.body.velocity.z;
    }
    //---------------------------------------------------------
    getVelocity() {
        return this.body.velocity;
    }
    //---------------------------------------------------------
    setVx(vel) {
        this.body.velocity.x = vel;
    }
    setVy(vel) {
        this.body.velocity.y = vel;
    }
    setVz(vel) {
        this.body.velocity.z = vel;
    }
    //---------------------------------------------------------
    brake(percent) {
        this.brakeX(percent);
        this.brakeY(percent);
        this.brakeZ(percent);
    }
    brakeX(percent) {
        // Add an inverted impulse to the center
        //var f = new CANNON.Vec3(-this.body.velocity.x * percent / 10, 0, 0);
        //this.body.applyImpulse(f, this.body.position);
        this.setVx(this.getVx() * percent);
    }
    brakeY(percent) {
        // Add an inverted impulse to the center
        //var f = new CANNON.Vec3(0, -this.body.velocity.y * percent / 10, 0);
        //this.body.applyImpulse(f, this.body.position);
        this.setVy(this.getVy() * percent);
    }
    brakeZ(percent) {
        // Add an inverted impulse to the center
        //var f = new CANNON.Vec3(0, 0, -this.body.velocity.z * percent / 10);
        //this.body.applyImpulse(f, this.body.position);
        this.setVz(this.getVz() * percent);
    }
    //---------------------------------------------------------
    translateX(delta) {
        if (this.body == undefined) {
            this.x += delta;
        } else {
            this.body.position.set(this.x + delta, this.y, this.z);
        }
    }
    translateY(delta) {
        if (this.body == undefined) {
            this.y += delta;
        } else {
            this.body.position.set(this.x, this.y + delta, this.z);
        }
    }
    translateZ(delta) {
        if (this.body == undefined) {
            this.z += delta;
        } else {
            this.body.position.set(this.x, this.y, this.z + delta);
        }
    }
    //---------------------------------------------------------
    locateX(pos) {
        if (this.body == undefined) {
            this.x = pos;
        } else {
            this.body.position.set(pos, this.y, this.z);
        }

    }
    locateY(pos) {
        if (this.body == undefined) {
            this.y = pos;
        } else {
            this.body.position.set(this.x, pos, this.z);
        }
    }
    locateZ(pos) {
        if (this.body == undefined) {
            this.z = pos;
        } else {
            this.body.position.set(this.x, this.y, pos);
        }
    }
    //---------------------------------------------------------
    rotateX(ang) {
        if (this.body == undefined) {
            this.mesh.rotateX(radians(ang));
        } else {
            this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), radians(ang));
        }
    }
    rotateY(ang) {
        if (this.body == undefined) {
            this.mesh.rotateY(radians(ang));
        } else {
            this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), radians(ang));
        }
    }
    rotateZ(ang) {
        if (this.body == undefined) {
            this.mesh.rotateZ(radians(ang));
        } else {
            this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), radians(ang));
        }
    }
    //---------------------------------------------------------
    setStatic(static_) {
        //this.body.STATIC = true;
        if (static_ === true) {
            this.oldMass = this.body.mass;
            this.body.mass = 0;
            this.body.updateMassProperties();
            this.body.velocity.set(0, 0, 0);
            this.body.angularVelocity.set(0, 0, 0);
        } else {
            this.body.mass = this.oldMass;
            this.body.updateMassProperties();
        }
    }
    //---------------------------------------------------------
    setFixedRotation(fix) {
        this.body.fixedRotation = fix;
        this.body.updateMassProperties();
    }
    //---------------------------------------------------------
    addGroundControl(id = this) {
        if (id !== undefined) {
            _3div_requestIsGrounded.push(id.body);
        } else {
            _3div_requestIsGrounded.push(this.body);
        }
    }
    //---------------------------------------------------------
    removeGroundControl(id) {
        if (id !== undefined) {
            for (var i = 0; i < _3div_requestIsGrounded.length; i++) {
                if (_3div_requestIsGrounded[i] === id.body) {
                    _3div_requestIsGrounded.splice(i, 1);
                }
            }
        } else {
            for (var i = 0; i < _3div_requestIsGrounded.length; i++) {
                if (_3div_requestIsGrounded[i] === this.body) {
                    _3div_requestIsGrounded.splice(i, 1);
                }
            }
        }
    }
    //---------------------------------------------------------
    isOnGround() {
        if (this.body.isOnGround !== undefined) {
            return this.body.isOnGround;
        } else {
            return false;
        }
    }
    //---------------------------------------------------------
    setDamping(damping) {
        if (this.body == undefined) return;
        this.body.damping = damping;
    }
    //---------------------------------------------------------
    setAngularDamping(damping) {
        this.body.angularDamping = damping;
    }
    //---------------------------------------------------------
    setRotation(rot) {
        var axis = new CANNON.Vec3(0, 0, 1);
        var angle = radians(rot);
        this.body.quaternion.setFromAxisAngle(axis, angle);
    }
    //---------------------------------------------------------
    setRotationX(rot) {
        var axis = new CANNON.Vec3(1, 0, 0);
        var angle = radians(rot);
        this.body.quaternion.setFromAxisAngle(axis, angle);
    }
    //---------------------------------------------------------
    setRotationY(rot) {
        var axis = new CANNON.Vec3(0, 1, 0);
        var angle = radians(rot);
        this.body.quaternion.setFromAxisAngle(axis, angle);
    }
    //------------------------------------------------------------
    setTexture(texture) {
        if (this.mesh == undefined) return;
        this.mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                if (child.material.map != undefined) {
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                }
            }
        });
    }
    //------------------------------------------------------------
    setModel(model) {
        if (this.mesh != undefined) {
            if (this.model) {
                removeObject3D(this.mesh);
            } else {
                this.mesh.geometry.dispose();
                this.mesh.material.dispose();
            }
            scene.remove(this.mesh);
        }
        this.model = true;
        this.mesh = model.clone();
        this.mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone();
            }
        });
        this.mesh.updateMatrix();
        this.mesh.id_ = this.id;
        this.draw();                // translate/scale/rotate before add to world..
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    enableShadows(enableShadows = true) {
        // only PointLight, DirectionalLight or SpotLight support shadows..
        // remember set your in light:  .castShadow = true;
        if (three_renderer_use_shadows == false) {
            enableShadows = false;
        }
        if (this.mesh != undefined) {
            if (this.model) {
                this.mesh.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
            } else {
                this.mesh.castShadow = enableShadows;
                this.mesh.receiveShadow = enableShadows;
            }
        }
    }
    //------------------------------------------------------------
    //============================================================
    setCenter(cx, cy) {
        this._cx = cx;
        this._cy = cy;
        if (this.mesh != undefined) {
            this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(x, y, z));
        }
    }
    setGraph(texture) {
        if (this.graph !== undefined) {
            this.graph.texture = texture;
        } else {
            this.graph = new PIXI.Sprite(texture);
            this.draw();
            app.stage.addChild(this.graph);
        }

    }

    newGraph(w, h) {
        if (this.graph !== undefined) {
            app.stage.removeChild(this.graph);
        }

        this.graph = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.graph.width = w;
        this.graph.height = h;
        this.draw();
        app.stage.addChild(this.graph);
        this.newgraph_created = true;
        this._w = w;
        this._h = h;
    }
    clearGraph() {
        if (this.graph !== undefined) {
            app.stage.removeChild(this.graph);
        }
        this.newgraph_created = false;
        this._w = 0;
        this._h = 0;
    }
    tint(color) {
        //this.graph.tint = Math.random() * 0xFFFFFF;
        if (this.graph != undefined) {
            this.graph.tint = color;
        }
        if (this.material != undefined) {
            if (this.material.hasOwnProperty("color")) {
                this.material.color.setHex(color);
            } else {
                console.warn(".tint() -> this.material not contains a color property!");
            }
        } else {
            if (this.model) {
                //this.mesh.material.color.setHex(color);
                //this.mesh.children[0].material.color.setHex(color);
                console.log("gsdfgsdf");
            }
        }
    }

    noTint() {
        //this.graph.tint = 0xffffff;
        if (this.graph != undefined) {
            this.graph.tint = 0xffffff;
        }
        if (this.material != undefined) {
            if (this.material.hasOwnProperty("color")) {
                this.material.color.setHex(0xffffff);
            } else {
                console.warn(".tint() -> this.material not contains a color property!");
            }
        } else {
            if (this.model) {
                this.mesh.children[0].material.color.setHex(0xffffff);
            }
        }
    }

    getRealPoint(x_, y_) {
        // ancho y alto real..
        let w = 0;
        let h = 0;
        if (this.sizex != 1 || this.sizey != 1) {
            w = this.graph.texture.baseTexture.width * this.sizex;
            h = this.graph.texture.baseTexture.height * this.sizey;
        } else {
            w = this.graph.texture.baseTexture.width * this.size;
            h = this.graph.texture.baseTexture.height * this.size;
        }

        // punto de origin del grafico..
        let ox = this.x - w / 2;
        let oy = this.y - h / 2;
        // coordenadas reales del punto para angulo cero..
        let px = 0;
        let py = 0;
        if (this.sizex != 1 || this.sizey != 1) {
            px = ox + x_ * this.sizex;
            py = oy + y_ * this.sizey;
        } else {
            px = ox + x_ * this.size;
            py = oy + y_ * this.size;
        }

        // distancia y angulo del punto..
        let dx = this.x - px;
        let dy = this.y - py;
        let mod = Math.sqrt(dx * dx + dy * dy);
        let ang = -degrees(Math.atan2(py - this.y, px - this.x)) + this.angle;
        let x = this.x + mod * Math.cos(radians(ang));
        let y = this.y - mod * Math.sin(radians(ang));
        return { x, y };
    }
    //=======================================================
    touched() {
        if (!this.graph) return false;
        if (this.newgraph_created === true) {
            var width = this._w;
            var height = this._h;
        } else {
            var width = this.graph.texture.baseTexture.width;
            var height = this.graph.texture.baseTexture.height;
        }
        if (this._scene != undefined) {
            var xmin = this.sx - (width / 2) * this.size;
            var xmax = this.sx + (width / 2) * this.size;
            var ymin = this.sy - (height / 2) * this.size;
            var ymax = this.sy + (height / 2) * this.size;
        } else {
            var xmin = this.x - (width / 2) * this.size;
            var xmax = this.x + (width / 2) * this.size;
            var ymin = this.y - (height / 2) * this.size;
            var ymax = this.y + (height / 2) * this.size;
        }

        for (var i = 0; i < mouse.points.length; i++) {
            if (mouse.points[i].active === true) {
                var x = mouse.points[i].x;
                var y = mouse.points[i].y;
                if (x > xmin && x < xmax && y > ymin && y < ymax) {
                    this.touch_id = i;
                    return true;
                }
            }
        }
        return false;
    }
    getTouch() {
        return { x: mouse.points[this.touch_id].x, y: mouse.points[this.touch_id].y };
    }
    touchPersists() {
        return mouse.points[this.touch_id].active;
    }
    //=======================================================
    advance(dist, angle) {
        //dist = -dist;
        if (arguments.length == 1) {

            if (this.body != undefined) {
                this.x = this.x + dist * Math.cos(radians(this.angle));
                this.y = this.y - dist * Math.sin(radians(this.angle));
                //Matter.Body.setPosition(this.body, { x: this.x, y: this.y });
            } else {
                this.x = this.x + dist * Math.cos(radians(this.angle));
                this.y = this.y - dist * Math.sin(radians(this.angle));
            }

        } else if (arguments.length == 2) {
            if (this.body != undefined) {
                this.x = this.x + dist * Math.cos(radians(angle));
                this.y = this.y - dist * Math.sin(radians(angle));
                //Matter.Body.setPosition(this.body, { x: this.x, y: this.y });
            } else {
                this.x = this.x + dist * Math.cos(radians(angle));
                this.y = this.y - dist * Math.sin(radians(angle));
            }
        }
    }
    getDist(p1, p2) {
        if (arguments.length == 1) {
            var dx = this.x - p1.x;
            var dy = this.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        } else if (arguments.length == 2) {
            var dx = this.x - p1;
            var dy = this.y - p2;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
    getAngle(p1, p2, x2, y2) {
        if (arguments.length == 1) {
            return -degrees(Math.atan2(p1.y - this.y, p1.x - this.x));
        } else if (arguments.length == 2) {
            return -degrees(Math.atan2(p2 - this.y, p1 - this.x));
        } else if (arguments.length == 4) {
            return -degrees(Math.atan2(y2 - p2, x2 - p1));
        }
    }
    //=======================================================
    setType = function (type) {
        this.type = type;
    }
    //-------------------------------------------------------
    getType(type) {
        return this.type;
    }
    //=======================================================
    //-------------------------------------------------------
    clip(x, y, width, height) {
        // let's create a shape..
        this.clipRegion = new PIXI.Graphics();
        app.stage.addChild(this.clipRegion);
        this.clipRegion.x = 0;
        this.clipRegion.y = 0;
        this.clipRegion.lineStyle(0);
        this.clipRegion.beginFill(0x8bc5ff, 1);
        this.clipRegion.drawRect(x, y, width, height);
        this.graph.mask = this.clipRegion;
    }
    //-------------------------------------------------------
    noClip() {
        this.graph.mask = null;
        if (this.clipRegion != undefined) {
            app.stage.removeChild(this.clipRegion);
        }
    }
    //-------------------------------------------------------
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
function exists(proc) {
    if (proc === undefined || proc === null) {
        return false;
    }
    if (proc.live) {
        return true;
    } else {
        return false;
    }
}
//----------------------------------------------------------------------------------
function getGameObjectById(id) {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].id == id) {
            return gameObjects[i];
        }
    }
    return undefined;
}
//----------------------------------------------------------------------------------
function signal(id, sig) {
    if (!exists(id)) {
        return;
    }
    switch (sig) {
        case s_kill:
            if (!id.killProtection) {
                id.live = false;
            }
            break;
        case s_protected:
            id.killProtection = true;
            break;
        case s_unprotected:
            id.killProtection = false;
            break;
    }
}
//----------------------------------------------------------------------------------
function signalType(type, sig) {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].type == type) {
            signal(gameObjects[i], sig);
        }
    }
}
//----------------------------------------------------------------------------------
function letMeAlone() {
    for (var i = 0; i < gameObjects.length; i++) {
        if (!gameObjects[i].killProtection) {
            if (gameObjects[i] != _id_) {
                gameObjects[i].live = false;
            }
        }
    }
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
class LoadImages extends GameObject {

    constructor(path_, numFiles) {
        super();
        this.path = path_;
        this.numFiles = numFiles;
        this.st = 0;
        this.pos = 0;
        this.numfiles;
        this.ext = ".png";
        this.name = "";
        this.nameCode = "";
        this.ready = false;
        this.loader;
        this.img = [];
    }
    initialize() {

    }
    frame() {
        switch (this.st) {
            case 0:
                if (this.pos <= this.numFiles) {
                    if (this.pos < 10) {
                        this.name = "00" + str(this.pos) + this.ext;
                        this.nameCode = "00" + str(this.pos);
                    } else if (this.pos < 100) {
                        this.name = "0" + str(this.pos) + this.ext;
                        this.nameCode = "0" + str(this.pos);
                    } else {
                        this.name = str(this.pos) + this.ext;
                        this.nameCode = str(this.pos);
                    }
                    this.img[this.pos] = PIXI.Texture.from(this.path + this.name, { scaleMode: PIXI.settings.SCALE_MODE });
                    this.pos++;
                } else {
                    var completed = true;
                    for (let i = 0; i < this.numFiles; i++) {
                        if (this.img[i] === undefined) {
                            completed = false;
                        } else {

                        }
                    }

                    if (completed) {
                        this.ready = true;
                        this.st = 100;
                    }
                }
                break;
            case 10:

                break;
            case 100:

                break;
        }
    }
    get() {
        return this.img;
    }
}
//----------------------------------------------------------------------------------
class LoadSounds extends GameObject {
    constructor(path, num) {
        super();
        this.st = 0;
        this.path = path;
        this.dat = [];
        this.numFiles = num;
        this.pos = 0;
        this.name = "";
        this.ext = ".mp3";
        this.ready = false;
        this.progress = 0.0;    // percent progress of load files..
        this.delta = 0;         // percent up per file..
    }
    initialize() {
        this.delta = 100 / (this.numFiles);
    }
    frame() {
        switch (this.st) {
            case 0:
                if (this.pos <= this.numFiles) {
                    if (this.pos < 10) {
                        this.name = "00" + str(this.pos);
                    } else if (this.pos < 100) {
                        this.name = "0" + str(this.pos);
                    } else {
                        this.name = str(this.pos);
                    }
                    this.dat[this.pos] = new WaudSound(this.path + this.name + this.ext, { autoplay: false, loop: false, volume: 0.5 });
                    this.pos++;
                } else {
                    // check if load all files completed..
                    var completed = true;
                    let totalFiles = Number(this.numFiles);     // sin Number() no funciona el for.. puto JS..
                    for (var i = 0; i <= totalFiles; i++) {

                        if (this.dat[i] !== undefined) {
                            if (!this.dat[i].isReady()) {
                                completed = false;
                            }
                        } else {
                            completed = false;
                        }

                    }
                    if (completed === true) {
                        this.ready = true;
                        this.st = 10;
                        //console.log("Audio files loaded!");
                    }
                }
                break;
            case 10:

                break;
        }
    }
    get() {
        return this.dat;
    }
}
//----------------------------------------------------------------------------------
function loadTexture(filename) {
    return new THREE.TextureLoader().load(filename);
}
//----------------------------------------------------------------------------------
class SoundPlayTimed extends GameObject {
    constructor(snd, millis) {
        super();
        this.startTime = Date.now();
        this.millis = millis;
        this.snd = snd;
    }

    frame() {
        if (Date.now() - this.startTime > this.millis) {
            let volume = this.snd.getVolume();
            this.snd.setVolume(volume * glz_sound_master_volume);
            this.snd.play();
            signal(this, s_kill);
        }
    }
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
function initTouch() {
    var el = document.getElementById("myCanvas2d");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchmove", handleMove, false);
    /*
    el.addEventListener('touchmove', function (event) {
        if (event.scale !== 1) { event.preventDefault(); }
    }, false);
    */
    el.addEventListener("mousedown", handleMouseDown, false);
    el.addEventListener("mouseup", handleMouseUp, false);
    el.addEventListener("mousemove", handleMouseMove, false);
    el.addEventListener("wheel", handleMouseWheel, false);

}
//----------------------------------------------------------------------------------
function handleMouseWheel(event) {
    event.preventDefault();
    if (event.deltaY < 0) {
        mouse.wheelUp = true;
        mouse.wheelDown = false;
    } else if (event.deltaY > 0) {
        mouse.wheelUp = false;
        mouse.wheelDown = true;
    }
}
//----------------------------------------------------------------------------------
function handleMouseDown(event) {
    event.preventDefault();
    switch (event.which) {
        case 1:
            mouse.left = true;
            mouse.setPoint(10, true, event.clientX, event.clientY);
            break;
        case 2:
            mouse.middle = true;
            mouse.setPoint(11, true, event.clientX, event.clientY);
            break;
        case 3:
            mouse.right = true;
            mouse.setPoint(12, true, event.clientX, event.clientY);
            break;

    }
    mouse.canvas_x = event.clientX;
    mouse.canvas_y = event.clientY;
}
//----------------------------------------------------------------------------------
function handleMouseUp(event) {
    event.preventDefault();
    switch (event.which) {
        case 1:
            mouse.left = false;
            mouse.setPoint(10, false, event.clientX, event.clientY);
            break;
        case 2:
            mouse.middle = false;
            mouse.setPoint(11, false, event.clientX, event.clientY);
            break;
        case 3:
            mouse.right = false;
            mouse.setPoint(12, false, event.clientX, event.clientY);
            break;

    }
    mouse.canvas_x = event.clientX;
    mouse.canvas_y = event.clientY;
}
//----------------------------------------------------------------------------------
function handleMouseMove(event) {
    event.preventDefault();
    mouse.canvas_x = event.clientX;
    mouse.canvas_y = event.clientY;
    mouse.updateMousePointsPosition(event.clientX, event.clientY);
}
//----------------------------------------------------------------------------------
function handleStart(event) {
    event.preventDefault();

    mouse.left = true;
    mouse.canvas_x = event.touches[0].clientX;
    mouse.canvas_y = event.touches[0].clientY;
    mouse.touches = event.touches;
    for (var i = 0; i < event.changedTouches.length; i++) {
        mouse.setPoint(event.changedTouches[i].identifier, true, event.changedTouches[i].clientX, event.changedTouches[i].clientY);
    }
}
//----------------------------------------------------------------------------------
function handleEnd(event) {
    event.preventDefault();
    requestFullScreen();
    mouse.left = false;
    mouse.touches = event.touches;
    for (var i = 0; i < event.changedTouches.length; i++) {
        mouse.setPoint(event.changedTouches[i].identifier, false, 0, 0);
    }
}
//----------------------------------------------------------------------------------
function handleMove(event) {
    event.preventDefault();
    mouse.canvas_x = event.touches[0].clientX;
    mouse.canvas_y = event.touches[0].clientY;
    mouse.touches = event.touches;
    for (var i = 0; i < event.changedTouches.length; i++) {
        mouse.setPoint(event.changedTouches[i].identifier, true, event.changedTouches[i].clientX, event.changedTouches[i].clientY);
    }

}
//----------------------------------------------------------------------------------
class Mouse extends GameObject {
    constructor() {
        super();
        this.canvas_x = 0;
        this.canvas_y = 0;
        this.x = 0;
        this.y = 0;
        this.left = false;
        this.right = false;
        this.middle = false;
        this.touch = false;
        this.oldX = 0;
        this.oldY = 0;
        this.wheelUp = false;
        this.wheelDown = false;
        this.wheel = 0;
        //this.pos = new THREE.Vector3(0,0,0.996);
        this.touches = [];
        this.moved;
        this.points = [];
        // points es un array de puntos de mouse en pantalla..
        // unifica el mouse y el touch screen..
        // los 10 primeros son punteros del touchscreen..
        // a partir de 10 son mouse.left .midle y .right..
        for (var i = 0; i < 13; i++) {
            this.points.push({ active: false, x: 0, y: 0 });
        }
        this.raycaster = new THREE.Raycaster();
        this.intersects = [];
        this.position = new THREE.Vector2();
    }
    initialize() {
    }
    frame() {
        if (this.oldX === this.x && this.oldY === this.y) {
            this.moved = false;
        } else {
            this.moved = true;
        }
        if (this.left || this.right) {
            this.touch = true;
        } else {
            this.touch = false;
        }
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = (this.canvas_x * WIDTH) / window.innerWidth;
        this.y = (this.canvas_y * HEIGHT) / window.innerHeight;

        // raycast with mouse from camera..
        this.position.x = (mouse.x / WIDTH) * 2 - 1;
        this.position.y = - (mouse.y / HEIGHT) * 2 + 1;
        this.raycaster.setFromCamera(this.position, camera);
        this.intersects = this.raycaster.intersectObjects(scene.children, true);
    }
    setPoint(index, active, x_, y_) {
        var finalx = (x_ * WIDTH) / window.innerWidth;
        var finaly = (y_ * HEIGHT) / window.innerHeight;
        this.points[index].active = active;
        this.points[index].x = finalx;
        this.points[index].y = finaly;
    }
    updateMousePointsPosition(x_, y_) {
        var finalx = (x_ * WIDTH) / window.innerWidth;
        var finaly = (y_ * HEIGHT) / window.innerHeight;
        this.points[10].x = finalx;
        this.points[10].y = finaly;
        this.points[11].x = finalx;
        this.points[11].y = finaly;
        this.points[12].x = finalx;
        this.points[12].y = finaly;
    }
    touchInArea(x, y, width, heigth) {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].active) {
                if (this.points[i].x > x && this.points[i].y > y && this.points[i].x < width && this.points[i].y < heigth) {
                    return true;
                }
            }
        }
        return false;
    }
    intersect(obj) {
        if (obj.mesh != undefined) {
            for (let i = 0; i < this.intersects.length; i++) {
                if (obj.model) {
                    if (this.intersects[i].object.parent.id_ == obj.id) {
                        return true;
                    }
                } else {
                    if (this.intersects[i].object.id_ == obj.id) {
                        return true;
                    }
                }

            }
            return false;
        }
        return false;
    }
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function socketOpen(server, port) {
    // Crea el socket..
    _glz_socket = new WebSocket(server + ':' + port);
    _glz_socket.status = 0;
    _glz_socket.showStatusMessagesOnEvents = true;
    _glz_socket.showEventInfo = (flag) => {
        _glz_socket.showStatusMessagesOnEvents = flag;
    };
    _glz_socket.ready = () => {
        if (_glz_socket.status == SOCKET_CONNECTED) {
            return true;
        } else {
            return false;
        }
    };
    _glz_socket.close = () => {
        if (_glz_socket.status == SOCKET_CLOSED) {
            return true;
        } else {
            return false;
        }
    };
    _glz_socket.error = () => {
        if (_glz_socket.status == SOCKET_ERROR) {
            return true;
        } else {
            return false;
        }
    };
    // Abre la conexión
    _glz_socket.addEventListener('open', function (event) {
        //_glz_socket.send("Hello World!");
        _glz_socket.status = SOCKET_CONNECTED;
        if (_glz_socket.showStatusMessagesOnEvents == true) {
            console.log("WebSocket conected to: ", event.target.url);
        }
    });

    _glz_socket.addEventListener('message', function (event) {
        //console.log(event);
        onNetEvent(event.data.split(NET_TOK_DATA));
    });

    _glz_socket.addEventListener('error', function (event) {
        _glz_socket.status = SOCKET_ERROR;
        if (_glz_socket.showStatusMessagesOnEvents == true) {
            console.log("WebSocket lost connecton.");
        }
    });

    _glz_socket.addEventListener('close', function (event) {
        _glz_socket.status = SOCKET_CLOSED;
        if (_glz_socket.showStatusMessagesOnEvents == true) {
            console.log("WebSocket connection clossed.");
        }
    });
    return _glz_socket;
}
//---------------------------------------------------------------------------------
function socketStatus() {
    if (_glz_socket == null) {
        return SOCKET_NULL;
    } else {
        return _glz_socket.status;
    }
}
//---------------------------------------------------------------------------------
function socketClose() {
    if (_glz_socket) {
        _glz_socket.close();
    }

}
//---------------------------------------------------------------------------------
/*
function onNetEvent(msg){
    console.log("WebSocket data RCV:", msg);
}
*/
//---------------------------------------------------------------------------------
function NetMessage(netWsocket = _glz_socket) {
    this.NET_TOK_DATA = '~';    // delimitier for datagram tokens..
    this.buffer = '';
    this.add = function (token) {
        if (this.buffer === '') {
            this.buffer += token;
        } else {
            this.buffer += this.NET_TOK_DATA + token;
        }
    }
    this.send = function () {
        netWsocket.send(this.buffer);
    }
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
document.onkeydown = function (e) {
    keys[e.keyCode] = true;
    if (e.keyCode === 8) {
        keyboard_buffer = keyboard_buffer.slice(0, -1);
    } else {
        if (e.keyCode === 16 ||
            e.keyCode === 222 ||
            e.keyCode === 13 ||
            e.keyCode === 20 ||
            e.keyCode === 18 ||
            e.keyCode === 17 ||
            e.keyCode === 9) {    	// shift dieresis enter mayusculas AltGr control tab..

        } else if (e.keyCode === 46) {   // tecla delete..
            keyboard_buffer = "";
        } else {
            keyboard_buffer += e.key;
        }
    }
};
document.onkeyup = function (e) {
    keys[e.keyCode] = false;
};
function key(keyCode) {
    return keys[keyCode];
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
function textInfo(fnt, size, text) {
    if (fnt == null) {
        fnt = 'Arial';
    }
    const style = new PIXI.TextStyle({
        fontFamily: fnt,
        fontSize: size,
        fill: 0xff1010,
        align: 'center',
    });
    return PIXI.TextMetrics.measureText(text, style);
}
//----------------------------------------------------------------------------------
class Write extends GameObject {
    constructor(font, size, text, align, x, y, color, alpha) {
        super();
        if (font == null) {
            font = 'Arial';
        }
        this.font = font;
        this.textSize = size + 'px';
        this.size = size;
        this.text = text;
        this.align = align;
        this.x = x;
        this.y = y;
        this.color = color;
        this.alpha = alpha;

        if (exists(this.father)) {
            this.z = this.father.z + 1;
        }

        this.style = undefined;
        this.idText = new PIXI.Text(text);
        //this.idText.style.font = this.font;
        this.idText.style.fontSize = this.textSize;
        this.idText.texture.baseTexture.scaleMode = PIXI.settings.SCALE_MODE;

        app.stage.addChild(this.idText);
    }
    initialize() {
        if (this.style === undefined) {

        }
    }
    frame() {
        this.idText.x = this.x;
        this.idText.y = this.y;
        this.idText.zIndex = this.z;
        this.idText.alpha = this.alpha;
        this.idText.text = this.text;
        this.textSize = this.size + 'px';
        this.idText.anchor.x = this._cx;
        this.idText.anchor.y = this._cy;
        this.idText.rotation = -radians(this.angle);

        if (this.style === undefined) {
            this.idText.style.fill = this.color;
            this.idText.style.fontSize = this.textSize;
            switch (this.align) {
                case LEFT:
                    this._cx = 1;
                    this.idText.anchor.y = this._cy;
                    break;
                case RIGHT:
                    this._cx = 0;
                    this._cy = 0.5;
                    break;
                case CENTER:
                    this._cx = 0.5;
                    this._cy = 0.5;
                    break;
            }
        }
    }
    finalize() {
        app.stage.removeChild(this.idText);
    }
    setStyle(style) {
        this.style = style;
        this.idText.style = this.style;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setText(text) {
        this.text = text;
    }
    setColor(color) {
        this.color = color;
    }
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
/*
// EXAMPLE TEXT STYLE..
const myStyle00 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});
*/
// ANOTHER TEXT STYLE EXAMPLE..
const myStyle01 = { font: 'bold italic 36px Arial' };
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
class Scroll extends GameObject {
    constructor(texture, width, height) {
        super();
        this.texture = texture;
        this.width = width;
        this.height = height;
        this.tiling = { x: 1, y: 1 };
        this.offset = { x: 0, y: 0 };
    }
    initialize() {
        this.graph = new PIXI.TilingSprite(this.texture, this.width, this.height);
        app.stage.addChild(this.graph);
    }
    frame() {
        this.graph.tileScale.x = this.tiling.x;
        this.graph.tileScale.y = this.tiling.y;
        this.graph.tilePosition.x = -this.offset.x;
        this.graph.tilePosition.y = -this.offset.y;
        this.graph.zIndex = this.z;
    }
    autoScale() {
        this.tiling.x = WIDTH / this.texture.width;
        this.tiling.y = HEIGHT / this.texture.height;
    }
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
function soundPlay(snd, loop) {
    let volume = snd.getVolume();
    snd.setVolume(volume * glz_sound_master_volume);
    snd.play();
    snd.loop(loop);
    return snd;
}
function soundStop(snd_, soundsArray = snd) {
    if (snd_ == all_sound) {
        for (let i = 0; i < soundsArray.length; i++) {
            soundsArray[i].stop();
        }
    } else {
        snd_.stop();
    }
}
//----------------------------------------------------------------------------------
function soundSetVolume(snd, value) {
    snd.setVolume(value);
}
//----------------------------------------------------------------------------------
function soundIsPlaying(snd) {
    return snd._snd._isPlaying;
}
//----------------------------------------------------------------------------------
function soundFade(snd, time_ms) {
    return new SoundFade(snd, time_ms);
}
class SoundFade extends GameObject {
    constructor(snd, time_ms) {
        super();
        this.eventName = "NULL_event";
        this.snd = snd;
        this.time_ms = time_ms;
    }
    initialize() {
        this.frameTime = 1000 / fps;
        this.volume = this.snd.getVolume();
        this.frames = this.time_ms / this.frameTime;
        this.delta = this.volume / this.frames;
    }
    frame() {
        this.snd.setVolume(this.volume - this.delta);
        this.volume = this.snd.getVolume();
        if (this.volume <= 0) {
            this.snd.stop();
            this.snd.setVolume(0.5);
            if (this.eventName != "NULL_event") {
                method(this.eventName);
            }
            signal(this, s_kill);
        }
    }
    setEvent(eventName) {
        this.eventName = eventName;
    }
    finalize() {
        this.snd.stop();
        this.snd.setVolume(0.5);
    }
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
function millis() {
    return performance.now();
}

class StringList {
    constructor(array = []) {
        this.data = [];
        for (let i = 0; i < array.length; i++) {
            this.data.push(array[i]);
        }
    }
    append(dato) {
        this.data.push(dato);
    }
    add(dato) {
        this.data.push(dato);
    }
    unshift(dato) {
        this.data.unshift(dato);
    }
    get(index) {
        return this.data[index];
    }
    set(pos, dato) {
        this.data[pos] = dato;
    }
    size() {
        return this.data.length;
    }
    shuffle() {
        var shuffledArray = this.data.sort((a, b) => 0.5 - Math.random());
        this.data = shuffledArray;
    }
    clear() {
        this.data = [];
    }
    reverse() {
        this.data.reverse();
    }
}
function NULL_event() {
    console.warn("WARNING: This widget has not configured event!");
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
let lockUi = false;
function lockEGUI() {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].type === "EGUI_ELEMENT") {
            gameObjects[i].locked = true;
        }
    }
}
function unlockEGUI() {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].type === "EGUI_ELEMENT") {
            gameObjects[i].locked = false;
        }
    }
}

class EGUIbutton extends GameObject {
    constructor(fnt, size, label, x, y, color) {
        super();
        this.st = 0;
        if (fnt == null) {
            this.fnt = 'Arial';
        } else {
            this.fnt = fnt;
        }
        this.label = label;
        this.x = x;
        this.y = y;
        this.textSize = size;
        this.textColor = color;
        this.gr;
        this.idText;
        this.tint1 = 0x1b26ed;
        this.tint2 = 0xff00ff;
        this.eventName = "NULL_event";
        this.locked = false;
        this.type = "EGUI_ELEMENT";
        this.graphics = undefined;
        this.z = 2048;
        this.w = undefined;
        this.h = undefined;
    }
    setArea(w, h) {
        this.w = w;
        this.h = h;
        this.st = 0;
    }
    frame() {

        switch (this.st) {
            case 0:

                if (this.graph !== undefined) {
                    app.stage.removeChild(this.graph);
                    this.graph = undefined;
                }
                this.graph = new PIXI.Sprite(PIXI.Texture.WHITE);
                if (this.w != undefined) {
                    this.graph.width = this.w;
                    this.graph.height = this.h;
                } else {
                    let textInfo_ = textInfo("Arial", this.textSize, this.label);
                    this.graph.width = textInfo_.width + 10;
                    this.graph.height = textInfo_.height + 10;
                }
                if(this.graphics != undefined)app.stage.removeChild(this.graphics);
                this.graphics = undefined;
                this.graphics = new PIXI.Graphics();
                this.graphics.beginFill(0x000000);
                this.graphics.drawRect(0, 0, this.graph.width + 2, this.graph.height + 2);
                this.graphics.zIndex = this.z - 1;
                this.graphics.x = this.x - this.graph.width / 2;
                this.graphics.y = this.y - this.graph.height / 2;
                app.stage.addChild(this.graphics);

                this.draw();
                app.stage.addChild(this.graph);
                this.idText = new Write(this.fnt, this.textSize, this.label, CENTER, this.x, this.y, this.textColor, 255);
                this.tint(this.tint1);
                this.st = 10;
                break;
            case 10:
                if (this.touched() && !this.locked && !lockUi) {
                    lockUi = true;
                    this.tint(this.tint2);
                    this.st = 20;
                }
                break;
            case 20:
                if (!this.touchPersists()) {
                    lockUi = false;
                    method(this.eventName);
                    this.tint(this.tint1);
                    this.st = 10;
                }
                break;
        }
    }
    setColors(colorA, colorB) {
        this.tint1 = colorA;
        this.tint2 = colorB;
    }
    touched() {
        var width = this.graph.width;
        var height = this.graph.height;
        var xmin = this.x - (width / 2);
        var xmax = this.x + (width / 2);
        var ymin = this.y - (height / 2);
        var ymax = this.y + (height / 2);
        for (var i = 0; i < mouse.points.length; i++) {
            if (mouse.points[i].active === true) {
                var x = mouse.points[i].x;
                var y = mouse.points[i].y;
                if (x > xmin && x < xmax && y > ymin && y < ymax) {
                    this.touch_id = i;
                    return true;
                }
            }
        }
        return false;
    }
    draw() {
        this.oldx = this.x;
        this.oldy = this.y;

        if (this.graph != undefined) {
            this.graph.x = this.x;
            this.graph.y = this.y;
            this.graph.zIndex = this.z;
            this.graph.anchor.x = this._cx;
            this.graph.anchor.y = this._cy;
            this.graph.alpha = this.alpha;
            this.graph.rotation = -radians(this.angle);
        }
    }

    setEvent(eventName) {
        this.eventName = eventName;
    }
    setLabel(str) {
        this.label = str;
        this.idText.text = this.label;
    }
    buttonOver() {
        console.log("...");
    }
    finalize() {
        signal(this.idText, s_kill);
        app.stage.removeChild(this.graphics);
    }
}

class EGUIgbutton extends GameObject {
    constructor(gr, x, y, size) {
        super();
        this.st = 0;
        this.x = x;
        this.y = y;
        this.size = size;
        this.only1gr = false;
        if (Array.isArray(gr) == true) {
            this.gr = gr[0];
            this.gr2 = gr[1];
            this.only1gr = false;
        } else {
            this.gr = gr;
            this.gr2 = gr;
            this.only1gr = true;
        }
        this.label = null;
        this.tint1 = 0xff00ff;
        this.eventName = "NULL_event";
        this.locked = false;
        this.type = "EGUI_ELEMENT";
        this.z = 2048;
        this.oldSt = 0; // permite guardar el estado actual antes de un santo de estado para volver a
        // donde estabamos antes del salto de estado..
        this.offx_label = 0;
        this.offy_label = 0;
    }
    frame() {
        switch (this.st) {
            case 0:
                this.setGraph(this.gr);
                this.st = 10;
                break;
            case 10:
                if (this.touched() && !this.locked && !lockUi) {
                    lockUi = true;
                    if (this.only1gr == true) {
                        this.tint(this.tint1);
                    } else {
                        this.setGraph(this.gr2);
                    }
                    this.st = 20;
                }
                break;
            case 20:
                if (!this.touchPersists()) {
                    lockUi = false;
                    method(this.eventName);
                    if (this.only1gr == true) {
                        this.noTint();
                    } else {
                        this.setGraph(this.gr);
                    }
                    this.st = 10;
                }
                break;
            case 30:
                this.label = new Write(this.fnt, this.textSize, this.text, CENTER, this.x, this.y, this.textColor, 1);
                this.label.z = this.z + 1;
                this.st = this.oldSt;
                break;
        }
        if (this.label != null) {
            this.label.x = this.x + this.offx_label;
            this.label.y = this.y + this.offy_label;
        }
    }
    setGraphics(gr) {
        this.only1gr = false;
        if (Array.isArray(gr) == true) {
            this.gr = gr[0];
            this.gr2 = gr[1];
            this.only1gr = false;
        } else {
            this.gr = gr;
            this.gr2 = gr;
            this.only1gr = true;
        }
    }
    touched() {
        var width = this.graph.width;
        var height = this.graph.height;
        var xmin = this.x - (width / 2);
        var xmax = this.x + (width / 2);
        var ymin = this.y - (height / 2);
        var ymax = this.y + (height / 2);
        for (var i = 0; i < mouse.points.length; i++) {
            if (mouse.points[i].active === true) {
                var x = mouse.points[i].x;
                var y = mouse.points[i].y;
                if (x > xmin && x < xmax && y > ymin && y < ymax) {
                    this.touch_id = i;
                    return true;
                }
            }
        }
        return false;
    }
    setEvent(eventName) {
        this.eventName = eventName;
    }
    setLabel(fnt, textSize, text, textColor) {
        this.fnt = fnt;
        this.textSize = textSize;
        this.text = text;
        this.textColor = textColor;
        this.oldSt = this.st;
        this.st = 30;
    }
    setLabelColor(col) {
        this.textColor = col;
        if (this.label != null) {
            this.label.setColor(this.textColor);
        }
    }
    setLabelOffset(offx, offy) {
        this.offx_label = offx;
        this.offy_label = offy;
    }
    finalize() {
        signal(this.label, s_kill);
    }
}


class EGUIinputBox extends GameObject {
    constructor(fnt, size, label, text, x, y, w, h = size, pwdMode = false) {
        super();
        this.st = 0;
        if (fnt == null) {
            this.fnt = 'Arial';
        } else {
            this.fnt = fnt;
        }
        this.label = label;
        this.labelColor = 0x000000;
        this.text = text;
        this.pwdText = "";
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textSize = size;
        this.textColor = 0x111111;
        this.gr;
        this.idText;
        this.idLabel;
        this.tint1 = 0xeaecee;
        this.tint2 = 0xffffff;
        this.eventName = "NULL_event";
        this.locked = false;
        this.type = "EGUI_ELEMENT";
        this.tint1 = 0x90a4ae;
        this.tint2 = 0xffffff;
        this.pwdMode = pwdMode;
        this.autoClear = false;
        this.graphics;
        this.autoTrim = true;
        this.z = 2048;
        this.focus = false;
        this.prompt_buffer = null;
    }
    getFocus() {
        return this.focus;
    }
    setFocus(focus) {
        this.focus = focus;
    }
    frame() {
        switch (this.st) {
            case 0:
                this.h = textInfo("Arial", this.textSize, "W").lineHeight + 4;
                this.newGraph(this.w, this.h);
                this.graphics = new PIXI.Graphics();
                this.graphics.beginFill(0x000000);
                this.graphics.drawRect(0, 0, this.w + 2, this.h + 2);
                this.graphics.zIndex = this.z - 1;
                this.graphics.x = this.x - this.w / 2;
                this.graphics.y = this.y - this.h / 2;
                app.stage.addChild(this.graphics);
                this.idLabel = new Write(this.fnt, this.textSize, this.label, LEFT, this.x - this.w / 2, this.y, this.labelColor, 255);

                this.pwdText = "";
                for (let i = 0; i < this.text.length; i++) {
                    this.pwdText += "*";
                }
                if (this.pwdMode == true) {
                    this.idText = new Write(this.fnt, this.textSize, this.pwdText, RIGHT, 2 + this.x - this.w / 2, this.y, this.textColor, 255);
                } else {
                    this.idText = new Write(this.fnt, this.textSize, this.text, RIGHT, 2 + this.x - this.w / 2, this.y, this.textColor, 255);
                }
                this.tint(this.tint1);
                this.st = 10;
                break;
            case 10:
                this.graphics.zIndex = this.z - 1;
                if ((this.touched() && !this.locked && !lockUi) || !this.locked && !lockUi && this.focus) {
                    if (window.navigator.maxTouchPoints >= 1) {
                        lockUi = true;
                        this.prompt_buffer = null;
                        new Teclado(this, this.text); // caller element with .setText("") method and default text input..
                        this.st = 200;
                    } else {
                        lockEGUI();
                        this.tint(this.tint2);
                        if (this.autoClear === true) {
                            this.text = "";
                        }
                        keyboard_buffer = this.text;
                        this.st = 20;
                    }
                }
                break;

            case 20:
                this.graphics.zIndex = this.z - 1;

                if (this.pwdMode) {
                    this.pwdText = "";
                    for (let i = 0; i < this.text.length; i++) {
                        this.pwdText += "*";
                    }
                    this.idText.text = this.pwdText + (frameCount % 30 > 15 ? "_" : "");
                } else {
                    this.idText.text = this.text + (frameCount % 30 > 15 ? "_" : "");
                }



                this.text = keyboard_buffer;
                if (textInfo("Arial", this.textSize, this.text).width > this.w - 4) {
                    keyboard_buffer = keyboard_buffer.slice(0, -1);
                } else {
                    //..
                }


                if (key(_ENTER) || (mouse.left && !this.touched())) {
                    this.st = 30;
                }
                break;
            case 30:
                if (!key(_ENTER)) {
                    this.focus = false;
                    this.st = 10;
                    unlockEGUI();
                    if (this.autoTrim == true) {
                        this.text = this.text.trim();
                    }
                    method(this.eventName);
                    this.tint(this.tint1);
                    if (this.pwdMode == true) {
                        this.idText.text = this.pwdText;
                    } else {
                        this.idText.text = this.text;
                    }
                }
                break;

            case 200:
                this.graphics.zIndex = this.z - 1;

                if (this.pwdMode) {
                    this.pwdText = "";
                    for (let i = 0; i < this.text.length; i++) {
                        this.pwdText += "*";
                    }
                    this.idText.text = this.pwdText + (frameCount % 30 > 15 ? "_" : "");
                } else {
                    this.idText.text = this.text + (frameCount % 30 > 15 ? "_" : "");
                }

                if (!exists(GLZ_KEYBOARD)) {
                    while (textInfo("Arial", this.textSize, this.text).width > this.w - 4) {
                        this.text = this.text.slice(0, -1);
                    }

                    this.st = 210;
                }

                break;
            case 210:
                unlockEGUI();
                if (this.autoTrim == true) {
                    this.text = this.text.trim();
                }
                method(this.eventName);
                this.tint(this.tint1);
                if (this.pwdMode == true) {
                    this.idText.text = this.pwdText;
                } else {
                    this.idText.text = this.text;
                }
                this.focus = false;
                lockUi = false;
                this.st = 220;
                break;
            case 220:
                if (!mouse.left) {
                    this.st = 10;
                }
                break;
        }
    }
    setLabelColor(labelColor) {
        this.labelColor = labelColor;
    }
    clear() {
        this.text = "";
        this.pwdText = "";
        if (this.pwdMode == true) {
            this.idText.text = this.pwdText;
        } else {
            this.idText.text = this.text;
        }
    }
    setAutoTrim(autoTrim) {
        this.autoTrim = autoTrim;
    }
    setText(newText) {
        this.text = newText;
        this.idText.text = this.text;
    }
    setAutoClear(autoClear) {
        this.autoClear = autoClear;
    }
    get() {
        return this.text;
    }
    setEvent(eventName) {
        this.eventName = eventName;
    }
    finalize() {
        app.stage.removeChild(this.graphics);
    }
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function mapGetPixel(img, x, y) {
    var offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.style.display = "none";
    offscreenCanvas.width = img.width;
    offscreenCanvas.height = img.height;
    var ctx_ = offscreenCanvas.getContext('2d');
    ctx_.drawImage(img, 0, 0);
    return ctx_.getImageData(x, y, 1, 1).data;
}
//---------------------------------------------------------------------------------
function mapSetPixel(img, x, y, r, g, b, a) {
    var cvs = document.createElement('canvas');
    cvs.style.display = "none";
    cvs.width = img.width;
    cvs.height = img.height;
    var ctx_ = cvs.getContext("2d");
    ctx_.drawImage(img, 0, 0, cvs.width, cvs.height);
    var pix = ctx_.getImageData(x, y, 1, 1);
    pix.data[0] = r;
    pix.data[1] = g;
    pix.data[2] = b;
    pix.data[3] = a;
    console.log(pix);
    ctx_.putImageData(pix, x, y);  // 0,0 is xy coordinates
    img.src = cvs.toDataURL();
}
//---------------------------------------------------------------------------------
function mapClear(img, r, g, b, a) {
    var cvs = document.createElement('canvas');
    cvs.style.display = "none";
    cvs.width = img.width;
    cvs.height = img.height;
    var ctx = cvs.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, img.width, img.height);
    ctx.fillStyle = rgba(r, g, b, a);
    ctx.fill();
    img.src = cvs.toDataURL();
}
//---------------------------------------------------------------------------------
function newGraph(w, h, r, g, b, a) {
    var img_ = new Image(w, h);
    mapClear(img_, r, g, b, a);
    return img_;
}
//---------------------------------------------------------------------------------
function rgb(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    return "#" + r + g + b;
}
//---------------------------------------------------------------------------------
function rgba(r, g, b, a) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = a.toString(16);
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    if (a.length == 1)
        a = "0" + a;
    return "#" + r + g + b + a;
}
//---------------------------------------------------------------------------------
function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    return "#" + r + g + b;
}
//---------------------------------------------------------------------------------
function hexToRgb(hex) {
    // formato "0xrrggbb";
    var hex = Math.floor(hex);
    var r = (hex >> 16 & 255) / 255;
    var g = (hex >> 8 & 255) / 255;
    var b = (hex & 255) / 255;
    return [r, g, b];
}
//---------------------------------------------------------------------------------
function RGBAToHex(r, g, b, a) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    if (a.length == 1)
        a = "0" + a;
    return "#" + r + g + b + a;
}
//---------------------------------------------------------------------------------
function arrayToHex(color) {
    return RGBToHex(color[0], color[1], color[2]);
}
//---------------------------------------------------------------------------------
function putGraphic(dest_graph, dest_x, dest_y, source_graph, source_angle, source_scale, source_alpha) {
    if (source_angle == undefined) {
        source_angle = 0;
    }
    if (source_scale == undefined) {
        source_scale = 1;
    }
    if (source_alpha == undefined) {
        source_alpha = 1;
    }
    var cvs = document.createElement('canvas');
    cvs.style.display = "none";
    cvs.width = dest_graph.width;
    cvs.height = dest_graph.height;
    var ctx_ = cvs.getContext("2d");
    ctx_.drawImage(dest_graph, 0, 0, cvs.width, cvs.height);

    ctx_.translate(dest_x, dest_y);
    ctx_.rotate(radians(source_angle));
    ctx_.globalAlpha = source_alpha;
    ctx_.drawImage(source_graph, -(source_graph.width / 2) * source_scale, -(source_graph.height / 2) * source_scale, source_graph.width * source_scale, source_graph.height * source_scale);

    dest_graph.src = cvs.toDataURL();
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class JoyStick extends GameObject {
    constructor(x, y, width, height) {
        super();
        this.st = 0;
        this.initx = x;
        this.inity = y;
        this.width = width;
        this.height = height;
        this.sensorArea = new GameObject();
        this.touchX = 0;
        this.touchY = 0;
        this.joyBody;
        this.joySticK;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.deadZone = 20;
        this.sensorPreTouched = false;
        this.axis = new THREE.Vector2();
    }
    setVisible(value) {
        this.sensorArea.visible = value;
    }
    frame() {
        switch (this.st) {
            case 0:
                //this.sensorArea = new GameObject();
                this.sensorArea.x = this.initx;
                this.sensorArea.y = this.inity;
                this.sensorArea.alpha = 0.5;
                this.sensorArea.newGraph(this.width, this.height);
                this.st = 10;
                break;

            case 10:
                if (this.sensorArea.touched()) {
                    let vec = this.sensorArea.getTouch();
                    this.touchX = vec.x;
                    this.touchY = vec.y;
                    this.st = 12;
                }
                break;
            case 12:
                if (this.sensorArea.touched()) {
                    let vec = this.sensorArea.getTouch();
                    if (getDistance2d(this.touchX, this.touchY, vec.x, vec.y) > this.deadZone) {
                        this.sensorPreTouched = false;
                        this.st = 20;
                    } else {
                        this.sensorPreTouched = true;
                    }
                } else {
                    this.sensorPreTouched = false;
                    this.st = 10;
                }


                break;

            case 20:
                if (this.sensorArea.touched()) {
                    let vec = this.sensorArea.getTouch();
                    this.touchX = vec.x;
                    this.touchY = vec.y;

                    this.joyBody = new GameObject();
                    this.joyBody.x = this.touchX;
                    this.joyBody.y = this.touchY;
                    this.joyBody.setGraph(img[35]);

                    this.joySticK = new GameObject();
                    this.joySticK.x = this.touchX;
                    this.joySticK.y = this.touchY;
                    this.joySticK.setGraph(img[36]);
                    this.st = 30;
                } else {

                }
                break;
            case 30:
                if (!this.sensorArea.touchPersists()) {
                    signal(this.joyBody, s_kill);
                    signal(this.joySticK, s_kill);
                    this.left = false;
                    this.right = false;
                    this.up = false;
                    this.down = false;
                    this.axis.x = 0;
                    this.axis.y = 0;
                    this.st = 10;
                } else {
                    let vec = this.sensorArea.getTouch();
                    this.touchX = vec.x;
                    this.touchY = vec.y;
                    this.joySticK.x = this.touchX;
                    this.joySticK.y = this.touchY;
                    let dx = this.joySticK.x - this.joyBody.x;
                    let dy = this.joySticK.y - this.joyBody.y;
                    this.axis.x = dx;
                    this.axis.y = dy;
                    if (dx > this.deadZone) {
                        this.right = true;
                    } else {
                        this.right = false;
                    }
                    if (dx < -this.deadZone) {
                        this.left = true;
                    } else {
                        this.left = false;
                    }
                    if (dy > this.deadZone) {
                        this.down = true;
                    } else {
                        this.down = false;
                    }
                    if (dy < -this.deadZone) {
                        this.up = true;
                    } else {
                        this.up = false;
                    }
                }
                break;
        }
    }
    getAxis() {
        return this.axis;
    }
    get() {
        let active = false;
        let angle = undefined;
        let distance = undefined;
        if (exists(this.joySticK)) {
            angle = -degrees(Math.atan2(this.axis.y, this.axis.x));
            distance = getDistance2d(this.joyBody.x, this.joyBody.y, this.joySticK.x, this.joySticK.y);
        }
        if (angle != undefined) {
            active = true;
        }
        return {
            active: active,
            angle: angle,
            distance: distance,
            axis_x: this.axis.x,
            axis_y: this.axis.y,
            left: this.left,
            right: this.right,
            up: this.up,
            down: this.down,

        }
    }
    finalize() {
        signal(this.sensorArea, s_kill);
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class TableRow {
    constructor() {
        this.uid = 0;
        this.data = [];
        this.columnNames = [];
    }
    addColumn(columnName) {
        this.columnNames.push(columnName);
    }
    getColumnNames() {
        return this.columnNames;
    }
    getColumnCount() {
        return this.columnNames.length;
    }
    getRowCount() {
        return this.data.length;
    }
    addRow() {
        let uid = this.uid++;
        let newElement = [];
        newElement.uid = uid;
        for (let i = 0; i < this.columnNames.length; i++) {
            newElement[this.columnNames[i]] = "";
        }
        this.data.push(newElement);
        return uid
    }
    setString(id, columnName, str) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].uid == id) {
                this.data[i][columnName] = str;
            }
        }
    }
    getString(id, columnName) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].uid == id) {
                return this.data[i][columnName];
            }
        }
    }
    findRow(columnName, key) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][columnName] == key) {
                return this.data[i].uid;
            }
        }
        return null;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function putScreen(gr, x = WIDTH / 2, y = HEIGHT / 2, angle = 0, sizex = 1, sizey = 1, alpha, z = -2048) {
    putScreenGraph = new PIXI.Sprite(gr);
    putScreenGraph.x = x;
    putScreenGraph.y = y;
    putScreenGraph.anchor.x = 0.5;
    putScreenGraph.anchor.y = 0.5;
    putScreenGraph.alpha = alpha;
    putScreenGraph.scale.x = sizex;
    putScreenGraph.scale.y = sizey;
    putScreenGraph.zIndex = z;
    putScreenGraph.rotation = -radians(angle);
    app.stage.addChild(putScreenGraph);
}
//---------------------------------------------------------------------------------
function clearScreen() {
    app.stage.removeChild(putScreenGraph);
    putScreenGraph = null;
}
//---------------------------------------------------------------------------------
class StringDict {
    constructor() {
        this.delimitier = "~";
        this.data = [];
    }
    size() {
        return this.data.length;
    }
    clear() {
        this.data = [];
    }
    keys() {
        let keys = new StringList();
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            keys.add(param[0]);
        }
        return keys;
    }
    keyArray() {
        let keys = new StringList();
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            keys.add(param[0]);
        }
        return keys;
    }
    values() {
        let values = new StringList();
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            values.add(param[1]);
        }
        return values;
    }
    valueArray() {
        let values = new StringList();
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            values.add(param[1]);
        }
        return values;
    }
    get(key) {
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            if (param[0] == key) {
                return param[1];
            }
        }
        return null;
    }
    set(key, value) {
        if (key == "") {
            return;
        }
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            if (param[0] == key) {
                param[1] = value;
                this.data[i] = param[0] + this.delimitier + param[1];
                return;
            }
        }
        // en este punto si no he retornado ya es por que la key no existe..
        // la creo nueva..
        this.data.push(key + this.delimitier + value);
    }
    hasKey(key) {
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            if (param[0] == key) {
                return true;
            }
        }
        return false;
    }
    remove() {
        for (let i = 0; i < this.data.length; i++) {
            let param = this.data[i].split(this.delimitier);
            if (param[0] == key) {
                this.data.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    sortKeys() {
        this.data.sort();
    }
    sortKeysReverse() {
        //..
    }
    sortValues() {
        //..
    }
    sortValuesReverse() {
        //..
    }
}
//---------------------------------------------------------------------------------
class ImagePixel {
    constructor(src) {
        this.ready = false;
        this.offscreenCanvas;
        this.ctx_;
        this.colorMode = "RGBA";
        this.img = new Image();
        this.img.src = src;
        document.body.appendChild(this.img);
        this.img.onload = () => {
            this.loadPixels();
        }
    }
    loadPixels() {
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.style.display = "none";
        this.offscreenCanvas.width = this.img.width;
        this.offscreenCanvas.height = this.img.height;
        this.ctx_ = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
        this.ctx_.drawImage(this.img, 0, 0);
        this.ready = true;
    }
    getPixel(x, y) {
        if (!this.ready) {
            return null;
        } else {
            switch (this.colorMode) {
                case "RGBA":
                    return this.ctx_.getImageData(x, y, 1, 1).data;
                case "HEX":
                    let color = this.ctx_.getImageData(x, y, 1, 1).data;
                    return this.RGBAToHex(color[0], color[1], color[2]);
                default:
                    return console.warn("ImagePixel() warning: No valid color mode!  [ RGBA / HEX ].");
            }
        }
    }
    getPixels() {
        if (!this.ready) {
            console.warn("ImagePixel() warning: please wait to finish reading process..");
            return null;
        }
        switch (this.colorMode) {
            case "RGBA":
                return this.ctx_.getImageData(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height).data;
            case "HEX":
                let colors = this.ctx_.getImageData(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height).data;
                let hexColors = [];
                for (let i = 0; i < colors.length; i += 4) {
                    hexColors.push(this.RGBAToHex(colors[i], colors[i + 1], colors[i + 2]));
                }
                return hexColors;
            default:
                console.warn("ImagePixel() warning: No valid color mode!  [ RGBA / HEX ].");
                return null;
        }

    }
    getArea(x, y, width, height) {
        if (!this.ready) {
            console.warn("ImagePixel() warning: please wait to finish reading process..");
            return null;
        }
        if (x < 0 || x > this.offscreenCanvas.width || y < 0 || y > this.offscreenCanvas.height) {
            console.warn("ImagePixel() warning: Invalid image area!.");
            return null;
        }
        switch (this.colorMode) {
            case "RGBA":
                return this.ctx_.getImageData(x, y, width, height).data;
            case "HEX":
                let colors = this.ctx_.getImageData(x, y, width, height).data;
                let hexColors = [];
                for (let i = 0; i < colors.length; i += 4) {
                    hexColors.push(this.RGBAToHex(colors[i], colors[i + 1], colors[i + 2]));
                }
                return hexColors;
            default:
                console.warn("ImagePixel() warning: No valid color mode!  [ RGBA / HEX ].");
                return null;
        }
    }
    setColorMode(colorMode) {
        this.colorMode = colorMode;
    }
    RGBAToHex(r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        return "#" + r + g + b;
    }
    getWidth() {
        return this.offscreenCanvas.width;
    }
    getHeight() {
        return this.offscreenCanvas.height;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function getDistance2d(fromX, fromY, toX, toY) {
    var dX = Math.abs(fromX - toX);
    var dY = Math.abs(fromY - toY);
    return Math.sqrt((dX * dX) + (dY * dY));
}
function getDistance(p1, p2) {
    var dx = Math.abs(p1.x - p2.x);
    var dy = Math.abs(p1.y - p2.y);
    var dz = Math.abs(p1.z - p2.z);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function getAngle(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return -degrees(Math.atan2(dy, dx));
}
//---------------------------------------------------------------------------------
class VideoCamera {
    constructor() {
        this.videoElement = document.createElement("video");
        this.stream;
        this.texture;
        this.ready = false;
        this.constraints = {
            video: true,
            audio: false
        }

        this.constraints2 = {
            video: {
                mandatory: {
                    maxWidth: 1024,
                    maxHeight: 768,
                    minWidth: 1024,
                    minHeight: 768
                }
            }
        };
        this.width = 0;
        this.height = 0;
    }
    init(w, h) {
        if (arguments.length > 0) {
            this.constraints2.video.mandatory.maxWidth = w;
            this.constraints2.video.mandatory.maxHeight = h;
            this.constraints2.video.mandatory.minWidth = w;
            this.constraints2.video.mandatory.minHeight = h;
            this.getCameraStream(this.constraints2);
        } else {
            this.getCameraStream(this.constraints);
        }
    }
    async getCameraStream() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints2);
            this.handleSucces();
        } catch (error) {
            console.log(error);
        }
    }
    handleSucces() {
        this.videoElement.srcObject = this.stream;
        console.log("VideoCamera source ready.");
        this.ready = true;
        this.texture = PIXI.Texture.from(this.videoElement);

        let stream_settings = this.stream.getVideoTracks()[0].getSettings();
        // actual width & height of the camera video
        this.width = stream_settings.width;
        this.height = stream_settings.height;
        this.videoElement.setAttribute('width', this.width);
        this.videoElement.setAttribute('height', this.height);

    }
    get() {
        return this.texture;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function map(value, istart, istop, ostart, ostop, clip_to_output_limits) {
    if (clip_to_output_limits == true) {
        let r = ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
        if (r < ostart) {
            return ostart;
        } else if (r > ostop) {
            return ostop;
        } else {
            return r;
        }
    } else {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function screenDrawGraphic(img_, x, y, angle, sizeX, sizeY, alpha) {
    let b = new GameObject();
    b.x = x;
    b.y = y;
    if (_id_ != undefined) {
        b.z = _id_.z;
    }
    b.angle = angle;
    b.sizex = sizeX;
    b.sizey = sizeY;
    b.alpha = alpha;
    b.setGraph(img_);
    return b;
}
//---------------------------------------------------------------------------------
function screenDrawSprite(texture_path, x = 0, y = 0, z = 0, anglex = 0, angley = 0, anglez = 0, size = 1) {
    let b = new GameObject();
    b.x = x;
    b.y = y;
    b.z = z;

    b.anglex = anglex;
    b.angley = angley;
    b.angle = anglez;
    b.size = size;
    b.createSprite(texture_path);
    return b;
}
//---------------------------------------------------------------------------------
// ej: let p = getObject("id", 1);
function getObject(property, value) {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].hasOwnProperty(property)) {
            if (gameObjects[i][property] == value) {
                return gameObjects[i];
            }
        }
    }
    return null;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function EVENT_Teclado_teclaEspecial_return() {
    GLZ_KEYBOARD.onClick_teclaEspecial("return");
}
//---------------------------------------------------------------------------------
function EVENT_Teclado_teclaEspecial_123() {
    GLZ_KEYBOARD.onClick_teclaEspecial("123");
}
//---------------------------------------------------------------------------------
function EVENT_Teclado_teclaEspecial_del() {
    GLZ_KEYBOARD.onClick_teclaEspecial("del");
}
//---------------------------------------------------------------------------------
function EVENT_Teclado_teclaEspecial_mays() {
    GLZ_KEYBOARD.onClick_teclaEspecial("mays");
}
//---------------------------------------------------------------------------------
function EVENT_Teclado_tecla() {
    GLZ_KEYBOARD.onClick_key(_id_.label.text);
}
//---------------------------------------------------------------------------------
class Teclado extends GameObject {
    constructor(input_object_to_pass_text, buffer) {
        super();
        GLZ_KEYBOARD = this;
        this.st = 0;
        this.img = [];
        this.loader;
        this.shift = false;    // mayusculas activadas o no..
        this.numeric = false;  // teclado numerico en fila cero o no..
        this.idText;
        this.textBuffer = "";
        this.keys_lower = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m"];
        this.keys_number = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "/", ":", ";", "(", ")", "$", "&", "@", '"', ".", ",", "?", "!", "#", "<", ">"];
        this.buffer = buffer;
        this.textKeysSize = 44;
        this._mays_ = false;
        this._number_ = false;
        this.input_controller = input_object_to_pass_text;
    }
    onClick_teclaEspecial(key) {
        switch (key) {
            case "mays":
                if (this._number_ == true) {
                    this.onClick_teclaEspecial("123");
                    return;
                }

                if (this._mays_ == false) {
                    this._mays_ = true;
                    for (let i = 0; i < gameObjects.length; i++) {
                        if (gameObjects[i].type == GLZ_KEYBOARD_NORMAL_KEY_TYPE) {
                            gameObjects[i].label.text = gameObjects[i].label.text.toUpperCase();
                        }
                    }
                } else {
                    this._mays_ = false;
                    for (let i = 0; i < gameObjects.length; i++) {
                        if (gameObjects[i].type == GLZ_KEYBOARD_NORMAL_KEY_TYPE) {
                            gameObjects[i].label.text = gameObjects[i].label.text.toLowerCase();
                        }
                    }
                }
                break;
            case "del":
                if (this.buffer.length > 0) {
                    this.buffer = this.buffer.slice(0, -1);
                }
                break;
            case "123":
                if (this._mays_ == true) {
                    this.onClick_teclaEspecial("mays");
                    return;
                }
                if (this._number_ == false) {
                    this._number_ = true;
                    for (let i = 0; i < gameObjects.length; i++) {
                        if (gameObjects[i].type == GLZ_KEYBOARD_NORMAL_KEY_TYPE) {
                            let letra = gameObjects[i].label.text;
                            if (letra == " space " || letra == " SPACE ") {
                                // para todas menos para la tecla del espacio..
                            } else {
                                gameObjects[i].label.text = this.keys_number[this.keys_lower.indexOf(letra)];
                            }
                        }
                    }
                } else {
                    this._number_ = false;
                    for (let i = 0; i < gameObjects.length; i++) {
                        if (gameObjects[i].type == GLZ_KEYBOARD_NORMAL_KEY_TYPE) {
                            let letra = gameObjects[i].label.text;
                            if (letra == " space " || letra == " SPACE ") {
                                // para todas menos para la tecla del espacio..
                            } else {
                                gameObjects[i].label.text = this.keys_lower[this.keys_number.indexOf(letra)];
                            }
                        }
                    }
                }
                break;
            case "return":
                signal(this, s_kill);
                signalType(GLZ_KEYBOARD_NORMAL_KEY_TYPE, s_kill);
                this.input_controller.setText(this.buffer);
                signal(this.idText, s_kill);
                signalType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE, s_kill);
                //unlockEGUI();
                break;
        }
    }
    onClick_key(str) {
        this.buffer += str[0];
    }
    frame() {
        switch (this.st) {
            case 0:
                this.z = 100000;
                this.loader = new LoadImages("library/keyboard_2/", 8);
                //lockUi = true;
                lockEGUI();
                this.st = 10;
                break;
            case 10:
                if (this.loader.ready === true) {
                    this.img = this.loader.get();
                    this.st = 12;
                }
                break;
            case 12:
                this.size = WIDTH / this.img[6].width;
                this.x = WIDTH / 2;
                this.y = HEIGHT - (this.img[6].height * this.size) / 2;
                this.setGraph(this.img[6]);
                let pos = this.getRealPoint(10, 23);
                this.idText = new Write(null, 30 * this.size, this.buffer, RIGHT, pos.x, pos.y, BLACK, 1);
                this.st = 20;
                break;
            case 20:
                lockUi = false;
                this.makeKeys();
                this.makeSpecialKeys();
                this.st = 30;
                break;
            case 30:
                this.idText.text = this.buffer + (frameCount % 30 > 15 ? "_" : "");
                break;
        }
    }

    makeKeys() {
        let xx = [19, 56, 94, 132, 169, 206, 243, 280, 318, 356];
        let yy = 73;
        for (let i = 0; i < xx.length; i++) {
            let vec = this.getRealPoint(xx[i], yy);
            let b = new EGUIgbutton(this.img[2], vec.x, vec.y, this.size);
            b.z = this.z + 1;
            b.setLabel(null, this.textKeysSize, this.keys_lower[i], BLACK);
            b.setEvent("EVENT_Teclado_tecla");
            b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
        }
        //-------------------------------------------------------
        yy = 127;
        for (let i = 0; i < xx.length; i++) {
            let vec = this.getRealPoint(xx[i], yy);
            let b = new EGUIgbutton(this.img[2], vec.x, vec.y, this.size);
            b.z = this.z + 1;
            b.setLabel(null, this.textKeysSize, this.keys_lower[xx.length + i], BLACK);
            b.setEvent("EVENT_Teclado_tecla");
            b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
        }
        //-------------------------------------------------------
        xx = [75, 113, 151, 188, 225, 262, 299];
        yy = 181;
        for (let i = 0; i < xx.length; i++) {
            let vec = this.getRealPoint(xx[i], yy);
            let b = new EGUIgbutton(this.img[2], vec.x, vec.y, this.size);
            b.z = this.z + 1;
            b.setLabel(null, this.textKeysSize, this.keys_lower[20 + i], BLACK);
            b.setEvent("EVENT_Teclado_tecla");
            b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
        }
        //-------------------------------------------------------
        let vec = this.getRealPoint(187, 235);
        let b = new EGUIgbutton(this.img[4], vec.x, vec.y, this.size);
        b.z = this.z + 1;
        b.setLabel(null, this.textKeysSize, " space ", BLACK);
        b.setEvent("EVENT_Teclado_tecla");
        b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
    }
    makeSpecialKeys() {
        let vec;
        let b;
        vec = this.getRealPoint(24, 181);
        b = new EGUIgbutton(this.img[0], vec.x, vec.y, this.size);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_mays");
        vec = this.getRealPoint(350, 181);
        b = new EGUIgbutton(this.img[7], vec.x, vec.y, this.size);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_del");
        vec = this.getRealPoint(24, 235);
        b = new EGUIgbutton(this.img[1], vec.x, vec.y, this.size);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_123");
        vec = this.getRealPoint(72, 235);
        b = new EGUIgbutton(this.img[3], vec.x, vec.y, this.size);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;

        vec = this.getRealPoint(328, 235);
        b = new EGUIgbutton(this.img[8], vec.x, vec.y, this.size);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_return");
    }
    finalize() {

    }
}
//---------------------------------------------------------------------------------
function getOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        return "portrait";
    } else {
        return "landscape";
    }
}
//---------------------------------------------------------------------------------
function setTexture(mesh, texture) {
    mesh.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            if (child.material.map != undefined) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        }
    });
}
//---------------------------------------------------------------------------------
function loadTexture_(img_path) {
    return new THREE.TextureLoader().load(img_path);
}
//---------------------------------------------------------------------------------
function loadModelOBJ(filename, container) {
    var obj = filename;
    var mtl = filename.substring(0, filename.length - 4) + ".mtl";
    //console.info(obj, mtl);
    load_model_security_flag = false;
    var mtlLoader = new MTLLoader();
    mtlLoader.load(mtl, function (materials) {
        materials.preload();
        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(obj, function (object) {
            /*
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }   
            } );    
            */
            //mod.push(object);    
            container.push(object);
            load_model_security_flag = true;
        });
    });
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
var load_model_security_flag = true;
function isSecureToLoadModel() {
    return load_model_security_flag;
}
//---------------------------------------------------------------------------------
class LoadModels extends GameObject {
    constructor(model_list) {
        super();
        this.st = 0;
        this.pos = 0;
        this.ready = false;
        this.model_list = model_list;
        this.dat = [];
    }
    frame() {
        switch (this.st) {
            case 0:
                if (isSecureToLoadModel()) {              // si es seguro cargar un nuevo modelo..
                    if (this.pos < this.model_list.length) {   // si quedan modelos por cargar..
                        this.st = 10;                   // salta al cargador..
                    } else {
                        this.ready = true;   // si no quedan modelos por cargar termina..
                        //signal(this, s_kill);           // fin..
                        //console.log('Loading Complete!');
                        this.st = 30;
                    }
                }
                break;
            case 10:
                var extension = this.model_list[this.pos].substring(this.model_list[this.pos].length - 3, this.model_list[this.pos].length);
                if (extension == "obj") {
                    loadModelOBJ(this.model_list[this.pos], this.dat);
                }
                this.pos++;                             // iterar una posicion en la lista de modelos..
                this.st = 0;                            // volver al estado inicial..
                break;
        }
    }
    isReady() {
        return this.ready;
    }

    get() {
        signal(this, s_kill);
        return this.dat;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function LoadTxt(filename) {
    var p = new GameObject();
    p.st = 0;
    p.ready = false;
    p.data;
    p.frame = function () {
        switch (this.st) {
            case 0:
                var loader = new THREE.FileLoader();
                loader.load(
                    // resource URL
                    filename,
                    // onLoad callback
                    function (data) {
                        p.data = data.split("\r\n");
                        // output the text to the console
                        p.ready = true;
                        //console.log( data )
                    },
                    // onProgress callback
                    function (xhr) {
                        //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                    },
                    // onError callback
                    function (err) {
                        console.error('An error happened');
                    }
                );
                this.st = 10;
                break;
            case 10:
                //.. 
                break;
        }
    }
    p.get = function () {
        signal(p, s_kill);
        return p.data;
    }
    return p;
}
//---------------------------------------------------------------------------------
function fileExists(urlToFile) {
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', urlToFile, false);
        xhr.send();
    } catch (e) {
        // nothing..
        console.log(e);
    }

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
class Camera3d extends GameObject {
    constructor() {
        super();
        this.st = 0;
        this.target = undefined;
        this.position = new THREE.Vector3();
        this.targetDistance = 0;                // distancia al punto 3d de la camara..
        this.targetDistance_preset = 0;
        this.targetHeight = 0;
        this.targetFreeMove = 1;

        this.enabled = true;
        this.movementSpeed = 1.0;
        this.lookSpeed = 0.005;
        this.lookVertical = true;
        this.autoForward = false;
        this.activeLook = true;
        this.heightSpeed = false;
        this.heightCoef = 1.0;
        this.heightMin = 0.0;
        this.heightMax = 1.0;
        this.constrainVertical = false;
        this.verticalMin = 0;
        this.verticalMax = Math.PI;
        this.mouseDragOn = false;
        // internals
        this.autoSpeedFactor = 0.0;
        this.pointerX = 0;
        this.pointerY = 0;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.viewHalfX = 0;
        this.viewHalfY = 0;
        // private variables
        this.lat = 0;
        this.lon = 0;
        // puntero a la camara de la aplicacion..
        this.object = camera;
        this.dampingValue = 0.9;
        this.enableMouseControl = true;
        this.enableMouseZoom = true;
        this.enableCollision = true;
        this.mouseControlFlag = false;
        this.mouseControlClickPosition = new THREE.Vector2();
        this.mouseControlSensibility = 5.0;
        this.delta = 1 / 10;

        this.r = new THREE.Raycaster();
        this.r.camera = camera;             // seteo la camara por que la necesita el raycast con sprites 3d..
        signal(this, s_protected);

        this.dummy = new THREE.Vector3();   // usado como falso target para viajar de un objeto a otro apuntando con la camara a este vector..
        this.activeDummy = false;
        this.dummyTarget = undefined;
    }
    initialize() {
        this.viewHalfX = WIDTH / 2;
        this.viewHalfY = HEIGHT / 2;
        this.mouseDragOn = true;
    }
    frame() {
        switch (this.st) {
            case 0:

                if (this.enableMouseControl) {

                    if (!this.mouseControlFlag) {
                        if (mouse.left) {
                            this.mouseControlFlag = true;
                            this.mouseControlClickPosition.x = mouse.x;
                            this.mouseControlClickPosition.y = mouse.y;
                        }
                    } else {
                        let dx = mouse.x - this.mouseControlClickPosition.x;
                        let dy = mouse.y - this.mouseControlClickPosition.y;
                        if (!mouse.left) {
                            this.mouseControlFlag = false;
                        }
                        this.pointerX = dx * this.mouseControlSensibility;
                        this.pointerY = dy * this.mouseControlSensibility;
                    }

                }
                if (this.enableMouseZoom) {
                    if (mouse.wheelUp) {
                        this.targetDistance_preset -= 1;
                        if (this.targetDistance_preset < 1) {
                            this.targetDistance_preset = 1;
                        }
                    }
                    if (mouse.wheelDown) {
                        this.targetDistance_preset += 1;
                    }
                }


                if (this.activeDummy) {
                    this.trackDummy(0.02);
                } else {
                    this.trackTarget();         // si existe un proceso target lo seguimos..
                }
                this.update(this.delta);    // actualizar posicion rotacion etc de la cam..
                this.dampingPointer();      // si hemos dejado de mover la camara esto la estabiliza y frena.

                this.x = this.object.position.x;
                this.y = this.object.position.y;
                this.z = this.object.position.z;

                break;
            case 10:

                break;
        }
    }
    //------------------------------------------------------
    setDummy(target) {
        if (exists(target)) {
            this.activeDummy = true;
            this.dummyTarget = target;
        } else {
            this.activeDummy = false;
        }
    }
    //------------------------------------------------------
    isDummyMove() {
        let limit = 2;
        let dx = this.position.x - this.dummyTarget.x;
        let dy = this.position.y - this.dummyTarget.y + this.targetHeight;
        let dz = this.position.z - this.dummyTarget.z;
        if (abs(dx) < limit + 0.1 && abs(dz) < limit + 0.1 && abs(dy) < (limit + this.targetHeight + 0.1)) {
            return false;
        }
        return true;
    }
    //------------------------------------------------------
    trackDummy(speed) {
        let dx = this.position.x - this.dummyTarget.x;
        let dy = this.position.y - this.dummyTarget.y;
        let dz = this.position.z - this.dummyTarget.z;

        if (abs(dx) > this.targetFreeMove) {
            let ddx = (abs(dx) - this.targetFreeMove) * speed;
            if (dx < 0) {
                this.position.x += ddx;
            } else {
                this.position.x -= ddx;
            }
        }
        if (abs(dz) > this.targetFreeMove) {
            let ddz = (abs(dz) - this.targetFreeMove) * speed;
            if (dz < 0) {
                this.position.z += ddz;
            } else {
                this.position.z -= ddz;
            }
        }
        if (abs(dy) > this.targetFreeMove) {
            let ddy = (abs(dy) - this.targetFreeMove) * speed;
            if (dy < 0) {
                this.position.y += ddy;
            } else {
                this.position.y -= ddy;
            }
        }

        this.object.position.x = this.position.x;
        this.object.position.y = this.position.y;
        this.object.position.z = this.position.z;
        this.object.translateZ(this.targetDistance);

        let dir = new THREE.Vector3();
        if (this.enableCollision) {
            dir.subVectors(camera.position, this.position).normalize();
            this.r.set(this.position, dir.subVectors(camera.position, this.position).normalize());
            const interse = this.r.intersectObjects(scene.children, false);

            if (interse.length > 0) {
                if (interse[0].object.id_ != this.target.id) {
                    if (interse[0].distance - 2 >= 0) {
                        this.targetDistance = interse[0].distance - 2;
                    }
                    if (this.targetDistance_preset < this.targetDistance) {
                        this.targetDistance = this.targetDistance_preset;
                    }
                }
            } else {
                let delta = this.position.distanceTo(camera.position);
                if (delta < this.targetDistance_preset) {
                    this.targetDistance += delta / 30;
                }
                if (delta > this.targetDistance_preset - 1) {
                    this.targetDistance = this.targetDistance_preset;
                }
            }
        } else {
            let delta = this.position.distanceTo(camera.position);
            if (delta < this.targetDistance_preset) {
                this.targetDistance += delta / 30;
            }
            if (delta > this.targetDistance_preset - 1) {
                this.targetDistance = this.targetDistance_preset;
            }
        }
    }
    //------------------------------------------------------
    trackTarget() {
        if (exists(this.target)) {

            let dx = this.position.x - this.target.x;
            let dy = this.position.y - (this.target.y + this.targetHeight);
            let dz = this.position.z - this.target.z;

            // si no se esta usando el dummy lo actualizo..
            if (this.activeDummy == false) {
                this.dummy.x = this.target.x;
                this.dummy.y = this.target.y;
                this.dummy.z = this.target.z;
            } else {
                // si se esta usando el dummy..
                dx = this.position.x - this.dummy.x;
                dy = this.position.y - this.dummy.y;
                dz = this.position.z - this.dummy.z;
            }

            if (abs(dx) > this.targetFreeMove) {
                let ddx = abs(dx) - this.targetFreeMove;
                if (dx < 0) {
                    this.position.x += ddx;
                } else {
                    this.position.x -= ddx;
                }
            }
            if (abs(dz) > this.targetFreeMove) {
                let ddz = abs(dz) - this.targetFreeMove;
                if (dz < 0) {
                    this.position.z += ddz;
                } else {
                    this.position.z -= ddz;
                }
            }
            if (abs(dy) > this.targetFreeMove) {
                let ddy = abs(dy) - this.targetFreeMove;
                if (dy < 0) {
                    this.position.y += ddy;
                } else {
                    this.position.y -= ddy;
                }
            }
            this.object.position.x = this.position.x;
            this.object.position.y = this.position.y;
            this.object.position.z = this.position.z;
            this.object.translateZ(this.targetDistance);

            let dir = new THREE.Vector3();
            if (this.enableCollision) {
                dir.subVectors(camera.position, this.position).normalize();
                this.r.set(this.position, dir.subVectors(camera.position, this.position).normalize());
                const interse = this.r.intersectObjects(scene.children, false);

                if (interse.length > 0) {
                    if (interse[0].object.id_ != this.target.id) {
                        if (interse[0].distance - 2 >= 0) {
                            this.targetDistance = interse[0].distance - 2;
                        }
                        if (this.targetDistance_preset < this.targetDistance) {
                            this.targetDistance = this.targetDistance_preset;
                        }
                    }
                } else {
                    let delta = this.position.distanceTo(camera.position);
                    if (delta < this.targetDistance_preset) {
                        this.targetDistance += delta / 30;
                    }
                    if (delta > this.targetDistance_preset - 1) {
                        this.targetDistance = this.targetDistance_preset;
                    }
                }
            } else {
                let delta = this.position.distanceTo(camera.position);
                if (delta < this.targetDistance_preset) {
                    this.targetDistance += delta / 30;
                }
                if (delta > this.targetDistance_preset - 1) {
                    this.targetDistance = this.targetDistance_preset;
                }
            }

            /*
            let target = new THREE.Vector3(this.target.x, this.target.y, this.target.z);
            let dist_a = this.position.distanceTo(camera.position);
            let dist_b = target.distanceTo(camera.position);
            console.log(dist_a, dist_b);
            */

        }
    }
    //------------------------------------------------------
    rotateX(dx) {
        this.pointerX = dx * this.mouseControlSensibility;
    }
    resetX() {
        this.lon = 0;
        this.pointerX = 0;
    }
    //------------------------------------------------------
    rotateY(dy) {
        this.pointerY = dy * this.mouseControlSensibility;
    }
    resetY() {
        this.lat = 0;
        this.pointerY = 0;
    }
    //------------------------------------------------------
    reset() {
        this.resetX();
        this.resetY();
    }
    //------------------------------------------------------
    dampingPointer() {
        if (this.pointerX != 0) { this.pointerX *= this.dampingValue; }
        if (this.pointerY != 0) { this.pointerY *= this.dampingValue; }
    }
    //------------------------------------------------------
    setFreeMoveDistance(value) {
        if (value > 0) {
            this.targetFreeMove = value;
        }
    }
    //------------------------------------------------------
    update(delta) {
        const targetPosition = new THREE.Vector3();
        if (this.enabled === false) return;
        if (this.heightSpeed) {
            const y = MathUtils.clamp(this.object.position.y, this.heightMin, this.heightMax);
            const heightDelta = y - this.heightMin;
            this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
        } else {
            this.autoSpeedFactor = 0.0;
        }
        const actualMoveSpeed = delta * this.movementSpeed;
        if (this.moveForward || (this.autoForward && !this.moveBackward)) this.object.translateZ(- (actualMoveSpeed + this.autoSpeedFactor));
        if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
        if (this.moveLeft) this.object.translateX(- actualMoveSpeed);
        if (this.moveRight) this.object.translateX(actualMoveSpeed);
        if (this.moveUp) this.object.translateY(actualMoveSpeed);
        if (this.moveDown) this.object.translateY(- actualMoveSpeed);
        let actualLookSpeed = delta * this.lookSpeed;
        if (!this.activeLook) {
            actualLookSpeed = 0;
        }
        let verticalLookRatio = 1;
        if (this.constrainVertical) {
            verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
        }
        this.lon -= this.pointerX * actualLookSpeed;
        if (this.lookVertical) this.lat -= this.pointerY * actualLookSpeed * verticalLookRatio;
        this.lat = Math.max(- 85, Math.min(85, this.lat));
        let phi = radians(90 - this.lat);
        const theta = radians(this.lon);
        if (this.constrainVertical) {
            phi = MathUtils.mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
        }
        const position = camera.position;
        targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
        this.object.lookAt(targetPosition);
    }
    //------------------------------------------------------
    lookAt(target) {
        let delta = 1;
        if (!exists(target)) return;

        let actualLookSpeed = delta * this.lookSpeed;
        if (!this.activeLook) {
            actualLookSpeed = 0;
        }
        let verticalLookRatio = 1;
        if (this.constrainVertical) {
            verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
        }
        this.lon -= this.pointerX * actualLookSpeed;
        if (this.lookVertical) this.lat -= this.pointerY * actualLookSpeed * verticalLookRatio;
        this.lat = Math.max(- 85, Math.min(85, this.lat));
        let phi = radians(90 - this.lat);
        const theta = radians(this.lon);
        if (this.constrainVertical) {
            phi = MathUtils.mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
        }
        const position = new THREE.Vector3(target.x, target.y, target.z);
        const targetPosition = new THREE.Vector3();
        targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
        this.object.lookAt(targetPosition);
    }
    //------------------------------------------------------
    manualMovement(delta) {
        this.delta = delta;
        // teclas de direccion..
        if (key(_LEFT)) {
            this.moveLeft = true;
        } else {
            this.moveLeft = false;
        }
        if (key(_RIGHT)) {
            this.moveRight = true;
        } else {
            this.moveRight = false;
        }
        if (key(_UP)) {
            this.moveForward = true;
        } else {
            this.moveForward = false;
        }
        if (key(_DOWN)) {
            this.moveBackward = true;
        } else {
            this.moveBackward = false;
        }
        if (key(_R)) {
            this.moveUp = true;
        } else {
            this.moveUp = false;
        }
        if (key(_F)) {
            this.moveDown = true;
        } else {
            this.moveDown = false;
        }
    }
    //------------------------------------------------------
    setCollision(value) {
        this.enableCollision = value;
    }
    //------------------------------------------------------
    //------------------------------------------------------
    setTarget(target) {
        this.target = target;
        if (target) {
            this.position.x = target.x;
            this.position.y = target.y;
            this.position.z = target.z;
        }

    }
    setTargetDistance(distance) {
        this.targetDistance = distance;
        this.targetDistance_preset = distance;
    }
    setTargetHeight(height) {
        this.targetHeight = height;
    }
    setPosition(x, y, z) {
        if (!exists(this.target)) {
            this.object.position.x = x;
            this.object.position.y = y;
            this.object.position.z = z;
        }

    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function generateUUID() {
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
        _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
        _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
        _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];

    // .toLowerCase() here flattens concatenated strings to save heap memory space.
    return uuid.toLowerCase();

}
//---------------------------------------------------------------------------------
function isMobile() {
    return window.navigator.maxTouchPoints >= 1;
}
//---------------------------------------------------------------------------------
function removeObject3D(object3D) {
    if (!(object3D instanceof THREE.Object3D)) return false;
    // for better memory management and performance
    if (object3D.geometry) object3D.geometry.dispose();
    if (object3D.material) {
        if (object3D.material instanceof Array) {
            // for better memory management and performance
            object3D.material.forEach(material => material.dispose());
        } else {
            // for better memory management and performance
            object3D.material.dispose();
        }
    }
    object3D.removeFromParent(); // the parent might be the scene or another Object3D, but it is sure to be removed this way
    return true;
}
//---------------------------------------------------------------------------------
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
//---------------------------------------------------------------------------------
class PointLight extends GameObject {
    constructor(col, intensity) {
        super();
        this.light;
        this.color = col;
        this.intensity = intensity;
        this.target;
        this.smooth = 1;
        this.targetHeight = 0;
    }
    initialize() {
        this.light = new THREE.PointLight(this.color, this.intensity);
        this.light.castShadow = three_renderer_use_shadows;             // si globalmente estan desactivadas se desactivan tambien en la luz..
        scene.add(this.light);
    }
    frame() {
        if (exists(this.target)) {
            // calculate real distance between objects..
            let dx = this.x - this.target.x;
            let dy = this.y - (this.target.y + this.targetHeight);
            let dz = this.z - this.target.z;
            // secure smoth value..
            if (this.smooth > 1.0) {
                this.smooth = 1.0;
            } else if (this.smooth < 0.01) {
                this.smooth = 0.01;
            }
            // position correction..
            this.x -= dx;
            this.y -= dy;
            this.z -= dz;
            this.light.position.set(this.x, this.y, this.z);
        } else {
            signal(this, s_kill);
        }
    }
    setTarget(target) {
        this.target = target;
    }
    setTargetHeight(value) {
        this.targetHeight = value;
    }
    setColor(col) {
        this.light.color.setHex(col);
    }
    setIntensity(value) {
        this.light.intensity = value;
    }
    setCastShadow(value) {
        this.light.castShadow = value;
    }
    finalize() {
        scene.remove(this.light);
        this.light.dispose();
    }
}
//---------------------------------------------------------------------------------