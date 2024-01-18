// Code in the client-side JavaScript file for the trigger editor
(() => {
    subscribe('sfcc:ready', () => {
console.log('trigger subscribe');
        var template = "<div><p>Open car picker editor</p> <button  id='breakout-trigger'>Open Car Picker</button></div>";
        console.log('before');
        $('body').append(template);
        console.log('after');
        var openButtonEl = $('#breakout-trigger');
        openButtonEl.on('click', handleBreakoutOpen);
    });

    function handleBreakoutOpen() {
        emit({
            type: 'sfcc:breakout',
            payload: {
                id: 'customCarEditorBreakoutScript',
                title: 'The title to be displayed in the modal'
            }
        }, handleBreakoutClose);
    }

    function handleBreakoutClose({ type, value }) {
        // Now the "value" can be passed back to Page Designer
        if (type === 'sfcc:breakoutApply') {
            handleBreakoutApply(value);
        } else {
            handleBreakoutCancel();
        }
    }

    function handleBreakoutCancel() {
        // left empty in case you want to do more customization on this event
    }

    function handleBreakoutApply(value) {
        // Emit value update to Page Designer host application
        emit({
            type: 'sfcc:value',
            payload: value
        });
    }
})();