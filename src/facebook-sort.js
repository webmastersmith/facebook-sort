import { sleep, getItems } from './utils';
import { createForm, createStyleSheet } from './elements';

// notes: add style="display: none", then add price, location as attributes to div.
// element.style.display = "none"
// setAttribute(name, value)

(async function () {
  // create form.
  const head = createStyleSheet();
  if (!head) throw new Error('Could not attach style sheet.');
  // Create form and content
  const { form, searchInput, checkboxFilter, removeInput, btn } = createForm(start);
  if (!form) throw new Error('Could not create form.');
  let container;

  // only run on facebook market.
  // let marketplaceSearchHasLoaded = false;
  const marketplaceRegex = /facebook\.com\/marketplace/i;
  if (marketplaceRegex.test(location.href)) {
    // Get container element. -flex container with all search results.
    container = document.querySelector('div[role="main"] div[style^="max-width"] > div:last-of-type');
    if (!container) throw new Error('Could not get container div.');

    let searchTermsDiv;
    searchTermsDiv = document.querySelector(
      'div[role="navigation"][aria-label="Marketplace sidebar"] > div > div:nth-of-type(2)'
    );
    // Insert Form
    searchTermsDiv.after(form);

    // make sure marketplace page is search.
    const marketplaceSearchRegex = /facebook\.com\/marketplace\/.*\/search.?\?query/i;
    const observer = new MutationObserver(function (mutations) {
      console.log('mutation observer ran');
      if (marketplaceSearchRegex.test(location.href)) {
        const isOnPage = document.getElementById('facebook-sort-form-id');
        console.log('isOnPage', isOnPage);
        if (!isOnPage) {
          searchTermsDiv = document.querySelector(
            'div[role="navigation"][aria-label="Marketplace sidebar"] > div > div:nth-of-type(2)'
          );
          searchTermsDiv.after(form);
          console.log('attached form to page');
        }
        form.style.display = 'flex';
        // marketplaceSearchHasLoaded = true;
        console.log(`Search Page Found ${location.href}`);
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

    // custom
    const desiredItems = +searchInput?.value || 100; // returns empty string if no value.
    const isFilter = checkboxFilter?.checked ?? true; // only true if null/undefined.
    const removeList = removeInput?.value?.split(',') ?? []; // only if null/undefined.
    // console.log('desiredItems, isFilter, removeList', desiredItems, isFilter, removeList);
    try {
      // count for removing els already in array.

      // loop until desired items reached.
      let count = 0;
      while (
        document.querySelectorAll('div[role="main"] div[style^="max-width"][style*="min-width"]').length <
        desiredItems
      ) {
        console.log(
          'Total Child Items:',
          document.querySelectorAll('div[role="main"] div[style^="max-width"][style*="min-width"]').length
        );
        // prevent run-away script.
        if (count > 30) return;
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

      // add attributes to child elements. - nothing is returned.
      const childArr = [...container.childNodes];
      getItems(childArr, searchTerms, removeList, isFilter);

      // sort least to great
      childArr.sort((a, b) => +a.dataset.price - +b.dataset.price);
      // console.log(items);
      container.replaceChildren(...childArr);
      // scroll to top of window
      window.scrollTo(0, 0);
      // console.log('Total Items:', container.childNodes.length);
      canStart = true;
    } catch (error) {
      console.error(error);
      return;
    }
  }
})();
