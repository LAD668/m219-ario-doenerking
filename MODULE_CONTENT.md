# Lernmodule: Einstieg in R

## Modul 1 – Einstieg in R & RStudio

### Lernziel
Du lernst, was R ist und wie du dich in RStudio orientierst. Du kannst erste einfache R-Befehle ausführen und verstehst den Unterschied zwischen R und RStudio.

### Lerninhalt

R ist eine Programmiersprache, die speziell für die Arbeit mit Daten entwickelt wurde. In Unternehmen wird R häufig verwendet, um Daten zu analysieren, Berichte zu erstellen und Geschäftsentscheidungen zu unterstützen.

R ist kostenlos und wird von vielen Unternehmen weltweit eingesetzt. Du kannst mit R Daten aus verschiedenen Quellen einlesen, diese untersuchen und visualisieren.

**R vs. RStudio**

Es ist wichtig, den Unterschied zwischen R und RStudio zu verstehen:

- **R** ist die Programmiersprache selbst. Sie enthält alle Funktionen und Befehle, die du zum Arbeiten mit Daten benötigst.
- **RStudio** ist ein Programm, das dir die Arbeit mit R erleichtert. RStudio ist wie ein Schreibtisch, auf dem du alles hast, was du brauchst: deinen Code, deine Daten, deine Ergebnisse.

**Orientierung in RStudio**

Wenn du RStudio öffnest, siehst du vier Bereiche:

- **Quellcode-Fenster (oben links)**: Hier schreibst du deinen Code.
- **Konsole (unten links)**: Hier werden deine Befehle ausgeführt.
- **Umgebung (oben rechts)**: Hier siehst du alle Objekte und Daten, die du erstellt hast.
- **Dateien/Plots/Pakete (unten rechts)**: Hier findest du deine Dateien, Grafiken und installierte Pakete.

**Erste R-Befehle**

R funktioniert wie ein Taschenrechner. Du kannst einfache Rechnungen direkt in der Konsole eingeben:

\`\`\`r
2 + 3
\`\`\`

R berechnet das Ergebnis sofort: 5

### Videobeschreibung
Das Video zeigt, wie du RStudio öffnest und dich in der Benutzeroberfläche orientierst. Es erklärt die vier Hauptbereiche von RStudio und zeigt, wie du einfache Rechnungen in der Konsole ausführst. Du siehst, wie R Befehle verarbeitet und Ergebnisse anzeigt.

### Praktische Aufgabe

Führe folgende Rechnungen in R aus:

\`\`\`r
# Addiere 15 und 27
15 + 27

# Multipliziere 8 mit 9
8 * 9

# Teile 100 durch 4
100 / 4
\`\`\`

### Erwartetes Ergebnis
R zeigt dir die Ergebnisse der drei Rechnungen an: 42, 72 und 25.

### Kompetenzen nach Abschluss
- Du verstehst, was R ist und wofür es verwendet wird
- Du kennst den Unterschied zwischen R und RStudio
- Du kannst dich in RStudio orientieren
- Du kannst einfache R-Befehle ausführen

---

## Modul 2 – R-Grundlagen & Objekte

### Lernziel
Du lernst, wie du Werte in Variablen speicherst, Vektoren erstellst und einfache Funktionen verwendest. Du kannst einfachen R-Code lesen und verstehen.

### Lerninhalt

**Variablen und Objekte**

In R kannst du Werte speichern, um sie später wieder zu verwenden. Dafür verwendest du Variablen. Eine Variable ist wie eine Schachtel mit einem Namen, in der du einen Wert aufbewahrst.

Du erstellst eine Variable mit dem Zuweisungsoperator <- (Pfeil nach links):

\`\`\`r
alter <- 25
name <- "Max"
\`\`\`

Jetzt hast du zwei Variablen erstellt: "alter" enthält die Zahl 25, und "name" enthält den Text "Max".

**Vektoren**

Ein Vektor ist eine Sammlung von Werten. Stell dir vor, du hast mehrere Altersangaben von Mitarbeitern. Statt jede einzeln zu speichern, kannst du sie alle in einem Vektor zusammenfassen:

\`\`\`r
alter_team <- c(25, 30, 28, 32, 27)
\`\`\`

Das c() bedeutet "combine" (kombiniere). Du erstellst einen Vektor mit fünf Alterswerten.

**Einfache Funktionen**

Funktionen sind vorgefertigte Werkzeuge, die bestimmte Aufgaben erledigen. R hat viele eingebaute Funktionen.

Die Funktion mean() berechnet den Durchschnitt:

\`\`\`r
mean(alter_team)
\`\`\`

Das Ergebnis ist 28.4 - das Durchschnittsalter deines Teams.

Die Funktion length() zeigt dir, wie viele Werte in einem Vektor sind:

\`\`\`r
length(alter_team)
\`\`\`

Das Ergebnis ist 5, weil der Vektor fünf Werte enthält.

**Code lesen und verstehen**

Wenn du R-Code liest, achte auf folgende Dinge:

1. Variablennamen beschreiben, was gespeichert wird
2. <- speichert einen Wert in einer Variable
3. Funktionen haben immer Klammern ()
4. Text steht immer in Anführungszeichen ""

### Videobeschreibung
Das Video zeigt, wie du Variablen erstellst und Werte speicherst. Es erklärt, wie du Vektoren mit c() erstellst und wie du Funktionen wie mean() und length() verwendest. Du siehst praktische Beispiele mit Geschäftsdaten wie Umsätzen und Teamgrößen.

### Praktische Aufgabe

Erstelle eine Variable "umsatz" mit dem Wert 5000 und einen Vektor "monate" mit den Werten 1 bis 6:

\`\`\`r
# Erstelle eine Variable
umsatz <- 5000

# Erstelle einen Vektor
monate <- c(1, 2, 3, 4, 5, 6)

# Zeige die Werte an
umsatz
monate
\`\`\`

Berechne dann den Durchschnitt eines Vektors mit Verkaufszahlen:

\`\`\`r
# Erstelle einen Vektor mit Verkaufszahlen
verkaufe <- c(100, 150, 200, 180, 220)

# Berechne den Durchschnitt
mean(verkaufe)

# Zeige die Anzahl der Werte
length(verkaufe)
\`\`\`

### Erwartetes Ergebnis
Die Variable "umsatz" enthält 5000. Der Vektor "monate" enthält die Zahlen 1 bis 6. Der Durchschnitt der Verkaufszahlen ist 170, und die Anzahl der Werte ist 5.

### Kompetenzen nach Abschluss
- Du verstehst, was Variablen und Objekte sind
- Du kannst Vektoren erstellen und verwenden
- Du kennst einfache Funktionen wie mean() und length()
- Du kannst einfachen R-Code lesen und verstehen

---

## Modul 3 – Daten einlesen & verstehen

### Lernziel
Du lernst, was Datensätze sind und wie du CSV-Dateien in R importierst. Du kannst Daten mit head(), str() und summary() untersuchen und gewinnst erste Einblicke in deine Daten.

### Lerninhalt

**Was sind Datensätze?**

Ein Datensatz ist eine strukturierte Sammlung von Informationen. Stell dir eine Tabelle vor, wie du sie aus Excel kennst.

In einem Datensatz hat jede Zeile einen Eintrag (z.B. ein Kunde, ein Produkt, ein Verkauf). Jede Spalte enthält eine Information (z.B. Name, Alter, Umsatz).

**Zeilen und Spalten**

In R werden Datensätze als "Data Frames" bezeichnet. Ein Data Frame ist wie eine Tabelle:

- **Zeilen (Rows)**: Jede Zeile ist ein einzelner Datensatz
- **Spalten (Columns)**: Jede Spalte ist eine Variable oder ein Merkmal

Wenn du einen Datensatz mit 100 Kunden und 5 Informationen pro Kunde hast, dann hat dein Data Frame 100 Zeilen und 5 Spalten.

**CSV-Dateien importieren**

CSV-Dateien sind Textdateien, in denen Daten durch Kommas getrennt sind. Sie sind sehr verbreitet, weil fast jedes Programm sie lesen kann.

Um eine CSV-Datei in R einzulesen, verwendest du die Funktion read.csv():

\`\`\`r
kundendaten <- read.csv("kunden.csv")
\`\`\`

Dieser Befehl liest die Datei "kunden.csv" ein und speichert sie in der Variable "kundendaten".

**Daten inspizieren**

Nach dem Einlesen solltest du dir einen ersten Überblick verschaffen. Dafür gibt es drei wichtige Funktionen:

**head()** zeigt dir die ersten sechs Zeilen deines Datensatzes:

\`\`\`r
head(kundendaten)
\`\`\`

**str()** zeigt dir die Struktur deines Datensatzes:

\`\`\`r
str(kundendaten)
\`\`\`

Du siehst: Wie viele Zeilen und Spalten es gibt, die Namen aller Spalten, den Datentyp jeder Spalte und die ersten Werte jeder Spalte.

**summary()** gibt dir eine statistische Zusammenfassung:

\`\`\`r
summary(kundendaten)
\`\`\`

Für Zahlen zeigt summary() Minimum, Maximum, Durchschnitt, Median und Quartile. Für Text zeigt es, wie oft jeder Wert vorkommt.

### Videobeschreibung
Das Video zeigt, wie du eine CSV-Datei in R einliest. Es erklärt die Funktionen head(), str() und summary() und zeigt, wie du sie verwendest, um einen ersten Überblick über deine Daten zu gewinnen. Du siehst praktische Beispiele mit Kundendaten und Verkaufsdaten.

### Praktische Aufgabe

Lese eine CSV-Datei ein und inspiziere sie:

\`\`\`r
# Lese die Datei ein
meine_daten <- read.csv("daten.csv")

# Zeige die ersten Zeilen
head(meine_daten)

# Zeige die Struktur
str(meine_daten)

# Zeige eine Zusammenfassung
summary(meine_daten)
\`\`\`

### Erwartetes Ergebnis
Du siehst die ersten sechs Zeilen deines Datensatzes, die vollständige Struktur mit allen Spalten und Datentypen, sowie eine statistische Zusammenfassung der Daten.

### Kompetenzen nach Abschluss
- Du verstehst, was Datensätze sind und wie sie aufgebaut sind
- Du kannst CSV-Dateien in R importieren
- Du kannst Daten mit head(), str() und summary() untersuchen
- Du gewinnst erste Einblicke in deine Daten

