/**
 * AutoAI Landing Page Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initMobileMenu();
  initFAQAccordion();
  initSimulationSandbox();
  initContactForm();
  initScrollAnimationsFallback();
});

/**
 * 1. Mobile Menu Toggler
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileMenu) return;

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-hidden', isExpanded);
    
    // Disable scrolling when menu is active
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu when a link is clicked
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 2. FAQ Accordion Behavior
 */
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answerId = question.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Close all other FAQs first for a clean accordian effect
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          const otherAnswerId = otherQuestion.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherAnswerId);
          if (otherAnswer) {
            otherAnswer.hidden = true;
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      // Toggle current FAQ
      question.setAttribute('aria-expanded', !isExpanded);
      if (answer) {
        answer.hidden = isExpanded;
        if (!isExpanded) {
          // Open
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          // Close
          answer.style.maxHeight = null;
        }
      }
    });
  });
}

/**
 * 3. Interactive Automation Sandbox Simulation Engine
 */
function initSimulationSandbox() {
  const tabs = document.querySelectorAll('.sandbox-tab');
  const panels = document.querySelectorAll('.sandbox-panel');

  // Handle Tab Switch
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');
      
      // Update tab styles
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');

      // Update panels visibility
      panels.forEach(panel => {
        panel.classList.add('hidden');
      });
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.remove('hidden');
      }
    });

    // Keyboard support for tabs
    tab.addEventListener('keydown', (e) => {
      let index = Array.from(tabs).indexOf(tab);
      let targetTab = null;

      if (e.key === 'ArrowLeft') {
        // Go next (RTL means left arrow goes to next tab on left)
        targetTab = tabs[index + 1] || tabs[0];
      } else if (e.key === 'ArrowRight') {
        // Go previous
        targetTab = tabs[index - 1] || tabs[tabs.length - 1];
      }

      if (targetTab) {
        targetTab.focus();
        targetTab.click();
      }
    });
  });

  // Simulation parameters & scripts
  const simulations = {
    law: {
      stepsCount: 4,
      steps: [
        {
          log: 'מזהה מייל נכנס מכתובת client-law@gmail.com הכולל קובץ מצורף: "Rental_Agreement_Final.pdf"...',
          type: 'system'
        },
        {
          log: 'מפעיל סוכן AI בסביבת Docker מאובטחת. מתחיל סריקה של 18 דפי ההסכם...',
          type: 'ai'
        },
        {
          log: 'סוכן AI סיים סריקה: מצא סעיף הגבלת תחרות ללא הגבלת זמן (סיכון גבוה). מכין סיכום מנהלים.',
          type: 'ai'
        },
        {
          log: 'שולח הודעת וואטסאפ אישית לעו"ד רונן לוי הכוללת קישור, סיכום נקודות ורמת סיכון...',
          type: 'whatsapp'
        },
        {
          log: 'שומר את קובץ ה-PDF המקורי והסיכום המובנה בתיקיית הלקוח במערכת ה-CRM.',
          type: 'crm'
        }
      ],
      finalText: '[מערכת] האוטומציה הסתיימה בהצלחה! תהליך ידני של 35 דקות בוצע תוך 6 שניות. 🎉'
    },
    realestate: {
      stepsCount: 4,
      steps: [
        {
          log: 'נקלט ליד חדש מפייסבוק קמפיין דירות: "משה כהן", טלפון 052-1234567...',
          type: 'system'
        },
        {
          log: 'יוצר קשר אוטומטי בוואטסאפ: "היי משה, שמחים שהתעניינת בפרויקט נווה צדק. מה התקציב שלך?"',
          type: 'whatsapp'
        },
        {
          log: 'הליד עונה בוואטסאפ: "3.5 מיליון ש"ח". סוכן AI מנתח ומזהה התאמה לתקציב פרויקט יוקרה.',
          type: 'ai'
        },
        {
          log: 'שולח קטלוג מתאים בוואטסאפ, מעדכן כרטיס ליד ב-CRM, ומשייך לסוכן יחזקאל לפולו-אפ.',
          type: 'crm'
        }
      ],
      finalText: '[מערכת] האוטומציה הסתיימה בהצלחה! הליד מוכן במערכת ללא שום הקלדה ידנית. 🏠'
    },
    service: {
      stepsCount: 4,
      steps: [
        {
          log: 'לקוח "סטודיו מעיינות" אישר הצעת מחיר דיגיטלית לפרויקט מיתוג (5,800 ש"ח)...',
          type: 'system'
        },
        {
          log: 'מייצר חשבונית עסקה במערכת החשבונות ושולח אותה אוטומטית במייל ללקוח...',
          type: 'system'
        },
        {
          log: 'פותח תיקיית פרויקט משותפת ב-Google Drive ושולח מייל אונבורדינג הכולל שאלון ראשוני...',
          type: 'ai'
        },
        {
          log: 'יוצר פרויקט חדש ב-Monday ויוצר רשימת משימות קבועה למעצב עם תאריכי יעד...',
          type: 'crm'
        }
      ],
      finalText: '[מערכת] האוטומציה הסתיימה בהצלחה! פרויקט מנוהל ומוכן לעבודה באופן עצמאי. 🎨'
    }
  };

  // State to prevent overlapping runs on a single panel
  const activeSimulations = {};

  const simulateButtons = document.querySelectorAll('.btn-simulate');
  const resetButtons = document.querySelectorAll('.btn-reset-sim');

  simulateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-simulation');
      runSimulation(type);
    });
  });

  resetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-simulation');
      resetSimulation(type);
    });
  });

  function getTimestamp() {
    const now = new Date();
    return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}] `;
  }

  function appendConsoleLine(consoleEl, text, type) {
    const line = document.createElement('div');
    line.className = `console-line line-${type}`;
    line.innerText = getTimestamp() + text;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight; // Auto scroll
  }

  async function runSimulation(type) {
    if (activeSimulations[type]) return; // Block double runs
    activeSimulations[type] = true;

    const simConfig = simulations[type];
    const panel = document.getElementById(`panel-${type}`);
    const consoleEl = document.getElementById(`console-output-${type}`);
    const simulateBtn = panel.querySelector('.btn-simulate');
    const resetBtn = panel.querySelector('.btn-reset-sim');
    
    // Toggle button state
    simulateBtn.disabled = true;
    resetBtn.disabled = true;

    // Reset visually first
    resetSimulationVisuals(panel);
    consoleEl.innerHTML = '';

    appendConsoleLine(consoleEl, 'מתחיל תהליך אוטומציה...', 'system');

    // Run steps sequentially
    for (let i = 0; i < simConfig.steps.length; i++) {
      await delay(1200); // Wait for visual effect

      const stepData = simConfig.steps[i];
      appendConsoleLine(consoleEl, stepData.log, stepData.type);

      // Visual step updates (Step 1 is active from start, so start highlighting step 2, 3, etc.)
      const visualStepNum = i + 1;
      const currentVisualStep = panel.querySelector(`.sandbox-step.step-${visualStepNum}`);
      if (currentVisualStep) {
        currentVisualStep.classList.add('active');
        if (visualStepNum > 1) {
          const prevVisualStep = panel.querySelector(`.sandbox-step.step-${visualStepNum - 1}`);
          if (prevVisualStep) {
            prevVisualStep.classList.remove('active');
            prevVisualStep.classList.add('completed');
          }
        }
      }
    }

    // Completion
    await delay(1000);
    // Mark last step completed
    const lastStep = panel.querySelector(`.sandbox-step.step-${simConfig.stepsCount}`);
    if (lastStep) {
      lastStep.classList.remove('active');
      lastStep.classList.add('completed');
    }
    
    appendConsoleLine(consoleEl, simConfig.finalText, 'system');
    
    activeSimulations[type] = false;
    resetBtn.disabled = false; // Allow reset
  }

  function resetSimulation(type) {
    const panel = document.getElementById(`panel-${type}`);
    const consoleEl = document.getElementById(`console-output-${type}`);
    const simulateBtn = panel.querySelector('.btn-simulate');
    const resetBtn = panel.querySelector('.btn-reset-sim');

    resetSimulationVisuals(panel);
    consoleEl.innerHTML = '<div class="console-line line-system">[מערכת] מוכן להרצה. לחצו על כפתור ההפעלה למטה.</div>';
    
    simulateBtn.disabled = false;
    resetBtn.disabled = true;
  }

  function resetSimulationVisuals(panel) {
    const steps = panel.querySelectorAll('.sandbox-step');
    steps.forEach((step, idx) => {
      step.classList.remove('active', 'completed');
      if (idx === 0) {
        step.classList.add('active'); // Back to first step active
      }
    });
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 4. Contact Form Validation and Success Animation
 */
function initContactForm() {
  const form = document.getElementById('lead-form');
  const successBox = document.getElementById('success-message');
  const submitBtn = document.getElementById('submit-btn');
  const resetFormBtn = document.getElementById('reset-form-btn');

  if (!form) return;

  // Sync aria-invalid with CSS :user-invalid state
  const syncAria = (el) => {
    if (el.hasAttribute('required') || el.hasAttribute('pattern') || el.hasAttribute('minlength')) {
      el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
    }
  };

  // Sync on blur (when user interacts and leaves the field)
  form.addEventListener('blur', (e) => {
    syncAria(e.target);
  }, true);

  // Sync on input, only if we have already evaluated invalidity
  form.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true') {
      syncAria(e.target);
    }
  });

  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check custom validity check
    const isValid = form.checkValidity();

    if (!isValid) {
      // Find first invalid input
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        // Trigger blur/interaction to display the built-in browser validation css
        firstInvalid.focus();
      }
      return;
    }

    // If valid, start mock submission
    submitBtn.disabled = true;
    const btnSpan = submitBtn.querySelector('span');
    const originalText = btnSpan.innerText;
    btnSpan.innerText = 'שולח... ⏳';

    // Simulate network latency (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show Success State
    form.classList.add('hidden');
    successBox.classList.remove('hidden');
    
    // Reset submit button state
    submitBtn.disabled = false;
    btnSpan.innerText = originalText;
  });

  // Reset form to write another message
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      form.reset();
      
      // Remove all validation visual markers
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.removeAttribute('aria-invalid');
      });

      successBox.classList.add('hidden');
      form.classList.remove('hidden');
    });
  }
}

/**
 * 5. Scroll Animations Fallback for Unsupported Browsers (e.g. Firefox)
 */
function initScrollAnimationsFallback() {
  // If CSS View-Timeline is supported, don't run JS fallback
  if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    return;
  }

  // Create JS Fallback using IntersectionObserver
  const sections = document.querySelectorAll('.section:not(.hero-section)');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before section fully reaches center
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, revealOptions);

  // Set initial styles for fallback in CSS
  sections.forEach(section => {
    section.classList.add('scroll-fallback');
    sectionObserver.observe(section);
  });

  // Inject fallback styles directly if using fallback
  const style = document.createElement('style');
  style.innerHTML = `
    .scroll-fallback {
      opacity: 0;
      transform: translateY(40px) scale(0.96);
      transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .scroll-fallback.revealed {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `;
  document.head.appendChild(style);
}
