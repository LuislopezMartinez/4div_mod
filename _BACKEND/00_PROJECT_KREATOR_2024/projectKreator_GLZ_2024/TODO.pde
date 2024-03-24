////////////////////////////////////////////////////////////////////////
//            This file are part of:
//            GameLibZero 2.4.7 by Luis Lopez Martinez
//                  12/09/2017 - 24/05/2020
//                OPEN SOURCE - M.I.T. License.  
////////////////////////////////////////////////////////////////////////
/*


14/05/2020  GLZ  add    hint(ENABLE_KEY_REPEAT); on setup.
14/05/2020  EGUI add    on eguiInputBoxes add the method: setTextFont();
14/05/2020  NLZ  bug    correction on link netLibZero to Android projects.

15/05/2020  GLZ  mod    hint(ENABLE_KEY_REPEAT) erased from setup() and mover to EGUI input box activateBox event for best global performance.

22/05/202   mod_file  mod    añadido el cierre del handle a disco que impedia eliminar un archivo tras leerlo con la funcion loadLines().. 

23/05/2020  GLZ  mod    cambiado el type por defecto a cero.. originalmente estaba a -1.

24/05/2020  EGUI add    añadido el uso de teclado nativo en el port a Android.

24/03/2024  NET  add    añadida la nueva libreria de red para Websockets y TCP en dos modulos independientes.













*/
