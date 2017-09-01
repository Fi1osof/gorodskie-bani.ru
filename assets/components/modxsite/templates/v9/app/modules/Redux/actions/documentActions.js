export const INITIALIZATION_REQUESTED = 'INITIALIZATION_REQUESTED';
export const INFORMER_MESSAGE_ADDED = 'INFORMER_MESSAGE_ADDED';
export const INFORMER_MESSAGE_REMOVED = 'INFORMER_MESSAGE_REMOVED';

export function InitializeDocument() {
  return {
    type: INITIALIZATION_REQUESTED,
  };
}

export function addInformerMessage(message) {

  return {
    type: INFORMER_MESSAGE_ADDED,
    message,
  };
}

export function removeInformerMessage(message) {

  return {
    type: INFORMER_MESSAGE_REMOVED,
    message,
  };
}