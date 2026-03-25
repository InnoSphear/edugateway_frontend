export const openCounsellingPopup = (prefill = {}) => {
  window.dispatchEvent(new CustomEvent('open-counselling-popup', { detail: prefill }));
};
