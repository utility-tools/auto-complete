$(function(){
    const $input = $('#auto-complete__search');
    const $list = $input.next('ul');
    const data = [];

    function search() {
        const query = $(this).val().trim().toLowerCase();
        const $fragment = $('<ul></ul>');
        let text;

        for(var i in data) {
            text = data[i];

            if(text.trim().toLowerCase().indexOf(query) !== -1) {
                $fragment.append('<li>' + text + '</li>');
            }
        }

        $list
            .toggleClass('auto-complete__suggestions--on', !!query.length)
            .html($fragment.html());
    }

    function selectItem () {
        const text = $(this).text();
        $input.val(text);
        $list.removeClass('auto-complete__suggestions--on');
    }

    function buildData() {
        $list.find('li').each(function(){
            data.push($(this).text());
        });

        $list.empty();
    }

    function onCloseFromOutside(evt) {
        const eventElm = evt.target;
        const listElm = $list.get(0);
        const isClickedOutside = !listElm.contains(eventElm);

        if (isClickedOutside) {
            $list.removeClass('auto-complete__suggestions--on');
        }
    }

    function init() {   
        buildData();

        $input.on('input', search);
        $list.on('click', 'li', selectItem);
        $(window).on('click.closemenu', onCloseFromOutside);
    }

    init();
    
});