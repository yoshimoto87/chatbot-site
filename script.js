/* =========================================
   1. プロトタイプ用の設定
   ========================================= */
const DUMMY_USER = {
    email: "test@example.com",
    password: "secure-demo-2026-XyZ"
};

let currentSectionId = 'top-page';

/* =========================================
   2. 画面切り替えとパンくず機能
   ========================================= */
function showSection(sectionId) {
    currentSectionId = sectionId; 

    // 全セクションを非表示
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 対象セクションを表示
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // パンくずリストの更新
    const breadcrumb = document.getElementById('breadcrumb-list');
    if (breadcrumb) {
        let pageName = "";
        if (sectionId === 'login-page') pageName = "ログイン";
        else if (sectionId === 'signup-page') pageName = "新規会員登録";
        else if (sectionId === 'chat-page') pageName = "AIチャットルーム";
        
        if (pageName) {
            breadcrumb.innerHTML = `<a href="#" onclick="showSection('top-page'); return false;" class="breadcrumb-link">TOP</a> <span>&gt;</span> ${pageName}`;
        }
    }

    updateHeader();
    window.scrollTo(0, 0);
}

/* =========================================
   3. 認証関連のイベント
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
   4. ヘッダースクロール制御
   ========================================= */
function updateHeader() {
    const header = document.getElementById('main-header') || document.querySelector('header');
    if (!header) return;

    if (currentSectionId !== 'top-page' || window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateHeader);

/* =========================================
   5. ご利用の流れタブ切り替え
   ========================================= */
function switchFlow(element, type) {
    // 全タブの非アクティブ化
    document.querySelectorAll('.flow-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    // クリックされたタブをアクティブ化
    element.classList.add('active');

    // 全フローコンテンツの非アクティブ化
    document.querySelectorAll('.flow-content').forEach(content => {
        content.classList.remove('active');
    });
    // 対象のフローコンテンツをアクティブ化
    document.getElementById('flow-' + type).classList.add('active');
}
/* =========================================
   追加: 導入メリットタブ切り替え
   ========================================= */
function switchBenefits(element, type) {
    // 全メリットタブの非アクティブ化
    document.querySelectorAll('.benefit-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    // クリックされたタブをアクティブ化
    element.classList.add('active');

    // 全メリットコンテンツの非アクティブ化
    document.querySelectorAll('.benefits-content').forEach(content => {
        content.classList.remove('active');
    });
    // 対象のメリットコンテンツをアクティブ化
    document.getElementById('benefits-' + type).classList.add('active');
}
