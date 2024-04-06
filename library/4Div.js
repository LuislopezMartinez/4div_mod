import * as THREE from './three.module.min.js';
import * as CANNON from './cannon-es.js';
import * as PIXI from './pixi.min.mjs';
import * as WAUD from './waud.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

export function getPixi() {
    return PIXI;
}

export const s_kill = 77;
export const s_protected = 777;
export const s_unprotected = 7777;

export const all_sound = 77777;

export const LEFT = 15;
export const RIGHT = 16;
export const CENTER = 17;

export const GLZ_TYPE_DEFAULT = -1;

export let _glz_socket = null;
export const NET_TOK_DATA = '~';           // delimitier for socket tokens..
export const SOCKET_CONNECTED = 21;
export const SOCKET_ERROR = 22;
export const SOCKET_CLOSED = 23;
export const SOCKET_NULL = 24;

// colors..
export const WHITE = 0xffffff;
export const SILVER = 0xc0c0c0;
export const GRAY = 0x808080;
export const BLACK = 0x000000;
export const RED = 0xff0000;
export const MAROON = 0x800000;
export const YELLOW = 0xffff00;
export const OLIVE = 0x808000;
export const LIME = 0x00ff00;
export const GREEN = 0x008000;
export const BLUE = 0x0000ff;
export const PINK = 0xff00ff;
export const PURPLE = 0x800080;
export const ORANGE = 0xf77f07;

// 3d materials..
export const BASIC = 8;        // A basic material that doesn’t respond to lighting, providing flat shading and a consistent color across the object.
export const LAMBERT = 9;      // A material that reacts to light in a Lambertian manner, providing diffuse reflection and smooth shading.
export const WIRED = 10;       // wireframe activated..
export const STANDARD = 11;    // A physically based material with realistic shading, offering parameters like roughness and metalness for controlling the surface appearance.
export const TOON = 12;        // A simplified shading model that creates a flat, cartoon-like appearance.
export const PHONG = 13;       // A material that simulates specular and shiny surfaces, reacting to light with highlights and reflections.
export const TEXTURED = 14;    // material with texture applyed.

export let _4div_light_ambient_;
export let _4div_light_ambient_color_ = WHITE;
export let _4div_light_ambient_intensity_ = 0.1;

export let _4div_fullscreen = false;
export let _4div_screen_filter = true;
export let app;
export let WIDTH = 0;
export let HEIGHT = 0;
export let backgroundColor = RED;
export let mouse;

export let fading = false;
export let alphaFading = 0;
export let deltaFading = 0;
export let fadingColor = WHITE;
export let fadingType = 0;
export let fadingRect_z = 1000000;
export let fadeRect;

export let _id_ = undefined;
export let unique_process_id_ = 0;
export let gameObjects = [];
export let frameCount = 0;

export var fps = 0;            // indica los frames reales por segundo..
export var fps_counter = 0;    // contador de frames mientras no pasen 1000 milisegundos..
export var fps_flag = false;   // se pone a true cuando pasan 1000 milisegundos..
export var fps_time_start = 0; // marca el tiempo al inicio de la cuenta de frames..
export var fps_time_now = 0;   // marca el tiempo actual..

export let renderer;
export let scene;
export let fog;
export let needFogUpdate = false;
export let camera;
export let camera_target = undefined;   // objeto de la escena que esta en el foco de la camara..
export let THREE_TEXTURE;
export let three_renderer_use_shadows = true;

export var world;                  // mundo fisico de cannon.js..
export var timeStep = 1 / 60;        // tiempo que dura un frame..

// variables para el sistema de tocoSuelo..
export var upVector = new CANNON.Vec3(0, 1, 0);
export var contactNormal = new CANNON.Vec3(0, 0, 0);
export var _3div_requestIsGrounded = [];

export const TYPE_BOX = 18;
export const TYPE_SPHERE = 19;
export const TYPE_PLANE = 20;
export const TYPE_CYLINDER = 21;

export let keyCode = undefined;
export const _UP = 38;
export const _DOWN = 40;
export const _LEFT = 37;
export const _RIGHT = 39;
export const _ENTER = 13;
export const _ESC = 27;
export const _SPACE = 32;
export const _SHIFT = 16;
export const _CONTROL = 17;
export const _BLOCK_SHIFT = 20;
export const _TAB = 9;
export const _Q = 81;
export const _W = 87;
export const _E = 69;
export const _R = 82;
export const _T = 84;
export const _Y = 89;
export const _U = 85;
export const _I = 73;
export const _O = 79;
export const _P = 80;
export const _A = 65;
export const _S = 83;
export const _D = 68;
export const _F = 70;
export const _G = 71;
export const _H = 72;
export const _J = 74;
export const _K = 75;
export const _L = 76;
export const _Ñ = 192;
export const _Z = 90;
export const _X = 88;
export const _C = 67;
export const _V = 86;
export const _B = 66;
export const _N = 78;
export const _M = 77;
export const _COMA = 188;
export const _PUNTO = 190;
export const _GUION = 189;
export const _1 = 49;
export const _2 = 50;
export const _3 = 51;
export const _4 = 52;
export const _5 = 53;
export const _6 = 54;
export const _7 = 55;
export const _8 = 56;
export const _9 = 57;
export const _0 = 48;
export const _DELETE = 46;
export const _END = 35;
export const _PAGEDOWN = 34;

export var GLZ_KEYBOARD;
export var keyboard_buffer = "";
export var keys = [256];
export const GLZ_KEYBOARD_NORMAL_KEY_TYPE = "_TYPE_GLZ_KEYBOARD_NORMAL_KEY_";
export const GLZ_KEYBOARD_SPECIAL_KEY_TYPE = "_TYPE_GLZ_KEYBOARD_SPECIAL_KEY_";
export let glz_sound_master_volume = 1;
let _clock_ = new THREE.Clock();    // reloj interno para animaciones..
let _delta_;                        // delta time del frame..

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

export let Vector2 = THREE.Vector2;
export let Vector3 = THREE.Vector3;
export let Raycaster = THREE.Raycaster;

let _world_gravity_ = undefined;

let glz_initial_value_camera_position_x = 0;
let glz_initial_value_camera_position_y = 0;
let glz_initial_value_camera_position_z = 0;

export const TYPE_CUBEMAP = 15;
export const TYPE_PANORAMA = 16;

//----------------------------------------------------------------------------------
export function millis() {
    return performance.now();
}
//==================================================================================
//----------------------------------------------------------------------------------
export function setTitle(title) {
    document.title = title;
}
//----------------------------------------------------------------------------------
export function abs(num) {
    return Math.abs(num);
}
//-------
export function sin(num) {
    return Math.sin(num);
}
//-------
export function cos(num) {
    return Math.cos(num);
}
//-------
export function rand(min, max) {
    if (arguments.length == 1) {
        return Math.random() * min;
    } else if (arguments.length == 2) {
        return (Math.random() * (max - min)) + min;
    }
}
//-------
export function randInt(low, high) {
    if (arguments.length == 1) {
        high = low;
        low = 0;
        return low + Math.floor(Math.random() * (high - low + 1));
    } else {
        return low + Math.floor(Math.random() * (high - low + 1));
    }

}
//-------
export function random(min, max) {
    if (arguments.length == 1) {
        return Math.random() * min;
    } else if (arguments.length == 2) {
        return (Math.random() * (max - min)) + min;
    }
}
//-------
// Convert from degrees to radians.
export function radians(degrees) {
    return degrees * Math.PI / 180;
}
//-------
// Convert from radians to degrees.
export function degrees(radians) {
    return radians * 180 / Math.PI;
}
//-------
export function method(codeToExecute, param = undefined) {
    //var tmpFunc = new Function(codeToExecute);
    //tmpFunc();
    if (param != undefined) {
        window[codeToExecute](param);
    } else {
        window[codeToExecute]();
    }
}
//-------
export function str(number) {
    return number.toString();
}
//-------
export function int(floatvalue) {
    return Math.floor(floatvalue);
}
//-------
export function isInteger(value) {
    //return Number.isInteger(value);
    return Number(value) === value && value % 1 === 0;
}
export function isFloat(value) {
    return Number(value) === value && value % 1 !== 0;
}
export function isNumber(value) {
    if (isInteger(value) || isFloat(value)) {
        return true;
    }
    return false;
}
//-------
// str 2 boolean!
export function parseBoolean(value) {
    return (value === "true");
}
export function parseFloat(value) {
    return window.parseFloat(value);
}
export function parseInt(value) {
    return window.parseInt(value);
}
//-------
export function setGravity(x = 0, y = 0, z = 0) {
    if (world == undefined) {
        _world_gravity_ = new Vector3();
        _world_gravity_.x = x;
        _world_gravity_.y = y;
        _world_gravity_.z = z;
    } else {
        world.gravity.set(x, y, z);
    }
}
//-------
//-------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
export function setAmbientLight(color, intensidad) {
    setAmbientLightColor(color);
    setAmbientLightIntensity(intensidad);
}
export function setAmbientLightColor(value) {
    if (_4div_light_ambient_) {
        _4div_light_ambient_color_ = value;
        _4div_light_ambient_.color.setHex(value);
    } else {
        _4div_light_ambient_color_ = value;
    }
}
export function setAmbientLightIntensity(value) {
    if (_4div_light_ambient_) {
        _4div_light_ambient_.intensity = value;
    } else {
        _4div_light_ambient_intensity_ = value;
    }
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
export function setFps(value) {
    app.ticker.maxFPS = value;
}
export function getFps() {
    return app.ticker.maxFPS;
}
//-------
export function enableShadows(value) {
    three_renderer_use_shadows = value;
}
//-------
export function setBackgroundColor(value) {
    backgroundColor = value;
}
//-------
export function setFadingColor(value) {
    fadingColor = value;
}
//-------
export function setMode(width_, height_, fullscreen_, screen_filter_) {
    app = new PIXI.Application({ width: width_, height: height_, antialias: screen_filter_ });
    _4div_fullscreen = fullscreen_;
    _4div_screen_filter = screen_filter_;
    WIDTH = width_;
    HEIGHT = height_;
    app.stage.sortableChildren = true;
    if (_4div_screen_filter) {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
        PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.LINEAR;
        PIXI.BaseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    } else {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
        PIXI.BaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    }
    document.body.appendChild(app.view);
}
//-------
window.requestFullScreen = function () {
    if (_4div_fullscreen) {
        var el = document.body;
        // Supports most browsers and their versions.
        var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (requestMethod) {
            // Native full screen.
            requestMethod.call(el);
        }
    }
}
//-------
export function setFog(near, far) {
    fog = new THREE.Fog(backgroundColor, near, far);
    needFogUpdate = true;
}
export function getFog() {
    return fog;
}
//-------
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
//-------
export function fadeOn(time_) {
    fading = true;
    fadingType = -1;
    var fadingFramesLeft = Math.floor((time_ * 60) / 1000);
    deltaFading = (1.0 / fadingFramesLeft);
    if (time_ == 0) {
        _fade_instantaneo_();
    }
    //console.log(fadingFramesLeft, deltaFading, alphaFading); 
}
//-------
export function fadeOff(time_) {
    fading = true;
    fadingType = 1;
    var fadingFramesLeft = Math.floor((time_ * 60) / 1000);
    deltaFading = (1.0 / fadingFramesLeft);
    if (time_ == 0) {
        _fade_instantaneo_();
    }
    //console.log(alphaFading, deltaFading, fading);
}
//-------
//-------
export class GameObject {
    constructor() {
        this.graph;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.oldx = 0;
        this.oldy = 0;
        this.oldz = 0;
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

        // animacion 3d..
        this.mixer = undefined;
        this.mixerClips = [];
        this.selectedClip = undefined;
        this.offset_mesh_y = 0;         // si un modelo 3d no esta centrado, con este parametro podemos centrarlo a su collider..

        this.clipSwitchAvailable = true;    // en false estamos esperando el fin de una transicion de animacion.. no se puede cambiar hasta true..

        this._collisionMouse = false;

    }
    //-------
    getClassName() {
        return this.constructor.name;
    }
    //-------
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
        this.oldz = this.z;

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
                this.mesh.position.y += this.offset_mesh_y;
                this.angle = this.body.quaternion.z;
                this.anglex = this.body.quaternion.x;
                this.angley = this.body.quaternion.y;
                this.x = this.body.position.x;
                this.y = this.body.position.y;
                this.z = this.body.position.z;
            } else {
                if (this.mesh.type == "Sprite") {
                    this.mesh.material.rotation = radians(this.angle);
                } else {
                    this.mesh.rotation.set(radians(this.anglex), radians(this.angley), radians(this.angle));
                }
            }

            if (this.mixer) {
                this.mixer.update(_delta_);
            }

            if (this.model == false) {
                this.material.opacity = this.alpha;
            }
        }
    }
    //-------
    collisionMouse() {
        return this._collisionMouse;
    }
    //============================================================
    createSprite(img_) {
        this.disposeMesh();
        this.model = false;
        let texture;
        if (img_ instanceof THREE.Texture) {
            texture = img_;
        } else if (img_ instanceof PIXI.Texture) {
            texture = new THREE.TextureLoader().load(img_.textureCacheIds[0]);  // uso normbre de archivo guardado en textura de pixi..
        } else {
            texture = new THREE.TextureLoader().load(img_); // uso nombre de archivo directamente..
        }
        //texture = new THREE.TextureLoader().load(img_);
        this.material = new THREE.SpriteMaterial({ map: texture, color: WHITE });
        this.mesh = new THREE.Sprite(this.material);
        this.mesh.id_ = this.id;
        this.mesh.renderOrder = 1;
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createBox(width = 1, height = 1, depth = 1, wparts = 1, hparts = 1, dparts = 1) {
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
        this.model = false;
        this.geometry = new THREE.PlaneGeometry(width_, depht_, wparts, dparts);
        if (this.material == undefined) {
            this.material = new THREE.MeshNormalMaterial();
        }
        this.material.side = THREE.DoubleSide;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = this.visible;
        this.mesh.updateMatrix();
        this.mesh.id_ = this.id;
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    disposeMesh() {
        if (this.mesh != undefined) {
            if (this.model) {
                removeObject3D(this.mesh);
            } else {
                this.mesh.geometry.dispose();
                this.mesh.material.dispose();
            }
            scene.remove(this.mesh);
        }
    }
    //------------------------------------------------------------
    createSphere(radius = 1, detail = 10) {
        this.disposeMesh();
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
        this.disposeMesh();
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
        //this.mesh.name = "cylinder";    // este tiene nombre para saber que es u cilindro y alinear el quaternion en su draw.. three y cannon orientan diferente a los cylinder en Z..
        scene.add(this.mesh);
    }
    //------------------------------------------------------------
    createTorus(radius, weight, detail = 10) {
        this.disposeMesh();
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
        this.disposeMesh();
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
    getBoundingBox() {
        if (this.mesh == undefined) return;
        return new THREE.Box3().setFromObject(this.mesh);
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
                {
                    let texture;
                    if (col instanceof THREE.Texture) {
                        texture = col;
                    } else if (col instanceof PIXI.Texture) {
                        texture = new THREE.TextureLoader().load(col.textureCacheIds[0]);  // uso normbre de archivo guardado en textura de pixi..
                    } else {
                        texture = new THREE.TextureLoader().load(col); // uso nombre de archivo directamente..
                    }
                    if (texture_repeat == true) {
                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(repeat_divisions, repeat_divisions);
                    }
                    this.material = new THREE.MeshPhongMaterial({
                        map: texture,
                        transparent: true,
                        //specular: 0xffffff,
                        //shininess: 30,
                    });
                    this.material.transparent = true;
                }
                break;
        }
        //this.material.transparent = true;   // para activar el alpha de los procesos en las primitivas 3d..
        return this.material;
    }
    //------------------------------------------------------------
    setNormalMaterial(texture_normal) {
        if (this.material == undefined) {
            console.log("setNormalMaterial() -> ERROR: this.material is undefined!");
            return;
        }
        let texture = undefined;
        if (texture_normal instanceof THREE.Texture) {
            texture = texture_normal;
        } else if (texture_normal instanceof PIXI.Texture) {
            texture = new THREE.TextureLoader().load(texture_normal.textureCacheIds[0]);  // uso normbre de archivo guardado en textura de pixi..
        } else {
            texture = new THREE.TextureLoader().load(texture_normal); // uso nombre de archivo directamente..

        }
        this.material.normalMap = texture;
        //this.material.normalScale.set(2, 2);
        this.material.needsUpdate = true;
    }
    setNormalMaterialScale(x, y) {
        this.material.normalScale.set(x, y);
        this.material.needsUpdate = true;
    }
    //------------------------------------------------------------
    setTextureOffet(off_x, off_y) {
        if (this.material.map != undefined) {
            this.material.map.offset.set(off_x, off_y);
        }
    }
    //------------------------------------------------------------
    lookAt() {
        console.log("TO DO");
    }
    //------------------------------------------------------------
    onScreen() {
        if (this.graph != undefined) {
            if (this.x > 0 && this.x < WIDTH && this.y > 0 && this.y < HEIGHT) {
                return true;
            }
        }
        if (this.mesh != undefined) {
            const frustum = new THREE.Frustum();
            const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
            frustum.setFromProjectionMatrix(matrix);
            if (!frustum.containsPoint(this.mesh.position)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
    //------------------------------------------------------------
    worldToScreen(pos = undefined) {
        var position = new THREE.Vector3();
        if (pos == undefined) {
            position.x = this.x;
            position.y = this.y;
            position.z = this.z;
        } else {
            if (pos instanceof THREE.Vector3) {
                position = pos;
            } else {
                console.error("ERROR: Parameter isn´t a THREE.Vector3() object!");
                return undefined;
            }
        }

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
            world.removeBody(this.body);
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
                {
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
                    /*
                    if (this.mesh.name == "cylinder") {
                        var quat = new CANNON.Quaternion();
                        quat.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
                        var translation = new CANNON.Vec3(0, 0, 0);
                        this.body.shapes[0].transformAllPoints(translation, quat);
                    }
                    */
                    world.addBody(this.body);
                }
                break;

            // BOX TYPE..
            case TYPE_BOX:
                {
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
                }
                break;

            // SPHERE TYPE..
            case TYPE_SPHERE:
                {
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
                            this.radius = this.mesh.geometry.parameters.radius;
                            radius_ = this.radius * this.size;
                            if (radius_ === 0) {
                                console.log("Warning!, radius = 0.. createSphere() ??");
                                radius_ = 1;
                            }
                        }
                    }

                    let shape = new CANNON.Sphere(radius_);
                    let masa = ((4 / 3) * Math.PI * radius_ * radius_ * radius_) / 10000;
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
                }
                break;

            // PLANE TYPE..
            case TYPE_PLANE:
                {
                    if (this.model) {
                        console.log("ERROR: only primitives 3d are available to build plane collider!");
                        return;
                    }

                    if (this.sizex != 1 || this.sizey != 1 || this.sizez != 1) {
                        width_ = this.mesh.geometry.parameters.width * this.sizex;
                        height_ = this.mesh.geometry.parameters.height * this.sizey;
                        depth_ = this.mesh.geometry.parameters.depth * this.sizez;
                    } else {
                        width_ = this.mesh.geometry.parameters.width * this.size;
                        height_ = this.mesh.geometry.parameters.height * this.size;
                        depth_ = this.mesh.geometry.parameters.depth * this.size;
                    }
                    //let shape = new CANNON.Box(new CANNON.Vec3(width_ / 2, height_, depth_ / 2));
                    let shape = new CANNON.Box(new CANNON.Vec3(width_ / 2, height_ / 2, 0.001));
                    let masa = 0;
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
                }
                break;
        }
    }
    //------------------------------------------------------------
    setEventCollisionStart(function_name) {

        //this.body.isTrigger = true;
        this.body.addEventListener('collide', (event) => {
            window[function_name](event);
        });
    }
    setEventCollisionEnd(function_name) {
        //this.body.isTrigger = true;
        this.body.addEventListener('endContact', (event) => {
            window[function_name](event);
        });
    }
    //------------------------------------------------------------
    setSensor(value) {
        if (this.body == undefined) return;
        this.body.isTrigger = value;
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
    addVx(imp) {
        var impulse = new CANNON.Vec3(imp, 0, 0);
        this.body.applyImpulse(impulse, this.mesh.position.clone());
    }
    //---------------------------------------------------------
    addVy(imp) {
        var impulse = new CANNON.Vec3(0, imp, 0);
        this.body.applyImpulse(impulse, this.mesh.position.clone());
    }
    //---------------------------------------------------------
    addVz(imp) {
        var impulse = new CANNON.Vec3(0, 0, imp);
        this.body.applyImpulse(impulse, this.mesh.position.clone());
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
    removeGroundControl(id = this) {
        if (id !== undefined) {
            for (let i = 0; i < _3div_requestIsGrounded.length; i++) {
                if (_3div_requestIsGrounded[i] === id.body) {
                    _3div_requestIsGrounded.splice(i, 1);
                }
            }
        } else {
            for (let i = 0; i < _3div_requestIsGrounded.length; i++) {
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
        let t = undefined;
        if (typeof texture === 'string' || texture instanceof String) {
            t = loadTexture(texture);
            texture = t;
        }
        this.mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                //if (child.material.map != undefined) {
                child.material.map = texture;
                child.material.needsUpdate = true;
                //}
            }
        });
    }
    //------------------------------------------------------------
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
        this.mesh = SkeletonUtils.clone(model);

        this.mesh.animations = [];
        if (model.animations) {
            for (let i = 0; i < model.animations.length; i++) {       // fucking clone animas..
                this.mesh.animations.push(model.animations[i]);
            }
        }

        this.mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone();
            }
        });

        for (let i = 0; i < this.mesh.animations.length; i++) {
            this.mesh.animations[i].clampWhenFinished = true;
        }

        // crear clips para el mixer local..
        for (let i = 0; i < this.mesh.animations.length; i++) {
            if (this.mixer == undefined) {
                this.mixer = new THREE.AnimationMixer(this.mesh);
            }
            let clip = this.mixer.clipAction(this.mesh.animations[i]);
            this.clip.clampWhenFinished = true;
            this.clip.repetitions = Infinity;
            this.mixerClips.push(clip);
        }

        this.mesh.updateMatrix();
        this.mesh.id_ = this.id;
        this.draw();                // translate/scale/rotate before add to world..
        scene.add(this.mesh);
    }
    //-------
    //-------
    /*
    setModel_(model) {

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
        this.mesh = SkeletonUtils.clone(model);

        this.mesh.animations = [];
        if (model.animations) {
            for (let i = 0; i < model.animations.length; i++) {       // fucking clone animas..
                this.mesh.animations.push(model.animations[i]);
            }
        }
        this.mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone();
            }
        });
        for (let i = 0; i < this.mesh.animations.length; i++) {
            this.mesh.animations[i].clampWhenFinished = true;
        }

        // crear clips para el mixer local..
        for (let i = 0; i < this.mesh.animations.length; i++) {
            if (this.mixer == undefined) {
                this.mixer = new THREE.AnimationMixer(this.mesh);
            }
            let clip = this.mixer.clipAction(this.mesh.animations[i]);
            this.clip.clampWhenFinished = true;
            this.clip.repetitions = Infinity;
            this.mixerClips.push(clip);
        }

        this.mesh.updateMatrix();
        this.mesh.id_ = this.id;
        this.draw();                // translate/scale/rotate before add to world..
        scene.add(this.mesh);
    }
    */
    //-------
    clipSet(num) {
        this.selectedClip = num;
    }
    //-------
    clipPlay(repetitions = Infinity) {
        this.mixerClips[this.selectedClip].repetitions = repetitions;
        this.mixerClips[this.selectedClip].play();
    }
    //-------
    clipStop() {
        this.mixerClips[this.selectedClip].stop();
    }
    //-------
    clipSwitch(num, time_ms = 500, repetitions = Infinity) {
        if (num == this.selectedClip) return;
        if (this.clipSwitchAvailable == false) return;
        this.mixerClips[num].fadeIn(time_ms / 1000);
        this.mixerClips[num].play();
        this.mixerClips[this.selectedClip].fadeOut(time_ms / 1000);
        let sc = this.selectedClip; // valor del clip a parar..
        let a = this;               // puntero a este objeto..
        setTimeout(function () {
            a.mixerClips[sc].stop();
            a.clipSwitchAvailable = true;
        }, time_ms);
        this.clipSwitchAvailable = false;
        this.selectedClip = num;
    }
    //-------
    clipIsPlaying() {
        if (this.mixerClips[this.selectedClip] !== undefined) {
            return this.mixerClips[this.selectedClip].isRunning();
        } else {
            return false;
        }
    }
    //-------
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
            this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.x, this.y, this.z));
        }
    }
    createTexture(w, h, col) {
        // crea una textura para luego crear un sprite con ella..
        var gr = new PIXI.Graphics();
        gr.beginFill(col);
        gr.lineStyle(0);
        gr.drawRect(0, 0, w, h);
        gr.endFill();
        var texture = app.renderer.generateTexture(gr);
        return texture;
    }
    setGraph(texture) {
        // crea un sprite apartir de una textura cargada de un archivo o creada con createTexture()..
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
        this.graph = undefined;
        let tex = this.createTexture(w, h, WHITE);
        this.setGraph(tex);
    }
    clearGraph() {
        if (this.graph !== undefined) {
            app.stage.removeChild(this.graph);
            this.graph = undefined;
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
    distance3dTo(proc) {
        var dx = Math.abs(proc.x - this.x);
        var dy = Math.abs(proc.y - this.y);
        var dz = Math.abs(proc.z - this.z);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    distance2dTo(proc) {
        var dx = Math.abs(proc.x - this.x);
        var dy = Math.abs(proc.y - this.y);
        return Math.sqrt(dx * dx + dy * dy);
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
        let ox;
        let oy;
        if (this.newgraph_created == true) {
            ox = this.x - this._w / 2;
            oy = this.y - this._h / 2;
        } else {
            ox = this.x - w / 2;
            oy = this.y - h / 2;
        }

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
        let width;
        let height;
        let xmin;
        let xmax;
        let ymin;
        let ymax;
        if (this.newgraph_created === true) {
            width = this._w;
            height = this._h;
        } else {
            width = this.graph.texture.baseTexture.width;
            height = this.graph.texture.baseTexture.height;
        }
        if (this._scene != undefined) {
            xmin = this.sx - (width / 2) * this.size;
            xmax = this.sx + (width / 2) * this.size;
            ymin = this.sy - (height / 2) * this.size;
            ymax = this.sy + (height / 2) * this.size;
        } else {
            xmin = this.x - (width / 2) * this.size;
            xmax = this.x + (width / 2) * this.size;
            ymin = this.y - (height / 2) * this.size;
            ymax = this.y + (height / 2) * this.size;
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
    getTouchId() {
        return this.touch_id;
    }
    touchPersists() {
        if (this.touch_id == undefined) return false;
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
        let dx;
        let dy;
        if (arguments.length == 1) {
            dx = this.x - p1.x;
            dy = this.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        } else if (arguments.length == 2) {
            dx = this.x - p1;
            dy = this.y - p2;
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
    getType() {
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
//-------
export function getDistance2d(fromX, fromY, toX, toY) {
    var dX = Math.abs(fromX - toX);
    var dY = Math.abs(fromY - toY);
    return Math.sqrt((dX * dX) + (dY * dY));
}
//-------
export function getDistance(p1, p2) {
    var dx = Math.abs(p1.x - p2.x);
    var dy = Math.abs(p1.y - p2.y);
    var dz = Math.abs(p1.z - p2.z);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
//-------
export function getAngle(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return -degrees(Math.atan2(dy, dx));
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//-------
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

        this.initTouchEvent = false;    // se pone a true cuando se toca el touch screen..
        // esta variable sirve para evitar el salto de mouse cuando se inicia un touch..
        // espacialmente para el control tactil de la camara 3d..

        for (var i = 0; i < 13; i++) {
            this.points.push({ active: false, x: 0, y: 0 });
        }
        this.raycaster = new THREE.Raycaster();
        this.intersects = [];
        this.position = new THREE.Vector2();
        this.movementX = 0;
        this.movementY = 0;

        this.eventStartName = undefined;
        this.eventEndName = undefined;

        this.gameObject_collision = false;

    }
    initialize() {
    }
    isOverSprite() {
        return this.gameObject_collision;
    }
    frame() {
        if (this.oldX === this.x && this.oldY === this.y) {
            this.moved = false;
        } else {
            if (this.initTouchEvent) {
                this.initTouchEvent = false;
            } else {
                this.moved = true;
                this.movementX = this.x - this.oldX;
                this.movementY = this.y - this.oldY;
            }

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
    setEventStart(eventName) {
        this.eventStartName = eventName;
    }
    setEventEnd(eventName) {
        this.eventEndName = eventName;
    }
    /*
    getTouchPointIntersects(event) {
        let pos = new THREE.Vector2();
        let ray = new THREE.Raycaster();
        pos.x = (event.x / WIDTH) * 2 - 1;
        pos.y = - (event.y / HEIGHT) * 2 + 1;
        this.raycaster.setFromCamera(pos, camera);
        return ray.intersectObjects(scene.children, true);
    }
    */
    setPoint(index, active, x_, y_) {
        var finalx = (x_ * WIDTH) / window.innerWidth;
        var finaly = (y_ * HEIGHT) / window.innerHeight;

        if (this.points[index].active) {
            if (this.eventEndName != undefined)
                if (active == false) method(this.eventEndName, { id: index, x: finalx, y: finaly });
        } else {
            if (this.eventStartName != undefined)
                if (active == true) method(this.eventStartName, { id: index, x: finalx, y: finaly });
        }

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
//==================================================================================
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//==================================================================================
window.onload = function () {
    window.addEventListener("resize", resizeGame);
    window.setup();

    resizeGame();
    window.Waud.init();
    window.Waud.autoMute();

    initTouch();
    mouse = new Mouse();
    signal(mouse, s_protected);

    app.ticker.add(_main_core_);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.001, 1000);
    camera.position.x = glz_initial_value_camera_position_x;
    camera.position.y = glz_initial_value_camera_position_y;
    camera.position.z = glz_initial_value_camera_position_z;
    camera.lookAt(scene.position);

    camera_target = new THREE.Object3D();
    scene.add(camera_target);

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

    var gr = new PIXI.Graphics();
    gr.beginFill(fadingColor);
    gr.lineStyle(2);
    gr.drawRect(0, 0, WIDTH, HEIGHT);
    gr.endFill();
    var texture = app.renderer.generateTexture(gr);
    fadeRect = PIXI.Sprite.from(texture);
    fadeRect.alpha = 0;
    fadeRect.zIndex = fadingRect_z;        // cuanto mas alto mas delante se pintara..
    app.stage.addChild(fadeRect);

    _4div_light_ambient_ = new THREE.AmbientLight(_4div_light_ambient_color_, _4div_light_ambient_intensity_);
    scene.add(_4div_light_ambient_);

    if (_4div_screen_filter) {
        THREE_TEXTURE = PIXI.BaseTexture.from(renderer.domElement, PIXI.SCALE_MODES.LINEAR);
    } else {
        THREE_TEXTURE = PIXI.BaseTexture.from(renderer.domElement, PIXI.SCALE_MODES.NEAREST);
    }
    var THREE_SPRITE = new PIXI.Sprite.from(new PIXI.Texture(THREE_TEXTURE));
    app.stage.addChild(THREE_SPRITE);

    initCannon();
    glz_wakeLock();
    console.log("Page loaded!");

}
//-------
function initCannon() {

    world = new CANNON.World();
    if (_world_gravity_ == undefined) {
        world.gravity.set(0, 0, 0);
    } else {
        world.gravity.set(_world_gravity_.x, _world_gravity_.y, _world_gravity_.z);
    }
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
//-------
//-------
function resizeGame() {
    const canvas = document.getElementById("myCanvas2d");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    app.renderer.view.style.width = canvas.width + 'px';
    app.renderer.view.style.height = canvas.height + 'px';

}
//-------
//-------
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
//-------
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
//-------
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

    let x = (mouse.canvas_x * WIDTH) / window.innerWidth;
    let y = (mouse.canvas_y * HEIGHT) / window.innerHeight;
    for (let i = 0; i < gameObjects.length; i++) {
        if (collisionCircleToGameObject(x, y, gameObjects[i])) {
            mouse.gameObject_collision = true;   // mouse intersect with gameObject graph..
            gameObjects[i]._collisionMouse = true;
        }
    }

}
//-------
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

    mouse.gameObject_collision = false;
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i]._collisionMouse = false;
    }
}
//-------
function handleMouseMove(event) {
    event.preventDefault();
    mouse.canvas_x = event.clientX;
    mouse.canvas_y = event.clientY;
    mouse.updateMousePointsPosition(event.clientX, event.clientY);
}
//-------
function handleStart(event) {
    event.preventDefault();
    mouse.initTouchEvent = true;
    mouse.left = true;
    mouse.canvas_x = event.touches[0].clientX;
    mouse.canvas_y = event.touches[0].clientY;
    mouse.touches = event.touches;
    for (var i = 0; i < event.changedTouches.length; i++) {
        mouse.setPoint(event.changedTouches[i].identifier, true, event.changedTouches[i].clientX, event.changedTouches[i].clientY);
    }

}
//-------
function handleEnd(event) {
    event.preventDefault();
    window.requestFullScreen();
    mouse.left = false;
    mouse.touches = event.touches;
    for (var i = 0; i < event.changedTouches.length; i++) {
        mouse.setPoint(event.changedTouches[i].identifier, false, 0, 0);
    }
}
//-------
function handleMove(event) {
    event.preventDefault();
    mouse.canvas_x = event.touches[0].clientX;
    mouse.canvas_y = event.touches[0].clientY;
    mouse.touches = event.touches;
    for (var i = 0; i < event.changedTouches.length; i++) {
        mouse.setPoint(event.changedTouches[i].identifier, true, event.changedTouches[i].clientX, event.changedTouches[i].clientY);
    }
    //const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    //const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    //mouse.setMovementXY(movementX, movementY);
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
document.onkeydown = function (e) {
    keyCode = e.keyCode;
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
export function key(keyCode) {
    return keys[keyCode];
}
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//-------
export function textInfo(font, size, text) {
    let fnt = font;
    if (font === null) {
        fnt = 'fnt';
    } else {
        if (font != 'fnt') {
            fnt = font.family;
        }
    }
    const style = new PIXI.TextStyle({
        fontFamily: fnt,
        fontSize: size,
        fill: 0xff1010,
        align: 'center',
    });
    return PIXI.TextMetrics.measureText(text, style);
}
//-------
export class Write extends GameObject {
    constructor(font, size, text, align, x, y, color = WHITE, alpha = 1) {
        super();
        if (font == null) {
            this.font = 'fnt';
        } else {
            this.font = font.family;
        }
        this.textSizePoints = size;
        this.textSize = size + 'px';
        //this.size = size;
        this.text = text;
        this.align = align;
        this.x = x;
        this.y = y;
        this.color = color;
        this.alpha = alpha;
        this.visible = true;

        if (exists(this.father)) {
            this.z = this.father.z + 1;
        }
        if (this.font == undefined) {
            this.font = 'fnt';
        }
        this.style = undefined;
        this.idText = new PIXI.Text(text);
        this.idText.style.fontSize = this.textSize;
        this.idText.style.fontFamily = this.font;

        if (_4div_screen_filter) {
            this.idText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        } else {
            this.idText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        }
        this._align();
        app.stage.addChild(this.idText);
    }
    setFnt(fnt) {
        this.font = fnt;
    }
    initialize() {
        if (this.style === undefined) {
            // ..
        }
    }
    _align() {
        if (this.style === undefined) {
            this.idText.style.fill = this.color;
            this.idText.style.fontSize = this.textSize;
            //this.idText.style.fontFamily = 'fnt';
            this.idText.style.fontFamily = this.font;
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
    frame() {
        this.idText.x = this.x;
        this.idText.y = this.y;
        this.idText.zIndex = this.z;
        this.idText.alpha = this.alpha;
        this.idText.text = this.text;
        this.textSize = this.textSizePoints + 'px';
        this.idText.anchor.x = this._cx;
        this.idText.anchor.y = this._cy;
        this.idText.rotation = -radians(this.angle);
        this.idText.visible = this.visible;

        this._align();


        if (this.sizex === 1 && this.sizey === 1) {
            if (this.mirrorx == true) {
                this.idText.scale.x = -this.size;
            } else {
                this.idText.scale.x = this.size;
            }
            if (this.mirrory == true) {
                this.idText.scale.y = -this.size;
            } else {
                this.idText.scale.y = this.size;
            }

        } else {
            if (this.mirrorx == true) {
                this.idText.scale.x = -this.sizex;
            } else {
                this.idText.scale.x = this.sizex;
            }
            if (this.mirrory == true) {
                this.idText.scale.y = -this.sizey;
            } else {
                this.idText.scale.y = this.sizey;
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
    setSize(size) {
        this.textSizePoints = size;
        this.textSize = this.textSizePoints + 'px';
    }
    getWidth() {
        return this.idText.width;
    }
    getHeight() {
        //console.log(this.idText);
        return this.idText.height;
    }
}
//-------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
export class Scroll extends GameObject {
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
export class StringList {
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
        //let shuffledArray = this.data.sort((a, b) => 0.5 - Math.random()); exlint se queja de a,b..
        let shuffledArray = this.data.sort(() => 0.5 - Math.random());
        this.data = shuffledArray;
    }
    clear() {
        this.data = [];
    }
    reverse() {
        this.data.reverse();
    }
}
//-------
window.NULL_event = function () {
    console.warn("WARNING: This widget has not configured event!");
}
//----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
export function rgb(r, g, b) {
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
//-------
export function rgba(r, g, b, a) {
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
//-------
export function RGBToHex(r, g, b) {
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
//-------
export function hexToRgb(hex_) {
    // formato "0xrrggbb";
    let hex = Math.floor(hex_);
    var r = (hex >> 16 & 255) / 255;
    var g = (hex >> 8 & 255) / 255;
    var b = (hex & 255) / 255;
    return [r, g, b];
}
//-------
export function RGBAToHex(r, g, b, a) {
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
//-------
export function arrayToHex(color) {
    return RGBToHex(color[0], color[1], color[2]);
}
//-------
export function color(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    return "0x" + r + g + b;
}
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
export class JoyStick extends GameObject {
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

                    this.joySticK = new GameObject();
                    this.joySticK.x = this.touchX;
                    this.joySticK.y = this.touchY;
                    this.st = 30;
                } else {
                    // ..
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
//=================================================================================
//---------------------------------------------------------------------------------
export function map(value, istart, istop, ostart, ostop, clip_to_output_limits) {
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
//=================================================================================
//---------------------------------------------------------------------------------
export function screenDrawGraphic(img_, x, y, angle, sizeX, sizeY, alpha) {
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
//-------
export function screenDrawSprite(texture_path, x = 0, y = 0, z = 0, anglex = 0, angley = 0, anglez = 0, size = 1) {
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
//-------
//-------
//-------
//-------
//-------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
//-------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
window.EVENT_Teclado_teclaEspecial_return = function () {
    GLZ_KEYBOARD.onClick_teclaEspecial("return");
}
//-------
window.EVENT_Teclado_teclaEspecial_123 = function () {
    GLZ_KEYBOARD.onClick_teclaEspecial("123");
}
//-------
window.EVENT_Teclado_teclaEspecial_del = function () {
    GLZ_KEYBOARD.onClick_teclaEspecial("del");
}
//-------
window.EVENT_Teclado_teclaEspecial_mays = function () {
    GLZ_KEYBOARD.onClick_teclaEspecial("mays");
}
//-------
window.EVENT_Teclado_tecla = function () {
    GLZ_KEYBOARD.onClick_key(_id_.label.text);
}
//-------
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
        this.eventName = "";
    }
    setEvent(eventName) {
        this.eventName = eventName;
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
                if (this.input_controller != undefined) {
                    this.input_controller.setText(this.buffer);
                }
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
                {
                    //this.size = WIDTH / this.img[6].width;
                    this.sizex = WIDTH / this.img[6].width;
                    this.sizey = HEIGHT / this.img[6].height;
                    this.x = WIDTH / 2;
                    this.y = HEIGHT - (this.img[6].height * this.sizey) / 2;
                    this.setGraph(this.img[6]);
                    let pos = this.getRealPoint(10, 23);
                    this.idText = new Write(null, 30 * this.size, this.buffer, RIGHT, pos.x, pos.y, BLACK, 1);
                    this.st = 20;
                }
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
            let b = new EGUIgbutton(this.img[2], vec.x, vec.y, this.sizex, this.sizey);
            b.z = this.z + 1;
            b.setLabel(null, this.textKeysSize, this.keys_lower[i], CENTER, 0, 0, BLACK);
            b.setEvent("EVENT_Teclado_tecla");
            b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
        }
        //-------------------------------------------------------
        yy = 127;
        for (let i = 0; i < xx.length; i++) {
            let vec = this.getRealPoint(xx[i], yy);
            let b = new EGUIgbutton(this.img[2], vec.x, vec.y, this.sizex, this.sizey);
            b.z = this.z + 1;
            b.setLabel(null, this.textKeysSize, this.keys_lower[xx.length + i], CENTER, 0, 0, BLACK);
            b.setEvent("EVENT_Teclado_tecla");
            b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
        }
        //-------------------------------------------------------
        xx = [75, 113, 151, 188, 225, 262, 299];
        yy = 181;
        for (let i = 0; i < xx.length; i++) {
            let vec = this.getRealPoint(xx[i], yy);
            let b = new EGUIgbutton(this.img[2], vec.x, vec.y, this.sizex, this.sizey);
            b.z = this.z + 1;
            b.setLabel(null, this.textKeysSize, this.keys_lower[20 + i], CENTER, 0, 0, BLACK);
            b.setEvent("EVENT_Teclado_tecla");
            b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
        }
        //-------------------------------------------------------
        let vec = this.getRealPoint(187, 235);
        let b = new EGUIgbutton(this.img[4], vec.x, vec.y, this.sizex, this.sizey);
        b.z = this.z + 1;
        b.setLabel(null, this.textKeysSize, " space ", CENTER, 0, 0, BLACK);
        b.setEvent("EVENT_Teclado_tecla");
        b.setType(GLZ_KEYBOARD_NORMAL_KEY_TYPE);
    }
    makeSpecialKeys() {
        let vec;
        let b;
        vec = this.getRealPoint(24, 181);
        b = new EGUIgbutton(this.img[0], vec.x, vec.y, this.sizex, this.sizey);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_mays");
        vec = this.getRealPoint(350, 181);
        b = new EGUIgbutton(this.img[7], vec.x, vec.y, this.sizex, this.sizey);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_del");
        vec = this.getRealPoint(24, 235);
        b = new EGUIgbutton(this.img[1], vec.x, vec.y, this.sizex, this.sizey);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_123");
        vec = this.getRealPoint(72, 235);
        b = new EGUIgbutton(this.img[3], vec.x, vec.y, this.sizex, this.sizey);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;

        vec = this.getRealPoint(328, 235);
        b = new EGUIgbutton(this.img[8], vec.x, vec.y, this.sizex, this.sizey);
        b.setType(GLZ_KEYBOARD_SPECIAL_KEY_TYPE);
        b.z = this.z + 1;
        b.setEvent("EVENT_Teclado_teclaEspecial_return");
    }
    finalize() {

    }
}
//-------
//-------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
// ej: let p = getObject("id", 1);
export function getObject(property, value) {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].hasOwnProperty(property)) {
            if (gameObjects[i][property] == value) {
                return gameObjects[i];
            }
        }
    }
    return null;
}
//-------
export function exists(proc) {
    if (proc === undefined || proc === null) {
        return false;
    }
    if (proc.live) {
        return true;
    } else {
        return false;
    }
}
//-------
export function getGameObjectById(id) {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].id == id) {
            return gameObjects[i];
        }
    }
    return undefined;
}
//-------
export function signal(id, sig) {
    if (!exists(id)) {
        return;
    }
    switch (sig) {
        case s_kill:
            if (!id.killProtection) {
                id.live = false;
                if (id.graph != undefined) {
                    id.graph.visible = false;
                }
                if (id.mesh != undefined) {
                    id.mesh.visible = false;
                }
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
//-------
export function signalType(type, sig) {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].type == type) {
            signal(gameObjects[i], sig);
        }
    }
}
//-------
export function letMeAlone() {
    for (var i = 0; i < gameObjects.length; i++) {
        if (!gameObjects[i].killProtection) {
            if (gameObjects[i] != _id_) {
                gameObjects[i].live = false;
            }
        }
    }
}
//-------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
export class LoadImages extends GameObject {

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
                    if (_4div_screen_filter) {
                        this.img[this.pos] = PIXI.Texture.from(this.path + this.name, { scaleMode: PIXI.SCALE_MODES.LINEAR });
                    } else {
                        this.img[this.pos] = PIXI.Texture.from(this.path + this.name, { scaleMode: PIXI.SCALE_MODES.NEAREST });
                    }

                    this.pos++;
                } else {
                    var completed = true;
                    for (let i = 0; i < this.numFiles; i++) {
                        if (this.img[i] === undefined) {
                            completed = false;
                        } else {
                            // ..
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
//----------------------------------------------------------------------------------
export class LoadSounds extends GameObject {
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
                    this.dat[this.pos] = new window.WaudSound(this.path + this.name + this.ext, { autoplay: false, loop: false, volume: 0.5 });
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
//-------
//-------
//-------
//-------
//-------
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
export function getOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        return "portrait";
    } else {
        return "landscape";
    }
}
//-------
export function setTexture(mesh, texture) {
    mesh.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            if (child.material.map != undefined) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        }
    });
}
//-------
export function loadTexture(img_path) {
    return new THREE.TextureLoader().load(img_path);
}

//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
export function LoadTxt(filename, LINE_DELIMITIER = "\r\n") {
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
                        p.data = data.split(LINE_DELIMITIER);
                        // output the text to the console
                        p.ready = true;
                        //console.log( data )
                    },
                    // onProgress callback
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    // onError callback
                    function (err) {
                        console.error('An error happened', err);
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
//-------
export function fileExists(urlToFile) {
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
//----------------------------------------------------------------------------------
//==================================================================================
//----------------------------------------------------------------------------------
//-------
export class Camera3d extends GameObject {
    constructor() {
        super();
        this.st = -10;
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
        camera.position.z = 0;
        camera.position.y = 0;
        camera.position.x = 0;
        //camera.lookAt(scene.position);

    }
    setEnabled(value) {
        this.enabled = value;
    }
    setMouseControl(value) {
        this.enableMouseControl = value;
    }
    frame() {
        switch (this.st) {
            case -10:
                if (this.enabled) {
                    this.st = 0;
                }
                break;

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
        /*
        if (this.constrainVertical) {
            phi = MathUtils.mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
        }
        */
        const position = new THREE.Vector3(target.x, target.y, target.z);
        const targetPosition = new THREE.Vector3();
        targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
        this.object.lookAt(targetPosition);
    }
    //------------------------------------------------------
    manualMovement(delta = 1) {
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
        /*
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
        */
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
            this.position.x = this.object.position.x;
            this.position.y = this.object.position.y;
            this.position.z = this.object.position.z;
        } else {
            console.warn("ERROR: .setPosition() requires no target seted.");
        }

    }
    setRotation(value) {
        this.lon = value;
    }
    setAzimut(value) {
        this.lat = value;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
export function isMobile() {
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
export function downloadTxt(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
//---------------------------------------------------------------------------------
export function uploadTxt() {
    let input = document.createElement('input');
    input.type = 'file';
    input.ready = false;
    input.onchange = () => {
        let files = Array.from(input.files);
        let reader = new FileReader();
        reader.inputElement = input;
        reader.readAsText(files[0]);
        reader.onload = function (event) {
            console.log(event);
            this.inputElement.ready = true;
            this.inputElement.result = reader.result.split('\n');
        };
    };
    input.click();
    input.get = () => {
        return input.result;
    }
    return input;
}
//---------------------------------------------------------------------------------
export class DirectionalLight extends GameObject {
    constructor(col, intensity) {
        super();
        this.color = col;
        this.intensity = intensity;
        this.light = new THREE.DirectionalLight(this.color, this.intensity);
        this.target;
        this.targetHeight = 0;
    }
    initialize() {
        this.light.castShadow = three_renderer_use_shadows;             // si globalmente estan desactivadas se desactivan tambien en la luz..
        scene.add(this.light);
    }
    frame() {
        if (exists(this.target)) {
            this.x -= this.target.x;
            this.y -= this.target.y + this.targetHeight;
            this.z -= this.target.z;
            this.light.position.set(this.x, this.y, this.z);
        } else {
            signal(this, s_kill);
        }
    }
    setTarget(target) {
        this.target = target;
        if (target instanceof Camera3d) {
            this.light.target = camera_target;
        }
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
//-------
export class SpotLight extends GameObject {
    constructor(color = WHITE, intensity = 100) {
        super();
        this.light = undefined;
        this.target_set = false;
        this.color = color;
        this.intensity = intensity;
        this.distance = 1000;
        this.penumbra = 0.05;
        this.decay = 2;
    }
    initialize() {
        this.light = new THREE.SpotLight(this.color, this.intensity);
        this.light.position.set(this.x, this.y, this.z);
        this.light.distance = this.distance;
        this.light.decay = this.decay;
        this.light.penumbra = this.penumbra;
        scene.add(this.light);
    }
    finalize() {
        scene.remove(this.light);
        this.light.dispose();
    }
    frame() {
        this.light.position.set(this.x, this.y, this.z);
    }

    setTargetPosition(a, b, c) {
        if (arguments.length == 1) {
            if (a instanceof Vector3) {
                this.light.target.position.set(a);
            } else {
                console.log("ERROR: argument not is a Vector3!");
            }
        } else {
            this.light.target.position.set(a, b, c);
        }
        this.light.target.updateMatrixWorld();
    }

    setTexture(tex) {
        let texture = undefined;
        if (tex instanceof THREE.Texture) {
            texture = tex;
        } else if (tex instanceof PIXI.Texture) {
            texture = new THREE.TextureLoader().load(tex.textureCacheIds[0]);  // uso normbre de archivo guardado en textura de pixi..
        } else {
            texture = new THREE.TextureLoader().load(tex); // uso nombre de archivo directamente..
        }
        this.light.map = texture;
    }
}
//-------
export class PointLight extends GameObject {
    constructor(col, intensity) {
        super();
        this.color = col;
        this.intensity = intensity;
        this.light;
        this.target = undefined;
        this.targetHeight = 0;
        this.target_set = false;
    }
    initialize() {
        this.light = new THREE.PointLight(this.color, this.intensity);
        this.light.castShadow = three_renderer_use_shadows;             // si globalmente estan desactivadas se desactivan tambien en la luz..
        scene.add(this.light);
    }
    frame() {
        if (exists(this.target)) {
            this.x = this.target.x;
            this.y = this.target.y + this.targetHeight;
            this.z = this.target.z;
            this.light.position.set(this.x, this.y, this.z);
        } else {
            if (this.target_set) {
                signal(this, s_kill);   // si se seteo un target.. este objeto desaparece con el..
            }
            this.light.position.set(this.x, this.y, this.z);
        }
    }
    setTarget(target) {
        this.target = target;
        this.target_set = true;
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
//-------
function _main_core_() {
    _delta_ = _clock_.getDelta();
    // MAIN LOOP..
    _id_ = undefined;
    if (frameCount > 1) {
        window.main();
        if (needFogUpdate == true) {
            needFogUpdate = false;
            scene.fog = fog;
        }
    }

    // colocar el camera_target delante de la camara..
    let pos = new THREE.Vector3();
    camera.getWorldDirection(pos);
    pos.multiplyScalar(10);
    pos.add(camera.position);
    camera_target.position.x = pos.x;
    camera_target.position.y = pos.y;
    camera_target.position.z = pos.z;

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
                    if (Array.isArray(gameObjects[i].mesh.material)) {
                        for (let j = 0; j < gameObjects[i].mesh.material.length; j++) {
                            gameObjects[i].mesh.material[j].dispose();

                        }
                    } else {
                        gameObjects[i].mesh.material.dispose();
                    }
                    //gameObjects[i].mesh.material.dispose();
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

    for (let i = 0; i < gameObjects.length; i++) {
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
    keyCode = undefined;
    mouse.movementX = 0;
    mouse.movementY = 0;

}
//-------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
// SONIDO
//-------
export function soundSetMasterVolume(value, snd_array = undefined) {
    glz_sound_master_volume = value;
    if (snd_array != undefined) {
        for (let i = 0; i < snd_array.length; i++) {
            let snd = snd_array[i];
            if (snd.isPlaying()) {
                let last = snd.last_volume_value;
                soundSetVolume(snd, last);
            }
        }
    }
}
export function soundGetMasterVolume() {
    return glz_sound_master_volume;
}
//-------
export class SoundPlayTimed extends GameObject {
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
//-------
export function soundPlay(snd, loop, volume = 0.5) {
    soundSetVolume(snd, volume);
    //snd.setVolume(volume * glz_sound_master_volume);
    snd.play();
    snd.loop(loop);
    return snd;
}
//-------
export function soundStop(snd_, soundsArray) {
    if (snd_ == all_sound) {
        for (let i = 0; i < soundsArray.length; i++) {
            soundsArray[i].stop();
        }
    } else {
        snd_.stop();
    }
}
//-------
export function soundSetVolume(snd, value) {
    snd.setVolume(value * glz_sound_master_volume);
    snd.last_volume_value = value;
}
//-------
export function soundIsPlaying(snd) {
    return snd._snd._isPlaying;
}
//-------
export function soundFade(snd, time_ms) {
    return new SoundFade(snd, time_ms);
}
//-------
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
        //this.snd.setVolume(this.volume - this.delta);
        soundSetVolume(this.snd, this.volume - this.delta);
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
//-------
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
export function mixamoMerger(models) {
    // creo modelo apartir del primero de la lista..
    let mesh = SkeletonUtils.clone(models[0]);
    mesh.animations = [];
    // combino las animaciones en el modelo creado..
    for (let i = 0; i < models.length; i++) {
        if (models[i].animations) {
            for (let j = 0; j < models[i].animations.length; j++) {       // fucking clone animas..
                mesh.animations.push(models[i].animations[j]);
            }
        }
    }
    return mesh;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function loadModelOBJ(filename, container, pos) {
    var obj = filename;
    var mtl = filename.substring(0, filename.length - 4) + ".mtl";
    var mtlLoader = new MTLLoader();
    mtlLoader.load(mtl, function (materials) {
        materials.preload();
        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(obj, function (object) {
            container[pos] = object;
        });
    });
}
//-------
function loadModelFBX(filename, container, pos) {
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        filename,
        (object) => {
            container[pos] = object;
        },
        (xhr) => {
            //console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
}
//---------------------------------------------------------------------------------
export class LoadModels extends GameObject {
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

                for (let i = 0; i < this.model_list.length; i++) {
                    let extension = this.model_list[i].substring(this.model_list[i].length - 3, this.model_list[i].length);
                    if (extension == "obj") {
                        loadModelOBJ(this.model_list[i], this.dat, i);
                    } else if (extension == "fbx") {
                        loadModelFBX(this.model_list[i], this.dat, i);
                    }
                }
                this.st = 10;
                break;
            case 10:
                if (this.dat.length == this.model_list.length) {
                    this.ready = true;
                }
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
function loadTextureDefault(filename, container, pos) {

    const loader = new THREE.TextureLoader();
    loader.load(
        // resource URL
        filename,

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            container[pos] = texture;
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        function (err) {
            console.error('An error happened when texture loading..');
        }
    );
}
//-------
export class LoadTextures extends GameObject {
    constructor(texture_list) {
        super();
        this.st = 0;
        this.pos = 0;
        this.ready = false;
        this.texture_list = texture_list;
        this.dat = [];
    }
    frame() {
        switch (this.st) {
            case 0:
                for (let i = 0; i < this.texture_list.length; i++) {
                    loadTextureDefault(this.texture_list[i], this.dat, i);
                }
                this.st = 10;
                break;
            case 10:
                if (this.dat.length == this.texture_list.length) {
                    this.ready = true;
                }
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
//=================================================================================
//---------------------------------------------------------------------------------
let lockUi = false;
export function lockEGUI() {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].type === "EGUI_ELEMENT") {
            gameObjects[i].locked = true;
        }
    }
}
//-------
export function unlockEGUI() {
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].type === "EGUI_ELEMENT") {
            gameObjects[i].locked = false;
        }
    }
}
//-------
export class EGUIcheckButton extends GameObject {
    constructor(x, y, w, h, value = false) {
        super();
        this.st = 0;
        this.value = value;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.tint1 = GRAY;
        this.tint2 = BLUE;
        this.eventName = "NULL_event";
        this.locked = false;
        this.type = "EGUI_ELEMENT";
        this.label = undefined;
        this.disabled = false;
        this.focus = false;
    }
    getFocus() {
        return this.focus;
    }
    setFocus(focus) {
        this.focus = focus;
    }
    initialize() {
        this.newGraph(this.w, this.h);
        if (this.value) {
            this.tint(this.tint2);
        } else {
            this.tint(this.tint1);
        }
    }
    frame() {
        switch (this.st) {
            case 0:
                this.st = 10;
                break;
            case 10:
                if (this.touched() && !this.locked && !lockUi && !this.disabled || !this.locked && !lockUi && this.focus && !this.disabled) {
                    lockUi = true;
                    this.value = !this.value;
                    if (this.value) {
                        this.tint(this.tint2);
                    } else {
                        this.tint(this.tint1);
                    }
                    this.st = 20;
                }
                break;
            case 20:
                if (!this.touchPersists()) {
                    lockUi = false;
                    method(this.eventName);
                    this.focus = false;
                    this.st = 10;
                }
                break;
            case 30:
                this.label = new Write(this.fnt, this.textSize, this.text, this.textAlign, this.x, this.y, this.textColor, 1);
                this.label.z = this.z + 1;
                this.st = this.oldSt;
                break;
        }
        if (this.label != null) {
            this.label.x = this.x + this.offx_label;
            this.label.y = this.y + this.offy_label;
        }
    }
    setDisable(value) {
        this.disabled = value;
    }
    setValue(value) {
        this.value = value;
        if (this.value) {
            this.tint(this.tint2);
        } else {
            this.tint(this.tint1);
        }
        method(this.eventName);
    }
    setEvent(eventName) {
        this.eventName = eventName;
    }
    setLabel(fnt, textSize, text, align, offx, offy, textColor) {
        this.fnt = fnt;
        this.textSize = textSize;
        this.text = text;
        this.textAlign = align;
        this.offx_label = offx;
        this.offy_label = offy;
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
//-------
export class EGUIbutton extends GameObject {
    constructor(font, size, label, x, y, color) {
        super();
        this.st = 0;
        if (font == null) {
            this.font = null;
        } else {
            this.font = font;
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
        this.disabled = false;
        this.type = "EGUI_ELEMENT";
        this.graphics = undefined;
        this.z = 2048;
        this.w = undefined;
        this.h = undefined;
        this.focus = false;
    }
    getFocus() {
        return this.focus;
    }
    setFocus(focus) {
        this.focus = focus;
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
                this.idText = new Write(this.font, this.textSize, this.label, CENTER, this.x, this.y, this.textColor, 255);
                if (this.w == undefined) {
                    this.w = this.idText.getWidth() + 10;
                    this.h = this.idText.getHeight() + 4;
                }

                this.newGraph(this.w, this.h);
                this.tint(this.tint1);
                this.st = 10;
                break;
            case 10:
                if (this.touched() && !this.locked && !lockUi && !this.disabled || !this.locked && !lockUi && this.focus && !this.disabled) {
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
                    this.focus = false;
                    this.st = 10;
                }
                break;
        }
    }
    setDisable(value) {
        this.disabled = value;
    }
    setColor(colorA = this.tint1) {
        this.tint1 = colorA;
    }
    setColors(colorA = this.tint1, colorB = this.tint2) {
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
//-------
export class EGUIgbutton extends GameObject {
    constructor(gr, x, y, sizex = 1, sizey = 1) {
        super();
        this.st = 0;
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
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
        this.disabled = false;
        this.type = "EGUI_ELEMENT";
        this.z = 2048;
        this.oldSt = 0; // permite guardar el estado actual antes de un santo de estado para volver a
        // donde estabamos antes del salto de estado..
        this.offx_label = 0;
        this.offy_label = 0;
        this.textAlign = CENTER;
        this.focus = false;
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
                this.setGraph(this.gr);
                this.st = 10;
                break;
            case 10:
                if (this.touched() && !this.locked && !lockUi && !this.disabled || !this.locked && !lockUi && this.focus && !this.disabled) {
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
                    this.focus = false;
                    this.st = 10;
                }
                break;
            case 30:
                this.label = new Write(this.fnt, this.textSize, this.text, this.textAlign, this.x, this.y, this.textColor, 1);
                this.label.z = this.z + 1;
                this.st = this.oldSt;
                break;
        }
        if (this.label != null) {
            this.label.x = this.x + this.offx_label;
            this.label.y = this.y + this.offy_label;
        }
    }
    setDisable(value) {
        this.disabled = value;
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
    /*
    setLabel(fnt, textSize, text, textColor) {
        this.fnt = fnt;
        this.textSize = textSize;
        this.text = text;
        this.textColor = textColor;
        this.oldSt = this.st;
        this.st = 30;
    }
    */
    setLabel(fnt, textSize, text, align, offx, offy, textColor) {
        this.fnt = fnt;
        this.textSize = textSize;
        this.text = text;
        this.textAlign = align;
        this.offx_label = offx;
        this.offy_label = offy;
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
//-------
export class EGUIinputBox extends GameObject {
    constructor(font, size, label, text, x, y, w, h = size, pwdMode = false) {
        super();
        this.st = 0;
        if (font == null) {
            this.font = 'fnt';
        } else {
            this.font = font;
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
        this.disabled = false;
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
                this.idLabel = new Write(this.font, this.textSize, this.label, LEFT, this.x - this.w / 2, this.y, this.labelColor, 255);
                this.h = this.idLabel.getHeight() + 4;
                this.newGraph(this.w, this.h);
                this.graphics = new PIXI.Graphics();
                this.graphics.beginFill(0x000000);
                this.graphics.drawRect(0, 0, this.w + 2, this.h + 2);
                this.graphics.zIndex = this.z - 1;
                this.graphics.x = this.x - this.w / 2;
                this.graphics.y = this.y - this.h / 2;
                app.stage.addChild(this.graphics);

                this.pwdText = "";
                for (let i = 0; i < this.text.length; i++) {
                    this.pwdText += "*";
                }
                if (this.pwdMode == true) {
                    this.idText = new Write(this.font, this.textSize, this.pwdText, RIGHT, 2 + this.x - this.w / 2, this.y, this.textColor, 255);
                } else {
                    this.idText = new Write(this.font, this.textSize, this.text, RIGHT, 2 + this.x - this.w / 2, this.y, this.textColor, 255);
                }
                this.tint(this.tint1);
                this.st = 10;
                break;
            case 10:
                this.graphics.zIndex = this.z - 1;
                if ((this.touched() && !this.locked && !lockUi && !this.disabled) || !this.locked && !lockUi && this.focus && !this.disabled) {
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
                if (textInfo(this.font, this.textSize, this.text).width > this.w - 4) {
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
                    while (textInfo(this.font, this.textSize, this.text).width > this.w - 4) {
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
    setDisable(value) {
        this.disabled = value;
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
    set(newText) {
        this.text = newText;
        this.idText.text = this.text;
    }
    setEvent(eventName) {
        this.eventName = eventName;
    }
    finalize() {
        app.stage.removeChild(this.graphics);
        signal(this.idLabel, s_kill);
        signal(this.idText, s_kill);
    }
}
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
export class ImagePixel {
    constructor(src) {
        this.ready = false;
        this.offscreenCanvas;
        this.ctx_;
        this.colorMode = "RGBA";
        this.img = new Image();
        this.img.src = src;
        this.document_resource = document.body.appendChild(this.img);
        this.img.onload = () => {
            this.loadPixels();
        }
    }
    dispose() {
        document.body.removeChild(this.document_resource);
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
                    {
                        let color = this.ctx_.getImageData(x, y, 1, 1).data;
                        return this.RGBAToHex(color[0], color[1], color[2]);
                    }
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
                {
                    let colors = this.ctx_.getImageData(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height).data;
                    let hexColors = [];
                    for (let i = 0; i < colors.length; i += 4) {
                        hexColors.push(this.RGBAToHex(colors[i], colors[i + 1], colors[i + 2]));
                    }
                    return hexColors;
                }
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
                {
                    let colors = this.ctx_.getImageData(x, y, width, height).data;
                    let hexColors = [];
                    for (let i = 0; i < colors.length; i += 4) {
                        hexColors.push(this.RGBAToHex(colors[i], colors[i + 1], colors[i + 2]));
                    }
                    return hexColors;
                }
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
//-------
export class VideoCamera {
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
//=================================================================================
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
export function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'module';
    script.defer = true;        // carga del script asincrona..
    document.getElementsByTagName('head').item(0).appendChild(script);
}
//---------------------------------------------------------------------------------
export function screenToWorld(x, y) {
    const coords = new THREE.Vector3(
        (x / WIDTH) * 2 - 1,
        -(y / HEIGHT) * 2 + 1,
        0.5
    );
    const worldPosition = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0.0, 1.0, 0.0));
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(coords, camera);
    return raycaster.ray.intersectPlane(plane, worldPosition);
}
//---------------------------------------------------------------------------------
//=================================================================================
//---------------------------------------------------------------------------------
export class LoadFonts extends GameObject {
    constructor(font_list) {
        super();
        this.st = 0;
        this.pos = 0;
        this.ready = false;
        this.font_list = font_list;
        this.dat = [];
    }
    frame() {
        switch (this.st) {
            case 0:

                for (let i = 0; i < this.font_list.length; i++) {
                    let url = "url(" + this.font_list[i] + ")";
                    this.dat[i] = new FontFace('fnt' + str(i), url);
                    this.dat[i].load();
                    document.fonts.add(this.dat[i]);
                }

                this.st = 10;
                break;
            case 10:
                let loadCompleted = true;
                for (let i = 0; i < this.dat.length; i++) {
                    if (this.dat[i].status != "loaded") {
                        loadCompleted = false;
                    }
                }
                if (loadCompleted == true) {
                    this.ready = true;
                    this.st = 20;
                }
                break;
            case 20:
                //..
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
//=================================================================================
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
export function socketOpen(server, port) {
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
        window.onNetEvent(event.data.split(NET_TOK_DATA));
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
export function socketStatus() {
    if (_glz_socket == null) {
        return SOCKET_NULL;
    } else {
        return _glz_socket.status;
    }
}
//---------------------------------------------------------------------------------
export function socketClose() {
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
export function NetMessage(netWsocket = _glz_socket) {
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
//---------------------------------------------------------------------------------
export class StringDict {
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
//---------------------------------------------------------------------------------
export class TableRow {
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
export class Storage {
    // window.localStorage object..
    constructor() {
        if (localStorage == undefined) {
            console.error("ERROR: localStoraje not available on this platform!");
        }
    }
    set(key, obj) {
        localStorage.setItem(key, obj);
    }
    get(key) {
        return localStorage.getItem(key);
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
    keys() {
        let l = [];
        for (let i = 0; i < localStorage.length; i++) {
            l.push(localStorage.key(i));
        }
        return l;
    }
    contains(key) {
        if (localStorage[key]) {
            return true;
        } else {
            return false;
        }
    }
    setObject(ket, object) {
        localStorage.setItem("myObject", JSON.stringify(object));
    }
    getObject(key) {
        let obj = localStorage.getItem(key);
        return JSON.parse(obj);
    }
}
//---------------------------------------------------------------------------------
function glz_wakeLock() {
    // test support
    let isSupported = false;
    if ('wakeLock' in navigator) {
        isSupported = true;
        console.log('Screen Wake Lock API supported 🎉');
    } else {
        console.log('Wake lock is not supported by this browser.');
    }

    if (isSupported) {
        // create a reference for the wake lock
        let wakeLock = null;

        // create an async function to request a wake lock
        const requestWakeLock = async () => {
            try {
                wakeLock = await navigator.wakeLock.request('screen');
            } catch (err) {
                // if wake lock request fails - usually system related, such as battery
                console.log(err.name, err.message);

            }
        } // requestWakeLock()
    } // isSupported
}

//---------------------------------------------------------------------------------
export function setCameraPosition(x, y, z) {
    if (camera != undefined) {
        camera.position.set(x, y, z);
    } else {
        glz_initial_value_camera_position_x = x;
        glz_initial_value_camera_position_y = y;
        glz_initial_value_camera_position_z = z;
    }
}

export function getCamera() {
    return camera;
}

//---------------------------------------------------------------------------------
export class Cam extends GameObject {
    constructor() {
        super();
        this.object = camera;
        this.target = undefined;
        this.targetHeight = 0;
        this.targetDistance_before_collision = 0;
        this.targetDistance = 10;
        this.targetDistance_max = 10;
        this.targetDistance_min = 5;
        this.position = new Vector3();

        this._hardness = 0.5;

        this._euler = new THREE.Euler(0, 0, 0, 'YXZ');
        this._vector = new Vector3();
        // Set to constrain the pitch of the camera
        // Range is 0 to Math.PI radians
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians
        this._PI_2 = Math.PI / 2;

        this.pointerSpeed = 1.0;
        this.isLocked = false;

        this.mouseZoom = true;
        this.mouseControl = true;

        this.lat = 0;
        this.lon = 0;

        this.enableCollision = false;
        this.viewHalfX = 0;
        this.viewHalfY = 0;
        this.r = new THREE.Raycaster();
        this.r.camera = camera;             // seteo la camara de raycast por los sprites 3d..

        this.mouseKey = 'left';

    }

    initialize() {
        signal(this, s_protected);
        this.isLocked = true;
        this.onMouseMove();
        this.isLocked = false;
        this.viewHalfX = WIDTH / 2;
        this.viewHalfY = HEIGHT / 2;
    }

    finalize() {

    }

    setMouseKey(value = LEFT) {
        // 'left' 'rigth' 'center'..
        this.mouseKey = value;
    }

    frame() {
        if (this.mouseControl && !mouse.isOverSprite()) {
            if (mouse[this.mouseKey]) {
                if (!this.isLocked) {
                    this.isLocked = true;
                }
            } else {
                if (this.isLocked) {
                    this.isLocked = false;
                }
            }
            if (mouse.moved) this.onMouseMove();
        }

        if (this.mouseZoom) {
            if (mouse.wheelUp) {
                this.targetDistance -= 1;
                if (this.targetDistance < this.targetDistance_min) {
                    this.targetDistance = this.targetDistance_min;
                }
            }
            if (mouse.wheelDown) {
                this.targetDistance += 1;
                if (this.targetDistance > this.targetDistance_max) {
                    this.targetDistance = this.targetDistance_max;
                }
            }
        }

        let dx = 0, dy = 0, dz = 0;
        if (this.target) {
            dx = this.target.x - this.x;
            dy = this.target.y - this.y;
            dz = this.target.z - this.z;
            this.x += (dx * this._hardness);
            this.y += (dy * this._hardness);
            this.z += (dz * this._hardness);
            this.position.x = this.x;
            this.position.y = this.y;
            this.position.z = this.z;
            camera.position.x = this.x;
            camera.position.y = this.y + this.targetHeight;
            camera.position.z = this.z;
            camera.translateZ(this.targetDistance);
        } else {
            this.position.x = this.x;
            this.position.y = this.y;
            this.position.z = this.z;
            camera.position.x = this.x;
            camera.position.y = this.y + this.targetHeight;
            camera.position.z = this.z;
            camera.translateZ(this.targetDistance);
        }

        this.lat = degrees(this._euler.x);
        this.lon = degrees(this._euler.y) - 180;




        // colision con el mundo..
        let dir = new THREE.Vector3();
        if (this.enableCollision) {

            this.position.y += this.targetHeight;

            dir.subVectors(camera.position, this.position).normalize();
            this.r.set(this.position, dir.subVectors(camera.position, this.position).normalize());
            const interse = this.r.intersectObjects(scene.children, false);

            if (interse.length > 0) {
                if (interse[0].object.id_ != this.target.id) {
                    if (this.targetDistance_before_collision == 0) {
                        this.targetDistance_before_collision = this.targetDistance;
                    }
                    let dist = interse[0].distance - 2;
                    if (dist >= 0 && dist < this.targetDistance_before_collision) {
                        let camera_cross_distance = this.targetDistance - dist;
                        camera.translateZ(-camera_cross_distance);
                        this.targetDistance = dist;
                    }
                    if (this.targetDistance_preset < this.targetDistance) {
                        this.targetDistance = this.targetDistance_preset;
                    }

                }
            } else {
                if (this.targetDistance_before_collision > 0) {
                    let delta = this.targetDistance_before_collision - this.targetDistance;
                    if (Math.floor(delta) > 0) {
                        this.targetDistance += delta / 10;
                    } else {
                        this.targetDistance_before_collision = 0;
                    }
                }
            }

            //this.position.y -= this.targetHeight;

        } else {
            // no enabled collision with world..
        }

    }
    //------------------------------------------
    setTarget(target) {
        if (!(target instanceof GameObject)) {
            console.warn("ERROR: Target not is a instanceof GameObject!");
            return;
        }
        this.target = target;
    }
    setTargetDistance(min, max) {
        if (arguments.length == 1) {
            this.targetDistance = min;
            this.targetDistance_max = min;
        } else if (arguments.length == 2) {
            this.targetDistance = max;
            this.targetDistance_max = max;
            this.targetDistance_min = min;
        }

    }
    setTargetHeight(value) {
        this.targetHeight = value;
    }
    //------------------------------------------
    setMouseControl(value) {
        this.mouseControl = value;
    }

    advance(distance) {
        // movimiento alante / atras..
        this._vector.setFromMatrixColumn(camera.matrix, 0);
        this._vector.crossVectors(camera.up, this._vector);
        this.position.addScaledVector(this._vector, distance);
        this.x = this.position.x;
        this.y = this.position.y;
        this.z = this.position.z;
    }

    strafe(distance) {
        // movimiento izquierda / derecha..
        this._vector.setFromMatrixColumn(camera.matrix, 0);
        this.position.addScaledVector(this._vector, distance);
        this.x = this.position.x;
        this.y = this.position.y;
        this.z = this.position.z;
    }

    onMouseMove() {
        if (this.isLocked === false) return;
        this._euler.setFromQuaternion(camera.quaternion);
        this._euler.y -= mouse.movementX * 0.002 * this.pointerSpeed;
        this._euler.x -= mouse.movementY * 0.002 * this.pointerSpeed;
        this._euler.x = Math.max(this._PI_2 - this.maxPolarAngle, Math.min(this._PI_2 - this.minPolarAngle, this._euler.x));
        camera.quaternion.setFromEuler(this._euler);
    }

    setOrientation(vec) {
        this._euler.setFromQuaternion(camera.quaternion);
        this._euler.y -= vec.x * 0.002 * this.pointerSpeed;
        this._euler.x -= vec.y * 0.002 * this.pointerSpeed;
        this._euler.x = Math.max(this._PI_2 - this.maxPolarAngle, Math.min(this._PI_2 - this.minPolarAngle, this._euler.x));
        camera.quaternion.setFromEuler(this._euler);
    }

    setRotation(value) {
        this._euler.setFromQuaternion(camera.quaternion);
        this._euler.y -= value * 0.002 * this.pointerSpeed;
        this._euler.x = Math.max(this._PI_2 - this.maxPolarAngle, Math.min(this._PI_2 - this.minPolarAngle, this._euler.x));
        camera.quaternion.setFromEuler(this._euler);
    }

    setAzimuth(value) {
        this._euler.setFromQuaternion(camera.quaternion);
        this._euler.x -= value * 0.002 * this.pointerSpeed;
        this._euler.x = Math.max(this._PI_2 - this.maxPolarAngle, Math.min(this._PI_2 - this.minPolarAngle, this._euler.x));
        camera.quaternion.setFromEuler(this._euler);
    }

    getDirection(degreeMode = false) {
        if (degreeMode) {
            return new THREE.Vector3().set(0, 0, - 1).applyQuaternion(camera.quaternion).multiplyScalar(90);
        } else {
            return new THREE.Vector3().set(0, 0, - 1).applyQuaternion(camera.quaternion);
        }
    }

    getTargetDistance() {
        return camera.position.distanceTo(this.position);
    }

    setCollision(value) {
        this.enableCollision = value;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
export class Tts {
    constructor() {
        // motor de sintesis de voz integrado en los navegadores actuales..
        this.ready = false;
        window.speechSynthesis.id_glz_tts_object = this;
        window.speechSynthesis.addEventListener("voiceschanged", () => {
            speechSynthesis.id_glz_tts_object.ready = true;
        });
        this.add("");
    }
    isReady() {
        return this.ready;
    }
    add(text_message, rate = 1) {
        const message = new SpeechSynthesisUtterance(text_message);
        message.rate = rate;
        speechSynthesis.speak(message);
    }
    reset() {
        speechSynthesis.cancel();
    }
    pause() {
        speechSynthesis.pause();
    }
    resume() {
        speechSynthesis.resume();
    }
    isPaused() {
        // indica si esta pausado..
        return speechSynthesis.paused;
    }
    idPending() {
        // indica si hay mensajes pendientes de reproducir..
        return speechSynthesis.pending;
    }
    isSpeaking() {
        // indica si esta reproduciendo algun mensaje..
        speechSynthesis.speaking;
    }
    getVoices() {
        return speechSynthesis.getVoices();
    }
}
//---------------------------------------------------------------------------------
export function getCaller() {
    return _id_;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
export class SkyBox extends GameObject {
    constructor(skybox_type, param) {
        // param puede ser un path para el tipo cubemap o una textura para el tipo panorama..
        super();
        this.skybox_type = skybox_type;
        this.param = param;
        this.fixedToCamera = true;
    }
    initialize() {
        switch (this.skybox_type) {
            case TYPE_CUBEMAP:
                this.material = [];
                this.material.push(new THREE.MeshBasicMaterial({ map: loadTexture(this.param + 'right.png'), side: 1 }));
                this.material.push(new THREE.MeshBasicMaterial({ map: loadTexture(this.param + 'left.png'), side: 1 }));
                this.material.push(new THREE.MeshBasicMaterial({ map: loadTexture(this.param + 'up.png'), side: 1 }));
                this.material.push(new THREE.MeshBasicMaterial({ map: loadTexture(this.param + 'down.png'), side: 1 }));
                this.material.push(new THREE.MeshBasicMaterial({ map: loadTexture(this.param + 'front.png'), side: 1 }));
                this.material.push(new THREE.MeshBasicMaterial({ map: loadTexture(this.param + 'back.png'), side: 1 }));
                var skyboxGeom = new THREE.BoxGeometry(1, 1, 1);
                this.mesh = new THREE.Mesh(skyboxGeom, this.material);
                this.mesh.flipSided = true;
                scene.add(this.mesh);
                break;
            case TYPE_PANORAMA:
                let skyGeo = new THREE.SphereGeometry(1, 25, 25);
                let texture = undefined;
                let tex = this.param;
                if (tex instanceof THREE.Texture) {
                    texture = tex;
                } else if (tex instanceof PIXI.Texture) {
                    texture = new THREE.TextureLoader().load(tex.textureCacheIds[0]);  // uso normbre de archivo guardado en textura de pixi..
                } else {
                    texture = new THREE.TextureLoader().load(tex); // uso nombre de archivo directamente..
                }
                this.material = new THREE.MeshPhongMaterial({
                    map: texture,
                    side: THREE.BackSide
                });
                this.mesh = new THREE.Mesh(skyGeo, this.material);
                scene.add(this.mesh);
                break;
            default:
                console.log("SkyBox INFO: available modes: TYPE_CUBEMAP | TYPE_PANORAMA");
                break;
        }
    }
    finalize() { }
    setSize(size) {
        this.size = size;
    }
    frame() {
        this.x = camera.position.x;
        this.y = camera.position.z;
        this.z = camera.position.z;
    }
}
//---------------------------------------------------------------------------------
export function worldToScreen(pos) {
    if (pos instanceof THREE.Vector3) {
        let vector = pos.project(camera);
        vector.x = (vector.x + 1) / 2 * WIDTH;
        vector.y = -(vector.y - 1) / 2 * HEIGHT;
        return vector;
    } else {
        console.error("ERROR: Parameter isn´t a THREE.Vector3() object!");
        return undefined;
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// Ported to JavaScript from 
// http://www.migapro.com/circle-and-rotated-rectangle-collision-detection/
//
// An example:
// var circle: { x: 20, y: 10, radius: 20 };
// var rect: { x: 30, y: 30, width: 100, height: 100, rotation: Math.PI / 2 };
// collideCircleWithRotatedRectangle( circle, rect );
// // returns true.
// 
//
// Please note:
// This code assumes that rect.x and rect.y are the CENTER coordinates
// of the rectangle. You may want to to change this.
// Also rotation values need to be in RADIANS.

// custom rebamp of this function for mouse collision detection with GameObjects in 4Div by Erkosone.

export function collisionCircleToGameObject(x_, y_, _gameObject_) {
    if (!(_gameObject_ instanceof GameObject)) return false;
    if (_gameObject_.graph == undefined) return false;


    let circle = { x: x_, y: y_, radius: 1 };
    let rect;
    if (_gameObject_.sizex != 1 || _gameObject_.sizey != 1) {
        rect = { x: _gameObject_.x, y: _gameObject_.y, width: _gameObject_.graph.width * _gameObject_.sizex, height: _gameObject_.graph.height * _gameObject_.sizey, rotation: radians(_gameObject_.angle) };
    } else {
        rect = { x: _gameObject_.x, y: _gameObject_.y, width: _gameObject_.graph.width * _gameObject_.size, height: _gameObject_.graph.height * _gameObject_.size, rotation: radians(_gameObject_.angle) };
    }


    let rectCenterX = rect.x;
    let rectCenterY = rect.y;

    let rectX = rectCenterX - rect.width / 2;
    let rectY = rectCenterY - rect.height / 2;

    let rectReferenceX = rectX;
    let rectReferenceY = rectY;

    // Rotate circle's center point back
    let unrotatedCircleX = Math.cos(rect.rotation) * (circle.x - rectCenterX) - Math.sin(rect.rotation) * (circle.y - rectCenterY) + rectCenterX;
    let unrotatedCircleY = Math.sin(rect.rotation) * (circle.x - rectCenterX) + Math.cos(rect.rotation) * (circle.y - rectCenterY) + rectCenterY;

    // Closest point in the rectangle to the center of circle rotated backwards(unrotated)
    let closestX, closestY;

    // Find the unrotated closest x point from center of unrotated circle
    if (unrotatedCircleX < rectReferenceX) {
        closestX = rectReferenceX;
    } else if (unrotatedCircleX > rectReferenceX + rect.width) {
        closestX = rectReferenceX + rect.width;
    } else {
        closestX = unrotatedCircleX;
    }

    // Find the unrotated closest y point from center of unrotated circle
    if (unrotatedCircleY < rectReferenceY) {
        closestY = rectReferenceY;
    } else if (unrotatedCircleY > rectReferenceY + rect.height) {
        closestY = rectReferenceY + rect.height;
    } else {
        closestY = unrotatedCircleY;
    }

    // Determine collision
    let collision = false;
    let distance = getDistance2d(unrotatedCircleX, unrotatedCircleY, closestX, closestY);

    if (distance < circle.radius) {
        collision = true;
    }
    else {
        collision = false;
    }

    return collision;
}
//---------------------------------------------------------------------------------
export function createButton(font, size, text, x, y, eventName = "", center = false) {
    let fnt = undefined;
    if (font === null) {
        fnt = 'fnt';
    } else {
        if (font != 'fnt') {
            fnt = font.family;
        }
    }
    const b = document.createElement('button');
    b.textContent = text;
    b.style.fontFamily = fnt;
    b.style.fontSize = size + 'px';
    b.style.position = 'absolute';
    b.style.zIndex = '3';
    b.eventName = eventName;
    document.body.appendChild(b);
    if (eventName != "") {
        b.addEventListener('click', () => { method(b.eventName) });
    }
    let xx = (window.innerWidth / WIDTH) * x;
    let yy = (window.innerHeight / HEIGHT) * y;
    if (center) {
        xx -= b.getBoundingClientRect().width / 2;
    }
    b.style.top = yy + 'px';
    b.style.left = xx + 'px';
    return b;
}
//---------------------------------------------------------------------------------
export function createSlider(x, y, width, min = 0, max = 100, value = 0, step = 1, center = false) {
    let slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.step = step;
    slider.style.width = width + 'px';
    slider.style.position = 'absolute';
    document.body.appendChild(slider);
    let xx = (window.innerWidth / WIDTH) * x;
    let yy = (window.innerHeight / HEIGHT) * y;
    if (center) {
        xx -= slider.getBoundingClientRect().width / 2;
    }
    slider.style.top = yy + 'px';
    slider.style.left = xx + 'px';
    slider.style.zIndex = '3';

    return slider;
}
//---------------------------------------------------------------------------------
export function createLabel(font, size, text, align, x, y) {
    let fnt = undefined;
    if (font === null) {
        fnt = 'fnt';
    } else {
        if (font != 'fnt') {
            fnt = font.family;
        }
    }
    const b = document.createElement('label');
    b.textContent = text;
    b.style.fontFamily = fnt;
    b.style.fontSize = size + 'px';
    b.style.position = 'absolute';
    b.style.zIndex = '3';
    document.body.appendChild(b);

    let xx = (window.innerWidth / WIDTH) * x;
    let yy = (window.innerHeight / HEIGHT) * y;
    switch (align) {
        case RIGHT:
            //..
            break;
        case LEFT:
            xx -= Math.ceil(b.clientWidth);
            break;
        case CENTER:
            xx -= Math.ceil(b.clientWidth) / 2;
            break;
    }
    b.style.left = xx + 'px';
    b.style.top = yy + 'px';
    return b;
}
//---------------------------------------------------------------------------------
export function createInputText(font, size, text, x, y, width, center = false) {
    let fnt = undefined;
    if (font === null) {
        fnt = 'fnt';
    } else {
        if (font != 'fnt') {
            fnt = font.family;
        }
    }
    const b = document.createElement('input');
    b.type = 'text';
    //b.textContent = text;
    b.defaultValue = text;
    b.style.fontFamily = fnt;
    b.style.fontSize = size + 'px';
    b.style.position = 'absolute';
    document.body.appendChild(b);

    let xx = (window.innerWidth / WIDTH) * x;
    let yy = (window.innerHeight / HEIGHT) * y;
    if (center) {
        xx -= b.getBoundingClientRect().width / 2;
    }
    b.style.top = yy + 'px';
    b.style.left = xx + 'px';
    b.size = width;
    b.style.zIndex = '3';

    return b;
}
//---------------------------------------------------------------------------------
export function createInputTextArea(font, size, text, x, y, cols = 20, rows = 10, center = false) {
    let fnt = undefined;
    if (font === null) {
        fnt = 'fnt';
    } else {
        if (font != 'fnt') {
            fnt = font.family;
        }
    }
    const b = document.createElement('textarea');
    b.cols = cols;
    b.rows = rows;
    b.style.resize = 'none';
    b.defaultValue = text;
    b.style.fontFamily = fnt;
    b.style.fontSize = size + 'px';
    b.style.position = 'absolute';
    document.body.appendChild(b);
    let xx = (window.innerWidth / WIDTH) * x;
    let yy = (window.innerHeight / HEIGHT) * y;
    if (center) {
        xx -= b.getBoundingClientRect().width / 2;
    }
    b.style.top = yy + 'px';
    b.style.left = xx + 'px';
    b.style.zIndex = '3';

    return b;
}
//---------------------------------------------------------------------------------