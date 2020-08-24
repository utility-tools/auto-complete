$(function(){
    const $input = $('#auto-complete__search');
    const $list = $input.next('ul');
    const data = [];

    /**
     * @function
     * @desc search based on the query entered
     */
    function search() {
        const query = $(this).val().trim().toLowerCase();
        const $fragment = $('<ul></ul>');
        let text;

        // loop to find the delta items
        for(var i in data) {
            text = data[i];

            if(text.trim().toLowerCase().indexOf(query) !== -1) {
                $fragment.append('<li>' + text + '</li>');
            }
        }

        //
        $list
            .toggleClass('auto-complete__suggestions--on', !!query.length)
            .html($fragment.html());
    }

    /**
     * @function
     * @desc handles select event from the list
     */
    function selectItem () {
        const text = $(this).text();
        $input.val(text);
        $list.removeClass('auto-complete__suggestions--on');
    }

    /**
     * @function
     * @desc builds the data from DOM and keeps it to collection for future search
     */
    function buildData() {
        $list.find('li').each(function(){
            data.push($(this).text());
        });

        $list.empty();
    }

    /**
     * @function
     * @desc closes suggestion list when clicked outside
     * @param {EVENT} evt event object
     */
    function onCloseFromOutside(evt) {
        const eventElm = evt.target;
        const listElm = $list.get(0);
        const isClickedOutside = !listElm.contains(eventElm);

        if (isClickedOutside) {
            $list.removeClass('auto-complete__suggestions--on');
        }
    }

    /**
     * @function
     * @desc initialized the auto-complete
     */
    function init() {   
        buildData();

        $input.on('input', search);
        $list.on('click', 'li', selectItem);
        $(window).on('click.closemenu', onCloseFromOutside);
    }

    init();
    
});