
export type GameStage = '번아웃 / 휴식 중' | '회복 중' | '일상 루틴 형성' | '사회 적응 단계';

export interface Stats {
  energy: number;
  happiness: number;
  mental: number;
  independence: number;
  money: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
  isCritical?: boolean;
}

export interface Choice {
  label: string;
  effect: (stats: Stats) => Stats;
  outcomeMessage: string;
}

export const STAGE_THRESHOLD = {
  '회복 중': 30,
  '일상 루틴 형성': 60,
  '사회 적응 단계': 90,
};
