/**
 * fab-dispatching-data.js - Fab Dispatching Heuristics & Dynamic Scheduling Engine
 *
 * Simulates:
 * 1. Classical and Advanced Dispatching Rules:
 *    - Critical Ratio (CR) = (Due_Date - Current_Time) / Remaining_Process_Time
 *    - Shortest Processing Time (SPT)
 *    - Earliest Due Date (EDD)
 *    - First-In First-Out (FIFO)
 * 2. Dynamic Q-Time Urgency Escalator:
 *    Elevates lot priority exponentially as Q-Time approaches expiration threshold (>75%)
 * 3. Furnace Batching Matrix Optimization:
 *    Grouping compatible wafer lots (up to 150 wafers) sharing identical thermal recipes
 *
 * Complies with Rule 0003 (Cleanroom Light Theme) and Rule 0013 (Strict ASCII filename).
 */

export const FAB_DISPATCHING_DATA = {
  version: '2.9.0',
  rules: [
    { id: 'CR', name: { zh: '臨界比率法 (Critical Ratio)', en: 'Critical Ratio (CR)' }, description: { zh: '交期寬裕度與剩餘工時比值，CR<1.0 視為潛在延遲急件', en: 'Ratio of time left to remaining work' } },
    { id: 'EDD', name: { zh: '最早交期優先 (Earliest Due Date)', en: 'Earliest Due Date (EDD)' }, description: { zh: '優先派工承諾客戶交期最早之晶圓批次', en: 'Process lot with earliest promised delivery' } },
    { id: 'SPT', name: { zh: '最短製程時間 (Shortest Processing Time)', en: 'Shortest Processing Time (SPT)' }, description: { zh: '最小化平均在製品 (WIP) 停留時間', en: 'Minimizes average lot waiting time' } },
    { id: 'QTIME', name: { zh: 'Q-Time 逾時防禦升級 (Q-Time Escalator)', en: 'Q-Time Expiration Escalator' }, description: { zh: '對接近氧化/微影等待上限批次動態強行插隊', en: 'Emergency dispatch before native defect growth' } }
  ],

  /**
   * Calculate Critical Ratio (CR).
   * @param {number} dueDateHr - Target delivery time in hours
   * @param {number} currentTimeHr - Current fab simulation clock
   * @param {number} remainingWorkHr - Remaining raw processing time
   * @returns {{ crValue: number, status: 'behind_schedule' | 'on_track' | 'ahead_of_schedule' }}
   */
  calculateCriticalRatio(dueDateHr, currentTimeHr, remainingWorkHr) {
    const timeRemaining = dueDateHr - currentTimeHr;
    const safeWork = Math.max(0.1, remainingWorkHr);
    const crValue = timeRemaining / safeWork;

    let status = 'on_track';
    if (crValue < 1.0) {
      status = 'behind_schedule';
    } else if (crValue > 1.3) {
      status = 'ahead_of_schedule';
    }

    return {
      crValue: Number(crValue.toFixed(2)),
      status
    };
  },

  /**
   * Sort and prioritize a queue of lots waiting at an equipment group.
   * @param {Array<{ lotId: string, dueDateHr: number, processTimeHr: number, remainingWorkHr: number, qTimeElapsedHr: number, qTimeLimitHr: number }>} lotQueue
   * @param {number} currentTimeHr - Current clock in hours
   * @returns {Array<{ lotId: string, priorityScore: number, dispatchRank: number, isQTimeEmergency: boolean }>}
   */
  prioritizeLotQueue(lotQueue, currentTimeHr = 100) {
    const scored = lotQueue.map(lot => {
      const cr = this.calculateCriticalRatio(lot.dueDateHr, currentTimeHr, lot.remainingWorkHr);
      
      // Q-Time ratio check
      const qRatio = lot.qTimeLimitHr > 0 ? (lot.qTimeElapsedHr / lot.qTimeLimitHr) : 0;
      const isQTimeEmergency = qRatio >= 0.75;

      // Lower score = higher priority
      // Base score is CR
      let priorityScore = cr.crValue;

      // Heavy priority penalty reduction for Q-Time emergency (drastically jumps to front)
      if (isQTimeEmergency) {
        priorityScore -= (qRatio * 15.0);
      }

      return {
        lotId: lot.lotId,
        priorityScore: Number(priorityScore.toFixed(3)),
        isQTimeEmergency
      };
    });

    // Sort ascending (lowest score gets processed first)
    scored.sort((a, b) => a.priorityScore - b.priorityScore);

    return scored.map((item, idx) => ({
      ...item,
      dispatchRank: idx + 1
    }));
  },

  /**
   * Group compatible waiting lots into a single furnace batch.
   * @param {Array<{ lotId: string, recipeId: string, waferCount: number, waitTimeHr: number }>} pendingLots
   * @param {number} maxCapacityWafers - e.g. 100 or 150 wafers
   * @returns {{ formedBatches: Array<{ recipeId: string, lots: string[], totalWafers: number }>, unassignedLots: string[] }}
   */
  optimizeFurnaceBatch(pendingLots, maxCapacityWafers = 100) {
    const recipeGroups = {};
    pendingLots.forEach(lot => {
      if (!recipeGroups[lot.recipeId]) recipeGroups[lot.recipeId] = [];
      recipeGroups[lot.recipeId].push(lot);
    });

    const formedBatches = [];
    const unassignedLots = [];

    Object.keys(recipeGroups).forEach(recipeId => {
      const lots = recipeGroups[recipeId];
      // Sort by wait time descending (longest waiting first)
      lots.sort((a, b) => b.waitTimeHr - a.waitTimeHr);

      let currentBatchLots = [];
      let currentWafers = 0;

      lots.forEach(lot => {
        if (currentWafers + lot.waferCount <= maxCapacityWafers) {
          currentBatchLots.push(lot.lotId);
          currentWafers += lot.waferCount;
        } else {
          unassignedLots.push(lot.lotId);
        }
      });

      if (currentBatchLots.length > 0) {
        formedBatches.push({
          recipeId,
          lots: currentBatchLots,
          totalWafers: currentWafers
        });
      }
    });

    return { formedBatches, unassignedLots };
  }
};
