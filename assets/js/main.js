(function ($, undefined) {
    function refresh(container, input) {
        var text = input.val();
        var width = container.width();

        container.children().remove();

        $.each(text.split("\n"), function () {
            var line = $('<div>')
                .addClass('line')
                .html(this);

            if (0 === line.text().trim().length) {
                return ;
            }

            container.append(line);
        });

        container.find('div').fit(width);
    }

    $(function () {
        var container = $('#container');
        var input = $('#input-area');

        input.on('keyup', function () {
            refresh(container, $(this));
        });

        refresh(container, input);
    });
})(jQuery);