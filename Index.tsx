import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { GAMES, getLatestResult } from "@/lib/gameStore";

const gameRoutes: Record<string, string> = {
  clock: "/game/clock",
  recall: "/game/recall",
  spotdiff: "/game/spotdiff",
  orientation: "/game/orientation",
  maze: "/game/maze",
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-elder-2xl font-bold"
        >
          🧩 认知小游戏
        </motion.h1>
        <p className="text-elder-base text-muted-foreground mt-1">
          选一个游戏，轻松玩一玩
        </p>
      </div>

      {/* Tip banner */}
      <div className="mx-5 mb-5 p-4 rounded-2xl bg-primary/10 border border-primary/20">
        <p className="text-elder-sm text-foreground">
          💡 每天玩一玩，保持大脑活力！本游戏不能代替医学诊断。
        </p>
      </div>

      {/* Game cards */}
      <div className="px-5 space-y-3">
        {GAMES.map((game, i) => {
          const latest = getLatestResult(game.id);
          return (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate(gameRoutes[game.id])}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card game-card-shadow game-card-hover text-left"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                {game.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-elder-lg font-semibold">{game.name}</h3>
                <p className="text-elder-sm text-muted-foreground">{game.desc}</p>
              </div>
              {latest && (
                <span className={`text-elder-sm font-medium px-3 py-1 rounded-full flex-shrink-0 ${
                  latest.result === "良好" ? "bg-accent/15 text-accent" :
                  latest.result === "一般" ? "bg-warning/15 text-warning" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {latest.result}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
