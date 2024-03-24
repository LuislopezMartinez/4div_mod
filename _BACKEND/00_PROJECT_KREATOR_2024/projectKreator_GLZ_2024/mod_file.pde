////////////////////////////////////////////////////////////////////////
//            This file are part of:
//            GameLibZero 2.4.7 by Luis Lopez Martinez
//                  12/09/2017 - 24/05/2020
//                OPEN SOURCE - M.I.T. License.
////////////////////////////////////////////////////////////////////////
/*

 http://tutorials.jenkov.com/java-nio/files.html#overwriting-existing-files
 
 */

//import javax.xml.bind.DatatypeConverter;

import java.nio.file.*;

void fileCopy( String source, String destination, boolean overwrite ) {
    Path sourcePath      = Paths.get( source );
    Path destinationPath = Paths.get( destination );

    try {
        if (overwrite) {
            Files.copy(sourcePath, destinationPath, StandardCopyOption.REPLACE_EXISTING);
        } else {
            Files.copy(sourcePath, destinationPath);
        }
    }
    catch(FileAlreadyExistsException e) {
        //destination file already exists
    }
    catch (IOException e) {
        //something else went wrong
        e.printStackTrace();
    }
}

//------------------------------------------------------------
boolean fileExists(String filename) {
    File file=new File( filename );
    //println(file.getName());
    boolean exists = file.exists();
    if (exists) {
        //println("true");
        return true;
    } else {
        //println("false");
        return false;
    }
}
//------------------------------------------------------------
void mkDir( String folderName ) {
    File dir = new File( folderName );
    dir.mkdir();
}
//------------------------------------------------------------
//------------------------------------------------------------
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.Writer;
//------------------------------------------------------------
void writeLine( String filename, String newLine ) {
    // append = true
    try {
        PrintWriter output = new PrintWriter(new FileWriter( filename, true ));
        output.printf("%s\r\n", newLine);
        output.flush();
        output.close();
    }
    catch (Exception e) {
    }
}
void writeLine( String filename, String newLine, boolean append ) {
    // append = true
    try {
        PrintWriter output = new PrintWriter(new FileWriter( filename, append ));
        output.printf("%s\r\n", newLine);
        output.flush();
        output.close();
    }
    catch (Exception e) {
    }
}
//------------------------------------------------------------
void writeLines( String filename, StringList lines ) {
    // append = true
    PrintWriter output = null;
    try {
        output = new PrintWriter(new FileWriter( filename, true ));
        for (int i=0; i<lines.size(); i++) {
            output.printf("%s\r\n", lines.get(i));
        }
        output.flush();
        output.close();
    }
    catch (Exception e) {
    }
}
void writeLines( String filename, StringList lines, boolean append ) {
    // append = true
    PrintWriter output = null;
    try {
        output = new PrintWriter(new FileWriter( filename, append ));
        for (int i=0; i<lines.size(); i++) {
            output.printf("%s\r\n", lines.get(i));
        }
        output.flush();
        output.close();
    }
    catch (Exception e) {
    }
}
//------------------------------------------------------------
StringList loadLines(String filename) {
    StringList msg = new StringList();
    BufferedReader reader = createReader(filename);        // creo lector de disco..
    String line = null;
    try {
        while ((line = reader.readLine()) != null) {      // mientras queden lineas por leer..
            msg.append(line);                             // voy leyendo y guardando en el msg..
        }
        reader.close();
    }
    catch(Exception e) {
    }
    return msg;
}
//------------------------------------------------------------
void deleteFile( String filename ) {
    File fichero = new File( filename );
    if (fichero.delete()) {
        println(filename + " eliminado con exito.");
    } else {
        println(filename + " no se pudo eliminar.");
    }
}
//------------------------------------------------------------
void deleteFile( String filename, boolean dataPathMode ) {
    File fichero;
    if (dataPathMode) {
        fichero = new File(dataPath(filename));
    } else {
        fichero = new File(filename);
    }
    if (fichero.delete()) {
        println(filename + " eliminado con exito.");
    } else {
        println(filename + " no se pudo eliminar.");
    }
}
//------------------------------------------------------------
// LOAD BYTES FROM FILE..
byte[] loadBinaryFile(String inputFile) {
    byte[] b = null;
    try {
        b = Files.readAllBytes(Paths.get(inputFile));
    }
    catch (IOException ex) {
        ex.printStackTrace();
    }
    return b;
}
//------------------------------------------------------------
// WRITE BYTES TO FILE..
void writeBinaryFile(byte[] b, String outputFile) {
    try {
        Files.write(Paths.get(outputFile), b);
    }
    catch (IOException ex) {
        ex.printStackTrace();
    }
}
//------------------------------------------------------------
/*
// BASE 64 DECODER..
 byte[] toBytes(String s){
 String buffer = DatatypeConverter.printBase64Binary(s.getBytes());
 return DatatypeConverter.parseBase64Binary(buffer);
 }
 //------------------------------------------------------------
 // BASE 64 ENCODER..
 String toString(byte[] b){
 return new String(b);
 }
 //------------------------------------------------------------
 */
