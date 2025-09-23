document.addEventListener("DOMContentLoaded", function() {
  // וודא שהגלילה מתחילה מהחלק העליון
  window.scrollTo(0, 0);

  // ============================
  // 1️⃣ אלמנטים מה-DOM
  // ============================
  const maleBtn = document.getElementById("maleBtn");
  const femaleBtn = document.getElementById("femaleBtn");
  const creditsInput = document.getElementById("credits");
  const childrenCount = document.getElementById("childrenCount");
  const plusChild = document.getElementById("plusChild");
  const minusChild = document.getElementById("minusChild");
  const salaryInput = document.getElementById("salary");
  const salaryError = document.getElementById("salaryError");
  const creditsError = document.getElementById("creditsError");
  const calculateBtn = document.getElementById("calculate");
  const clearBtn = document.getElementById("clear");
  const taxYearSelect = document.getElementById("taxYear");
  const canvas = document.getElementById("pieChart");
  const legend = document.getElementById("legend");
  const ctx = canvas.getContext("2d");
  const hishtalmutCheckbox = document.getElementById("hishtalmutCheckbox");
  const hishtalmutInputWrapper = document.getElementById("hishtalmutInputWrapper");
  const childrenAgesContainer = document.getElementById('childrenAgesContainer');
  const employeeForm = document.getElementById("employeeForm");

  // ============================
  // 2️⃣ משתנים כלליים
  // ============================
  let gender = "male";        // ברירת מחדל
  let children = 0;           // מספר ילדים רגילים
  const maxChildren = 10;
  const minChildren = 0;
  let childrenAges = [];      // מערך שמכיל את הגיל של כל ילד

  // ============================
  // 3️⃣ פונקציות עזר
  // ============================
function updateCredits() {
  // נקודות בסיס
  let credits = gender === "male" ? 2.25 : 2.75;

  // עבור כל ילד
  childrenAges.forEach(age => {
    let childCredits = 0;

    if (age >= 0 && age < 1) { // שנת הלידה
      childCredits = 2.5;
    } else if (age >= 1 && age < 2) { // שנה
      childCredits = 4.5;
    } else if (age >= 2 && age < 3) { // שנתיים
      childCredits = 4.5;
    } else if (age >= 3 && age < 4) { // שלוש
      childCredits = 3.5;
    } else if (age >= 4 && age < 6) { // גיל 4-5
      childCredits = 2.5;
    } else if (age >= 6 && age < 13) { // גיל 6-12
      childCredits = gender === "male" ? 1 : 2;
    } else if (age >= 13 && age < 18) { // גיל 13-17
      childCredits = gender === "male" ? 1 : 2;
    } else if (age >= 18) { // גיל 18
      childCredits = gender === "male" ? 0 : 0.5;
    }

    credits += childCredits;
  });

  // תוספת חצי נקודת זיכוי נוספת לאישה רק אם יש לפחות ילד אחד
  if (gender === "female" && childrenAges.length > 0) credits += 0.5;

  creditsInput.value = credits.toFixed(2);
}

  function setGender(selectedGender) {
    gender = selectedGender;
    maleBtn.classList.remove("active");
    femaleBtn.classList.remove("active");
    if (gender === "male") maleBtn.classList.add("active");
    else femaleBtn.classList.add("active");
    updateCredits();
  }

  function validateInputs() {
    let isValid = true;
    if (salaryInput.value === "" || isNaN(salaryInput.value) || Number(salaryInput.value) <= 0) {
      salaryError.textContent = "אנא הזן שכר ברוטו תקין";
      isValid = false;
    } else salaryError.textContent = "";

    if (creditsInput.value === "" || isNaN(creditsInput.value) || Number(creditsInput.value) <= 0) {
      creditsError.textContent = "אנא הזן מספר נקודות זיכוי תקין";
      isValid = false;
    } else creditsError.textContent = "";

    return isValid;
  }

  hishtalmutCheckbox.addEventListener("change", () => {
    hishtalmutInputWrapper.style.display = hishtalmutCheckbox.checked ? "block" : "none";
  });

  function updateChildrenAgesFields() {
    childrenAgesContainer.innerHTML = "";
    if (children === 0) {
      childrenAgesContainer.style.display = 'none';
      return;
    }
    childrenAgesContainer.style.display = 'block';
    childrenAges.forEach((age, index) => {
      const ageField = document.createElement('div');
      ageField.className = 'child-age';
      ageField.innerHTML = `
        <label>גיל ילד/ה ${index + 1}:</label>
        <button type="button" class="minus">-</button>
        <input type="number" value="${age}" min="0" max="17" readonly>
        <button type="button" class="plus">+</button>
      `;
      childrenAgesContainer.appendChild(ageField);
    });

    const plusButtons = childrenAgesContainer.querySelectorAll('.plus');
    const minusButtons = childrenAgesContainer.querySelectorAll('.minus');
    const step = 0.5;

    plusButtons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        let val = childrenAges[i];
        if (val + step <= 17) {
          childrenAges[i] = +(val + step).toFixed(1);
          updateChildrenAgesFields();
          updateCredits();
        }
      });
    });

    minusButtons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        let val = childrenAges[i];
        if (val - step >= 0) {
          childrenAges[i] = +(val - step).toFixed(1);
          updateChildrenAgesFields();
          updateCredits();
        }
      });
    });
  }

  function getChildrenAges() {
    const ages = [];
    const ageInputs = childrenAgesContainer.querySelectorAll("input");
    ageInputs.forEach((input) => ages.push(parseFloat(input.value) || 0));
    return ages;
  }

  // ============================
  // 4️⃣ פונקציות חישוב
  // ============================
  function calculateTax(salary, credits, taxBrackets, creditValue) {
    let remaining = salary;
    let tax = 0;
    for (let bracket of taxBrackets) {
      if (salary > bracket.min) {
        const taxable = Math.min(remaining, bracket.max - bracket.min);
        tax += taxable * bracket.rate;
        remaining -= taxable;
      }
    }
    tax -= credits * creditValue;
    if (tax < 0) tax = 0;
    return tax;
  }

  function calculateContribution(salary, brackets) {
    let remaining = salary;
    let contrib = 0;
    for (let bracket of brackets) {
      const taxable = Math.min(remaining, bracket.max - bracket.min);
      contrib += taxable * bracket.rate;
      remaining -= taxable;
      if (remaining <= 0) break;
    }
    return contrib;
  }

  function calculatePension(salary, pensionRate) {
    let pension = salary * pensionRate;
    let hishtalmut = 0;
    if (hishtalmutCheckbox.checked) {
      const hishtalmutRate = parseFloat(document.getElementById("hishtalmutRate").value) || 0;
      hishtalmut = (salary * hishtalmutRate) / 100;
    }
    return { pension, hishtalmut, total: pension + hishtalmut };
  }

  // ============================
  // 5️⃣ מאזינים לכפתורים
  // ============================
  maleBtn.addEventListener("click", () => setGender("male"));
  femaleBtn.addEventListener("click", () => setGender("female"));

  plusChild.addEventListener("click", () => {
    if (children < maxChildren) {
      children++;
      childrenCount.textContent = children;
      childrenAges.push(0);
      updateChildrenAgesFields();
      updateCredits();
    }
  });

  minusChild.addEventListener("click", () => {
    if (children > minChildren) {
      children--;
      childrenCount.textContent = children;
      childrenAges.pop();
      updateChildrenAgesFields();
      updateCredits();
    }
  });

  // ============================
  // 🔹 כפתור חישוב נטו
  // ============================
  calculateBtn.addEventListener("click", function(event) {
    event.preventDefault();
    if(!validateInputs()) return;

    const salary = Number(salaryInput.value);
    const credits = Number(creditsInput.value);
    const taxYear = Number(taxYearSelect.value);
    const config = TAX_CONFIG[taxYear].employee;

    const incomeTax = calculateTax(salary, credits, config.TAX_BRACKETS, config.CREDIT_VALUE);
    const social = calculateContribution(salary, config.SOCIAL_BRACKETS);
    const health = calculateContribution(salary, config.HEALTH_BRACKETS);
    const pensionData = calculatePension(salary, config.PENSION_RATE);

    const netSalary = salary - incomeTax - social - health - pensionData.pension - pensionData.hishtalmut;

    const maxBracket = config.TAX_BRACKETS
      .filter(br => salary > br.min)
      .reduce((prev, curr) => (curr.rate > prev.rate ? curr : prev), { rate: 0 });

    document.getElementById("net").textContent = `נטו: ${netSalary.toFixed(2)} ₪`;
    document.getElementById("tax").textContent = `מס הכנסה מצטבר: ${incomeTax.toFixed(2)} ₪`;
    document.getElementById("health").textContent = `מס בריאות: ${health.toFixed(2)} ₪`;
    document.getElementById("social").textContent = `מס ביטוח לאומי: ${social.toFixed(2)} ₪`;
    document.getElementById("pension").textContent = `פנסיה חובה: ${pensionData.pension.toFixed(2)} ₪`;
    document.getElementById("hishtalmut").textContent = `קרן השתלמות: ${pensionData.hishtalmut.toFixed(2)} ₪`;
    document.getElementById("main-bracket").textContent = `מדרגת מס: ${(maxBracket.rate*100).toFixed(0)}%`;

    const resultsSection = document.getElementById("results-section");
    resultsSection.style.display = "flex";
    setTimeout(() => {
      resultsSection.classList.add("show");
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }, 100);

    const taxInfoSection = document.getElementById("tax-info");
    const taxCreditsSection = document.getElementById("tax-credits");
    const taxTipsSection = document.getElementById("tax-tips");
    taxInfoSection.style.display = "block";
    taxCreditsSection.style.display = "block";
    taxTipsSection.style.display = "block";

    const nav = document.getElementById("internal-nav");
    nav.style.display = "block";

    const values = [netSalary, incomeTax, health, social, pensionData.pension, pensionData.hishtalmut];
    const colors = ['#2ecc71','#e74c3c','#f1c40f','#3498db','#9b59b6','#f39c12'];
    drawPieChartAnimated(ctx, values, colors, legend);

    showTaxInfo();

    gtag('event', 'calculate_click', { 'event_category': 'Calculator', 'event_label': 'Net calculator used' });
  });

  // ============================
  // 🔹 כפתור נקה
  // ============================
  clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    salaryInput.value = "";
    creditsInput.value = "2.25";
    salaryError.textContent = "";
    creditsError.textContent = "";

    setGender("male");

    children = 0;
    childrenCount.textContent = children;
    childrenAges = [];
    updateChildrenAgesFields();

    hishtalmutCheckbox.checked = false;
    hishtalmutInputWrapper.style.display = "none";
    document.getElementById("hishtalmutRate").value = 2.5;

    ["net","tax","health","social","pension","hishtalmut","main-bracket"].forEach(id => {
      const el = document.getElementById(id);
      if(el) {
        el.textContent = id === "main-bracket" ? "מדרגת מס: 0%" : `${el.id === "net" ? "נטו: " : el.id === "tax" ? "מס הכנסה מצטבר: " : el.id === "health" ? "מס בריאות: " : el.id === "social" ? "מס ביטוח לאומי: " : el.id === "pension" ? "פנסיה חובה: " : "קרן השתלמות: "}0 ₪`;
      }
    });

    ["results-section","tax-info","tax-credits","tax-tips"].forEach(id => {
      const el = document.getElementById(id);
      if(el) {
        el.style.display = "none";
        el.classList?.remove("show");
      }
    });

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    legend.innerHTML = "";

    if(employeeForm) employeeForm.scrollIntoView({ behavior: "smooth" });

    gtag('event', 'clear_click', { 'event_category': 'clear', 'event_label': 'clear button used' });

    updateCredits();
  });

  // ============================
  // 🔹 אתחול
  // ============================
  childrenCount.textContent = children;
  setGender("male");
  updateChildrenAgesFields();
  updateCredits();
});
