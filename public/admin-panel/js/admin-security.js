(function () {
    // 1. Disable right-click context menu (Temporarily disabled for inspection)
    // document.addEventListener('contextmenu', function (e) {
    //     e.preventDefault();
    // });

    // 2. Disable DevTools shortcuts & keys (Temporarily disabled for inspection)
    // document.addEventListener('keydown', function (e) {
    //     // F12 key
    //     if (e.key === 'F12') {
    //         e.preventDefault();
    //         return;
    //     }

    //     // Check OS
    //     const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    //     const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    //     const keyUpper = e.key.toUpperCase();

    //     // Ctrl+Shift+I / Cmd+Option+I (Inspect tool)
    //     if (isCmdOrCtrl && e.shiftKey && keyUpper === 'I') {
    //         e.preventDefault();
    //         return;
    //     }
    //     if (isMac && e.metaKey && e.altKey && keyUpper === 'I') {
    //         e.preventDefault();
    //         return;
    //     }

    //     // Ctrl+Shift+J / Cmd+Option+J (Console tool)
    //     if (isCmdOrCtrl && e.shiftKey && keyUpper === 'J') {
    //         e.preventDefault();
    //         return;
    //     }
    //     if (isMac && e.metaKey && e.altKey && keyUpper === 'J') {
    //         e.preventDefault();
    //         return;
    //     }

    //     // Ctrl+Shift+C / Cmd+Option+C (Inspector selector)
    //     if (isCmdOrCtrl && e.shiftKey && keyUpper === 'C') {
    //         e.preventDefault();
    //         return;
    //     }
    //     if (isMac && e.metaKey && e.altKey && keyUpper === 'C') {
    //         e.preventDefault();
    //         return;
    //     }

    //     // Ctrl+U / Cmd+U (View Page Source)
    //     if (isCmdOrCtrl && keyUpper === 'U') {
    //         e.preventDefault();
    //         return;
    //     }

    //     // Ctrl+S / Cmd+S (Save web page)
    //     if (isCmdOrCtrl && keyUpper === 'S') {
    //         e.preventDefault();
    //         return;
    //     }
    // });
})();
