define(["jquery"], function($) {
    return function() {

        function highlightCode() {
            $('pre>code').each(function() {
                var element = $(this);
                var text = element.text();

                text = text.replace(/&/g, "&amp;");
                text = text.replace(/</g, "&lt;");
                text = text.replace(/>/g, "&gt;");

                text = text.replace(/\^([0-9]+)\^(((?!\^\^)(.|\n))*)\^\^/g, "<span class=\"fragment highlight\" data-fragment-index=\"$1\">$2</span>");
                text = text.replace(/\^\^(((?!\^\^)(.|\n))*)\^\^/g, "<span class=\"fragment highlight\">$1</span>");

                element.html(text);
            });
        }

        function buildRevealStructure() {
            var bodyElements = $('body>section');

            $('body').prepend('<div class="reveal"><div class="slides"></div></div>');
            $('.reveal>.slides').append(bodyElements);

            $('body.auto-fragment .reveal section ul:not(.no-burn) > li,body.auto-fragment .reveal section ol:not(.no-burn) > li').filter(function() {
                return $(this).parents('aside.notes').size() == 0;
            }).addClass("fragment");
        }

        return {
            buildRevealStructure: buildRevealStructure,
            highlightCode: highlightCode
        };
    };
});