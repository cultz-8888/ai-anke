// Google Apps Script Web App URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw3Sjcw8fy4G0xF5wSiavNwAnNKehkAa9Q3F0N5cey5xIhez-2XZI8uCUle9ChFp0IbPQ/exec';

// ラジオボタンの選択状態を視覚的に表示
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // 同じname属性のラジオボタンからselectedクラスを削除
        document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => {
            r.closest('.radio-item').classList.remove('selected');
        });
        // 選択されたラジオボタンにselectedクラスを追加
        this.closest('.radio-item').classList.add('selected');
    });
});

// フォーム送信処理
document.getElementById('surveyForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // すべての質問に回答されているかチェック
    const questions = ['phone_calls', 'website_update', 'line_account', 'line_automation', 'google_maps', 'priority'];
    const formData = new FormData(this);
    
    for (let question of questions) {
        if (!formData.get(question)) {
            alert('すべての質問にお答えください。');
            return;
        }
    }

    // UI要素の取得
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // ローディング状態に変更
    submitBtn.disabled = true;
    loading.style.display = 'block';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // 送信データの準備
    const surveyData = {
        phone_calls: formData.get('phone_calls'),
        website_update: formData.get('website_update'),
        line_account: formData.get('line_account'),
        line_automation: formData.get('line_automation'),
        google_maps: formData.get('google_maps'),
        priority: formData.get('priority'),
        timestamp: new Date().toISOString()
    };

    try {
        // Google Apps Scriptに送信
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData)
        });

        const result = await response.json();

        if (result.status === 'success') {
            // 成功時の処理
            loading.style.display = 'none';
            successMessage.style.display = 'block';
            // フォームを非表示にする
            document.querySelector('.survey-form').style.display = 'none';
        } else {
            throw new Error(result.message || '送信に失敗しました');
        }
    } catch (error) {
        // エラー時の処理
        console.error('送信エラー:', error);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
        submitBtn.disabled = false;
    }
});