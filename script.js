
const adviceId = document.getElementById('advice-Id');
const adviceText = document.getElementById('advice-text');
const generateButton = document.getElementById('generate-advice');

async function getAdvice() {
  generateButton.disabled = true;

  try {
    const response = await fetch(
      `https://api.adviceslip.com/advice?t=${Date.now()}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('The advice service is currently not available');
    }

    const data = await response.json();

    if (!data.slip || !data.slip.id || !data.slip.advice) {
      throw new Error('The advice service returned an unexpected response.');
    }

    adviceId.textContent = data.slip.id;
    adviceText.textContent = data.slip.advice;

  } catch (error) {
    console.error('Advice request failed:', error);
    adviceText.textContent = 'Unable to get advice. Please try again.';
  } finally {
    generateButton.disabled = false;
  }
}

generateButton.addEventListener('click', getAdvice);
