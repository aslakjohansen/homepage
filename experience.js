get = function(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
};

get('experience.json', function (contents) {
    data = JSON.parse(contents);
    for (class_i=0 ; class_i<data.length ; class_i++) {
        lines = "";
        lines += "<ul>";
        expclass = data[class_i];
        for (entry_i=0 ; entry_i<expclass["entries"].length ; entry_i++) {
            lines += "<li>";
            entry = expclass["entries"][entry_i];
            lines += "<span class=\"timespan\">"+entry["timespan"]+"</span>";
            for (place_i=0 ; place_i<entry["place"].length ; place_i++) {
                place = entry["place"][place_i];
                lines += " "+place["name"];
                lines += " <span class=\"link\"> <a href=\""+place["link"]+"\">link</a></span>";
                if (place_i != entry["place"].length-1) {
                    lines += ",";
                }
            }
            lines += " (<span class=\"role\">"+entry["title"]+"</span>)";
            lines += "<br />";
            lines += entry["description"];
            lines += "</li>";
        }
        lines += "</ul>";
        
        // inject
        console.log(lines)
        id = {
            "Education":    "exp:edu",
            "Academic":     "exp:aca",
            "Professional": "exp:pro",
        }[expclass["name"]];
        element = document.getElementById(id);
        console.log(element)
        element.innerHTML = lines;
    }
});

