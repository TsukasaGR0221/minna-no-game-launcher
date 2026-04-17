import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  emoji: string;
  thumbnailUrl?: string;
  gameUrl: string;
  fullScreen?: boolean;
}

const GAMES: Game[] = [
  {
    id: 'animal-relay',
    title: 'どうぶつリレー',
    description: '動物たちとバトンをつなぐリレーゲーム！',
    emoji: '🏃',
    thumbnailUrl: '/animal-relay-thumb.png',
    gameUrl: 'https://doubutsu-relay.minna-game.workers.dev/',
    fullScreen: true,
  },
  {
    id: 'fishing-game',
    title: '釣りゲーム',
    description: 'タイミングよく魚を釣り上げよう！',
    emoji: '🎣',
    thumbnailUrl: '/fishing-thumb.png',
    gameUrl: 'https://fish-game.minna-game.workers.dev/',
    fullScreen: true,
  },
  {
    id: 'oodama-okuri',
    title: '大玉送りゲーム',
    description: 'みんなで協力して大玉を運ぼう！',
    emoji: '🏐',
    thumbnailUrl: '/oodama-thumb.png',
    gameUrl: 'https://balloon-game.minna-game.workers.dev/',
    fullScreen: true,
  },
  {
    id: 'snowman-builder',
    title: 'みんなでつくろう！ゆきだるま',
    description: 'みんなで協力して雪だるまを完成させよう！',
    emoji: '⛄',
    thumbnailUrl: '/snowman-thumb.png',
    gameUrl: 'https://snowman-game.minna-game.workers.dev/',
    fullScreen: true,
  },
  {
    id: 'heart-catch',
    title: 'ハートキャッチゲーム',
    description: 'たくさんハートをあつめよう！',
    emoji: '💖',
    thumbnailUrl: '/heart-thumb.png',
    gameUrl: 'https://heartcatch-game.minna-game.workers.dev/',
  },
  {
    id: 'sound-bom',
    title: 'Sound Bom',
    description: '音楽に合わせて爆弾を処理しよう！',
    emoji: '💣',
    thumbnailUrl: '/sound-bom-thumb.png',
    gameUrl: 'https://sound-bom.minna-game.workers.dev/',
  },
  {
    id: 'ufo-shooter',
    title: 'UFOシューター',
    description: '2キーを押してスタート！',
    emoji: '🛸',
    thumbnailUrl: '/ufo-shooter-thumb.png',
    gameUrl: 'https://ufo-shooter.minna-game.workers.dev/',
    fullScreen: true,
  },
  {
    id: 'target-practice',
    title: '的あてゲーム',
    description: 'タイミングよく的を狙い撃とう！',
    emoji: '🎯',
    thumbnailUrl: '/target-thumb.png',
    gameUrl: 'https://scratch.mit.edu/projects/1120412739',
    fullScreen: true,
  },
  {
    id: 'gomi-suitori',
    title: 'ゴミすいとりゲーム',
    description: '時間内にゴミをたくさん吸い取ろう！',
    emoji: '🧹',
    thumbnailUrl: '/gomi-suitori-thumb.png',
    gameUrl: 'https://scratch.mit.edu/projects/1120414365',
    fullScreen: true,
  },
  {
    id: 'choo-choo-battle',
    title: 'チューチューバトル',
    description: 'ボタンを押してネズミを回転させ制限時間内にエサを食べよう！',
    emoji: '🐭',
    thumbnailUrl: '/choo-choo-battle-thumb.png',
    gameUrl: 'https://scratch.mit.edu/projects/1062006325/',
    fullScreen: true,
  },
  {
    id: 'tsunahiki-game',
    title: 'つなひきゲーム',
    description: 'ボタンを連打して国旗を左右に動かそう！',
    emoji: '🎌',
    thumbnailUrl: '/tsunahiki-thumb.png',
    gameUrl: 'https://scratch.mit.edu/projects/1134388389',
    fullScreen: true,
  },
  {
    id: 'fruit-picking-game',
    title: '果物採取ゲーム',
    description: 'PキーやRキーで難易度を選んでスタート！',
    emoji: '🍎',
    thumbnailUrl: '/fruit-picking-thumb.png',
    gameUrl: 'https://scratch.mit.edu/projects/1216104717',
    fullScreen: true,
  },
  {
    id: 'yunis-paint',
    title: 'ユニーズペイント',
    description: '制限時間内に多く塗りつぶしたほうが勝ち！',
    emoji: '🎨',
    thumbnailUrl: '/yunis-paint-thumb.png',
    gameUrl: 'https://scratch.mit.edu/projects/1079948044/',
    fullScreen: true,
  },
  {
    id: 'quiz-showdown',
    title: '早押しクイズ対決！',
    description: 'わかったら早押しして、選択肢から答えよう',
    emoji: '💡',
    thumbnailUrl: '/quiz-thumb.png',
    gameUrl: 'https://www.hirake55.com/ai/play/view.php?id=sub_69d45ae353893',
    fullScreen: true,
  },
  {
    id: 'drill-digger-4',
    title: 'DRILL DIGGER 4',
    description: '30秒間で誰が一番深く掘れるか！？',
    emoji: '⛏️',
    thumbnailUrl: '/drill-digger-thumb.png',
    gameUrl: 'https://www.hirake55.com/ai/play/view.php?id=sub_69b21b137fc85',
    fullScreen: true,
  },
  {
    id: 'escape-from-dark',
    title: '闇からの逃走',
    description: '「何か」が振り向いた時に動くと、死ぬ。',
    emoji: '💀',
    thumbnailUrl: '/escape-thumb.png',
    gameUrl: 'https://www.hirake55.com/ai/play/view.php?id=sub_69c9419fb07ef',
    fullScreen: true,
  }
];

export default function App() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOpenGame = (game: Game) => {
    // iframeを使わず、同じタブで直接リンクを開く
    window.location.href = game.gameUrl;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ') {
        handleOpenGame(GAMES[focusedIndex]);
        return;
      }

      setFocusedIndex((prev) => {
        let cols = 2;

        let next = prev;
        switch (e.key) {
          case 'ArrowRight':
            if (prev % 2 === 1) {
              next = prev + 3; // Go to next page, left column
            } else {
              next = prev + 1;
            }
            break;
          case 'ArrowLeft':
            if (prev % 2 === 0) {
              next = prev - 3; // Go to previous page, right column
            } else {
              next = prev - 1;
            }
            break;
          case 'ArrowDown':
            next = prev + cols;
            break;
          case 'ArrowUp':
            next = prev - cols;
            break;
          default:
            return prev;
        }
        
        if (next < 0 || next >= GAMES.length) {
          return prev;
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex]);

  useEffect(() => {
    if (itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [focusedIndex]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      const elem = document.documentElement as any;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err: any) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-zinc-900 font-sans relative flex flex-col">
      <button 
        onClick={toggleFullscreen}
        className="fixed top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white border border-zinc-200 shadow-sm rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors z-50 flex items-center justify-center"
        title="全画面表示"
        tabIndex={-1}
      >
        <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Decorative Image */}
        <div className="hidden lg:flex flex-col w-48 xl:w-64 shrink-0 items-center justify-evenly p-4 gap-4">
          <img src="/logo.png" alt="Decoration" className="flex-1 min-h-0 w-3/4 object-contain saturate-150" />
          <img src="/logo.png" alt="Decoration" className="flex-1 min-h-0 w-3/4 object-contain saturate-150" />
          <img src="/logo.png" alt="Decoration" className="flex-1 min-h-0 w-3/4 object-contain saturate-150" />
        </div>

        <main className="flex-1 max-w-7xl w-full mx-auto px-2 py-2 md:px-4 md:py-4 flex flex-col min-h-0">
          <div className="shrink-0 mb-3 md:mb-5 text-center flex justify-center">
            <img src="/MinnaGame.png" alt="みんなのゲームラボ" className="h-10 md:h-16 lg:h-20 object-contain" />
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-2 md:gap-4">
            {GAMES.slice(Math.floor(focusedIndex / 4) * 4, (Math.floor(focusedIndex / 4) + 1) * 4).map((game, index) => {
              const globalIndex = Math.floor(focusedIndex / 4) * 4 + index;
              const isFocused = focusedIndex === globalIndex;
              return (
                <div 
                  key={game.id} 
                  ref={(el) => { itemRefs.current[globalIndex] = el; }}
                  onClick={() => {
                    setFocusedIndex(globalIndex);
                    handleOpenGame(game);
                  }}
                  className={`bg-white rounded-2xl shadow-sm border transition-all flex flex-col cursor-pointer overflow-hidden ${
                    isFocused 
                      ? 'border-yellow-400 ring-4 ring-yellow-400 scale-[1.02] z-10 relative' 
                      : 'border-zinc-200 hover:shadow-md hover:border-indigo-200'
                  }`}
                >
                  <div className={`w-full flex-1 min-h-0 flex items-center justify-center text-5xl md:text-7xl ${game.thumbnailUrl ? 'bg-zinc-100' : 'bg-zinc-50 border-b border-zinc-100'}`}>
                    {game.thumbnailUrl ? (
                      <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-contain object-center" />
                    ) : (
                      game.emoji
                    )}
                  </div>
                  <div className="h-12 sm:h-14 md:h-16 px-2 py-2 md:px-4 shrink-0 flex items-center justify-center bg-white border-t border-zinc-100">
                    <h2 className="text-sm sm:text-base md:text-xl font-bold text-center m-0 line-clamp-2">{game.title}</h2>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-center gap-4 shrink-0">
            <button
              onClick={() => setFocusedIndex(Math.max(0, Math.floor(focusedIndex / 4) * 4 - 4))}
              disabled={focusedIndex < 4}
              className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-zinc-600 font-bold hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              前のページ
            </button>
            <span className="text-zinc-500 font-bold">
              {Math.floor(focusedIndex / 4) + 1} / {Math.ceil(GAMES.length / 4)}
            </span>
            <button
              onClick={() => setFocusedIndex(Math.min(GAMES.length - 1, Math.floor(focusedIndex / 4) * 4 + 4))}
              disabled={focusedIndex >= Math.floor((GAMES.length - 1) / 4) * 4}
              className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-zinc-600 font-bold hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              次のページ
            </button>
          </div>
        </main>

        {/* Right Decorative Image */}
        <div className="hidden lg:flex flex-col w-48 xl:w-64 shrink-0 items-center justify-evenly p-4 gap-4">
          <img src="/logo.png" alt="Decoration" className="flex-1 min-h-0 w-3/4 object-contain saturate-150" />
          <img src="/logo.png" alt="Decoration" className="flex-1 min-h-0 w-3/4 object-contain saturate-150" />
          <img src="/logo.png" alt="Decoration" className="flex-1 min-h-0 w-3/4 object-contain saturate-150" />
        </div>
      </div>
    </div>
  );
}
