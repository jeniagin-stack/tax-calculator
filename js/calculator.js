document.addEventListener("DOMContentLoaded", function() {

  
    // וודא שהגלילה מתחילה מהחלק העליון
    window.scrollTo(0, 0);

    // ============================
    // 1️⃣ אלמנטים מה-DOM
    // ============================
    const periodMonthly = document.getElementById('periodMonthly');
    const periodYearly = document.getElementById('periodYearly');
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
    let gender = "male";
    let children = 0;
    const maxChildren = 10;
    const minChildren = 0;
    let childrenAges = [];

    // ============================
    // 3️⃣ הגדרת TAX_CONFIG
    // ============================
    const TAX_CONFIG = {
        2025: {
            employee: {
                CREDIT_VALUE: 242,
                TAX_BRACKETS: [
                    { min: 0, max: 7010, rate: 0.10 },
                    { min: 7011, max: 10060, rate: 0.14 },
                    { min: 10061, max: 16150, rate: 0.20 },
                    { min: 16151, max: 22440, rate: 0.31 },
                    { min: 22441, max: 46690, rate: 0.35 },
                    { min: 46691, max: 60130, rate: 0.47 },
                    { min: 60131, max: Infinity, rate: 0.50 }
                ],
                SOCIAL_BRACKETS: [
                    { min: 0, max: 7522, rate: 0.004 },
                    { min: 7523, max: 50695, rate: 0.07 }
                ],
                HEALTH_BRACKETS: [
                    { min: 0, max: 7522, rate: 0.031 },
                    { min: 7523, max: 50695, rate: 0.0542 } // התאמה למחשבון
                ],
                PENSION_RATE: 0.06,
                PENSION_MAX_CREDIT_MONTHLY: 679
            }
        }
    };

    // ============================
    // 4️⃣ פונקציות עזר
    // ============================
    periodMonthly.addEventListener('click', () => {
        periodMonthly.classList.add('active');
        periodYearly.classList.remove('active');
    });

    periodYearly.addEventListener('click', () => {
        periodYearly.classList.add('active');
        periodMonthly.classList.remove('active');
    });

    function updateCredits() {
        let credits = gender === "male" ? 2.25 : 2.75;
        childrenAges.forEach(age => {
            let childCredits = 0;
            if (age >= 0 && age < 1) childCredits = 2.5;
            else if (age >= 1 && age < 2) childCredits = 4.5;
            else if (age >= 2 && age < 3) childCredits = 4.5;
            else if (age >= 3 && age < 4) childCredits = 3.5;
            else if (age >= 4 && age < 6) childCredits = 2.5;
            else if (age >= 6 && age < 13) childCredits = gender === "male" ? 1 : 2;
            else if (age >= 13 && age < 18) childCredits = gender === "male" ? 1 : 2;
            else if (age >= 18) childCredits = gender === "male" ? 0 : 0.5;
            credits += childCredits;
        });
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
        const wrapper = document.getElementById('childrenAgesWrapper');
        childrenAgesContainer.innerHTML = "";
        if (children === 0) {
            wrapper.style.display = 'none';
            return;
        }
        wrapper.style.display = 'block';
        childrenAgesContainer.style.display = 'flex';
        childrenAgesContainer.style.flexWrap = 'wrap';
        childrenAgesContainer.style.justifyContent = 'center';
        childrenAgesContainer.style.gap = '15px';

        childrenAges.forEach((age, index) => {
            const ageField = document.createElement('div');
            ageField.className = 'child-age';
            ageField.innerHTML = `
                <label>ילד/ה ${index + 1}</label>
                <button type="button" class="plus">+</button>
                <span class="age-value">${age}</span>
                <button type="button" class="minus">-</button>
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

    // ============================
    // 5️⃣ פונקציות חישוב
    // ============================
    function calculateTax(salary, credits, taxBrackets, creditValue, pensionRate, pensionMaxCreditMonthly) {
         // שלב 1: חישוב ההפרשה של העובד לפנסיה
        const employeePension = salary * pensionRate;

        // שלב 2: חישוב החלקים המוכרים במס
        // לפי החוק — עד תקרה מסוימת:
        const pensionRecognized = Math.min(employeePension, pensionMaxCreditMonthly);

        // חצי מההפרשה נחשבת לניכוי מההכנסה החייבת
        const deductiblePart = pensionRecognized * 0.5

        // החצי השני נחשב לזיכוי ממס (35% ממנו)
         const pensionCredit = (pensionRecognized * 0.5) * 0.35;

        // שלב 3: מחשבים את ההכנסה החייבת לאחר ניכוי
        const taxableSalary = salary - deductiblePart;

        // שלב 4: חישוב המס לפי מדרגות
        let remaining = taxableSalary;
        let tax = 0;

        for (let bracket of taxBrackets) {
            if (taxableSalary > bracket.min) {
                const width = bracket.max === Infinity ? remaining : (bracket.max - bracket.min);
                const taxable = Math.min(remaining, width);
                tax += taxable * bracket.rate;
                remaining -= taxable;
                if (remaining <= 0) break;
            }
        }
        // שלב 5: הפחתת נקודות זיכוי
        tax -= credits * creditValue;
        // שלב 6: הפחתת זיכוי על ההפרשה לפנסיה
        tax -= pensionCredit;

        // שלב 7: הגנה ממס שלילי
        if (tax < 0) tax = 0;
        return tax;
    }

    function calculateContribution(salary, brackets) {
        let remaining = salary;
        let contrib = 0;
        for (let bracket of brackets) {
            if (remaining <= 0) break;
            const width = bracket.max === Infinity ? remaining : (bracket.max - bracket.min);
            const taxable = Math.min(remaining, width);
            contrib += taxable * bracket.rate;
            remaining -= taxable;
        }
        return Math.round(contrib * 100) / 100;
    }

    function calculatePension(salary, pensionRate, pensionMaxCreditMonthly) {
        let pension = salary * pensionRate;
        let hishtalmut = 0;
        if (hishtalmutCheckbox.checked) {
            const hishtalmutRate = parseFloat(document.getElementById("hishtalmutRate").value) || 0;
            hishtalmut = (salary * hishtalmutRate) / 100;
        }
        return { 
            pension, 
            hishtalmut, 
            total: pension + hishtalmut,
            eligibleForCredit: Math.min(pension, pensionMaxCreditMonthly)
        };
    }

    // ============================
    // 6️⃣ מאזינים לכפתורים
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

    calculateBtn.addEventListener("click", function(event) {
        event.preventDefault();
        if (!validateInputs()) return;

        let salary = Number(salaryInput.value);
        const credits = Number(creditsInput.value);
        const taxYear = taxYearSelect.value.trim(); // string
        const config = TAX_CONFIG[taxYear]?.employee;
        const isYearly = document.getElementById('periodYearly').classList.contains('active');
        
        if (isYearly) {
            salary /= 12;
        }

        let incomeTax = calculateTax(
            salary,
            credits,
            config.TAX_BRACKETS,
            config.CREDIT_VALUE,
            config.PENSION_RATE,
            config.PENSION_MAX_CREDIT_MONTHLY
        );
        let social = calculateContribution(salary, config.SOCIAL_BRACKETS);
        let health = calculateContribution(salary, config.HEALTH_BRACKETS);
        let pensionData = calculatePension(salary, config.PENSION_RATE, config.PENSION_MAX_CREDIT_MONTHLY);

        let netSalary = salary - incomeTax - social - health - pensionData.pension - pensionData.hishtalmut;

        if (isYearly) {
            netSalary *= 12;
            incomeTax *= 12;
            social *= 12;
            health *= 12;
            pensionData.pension *= 12;
            pensionData.hishtalmut *= 12;
        }

            document.getElementById('net').textContent = netSalary.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₪";
            document.getElementById('tax').textContent = incomeTax.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₪";
            document.getElementById('health').textContent = health.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₪";
            document.getElementById('social').textContent = social.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₪";
            document.getElementById('pension').textContent = pensionData.pension.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₪";
            document.getElementById('hishtalmut').textContent = pensionData.hishtalmut.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₪";

            document.getElementById('main-bracket').textContent = 
                (config.TAX_BRACKETS
                    .filter(br => salary > br.min)
                    .reduce((prev, curr) => (curr.rate > prev.rate ? curr : prev), { rate: 0 })
                    .rate * 100)
                .toFixed(0) + "%";


        const resultsSection = document.getElementById("results-section");
        resultsSection.style.display = "flex";
        setTimeout(() => {
            resultsSection.classList.add("show");
            resultsSection.scrollIntoView({ behavior: "smooth" });
        }, 100);

        const taxInfoSection = document.getElementById("tax-info");
        const taxCreditsSection = document.getElementById("tax-credits");
        const taxTipsSection = document.getElementById("tax-tips");
        const credits2025 = document.getElementById('credits-2025');
        taxInfoSection.style.display = "block";
        taxCreditsSection.style.display = "block";
        taxTipsSection.style.display = "block";
        credits2025.style.display = 'block';

        const nav = document.getElementById("internal-nav");
        nav.style.display = "block";

        const values = [netSalary, incomeTax, health, social, pensionData.pension, pensionData.hishtalmut];
        const colors = ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#9b59b6', '#f39c12'];
        const resultCards = document.querySelectorAll('.results-cards .result-card');

        resultCards.forEach((card, index) => {
            if (colors[index]) {
                card.style.backgroundColor = colors[index];
                card.style.color = '#fff';
            }
        });

        const mainBracketCard = document.getElementById('main-bracket').parentElement;
        mainBracketCard.style.backgroundColor = '#000';
        mainBracketCard.style.color = '#fff';

        drawPieChartAnimated(ctx, values, colors, legend);
        
        gtag('event', 'calculate_click', { 'event_category': 'Calculator', 'event_label': 'Net calculator used' });
    });

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
            if (el) {
                el.textContent = id === "main-bracket" ? "מדרגת מס: 0%" : 
                    `${id === "net" ? "נטו: " : id === "tax" ? "מס הכנסה מצטבר: " : 
                    id === "health" ? "מס בריאות: " : id === "social" ? "מס ביטוח לאומי: " : 
                    id === "pension" ? "פנסיה חובה: " : "קרן השתלמות: "}0 ₪`;
            }
        });

        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
            resultsSection.style.display = "none";
            resultsSection.classList?.remove("show");
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        legend.innerHTML = "";

        if (employeeForm) employeeForm.scrollIntoView({ behavior: "smooth" });

        gtag('event', 'clear_click', { 'event_category': 'clear', 'event_label': 'clear button used' });

        updateCredits();
    });

    childrenCount.textContent = children;
    setGender("male");
    updateChildrenAgesFields();
    updateCredits();
   
});
