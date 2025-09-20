import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Play, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  Music,
  Headphones,
  Zap,
  Target,
  TrendingUp,
  Volume2
} from "lucide-react";

export default function CursoDJ() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 text-lg px-6 py-2">
                🎧 CURSOS ONLINE
              </Badge>
              <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Aprenda a ser DJ Profissional
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-body">
                Domine as técnicas profissionais de discotecagem com os cursos mais completos do mercado
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" />
                  Começar Agora
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <Volume2 className="w-5 h-5 mr-2" />
                  Ver Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* DJ Básico */}
              <Card className="hover-elevate border-2 hover:border-primary/50 transition-all duration-300">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-display mb-2">DJ Básico</CardTitle>
                  <CardDescription className="text-lg">
                    Se você deseja se tornar um DJ profissional ou por hobby, esse curso é perfeito para você.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Play className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">70+</div>
                      <div className="text-sm text-muted-foreground">Aulas</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">20h+</div>
                      <div className="text-sm text-muted-foreground">Conteúdo</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Esse curso é para quem...</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Quer aprender discotecagem em qualquer gênero musical</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Deseja conhecer os fundamentos da mixagem</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Quer dominar técnicas básicas de transição</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full text-lg py-6" size="lg">
                    <Star className="w-5 h-5 mr-2" />
                    Matricular-se Agora
                  </Button>
                </CardContent>
              </Card>

              {/* DJ Avançado */}
              <Card className="hover-elevate border-2 hover:border-secondary/50 transition-all duration-300">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-display mb-2">DJ Avançado</CardTitle>
                  <CardDescription className="text-lg">
                    Se você deseja ir a fundo e conhecer todos os recursos dos equipamentos, esse curso é para você.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Play className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="text-2xl font-bold">80+</div>
                      <div className="text-sm text-muted-foreground">Aulas</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="text-2xl font-bold">20h+</div>
                      <div className="text-sm text-muted-foreground">Conteúdo</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Se você se identificar com os detalhes abaixo, este curso é pra você:</h4>
                    <div className="space-y-3">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-sm">Você sempre tenta e não consegue entender os botões dos setups?</div>
                            <div className="text-xs text-muted-foreground mt-1">Agora vai conseguir.</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-sm">Você ainda sente medo de encarar grandes gigs e dominar a pista?</div>
                            <div className="text-xs text-muted-foreground mt-1">Você vai perder estes medos e ser cada vez mais confiante.</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-sm">Está girando os pinos e não entende se realmente está fazendo certo?</div>
                            <div className="text-xs text-muted-foreground mt-1">Você vai aprender a dominar cada recurso e usar no momento correto.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full text-lg py-6" size="lg" variant="secondary">
                    <Award className="w-5 h-5 mr-2" />
                    Matricular-se Agora
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Courses */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Cursos Complementares
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expanda suas habilidades com nossos cursos especializados
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Criação de Mashups */}
              <Card className="hover-elevate">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Criação de Mashups e Intros</CardTitle>
                  <CardDescription>
                    Aprenda a criar mashups únicos e introduções personalizadas para seus sets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Técnicas de mashup profissional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Criação de intros personalizadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Uso do Ableton Live</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Em Breve
                  </Button>
                </CardContent>
              </Card>

              {/* Gravação de Set */}
              <Card className="hover-elevate">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Gravação de Set e Introdução à Produção Musical</CardTitle>
                  <CardDescription>
                    Aprenda a gravar sets profissionais e editar com qualidade de estúdio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Gravação de sets profissionais</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Edição e masterização</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Introdução à produção musical</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Em Breve
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                Pronto para se tornar um DJ Profissional?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Junte-se a centenas de alunos que já transformaram sua paixão pela música em profissão
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Users className="w-5 h-5 mr-2" />
                  Falar com Instrutor
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Aula Gratuita
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}