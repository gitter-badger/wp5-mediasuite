import React from 'react';
import TimeUtil from '../../util/TimeUtil.js';
import CollectionConfig from './CollectionConfig.jsx';

class NISVCatalogueConfig extends CollectionConfig {
	constructor() {
		super();
	}

	getDocumentType() {
		return 'program_aggr';
	}

	getSearchableFields() {
		return [
			"bg:maintitles.bg:title",
			"bga:series.bg:maintitles.bg:title",
			"bg:publications.bg:publication.bg:broadcasters.bg:broadcaster",
			"bg:summary","bg:description"
		];
	}

	getSnippetFields() {
		return [
			"bg:maintitles.bg:title",
			"bg:publications.bg:publication.bg:sortdate",
			"bg:publications.bg:publication.bg:broadcasters.bg:broadcaster.raw",
			"bg:genres.bg:genre.raw"
		]
	}

	getFacets() {
		var ranges = TimeUtil.generateYearAggregationSK(1910, 2010);
		return [
			{
				field: 'bg:publications.bg:publication.bg:sortdate',
				title : 'Uitzenddatum',
				id : 'sortdate',
				operator : 'AND',
				size : 10,
				ranges: ranges//this yearly range is only for being able to draw the timeline
			},
			{
				field: 'bg:publications.bg:publication.bg:broadcasters.bg:broadcaster.raw',
				title : 'Broadcaster',
				id : 'broadcaster',
				operator : 'AND',
				size : 10
			},
			{
				field: 'bg:genres.bg:genre.raw',
				title : 'Genre',
				id : 'genre',
				operator : 'AND',
				size : 10
			},
			{
				field: 'bg:keywords.bg:keyword.raw',
				title : 'Keyword',
				id : 'keyword',
				operator : 'AND',
				size : 10
			}
		];
	}

	getDateFields() {
		return ['sortdate'];
	}

	getItemDetailData(result) {
		result.program_id = result['dc:identifier'];

		if (result.hasOwnProperty('bg:maintitles') && result['bg:maintitles'].hasOwnProperty('bg:title')) {
			result.title = result['bg:maintitles']['bg:title'][0];
		}

		if (result.hasOwnProperty('bg:summary')) {
			result.description = result['bg:summary'];
		}

		if (result.hasOwnProperty('bg:publications') && result['bg:publications'].hasOwnProperty('bg:publication')) {
			if (result['bg:publications']['bg:publication'].hasOwnProperty('bg:sortdate')) {
				result.broadcast_date = result['bg:publications']['bg:publication']['bg:sortdate'];
			}
			if (result['bg:publications']['bg:publication'].hasOwnProperty('bg:broadcasters')) {
				result.broadcaster = result['bg:publications']['bg:publication']['bg:broadcasters']['bg:broadcaster'];
			}
		}
		if (result.hasOwnProperty('bg:genres') && result['bg:genres'].hasOwnProperty('bg:genre')) {
			result.genre = result['bg:genres']['bg:genre'];
		}
		return result;
	}

	getResultSnippetData(result) {
		return {
			title: result.title ? result.title : 'no title',
			broadcastDate: result.broadcast_date ? ' (' + result.broadcast_date + ')': '',
			broadcaster: result.broadcaster,
			genre: result.genre
		}
	}
}

export default NISVCatalogueConfig;