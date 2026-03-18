import delay from 'delay';

const formatDelayMs = (ms: number) => {
  const safeMs = Math.max(0, Math.floor(ms));
  const seconds = safeMs / 1000;
  return `${safeMs}ms (~${seconds.toFixed(seconds >= 10 ? 0 : 2)}s)`;
};

export const delayWithLog = async (ms: number, message: string): Promise<void> => {
  console.log(`[delay] ${message}. Waiting ${formatDelayMs(ms)}.`);
  await delay(Math.max(0, Math.floor(ms)));
};

