document.addEventListener("DOMContentLoaded", function() {
  // ============================
  // 1️⃣ אלמנטים מה-DOM
  // ============================
  const maleBtn = document.getElementById("maleBtn");
  const femaleBtn = document.getElementById("femaleBtn");
  const creditsInput = document.getElementById("credits");
  const childrenCount = document.getElementById("childrenCount");
  const infantCountEl = document.getElementById("infantCount");
  const plusChild = document.getElementById("plusChild");
  const minusChild = document.getElementById("minusChild");
  const plusInfant = document.getElementById("plusInfant");
  const minusInfant = document.getElementById("minusInfant");
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
  

  // ============================
  // 2️⃣ משתנים כלליים
  // ============================
  let gender = "male";        // ברירת מחדל
  let children = 0;           // מספר ילדים רגילים
  let infants = 0;            // מספר תינוקות מתחת לגיל 1
  const maxChildren = 10;     // גבול עליון לילדים ותינוקות
  const minChildren = 0;      // גבול תחתון
  let hishtalmut = 0;         // בדיקת קרן השתלמות

  // ============================
  // 3️⃣ פונקציות עזר
  // ============================

  // פונקציה שמעדכנת את נקודות הזיכוי לפי מגדר וילדים
  function updateCredits() {
    const baseCredits = gender === "male" ? 2.25 : 2.75;
    const childCredits = children * 1 + infants * 1.5; // 1 נקודה לילד רגיל, 1.5 לתינוק
    creditsInput.value = (baseCredits + childCredits).toFixed(2);
  }

  // פונקציה לשינוי מגדר ועדכון כפתורים
  function setGender(selectedGender) {
    gender = selectedGender;
    maleBtn.classList.remove("active");
    femaleBtn.classList.remove("active");
    if (gender === "male") maleBtn.classList.add("active");
    else femaleBtn.classList.add("active");
    updateCredits();
  }

  // פונקציה לבדיקה אם השדות תקינים
  function validateInputs() {
    let isValid = true;

    // בדיקת שכר ברוטו
    if (salaryInput.value === "" || isNaN(salaryInput.value) || Number(salaryInput.value) <= 0) {
      salaryError.textContent = "אנא הזן שכר ברוטו תקין";
      isValid = false;
    } else {
      salaryError.textContent = "";
    }

    // בדיקת נקודות זיכוי
    if (creditsInput.value === "" || isNaN(creditsInput.value) || Number(creditsInput.value) <= 0) {
      creditsError.textContent = "אנא הזן מספר נקודות זיכוי תקין";
      isValid = false;
    } else {
      creditsError.textContent = "";
    }

    return isValid;
  }
  //התגת ההסבר על מדרגות מס הכנסה
  function showTaxInfo() {
  document.getElementById('tax-info').style.display = 'block';
  }

  // הצגה/הסתרה של אינפוט קרן השתלמות
  hishtalmutCheckbox.addEventListener("change", () => {
    if (hishtalmutCheckbox.checked) {
      hishtalmutInputWrapper.style.display = "block"; // מציג את האינפוט
    } else {
      hishtalmutInputWrapper.style.display = "none";  // מסתיר את האינפוט
    }
  });

  // ============================
  // 4️⃣ פונקציות חישוב
  // ============================

  // חישוב מס הכנסה
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

    // הורדת נקודות זיכוי
    tax -= credits * creditValue;
    if (tax < 0) tax = 0;
    return tax;
  }

  // חישוב תרומות (ביטוח לאומי או בריאות)
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

  // חישוב פנסיה חובה + קרן השתלמות
  function calculatePension(salary, pensionRate) {
    // חישוב פנסיה רגילה
    let pension = salary * pensionRate;

    // ברירת מחדל: אין קרן השתלמות
    let hishtalmut = 0;

    // בדיקה אם קרן השתלמות מסומנת
    const hishtalmutCheckbox = document.getElementById("hishtalmutCheckbox");
    if (hishtalmutCheckbox && hishtalmutCheckbox.checked) {
      const hishtalmutRate = parseFloat(document.getElementById("hishtalmutRate").value) || 0;
      hishtalmut = (salary * hishtalmutRate) / 100;
    }

    // נחזיר אובייקט עם הכל
    return {
      pension: pension,
      hishtalmut: hishtalmut,
      total: pension + hishtalmut
    };
  }

  // ============================
  // 5️⃣ מאזינים לכפתורים
  // ============================

  // כפתורי מגדר
  maleBtn.addEventListener("click", () => setGender("male"));
  femaleBtn.addEventListener("click", () => setGender("female"));

  // כפתורי ילדים רגילים
  plusChild.addEventListener("click", () => {
    if (children < maxChildren) children++;
    childrenCount.textContent = children;
    updateCredits();
  });
  minusChild.addEventListener("click", () => {
    if (children > minChildren) children--;
    childrenCount.textContent = children;
    updateCredits();
  });

  // כפתורי תינוקות
  plusInfant.addEventListener("click", () => {
    if (infants < maxChildren) infants++;
    infantCountEl.textContent = infants;
    updateCredits();
  });
  minusInfant.addEventListener("click", () => {
    if (infants > minChildren) infants--;
    infantCountEl.textContent = infants;
    updateCredits();
  });

  // כפתור חישוב
  calculateBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // 1️⃣ בדיקת תקינות הקלטים
    if (!validateInputs()) return;

    // 2️⃣ שליפת ערכים מהמשתמש
    const salary = Number(salaryInput.value);
    const credits = Number(creditsInput.value);
    const taxYear = Number(taxYearSelect.value);
    const config = TAX_CONFIG[taxYear].employee; // שכיר

    // 3️⃣ חישוב מסים ותרומות
    const incomeTax = calculateTax(salary, credits, config.TAX_BRACKETS, config.CREDIT_VALUE);
    const social = calculateContribution(salary, config.SOCIAL_BRACKETS);
    const health = calculateContribution(salary, config.HEALTH_BRACKETS);

    // חישוב פנסיה וקרן השתלמות
    const pensionData = calculatePension(salary, config.PENSION_RATE);

    // 4️⃣ חישוב נטו
    const netSalary = salary - incomeTax - social - health - pensionData.pension - pensionData.hishtalmut;

    // 5️⃣ מציאת מדרגת המס הגבוהה ביותר
    const maxBracket = config.TAX_BRACKETS
      .filter(br => salary > br.min)
      .reduce((prev, curr) => (curr.rate > prev.rate ? curr : prev), { rate: 0 });

    // 6️⃣ עדכון תצוגה ב-DOM
    document.getElementById("net").textContent = `נטו: ${netSalary.toFixed(2)} ₪`;
    document.getElementById("tax").textContent = `מס הכנסה מצטבר: ${incomeTax.toFixed(2)} ₪`;
    document.getElementById("health").textContent = `מס בריאות: ${health.toFixed(2)} ₪`;
    document.getElementById("social").textContent = `מס ביטוח לאומי: ${social.toFixed(2)} ₪`;
    document.getElementById("pension").textContent = `פנסיה חובה: ${pensionData.pension.toFixed(2)} ₪`;
    document.getElementById("hishtalmut").textContent = `קרן השתלמות: ${pensionData.hishtalmut.toFixed(2)} ₪`;
    document.getElementById("main-bracket").textContent = `מדרגת מס: ${(maxBracket.rate*100).toFixed(0)}%`;


    // ✅ חשיפת הפסקאות
    const resultsSection = document.getElementById("results-section");
    resultsSection.style.display = "flex"; // קודם מוודא שהאלמנט פעיל
    setTimeout(() => resultsSection.classList.add("show"), 10); // נותן דיליי קצר כדי שה-transition יפעל
    resultsSection.scrollIntoView({ behavior: "smooth" });

        // חושף את הניווט הפנימי
    const nav = document.getElementById("internal-nav");
    nav.style.display = "block";

    // 3️⃣ הצגת העוגה
    const values = [netSalary, incomeTax, health, social, pensionData.pension, pensionData.hishtalmut];
    const colors = ['#2ecc71','#e74c3c','#f1c40f','#3498db','#9b59b6','#f39c12'];
    drawPieChartAnimated(ctx, values, colors, legend);
    showTaxInfo();
  });

  // כפתור נקה
  clearBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // איפוס שדות טקסט
    salaryInput.value = "";
    creditsInput.value = "2.25";
    salaryError.textContent = "";
    creditsError.textContent = "";

    // איפוס מגדר
    setGender("male")

    // איפוס ילדים ותינוקות
    children = 0;
    infants = 0;
    childrenCount.textContent = children;
    infantCountEl.textContent = infants;

    // איפוס קרן השתלמות
    const hishtalmutCheckbox = document.getElementById("hishtalmutCheckbox");
    const hishtalmutWrapper = document.getElementById("hishtalmutInputWrapper");
    const hishtalmutRate = document.getElementById("hishtalmutRate");
    hishtalmutCheckbox.checked = false;  
    hishtalmutWrapper.style.display = "none";  
    hishtalmutRate.value = 2.5; // ערך ברירת מחדל

    // עדכון נקודות זיכוי לפי ברירת מחדל
    setGender("male");

    // הסתרת התוצאות
    const resultsSection = document.getElementById("results-section");
    resultsSection.classList.remove("show"); // מתחיל fade-out
    setTimeout(() => {
      resultsSection.style.display = "none"; // מחכה 400ms ואז מסתיר לגמרי
    }, 400); // זמן ההתאמה ל-transition ב-CSS
    employeeForm.scrollIntoView({ behavior: "smooth" });
  });

  // ============================
  // 6️⃣ אתחול התחלה
  // ============================
  childrenCount.textContent = children;
  infantCountEl.textContent = infants;
  setGender("male"); // ברירת מחדל מגדר
  updateCredits();

  
});
