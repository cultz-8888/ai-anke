{\rtf1\ansi\ansicpg932\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Google Apps Script Web App URL\
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw3Sjcw8fy4G0xF5wSiavNwAnNKehkAa9Q3F0N5cey5xIhez-2XZI8uCUle9ChFp0IbPQ/exec';\
\
// \uc0\u12521 \u12472 \u12458 \u12508 \u12479 \u12531 \u12398 \u36984 \u25246 \u29366 \u24907 \u12434 \u35222 \u35226 \u30340 \u12395 \u34920 \u31034 \
document.querySelectorAll('input[type="radio"]').forEach(radio => \{\
    radio.addEventListener('change', function() \{\
        // \uc0\u21516 \u12376 name\u23646 \u24615 \u12398 \u12521 \u12472 \u12458 \u12508 \u12479 \u12531 \u12363 \u12425 selected\u12463 \u12521 \u12473 \u12434 \u21066 \u38500 \
        document.querySelectorAll(`input[name="$\{this.name\}"]`).forEach(r => \{\
            r.closest('.radio-item').classList.remove('selected');\
        \});\
        // \uc0\u36984 \u25246 \u12373 \u12428 \u12383 \u12521 \u12472 \u12458 \u12508 \u12479 \u12531 \u12395 selected\u12463 \u12521 \u12473 \u12434 \u36861 \u21152 \
        this.closest('.radio-item').classList.add('selected');\
    \});\
\});\
\
// \uc0\u12501 \u12457 \u12540 \u12512 \u36865 \u20449 \u20966 \u29702 \
document.getElementById('surveyForm').addEventListener('submit', async function(e) \{\
    e.preventDefault();\
\
    // \uc0\u12377 \u12409 \u12390 \u12398 \u36074 \u21839 \u12395 \u22238 \u31572 \u12373 \u12428 \u12390 \u12356 \u12427 \u12363 \u12481 \u12455 \u12483 \u12463 \
    const questions = ['phone_calls', 'website_update', 'line_account', 'line_automation', 'google_maps', 'priority'];\
    const formData = new FormData(this);\
    \
    for (let question of questions) \{\
        if (!formData.get(question)) \{\
            alert('\uc0\u12377 \u12409 \u12390 \u12398 \u36074 \u21839 \u12395 \u12362 \u31572 \u12360 \u12367 \u12384 \u12373 \u12356 \u12290 ');\
            return;\
        \}\
    \}\
\
    // UI\uc0\u35201 \u32032 \u12398 \u21462 \u24471 \
    const submitBtn = document.getElementById('submitBtn');\
    const loading = document.getElementById('loading');\
    const successMessage = document.getElementById('successMessage');\
    const errorMessage = document.getElementById('errorMessage');\
\
    // \uc0\u12525 \u12540 \u12487 \u12451 \u12531 \u12464 \u29366 \u24907 \u12395 \u22793 \u26356 \
    submitBtn.disabled = true;\
    loading.style.display = 'block';\
    successMessage.style.display = 'none';\
    errorMessage.style.display = 'none';\
\
    // \uc0\u36865 \u20449 \u12487 \u12540 \u12479 \u12398 \u28310 \u20633 \
    const surveyData = \{\
        phone_calls: formData.get('phone_calls'),\
        website_update: formData.get('website_update'),\
        line_account: formData.get('line_account'),\
        line_automation: formData.get('line_automation'),\
        google_maps: formData.get('google_maps'),\
        priority: formData.get('priority'),\
        timestamp: new Date().toISOString()\
    \};\
\
    try \{\
        // Google Apps Script\uc0\u12395 \u36865 \u20449 \
        const response = await fetch(WEB_APP_URL, \{\
            method: 'POST',\
            headers: \{\
                'Content-Type': 'application/json',\
            \},\
            body: JSON.stringify(surveyData)\
        \});\
\
        const result = await response.json();\
\
        if (result.status === 'success') \{\
            // \uc0\u25104 \u21151 \u26178 \u12398 \u20966 \u29702 \
            loading.style.display = 'none';\
            successMessage.style.display = 'block';\
            // \uc0\u12501 \u12457 \u12540 \u12512 \u12434 \u38750 \u34920 \u31034 \u12395 \u12377 \u12427 \
            document.querySelector('.survey-form').style.display = 'none';\
        \} else \{\
            throw new Error(result.message || '\uc0\u36865 \u20449 \u12395 \u22833 \u25943 \u12375 \u12414 \u12375 \u12383 ');\
        \}\
    \} catch (error) \{\
        // \uc0\u12456 \u12521 \u12540 \u26178 \u12398 \u20966 \u29702 \
        console.error('\uc0\u36865 \u20449 \u12456 \u12521 \u12540 :', error);\
        loading.style.display = 'none';\
        errorMessage.style.display = 'block';\
        submitBtn.disabled = false;\
    \}\
\});}