export const BOARD_AI_APPLY_ORDER_EVENT = 'boardAiApplyOrder';
export const BOARD_AI_OPEN_CARD_EVENT = 'boardAiOpenCard';

export type BoardAiApplyOrderPayload = {
  boardId: string;
  listId?: string;
  order: string[];
  notes?: Record<string, string>;
};

export type BoardAiOpenCardPayload = {
  boardId: string;
  cardId: string;
};
