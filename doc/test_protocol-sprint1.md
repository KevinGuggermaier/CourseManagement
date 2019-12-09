### Course Management System
#ROOMS
Test-Protokoll

# 1.	Funktion:
Die Implementierung des Managementsystems für Räume umfasst die Funktionalität um verschiedene Räume aus einem JSON Dokument auszulesen und dies in einer Tabelle darzustellen. Weiters kann man die Einträge in der Tabelle durchsuchen, auch mit mehreren Such-Eingaben. Die Seite kann um Einträge in der Tabelle erweitert werden (welche jedoch nicht von einer Sitzung zu nächsten gespeichert werden können) und gut übersichtlich gedruckt werden.
# 2.	Team:
-	Guggermaier Kevin
-	Neubauer Dominik
-	Ozim Ulrike
-	Paier Markus
-	Veit Jessica

# 3.	Test

Tester: Dominik Neubauer

## Ergebnisse: 
### Was wurde getestet?

- Performance: 
    - Test mit 90 Datensätzen (Test_data_big.json)
    - Ergebnis: kaum Zeitverzögerung beim suchen (nur der Standard-Timeout von 0,5s zwischen Tastaturanschlägen)
    - Analyse/Erreicht durch: auf das JSON-File wird nur einmal zugegriffen und alle Daten in einem global verfügbaren Objekt gespeichert. Beim suchen wird rekursiv nur über dieses iteriert und die Ergebnisse gesammelt ausgegeben.
- Funktion:
    - Daten aus JSON einlesen und in einer Tabelle ausgeben. Auch das Auslesen von Arrays bzw. Objekten innerhalb des JSON-Files funktioniert korrekt.
    - Suchen: man kann mehrere Begriffe in das Suchfeld eingeben und nach einem Moment (Standard-Timeout von 0,5s) werden die Ergebnisse entsprechen angezeigt. Nur wenn alle Begriffe (getrennt durch ein Leerzeichen) in einem Datensatz vorkommen wird dieser auch angezeigt.
    - Drucken: Es werden nur relevante Daten auf der Ausgabe angezeigt und keine Inhalte werden abgeschnitten (wird jedoch nicht von allen Browsern unterstützt: Google Chrome (JA), Mozilla Firefox (NEIN)
    - Neue Daten (Räume) hinzufügen: Mit der Eingabe aller notwendigen Informationen kann man einen neuen Raum zur Liste hinzufügen. Dieser neue Datensatz ist jedoch Sitzungsabhängig und kann aus technischen Gründen nicht permanent gespeichert werden (man bräuchte eine mächtigere Datenstruktur im Hintergrund, etwa eine Datenbank)
    - Responsive Desgin: Die Webseite passt sich dem Ausgabegerät an. So können alle Inhalte auf allen Endgeräten gut konsumiert werden.
- Kompatibilität: Es ist möglich die Webseite auf jeder Oberfläche gut verwenden (siehe Responsive Design). Die Druckausgabe ist Browserspezifisch - wird nicht von jedem Browser gleich unterstütz.

### Wo wurde getestet?

-	Google Chrome (sowohl Desktop-Site als auch Mobile-Site)
-	Mozilla Firefox (sowohl Desktop-Site als auch Mobile-Site)

### Wie wurde getestet?

- Manuelle Vorgehensweise:
    - Öffnen der Website im Browser (Google Chrome und Mozilla Firefox)
    - Abgleich der Daten mit dem Input JSON-File
    - Testen der Suchen-Funktion: ein Wort, mehrere Wörter, “Blödsinn” - siehe Screenshot 1, 3
    - Testen der Druck-Funktion und dem Design der Ausgabe (Browserspezifische wird diese wie im CSS File definiert unterstützt oder leider nicht) - siehe Screenshot 2
    - Eingabe von Zusatzdaten - siehe Screenshot 1
    - Testen der Kompatibilität mit kleinen Screens (Mobilen Endgeräten) im device bar tool von Google Chrome - siehe Screenshot 4
- Prüfung von Syntax mit Hilfe von Validatoren:
    - HTML Validator: https://validator.w3.org/
    - CSS Validator: https://jigsaw.w3.org/css-validator/
    - JavaScript Validator: https://de.piliapp.com/javascript-validator/


