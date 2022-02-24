const INITIAL_STATE = {
  minimized: true,
  inCall: false,
  callRequest: false,
  callerId: '',
  callId: '',
  callMedia: 'video',
} as {
  minimized: boolean;
  inCall: boolean;
  callRequest: boolean;
  callerId: string;
  callId: string;
  callMedia: 'video' | 'audio';
};

export default function call(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'START_CALL':
      return {
        ...state,
        inCall: true,
        callId: action.callId,
        callerId: action.callerId,
        callMedia: action.callMedia,
      };
    case 'CALL_REQUEST':
      return {
        ...state,
        callRequest: true,
        callMedia: action.callMedia,
        callerId: action.callerId,
        callId: action.callId,
      };
    case 'ACCEPT_CALL':
      return {
        ...state,
        callRequest: false,
        inCall: true,
        minimized: false,
      };
    case 'CALL_END':
      return INITIAL_STATE;
    case 'TOGGLE_CALL_MINIMIZED':
      return {
        ...state,
        minimized: !state.minimized,
      };
    default:
      return state;
  }
}
