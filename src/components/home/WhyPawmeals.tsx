import React from "react";
import { Award, Flame, Heart, Leaf, Shield, Truck } from "lucide-react";

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface WhyPawmealsProps {
  features: Feature[] | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  shield: Shield,
  heart: Heart,
  award: Award,
  leaf: Leaf,
  truck: Truck,
};

const iconColors = [
  "bg-pm-caramel/15 text-pm-caramel-dark",
  "bg-pm-sage/15 text-pm-sage-dark",
  "bg-pm-terracotta/12 text-pm-terracotta",
  "bg-pm-gold/15 text-pm-brown",
  "bg-pm-sage-light/25 text-pm-sage-dark",
  "bg-pm-sand/45 text-pm-brown",
];

export function WhyPawmeals({ features }: WhyPawmealsProps) {
  if (!features?.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon || "heart"] || Heart;
            const colorClass = iconColors[index % iconColors.length];

            return (
              <div key={`${feature.title}-${index}`} className="group p-6 rounded-3xl luxury-panel hover:bg-white hover:shadow-warm-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h2 className="font-heading font-bold text-pm-brown text-body-lg mb-2">{feature.title}</h2>
                <p className="text-pm-brown/70 text-body-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
