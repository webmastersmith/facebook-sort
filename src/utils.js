export function getItems(slicedItems, searchTerms, removeList = [], isFilter = true) {
  // Get properties of item.
  for (const itemContainer of slicedItems) {
    // check if advertisement or actual listing
    const isListings = itemContainer.querySelector('a[href*="/marketplace/item"] > div > div:last-of-type');
    if (!isListings) {
      itemContainer.style.opacity = '0';
      itemContainer.setAttribute('data-price', 'Infinity'); // el.dataset.price
      itemContainer.setAttribute('data-reason', 'Not a listing'); // el.dataset.price
      continue;
    }
    // valid listings below here.
    // ID
    itemContainer.setAttribute(
      'data-id',
      itemContainer
        .querySelector('a[href*="/marketplace/item"]')
        .getAttribute('href')
        ?.split('/')[3]
        ?.trim() || ''
    );

    // get data from inner three div items.
    const dataItems = isListings.childNodes;
    // console.log('dataItems', dataItems.length);
    let price = parseInt(dataItems[0]?.innerText?.trim().replaceAll(/\$|,/g, ''));
    if (Number.isNaN(price)) price = '0';
    itemContainer.setAttribute('data-price', `${price}`); // el.dataset.price
    const title = dataItems[1]?.innerText?.trim() || '';
    const location = dataItems[2]?.innerText?.trim() || '';
    const searchText = `${title} ${location}`;
    itemContainer.setAttribute('data-search-text', searchText); // el.dataset.searchText
    itemContainer.style.display = 'flex';
    // Check if filter box is checked, searchTerms exist and every searchTerms matched.
    if (isFilter && searchTerms[0] && !isTitle(searchTerms, searchText)) itemContainer.style.display = 'none';
    // console.log('past dedupe');
    // remove any matching from removeList. -Some must match to remove listing.
    if (removeList[0] && isTitle(removeList, searchText, true)) itemContainer.style.display = 'none';
    // console.log('removeList', removeList);
  }
}

// wait
export async function wait() {
  return new Promise((res, rej) => {
    window.requestIdleCallback(
      () => {
        res();
      },
      { timeout: 5000 }
    );
  });
}

// Click link to get description
function getDescription(el) {
  // click link.
  el.click();
  // get description
  const description = document.querySelector('ul + div span:first-child[dir="auto"]')?.innerText;
}

// sleep
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} //returns undefined

// filter -if all match, keep listing.
function isTitle(terms, text, some = false) {
  const lowerText = text.toLowerCase();
  return some
    ? terms.some((word) => lowerText.includes(word.toLowerCase())) // if one match. -remove listing
    : terms.every((word) => lowerText.includes(word.toLowerCase())); // if all match. -keep listing
}
