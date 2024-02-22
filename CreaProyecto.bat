@echo off
title 4DIV 2023 Project Creator By Luis Lopez Martinez.
color 0F
echo.
echo  4Div.js  v1.0.0
echo.
echo.
echo  -----------------------------------
echo  #Proyectos existentes en este pack#
echo  -----------------------------------
dir data/D
echo.
echo.
echo.
echo   Crear nuevo proyecto:
set/p nombre= Nombre? 
copy predef.html %nombre%.html
cd data
mkdir %nombre%
cd %nombre%
mkdir images
mkdir sounds
mkdir models
mkdir fonts
cd..
cd..
copy predef.js data\%nombre%\game.js
copy predef.ttf data\%nombre%\fonts\fnt.ttf
echo.
echo.
fart %nombre%.html myGameFolder %nombre%
fart data\%nombre%\game.js myGameFolder %nombre%
echo.
echo "TU PROYECTO HA SIDO CREADO!    Pulsa una tecla para cerrar esta ventana."
pause>nul
