/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Battery, 
  Heart, 
  Brain, 
  TrendingUp, 
  Moon, 
  Utensils, 
  Footprints, 
  BookOpen, 
  Briefcase,
  AlertCircle,
  Smartphone,
  Frown,
  Wind,
  Tv,
  Zap,
  ShoppingBag,
  Car,
  Wrench,
  Truck,
  Skull,
  Package,
  Construction,
  Hand,
  Flame
} from 'lucide-react';
import { Stats, GameStage, GameEvent, STAGE_THRESHOLD } from './types';
import { INITIAL_STATS, EVENTS } from './constants';

export default function App() {
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [stage, setStage] = useState<GameStage>('번아웃 / 휴식 중');
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [eventOutcome, setEventOutcome] = useState<string | null>(null);
  const [day, setDay] = useState(1);
  const [logs, setLogs] = useState<string[]>(['다시 오신 걸 환영합니다. 쉬어도 괜찮아요.']);
  
  const [nickname, setNickname] = useState<string>('');
  const [tempNickname, setTempNickname] = useState<string>('');
  const [isNameSet, setIsNameSet] = useState<boolean>(false);
  const [nameAlert, setNameAlert] = useState<string | null>(null);
  const [eventInterval, setEventInterval] = useState<number>(60000); // Default 1 minute
  const [activeTab, setActiveTab] = useState<'basic' | 'livelihood' | 'dopamine' | 'consumption'>('basic');
  const [reasonAlert, setReasonAlert] = useState<string | null>(null);

  // Stage progression logic
  useEffect(() => {
    if (stats.mental >= STAGE_THRESHOLD['사회 적응 단계'] && stats.independence >= 80) {
      setStage('사회 적응 단계');
    } else if (stats.mental >= STAGE_THRESHOLD['일상 루틴 형성'] && stats.independence >= 40) {
      setStage('일상 루틴 형성');
    } else if (stats.mental >= STAGE_THRESHOLD['회복 중']) {
      setStage('회복 중');
    } else {
      setStage('번아웃 / 휴식 중');
    }
  }, [stats.mental, stats.independence]);

  // Idle mechanic: stats change over time
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newStats = { ...prev };
        newStats.happiness = Math.max(0, prev.happiness - 0.5);
        newStats.mental = Math.max(0, prev.mental - 0.2);
        newStats.energy = Math.min(100, prev.energy + 1);
        return newStats;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Day cycle and random events
  useEffect(() => {
    const dayInterval = setInterval(() => {
      setDay(d => d + 1);
      const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      setCurrentEvent(randomEvent);
    }, eventInterval); 
    return () => clearInterval(dayInterval);
  }, [eventInterval]);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  }, []);

  const handleAction = (action: string) => {
    setStats(prev => {
      const next = { ...prev };
      switch (action) {
        case 'sleep':
          next.energy = Math.min(100, prev.energy + 25);
          next.mental = Math.min(100, prev.mental + 5);
          addLog('깊은 잠에 빠졌습니다. 모든 걱정이 잠시 사라집니다.');
          break;
        case 'eat':
          next.energy = Math.min(100, prev.energy + 15);
          next.happiness = Math.min(100, prev.happiness + 10);
          next.money = Math.max(0, prev.money - 10000);
          addLog('식사를 마쳤습니다. 배가 부르니 살 것 같네요.');
          break;
        case 'walk':
          next.mental = Math.min(100, prev.mental + 10);
          next.happiness = Math.min(100, prev.happiness + 5);
          next.energy = Math.max(0, prev.energy - 10);
          addLog('정처 없이 걷다 보니 마음이 조금 진정됩니다.');
          break;
        case 'self_dev':
          next.independence = Math.min(100, prev.independence + 8);
          next.mental = Math.max(0, prev.mental - 5);
          next.energy = Math.max(0, prev.energy - 15);
          addLog('자기개발에 힘썼습니다. 어제보다 나은 내가 된 기분입니다.');
          break;
        case 'dopamine_shorts':
          next.happiness = Math.min(100, prev.happiness + 15);
          next.mental = Math.max(0, prev.mental - 15);
          next.energy = Math.max(0, prev.energy - 5);
          addLog('도파민 쇼츠를 무한으로 즐겼습니다. 뇌가 녹는 기분입니다.');
          break;
        case 'work_healthy':
          next.money += 80000;
          next.energy = Math.max(0, prev.energy - 20);
          next.mental = Math.max(0, prev.mental - 5);
          next.independence = Math.min(100, prev.independence + 2);
          addLog('건전한 알바를 마쳤습니다. 보람찬 하루네요.');
          break;
        case 'work_unhealthy':
          next.money += 250000;
          next.energy = Math.max(0, prev.energy - 30);
          next.mental = Math.max(0, prev.mental - 25);
          next.happiness = Math.max(0, prev.happiness - 10);
          addLog('불건전한 알바를 했습니다. 돈은 되지만 자괴감이 밀려옵니다.');
          break;
        case 'work_coupang':
          next.money += 120000;
          next.energy = Math.max(0, prev.energy - 35);
          next.mental = Math.max(0, prev.mental - 10);
          addLog('쿠팡 물류센터에서 땀을 흘렸습니다. 온몸이 쑤십니다.');
          break;
        case 'work_construction':
          next.money += 180000;
          next.energy = Math.max(0, prev.energy - 45);
          next.mental = Math.max(0, prev.mental - 15);
          addLog('야가다 현장에서 하루를 보냈습니다. 먼지가 가득하지만 돈은 확실하네요.');
          break;
        case 'steal':
          next.money += Math.floor(Math.random() * 50000) + 10000;
          next.mental = Math.max(0, prev.mental - 30);
          next.happiness = Math.max(0, prev.happiness - 20);
          next.independence = Math.max(0, prev.independence - 15);
          addLog('무언가를 훔쳤습니다. 심장이 터질 것 같고 죄책감이 듭니다.');
          break;
        case 'breakdown':
          next.mental = Math.max(0, prev.mental - 20);
          next.happiness = Math.min(100, prev.happiness + 20);
          addLog('멘헤라짓을 하며 감정을 배설했습니다. 잠시나마 편안합니다.');
          break;
        case 'smoke_1mm':
          next.mental = Math.min(100, prev.mental + 10);
          next.energy = Math.max(0, prev.energy - 5);
          next.money = Math.max(0, prev.money - 4500);
          addLog('담배 1mm를 피웠습니다. 가벼운 연기가 흩어집니다.');
          break;
        case 'smoke_5mm':
          next.mental = Math.min(100, prev.mental + 20);
          next.energy = Math.max(0, prev.energy - 15);
          next.money = Math.max(0, prev.money - 4500);
          addLog('담배 5mm를 피웠습니다. 묵직한 타격감이 느껴집니다.');
          break;
        case 'malatang':
          next.happiness = Math.min(100, prev.happiness + 30);
          next.energy = Math.min(100, prev.energy + 10);
          next.money = Math.max(0, prev.money - 20000);
          addLog('마라탕을 시켜 먹었습니다. 혈중 마라 농도가 충전되었습니다!');
          break;
        case 'donate_seyeon':
          next.money = Math.max(0, prev.money - 100000);
          next.happiness = Math.min(100, prev.happiness + 40);
          next.mental = Math.max(0, prev.mental - 15);
          addLog('과즙세연에게 후원했습니다. "OO님 감사합니다!" 한마디에 행복해집니다.');
          break;
        case 'monster':
          next.money = Math.max(0, prev.money - 2500);
          next.energy = Math.min(100, prev.energy + 30);
          next.mental = Math.max(0, prev.mental - 5);
          addLog('몬스터를 마시고 각성했습니다. 잠이 오지 않습니다.');
          break;
        case 'fake_luxury':
          next.money = Math.max(0, prev.money - 200000);
          next.happiness = Math.min(100, prev.happiness + 25);
          next.independence = Math.max(0, prev.independence - 5);
          addLog('짭명품을 샀습니다. 티는 안 나겠지만 마음 한구석이 찝찝합니다.');
          break;
        case 'long_term_rent':
          next.money = Math.max(0, prev.money - 5000000);
          next.happiness = Math.min(100, prev.happiness + 60);
          next.independence = Math.max(0, prev.independence - 40);
          addLog('월 500만원 장기렌트를 계약했습니다. 이제 나는 카푸어입니다.');
          break;
      }
      return next;
    });
  };

  const handleChoice = (choiceIndex: number) => {
    if (!currentEvent) return;
    const choice = currentEvent.choices[choiceIndex];
    setStats(prev => choice.effect(prev));
    setEventOutcome(choice.outcomeMessage);
    addLog(`Event: ${choice.outcomeMessage}`);
    setCurrentEvent(null);
  };

  const stageClass = useMemo(() => {
    switch (stage) {
      case '번아웃 / 휴식 중': return 'stage-burnout';
      case '회복 중': return 'stage-recovering';
      case '일상 루틴 형성': return 'stage-routine';
      case '사회 적응 단계': return 'stage-social';
      default: return '';
    }
  }, [stage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#12121e] items-center overflow-x-hidden">
      <div className="w-full max-w-[500px] min-h-screen flex flex-col bg-[#1e1e2f] shadow-2xl relative">
        {currentEvent?.isCritical && !eventOutcome && <div className="critical-overlay" />}
        
        {/* Top Stats */}
        <div className="grid grid-cols-2 gap-2 p-4 bg-[#1e1e2f] border-b-4 border-[#3f3f5f]">
          <StatItem icon={<Battery size={14} />} label="에너지" value={stats.energy} color="var(--accent-energy)" />
          <StatItem icon={<Heart size={14} />} label="행복" value={stats.happiness} color="var(--accent-happiness)" />
          <StatItem icon={<Brain size={14} />} label="멘탈" value={stats.mental} color="var(--accent-mental)" />
          <StatItem icon={<TrendingUp size={14} />} label="자립도" value={stats.independence} color="var(--accent-independence)" />
        </div>

        {/* Main Game Area */}
        <div className="game-scene flex-1 flex flex-col relative overflow-hidden">
          {/* Top Info Bar */}
          <div className="p-4 bg-black/40 border-b-2 border-[#3f3f5f] z-10">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-white/90 font-bold">{nickname || '청년'}</span>
                  <button 
                    onClick={() => setNameAlert('이름은 바꿀 수 없습니다.')}
                    className="text-[8px] bg-[#3f3f5f] px-1 rounded text-white/50 hover:text-white"
                  >
                    수정
                  </button>
                </div>
                <div className="text-xl text-[#ffd93d]">DAY {day}</div>
                <div className="text-[10px] text-white/70">{stage}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#888]">{stats.money.toLocaleString()} KRW</div>
                <div className="text-[9px] text-[#ff6b6b] italic">"무너지지 마세요"</div>
              </div>
            </div>
          </div>

          {/* Room View */}
          <div className={`flex-1 relative room ${stageClass}`}>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 scale-125">
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative"
              >
                {logs.length > 0 && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 text-[10px] rounded whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-white shadow-lg z-20">
                    {logs[0]}
                  </div>
                )}
                <Character stage={stage} />
                
                {stage !== '번아웃 / 휴식 중' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -left-12 bottom-0 scale-75">
                    <Plant />
                  </motion.div>
                )}
                {stage === '사회 적응 단계' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -right-12 bottom-0 scale-75">
                    <Window />
                  </motion.div>
                )}
              </motion.div>
            </div>
            {/* Bed Decoration */}
            <div className="absolute bottom-0 left-0 w-[100px] h-[80px] bg-[#3a3a6a] border-t-4 border-[#1a1a2e]" />
          </div>

          {/* Logs (Floating) */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10">
            <div className="space-y-1">
              {logs.slice(1, 4).map((log, i) => (
                <div key={i} className="text-[9px] text-white/40 bg-black/20 px-2 py-1 rounded w-fit">
                  {`> ${log}`}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Overlays */}
        <AnimatePresence>
          {currentEvent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`w-full max-w-sm p-6 border-4 bg-[#1e1e2f] ${currentEvent.isCritical ? 'border-[#ff0000] shadow-[0_0_30px_rgba(255,0,0,0.4)]' : 'border-[#3f3f5f]'}`}
              >
                <div className={`flex items-center gap-2 mb-3 ${currentEvent.isCritical ? 'text-[#ff4444] animate-pulse' : 'text-[#ffd93d]'}`}>
                  <AlertCircle size={20} />
                  <h3 className="text-xs font-bold underline">
                    {currentEvent.isCritical ? '🚨 CRITICAL EMERGENCY' : '⚠️ 돌발 이벤트'}
                  </h3>
                </div>
                <p className={`text-sm font-bold mb-2 ${currentEvent.isCritical ? 'text-[#ff6666]' : ''}`}>{currentEvent.title}</p>
                <p className="text-xs leading-relaxed mb-6 text-white/80">{currentEvent.description}</p>
                <div className="space-y-2">
                  {currentEvent.choices.map((choice, i) => (
                    <button 
                      key={i}
                      onClick={() => handleChoice(i)}
                      className={`w-full text-left p-4 border-2 text-[10px] font-pixel transition-colors ${
                        currentEvent.isCritical 
                        ? 'border-[#ff4444] text-[#ff4444] active:bg-[#ff4444] active:text-white' 
                        : 'border-[#3f3f5f] text-white active:bg-[#3f3f5f]'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {choice.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {eventOutcome && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-sm p-8 border-4 border-white bg-black text-center"
              >
                <p className="text-xs leading-relaxed mb-8 text-white">{eventOutcome}</p>
                <button 
                  onClick={() => setEventOutcome(null)}
                  className="w-full py-4 bg-white text-black text-xs font-bold uppercase active:bg-gray-200"
                >
                  확인 (Close)
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Interaction Panel */}
        <div className="p-3 bg-[#1e1e2f] border-t-4 border-[#3f3f5f]">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[9px] text-[#ffd93d] font-bold">이벤트 주기:</span>
            <div className="flex gap-2">
              {[30000, 60000, 180000].map((ms) => (
                <button
                  key={ms}
                  onClick={() => {
                    setEventInterval(ms);
                    addLog(`이벤트 주기가 ${ms / 60000 >= 1 ? ms / 60000 + '분' : '30초'}으로 변경되었습니다.`);
                  }}
                  className={`text-[8px] px-2 py-1 border ${
                    eventInterval === ms 
                    ? 'bg-[#ffd93d] text-black border-[#ffd93d]' 
                    : 'bg-transparent text-white/50 border-[#3f3f5f]'
                  } transition-colors`}
                >
                  {ms === 30000 ? '30초' : ms === 60000 ? '1분' : '3분'}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#3f3f5f] mb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'basic', label: '기본' },
              { id: 'livelihood', label: '생계활동' },
              { id: 'dopamine', label: '도파민' },
              { id: 'consumption', label: '소비탭' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 text-[10px] whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                  ? 'text-[#ffd93d] border-b-2 border-[#ffd93d]' 
                  : 'text-white/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[240px] pb-4">
            {activeTab === 'basic' && (
              <>
                <ActionButton 
                  icon={<Moon size={20} />} 
                  label="잠자기" 
                  cost="E++, M+" 
                  onClick={() => handleAction('sleep')} 
                  disabled={stats.energy >= 100} 
                  onDisabledClick={() => setReasonAlert('이미 에너지가 가득 차 있습니다.')}
                />
                <ActionButton 
                  icon={<Utensils size={20} />} 
                  label="식사" 
                  cost="E+, H+, ₩-" 
                  onClick={() => handleAction('eat')} 
                  disabled={stats.money < 10000} 
                  onDisabledClick={() => setReasonAlert('식사비 10,000원이 부족합니다.')}
                />
                <ActionButton 
                  icon={<Footprints size={20} />} 
                  label="산책" 
                  cost="M+, H+" 
                  onClick={() => handleAction('walk')} 
                  disabled={stats.energy < 10} 
                  onDisabledClick={() => setReasonAlert('산책할 에너지가 부족합니다. (최소 10 필요)')}
                />
                <ActionButton 
                  icon={<BookOpen size={20} />} 
                  label="자기개발" 
                  cost="I+, M-, E-" 
                  onClick={() => handleAction('self_dev')} 
                  disabled={stats.energy < 15} 
                  onDisabledClick={() => setReasonAlert('공부할 에너지가 부족합니다. (최소 15 필요)')}
                />
                <ActionButton 
                  icon={<Smartphone size={20} />} 
                  label="도파민 쇼츠" 
                  cost="H+, M--" 
                  onClick={() => handleAction('dopamine_shorts')} 
                  disabled={stats.energy < 5} 
                  onDisabledClick={() => setReasonAlert('쇼츠를 볼 에너지가 부족합니다. (최소 5 필요)')}
                />
              </>
            )}
            {activeTab === 'livelihood' && (
              <>
                <ActionButton 
                  icon={<Briefcase size={20} />} 
                  label="건전알바" 
                  cost="₩+, E-, M-" 
                  onClick={() => handleAction('work_healthy')} 
                  disabled={stats.energy < 20} 
                  onDisabledClick={() => setReasonAlert('알바할 에너지가 부족합니다. (최소 20 필요)')}
                />
                <ActionButton 
                  icon={<Skull size={20} />} 
                  label="불건전알바" 
                  cost="₩++, M---" 
                  onClick={() => handleAction('work_unhealthy')} 
                  disabled={stats.energy < 30} 
                  onDisabledClick={() => setReasonAlert('알바할 에너지가 부족합니다. (최소 30 필요)')}
                />
                <ActionButton 
                  icon={<Package size={20} />} 
                  label="쿠팡뛰기" 
                  cost="₩+, E---" 
                  onClick={() => handleAction('work_coupang')} 
                  disabled={stats.energy < 35} 
                  onDisabledClick={() => setReasonAlert('쿠팡 뛸 에너지가 부족합니다. (최소 35 필요)')}
                />
                <ActionButton 
                  icon={<Construction size={20} />} 
                  label="야가다" 
                  cost="₩++, E----" 
                  onClick={() => handleAction('work_construction')} 
                  disabled={stats.energy < 45} 
                  onDisabledClick={() => setReasonAlert('야가다 뛸 에너지가 부족합니다. (최소 45 필요)')}
                />
                <ActionButton icon={<Hand size={20} />} label="뭐 훔치기" cost="₩?, M---, I-" onClick={() => handleAction('steal')} />
              </>
            )}
            {activeTab === 'dopamine' && (
              <>
                <ActionButton icon={<Frown size={20} />} label="멘헤라짓" cost="H+, M--" onClick={() => handleAction('breakdown')} />
                <ActionButton 
                  icon={<Wind size={20} />} 
                  label="담배 1mm" 
                  cost="M+, E-, ₩-" 
                  onClick={() => handleAction('smoke_1mm')} 
                  disabled={stats.money < 4500 || stats.energy < 5} 
                  onDisabledClick={() => setReasonAlert(stats.money < 4500 ? '담배값 4,500원이 부족합니다.' : '담배 필 에너지가 부족합니다. (최소 5 필요)')}
                />
                <ActionButton 
                  icon={<Flame size={20} />} 
                  label="담배 5mm" 
                  cost="M++, E--, ₩-" 
                  onClick={() => handleAction('smoke_5mm')} 
                  disabled={stats.money < 4500 || stats.energy < 15} 
                  onDisabledClick={() => setReasonAlert(stats.money < 4500 ? '담배값 4,500원이 부족합니다.' : '담배 필 에너지가 부족합니다. (최소 15 필요)')}
                />
                <ActionButton 
                  icon={<Truck size={20} />} 
                  label="마라탕" 
                  cost="H++, ₩-" 
                  onClick={() => handleAction('malatang')} 
                  disabled={stats.money < 20000} 
                  onDisabledClick={() => setReasonAlert('마라탕값 20,000원이 부족합니다.')}
                />
                <ActionButton 
                  icon={<Tv size={20} />} 
                  label="과즙세연 후원" 
                  cost="H+++, ₩--" 
                  onClick={() => handleAction('donate_seyeon')} 
                  disabled={stats.money < 100000} 
                  onDisabledClick={() => setReasonAlert('후원금 100,000원이 부족합니다.')}
                />
              </>
            )}
            {activeTab === 'consumption' && (
              <>
                <ActionButton 
                  icon={<Zap size={20} />} 
                  label="몬스터" 
                  cost="E+++, M-, ₩-" 
                  onClick={() => handleAction('monster')} 
                  disabled={stats.money < 2500} 
                  onDisabledClick={() => setReasonAlert('몬스터값 2,500원이 부족합니다.')}
                />
                <ActionButton 
                  icon={<ShoppingBag size={20} />} 
                  label="짭명품 사기" 
                  cost="H++, ₩-, I-" 
                  onClick={() => handleAction('fake_luxury')} 
                  disabled={stats.money < 200000} 
                  onDisabledClick={() => setReasonAlert('짭명품값 200,000원이 부족합니다.')}
                />
                <ActionButton 
                  icon={<Car size={20} />} 
                  label="장기렌트" 
                  cost="H+++, ₩----, I---" 
                  onClick={() => handleAction('long_term_rent')} 
                  disabled={stats.money < 5000000} 
                  onDisabledClick={() => setReasonAlert('장기렌트비 5,000,000원이 부족합니다.')}
                />
              </>
            )}
          </div>
        </div>

        {/* Initial Name Input Modal */}
        <AnimatePresence>
          {!isNameSet && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm p-8 border-4 border-[#3f3f5f] bg-[#1e1e2f] text-center"
              >
                <h2 className="text-sm text-[#ffd93d] mb-6">당신의 이름을 입력하세요</h2>
                <input 
                  type="text"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  placeholder="닉네임 입력..."
                  className="w-full bg-black/40 border-2 border-[#3f3f5f] p-3 text-white text-xs mb-6 focus:outline-none focus:border-[#ffd93d]"
                  maxLength={10}
                />
                <button 
                  onClick={() => {
                    if (tempNickname.trim()) {
                      setNickname(tempNickname);
                      setIsNameSet(true);
                      addLog(`${tempNickname}님의 이야기가 시작됩니다.`);
                    }
                  }}
                  className="w-full py-4 bg-[#ffd93d] text-black text-xs font-bold uppercase active:bg-[#e6c235] disabled:opacity-50"
                  disabled={!tempNickname.trim()}
                >
                  시작하기
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Name Change Alert */}
        <AnimatePresence>
          {nameAlert && (
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 bg-black/60">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-xs p-6 border-4 border-[#ff6b6b] bg-[#1e1e2f] text-center"
              >
                <p className="text-xs text-white mb-6">{nameAlert}</p>
                <button 
                  onClick={() => setNameAlert(null)}
                  className="w-full py-2 bg-[#ff6b6b] text-white text-[10px] font-bold uppercase active:bg-[#ff5252]"
                >
                  확인
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Reason Alert */}
        <AnimatePresence>
          {reasonAlert && (
            <div className="fixed inset-0 z-[220] flex items-center justify-center p-6 bg-black/60">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-xs p-6 border-4 border-[#ffd93d] bg-[#1e1e2f] text-center"
              >
                <p className="text-xs text-white mb-6">{reasonAlert}</p>
                <button 
                  onClick={() => setReasonAlert(null)}
                  className="w-full py-2 bg-[#ffd93d] text-black text-[10px] font-bold uppercase active:bg-[#e6c235]"
                >
                  확인
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, cost, onClick, disabled, onDisabledClick }: { 
  icon: ReactNode, 
  label: string, 
  cost: string, 
  onClick: () => void,
  disabled?: boolean,
  onDisabledClick?: () => void
}) {
  return (
    <button 
      onClick={() => {
        if (disabled && onDisabledClick) {
          onDisabledClick();
        } else if (!disabled) {
          onClick();
        }
      }}
      className={`flex flex-col items-center justify-center p-2 bg-[#2a2a4a] border-2 border-[#3f3f5f] active:bg-[#3f3f5f] transition-all ${disabled ? 'opacity-40 grayscale' : ''}`}
    >
      <div className="text-white mb-1">{icon}</div>
      <div className="text-[9px] text-white font-bold leading-tight">{label}</div>
      <div className="text-[7px] text-[#aaa] mt-0.5">{cost}</div>
    </button>
  );
}

function StatItem({ icon, label, value, color }: { icon: ReactNode, label: string, value: number, color: string }) {
  return (
    <div className="bg-[#2a2a40] p-2 border border-[#3f3f5f]">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1 text-[8px] text-white/70">
          {icon} <span>{label}</span>
        </div>
        <span className="text-[9px] font-bold" style={{ color }}>{Math.round(value)}%</span>
      </div>
      <div className="h-1.5 bg-black/40 border border-white/10 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className="h-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function Character({ stage }: { stage: GameStage }) {
  const color = stage === '번아웃 / 휴식 중' ? '#4a4a4a' : stage === '회복 중' ? '#8a9a8a' : stage === '일상 루틴 형성' ? '#a8a878' : '#78a8a8';
  const eyeColor = stage === '번아웃 / 휴식 중' ? '#333' : '#fff';
  const isHappy = stage === '사회 적응 단계' || stage === '일상 루틴 형성';
  
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="pixel-character">
      <ellipse cx="32" cy="58" rx="16" ry="4" fill="black" opacity="0.2" />
      <rect x="20" y="28" width="24" height="28" fill={color} stroke="black" strokeWidth="2" />
      <rect x="24" y="32" width="16" height="20" fill="white" opacity="0.1" />
      <rect x="16" y="8" width="32" height="24" fill={color} stroke="black" strokeWidth="2" />
      <motion.g animate={stage === '번아웃 / 휴식 중' ? { opacity: [1, 0.5, 1] } : {}} transition={{ repeat: Infinity, duration: 3 }}>
        <rect x="24" y="18" width="4" height="4" fill={eyeColor} />
        <rect x="36" y="18" width="4" height="4" fill={eyeColor} />
      </motion.g>
      {stage === '번아웃 / 휴식 중' ? (
        <rect x="28" y="26" width="8" height="2" fill="black" />
      ) : isHappy ? (
        <path d="M 28 26 Q 32 30 36 26" stroke="black" strokeWidth="2" fill="none" />
      ) : (
        <rect x="28" y="26" width="8" height="2" fill="black" />
      )}
      <rect x="16" y="8" width="32" height="4" fill="black" opacity="0.3" />
      <rect x="12" y="32" width="8" height="12" fill={color} stroke="black" strokeWidth="2" />
      <rect x="44" y="32" width="8" height="12" fill={color} stroke="black" strokeWidth="2" />
    </svg>
  );
}

function Plant() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x="12" y="24" width="8" height="8" fill="#5d4037" stroke="black" strokeWidth="1" />
      <rect x="8" y="8" width="16" height="16" fill="#4caf50" stroke="black" strokeWidth="1" />
      <rect x="12" y="12" width="8" height="8" fill="#2e7d32" />
    </svg>
  );
}

function Window() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <rect x="4" y="4" width="40" height="40" fill="#81d4fa" stroke="black" strokeWidth="2" />
      <rect x="22" y="4" width="4" height="40" fill="black" />
      <rect x="4" y="22" width="40" height="4" fill="black" />
      <circle cx="12" cy="12" r="4" fill="#fff9c4" />
    </svg>
  );
}
