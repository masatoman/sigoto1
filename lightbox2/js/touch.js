window.addEventListener("load", function(event) {
    var Flag = '';
    var pinchiFlag = false;
    var touchStartX;
    var touchStartY;
    var touchMoveX;
    var touchMoveY;
    // var $targets  = $('.lb-prev, .lb-next, #lightboxOverlay');
    var $targets  = $(document);

    // 基本の距離
    var baseDistance = 0 ;

    $targets.on('touchstart', function(event){
        event.preventDefault();
        // 座標の取得
        touchStartX = event.originalEvent.touches[0].pageX;
        touchStartY = event.originalEvent.touches[0].pageY;
        // console.log('touchstart', event.target.className)
        Flag = event.target.className
        if(event.originalEvent.touches.length > 1) {
            pinchiFlag = true;
            console.log('ピンチ！', event.originalEvent.touches.length)
        }
    });

    $targets.on('touchmove', function(event){
        event.preventDefault();
        // 座標の取得
        touchMoveX = event.originalEvent.changedTouches[0].pageX;
        touchMoveY = event.originalEvent.changedTouches[0].pageY;
        // console.log('touchstart', event.target.className)


	    var touches = event.originalEvent.changedTouches;
        console.log(event, 1)
	    // 2本以上の指の場合だけ処理
	    if ( touches.length > 1 ) {
	    	// 座標1 (1本目の指)
	    	var x1 = touches[0].pageX ;
	    	var y1 = touches[0].pageY ;

	    	// 座標2 (2本目の指)
	    	var x2 = touches[1].pageX ;
	    	var y2 = touches[1].pageY ;
	    	// 2点間の距離
	    	baseDistance =  Math.sqrt( Math.pow( x2-x1, 2 ) + Math.pow( y2-y1, 2 ) ) ;
	    }
    });
     
 
$targets.on('touchend', function(event){
    if(!pinchiFlag) {
        // 移動量の判定
            if ((touchStartY + 50) < touchMoveY) {
                // console.log('上から下 閉じる', event.target)
                if(baseDistance > 0) {
                    baseDistance = 0;
                    return false
                } else {
                    $('.lb-close').click();
                }
        } else {
            if(baseDistance > 0) {
                baseDistance = 0;
                return false
            } else {
            // フラグにクリック対象がいるのでクリックさせる
            $('.' + Flag).click();
            // console.log('.' + Flag)
            }
        }
    } else {
        pinchiFlag = false;
    }
});






}, false);
