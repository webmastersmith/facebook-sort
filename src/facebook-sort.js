import { sleep, getItems } from './utils';
import { createForm, createStyleSheet } from './elements';

(async function () {
  // create form.
  const head = createStyleSheet();
  if (!head) throw new Error('Could not attach style sheet.');
  // Create form and content
  const { form, searchInput, checkboxFilter, removeInput, btn } = createForm(start);
  if (!form) throw new Error('Could not create form.');

  // only run on facebook market.
  // let marketplaceSearchHasLoaded = false;
  const marketplaceRegex = /facebook\.com\/marketplace/i;
  if (marketplaceRegex.test(location.href)) {
    let searchTermsDiv = document.querySelector(
      'div[role="navigation"][aria-label="Marketplace sidebar"] > div > div:nth-of-type(2)'
    );

    // make sure marketplace page is search.
    const marketplaceSearchRegex = /facebook\.com\/marketplace\/.*\/search.?\?query/i;
    const observer = new MutationObserver(function (mutations) {
      // console.log('mutation observer ran');
      if (marketplaceSearchRegex.test(location.href)) {
        const isOnPage = document.getElementById('facebook-sort-form-id');
        // console.log('isOnPage', isOnPage);
        if (!isOnPage) {
          searchTermsDiv = document.querySelector(
            'div[role="navigation"][aria-label="Marketplace sidebar"] > div > div:nth-of-type(2)'
          );
          searchTermsDiv.after(form);
          // console.log('attached form to page');
        }
        form.style.display = 'flex';
        // marketplaceSearchHasLoaded = true;
        // console.log(`Search Page Found ${location.href}`);
      } else {
        form.style.display = 'none';
        // marketplaceSearchHasLoaded = false;
        // console.log('marketplace page found', location.href);
      }
    });
    const config = { subtree: true, childList: true };
    observer.observe(document, config);
  }

  // turn off div(button) once pressed.
  let canStart = true;
  // Start Scrape
  async function start() {
    // disable function till finished running.
    if (!canStart) return;
    canStart = false;
    const root = document.querySelector(':root');
    root.style.setProperty('--facebook-sort-btn-background', '#E0E0E0');
    root.style.setProperty('--facebook-sort-btn-background-hover', '#E0E0E0');
    root.style.setProperty('--facebook-sort-btn-shadow', '#E0E0E0');
    btn.style.cursor = 'wait';

    // custom

    let desiredItems = +searchInput?.value || 100; // returns empty string if no value.
    if (desiredItems > 500) desiredItems = 500;
    const isFilter = checkboxFilter?.checked ?? true; // only true if null/undefined.
    const removeList = removeInput?.value?.split(',') ?? []; // only if null/undefined.
    // console.log('desiredItems, isFilter, removeList', desiredItems, isFilter, removeList);
    try {
      // count for removing els already in array.

      let count = 0;
      while (
        document.querySelectorAll('a[href*="/marketplace/item"] > div > div:last-of-type').length <
        desiredItems
      ) {
        console.log(
          'Total Child Items:',
          document.querySelectorAll('a[href*="/marketplace/item"] > div > div:last-of-type').length
        );
        // prevent run-away script.
        if (count > 20) break;
        count++;
        // scroll to bottom of screen to load more.
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        console.log('waiting for new items to load...');
        await sleep(1500);
      }

      // SearchTerms
      const searchTerms =
        document
          .querySelector('div[role="navigation"] input[aria-label="Search Marketplace"]')
          ?.value?.trim()
          ?.split(' ') ?? [];

      // returns array of childNodes. Sometimes it's split into two or more divs.
      const parentContainerDiv = document.querySelector(
        'div[role="main"] div[style^="max-width"]'
      ).parentElement;
      const parentContainerChildren = parentContainerDiv.childNodes;
      for (const parentEl of parentContainerChildren) {
        // loop until desired items reached.
        const container = parentEl.querySelector('div[style^="max-width"] > div:last-of-type');
        const childArr = [...container.childNodes];
        getItems(childArr, searchTerms, removeList, isFilter);
        // sort least to great
        childArr.sort((a, b) => +a.dataset.price - +b.dataset.price);
        // console.log(items);
        container.replaceChildren(...childArr);
      }

      // scroll to top of window
      window.scrollTo(0, 0);
      // console.log('Total Items:', container.childNodes.length);
      canStart = true;
      root.style.setProperty('--facebook-sort-btn-background', '#075ad3');
      root.style.setProperty('--facebook-sort-btn-background-hover', '#03399e');
      root.style.setProperty('--facebook-sort-btn-shadow', '#4892e0');
      btn.style.cursor = 'pointer';
    } catch (error) {
      console.error(error);
      return;
    }
  }
})();
