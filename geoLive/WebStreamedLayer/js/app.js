var socketMap = socketMap || {};

var map;

socketMap.init = function(){
	map = new ol.Map({
		target: "map",
		layers: [
			new ol.layer.Tile({
				source : new ol.source.OSM()
			}),
			new ol.layer.Vector({
				title: "Observations",
				source: new ol.source.Vector()
			})
		],
		view: new ol.View({
    		center: [0, 0],
    		zoom: 2
  		})
	});
};

//coordinates in format[x, y], coordinates expects an array, attributes can be any object
socketMap.createFeature = function(coordinates, attributes){
	var point = new ol.geom.Point(coordinates);
	var feature = new ol.Feature({
		geometry: point,
		attributes: attributes
	});
	return feature;
};

//creates rules for styling
var createStyle = function(feature){
	var attributes = feature.get("attributes");
	var val = attributes.val;
	var fill = val === 1 ? "red" : 
		val === 2 ? "blue" : "green";
	
	var style = new ol.style.Style({
		image: new ol.style.Circle({
			fill: new ol.style.Fill({color: fill}),
			stroke: new ol.style.Stroke({
				color: "white",
				width: 1
			}),
			radius: 3
		})
	});
	return style;
	};


socketMap.setObservation = function(feature){
	var observationLayer = map.getLayers().getArray()[1];
	var source = observationLayer.getSource();
	var currentFeature = socketMap.findFeature(feature, source) || feature;

	var style = new createStyle(currentFeature);
	currentFeature.setStyle(style);
	source.addFeatures([currentFeature]);
};

socketMap.findFeature = function(currentFeature, source){
	var features = source.getFeatures();
	if (features.length === 0) return null;

	var currentAttributes = currentFeature.get("attributes");
	var currentId = currentAttributes.id;
	var findFeatures = features.filter(function(feature){
		var attributes = feature.get("attributes");
		return attributes.id === currentId;
	});
	var feature = findFeatures.length === 1 ? findFeatures[0] : null;
	return feature;
};

var obs1 = new socketMap.createFeature([0, 0], {id: 1, val: 1});
var obs2 = new socketMap.createFeature([5000000, 5000000], {id: 2, val: 2});

var timerId = setTimeout(function(){
	if (map === null) return;

	socketMap.setObservation(obs1);
	socketMap.setObservation(obs2);
	clearInterval(timerId);
}, 10);


socketMap.changeColor = function(){
	var val = Math.ceil((Math.random()*10000)%3);
	var updateObs = new socketMap.createFeature([5000000, 5000000], {id: 2, val: val});
	socketMap.setObservation(updateObs);
};

socketMap.lineFeature = function () {
    var jsonLine = '{"type": "Feature", "geometry": {"type": "LineString", "coordinates": [[58.39457,15.616888],[58.39471,15.616877],[58.394688,15.615729],[58.395268,15.615659],[58.395407,15.616212],[58.395761,15.616239],[58.395831,15.61633],[58.396437,15.616271],[58.396432,15.615627],[58.396872,15.615611],[58.39722,15.61559],[58.397612,15.615531],[58.39751,15.613782],[58.397719,15.61228],[58.39787,15.611947],[58.398041,15.611829],[58.398057,15.611148],[58.39809,15.610349],[58.39817,15.609689],[58.398438,15.607629],[58.398991,15.607903],[58.399672,15.60831],[58.400149,15.608831],[58.401689,15.611507],[58.402499,15.61273],[58.402542,15.612618],[58.40288,15.612258],[58.405589,15.61073],[58.408121,15.609442],[58.40891,15.60912],[58.408861,15.608809],[58.408078,15.603359],[58.407558,15.598359],[58.4073,15.591831],[58.407037,15.588617],[58.406662,15.585372],[58.406678,15.58461],[58.406817,15.584079],[58.40686,15.584009],[58.40708,15.583199],[58.407102,15.582282],[58.406839,15.581311],[58.406479,15.580898],[58.406388,15.58078],[58.40612,15.580329],[58.405959,15.579262],[58.404548,15.565738],[58.40442,15.56216],[58.404698,15.559322],[58.405197,15.557042],[58.40597,15.554891],[58.406919,15.553041],[58.40759,15.551898],[58.408679,15.550519],[58.409392,15.549768],[58.42092,15.540182],[58.430399,15.533841],[58.431397,15.53338],[58.432658,15.53338],[58.433548,15.53353],[58.434208,15.533487],[58.434578,15.533321],[58.435061,15.532929],[58.435388,15.532522],[58.435989,15.531358],[58.436751,15.529029],[58.436821,15.528552],[58.436858,15.52793],[58.436692,15.52713],[58.436279,15.526551],[58.435699,15.526181],[58.435512,15.525972],[58.434471,15.524818],[58.434031,15.524051],[58.433409,15.522689],[58.433151,15.521632],[58.431622,15.51594],[58.429879,15.510018],[58.427428,15.50254],[58.425319,15.496661],[58.421918,15.488281],[58.414767,15.472338],[58.41172,15.464919],[58.409489,15.459142],[58.404012,15.443998],[58.402252,15.439497],[58.400241,15.434659],[58.395439,15.424268],[58.39412,15.421162],[58.39258,15.41702],[58.390858,15.411452],[58.389458,15.405728],[58.388181,15.398862],[58.387731,15.395691],[58.385569,15.376787],[58.384367,15.368489],[58.383321,15.362561],[58.381862,15.35534],[58.379062,15.342868],[58.377447,15.334612],[58.376637,15.329698],[58.374642,15.315392],[58.373478,15.308777],[58.372571,15.304561],[58.371402,15.299899],[58.366541,15.283629],[58.36505,15.278018],[58.36372,15.27239],[58.362507,15.266618],[58.361209,15.259328],[58.360211,15.252719],[58.359498,15.247038],[58.358361,15.236599],[58.357551,15.230602],[58.356499,15.223998],[58.35518,15.217078],[58.354251,15.212781],[58.35298,15.2074],[58.350722,15.19908],[58.348769,15.192782],[58.345797,15.184189],[58.34569,15.18369],[58.345239,15.182037],[58.345019,15.180611],[58.344928,15.17928],[58.344998,15.175659],[58.34488,15.174747],[58.344547,15.173621],[58.34422,15.172972],[58.343592,15.172258],[58.340921,15.17074],[58.340207,15.17015],[58.339381,15.169238],[58.339059,15.16875],[58.338131,15.167001],[58.337418,15.164882],[58.336908,15.162511],[58.335889,15.15675],[58.335492,15.155349],[58.335079,15.154507],[58.334532,15.153831],[58.332949,15.152651],[58.332429,15.152142],[58.332021,15.151391],[58.331742,15.15035],[58.331598,15.1494],[58.33126,15.147169],[58.331088,15.146568],[58.330729,15.145881],[58.329859,15.144701],[58.32957,15.144068],[58.327242,15.136118],[58.326957,15.135399],[58.326711,15.135029],[58.326759,15.13489],[58.326818,15.134267],[58.326662,15.133768],[58.32781,15.133221],[58.32758,15.131778],[58.327419,15.13092],[58.327242,15.129911]]}}';
    var geojsonFormat = new ol.format.GeoJSON();
    var features = geojsonFormat.readFeatures(jsonLine);
    features[0].getGeometries().transform("EPSG:4326", "EPSG:3857");
    var vectorSource = new ol.source.Vector({
        features: features
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });

    map.addLayer(vectorLayer);

}
