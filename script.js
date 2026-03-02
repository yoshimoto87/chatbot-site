/* =========================================
   1. プロトタイプ用の設定
   ========================================= */
const DUMMY_USER = {
    email: "test@example.com",
    password: "secure-demo-2026-XyZ"
};

/**
 * 表示するセクションを切り替える関数
 * @param {string} sectionId - 表示したいセクションのID
 */
function showSection(sectionId) {
    // 全てのセクションから active クラスを削除して非表示にする
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 指定したIDのセクションを表示する
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    

    // ヘッダーの背景色を制御
    const header = document.getElementById('main-header');
    if (header) {
        if (sectionId === 'top-page') {
            // トップページならスクロール量に応じて変化させる（既存の挙動）
            if (window.scrollY <= 50) header.classList.remove('scrolled');
        } else {
            // ログイン、登録、チャットページなら強制的に白背景にする
            header.classList.add('scrolled');
        }
    }
   
    // 常にページ最上部へスクロール
    window.scrollTo(0, 0);
}

/* =========================================
   2. 認証関連のイベント
   ========================================= */

/**
 * ログインボタン押下時の処理
 */
function handleLogin() {
    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;

    if (emailInput === DUMMY_USER.email && passInput === DUMMY_USER.password) {
        alert("ログイン成功！会員専用ページへ移動します。");
        showSection('chat-page');
        
        // ログイン後はゲスト用ナビ（ログイン・新規登録ボタン）を隠す
        const guestNav = document.getElementById('guest-nav');
        if (guestNav) {
            guestNav.style.display = 'none';
        }
    } else {
        alert("エラー：メールアドレスまたはパスワードが違います。\n(Hint: test@example.com / secure-demo-2026-XyZ)");
    }
}

/**
 * 【新規追加】新規登録ボタン押下時の処理（見た目のみ）
 */
function handleSignup() {
    // 実際はここでバリデーションなどを行いますが、プロトタイプなのでアラートのみ
    alert("アカウント登録（仮）が完了しました。\nログイン画面へ戻ります。");
    showSection('login-page');
}

/* =========================================
   3. UI・スクロール制御
   ========================================= */

window.addEventListener('scroll', function() {
    // ヘッダーの背景色をスクロール量に応じて切り替え
    const header = document.getElementById('main-header') || document.querySelector('header');
    
    if (header) {
        if (window.scrollY > 50) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});
