import * as glz from '../../library/4Div.js';
// magia de alex!
Object.keys(glz).foreach(key => {
    window[key] = glz[key];
});

