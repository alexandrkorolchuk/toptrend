if (!customElements.get('share-button')) {
    customElements.define('share-button', class ShareButton extends DetailsDisclosure {
        constructor() {
            super();

            this.elements = {
                shareButton: this.querySelector('button'),
                shareSummary: this.querySelector('summary'),
                closeButton: this.querySelector('.share-button__close'),
                successMessage: this.querySelector('[id^="ShareMessage"]'),
                urlInput: this.querySelector('input')
            }
            this.urlToShare = this.elements.urlInput ? this.elements.urlInput.value : document.location.href;

            if (navigator.share) {
                this.mainDetailsToggle.setAttribute('hidden', '');
                this.elements.shareButton.classList.remove('hidden');
                this.elements.shareButton.addEventListener('click', () => {
                    navigator.share({url: this.urlToShare, title: document.title})
                });
            } else {
                this.mainDetailsToggle.addEventListener('toggle', this.toggleDetails.bind(this));
                this.mainDetailsToggle.querySelector('.share-button__copy').addEventListener('click', this.copyToClipboard.bind(this));
                this.mainDetailsToggle.querySelector('.share-button__close').addEventListener('click', this.close.bind(this));
            }
        }

        toggleDetails() {
            if (!this.mainDetailsToggle.open) {
                this.elements.successMessage.classList.add('hidden');
                this.elements.successMessage.textContent = '';
                this.elements.closeButton.classList.add('hidden');
                this.elements.shareSummary.focus();
            }
        }

        copyToClipboard() {
            navigator.clipboard.writeText(this.elements.urlInput.value).then(() => {
                this.elements.successMessage.classList.remove('hidden');
                this.elements.successMessage.textContent = window.accessibilityStrings.shareSuccess;
                this.elements.closeButton.classList.remove('hidden');
                this.elements.closeButton.focus();
            });
        }

        updateUrl(url) {
            this.urlToShare = url;
            this.elements.urlInput.value = url;
        }
    });
}


$('.js-input-blog-search').on('input focus', function () {
    var $field = $(this), $parent = $field.closest('.input-search'), $result = $parent.find('.input-search__result'),
        $list = $parent.find('.input-search__list'), $empty = $parent.find('.input-search__empty'),
        value = $field.val(), count = value.length;
    var resultListTpl = '';
    if (value.length > 0) {
        $(this).addClass('filed');// $parent.addClass('show');
        $result.addClass('show');
        if (typeof searchArray !== 'undefined' && searchArray.length > 0) {
            searchArray.map(function (item) {
                var str = item.text.toLowerCase(), srtResult = '', posStart = -1;
                posStart = str.indexOf(value.toLowerCase(), posStart + 1);
                srtResult += '<span class="search-result__content">' + '<span class="search-result__name search-result__name-blog">' + item.text.substr(0, posStart) + item.text.substr(posStart, count) + item.text.substr(posStart + count) + '</span>';
                if (item.tags !== '') {
                    srtResult += '<span class="search-result__tags">' + item.tags + '</span>'
                }
                srtResult += '</span>' + '</span>';
                if (~str.indexOf(value.toLowerCase())) {
                    if (item.url !== '') {
                        resultListTpl += '<li class="blog-search__item">' + '<a class="search-result__item" href="' + item.url + '">' + srtResult + '</a></li>'
                    } else {
                        resultListTpl += '<li class="blog-search__item"><span class="search-result__item">' + srtResult + '</span></li>'
                    }
                }
            });
            $list.html('').append('<ul>' + resultListTpl + '</ul>');
            if (resultListTpl !== '') {
                $list.show();
                $empty.hide()
            } else {
                $list.hide();
                $empty.show()
            }
        } else {
            $list.hide();
            $empty.show()
        }
    } else {
        $(this).removeClass('filed');// $parent.removeClass('show');
        $result.removeClass('show');
        $list.text('').hide();
        $list.hide();
        $empty.hide()
    }
});
