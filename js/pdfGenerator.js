document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;

    const generateBtn = document.getElementById("generatePdf");
    generateBtn.addEventListener("click", () => {
        const doc = new jsPDF({ format: "a4", unit: "mm" });

        // הוספת הפונט
        doc.addFileToVFS("NotoSansHebrew-Regular.ttf", NotoSansHebrewRegular); // ודא שהקובץ מוטבע
        doc.addFont("NotoSansHebrew-Regular.ttf", "NotoSansHebrew", "normal");
        doc.setFont("NotoSansHebrew", "normal");

        // פונקציה להפיכת טקסט עברי - הוחזרה לגרסה המקורית והיעילה יותר
        function reverseHebrewText(text) {
            if (typeof text !== "string") return String(text);
            // לא הופך תאריכים, מספרים, "ללא", או מחרוזות לא עבריות
            // שינוי קל: הוספתי בדיקה ל-text.trim() כדי לא להחזיר false על מחרוזות ריקות
            if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text) || text.trim() === "אלל" || /^[0-9%.,\s]+$/.test(text.trim()) || /www\./.test(text)) {
                return text;
            }
            // מפצל לפי מילים עבריות, מספרים, וסימנים
            const parts = text.split(/(\s+|[^\u0590-\u05FF\s]+)/);
            return parts
                .map(part => {
                    // הופך רק מחרוזות עבריות טהורות
                    if (/^[\u0590-\u05FF]+$/.test(part)) {
                        return part.split("").reverse().join(""); // היפוך אותיות
                    }
                    return part;
                })
                .reverse() // היפוך סדר מילים
                .join("");
        }

        // פונקציה לעיצוב מספרים
        function formatNumber(num) {
            const parsed = Number(String(num).replace(/,/g, '').replace(' ₪', ''));
            return isNaN(parsed)
                ? "0.00"
                : parsed.toLocaleString('he-IL', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                  });
        }

        // בדיקת גובה הדף והוספת עמוד חדש במידת הצורך
        function checkPageHeight(y, neededHeight) {
            if (y + neededHeight > 270) {
                doc.addPage();
                return 20;
            }
            return y;
        }

        // מסגרת סביב הדף
        doc.setLineWidth(0.2);
        doc.setDrawColor(0, 0, 0);
        doc.rect(10, 10, 190, 277);

        // לוגו
        const logoImg = new Image();
        logoImg.src = "./images/og-image.png";
        logoImg.onload = () => {
            doc.addImage(logoImg, "PNG", 80, 10, 50, 20);

            // כותרת עליונה
            doc.setFontSize(18);
            doc.setTextColor(0, 102, 204);
            doc.text(reverseHebrewText("דוח חישוב שכר נטו"), 105, 35, { align: "center" });

            // **תיקון תאריך: פיצול לשתי שורות**
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            const today = new Date().toLocaleDateString("he-IL"); 
            
            // שורה 1: "תאריך:" - נהפוך את התווית כדי שלא תתהפך
            doc.text(reverseHebrewText("תאריך:"), 190, 40, { align: "right" }); 
            // שורה 2: התאריך עצמו - LTR
            doc.text(today, 190, 45, { align: "right" });


            // נתוני המשתמש - שליפה
            const salary = document.getElementById("salary")?.value || "0";
            const isYearly = document.getElementById("periodYearly")?.classList.contains("active");
            const period = isYearly ? "שנתי" : "חודשי";
            const gender = document.getElementById("maleBtn")?.classList.contains("active") ? "זכר" : "נקבה";
            const credits = document.getElementById("credits")?.value || "2.25";
            const children = Number(document.getElementById("childrenCount")?.textContent) || 0;
            const childrenAges = Array.from(document.querySelectorAll(".age-value")).map(el => Number(el.textContent) || 0);
            const hasHishtalmut = document.getElementById("hishtalmutCheckbox")?.checked ? "כן" : "ללא";
            const hishtalmutRate = hasHishtalmut === "כן" ? (document.getElementById("hishtalmutRate")?.value || "2.5") + "%" : "אלל";
            const taxYear = document.getElementById("taxYear")?.value || "2025";
            
            // תוצאות החישוב - **תיקון: השתמשות במשתנים הנכונים**
            const net = document.getElementById("net")?.innerText.replace(" ₪", "") || "0";
            const tax = document.getElementById("tax")?.innerText.replace(" ₪", "") || "0";
            const health = document.getElementById("health")?.innerText.replace(" ₪", "") || "0"; // מס בריאות
            const social = document.getElementById("social")?.innerText.replace(" ₪", "") || "0";
            const pension = document.getElementById("pension")?.innerText.replace(" ₪", "") || "0";
            const hishtalmutValue = document.getElementById("hishtalmut")?.innerText.replace(" ₪", "") || "0"; // קרן השתלמות
            const bracket = document.getElementById("main-bracket")?.innerText || "0%";


            // סעיף 1: פרטי הקלט
            let y = 50;
            doc.setFontSize(14);
            doc.setTextColor(0, 102, 204);
            doc.text(reverseHebrewText("פרטי הקלט"), 160, y, { align: "right" });
            y += 5;
            doc.setLineWidth(0.2);
            doc.setDrawColor(0, 102, 204);
            doc.line(50, y, 160, y); // קו תחתון
            y += 8;

            const inputs = [
                { label: reverseHebrewText("שכר ברוטו"), value: formatNumber(salary) + " ₪" },
                { label: reverseHebrewText("תקופה"), value: reverseHebrewText(period) },
                { label: reverseHebrewText("מין"), value: reverseHebrewText(gender) },
                { label: reverseHebrewText("נקודות זיכוי"), value: credits },
                { label: reverseHebrewText("מספר ילדים"), value: children.toString() },
                { label: reverseHebrewText("גילאי ילדים"), value: reverseHebrewText(childrenAges.length > 0 ? childrenAges.join(", ") : "ללא") }, 
                { label: reverseHebrewText("קרן השתלמות"), value: reverseHebrewText(hasHishtalmut) },
                { label: reverseHebrewText("שיעור קרן השתלמות"), value: hishtalmutRate },
                { label: reverseHebrewText("שנת מס"), value: taxYear }
            ];

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            inputs.forEach(item => {
                doc.text(item.label, 160, y, { align: "right" });
                doc.text(item.value, 60, y, { align: "left" });
                y += 8;
            });

            // קו הפרדה בין סעיפים
            y += 5;
            doc.setLineWidth(0.1);
            doc.setDrawColor(0, 0, 0);
            doc.line(50, y, 160, y);
            y += 8;

            // סעיף 2: תוצאות החישוב
            doc.setFontSize(14);
            doc.setTextColor(0, 102, 204);
            doc.text(reverseHebrewText("תוצאות החישוב"), 160, y, { align: "right" });
            y += 5;
            doc.setLineWidth(0.2);
            doc.setDrawColor(0, 102, 204);
            doc.line(50, y, 160, y);
            y += 8;

            const results = [
                { label: reverseHebrewText("שכר נטו"), value: formatNumber(net) + " ₪" },
                { label: reverseHebrewText("מס הכנסה"), value: formatNumber(tax) + " ₪" },
                { label: reverseHebrewText("מס בריאות"), value: formatNumber(health) + " ₪" },
                { label: reverseHebrewText("ביטוח לאומי"), value: formatNumber(social) + " ₪" },
                { label: reverseHebrewText("פנסיה"), value: formatNumber(pension) + " ₪" },
                { label: reverseHebrewText("קרן השתלמות"), value: formatNumber(hishtalmutValue) + " ₪" },
                { label: reverseHebrewText("מדרגת מס"), value: bracket }
            ];

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            results.forEach(item => {
                if (item.label === reverseHebrewText("שכר נטו")) {
                    doc.setTextColor(0, 102, 204);
                }
                doc.text(item.label, 160, y, { align: "right" });
                doc.text(item.value, 60, y, { align: "left" });
                doc.setTextColor(0, 0, 0);
                y += 8;
            });

            // בדיקת מקום לגרף
            y = checkPageHeight(y, 100); 

            // כותרת לגרף
            doc.setFontSize(14);
            doc.setTextColor(0, 102, 204);
            doc.text(reverseHebrewText("חלוקת השכר"), 105, y, { align: "center" });

            // יצירת גרף עוגה (ללא שינוי)
            const canvas = document.createElement("canvas");
            canvas.width = 180;
            canvas.height = 180;
            const ctx = canvas.getContext("2d");
            // שימוש במשתנים הנכונים
            const values = [
                Number(net.replace(/,/g, '')) || 0,
                Number(tax.replace(/,/g, '')) || 0,
                Number(health.replace(/,/g, '')) || 0,
                Number(social.replace(/,/g, '')) || 0,
                Number(pension.replace(/,/g, '')) || 0,
                Number(hishtalmutValue.replace(/,/g, '')) || 0
            ].filter(v => !isNaN(v) && v > 0);
            const colors = ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#9b59b6', '#f39c12'];
            const total = values.reduce((sum, v) => sum + v, 0);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY) - 10;
            let startAngle = 0;

            values.forEach((value, i) => {
                if (value > 0) {
                    const sliceAngle = (value / total) * 2 * Math.PI;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                    ctx.closePath();
                    ctx.fillStyle = colors[i];
                    ctx.fill();

                    const angle = startAngle + sliceAngle / 2;
                    const x = centerX + Math.cos(angle) * radius * 0.6;
                    const y = centerY + Math.sin(angle) * radius * 0.6;
                    ctx.fillStyle = '#000';
                    ctx.font = 'bold 10px NotoSansHebrew';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const percent = ((value / total) * 100).toFixed(0) + '%';
                    ctx.fillText(percent, x, y);

                    startAngle += sliceAngle;
                }
            });

            // הוספת הגרף
            try {
                const pieChartImg = canvas.toDataURL("image/png");
                doc.addImage(pieChartImg, "PNG", 65, y + 5, 80, 80);
            } catch (e) {
                console.error("Error adding pie chart:", e);
            }

            // הוספת לג'נד
            y += 90;
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            // **תיקון: הגדרת התוויות ללא היפוך**
            const labels = [
                "שכר נטו",
                "מס הכנסה",
                "מס בריאות",
                "ביטוח לאומי",
                "פנסיה",
                "קרן השתלמות"
            ];
            values.forEach((value, i) => {
                if (value > 0) {
                    const percentage = ((value / total) * 100).toFixed(0);
                    // **תיקון: בניית המחרוזת והאחוזים**
                    const labelReversed = reverseHebrewText(labels[i]);
                    // יצירת מחרוזת: [תווית עברית הפוכה] - [אחוזים]%
                    //const displayString = `${labelReversed} - %${percentage}`; 
                    
                    try {
                        doc.setFillColor(colors[i]);
                        doc.rect(20, y - 3, 5, 5, "F");
                        doc.text(percentage, 30, y, { align: "center" }); 
                        doc.text("%", 33, y, { align: "center" }); 
                        doc.text("-", 35, y, { align: "center" }); 
                        doc.text(labelReversed, 36, y, { align: "left" })
                        
                        y += 6;
                    } catch (e) {
                        console.error("Error drawing legend rect:", e);
                    }
                }
            });

            // הוספת תחתית
            y = checkPageHeight(y, 10);
            doc.setFontSize(12); 
            doc.setTextColor(0, 102, 204); 
            
            // **תיקון: הפרדת החלק העברי מהלינק הלא הפוך**
            const hebrewText = "נוצר על ידי ";
            const SiteName = "Netocalc | "
            const linkText = "www.netocalc.co.il";

            doc.text(SiteName, 95, y, { align: "center" });
            doc.text(reverseHebrewText(hebrewText), 115, y, { align: "center" });
            doc.text(linkText, 105, y+6, { align: "center" });


            // שמירת הדוח
            doc.save("Netocalc_Report.pdf");
        };
    });
});