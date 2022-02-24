export function toggleCallMinimized() {
  return {
    type: 'TOGGLE_CALL_MINIMIZED',
  };
}

export function startCall(
  callId: string,
  callerId: string,
  callMedia: 'video' | 'audio'
) {
  return {
    type: 'START_CALL',
    callId,
    callerId,
    callMedia,
  }
}

export function acceptCall() {
  return {
    type: 'ACCEPT_CALL',
  };
}

export function finishCall() {
  return {
    type: 'CALL_END',
  }
}

export default {
  toggleCallMinimized,
  startCall,
  acceptCall,
  finishCall,
};
