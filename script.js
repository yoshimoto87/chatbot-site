/* =========================================
   1. プロトタイプ用の設定
   ========================================= */
const DUMMY_USER = {
    email: "test@example.com",
    password: "secure-demo-2026-XyZ"
};

// 現在どのセクションにいるかを保持する変数
let currentSectionId = 'top-page';

/**
 * 表示するセクションを切り替える関数
 */
function showSection(sectionId) {
    currentSectionId = sectionId; // 現在のセクションを更新

    // 全てのセクションから active クラスを削除して非表示にする
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 指定したIDのセクションを表示する
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // --- 【追加】パンくずリストの更新処理 ---
    const breadcrumb = document.getElementById('breadcrumb-list');
    if (breadcrumb) {
        let pageName = "";
        // セクションIDに応じて表示名を変える
        if (sectionId === 'login-page') pageName = "ログイン";
        else if (sectionId === 'signup-page') pageName = "新規会員登録";
        else if (sectionId === 'chat-page') pageName = "AIチャットルーム";
        
        // ページ名がある場合のみ、パンくずの中身を「TOP > ページ名」に書き換える
        if (pageName) {
            breadcrumb.innerHTML = `<a href="#" onclick="showSection('top-page'); return false;" class="breadcrumb-link">TOP</a> <span>&gt;</span> ${pageName}`;
        }
    }

    // ヘッダーのスタイルを即座に更新
    updateHeader();
    
    // 常にページ最上部へスクロール
    window.scrollTo(0, 0);
}

/* =========================================
   2. 認証関連のイベント
   ========================================= */

function handleLogin() {
    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;

    if (emailInput === DUMMY_USER.email && passInput === DUMMY_USER.password) {
        alert("ログイン成功！会員専用ページへ移動します。");
        showSection('chat-page');
        
        const guestNav = document.getElementById('guest-nav');
        if (guestNav) {
            guestNav.style.display = 'none';
        }
    } else {
        alert("エラー：メールアドレスまたはパスワードが違います。\n(Hint: test@example.com / secure-demo-2026-XyZ)");
    }
}

function handleSignup() {
    alert("アカウント登録（仮）が完了しました。\nログイン画面へ戻ります。");
    showSection('login-page');
}

/* =========================================
   3. UI・スクロール制御
   ========================================= */

// ヘッダーの状態を一括管理する関数
function updateHeader() {
    const header = document.getElementById('main-header') || document.querySelector('header');
    if (!header) return;

    // トップページ以外、または、トップページで50px以上スクロールしている場合
    if (currentSectionId !== 'top-page' || window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        // トップページかつ、一番上にいる場合のみ背景を消す
        header.classList.remove('scrolled');
    }
}

// スクロールするたびに実行
window.addEventListener('scroll', updateHeader);
