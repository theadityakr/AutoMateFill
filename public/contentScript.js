function fillFormFields(profileData, fieldPatterns) {
    // Get all input elements and textareas
    const formElements = document.querySelectorAll('input, textarea');
  
    formElements.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
  
      // Get various attributes that might help identify the field
      const id = element.id.toLowerCase();
      const name = element.getAttribute('name')?.toLowerCase() || '';
      const placeholder = element.getAttribute('placeholder')?.toLowerCase() || '';
      const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
      const type = element.getAttribute('type')?.toLowerCase() || '';
  
      // Get associated label if any
      let labelText = '';
      const labelElement = document.querySelector(`label[for="${element.id}"]`);
      if (labelElement) {
        labelText = labelElement.textContent?.toLowerCase() || '';
      }
  
      // Check for nearby text
      let nearbyText = '';
      const previousElement = element.previousElementSibling;
      if (previousElement) {
        nearbyText = previousElement.textContent?.toLowerCase() || '';
      }
  
      // Combine all text sources for matching
      const textToMatch = `${id} ${name} ${placeholder} ${ariaLabel} ${labelText} ${nearbyText} ${type}`;
  
      // Try to match and fill appropriate value
      for (const [fieldName, patternList] of Object.entries(fieldPatterns)) {
        if (patternList.some(pattern => textToMatch.includes(pattern))) {
          const dataEntry = profileData.find(entry => entry.label === fieldName);
          
          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (!element.value && dataEntry?.value) {
              element.value = dataEntry.value;
              
              element.dispatchEvent(new Event('input', { bubbles: true }));
              element.dispatchEvent(new Event('change', { bubbles: true }));
              
              element.style.backgroundColor = '#f0fff4';
              setTimeout(() => {
                element.style.backgroundColor = '';
              }, 1000);
            }
          }
        }
      }
    });
  
    return true;
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillFields') {
      const result = fillFormFields(request.profileData, request.fieldPatterns);
      sendResponse({ success: result });
    }
  });