// Datenstruktur für Lerninhalte und Aufgaben

export interface LearningModule {
  id: string
  title: string
  description: string
  videoUrl?: string
  content: string
  learningObjectives: string[]
  order: number
}

export interface Challenge {
  id: string
  moduleId: string
  title: string
  description: string
  type: 'code' | 'quiz' | 'multiple-choice'
  difficulty: 'easy' | 'medium' | 'hard'
  codeTemplate?: string
  language?: string
  solution?: string
  quizQuestion?: string
  quizOptions?: string[]
  quizCorrectAnswer?: number
  order: number
}

// Lernmodule für R-Programmierung
export const learningModules: LearningModule[] = [
  {
    id: '1',
    title: 'Einstieg in R & RStudio',
    description: 'Lerne die Grundlagen von R kennen und orientiere dich in RStudio',
    videoUrl: 'https://www.youtube.com/embed/cyqbsDVNPsw',
    content: `
# Einstieg in R & RStudio

## Was ist R?

R ist eine Programmiersprache, die speziell für die Arbeit mit Daten entwickelt wurde. In Unternehmen wird R häufig verwendet, um Daten zu analysieren, Berichte zu erstellen und Geschäftsentscheidungen zu unterstützen.

R ist kostenlos und wird von vielen Unternehmen weltweit eingesetzt. Du kannst mit R Daten aus verschiedenen Quellen einlesen, diese untersuchen und visualisieren.

## R vs. RStudio

Es ist wichtig, den Unterschied zwischen R und RStudio zu verstehen:

**R** ist die Programmiersprache selbst. Sie enthält alle Funktionen und Befehle, die du zum Arbeiten mit Daten benötigst.

**RStudio** ist ein Programm, das dir die Arbeit mit R erleichtert. RStudio ist wie ein Schreibtisch, auf dem du alles hast, was du brauchst: deinen Code, deine Daten, deine Ergebnisse. Du kannst R auch ohne RStudio verwenden, aber RStudio macht die Arbeit viel einfacher.

## Orientierung in RStudio

Wenn du RStudio öffnest, siehst du vier Bereiche:

**Quellcode-Fenster (oben links)**: Hier schreibst du deinen Code. Du kannst mehrere Dateien gleichzeitig öffnen.

**Konsole (unten links)**: Hier werden deine Befehle ausgeführt. Du siehst die Ergebnisse direkt hier.

**Umgebung (oben rechts)**: Hier siehst du alle Objekte und Daten, die du erstellt hast.

**Dateien/Plots/Pakete (unten rechts)**: Hier findest du deine Dateien, Grafiken und installierte Pakete.

## Erste R-Befehle

R funktioniert wie ein Taschenrechner. Du kannst einfache Rechnungen direkt in der Konsole eingeben:

\`\`\`r
2 + 3
\`\`\`

R berechnet das Ergebnis sofort: 5

Du kannst auch mehrere Rechnungen auf einmal machen:

\`\`\`r
10 * 5
20 / 4
\`\`\`

R führt jeden Befehl aus und zeigt dir das Ergebnis an.

## Wichtige Grundlagen

In R wird jeder Befehl mit Enter bestätigt. Wenn R auf weitere Eingaben wartet, siehst du ein + Zeichen. Drücke dann ESC, um zurückzukehren.

Kommentare in R beginnen mit #. Alles nach dem # wird ignoriert:

\`\`\`r
# Das ist ein Kommentar
2 + 2  # Das ist eine Rechnung
\`\`\`

Kommentare helfen dir, deinen Code zu verstehen und zu dokumentieren.

## Video: RStudio Tutorial deutsch – Einführung in R

Dieses Video zeigt die Installation von R und RStudio sowie eine erste Orientierung in der Benutzeroberfläche.
    `,
    learningObjectives: [
      'Du verstehst, was R ist und wofür es verwendet wird',
      'Du kennst den Unterschied zwischen R und RStudio',
      'Du kannst dich in RStudio orientieren',
      'Du kannst einfache R-Befehle ausführen',
    ],
    order: 1,
  },
  {
    id: '2',
    title: 'R-Grundlagen & Objekte',
    description: 'Lerne Variablen, Vektoren und Funktionen kennen',
    videoUrl: 'https://www.youtube.com/embed/Rr_7hJ28qFs',
    content: `
# R-Grundlagen & Objekte

## Variablen und Objekte

In R kannst du Werte speichern, um sie später wieder zu verwenden. Dafür verwendest du Variablen. Eine Variable ist wie eine Schachtel mit einem Namen, in der du einen Wert aufbewahrst.

Du erstellst eine Variable mit dem Zuweisungsoperator <- (Pfeil nach links):

\`\`\`r
alter <- 25
name <- "Max"
\`\`\`

Jetzt hast du zwei Variablen erstellt: "alter" enthält die Zahl 25, und "name" enthält den Text "Max".

Du kannst den Inhalt einer Variable jederzeit anzeigen, indem du einfach ihren Namen eingibst:

\`\`\`r
alter
name
\`\`\`

## Vektoren

Ein Vektor ist eine Sammlung von Werten. Stell dir vor, du hast mehrere Altersangaben von Mitarbeitern. Statt jede einzeln zu speichern, kannst du sie alle in einem Vektor zusammenfassen:

\`\`\`r
alter_team <- c(25, 30, 28, 32, 27)
\`\`\`

Das c() bedeutet "combine" (kombiniere). Du erstellst einen Vektor mit fünf Alterswerten.

Du kannst auch Text in Vektoren speichern:

\`\`\`r
abteilungen <- c("Vertrieb", "Marketing", "IT", "HR")
\`\`\`

## Einfache Funktionen

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

## Code lesen und verstehen

Wenn du R-Code liest, achte auf folgende Dinge:

1. Variablennamen beschreiben, was gespeichert wird
2. <- speichert einen Wert in einer Variable
3. Funktionen haben immer Klammern ()
4. Text steht immer in Anführungszeichen ""

Beispiel:

\`\`\`r
umsatz_q1 <- c(10000, 12000, 15000)
durchschnitt <- mean(umsatz_q1)
\`\`\`

Dieser Code erstellt einen Vektor mit drei Umsatzzahlen, berechnet dann den Durchschnitt und speichert ihn in der Variable "durchschnitt".

## Video: Einführung in R – Grundlagen (Deutsch)

Erklärung von Variablen, Vektoren und grundlegender R-Syntax anhand einfacher Beispiele.
    `,
    learningObjectives: [
      'Du verstehst, was Variablen und Objekte sind',
      'Du kannst Vektoren erstellen und verwenden',
      'Du kennst einfache Funktionen wie mean() und length()',
      'Du kannst einfachen R-Code lesen und verstehen',
    ],
    order: 2,
  },
  {
    id: '3',
    title: 'Daten einlesen & verstehen',
    description: 'Lerne, wie du Daten importierst und erste Einblicke gewinnst',
    videoUrl: 'https://www.youtube.com/embed/Ia5Q1LlCCFc',
    content: `
# Daten einlesen & verstehen

## Was sind Datensätze?

Ein Datensatz ist eine strukturierte Sammlung von Informationen. Stell dir eine Tabelle vor, wie du sie aus Excel kennst.

In einem Datensatz hat jede Zeile einen Eintrag (z.B. ein Kunde, ein Produkt, ein Verkauf). Jede Spalte enthält eine Information (z.B. Name, Alter, Umsatz).

Beispiel: Eine Kundendatenbank hat Zeilen für jeden Kunden und Spalten für Name, E-Mail, Bestellwert, etc.

## Zeilen und Spalten

In R werden Datensätze als "Data Frames" bezeichnet. Ein Data Frame ist wie eine Tabelle:

- **Zeilen (Rows)**: Jede Zeile ist ein einzelner Datensatz
- **Spalten (Columns)**: Jede Spalte ist eine Variable oder ein Merkmal

Wenn du einen Datensatz mit 100 Kunden und 5 Informationen pro Kunde hast, dann hat dein Data Frame 100 Zeilen und 5 Spalten.

## CSV-Dateien importieren

CSV-Dateien sind Textdateien, in denen Daten durch Kommas getrennt sind. Sie sind sehr verbreitet, weil fast jedes Programm sie lesen kann.

Um eine CSV-Datei in R einzulesen, verwendest du die Funktion read.csv():

\`\`\`r
kundendaten <- read.csv("kunden.csv")
\`\`\`

Dieser Befehl liest die Datei "kunden.csv" ein und speichert sie in der Variable "kundendaten".

Wichtig: Die Datei muss sich im Arbeitsverzeichnis befinden, oder du musst den vollständigen Pfad angeben.

## Daten inspizieren

Nach dem Einlesen solltest du dir einen ersten Überblick verschaffen. Dafür gibt es drei wichtige Funktionen:

### head() - Die ersten Zeilen

Die Funktion head() zeigt dir die ersten sechs Zeilen deines Datensatzes:

\`\`\`r
head(kundendaten)
\`\`\`

So siehst du schnell, wie deine Daten aussehen und welche Spalten vorhanden sind.

### str() - Die Struktur

Die Funktion str() zeigt dir die Struktur deines Datensatzes:

\`\`\`r
str(kundendaten)
\`\`\`

Du siehst:
- Wie viele Zeilen und Spalten es gibt
- Die Namen aller Spalten
- Den Datentyp jeder Spalte (Zahl, Text, etc.)
- Die ersten Werte jeder Spalte

### summary() - Zusammenfassung

Die Funktion summary() gibt dir eine statistische Zusammenfassung:

\`\`\`r
summary(kundendaten)
\`\`\`

Für Zahlen zeigt summary():
- Minimum und Maximum
- Durchschnitt (Mean)
- Median
- Quartile

Für Text zeigt summary():
- Wie oft jeder Wert vorkommt

## Praktisches Beispiel

Stell dir vor, du hast Verkaufsdaten eingelesen:

\`\`\`r
verkaufsdaten <- read.csv("verkaufe.csv")
head(verkaufsdaten)
str(verkaufsdaten)
summary(verkaufsdaten)
\`\`\`

Mit diesen drei Befehlen hast du einen guten Überblick über deine Daten und kannst entscheiden, welche Analysen sinnvoll sind.

## Video: CSV-Dateien in R importieren (Deutsch)

Schritt-für-Schritt Erklärung, wie CSV-Dateien mit read.csv() in R eingelesen und überprüft werden.
    `,
    learningObjectives: [
      'Du verstehst, was Datensätze sind und wie sie aufgebaut sind',
      'Du kannst CSV-Dateien in R importieren',
      'Du kannst Daten mit head(), str() und summary() untersuchen',
      'Du gewinnst erste Einblicke in deine Daten',
    ],
    order: 3,
  },
]

export const challenges: Challenge[] = [
  {
    id: '1',
    moduleId: '1',
    title: 'Erste R-Befehle ausführen',
    description: 'Führe einfache Rechnungen in R aus',
    type: 'code',
    difficulty: 'easy',
    codeTemplate: '# Führe folgende Rechnungen aus:\n# 1. Addiere 15 und 27\n# 2. Multipliziere 8 mit 9\n# 3. Teile 100 durch 4\n\n15 + 27\n8 * 9\n100 / 4',
    language: 'r',
    solution: '15 + 27',
    order: 1,
  },
  {
    id: '2',
    moduleId: '1',
    title: 'R und RStudio verstehen',
    description: 'Teste dein Wissen über R und RStudio',
    type: 'multiple-choice',
    difficulty: 'easy',
    quizQuestion: 'Was ist der Unterschied zwischen R und RStudio?',
    quizOptions: [
      'R ist eine Programmiersprache, RStudio ist ein Programm zum Arbeiten mit R',
      'R und RStudio sind dasselbe',
      'RStudio ist die Programmiersprache, R ist das Programm',
      'Es gibt keinen Unterschied',
    ],
    quizCorrectAnswer: 0,
    order: 2,
  },
  {
    id: '3',
    moduleId: '2',
    title: 'Variablen und Vektoren erstellen',
    description: 'Erstelle Variablen und einen Vektor',
    type: 'code',
    difficulty: 'easy',
    codeTemplate: '# Erstelle eine Variable "umsatz" mit dem Wert 5000\n# Erstelle einen Vektor "monate" mit den Werten 1, 2, 3, 4, 5, 6\n\numsatz <- 5000\nmonate <- c(1, 2, 3, 4, 5, 6)',
    language: 'r',
    solution: 'umsatz <- 5000',
    order: 1,
  },
  {
    id: '4',
    moduleId: '2',
    title: 'Funktionen verwenden',
    description: 'Verwende mean() und length() auf einem Vektor',
    type: 'code',
    difficulty: 'medium',
    codeTemplate: '# Erstelle einen Vektor "verkaufe" mit den Werten 100, 150, 200, 180, 220\n# Berechne den Durchschnitt mit mean()\n# Zeige die Anzahl der Werte mit length()\n\nverkaufe <- c(100, 150, 200, 180, 220)\nmean(verkaufe)\nlength(verkaufe)',
    language: 'r',
    solution: 'mean(verkaufe)',
    order: 2,
  },
  {
    id: '5',
    moduleId: '3',
    title: 'Daten einlesen',
    description: 'Lese eine CSV-Datei ein und inspiziere sie',
    type: 'code',
    difficulty: 'medium',
    codeTemplate: '# Lese die Datei "daten.csv" ein und speichere sie in "meine_daten"\n# Zeige die ersten Zeilen mit head()\n# Zeige die Struktur mit str()\n\nmeine_daten <- read.csv("daten.csv")\nhead(meine_daten)\nstr(meine_daten)',
    language: 'r',
    solution: 'read.csv("daten.csv")',
    order: 1,
  },
  {
    id: '6',
    moduleId: '3',
    title: 'Daten verstehen',
    description: 'Teste dein Wissen über Dateninspektion',
    type: 'multiple-choice',
    difficulty: 'easy',
    quizQuestion: 'Welche Funktion zeigt dir die Struktur eines Datensatzes?',
    quizOptions: [
      'str()',
      'head()',
      'summary()',
      'read.csv()',
    ],
    quizCorrectAnswer: 0,
    order: 2,
  },
]

// Hilfsfunktion zum Validieren von Code-Lösungen
export function validateCodeSolution(userCode: string, expectedSolution: string): boolean {
  // Einfache Validierung - kann erweitert werden
  const normalizedUser = userCode.trim().replace(/\s+/g, ' ')
  const normalizedExpected = expectedSolution.trim().replace(/\s+/g, ' ')
  
  // Prüfe, ob der erwartete Code enthalten ist
  return normalizedUser.includes(normalizedExpected) || 
         normalizedExpected.includes(normalizedUser)
}
