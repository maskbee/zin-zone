App({
    options: {
        debug: false
    },
    onLaunch: function() {
        console.log('Zin Zone Native App Started');
        if (typeof plus !== 'undefined') {
            try {
                plus.screen.lockOrientation('portrait-primary');
                plus.navigator.setStatusBarBackground('#090d16');
                plus.navigator.setStatusBarStyle('light');
            } catch(e) {}
        }
    },
    onShow: function() {
        console.log('Zin Zone Native App Foreground');
    },
    onHide: function() {
        console.log('Zin Zone Native App Background');
    }
});

Page('__UNI__ZINZONE', {
    onShow: function() {
        if (typeof plus !== 'undefined') {
            var firstBack = null;
            plus.key.addEventListener('backbutton', function() {
                if (!firstBack) {
                    firstBack = new Date().getTime();
                    plus.nativeUI.toast('Nhấn lần nữa để thoát Zin Zone');
                    setTimeout(function() {
                        firstBack = null;
                    }, 2000);
                } else {
                    if (new Date().getTime() - firstBack < 2000) {
                        plus.runtime.quit();
                    }
                }
            }, false);
        }
    }
});
