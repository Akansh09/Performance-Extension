async function openPopUpWithPerformanceMatrix(perf){
     perf = perf.toJSON();
     var url= window.location
     var myWindow = window.open(url,"_blank","scrollbars=yes",false);
     var timingHTML= await getEventTimingTable(perf.timing);
     var urlHTMl="<h3>URL Opened : "+url+"</h3>";
     var finalHTMLDoc=doc+urlHTMl+timingHTML+bodyClose;
     myWindow.document.write(finalHTMLDoc);
}

async function getEventTimingTable(perf){
    var html="<div>"
    +"<h4>Table : Event Timing for the URL Opened</h4>"
    +"<table class='timeline'><thead><th>Event</th><th>Timing</th><th>Duration from start (ms)</th></thead>";
    var starttime = BigInt(perf[series[0]]);
    for(var i=0;i<series.length;i++){
           var result;
           result=BigInt(perf[series[i]])-starttime;
           var date = new Date(perf[series[i]]);
           var strDate = date.toLocaleString()+":"+date.getMilliseconds();
           html = html +"<tr><td style='font-weight:bold;'>"+series[i]+"</td><td>"+strDate+"</td><td>"+result+"</td></tr>"
     }
     html = html+ "</table></div>";
    return html;
}

window.addEventListener('load',async function() {
  if (document.readyState === "complete") {
  setTimeout(async function(){
     if(window && window.performance){
          await openPopUpWithPerformanceMatrix(window.performance);
     }},50);
    }
});
