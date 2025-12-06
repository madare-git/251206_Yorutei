let map;
let shopsData = {}; // Firestoreから取得した店舗データを保持するオブジェクト

// ------------------------------------------
// MVPのモックデータ (Firestoreから取得されるデータ構造をシミュレーション)
// ------------------------------------------
const MOCK_SHOPS = [
    { id: 'shopA', name: "地鶏と野菜のお店 A", lat: 35.6830, lng: 139.7710, 
      price: '1200', genres: ['肉', '和食'], remaining: 5, distance: '徒歩 3分',
      mainImg: 'https://via.placeholder.com/400x250?text=Shop+A+Teishoku', 
      address: '東京都千代田区神田 X-1' },
    
    // isProviding: false の店はMAPに表示されないことをシミュレーション
    { id: 'shopB', name: "魚定食のお店 B", lat: 35.6800, lng: 139.7650, 
      price: '1500', genres: ['魚', '和食'], remaining: 0, distance: '徒歩 5分', 
      mainImg: 'https://via.placeholder.com/400x250?text=Shop+B+Teishoku', 
      address: '東京都千代田区神田 X-2' },
      
    { id: 'shopC', name: "ヘルシー中華 C", lat: 35.6780, lng: 139.7700, 
      price: '1000', genres: ['中華'], remaining: 10, distance: '徒歩 10分', 
      mainImg: 'https://via.placeholder.com/400x250?text=Shop+C+Teishoku', 
      address: '東京都千代田区神田 X-3' }
];


// ------------------------------------------
// Google Maps API のコールバック関数（地図の初期化）
// ------------------------------------------
function initMap() {
    console.log("Google Maps API 読み込み完了、initMapを実行します。");
    
    const mapCenter = { lat: 35.6812, lng: 139.7671 }; // 東京駅周辺
    
    map = new google.maps.Map(document.getElementById("map"), {
        center: mapCenter,
        zoom: 15,
        disableDefaultUI: true, // UIをシンプルに
    });

    // 実際のアプリでは、ここでFirestoreのリアルタイムリスナーを設定します
    // (onSnapshotなどで isProviding: true の店舗だけを取得)
    loadShopsAndPlaceMarkers(MOCK_SHOPS); 
}

// ------------------------------------------
// 店舗データを読み込み、マーカーを配置する関数
// ------------------------------------------
function loadShopsAndPlaceMarkers(shops) {
    shops.forEach(shop => {
        // MVPの核：ONになっている店だけをMAPに表示（FirestoreのisProvidingフラグをシミュレーション）
        if (shop.remaining > 0) { 
            shopsData[shop.id] = shop; // 詳細表示のためにデータを保存

            const marker = new google.maps.Marker({
                position: { lat: shop.lat, lng: shop.lng },
                map: map,
                title: shop.name,
                // カスタムアイコンを使って、よる定のキーカラーにすることも可能
            });

            // マーカーにクリックイベントを設定
            marker.addListener("click", () => {
                updatePreview(shop.id); // 下部のプレビューカードを更新
                map.panTo(marker.getPosition()); // クリックしたピンに地図の中心を移動
                document.getElementById('shop-preview').classList.remove('hidden'); 
            });
        }
    });
}

// ------------------------------------------
// UI制御関数
// ------------------------------------------

// プレビューカードの情報を更新
function updatePreview(shopId) {
    const shop = shopsData[shopId];
    if (!shop) return;
    
    document.getElementById('shop-preview').dataset.shopId = shopId;
    document.getElementById('preview-img').src = shop.mainImg.replace('400x250', '60x60');
    document.getElementById('preview-name').innerText = shop.name;
    document.getElementById('preview-genre').innerText = shop.genres[0] + '系定食';
    document.getElementById('preview-price').innerText = `¥${shop.price}`;
    document.getElementById('preview-distance').innerText = shop.distance;
}

// 詳細画面を表示し、データを埋め込む
function showDetail(shopId) {
    const shop = shopsData[shopId];
    if (!shop) return;
    
    // データの埋め込み
    document.getElementById('detail-name-header').innerText = shop.name;
    document.getElementById('detail-img').src = shop.mainImg;
    document.getElementById('detail-price').innerText = `¥${shop.price} (税込)`;
    
    // タグの生成
    const tagsContainer = document.getElementById('detail-tags');
    tagsContainer.innerHTML = '';
    shop.genres.forEach(genre => {
        const span = document.createElement('span');
        span.innerText = genre + '系定食';
        tagsContainer.appendChild(span);
    });
    
    // 残数とルートボタン
    document.getElementById('detail-remaining').innerText = shop.remaining > 0 ? `残り食数：**${shop.remaining}食**` : '**完売しました**';
    document.getElementById('go-button').onclick = () => {
        // 実際はDirections APIでルートを検索するか、外部MAPアプリを起動します
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`, '_blank');
    };
    
    // 画面切り替え
    document.getElementById('map-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
}

// MAP画面に戻る
function showMap() {
    document.getElementById('map-view').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
    
    // 地図のサイズが正しく反映されるようにリサイズイベントをトリガー
    if (map) {
        google.maps.event.trigger(map, 'resize');
    }
}

// 初回ロード時の処理 (initMapはコールバックされるため、ここでは何もしません)
window.onload = function() {
    showMap();
    // プレビューは最初は隠しておく（ピンをタップするまで）
};