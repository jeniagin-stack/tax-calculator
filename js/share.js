// ====== הגדרות שיתוף ======
const shareText = "גלה כמה באמת מגיע לך בנטו – מחשבון מס הכנסה מהיר ופשוט!";
const shareURL = "https://jeniagin-stack.github.io/tax-calculator/";

// זיהוי מובייל
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ====== וואטסאפ ======
const whatsappLink = isMobile 
  ? `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareURL)}` 
  : `https://web.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareURL)}`;
document.getElementById("whatsapp-share").href = whatsappLink;

// ====== טלגרם ======
document.getElementById("telegram-share").href =
  `https://t.me/share/url?url=${encodeURIComponent(shareURL)}&text=${encodeURIComponent(shareText)}`;

// ====== פייסבוק ======
document.getElementById("facebook-share").href =
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}&quote=${encodeURIComponent(shareText)}`;

// ====== טוויטר ======
document.getElementById("twitter-share").href =
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareURL)}`;
