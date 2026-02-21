import { Trophy, Star, ThumbsUp, Zap } from "lucide-react";
import site from "@/content/siteConfig";

const iconMap = [Trophy, Star, ThumbsUp, Zap];

const StatsBar = () => {
  return (
    <section className="relative z-20 -mt-12">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-elegant p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {site.stats.map((stat, index) => {
              const Icon = iconMap[index % iconMap.length];
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
