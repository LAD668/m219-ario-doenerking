'use client'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import HomeLearningPath from '@/components/learning/HomeLearningPath'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-custom section-spacing">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 mb-8">
            <h1 className="mb-6">
              Willkommen beim Einstieg mit R
            </h1>
            <p className="text-large mb-8 max-w-2xl mx-auto">
              Deine Lernplattform für die Ausbildung zum Entwickler Digitales Business EFZ
            </p>
            <p className="text-base text-white/90 mb-10 max-w-xl mx-auto">
              Lerne durch strukturierte Module mit Theorie, Videos und praktischen Aufgaben. 
              Übe direkt im Browser und erhalte sofortiges Feedback zu deinen Lösungen.
            </p>
            <div className="flex gap-4 justify-center">
              <Button href="/lernpfad" size="lg">
                Jetzt starten
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="container-custom section-spacing">
        <HomeLearningPath />
      </section>

      {/* Info Section */}
      <section className="container-custom section-spacing">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12">Über die Ausbildung</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover>
              <div>
                <h3 className="mb-4">
                  Für wen ist diese Ausbildung?
                </h3>
                <p className="text-grey-700">
                  Diese Plattform richtet sich an Auszubildende im Bereich &quot;Entwickler Digitales Business EFZ (EDB)&quot; ab dem ersten Lehrjahr. Keine Vorkenntnisse im Programmieren erforderlich.
                </p>
              </div>
            </Card>

            <Card hover>
              <div>
                <h3 className="mb-4">
                  Was man lernt
                </h3>
                <p className="text-grey-700">
                  Du erlernst die Grundlagen der Programmierung, Webentwicklung und digitalen Geschäftsprozesse. Jedes Modul baut auf dem vorherigen auf und führt dich Schritt für Schritt zum Ziel.
                </p>
              </div>
            </Card>

            <Card hover>
              <div>
                <h3 className="mb-4">
                  Wie der Lernpfad aufgebaut ist
                </h3>
                <p className="text-grey-700">
                  Der Lernpfad besteht aus strukturierten Modulen mit Theorie, Videos und praktischen Aufgaben. Du lernst im eigenen Tempo und kannst jederzeit zurückkehren.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-md text-center">
            <h2 className="mb-4 text-grey-900">
              Bereit, deine Reise zu starten?
            </h2>
            <p className="text-grey-700 mb-8 text-lg max-w-xl mx-auto">
              Beginne jetzt mit dem ersten Modul und lerne Schritt für Schritt die Grundlagen der Programmierung.
            </p>
            <Button href="/lernpfad" size="lg">
              Zum Lernpfad
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}

