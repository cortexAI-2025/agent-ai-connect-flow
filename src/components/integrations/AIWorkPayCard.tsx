
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Mail, Phone, Globe } from "lucide-react";

const AIWorkPayCard = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Agent developed by AIWorkPay SAS</CardTitle>
        <CardDescription>
          An innovative solution to connect autonomous agents with freelance services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>contact@aiworkpay.fr</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+33602405147</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href="https://aiworkpay.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://aiworkpay.tech
              </a>
            </div>
          </div>
          <Button asChild variant="outline">
            <a href="https://aiworkpay.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <span>Visit website</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkPayCard;
