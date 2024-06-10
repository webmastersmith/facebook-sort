// VIEW -------------------------------------------------------------------------
export function finalResultEl(count) {
  const totalResultsEl = document.createElement('div');
  totalResultsEl.style.marginBottom = '2rem';
  const totalResultsP = document.createElement('p');
  totalResultsP.innerText = `Total Items: ${count}`;
  totalResultsP.className = 'filterResults';
  totalResultsEl.appendChild(totalResultsP);
  return totalResultsEl;
}
// Display the page currently loading.
export function loopText() {
  try {
    const loadingPageWrapper = document.createElement('div');
    loadingPageWrapper.id = 'facebook-sort-loading-wrapper';
    const loadingPageEl = document.createElement('p');
    loadingPageEl.className = 'filterResults';
    loadingPageWrapper.appendChild(loadingPageEl);
    // spinner
    const ring = document.createElement('div');
    ring.className = 'facebook-sort-lds-ring';
    const ringSegment1 = document.createElement('div');
    const ringSegment2 = document.createElement('div');
    const ringSegment3 = document.createElement('div');
    const ringSegment4 = document.createElement('div');
    ring.appendChild(ringSegment1);
    ring.appendChild(ringSegment2);
    ring.appendChild(ringSegment3);
    ring.appendChild(ringSegment4);
    loadingPageWrapper.appendChild(ring);
    return { loadingPageEl, loadingPageWrapper };
  } catch (e) {
    console.log(e);
  }
}

export function createForm(facebookFilterSort) {
  try {
    const form = document.createElement('form');
    form.id = 'facebook-sort-form-id';
    form.style = 'margin-bottom: 2rem; background-color: white;';
    // contentDiv wraps Facebook Sort and wrapper
    const allContentDiv = document.createElement('div');
    allContentDiv.className = 'all-content-wrapper';

    // Facebook Sort Text
    const facebookSortPar = document.createElement('p');
    facebookSortPar.className = 'facebook-sort-name';
    facebookSortPar.innerText = 'Facebook Sort';
    allContentDiv.appendChild(facebookSortPar);

    // Container Div. Wrap everything not FacebookSort paragraph.
    const containerDiv = document.createElement('div');
    containerDiv.className = 'facebook-sort-search-btn-wrapper';

    // wrap both inputs.
    const inputContainerDiv = document.createElement('div');
    inputContainerDiv.className = 'facebook-sort-input-container';
    // append to containerDiv
    containerDiv.append(inputContainerDiv);

    // search input div
    const searchDiv = document.createElement('div');
    searchDiv.className = 'facebook-sort-search-page-div';
    // search pages input label
    const searchInputLabel = document.createElement('label');
    searchInputLabel.htmlFor = 'facebook-sort-search-page-input-id';
    searchInputLabel.className = 'labelBox facebook-sort-search-page-label';
    searchInputLabel.innerText = 'SEARCH ITEMS';
    // search pages input
    const searchInput = document.createElement('input');
    searchInput.id = 'facebook-sort-search-page-input-id';
    searchInput.className = 'inputBox facebook-sort-search-page-input';
    searchInput.type = 'number';
    searchInput.placeholder = '100';
    searchInput.min = '25';
    searchInput.max = '999';
    searchInput.step = '25';
    // add search page to form
    searchDiv.appendChild(searchInputLabel);
    searchDiv.appendChild(searchInput);

    // remove pages div
    const removeDiv = document.createElement('div');
    removeDiv.className = 'facebook-sort-search-page-div';
    // search pages input label
    const removeInputLabel = document.createElement('label');
    removeInputLabel.htmlFor = 'facebook-sort-remove-input-id';
    removeInputLabel.className = 'labelBox facebook-sort-search-page-label';
    removeInputLabel.innerText = 'REMOVE LIST';
    // search pages input
    const removeInput = document.createElement('input');
    removeInput.id = 'facebook-sort-remove-input-id';
    removeInput.className = 'inputBox facebook-sort-remove-input';
    removeInput.type = 'text';
    removeInput.placeholder = 'comma separated list';
    // add Input and label to removeDiv
    removeDiv.appendChild(removeInputLabel);
    removeDiv.appendChild(removeInput);

    // append to container.
    inputContainerDiv.appendChild(searchDiv);
    inputContainerDiv.appendChild(removeDiv);

    // checkbox & button div
    const checkboxBtnDiv = document.createElement('div');
    checkboxBtnDiv.id = 'facebook-sort-checkbox-btn-id';
    // checkbox filter div
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'facebook-sort-checkbox-div';
    // checkbox filter
    const checkboxFilter = document.createElement('input');
    checkboxFilter.id = 'facebook-sort-checkbox-id';
    checkboxFilter.className = 'facebook-sort-checkbox';
    checkboxFilter.type = 'checkbox';
    checkboxFilter.checked = true;
    // checkbox filter label
    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'facebook-sort-checkbox-id';
    checkboxLabel.className = 'facebook-sort-checkbox-label';
    checkboxLabel.innerText = 'FILTER TITLE?';
    // build checkbox
    checkboxDiv.appendChild(checkboxFilter);
    checkboxDiv.appendChild(checkboxLabel);
    checkboxBtnDiv.appendChild(checkboxDiv);

    // btn
    // facebook trickery. had to make div because if 'button' clicked, they reload page.
    const btn = document.createElement('div');
    btn.id = 'facebook-sort-btn-id';
    btn.className = 'facebook-sort-btn';
    btn.onclick = facebookFilterSort;
    btn.role = 'button';
    btn.type = 'submit';
    btn.innerText = 'GO!';
    // add btn to div
    checkboxBtnDiv.appendChild(btn);
    // add checkbox & button div to form
    containerDiv.appendChild(checkboxBtnDiv);

    // Finish up
    allContentDiv.appendChild(containerDiv);
    // create watermark
    const webmastersmith = document.createElement('p');
    webmastersmith.className = 'facebook-sort-signature';
    webmastersmith.innerText = 'webmastersmith';

    allContentDiv.appendChild(webmastersmith);
    form.appendChild(allContentDiv);

    return { form, checkboxFilter, searchInput, btn, removeInput };
  } catch (e) {
    console.log('Could not create the form', e);
  }
}

export function createStyleSheet() {
  try {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    head.appendChild(style);
    const textColor = '#03399e';
    const css = `
      :root {
        --facebook-sort-btn-background: #075ad3;
        --facebook-sort-btn-background-hover: #03399e;
        --facebook-sort-btn-shadow: #4892e0;
      }
      /* form -display: none is changed to 'flex' once correct page loads.*/
      #facebook-sort-form-id {
        display: none;
        justify-content: center !important;
        align-items: center !important;
        padding-bottom: 1rem !important;
        gap: 1.5rem !important;
        width: 100% !important;
        padding-top: 1rem !important;
        border: solid 1px rgba(0, 0, 0, 0.3) !important;
        border-radius: 5px !important;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
      }
      /* form div container */ 
      .all-content-wrapper {
        position: relative !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        padding-bottom: 0.5rem !important;
      }
      /* title div */
      .facebook-sort-name {
        font-size: 3rem !important;
        color: var(--facebook-sort-btn-background-hover) !important;
        font-weight: bold !important;
        padding: 0 !important;
        margin: 0 !important;
        margin-bottom: 1rem !important;
      }
      /* div around inputs and btn container div */
      .facebook-sort-search-btn-wrapper {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 1.5rem !important;
      }
      /* all input container */
      .facebook-sort-input-container {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 1.5rem !important;
      }

      /* div around search input and label */
      .facebook-sort-search-page-div {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 0.5rem !important;
      }
      
      /* all inputs */
      .inputBox {
        width: 90% !important;
        min-height: 2.6rem !important;
        color: var(--facebook-sort-btn-background) !important;
      }
      .labelBox {
        font-weight: bold !important;
      }
      
      /* search input */
      .facebook-sort-search-page-input { 
        font-size: 2rem !important;
        max-width: 140px !important;
        text-align: center !important;
      }
      
      /* remove input */
      .facebook-sort-remove-input {
        font-size: 1.2rem !important;
        text-align: start !important;

      }
      
      /* input label*/
      .facebook-sort-search-page-label {    }
      
      /* Checkbox & Button */
      #facebook-sort-checkbox-btn-id {
      }
      /* Checkbox */
      .facebook-sort-checkbox-div {
        margin-bottom: 4px !important;
        display: flex !important;
        gap: 0.5rem !important;
      }
      .facebook-sort-checkbox {
      }
      .facebook-sort-checkbox-label {
        font-weight: bold !important;
      }
      /* Button */
      .facebook-sort-btn {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        font-size: 24px !important;
        text-align: center !important;
        width: 175px !important;
        height: 40px !important;
        cursor: pointer !important;
        outline: none !important;
        color: #fff !important;
        background-color: var(--facebook-sort-btn-background) !important;
        border: none !important;
        border-radius: 15px !important;
        box-shadow: 0 9px var(--facebook-sort-btn-shadow) !important;
      }
      .facebook-sort-btn:hover {
        background-color: var(--facebook-sort-btn-background-hover) !important;
        box-shadow: 0 9px var(--facebook-sort-btn-background) !important;
      }
      .facebook-sort-btn:active {
        background-color: var(--facebook-sort-btn-background-hover) !important;
        box-shadow: 0 5px var() !important;
        transform: translateY(4px) !important;
      }
  
      /* Start Loading Pages */
      #facebook-sort-loading-wrapper {
        position: relative !important;
        margin-top: 0.5rem !important;
        margin-bottom: 2rem !important;
      }
      .filterResults {
        display: inline !important;
        font-size: 3rem !important;
        color: var(--facebook-sort-btn-background-hover) !important;
        font-weight: bold !important;
        margin: 3rem 0 !important;
      }
      .facebook-sort-lds-ring {
        display: inline !important;
        position: absolute !important;
        top: -15px !important;
        left: 505px !important;
        width: 60px !important;
        height: 60px !important;
      }
      .facebook-sort-lds-ring div {
        box-sizing: border-box !important;
        display: block !important;
        position: absolute !important;
        width: 40px !important;
        height: 40px !important;
        margin: 8px !important;
        border: 8px solid var(--facebook-sort-btn-background-hover) !important;
        border-radius: 50% !important;
        animation: facebook-sort-lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite !important;
        border-color: var(--facebook-sort-btn-background-hover) transparent transparent transparent !important;
      }
      .facebook-sort-lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .facebook-sort-lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .facebook-sort-lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes facebook-sort-lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .facebook-sort-signature {
        position: absolute !important;
        bottom: -1rem !important;
        color: rgba(0, 0, 0, 0.2) !important;
        margin: 0 !important;
      }
          `;
    style.appendChild(document.createTextNode(css));
    return head;
  } catch (e) {
    console.log(e);
    return null;
  }
}
