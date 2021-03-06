import React from 'react';
import TimeUtil from '../../util/TimeUtil';
import CollectionConfig from './CollectionConfig';

export class SpeechAndernieuwsConfig extends CollectionConfig {
	constructor() {
		super();
	}

	getDocumentType() {
		return 'asr_chunk';
	}

	getSearchableFields() {
		return ["words"];
	}

	getSnippetFields() {
		return false;
	}

	getDateFields() {
		return ['metadata.broadcast_date'];
	}

	getFacets() {
		var ranges = TimeUtil.generateYearAggregationSK(1910, 2010);
		return [
			{
				field: 'keywords.word',
				title : 'Keyword',
				id : 'keyword',
				operator : 'AND',
				size : 10
			}
		];
	}

	getItemDetailData(result) {
		if(result.metadata && result.metadata.mp3) {
			result.playableContent = [{
				url: 'http://os-immix-w/an-mp3/' + result.metadata.mp3,
				mimeType: 'audio/mp3'
			}];
		}
		return result;
	}

	getResultSnippetData(result) {
		return {
			asrFile: result.asr_file,
			speech: result.words
		}

	}
}

export default SpeechAndernieuwsConfig;