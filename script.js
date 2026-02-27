// 1. プロトタイプ用の固定ログイン情報（デモ用）
const DUMMY_USER = {
    email: "test@example.com",
    password: "secure-demo-2026-XyZ" // 以前の脆弱なパスワードから更新済み
};

/**
 * 表示するセクションを切り替える関数
 * @param {string} sectionId - 表示したいセクションのID ('top-page', 'login-page', 'chat-page')
 */
function showSection(sectionId) {
    // 全てのセクションから active クラスを消して非表示にする
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 指定したセクションに active クラスをつけて表示する
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // 画面の一番上までスクロールさせる
    window.scrollTo(0, 0);
}

/**
 * ログインボタンが押された時の処理
 */
function handleLogin() {
    // 画面から入力された値を取得
    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;

    // 入力値と固定のログイン情報を比較
    if (emailInput === DUMMY_USER.email && passInput === DUMMY_USER.password) {
        alert("ログイン成功！会員専用ページへ移動します。");
        
        // チャット画面を表示
        showSection('chat-page');
        
        // ヘッダーの「ログイン/新規登録」ナビゲーションを隠す
        const guestNav = document.getElementById('guest-nav');
        if (guestNav) {
            guestNav.style.display = 'none';
        }
    } else {
        // 入力が間違っている場合のアラート（ヒントを現在のパスワードに修正）
        alert("エラー：メールアドレスまたはパスワードが違います。\n(Hint: test@example.com / secure-demo-2026-XyZ)");
    }
}
