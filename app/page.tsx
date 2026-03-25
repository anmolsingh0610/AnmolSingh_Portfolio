import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import StatsSection from "@/components/sections/StatsSection";
import LogsSection from "@/components/sections/LogsSection";
import ContactSection from "@/components/sections/ContactSection";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full relative z-10">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <StatsSection />
      <AchievementsSection />
      <LogsSection />
      <ExperienceSection />
      <ContactSection />

      {/* Spacer for scrolling down to simulate zero-g drift through space */}
      <div className="h-[20vh] w-full border-t border-chrome-900 border-dashed opacity-20 relative flex items-center justify-center">
        <span className="font-mono text-chrome-500 absolute top-10">END TRANSMISSION</span>
      </div>

      {/* Floating Mission Briefing Button */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] flex items-center gap-2 bg-chrome-100 text-void hover:bg-rust-500 hover:text-white transition-colors px-6 py-4 rounded-full font-mono font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(241,245,249,0.3)]"
        data-magnetic="true"
      >
        <Download size={18} />
        <span className="hidden sm:inline">MISSION BRIEFING (PDF)</span>
      </a>
    </main>
  );
}
