import view from './view.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    // console.log(this._data);
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    //page 1 and are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtnForward(curPage);
    }

    //last page
    if (curPage === numPages) {
      return this._generateMarkupBtnBackward(curPage);
    }
    //other page
    if (curPage < numPages) {
      return `
        ${this._generateMarkupBtnBackward(curPage)};
        ${this._generateMarkupBtnForward(curPage)};
        `;
    }
    //page 1 and there are no other pages
    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      //   console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkupBtnForward(curPage) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button>
    `;
  }
  _generateMarkupBtnBackward(curPage) {
    return `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
    </button>
    `;
  }
}
export default new paginationView();
