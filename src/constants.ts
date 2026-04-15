
import { GameEvent, Stats } from './types';

export const INITIAL_STATS: Stats = {
  energy: 50,
  happiness: 30,
  mental: 20,
  independence: 0,
  money: 100000, // 10만원 시작
};

export const EVENTS: GameEvent[] = [
  {
    id: 'account_blackmail',
    title: '🚨 [긴급] 통장협박 사기 발생 💸',
    description: '모르는 번호로 당신의 계좌가 범죄에 이용되었다며 협박 문자가 왔습니다. 돈을 보내지 않으면 가족에게 알리겠다고 합니다.',
    isCritical: true,
    choices: [
      {
        label: '무시한다 (회피)',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 20), happiness: Math.max(0, s.happiness - 10) }),
        outcomeMessage: '협박 수위가 올라갔습니다. 가족 연락을 언급하며 압박해옵니다.',
      },
      {
        label: '돈을 보낸다 (도피)',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 500000), mental: Math.max(0, s.mental - 10) }),
        outcomeMessage: '"마지막입니다"라던 범인은 이후에도 3번 더 돈을 요구했습니다.',
      },
      {
        label: '경찰에 신고한다 (직면)',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 40), independence: s.independence + 10 }),
        outcomeMessage: '사건은 해결되었지만, 기나긴 조사 과정과 스트레스로 멘탈이 붕괴되었습니다.',
      },
    ],
  },
  {
    id: 'stock_reading_scam',
    title: '📈 주식 리딩방 사기 📉',
    description: '"수익률 500% 보장"이라는 말에 속아 유료 리딩방에 가입했습니다. 추천받은 종목이 급락 중입니다.',
    isCritical: true,
    choices: [
      {
        label: '손절한다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 300000), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '-70% 손실을 확정 지었습니다. 가슴이 찢어집니다.',
      },
      {
        label: '물타기 한다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 600000), mental: Math.max(0, s.mental - 30) }),
        outcomeMessage: '평단을 낮추려다 -90%까지 밀렸습니다. 이제는 돌이킬 수 없습니다.',
      },
      {
        label: '계속 믿는다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 1000000), mental: Math.max(0, s.mental - 50) }),
        outcomeMessage: '리딩방이 갑자기 폭파되고 방장은 잠수했습니다. 전 재산을 날렸습니다.',
      },
    ],
  },
  {
    id: 'sextortion_new',
    title: '🚨 [위급] 몸캠 피싱 협박 😱',
    description: '순간의 호기심으로 응한 영상통화가 지옥이 되었습니다. 상대방이 당신의 연락처 목록을 들이밀며 협박합니다.',
    isCritical: true,
    choices: [
      {
        label: '돈을 준다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 1000000), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '"유출 안 하겠다"던 범인은 다음 날 또 다른 명목으로 연락해왔습니다.',
      },
      {
        label: '차단한다',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 40), happiness: Math.max(0, s.happiness - 20) }),
        outcomeMessage: '일부 지인에게 영상이 유출되었습니다. 불안감이 극에 달합니다.',
      },
      {
        label: '지인에게 먼저 말한다',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 25), happiness: Math.max(0, s.happiness - 30), independence: s.independence + 15 }),
        outcomeMessage: '쪽팔림은 극에 달했지만, 협박의 명분이 사라져 범인이 포기했습니다.',
      },
    ],
  },
  {
    id: 'romance_phishing_new',
    title: '❤️ 로맨스 피싱 (스캠) 💔',
    description: '온라인에서 만난 연인이 갑자기 큰 사고가 났다며 수술비를 빌려달라고 간곡히 부탁합니다.',
    isCritical: true,
    choices: [
      {
        label: '계속 믿는다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 500000), mental: Math.max(0, s.mental - 30) }),
        outcomeMessage: '"사랑해"라는 마지막 메시지를 남기고 상대는 계정을 삭제했습니다.',
      },
      {
        label: '의심한다',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 40), happiness: Math.max(0, s.happiness - 20) }),
        outcomeMessage: '상대의 태도가 급변하며 폭언을 퍼붓습니다. 감정이 완전히 붕괴되었습니다.',
      },
      {
        label: '돈 요구 거절',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 10), happiness: Math.max(0, s.happiness - 10) }),
        outcomeMessage: '거절하자마자 바로 차단당했습니다. 모든 게 가짜였다는 사실에 허탈합니다.',
      },
    ],
  },
  {
    id: 'medical_strike_new',
    title: '🏥 의료파업 상황 발생 🚑',
    description: '갑자기 몸이 좋지 않아 병원을 찾았으나, 의료파업으로 인해 진료를 받기가 매우 어렵습니다.',
    choices: [
      {
        label: '버틴다',
        effect: (s) => ({ ...s, energy: Math.max(0, s.energy - 30), mental: Math.max(0, s.mental - 10) }),
        outcomeMessage: '적절한 치료 시기를 놓쳐 상태가 더욱 악화되었습니다.',
      },
      {
        label: '다른 병원을 찾는다',
        effect: (s) => ({ ...s, energy: Math.max(0, s.energy - 10), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '겨우 찾은 대학병원은 예약 대기만 2달이라고 합니다.',
      },
      {
        label: '민간 병원(비급여) 간다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 200000), energy: Math.min(100, s.energy + 20) }),
        outcomeMessage: '빠른 치료는 받았지만, 병원비가 폭발적으로 나왔습니다.',
      },
    ],
  },
  {
    id: 'samsung_stock_21',
    title: '📊 삼성전자 21층 입성 📉',
    description: '삼성전자가 21만원까지 갈 거라는 소문에 전 재산을 몰빵했습니다. 하지만 주가는 하락 중입니다.',
    choices: [
      {
        label: '존버 (장기 보유)',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 100000), mental: Math.max(0, s.mental - 10) }),
        outcomeMessage: '자금이 몇 년간 묶이게 되었습니다. 강제 장기 투자자가 되었습니다.',
      },
      {
        label: '손절 (매도)',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 40), money: Math.max(0, s.money - 200000) }),
        outcomeMessage: '손절하자마자 주가가 반등하기 시작합니다. 멘탈이 나갑니다.',
      },
      {
        label: '추가 매수 (물타기)',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 300000), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '평단은 낮췄지만 여전히 마이너스입니다. 끝없는 늪에 빠진 기분입니다.',
      },
    ],
  },
  {
    id: 'gold_digger',
    title: '👠 꽃뱀과의 만남 🐍',
    description: '매력적인 이성을 만났지만, 만날 때마다 고가의 선물과 돈을 요구하기 시작합니다.',
    isCritical: true,
    choices: [
      {
        label: '계속 만난다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 400000), happiness: Math.min(100, s.happiness + 10) }),
        outcomeMessage: '카드값이 폭발했습니다. 사랑인 줄 알았는데 지갑 취급을 당했습니다.',
      },
      {
        label: '거리를 둔다',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 20), happiness: Math.max(0, s.happiness - 10) }),
        outcomeMessage: '감정이 흔들려 다시 연락하게 됩니다. 악순환의 반복입니다.',
      },
      {
        label: '돈 요구 거절',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 30), happiness: Math.max(0, s.happiness - 20) }),
        outcomeMessage: '바로 태도가 돌변하며 허위 사실로 협박을 시도해옵니다.',
      },
    ],
  },
  {
    id: 'violent_boyfriend',
    title: '👊 폭력적인 연인 😠',
    description: '연인이 화가 나면 물건을 던지거나 폭언을 퍼붓습니다. 오늘은 손찌검까지 하려 합니다.',
    isCritical: true,
    choices: [
      {
        label: '참는다',
        effect: (s) => ({ ...s, energy: Math.max(0, s.energy - 30), mental: Math.max(0, s.mental - 30) }),
        outcomeMessage: '폭력은 반복되었고, 강도는 점점 더 세져만 갑니다.',
      },
      {
        label: '헤어진다',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 40), happiness: Math.max(0, s.happiness - 10) }),
        outcomeMessage: '이별 후에도 집착과 연락 폭탄이 이어져 일상이 파괴되었습니다.',
      },
      {
        label: '신고한다',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 30), independence: s.independence + 20 }),
        outcomeMessage: '법적 보호는 받았지만, 정신적 소모가 너무나 큽니다.',
      },
    ],
  },
  {
    id: 'pyramid_scheme',
    title: '🔺 피라미드(다단계) 사업 🕸️',
    description: '친한 지인이 "대박 사업"이라며 세미나에 데려갔습니다. 가입비로 큰돈을 요구합니다.',
    choices: [
      {
        label: '계속 한다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 500000), happiness: Math.max(0, s.happiness - 30) }),
        outcomeMessage: '돈과 인간관계, 두 마리 토끼를 모두 잃었습니다.',
      },
      {
        label: '빠져나온다',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 200000), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '손실을 인정하고 나왔지만, 후회와 자책감이 남습니다.',
      },
      {
        label: '지인에게 권유한다',
        effect: (s) => ({ ...s, happiness: Math.max(0, s.happiness - 40), independence: Math.max(0, s.independence - 10) }),
        outcomeMessage: '결국 소중한 친구들까지 모두 잃고 말았습니다.',
      },
    ],
  },
  {
    id: 'rent_car_debt',
    title: '🚗 풀할부 렌트카 빚 400 💸',
    description: '겉멋에 들어 풀할부로 외제차를 렌트했습니다. 매달 갚아야 할 빚이 400만원입니다.',
    isCritical: true,
    choices: [
      {
        label: '계속 유지',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 400000), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '매달 빚을 갚느라 지옥 같은 삶이 이어집니다.',
      },
      {
        label: '처분',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 800000), mental: Math.max(0, s.mental - 10) }),
        outcomeMessage: '중도 해지 위약금 폭탄을 맞고 빈털터리가 되었습니다.',
      },
      {
        label: '추가 대출',
        effect: (s) => ({ ...s, money: Math.max(0, s.money - 1000000), independence: Math.max(0, s.independence - 30) }),
        outcomeMessage: '빚을 빚으로 갚다 결국 완전 파산 루트에 진입했습니다.',
      },
    ],
  },
  {
    id: 'otaku_revealed',
    title: '🤓 오타쿠 정체 들킴 📺',
    description: '숨겨왔던 당신의 애니메이션 취향과 굿즈들이 지인들에게 발각되었습니다.',
    choices: [
      {
        label: '숨긴다 (부정)',
        effect: (s) => ({ ...s, happiness: Math.max(0, s.happiness - 10), mental: Math.max(0, s.mental - 10) }),
        outcomeMessage: '어설픈 변명 때문에 분위기가 더 어색해졌습니다.',
      },
      {
        label: '인정한다',
        effect: (s) => ({ ...s, happiness: Math.min(100, s.happiness + 10), mental: Math.min(100, s.mental + 10) }),
        outcomeMessage: '의외로 몇몇 지인들이 당신의 취향을 이해해줍니다.',
      },
      {
        label: '더 드러낸다',
        effect: (s) => ({ ...s, happiness: Math.min(100, s.happiness + 20), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '아예 "오타쿠 캐릭터"로 확정되었습니다. 자유롭지만 시선이 따갑습니다.',
      },
    ],
  },
  {
    id: 'insta_story_mistake',
    title: '📸 인스타 스토리 실수 😱',
    description: '부계정에 올리려던 은밀한 사진을 실수로 본계정 스토리에 올리고 말았습니다.',
    choices: [
      {
        label: '바로 삭제',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 20), happiness: Math.max(0, s.happiness - 10) }),
        outcomeMessage: '1초 만에 지웠지만 이미 누군가 캡처를 완료했습니다.',
      },
      {
        label: '해명',
        effect: (s) => ({ ...s, mental: Math.max(0, s.mental - 30), happiness: Math.max(0, s.happiness - 20) }),
        outcomeMessage: '해명할수록 논란이 더 커지고 널리 확산되었습니다.',
      },
      {
        label: '그냥 둔다',
        effect: (s) => ({ ...s, happiness: Math.min(100, s.happiness + 10), mental: Math.max(0, s.mental - 20) }),
        outcomeMessage: '해탈했습니다. 결국 하나의 밈(Meme)이 되어버렸습니다.',
      },
    ],
  },
];
