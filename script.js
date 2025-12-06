// スプリント2の核となる画面切り替え処理
function showDetail() {
    document.getElementById('map-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    // 実際はここでFirestorageのURLを使って画像などを動的に読み込みます。
}

function showMap() {
    document.getElementById('map-view').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}

// 初期化時にMAP画面を表示
window.onload = function() {
    showMap();
    // MAPの下にプレビューを表示する処理（ここではモックとして常に表示）
    document.getElementById('shop-preview').classList.remove('hidden'); 
};

// 実際の開発では、以下の処理がFirebaseと連携します：
/*
// 1. ユーザーの現在地を取得
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // 2. FirestoreからisProviding: true の店舗を取得（GeoQuery）
    // 3. 取得した店舗データを基にMAPにピンを配置、プレビューの情報を更新
});
*/