
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation currentPage="Contact" />
      
      <div className="container py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="text-muted-foreground">
            Besoin d'aide ou d'informations supplémentaires ? Contactez-nous.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Par Email</CardTitle>
              <CardDescription>
                Notre équipe est disponible pour répondre à vos questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-primary" />
                <a 
                  href="mailto:contact@aiworkpay.fr" 
                  className="text-primary hover:underline"
                >
                  contact@aiworkpay.fr
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Nous nous efforçons de répondre à tous les messages dans un délai de 24 heures ouvrées.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Consultez notre documentation complète pour en savoir plus sur nos services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Notre documentation contient toutes les informations dont vous avez besoin pour utiliser efficacement notre plateforme.
              </p>
              <Button asChild>
                <Link to="/documentation" className="flex items-center gap-2">
                  Consulter la documentation
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
