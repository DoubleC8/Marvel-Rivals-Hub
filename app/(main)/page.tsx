import ChatWithPlayersSection from "@/components/home/ChatWithPlayersSection";
import CreatePlayerProfileSection from "@/components/home/CreatePlayerProfileSection";
import PlayerStatsSection from "@/components/home/PlayerStatsSection";
import WelcomePage from "@/components/home/WelcomePage";

export default async function Home() {
  return (
    <div className="homepage-web">
      <WelcomePage />
      <CreatePlayerProfileSection />
      <ChatWithPlayersSection />
      <PlayerStatsSection />
    </div>
  );
}
