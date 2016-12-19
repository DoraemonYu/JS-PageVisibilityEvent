/*
* provide the event deal with page [hidden](deactive) or [visible](active), written by PURE JS.
* http://github.com/doraemonyu/PageVisibilityEvent
*
* MIT licenses :)
*/

/*
 #Current browser support:
  Chrome 13+
  Internet Explorer 10+
  Firefox 10+
  Opera 12.10+ 

 #Introduction:
  onfocusin and onfocusout are required for IE 9 and lower, 
  while all others make use of onfocus and onblur, 
  except for iOS, which uses onpageshow and onpagehide.

 #Example:
  var pv = new PageVisibilityEvent();   //New a Instance
  pv.SetCallback(visibilityChange);     //To Set (or Rest) a Callback
  pv.Disable();                         //To Disable
  pv.Enable();                          //To Re-Enable
  pv.GetIsAtivceNow();                  //Return current status

  function visibilityChange(isActive){
     //isActive equal TRUE  means active;
     //isActive equal FALSE means deactive;
  }
*/

/* --------------------------------------------- */
var PageVisibilityEvent = function () {

    var targetCallback  = undefined;
    var isEnable        = true;
    var currentStatus   = "visible";
    
    /* To Set the target callback ever time the visibility of page is change. */
    this._setCallback = function (callback) {
        targetCallback = callback;
    };

    /* Disable , then pause to fire callback  */
    this._disable = function () {
        isEnable = false;
    };

    /* Re-Enable,then continue to fire callbak  */
    this._enable = function () {
        isEnable = true;
    };

    /* Get current status, is it 'ACTIVE' now. */
    this._getIsAtivceNow = function () {
        return (currentStatus == "visible");
    };
    

    var hidden = "hidden";
    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

    function onchange(evt) {
        var v = "visible", h = "hidden";
        var evtMap = {
            focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
        };

        evt = evt || window.event;
        if (evt.type in evtMap)
            currentStatus = evtMap[evt.type];
        else
            currentStatus = this[hidden] ? "hidden" : "visible";
        
        //fire callback
        if (isEnable === true && targetCallback != null && typeof targetCallback === 'function') {
            targetCallback(currentStatus == "visible");
        }
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if (document[hidden] !== undefined) {
        onchange({ type: document[hidden] == true ? "blur" : "focus" });

        //Debug, output init status
        //console.log("init:" + currentStatus);
    }

};
/* ---------------------------------------------*/


/* ----------------Bind To Public-------------- */

/* To Set the target callback ever time the visibility of page is change. */
PageVisibilityEvent.prototype.SetCallback = function (callback) {
    var instance = this;
    instance._setCallback(callback);
};

/* Disable , then pause to fire callback  */
PageVisibilityEvent.prototype.Disable = function () {
    var instance = this;
    instance._disable();
};

/* Re-Enable,then continue to fire callbak  */
PageVisibilityEvent.prototype.Enable = function () {
    var instance = this;
    instance._enable();
};

/* Get current status, is it 'ACTIVE' now. */
PageVisibilityEvent.prototype.GetIsAtivceNow = function () {
    var instance = this;
    return instance._getIsAtivceNow();
};

/* ---------------------------------------------*/
