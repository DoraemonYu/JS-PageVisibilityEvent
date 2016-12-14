# JS-PageVisibilityEvent
provide the event deal with page **hidden/deactive** or **visible/active**, written by PURE JS, Cross-browser Support.


# Current browser support
- Chrome 13+   
- Internet Explorer 10+   
- Firefox 10+   
- Opera 12.10+ 


# Example
```
  var pv = new PageVisibilityEvent();   //New a Instance
  pv.SetCallback(visibilityChange);     //To Set (or Rest) a Callback
  pv.Disable();                         //To Disable
  pv.Enable();                          //To Re-Enable

  function visibilityChange(isActive){
     //isActive equal TRUE  means active;
     //isActive equal FALSE means deactive;
  }
```


# licenses
MIT licenses :)
