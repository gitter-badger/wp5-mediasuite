//aims to implement https://www.w3.org/TR/annotation-model

const AnnotationUtil = {

	//media fragments are simply reflected in the source without supplying a selector (for now)
	//a target always has a source
	generateW3CTargetObject : function(uri, start, end) {
		if(!uri) return null;
		let source = uri;
		if(start && end && start != -1 && end != -1 && source.indexOf('#t') == -1) {
			source += '#t=' + start + ',' + end;
		}
		return {
			'source': source,
			//'format': 'application/pdf',
			//'language': ['en', 'ar'],
			//'textDirection': 'ltr',
			//'processingLanguage': 'en'
			/*
			"source" : "http://someurl"
			"selector": {
				"type": "FragmentSelector",
				"conformsTo": "http://www.w3.org/TR/media-frags/",
				"value": "t=30,60"
	    	}
	    	"selector": {
			      "type": "TextQuoteSelector",
			      "exact": "anotation",
			      "prefix": "this is an ",
			      "suffix": " that has some"
			    }
			   "selector": {
			      "type": "TextPositionSelector",
			      "start": 412,
			      "end": 795
			    }
			   "selector": {
			      "type": "CssSelector",
			      "value": "#elemid > .elemclass + p"
			    }
			    "selector": {
			      "type": "XPathSelector",
			      "value": "/html/body/p[2]/table/tr[2]/td[3]/span"
			    }
			    "selector": {
			      "type": "DataPositionSelector",
			      "start": 4096,
			      "end": 4104
			    }
			    "selector": {
			      "type": "SvgSelector",
			      "value": "<svg:svg> ... </svg:svg>"
			    }

				OR WITH BOTH START END END (FOR RANGES)
			    "selector": {
			      "type": "RangeSelector",
			      "startSelector": {
			        "type": "XPathSelector",
			        "value": "//table[1]/tr[1]/td[2]"
			      },
			      "endSelector": {
			        "type": "XPathSelector",
			        "value": "//table[1]/tr[1]/td[4]"
			      }
			    }

			    OR CHAINED
			    "selector": {
			      "type": "FragmentSelector",
			      "value": "para5",
			      "refinedBy": {
			        "type": "TextQuoteSelector",
			        "exact": "Selected Text",
			        "prefix": "text before the ",
			        "suffix": " and text after it"
			      }
			    }

			    SUPPLY THE STATE OF THE TARGET

			    "state": {
			      "type": "TimeState",
			      "sourceDate": "2016-02-01T12:05:23Z",
			      "refinedBy": {
			        "type": "HttpRequestState",
			        "value": "Accept: application/pdf",
			        "refinedBy": {
			          "type": "FragmentSelector",
			          "value": "page=10",
			          "conformsTo": "http://tools.ietf.org/rfc/rfc3778"
			        }
			      }
			    }
			*/
		}
	},

	extractMediaFragmentFromURI : function(uri) {
		let i = uri.indexOf('#t=');
		if(i != -1) {
			return uri.substring(i + 3).split(',');
		}
		return null;
	}
}

export default AnnotationUtil;