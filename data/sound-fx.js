/**
 * sound-fx.js
 * 半導體無塵室聲學回饋引擎 (Cleanroom Sound Engine)
 * 基於純原生 Web Audio API 合成輕量微音效，無外部音訊檔案相依、零中系依賴
 */

let audioCtx = null;
let soundEnabled = true;

try {
  if (typeof localStorage !== 'undefined') {
    soundEnabled = localStorage.getItem('skh_sound') !== 'false';
  }
} catch (_) {}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * 播放特定類型的合成音效
 * @param {'click' | 'correct' | 'wrong' | 'alarm' | 'launch'} type
 */
export function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      // 輕脆觸覺微音 750Hz -> 450Hz, 35ms
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.035);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.start(now);
      osc.stop(now + 0.035);
    } else if (type === 'correct') {
      // 雙音高頻和弦 (C5 523Hz -> E5 659Hz)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.10, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === 'wrong') {
      // 低頻短促鈍音 240Hz -> 180Hz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'alarm') {
      // OCAP 警報柔和音調 440Hz -> 880Hz
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'launch') {
      // 天車啟動滑行上升音 300Hz -> 600Hz
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.18);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch (_) {}
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('skh_sound', soundEnabled ? 'true' : 'false');
    }
  } catch (_) {}
  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}
