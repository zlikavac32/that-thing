(function ($, undefined) {
    $.fn.fit = function (widthToFitTo) {
        var fit = function fit(element) {
            var clone = element.clone();

            $('body').append(
                clone
                    .css('display', 'inline-block')
                    .css('white-space', 'nowrap')
                    .css('visibility', 'hidden')
            );

            var fontSize = parseInt(clone.css('font-size'), 10);
            var currentWidth = clone.width();
            var lower, upper;

            //determine boundaries
            if (currentWidth > widthToFitTo) {
                upper = fontSize;
                while (currentWidth > widthToFitTo) {
                    fontSize /= 2;
                    currentWidth = clone
                        .css('font-size', fontSize)
                        .width();
                }
                lower = fontSize;
            } else {
                lower = fontSize;
                while (currentWidth < widthToFitTo) {
                    fontSize *= 2;
                    currentWidth = clone
                        .css('font-size', fontSize)
                        .width();
                }
                upper = fontSize;
            }

            var previousMiddle = -1;
            var middle = 0;

            while (Math.abs(previousMiddle - middle) > 1e-6) {
                previousMiddle = middle;
                middle = (upper + lower) / 2;

                currentWidth = clone
                    .css('font-size', middle)
                    .width();

                if (currentWidth > widthToFitTo) {
                    upper = middle;
                } else {
                    lower = middle
                }
            }

            clone.remove();
            element.css('font-size', lower);
        };

        this.each(function () {
            fit($(this));
        });

        return this;
    };
})(jQuery);