import { sleep, getItems } from './utils';
import { createForm, createStyleSheet } from './elements';

// notes: add style="display: none", then add price, location as attributes to div.
// element.style.display = "none"
// setAttribute(name, value)

(async function () {
  // only run on facebook market.
  // file is for local development.
  if (/facebook\.com\/marketplace\/.*\/search.?\?query/i.test(location.href)) {
    // create the VIEW.
    const head = createStyleSheet();
    if (!head) throw new Error('Could not attach style sheet.');
    // Create form and content
    const { form, searchInput, checkboxFilter, removeInput, btn } = createForm(start);
    if (!form) throw new Error('Could not create form.');
    // Get container element. -flex container with all search results.

    const container = document.querySelector('div[role="main"] div[style^="max-width"] > div:last-of-type');
    // const parent = document.querySelector('div[id*=skipLinkTargetForMainSearchResults] + span > div');
    if (!container) throw new Error('Could not get container div.');
    // Insert Form
    const searchTermsDiv = document.querySelector(
      'div[role="navigation"][aria-label="Marketplace sidebar"] > div > div:nth-of-type(2)'
    );
    searchTermsDiv.after(form);

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
  }
})();
