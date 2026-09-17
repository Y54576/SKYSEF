/* Complete current Atlas catalog, tabs, persistence bridge, and renderer.
 * Source lines 6517-6787. Load after #viewGallery exists.
 */
const GALLERY_CATEGORY_ORDER = ['哺乳類','鳥類','魚類','蛙類','昆蟲','樹類','花類','水果類','蔬菜類','美食類','人物'];
const TINY_IMAGE_NAMES = {
  '哺乳類': ['山羌','台灣狐蝙','台灣長鬃山羊','台灣梅花鹿','台灣野兔','台灣森鼠','台灣黑熊','台灣獼猴','石虎','穿山甲'],
  '鳥類': ['台灣小灣嘴','台灣朱雀','台灣竹雞','台灣噪眉','台灣擬啄木','台灣藍雀','赤腹山雀','帝雉','鳥頭翁','黃山雀'],
  '魚類': ['小眼窄尾魟','台灣馬口魚','台灣鏟頷魚','台灣鬚鱲','台灣纓口鰍','沈氏骨鱗魚','長吻多棘牛尾魚','陳氏鰍鮀','雪花斑裸胸鯙','櫻花鉤吻鮭'],
  '蛙類': ['王氏樹蛙','台北樹蛙','史丹吉氏小雨蛙','梭得氏赤蛙','莫氏樹蛙','斯文豪氏赤蛙','碧眼樹蛙','翡翠樹蛙','諸羅樹蛙','橙腹樹蛙'],
  '昆蟲': ['台灣暗蟬','長臂金龜','虹彩叩頭蟲','深山鍬形蟲','無霸勾蜓','寬尾鳳蝶','曙鳳蝶','霧社血斑天牛','蘭嶼筒胸竹節蟲','蘭嶼雷蟋'],
  '樹類': ['台灣水青岡','台灣杉','台灣肖楠','台灣紅柞槭','台灣海棗','台灣神木','台灣樟樹','台灣櫸','台灣欒樹','玉山圓柏'],
  '花類': ['太魯閣佛甲草','台灣及己','台灣白蝴蝶蘭','台灣杜鵑','台灣野小百合','台灣喜普鞋蘭','早田氏蛇根草','金花石蒜','阿里山油菊','鹿谷秋海棠'],
  '水果類': ['火龍果','台灣野櫻桃','芒果','柚子','紅心芭樂','香蕉','草莓','愛玉子','鳳梨','蓮霧'],
  '蔬菜類': ['小白菜','小黃瓜','山蘇','水蓮','青花筍','秋葵','紅鳳菜','苦瓜','茭白筍','高麗菜'],
  '美食類': ['牛肉麵','地瓜球','肉圓','肉燥飯','珍珠奶茶','挫冰','臭豆腐','蚵仔煎','鳳梨酥','鹹酥雞'],
  '人物': ['萃谷行者','熱果旅姬'],
};
const NORMAL_CATEGORY_RARITIES = [1,1,1,1,2,2,3,3,4,5];
const TINY_GALLERY_CATALOG = GALLERY_CATEGORY_ORDER.flatMap(category =>
  TINY_IMAGE_NAMES[category].map((name, index) => ({
    id: `${category}/${name}`,
    name,
    category,
    img: `tiny images/${category}/${name}.png`,
    rarity: category === '人物' ? 5 : NORMAL_CATEGORY_RARITIES[index],
  }))
);
const GALLERY_CATEGORY_UI = {
  '哺乳類': { icon:'🐾', iconSrc:'assets/images/atlas/section-icons/mammal.png', className:'series-wildlife' },
  '鳥類': { icon:'🐦', iconSrc:'assets/images/atlas/section-icons/bird.png', className:'series-birds' },
  '魚類': { icon:'🐟', iconSrc:'assets/images/atlas/section-icons/fish.png', className:'series-fish' },
  '蛙類': { icon:'🐸', iconSrc:'assets/images/atlas/section-icons/frog.png', className:'series-frogs' },
  '昆蟲': { icon:'🦋', iconSrc:'assets/images/atlas/section-icons/bug.png', className:'series-insects' },
  '樹類': { icon:'🌳', iconSrc:'assets/images/atlas/section-icons/tree.png', className:'series-trees' },
  '花類': { icon:'🌸', iconSrc:'assets/images/atlas/section-icons/flower.png', className:'series-flowers' },
  '水果類': { icon:'🍎', iconSrc:'assets/images/atlas/section-icons/fruit.png', className:'series-fruits' },
  '蔬菜類': { icon:'🥬', iconSrc:'assets/images/atlas/section-icons/vegetable.png', className:'series-vegetables' },
  '美食類': { icon:'🍜', iconSrc:'assets/images/atlas/section-icons/food.png', className:'series-food' },
  '人物': { icon:'🧑‍🌾', iconSrc:'assets/images/atlas/section-icons/people.png', className:'series-people' },
};
const GALLERY_DECORATIONS = {
  book: 'assets/images/gallery/bird-panel/collection-book.png',
  fox: 'assets/images/gallery/gallery_fox_flowers.png',
  field: 'assets/images/gallery/gallery_field_flowers.png',
  coralLeft: 'assets/images/gallery/gallery_coral_left.png',
  coralRight: 'assets/images/gallery/gallery_coral_right.png',
};
const GALLERY_BIRD_PANEL_ASSETS = {
  lock: 'assets/images/gallery/bird-panel/lock-icon.png',
  starEmpty: 'assets/images/gallery/bird-panel/star-empty.png',
  starFilled: 'assets/images/gallery/bird-panel/star-filled.png',
  silhouette: 'assets/images/gallery/bird-panel/bird-locked-silhouette.png',
  category: 'assets/images/categories/birds.png',
};
const ATLAS_CATEGORIES = [
  { id:'all',        label:'全部',   series:'全部',   type:'icon',  icon:'globe' },
  { id:'mammals',    label:'哺乳類', series:'哺乳類', type:'image', src:'assets/images/categories/mammals.png' },
  { id:'birds',      label:'鳥類',   series:'鳥類',   type:'image', src:'assets/images/categories/birds.png' },
  { id:'fish',       label:'魚類',   series:'魚類',   type:'image', src:'assets/images/categories/fish.png' },
  { id:'frogs',      label:'蛙類',   series:'蛙類',   type:'image', src:'assets/images/categories/frogs.png' },
  { id:'insects',    label:'蟲類',   series:'昆蟲',   type:'image', src:'assets/images/categories/insects.png' },
  { id:'vegetables', label:'蔬菜',   series:'蔬菜類', type:'image', src:'assets/images/categories/vegetables.png' },
  { id:'fruits',     label:'水果',   series:'水果類', type:'image', src:'assets/images/categories/fruits.png' },
  { id:'flowers',    label:'花卉',   series:'花類',   type:'image', src:'assets/images/categories/flowers.png' },
  { id:'trees',      label:'樹木',   series:'樹類',   type:'image', src:'assets/images/categories/trees.png' },
  { id:'food',       label:'食物',   series:'美食類', type:'image', src:'assets/images/categories/food.png' },
  { id:'people',     label:'人物',   series:'人物',   type:'image', src:'assets/images/categories/people.png' },
];
const ATLAS_GLOBE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18"></path></svg>';
let currentGalleryTab = '全部';

function renderAtlasCategoryTabs() {
  const host = document.getElementById('galleryTabs');
  if (!host) return;
  host.innerHTML = ATLAS_CATEGORIES.map(category => {
    const active = currentGalleryTab === category.series;
    const visual = category.type === 'image'
      ? `<img class="gallery-tab-card-image" src="${category.src}" alt="" aria-hidden="true"><span class="gallery-tab-sr-label">${category.label}</span>`
      : `<span class="gallery-tab-icon" aria-hidden="true">${ATLAS_GLOBE_ICON}</span><span class="gallery-tab-label">${category.label}</span>`;
    return `<button class="gallery-tab${category.type === 'image' ? ' gallery-tab-image-card' : ''}${active ? ' active' : ''}" type="button" role="tab" aria-label="${category.label}" aria-selected="${active}" data-category-id="${category.id}" data-series="${category.series}" onclick="switchGalleryTab(this)">${visual}</button>`;
  }).join('');
}

renderAtlasCategoryTabs();

function updateAtlasCategoryScrollHint() {
  const scroller = document.getElementById('galleryTabs');
  const hint = document.getElementById('galleryTabsScrollHint');
  if (!scroller || !hint) return;
  const canScrollRight = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 3;
  hint.classList.toggle('is-hidden', !canScrollRight);
}

const atlasCategoryScroller = document.getElementById('galleryTabs');
if (atlasCategoryScroller) {
  atlasCategoryScroller.addEventListener('scroll', updateAtlasCategoryScrollHint, { passive: true });
  window.addEventListener('resize', updateAtlasCategoryScrollHint, { passive: true });
  requestAnimationFrame(updateAtlasCategoryScrollHint);
}

const atlasStorage = typeof accountStorage !== 'undefined' ? accountStorage : window.localStorage;
let gallery = JSON.parse(atlasStorage.getItem('skysef_gallery') || '[]');

function switchGalleryTab(btn) {
  currentGalleryTab = btn.dataset.series;
  document.querySelectorAll('#galleryTabs .gallery-tab').forEach(b => {
    const active = b === btn;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', String(active));
  });
  renderGallery();
  requestAnimationFrame(() => {
    const scroller = document.getElementById('galleryTabs');
    if (!scroller) return;
    const buttonRect = btn.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const clipped = buttonRect.left < scrollerRect.left + 4 || buttonRect.right > scrollerRect.right - 4;
    if (clipped) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
}

function findCatalogItem(entry) {
  if (!entry) return null;
  return TINY_GALLERY_CATALOG.find(item => item.id === entry.id || item.name === String(entry.name || '').trim()) || null;
}

function saveGachaReward(char) {
  const item = findCatalogItem(char);
  if (!item) return false;
  if (gallery.some(entry => findCatalogItem(entry)?.id === item.id)) return true;
  const next = [...gallery, { id:item.id, name:item.name, series:item.category, category:item.category, rarity:item.rarity, img:item.img }];
  try { atlasStorage.setItem('skysef_gallery', JSON.stringify(next)); }
  catch (error) { alert('收藏無法儲存，請釋放瀏覽器儲存空間後重試。'); return false; }
  gallery = next;
  renderGallery();
  return true;
}

function addToGallery() {
  if (window._lastGachaChar && !saveGachaReward(window._lastGachaChar)) return;
  renderGallery();
  closeGachaModal();
  switchView('viewGallery');
}

function _rarityStars(n, color) {
  return Array.from({length:5}, (_,i) =>
    `<svg width="10" height="10" viewBox="0 0 24 24" fill="${i<n?color:'rgba(255,255,255,0.15)'}"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`
  ).join('');
}

function renderAtlasRarityStars(rarity = 0) {
  const safeRarity = Math.max(0, Math.min(5, Number(rarity) || 0));
  return Array.from({length:5}, (_, index) => {
    const filled = index < safeRarity;
    const src = filled ? GALLERY_BIRD_PANEL_ASSETS.starFilled : GALLERY_BIRD_PANEL_ASSETS.starEmpty;
    return `<img src="${src}" alt="" aria-hidden="true">`;
  }).join('');
}

function renderEncyclopediaCard({ item, locked = true, rarity = 0, silhouette = '', preview = false }) {
  const safeRarity = locked ? 0 : Math.max(1, Math.min(5, Number(rarity) || 1));
  const name = locked ? '???' : item.name;
  const imageArea = locked
    ? `${silhouette ? `<img class="gallery-card-silhouette" src="${encodeURI(silhouette)}" alt="" aria-hidden="true">` : ''}
       <div class="gallery-lock" aria-label="尚未解鎖"><img class="gallery-lock-image" src="${GALLERY_BIRD_PANEL_ASSETS.lock}" alt=""></div>`
    : `<img class="gallery-card-object" src="${encodeURI(item.img)}" alt="${name}">`;

  return `<div class="gallery-item encyclopedia-card ${locked ? 'locked is-locked' : 'collected is-unlocked'}" data-rarity="${safeRarity}"${preview ? ' data-preview-card="true"' : ''}>
    <div class="gallery-item-art card-image-area">${imageArea}</div>
    <div class="gallery-item-name card-name">${name}</div>
    <div class="gallery-stars gallery-image-stars card-rarity" aria-label="${locked ? '尚未解鎖' : `${safeRarity} 星稀有度`}">${renderAtlasRarityStars(safeRarity)}</div>
  </div>`;
}

const BIRD_CARD_PREVIEW = [
  { locked: true, rarity: 0 },
  { locked: false, rarity: 1, name: '台灣小灣嘴' },
  { locked: false, rarity: 3, name: '台灣朱雀' },
  { locked: false, rarity: 5, name: '帝雉' },
];

function renderBirdCardPreview(items) {
  const byName = new Map(items.map(item => [item.name, item]));
  return items.map((item, index) => {
    const demo = BIRD_CARD_PREVIEW[index];
    if (!demo) {
      return renderEncyclopediaCard({ item, locked: true, silhouette: GALLERY_BIRD_PANEL_ASSETS.silhouette, preview: true });
    }
    const demoItem = demo.name ? byName.get(demo.name) || item : item;
    return renderEncyclopediaCard({
      item: demoItem,
      locked: demo.locked,
      rarity: demo.rarity,
      silhouette: GALLERY_BIRD_PANEL_ASSETS.silhouette,
      preview: true,
    });
  }).join('');
}

function renderGalleryItem(item, collected, category) {
  return renderEncyclopediaCard({
    item,
    locked: !collected,
    rarity: item.rarity || 5,
    silhouette: '',
  });
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const summary = document.getElementById('gallerySummary');
  const mainPanel = document.querySelector('#viewGallery .gallery-main-panel');
  if (mainPanel) mainPanel.classList.toggle('bird-panel-active', currentGalleryTab === '鳥類');
  const catalogNames = new Set(TINY_GALLERY_CATALOG.map(item => item.name));
  const collectedNames = new Set(gallery.map(findCatalogItem).filter(Boolean).map(item => item.name).filter(name => catalogNames.has(name)));
  const total = TINY_GALLERY_CATALOG.length;
  const collected = collectedNames.size;

  const count = document.getElementById('galleryCount');
  if (count) count.innerText = `${collected}/${total}`;
  const countFarmer = document.getElementById('galleryCountFarmer');
  if (countFarmer) countFarmer.innerText = `${collected}/${total} 個`;
  const galleryCoinCount = document.getElementById('galleryCoinCount');
  const ticketBadge = document.getElementById('ticketBadge');
  if (galleryCoinCount) galleryCoinCount.textContent = ticketBadge ? ticketBadge.textContent : '0';

  const pct = total > 0 ? Math.round(collected / total * 100) : 0;
  if (summary) {
    summary.innerHTML = `<div class="gallery-summary">
      <div class="gallery-summary-book" aria-hidden="true"><img src="${GALLERY_DECORATIONS.book}" alt=""></div>
      <div class="gallery-summary-content">
        <div class="gallery-summary-stats">
          <div class="gallery-summary-main">
            <div class="gallery-summary-label">收藏總數</div>
            <div class="gallery-progress-frac">${collected} <small>/ ${total}</small></div>
          </div>
          <div class="gallery-summary-achievement">
            <div class="gallery-summary-label">成就</div>
            <div class="gallery-achievement-value">${pct}%</div>
          </div>
        </div>
        <div class="gallery-progress-bar"><div class="gallery-progress-fill" style="width:${pct}%"></div></div>
      </div>
    </div>`;
  }

  let html = '';
  const seriesToShow = currentGalleryTab === '全部' ? GALLERY_CATEGORY_ORDER : [currentGalleryTab];

  for (const [sectionIndex, s] of seriesToShow.entries()) {
    const chars = TINY_GALLERY_CATALOG.filter(item => item.category === s);
    if (chars.length === 0) continue;
    const ui = GALLERY_CATEGORY_UI[s] || { icon:'🌱', className:'series-trees' };
    const seriesCollected = chars.filter(c => collectedNames.has(c.name)).length;
    const sectionIcon = ui.iconSrc
      ? `<span class="gallery-series-icon gallery-series-subject-icon" aria-hidden="true"><img src="${ui.iconSrc}" alt=""></span>`
      : `<span class="gallery-series-icon" aria-hidden="true">${ui.icon}</span>`;
    html += `<section class="gallery-series-section ${ui.className}">
      <div class="gallery-series-banner">
        <div class="gallery-series-banner-left">${sectionIcon}<span>${s}</span></div>
        <div class="gallery-series-banner-right">${seriesCollected}/${chars.length}</div>
      </div>
      <div class="gallery-series-items">
        ${chars.map(c => renderGalleryItem(c, collectedNames.has(c.name), s)).join('')}
      </div>
    </section>`;
  }

  if (!html.includes('gallery-series-section')) {
    html = '<div class="gallery-empty">此系列尚無角色資料。</div>';
  }
  grid.innerHTML = html;
}
