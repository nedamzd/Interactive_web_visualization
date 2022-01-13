

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
console.log(sampledata)

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function getPlots(id) {
    let testSubject = sampledata.samples.filter((val) => val.id == id);
    var testSubjectObj = testSubject[0];
    var labels = testSubjectObj.otu_ids;
    var otu_ids = labels.map(d => "OTU " + d);
    var sample_values = testSubjectObj.sample_values;
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    var trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).reverse(),
        text: labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }

    var data1 = [trace1];
    var layout1 = {
        title: "Top 10 OTU"
    };

    Plotly.newPlot("bar", data1, layout1)
    // Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.
    var trace2 = {
        x: labels,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: labels
        },
        text: labels
    };

    var data2 = [trace2]
    var layout2 = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000
    }

    Plotly.newPlot("bubble", data2, layout2);
}

// Display the sample metadata, i.e., an individual’s demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.
function getInfo(id) {
    var metadata = sampledata.metadata.filter((val) => val.id == id);
    let testSubjectDemos = metadata[0];
    var demographics = d3.select("#sample-metadata");
    demographics.html("");
    Object.entries(testSubjectDemos).forEach((key) => {   
        demographics.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });
}
// Update all of the plots any time that a new sample is selected. 
function optionChanged(id) {
    getPlots(id);
    getInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");
    sampledata.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });
    getPlots(sampledata.names[0]);
    getInfo(sampledata.names[0]);
}

init();